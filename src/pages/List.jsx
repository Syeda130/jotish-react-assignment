import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/button'
import Card from '../components/ui/card'
import Header from '../components/ui/header'

export default function List(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    async function load(){
      setLoading(true)
      setError(null)
      try{
        const res = await fetch('/api/backend_dev/gettabledata.php', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({username:'test', password:'123456'})
        })
        const data = await res.json()
        const rows = data?.TABLE_DATA?.data || []
        const transformedRows = rows.map(row => ({
          id: row[3],
          name: row[0],
          position: row[1],
          city: row[2],
          startDate: row[4],
          salary: row[5]
        }))
        setItems(transformedRows)
      }catch(err){
        console.error(err)
        setError('Failed to load data')
      }finally{ setLoading(false) }
    }
    load()
  },[])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Employee List</h2>
          <div className="space-x-2">
            <Button variant="secondary" onClick={()=>navigate('/chart')}>Show Salaries (Bar)</Button>
            <Button onClick={()=>navigate('/map')}>View on Map</Button>
          </div>
        </div>

        <Card>
          {loading && <div className="text-slate-500 dark:text-slate-400">Loading...</div>}
          {error && <div className="text-red-600">{error}</div>}

          <div className="overflow-auto">
            <table className="w-full table-auto text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Position</th>
                  <th className="p-3 text-left">City</th>
                  <th className="p-3 text-left">Start Date</th>
                  <th className="p-3 text-left">Salary</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx)=> (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer" onClick={()=>navigate(`/details/${idx}`, {state:{item: it}})}>
                    <td className="p-3">{it.id}</td>
                    <td className="p-3">{it.name}</td>
                    <td className="p-3">{it.position}</td>
                    <td className="p-3">{it.city}</td>
                    <td className="p-3">{it.startDate}</td>
                    <td className="p-3">{it.salary}</td>
                  </tr>
                ))}
                {items.length===0 && !loading && <tr><td className="p-3" colSpan={6}>No data returned from API</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
