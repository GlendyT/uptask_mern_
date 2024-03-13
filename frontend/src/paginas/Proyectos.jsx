
import useProyectos from "../hooks/useProyecto"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"



const Proyectos = () => {

  const { proyectos, alerta } = useProyectos()

  /*
  import io  from 'socket.io-client'
  import { useEffect } from "react"
  
let socket;
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("prueba", proyectos)

    socket.on("respuesta", (persona) => {
      console.log("Desde el frontend", persona)
    })
  })*/

  const { msg } = alerta
  
  return (
    <>
    <h1 className="text-4xl font-black">Proyectos</h1>
    {msg && <Alerta alerta={alerta} />}
    <div className="bg-white shadow mt-10 rounded-lg ">
      {proyectos.length ? 
        proyectos.map(proyecto => (
          <PreviewProyecto
          key={proyecto._id}
          proyecto={proyecto}
          />
        ))
       : <p className=" text-center text-gray-600 uppercase">No hay Proyectos aún</p>}
    </div>
    </>
  )
}

export default Proyectos