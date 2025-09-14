import React from 'react'

export default function Card({ children, className = '' }){
  return (
    <div className={`bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg shadow p-4 ${className}`}>
      {children}
    </div>
  )
}
