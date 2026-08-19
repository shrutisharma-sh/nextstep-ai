import { useState, useEffect, useRef } from 'react'
import { Plus, Sparkles, MessageSquare, Send, Bot, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getConversations } from '../api/conversationApi'
import chatBg from '../assets/chat-bg.png'
import robo from '../assets/robo.svg'

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

export default function CareerPlannerPage() {
  const { isLoggedIn, user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loadingChats, setLoadingChats] = useState(false)
  const [activeChat, setActiveChat] = useState(null)

  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)


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

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now(), role: 'user', content: input, time: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // real API call wired in next step
  }

  const displayName = isLoggedIn ? (user?.firstName || 'User') : 'Guest'

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
                    className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      activeChat === id
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
                  className={`flex gap-2.5 max-w-[80%] ${
                    msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.role === 'user'
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
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-purple/90 to-blue/90 text-white'
                        : 'bg-navy/60 border border-white/8 text-text-primary'
                    }`}
                  >
                    {msg.content}
                    <div
                      className={`mt-1.5 text-[10px] ${
                        msg.role === 'user' ? 'text-white/60' : 'text-text-muted/60'
                      }`}
                    >
                      {msg.time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            {/* Input bar */}
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
                placeholder="Ask me anything about your career..."
                className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-text-muted/70 outline-none focus:border-purple/40 transition-colors"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple to-blue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                <Send size={15} />
              </button>
            </form>
          </main>



          {/* Right side*/}
          <aside className="hidden xl:flex w-80 shrink-0 flex-col p-5">
            Career Insights — added in step 4
          </aside>
        </div>
      </div>
    </div>
  )
}