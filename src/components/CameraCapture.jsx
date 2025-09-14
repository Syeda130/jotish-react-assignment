import React, {useRef, useEffect, useState} from 'react'

export default function CameraCapture({onCapture}){
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [started, setStarted] = useState(false)

  useEffect(()=>{
    return ()=>{
      if(stream){
        stream.getTracks().forEach(t=>t.stop())
      }
    }
  },[stream])

  async function start(){
    try{
      const s = await navigator.mediaDevices.getUserMedia({video:true})
      videoRef.current.srcObject = s
      setStream(s)
      setStarted(true)
      await videoRef.current.play()
    }catch(e){
      alert('Camera access denied or not available')
    }
  }

  function capture(){
    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video,0,0,canvas.width, canvas.height)
    const data = canvas.toDataURL('image/png')
    if(onCapture) onCapture(data)
  }

  return (
    <div>
      {!started && <button onClick={start} className="px-3 py-1 bg-indigo-600 text-white rounded">Start Camera</button>}
      <div className="mt-3">
        <video ref={videoRef} className="w-full max-w-md bg-black rounded" playsInline></video>
      </div>
      <div className="mt-3 space-x-2">
        <button onClick={capture} className="px-3 py-1 bg-emerald-600 text-white rounded">Capture Photo</button>
        <button onClick={()=>{ if(stream){ stream.getTracks().forEach(t=>t.stop()); setStarted(false); setStream(null)} }} className="px-3 py-1 bg-red-400 rounded">Stop</button>
      </div>
      <canvas ref={canvasRef} style={{display:'none'}} />
    </div>
  )
}
