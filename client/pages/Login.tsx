import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockDB } from '@/services/mockDB'
import { Lock, User } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // Auto-redirect if already logged in
  useEffect(() => {
    const role = localStorage.getItem('role')
    const userId = localStorage.getItem('userId')
    if (userId && role) {
      if (role === 'admin') {
        navigate('/admin', { replace: true })
      } else if (role === 'agent') {
        navigate('/dashboard', { replace: true })
      }
    }
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
      const user = mockDB.findUser(username, password)

      if (!user) {
        setError('Usuário ou senha inválidos')
        setLoading(false)
        return
      }

      // Store session
      localStorage.setItem('userId', user.id)
      localStorage.setItem('username', user.username)
      localStorage.setItem('role', user.role)
      if (user.client_id) {
        localStorage.setItem('clientId', user.client_id)
      }

      // Redirect based on role
      if (user.role === 'admin') {
        window.location.href = '/admin'
      } else if (user.role === 'agent') {
        window.location.href = '/dashboard'
      }
    } catch (err) {
      console.error(err)
      setError('Erro no login')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        {/* Glow effect background */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FF95]/10 to-transparent rounded-2xl blur opacity-0" />

        {/* Main card */}
        <div className="relative rounded-2xl bg-[#0D0D0D] border border-[rgba(0,255,149,0.25)] overflow-hidden">
          {/* Top neon line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#00FF95] to-transparent opacity-40" />

          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#00FF95]/20 blur" />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fc7a665936108422ea7c0c4c7a1027698%2F62bee75c9cf54f7db5c6005f17af3083?format=webp&width=800"
                    alt="Funcionou.AI"
                    className="relative h-16 w-16 object-contain"
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold">
                Bem-vindo ao <span className="text-[#00FF95]">Funcionou.AI</span>
              </h1>
              <p className="text-sm text-gray-400">Painel premium para agentes de IA</p>
            </div>

            {/* Test credentials info */}
            <div className="space-y-2 p-4 rounded-lg bg-[rgba(0,255,149,0.04)] border border-[rgba(0,255,149,0.15)]">
              <p className="text-xs font-semibold text-[#00FF95] uppercase tracking-wider">🚀 Modo Offline</p>
              <p className="text-xs text-gray-400 mb-2">Usuários de teste:</p>
              <div className="space-y-1 text-xs font-mono text-gray-500">
                <div><span className="text-[#00FF95]">luiz</span> / 1234 (admin)</div>
                <div><span className="text-[#00FF95]">ana</span> / senha1 (agent)</div>
                <div><span className="text-[#00FF95]">bruno</span> / senha2 (agent)</div>
              </div>
            </div>

            {/* Login form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Usuário</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-[rgba(0,0,0,0.6)] border border-[rgba(0,255,149,0.25)] text-white outline-none text-sm transition-all focus:border-[#00FF95] focus:shadow-[0_0_12px_rgba(0,255,149,0.2)]"
                    placeholder="Digite seu usuário"
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg bg-[rgba(0,0,0,0.6)] border border-[rgba(0,255,149,0.25)] text-white outline-none text-sm transition-all focus:border-[#00FF95] focus:shadow-[0_0_12px_rgba(0,255,149,0.2)]"
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="text-sm text-red-400 bg-red-600/10 border border-red-600/30 rounded-lg p-3">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full h-12 rounded-lg bg-[#00FF95] hover:bg-[#00CC7A] text-black font-semibold font-bold transition-all duration-200 shadow-lg shadow-[#00FF95]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Bottom neon line */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#00FF95] to-transparent opacity-30" />

            {/* Footer */}
            <p className="text-center text-xs text-gray-600">
              © 2024 Funcionou.AI • <span className="text-[#00FF95]">Matrix Premium</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
