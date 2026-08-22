import { useState, useEffect, useRef } from 'react'
import { Plus, Sparkles, MessageSquare, Send, Bot, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getConversations } from '../api/conversationApi'
import chatBg from '../assets/chat-bg.png'
import robo from '../assets/robo.svg'
import { sendCareerPlannerMessage } from '../api/careerPlannerApi'
import { TrendingUp, Award } from 'lucide-react'
import { getCareerInsights } from '../api/careerInsightsApi'

function formatChatTime(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  if (isToday) return `Today, ${time}`

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) return `Yesterday, ${time}`

  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${time}`
}

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: "Hi! I'm your AI Career Coach. I can help you plan your career, find the right skills, explore opportunities, and guide you step by step.\n\nWhat would you like to know today?",
    time: new Date(),
  },
]



const GUEST_MESSAGE_LIMIT = 5

export default function CareerPlannerPage() {
  const { isLoggedIn, user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loadingChats, setLoadingChats] = useState(false)
  const [activeChat, setActiveChat] = useState(null)

  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [guestMessageCount, setGuestMessageCount] = useState(0)
  const scrollRef = useRef(null)

  const [role, setRole] = useState('')
  const [insights, setInsights] = useState(null)
  const [loadingInsights, setLoadingInsights] = useState(false)
  const [insightsError, setInsightsError] = useState('')


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!isLoggedIn) return

    setLoadingChats(true)
    getConversations()
      .then((res) => setConversations(res.data))
      .catch((err) => console.error('Failed to load conversations:', err))
      .finally(() => setLoadingChats(false))
  }, [isLoggedIn])


  const guestLimitReached = !isLoggedIn && guestMessageCount >= GUEST_MESSAGE_LIMIT

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || sending || guestLimitReached) return

    const question = input
    const userMessage = { id: Date.now(), role: 'user', content: question, time: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setSending(true)

    if (!isLoggedIn) {
      setGuestMessageCount((c) => c + 1)
    }

    try {
      const res = await sendCareerPlannerMessage(question)
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: res.data.answer,
        time: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error('Career Planner request failed:', err)
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Sorry, something went wrong on my end. Please try again.",
        time: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setSending(false)
    }

  }


  const displayName = isLoggedIn ? (user?.firstName || 'User') : 'Guest'

  const handleGetInsights = async (e) => {
    e.preventDefault()
    if (!role.trim()) return

    setLoadingInsights(true)
    setInsightsError('')

    try {
      const res = await getCareerInsights(role)
      setInsights(res.data)
    } catch (err) {
      console.error('Career insights request failed:', err)
      setInsightsError('Could not load insights. Please try again.')
    } finally {
      setLoadingInsights(false)
    }
  }

  return (
    <div className="h-screen w-screen p-3 md:p-5 bg-void overflow-hidden">
      <div className="relative h-full w-full rounded-[32px] md:rounded-[48px] border border-purple/25 shadow-[0_0_60px_-15px_rgba(139,92,246,0.4)] overflow-hidden">
        <img
          src={chatBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none"
          draggable="false"
        />

        <div className="relative h-full flex">
          {/* Left sidebar */}
          <aside className="hidden lg:flex w-72 shrink-0 flex-col p-5 border-r border-white/8">
            <span className="font-display text-xl font-bold text-purple px-1">SS</span>

            <button className="mt-6 flex items-center justify-between gap-2 rounded-xl border border-purple/25 bg-purple/10 px-4 py-3 text-sm font-medium text-white hover:bg-purple/15 transition-colors">
              <span className="flex items-center gap-2">
                <Plus size={16} />
                New Chat
              </span>
              <Sparkles size={14} className="text-purple" />
            </button>

            <p className="mt-6 mb-2 px-1 text-xs text-text-muted">Recent Chats</p>

            <div className="flex-1 overflow-y-auto flex flex-col gap-1 -mx-1">
              {!isLoggedIn && (
                <p className="px-3 py-2 text-xs text-text-muted/70">
                  Sign in to save and view your chat history.
                </p>
              )}

              {isLoggedIn && loadingChats && (
                <p className="px-3 py-2 text-xs text-text-muted/70">Loading...</p>
              )}

              {isLoggedIn && !loadingChats && conversations.length === 0 && (
                <p className="px-3 py-2 text-xs text-text-muted/70">
                  No conversations yet. Start chatting!
                </p>
              )}

              {isLoggedIn &&
                !loadingChats &&
                conversations.map(({ id, title, updatedAt }) => (
                  <button
                    key={id}
                    onClick={() => setActiveChat(id)}
                    className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors ${activeChat === id
                      ? 'bg-purple/15 border border-purple/25'
                      : 'hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <MessageSquare size={14} className="mt-0.5 text-purple shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm text-text-primary truncate">{title}</span>
                      <span className="block text-xs text-text-muted mt-0.5">
                        {formatChatTime(updatedAt)}
                      </span>
                    </span>
                  </button>
                ))}
            </div>

            {/* Robot card */}
            <div className="mt-4 rounded-2xl border border-purple/20 bg-navy/50 p-4 relative overflow-hidden">
              <p className="text-sm font-medium text-white leading-snug">
                Let's build<br />your future.
              </p>
              <p className="mt-1 text-xs text-text-muted">Your AI Career Coach</p>
              <img
                src={robo}
                alt=""
                className="absolute -bottom-2 -right-2 w-20 h-20 pointer-events-none select-none"
                draggable="false"
              />
            </div>

            {/* User footer */}
            <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-white/8 px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple to-blue text-xs font-semibold text-white shrink-0">
                {displayName[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-text-primary truncate">{displayName}</p>
                <p className="text-xs text-text-muted">{isLoggedIn ? 'Free Plan' : 'Guest'}</p>
              </div>
            </div>
          </aside>

          {/* Center chat */}


          <main className="flex-1 flex flex-col min-w-0 p-5">
            {/* Header */}
            <div className="pb-4 border-b border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple" />
                <div>
                  <h1 className="text-sm font-semibold text-white">Career Planner</h1>
                  <p className="text-xs text-text-muted">Your AI Career Coach</p>
                </div>
              </div>

              <Link
                to="/roadmap"
                className="flex items-center gap-1.5 rounded-full border border-purple/25 bg-purple/10 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-purple/15 transition-colors"
              >
                <Route size={13} />
                Your Roadmap
              </Link>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 max-w-[80%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                    }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-purple to-blue'
                      : 'bg-navy border border-purple/25'
                      }`}
                  >
                    {msg.role === 'user' ? (
                      <span className="text-xs font-semibold text-white">
                        {displayName[0]?.toUpperCase()}
                      </span>
                    ) : (
                      <Bot size={14} className="text-purple" />
                    )}
                  </div>

                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-purple/90 to-blue/90 text-white'
                      : 'bg-navy/60 border border-white/8 text-text-primary'
                      }`}
                  >
                    {msg.content}
                    <div
                      className={`mt-1.5 text-[10px] ${msg.role === 'user' ? 'text-white/60' : 'text-text-muted/60'
                        }`}
                    >
                      {msg.time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex gap-2.5 max-w-[80%] self-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy border border-purple/25">
                    <Bot size={14} className="text-purple" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-navy/60 border border-white/8 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Input bar */}

            {guestLimitReached && (
              <p className="text-center text-xs text-purple mb-2">
                You've reached the guest limit of {GUEST_MESSAGE_LIMIT} messages.{' '}
                <Link to="/signup" className="underline hover:text-purple/80">
                  Sign up
                </Link>{' '}
                for unlimited chat + saved history.
              </p>
            )}
            <form onSubmit={handleSend} className="pt-4 border-t border-white/8 flex items-center gap-3">
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-text-muted hover:text-white hover:border-purple/30 transition-colors"
              >
                <Plus size={16} />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={guestLimitReached || sending}
                placeholder={guestLimitReached ? 'Sign up to continue chatting...' : 'Ask me anything about your career...'}
                className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-text-muted/70 outline-none focus:border-purple/40 transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || sending || guestLimitReached}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple to-blue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                <Send size={15} />
              </button>
            </form>
          </main>



          {/* Right side*/}
          <aside className="hidden xl:flex w-80 shrink-0 flex-col p-5 border-l border-white/8 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-purple" />
              <h2 className="text-sm font-semibold text-white">Career Insights</h2>
            </div>

            {/* input */}
            <form onSubmit={handleGetInsights} className="flex gap-2 mb-5">
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. DevOps Engineer"
                className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder:text-text-muted/60 outline-none focus:border-purple/40 transition-colors"
              />
              <button
                type="submit"
                disabled={loadingInsights || !role.trim()}
                className="rounded-lg bg-gradient-to-r from-purple to-blue px-3 py-2 text-xs font-medium text-white disabled:opacity-40 transition-opacity"
              >
                Go
              </button>
            </form>

            {loadingInsights && (
              <p className="text-xs text-text-muted text-center py-6">Researching...</p>
            )}

            {insightsError && (
              <p className="text-xs text-red-400 text-center py-6">{insightsError}</p>
            )}

            {!loadingInsights && !insights && !insightsError && (
              <p className="text-xs text-text-muted/70 text-center py-6">
                Enter a role above to see live market insights.
              </p>
            )}

            {insights && !loadingInsights && (
              <div className="flex flex-col gap-4">
                {/* Demand */}
                <div className="rounded-2xl border border-white/8 bg-navy/40 p-4">
                  <p className="text-xs text-text-muted">In Demand</p>
                  <p className="text-xs text-text-muted/70 mb-2">High growth career</p>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={18} className="text-purple" />
                    <span className="text-2xl font-bold text-white">{insights.growthPercent}%</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">Job growth in {insights.role}</p>
                </div>

                {/*Skills */}
                <div className="rounded-2xl border border-white/8 bg-navy/40 p-4">
                  <p className="text-sm font-medium text-white mb-3">Top Skills</p>
                  <div className="flex flex-col gap-3">
                    {insights.topSkills?.map(({ name, percent }) => (
                      <div key={name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-text-primary">{name}</span>
                          <span className="text-text-muted">{percent}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple to-blue"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roles */}
                <div className="rounded-2xl border border-white/8 bg-navy/40 p-4">
                  <p className="text-sm font-medium text-white mb-3">Top Roles</p>
                  <div className="flex flex-col gap-1">
                    {insights.topRoles?.map(({ name, description }) => (
                      <details key={name} className="group rounded-lg hover:bg-white/5 transition-colors">
                        <summary className="flex items-center gap-2 px-2.5 py-2 text-xs text-text-primary cursor-pointer list-none">
                          <Award size={13} className="text-purple shrink-0" />
                          {name}
                        </summary>
                        <p className="px-2.5 pb-2.5 text-xs text-text-muted leading-relaxed">
                          {description}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}