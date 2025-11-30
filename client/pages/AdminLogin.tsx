import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Simple hardcoded admin credentials as requested
    if (username === 'luiz' && password === '1234') {
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminUser', 'luiz')
      navigate('/admin/dashboard', { replace: true })
      return
    }

    setError('Usuário ou senha inválidos')
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="relative rounded-2xl bg-[#0D0D0D] border border-[rgba(0,255,149,0.25)] overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Painel Administrativo</h1>
              <p className="text-sm text-gray-400">Login exclusivo do administrador</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Usuário</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(0,0,0,0.6)] border border-[rgba(0,255,149,0.15)] text-white outline-none text-sm"
                  placeholder="Usuário"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(0,0,0,0.6)] border border-[rgba(0,255,149,0.15)] text-white outline-none text-sm"
                  placeholder="Senha"
                />
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-600/10 border border-red-600/30 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button type="submit" className="w-full h-12 rounded-lg bg-[#00FF95] text-black font-semibold">
                Entrar como Admin
              </button>
            </form>

            <p className="text-center text-xs text-gray-600">Usuário: <span className="font-mono">luiz</span> • Senha: <span className="font-mono">1234</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
