import { useState } from 'react'
import { FileText, Upload, X, Sparkles } from 'lucide-react'
import { extractTextFromPdf } from '../utils/pdfParser'
import { analyzeResume } from '../api/resumeApi'

export default function ResumePage() {
  const [mode, setMode] = useState('paste') // 'paste' | 'upload'
  const [resumeText, setResumeText] = useState('')
  const [fileName, setFileName] = useState('')
  const [extracting, setExtracting] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')


  const handleFileChange = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  if (file.type !== 'application/pdf') {
    setError('Please upload a PDF file only.')
    return
  }

  setError('')
  setFileName(file.name)
  setExtracting(true)
    
  try {
    const text = await extractTextFromPdf(file)

    if (!text || text.length < 20) {
      setError('Could not extract text from this PDF — it may be a scanned image. Try pasting the text instead.')
      setFileName('')
      setResumeText('')
    } else {
      setResumeText(text)
    }
  } catch (err) {
    console.error('PDF extraction failed:', err)
    setError('Failed to read this PDF. Please try again or paste the text instead.')
    setFileName('')
  } finally {
    setExtracting(false)
  }

  }



  const handleClearFile = () => {
    setFileName('')
    setResumeText('')
  }


const handleAnalyze = async (e) => {
  e.preventDefault()
  if (!resumeText.trim()) return

  setAnalyzing(true)
  setError('')
  setFeedback('')

  try {
    const res = await analyzeResume(resumeText)
    setFeedback(res.data.feedback)
  } catch (err) {
    console.error('Resume analysis failed:', err)
    setError('Something went wrong analyzing your resume. Please try again.')
  } finally {
    setAnalyzing(false)
  }
}

  return (
    <div className="min-h-screen bg-void px-6 pt-28 pb-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-white">
            Resume <span className="text-purple">Analysis</span>
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Get instant AI-powered feedback to improve your resume.
          </p>
        </div>

        <div className="rounded-2xl border border-purple/20 bg-navy/40 p-6 md:p-8">
          {/* Mode toggle */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setMode('paste')}
              className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${
                mode === 'paste'
                  ? 'bg-gradient-to-r from-purple to-blue text-white'
                  : 'border border-white/10 text-text-muted hover:text-white'
              }`}
            >
              Paste Text
            </button>
            <button
              onClick={() => setMode('upload')}
              className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors ${
                mode === 'upload'
                  ? 'bg-gradient-to-r from-purple to-blue text-white'
                  : 'border border-white/10 text-text-muted hover:text-white'
              }`}
            >
              Upload PDF
            </button>
          </div>

          <form onSubmit={handleAnalyze}>
            {mode === 'paste' ? (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={10}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-text-muted/60 outline-none focus:border-purple/40 transition-colors resize-none"
              />
            ) : (
              <div>
                {!fileName ? (
                  <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 hover:border-purple/40 py-12 cursor-pointer transition-colors">
                    <Upload size={22} className="text-purple" />
                    <span className="text-sm text-text-primary">Click to upload your resume</span>
                    <span className="text-xs text-text-muted">PDF only</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between rounded-xl border border-purple/25 bg-black/30 px-4 py-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText size={16} className="text-purple shrink-0" />
                      <span className="text-sm text-text-primary truncate">{fileName}</span>
                      {extracting && (
                        <span className="text-xs text-text-muted shrink-0">Extracting...</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="text-text-muted hover:text-white transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={!resumeText.trim() || extracting || analyzing}
              className="mt-5 w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple to-blue py-3 text-sm font-medium text-white shadow-[0_0_25px_-5px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.8)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sparkles size={16} />
              {analyzing ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>
        </div>

        {/* Feedback */}
        {feedback && (
  <div className="mt-6 rounded-2xl border border-purple/20 bg-navy/40 p-6 md:p-8">
    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <Sparkles size={18} className="text-purple" />
      AI Feedback
    </h2>
    <div className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
      {feedback}
    </div>
  </div>
)}
      </div>
    </div>
  )
}