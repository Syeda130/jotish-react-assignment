import React from 'react'

export default function Input({ className = '', ...props }){
  return (
    <input className={`w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`} {...props} />
  )
}
