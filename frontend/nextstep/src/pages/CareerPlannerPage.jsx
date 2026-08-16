import chatBg from '../assets/chat-bg.png'

export default function CareerPlannerPage() {
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
          
          <aside className="hidden lg:flex w-72 shrink-0 flex-col p-5">
            <div className="text-purple font-display font-bold text-xl px-2">SS</div>
            
          </aside>

          
          <main className="flex-1 flex flex-col min-w-0 p-5">
            <div className="pb-4 border-b border-white/8">
              Career Planner header 
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              Chat messages 
            </div>
            <div className="pt-4 border-t border-white/8">
              Input bar
            </div>
          </main>

          {/* career  sidebar */}
          <aside className="hidden xl:flex w-80 shrink-0 flex-col p-5">
            Career Insights 
          </aside>
        </div>
      </div>
    </div>
  )
}