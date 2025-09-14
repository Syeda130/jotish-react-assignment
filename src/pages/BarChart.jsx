import React, {useEffect, useState} from 'react'
import { Bar } from 'react-chartjs-2'
import Header from '../components/ui/header'
import Card from '../components/ui/card'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChart(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const res = await fetch('/api/backend_dev/gettabledata.php', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({username:'test', password:'123456'})
        })
        const data = await res.json()
        const rows = data?.TABLE_DATA?.data || []
        const transformedRows = rows.map(row => ({
          name: row[0],
          salary: parseFloat(row[5].replace(/[$,]/g, '')) // Convert "$320,800" to 320800
        }))
        setItems(transformedRows.slice(0,10))
      }catch(err){
        console.error(err)
      }finally{setLoading(false)}
    }
    load()
  },[])

  const labels = items.map(it => it.name)
  const data = {
    labels,
    datasets: [
      {
        label: 'Salary ($)',
        data: items.map(it => it.salary),
        backgroundColor: 'rgba(99,102,241,0.8)',
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h3 className="text-lg font-semibold mb-4">Salaries (first 10)</h3>
        <Card className="fade-in scale-up">
          {loading ? <div>Loading...</div> : <Bar data={data} />}
        </Card>
      </div>
    </div>
  )
}
