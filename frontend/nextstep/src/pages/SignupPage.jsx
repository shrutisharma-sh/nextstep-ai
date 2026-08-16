import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { FaGoogle, FaGithub, FaMicrosoft } from 'react-icons/fa'
import loginBg from '../assets/login-bg.png'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
  }

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-void">
  <div className="relative h-full w-auto aspect-[3/2] max-w-full">
        <img
          src={loginBg}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          draggable="false"
        />

        <Link
          to="/"
          className="absolute top-[6%] right-[6%] text-[11px] md:text-xs text-text-muted hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>

        
        <div className="absolute left-[46%] top-[7%] w-[48%] text-center">
          <h1 className="font-script text-4xl md:text-5xl text-white leading-none">
            Create <span className="text-purple">Account</span>
          </h1>
          <p className="mt-2 text-xs md:text-sm text-text-muted">
            Start your journey with NextStep
          </p>
        </div>

        
        <div className="absolute left-[46%] top-[19%] w-[48%] rounded-2xl border border-purple/25 bg-black/50 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(139,92,246,0.5)] p-5 md:p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <div className="flex items-baseline gap-4 mb-1">
              <span className="text-sm font-medium text-white border-b-2 border-purple pb-1">
                Register
              </span>
              <span className="text-sm text-text-muted/60">Sign up with</span>
            </div>

            <label className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 focus-within:border-purple/50 transition-colors">
              <User size={15} className="text-text-muted shrink-0" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-white placeholder:text-text-muted/70 outline-none"
              />
            </label>

            <label className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 focus-within:border-purple/50 transition-colors">
              <Mail size={15} className="text-text-muted shrink-0" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-white placeholder:text-text-muted/70 outline-none"
              />
            </label>

            <label className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 focus-within:border-purple/50 transition-colors">
              <Lock size={15} className="text-text-muted shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-white placeholder:text-text-muted/70 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-text-muted hover:text-white transition-colors shrink-0"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </label>

            <label className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 focus-within:border-purple/50 transition-colors">
              <Lock size={15} className="text-text-muted shrink-0" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-transparent text-sm text-white placeholder:text-text-muted/70 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="text-text-muted hover:text-white transition-colors shrink-0"
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </label>

            <button
              type="submit"
              className="mt-1 group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple to-blue py-2.5 text-sm font-medium text-white shadow-[0_0_25px_-5px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.8)] transition-all"
            >
              Create Account
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-3 my-0.5">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-text-muted/60">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="flex items-center justify-center gap-3">
              {[FaGoogle, FaGithub, FaMicrosoft].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/30 text-text-muted hover:text-white hover:border-purple/40 transition-colors"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-text-muted mt-1">
              Already have an account?{' '}
              <Link to="/login" className="text-purple hover:text-purple/80 transition-colors">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}