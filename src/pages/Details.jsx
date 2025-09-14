import React from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import CameraCapture from '../components/CameraCapture'
import Header from '../components/ui/header'
import Card from '../components/ui/card'

export default function Details(){
  const loc = useLocation()
  const nav = useNavigate()
  const { id } = useParams()
  const item = loc.state?.item || null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
  <button onClick={()=>nav('/list')} className="mb-4 text-sm text-indigo-600 dark:text-indigo-400">← Back</button>
        <h3 className="text-lg font-semibold mb-3">Details #{id}</h3>

        <Card className="mb-4">
          {item ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400">Employee Name</h4>
                  <p className="mt-1 text-lg">{item.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400">Position</h4>
                  <p className="mt-1 text-lg">{item.position}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400">City</h4>
                  <p className="mt-1 text-lg">{item.city}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400">Employee ID</h4>
                  <p className="mt-1 text-lg">{item.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400">Start Date</h4>
                  <p className="mt-1 text-lg">{item.startDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400">Salary</h4>
                  <p className="mt-1 text-lg font-semibold text-green-600 dark:text-green-400">{item.salary}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 dark:text-slate-400">No details available. Try opening from the list page.</div>
          )}
        </Card>

        <Card>
          <h4 className="font-medium mb-2">Capture photo</h4>
          <CameraCapture onCapture={(dataUrl)=>{
            // navigate to photo result and pass the image
            nav('/photo', {state:{image: dataUrl}})
          }} />
        </Card>
      </div>
    </div>
  )
}
