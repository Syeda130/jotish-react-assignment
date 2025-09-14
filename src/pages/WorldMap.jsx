import React, { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useNavigate } from 'react-router-dom'
import { geoContains } from 'd3-geo'
import Header from '../components/ui/header'
import Card from '../components/ui/card'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// A basic city to coordinates map for demo purposes
const CITY_COORDS = {
  'Edinburgh': [-3.1883, 55.9533],
  'Tokyo': [139.6503, 35.6762],
  'London': [-0.1278, 51.5074],
  'New York': [-74.0060, 40.7128],
  'Singapore': [103.8198, 1.3521],
  'San Francisco': [-122.4194, 37.7749]
}

export default function WorldMap(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [hover, setHover] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({x:0,y:0})
  const navigate = useNavigate()

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
        const transformed = rows.map(row=>({
          name: row[0],
          position: row[1],
          city: row[2],
          id: row[3]
        }))
        setItems(transformed)
      }catch(e){
        console.error(e)
      }finally{setLoading(false)}
    }
    load()
  },[])

  const cities = items.reduce((acc, it)=>{
    if(!acc[it.city]) acc[it.city] = []
    acc[it.city].push(it)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">World Map</h3>
          <button onClick={()=>navigate('/list')} className="px-3 py-1 bg-indigo-600 text-white rounded">Back to List</button>
        </div>

        <Card className="fade-in scale-up">
          {loading ? <div>Loading map data...</div> : (
            <div className="map-wrap relative">
              <ComposableMap projectionConfig={{ scale: 150 }} width={980} height={500}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) => (
                    geographies.map(geo => {
                      const countryName = geo.properties && (geo.properties.name || geo.properties.NAME || geo.properties.ADMIN || geo.properties.admin)
                      const employeesInCountry = Object.entries(cities).flatMap(([city, list]) => {
                        const coord = CITY_COORDS[city]
                        if(!coord) return []
                        try{
                          if(geoContains(geo, coord)) return list
                        }catch(e){ }
                        return []
                      })
                      const hasData = employeesInCountry.length > 0
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={hover && hover.name === countryName ? '#0ea5e9' : hasData ? 'rgba(99,102,241,0.12)' : '#EAEAEC'}
                          stroke="#D6D6D6"
                          style={{
                            default: { transition: 'all 200ms', outline: 'none' },
                            hover: { fill: '#60a5fa', outline: 'none' },
                            pressed: { outline: 'none' }
                          }}
                          onMouseEnter={(evt) => {
                            setHover({ name: countryName, count: employeesInCountry.length })
                            setTooltipPos({ x: evt.clientX, y: evt.clientY })
                          }}
                          onMouseMove={(evt) => setTooltipPos({ x: evt.clientX, y: evt.clientY })}
                          onMouseLeave={() => setHover(null)}
                        />
                      )
                    })
                  )}
                </Geographies>

                {Object.entries(cities).map(([city, list])=>{
                  const coord = CITY_COORDS[city]
                  if(!coord) return null
                  const label = `${city} (${list.length})`
                  return (
                    <Marker key={city} coordinates={coord}>
                      <g transform="translate(-6, -6)">
                        <circle r={6} fill="#FF5533" stroke="#fff" strokeWidth={1.5} />
                        <text x={10} y={4} style={{ fontFamily: 'system-ui', fill: 'currentColor', fontSize: 12 }}>{label}</text>
                      </g>
                    </Marker>
                  )
                })}
              </ComposableMap>

              {hover && (
                <div className="map-tooltip" style={{ position: 'fixed', left: tooltipPos.x + 10, top: tooltipPos.y + 10 }}>
                  <div className="font-semibold text-slate-100 dark:text-slate-100">{hover.name || 'Unknown'}</div>
                  <div className="text-sm text-slate-200 dark:text-slate-300">Employees: {hover.count}</div>
                </div>
              )}
            </div>
          )}
          <div className="mt-3 text-sm text-slate-500">Tip: hover countries to see details</div>
        </Card>
      </div>
    </div>
  )
}
