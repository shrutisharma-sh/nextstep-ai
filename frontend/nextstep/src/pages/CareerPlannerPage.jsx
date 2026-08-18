import { useState } from 'react'
import { Plus, Sparkles, MessageSquare, Route } from 'lucide-react'
import chatBg from '../assets/chat-bg.png'
import robo from '../assets/robo.svg'

const recentChats = [
  { id: 1, title: 'Best career path for me', time: 'Today, 10:30 AM', icon: MessageSquare },
  { id: 2, title: 'Improve my skills', time: 'Yesterday, 6:15 PM', icon: MessageSquare },
  { id: 3, title: 'Frontend vs Backend?', time: 'Yesterday, 11:20 AM', icon: MessageSquare },
  { id: 4, title: 'Roadmap for DevOps', time: 'May 12, 9:45 PM', icon: Route },
  { id: 5, title: 'Highest paying tech skills', time: 'May 11, 4:30 PM', icon: MessageSquare },
]

export default function CareerPlannerPage() {
  const [activeChat, setActiveChat] = useState(1)

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
          {/* Left side */}
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
              {recentChats.map(({ id, title, time, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveChat(id)}
                  className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    activeChat === id
                      ? 'bg-purple/15 border border-purple/25'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon size={14} className="mt-0.5 text-purple shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm text-text-primary truncate">{title}</span>
                    <span className="block text-xs text-text-muted mt-0.5">{time}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Robo*/}
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
                SS
              </div>
              <div className="min-w-0">
                <p className="text-sm text-text-primary truncate">Shruti Sharma</p>
                <p className="text-xs text-text-muted">Free Plan</p>
              </div>
            </div>
          </aside>

          {/* chat */}
          <main className="flex-1 flex flex-col min-w-0 p-5">
            <div className="pb-4 border-b border-white/8">
              Career Planner header — added in step 3
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              Chat messages — added in step 3
            </div>
            <div className="pt-4 border-t border-white/8">
              Input bar — added in step 3
            </div>
          </main>

          {/* Right side */}
          <aside className="hidden xl:flex w-80 shrink-0 flex-col p-5">
            Career Insights — added in step 4
          </aside>
        </div>
      </div>
    </div>
  )
}