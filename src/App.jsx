import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import List from './pages/List'
import Details from './pages/Details'
import PhotoResult from './pages/PhotoResult'
import BarChart from './pages/BarChart'
import WorldMap from './pages/WorldMap'

function App(){
  useEffect(() => {
    const onPop = () => {
      // reload the page when user navigates via back/forward
      window.location.reload()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/photo" element={<PhotoResult/>} />
        <Route path="/chart" element={<BarChart/>} />
  <Route path="/map" element={<WorldMap/>} />
      </Routes>
    </div>
  )
}

export default App
