import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/button'
import Input from '../components/ui/input'
import Card from '../components/ui/card'

export default function Login(){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    if(user === 'testuser' && pass === 'Test123'){
      navigate('/list')
    } else {
      setError('Invalid credentials — use testuser / Test123')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Welcome back</h1>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block mb-2 text-sm">Username</label>
            <Input value={user} onChange={e=>setUser(e.target.value)} placeholder="testuser" />
          </div>
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <Input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Test123" />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <Button type="submit" className="w-full">Sign in</Button>
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">Demo credentials: <strong>testuser</strong> / <strong>Test123</strong></div>
        </form>
      </Card>
    </div>
  )
}
