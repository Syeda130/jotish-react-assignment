import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/ui/header'
import Card from '../components/ui/card'

export default function PhotoResult(){
  const loc = useLocation()
  const nav = useNavigate()
  const img = loc.state?.image || null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
  <button onClick={()=>nav(-1)} className="mb-4 text-sm text-indigo-600 dark:text-indigo-400">← Back</button>
        <h3 className="text-lg font-semibold mb-3">Photo Result</h3>
        <Card className="fade-in">
          {img ? (
            <img src={img} className="max-w-full h-auto rounded" alt="captured" />
          ) : (
            <div className="text-slate-500 dark:text-slate-400">No image captured</div>
          )}
        </Card>
      </div>
    </div>
  )
}
