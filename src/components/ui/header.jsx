import React, { useEffect, useState } from 'react'

export default function Header(){
  const [dark, setDark] = useState(false)

  useEffect(()=>{
    try{
      const saved = localStorage.getItem('jotish:theme')
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = saved ? saved === 'dark' : prefersDark
      setDark(isDark)
      document.documentElement.classList.toggle('dark', isDark)
    }catch(e){ }
  },[])

  function toggle(){
    const next = !dark
    setDark(next)
    try{ localStorage.setItem('jotish:theme', next ? 'dark' : 'light') }catch(e){}
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <header className="w-full border-b bg-white/60 dark:bg-slate-900/60 backdrop-blur sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">J</div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-100">Jotish App</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Employee Explorer</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <nav className="space-x-2 text-sm hidden sm:inline">
            <a href="/list" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">List</a>
            <a href="/map" className="ml-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Map</a>
            <a href="/chart" className="ml-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Chart</a>
          </nav>
          <button onClick={toggle} aria-label="Toggle theme" className="px-2 py-1 rounded border bg-white/40 dark:bg-slate-700/40">
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}
