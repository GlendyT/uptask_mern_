import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyecto"
import Alerta from "./Alerta"

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [fechaEntrega, setFechaEntrega] = useState("")
    const [cliente, setCliente] = useState("")

    const params = useParams();
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

    useEffect(() => {
      if (params.id ) {
        setId(proyecto._id)
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setFechaEntrega(proyecto.fechaEntrega?.split("T")[0])
        setCliente(proyecto.cliente)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes("") ) {
            mostrarAlerta({
                msg:"Todos los Campos son Obligatorios",
                error:true
            })
            return
        }
        //PASAR LOS DATOS HACIA EL PROVIDER
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente})

        setId(null)
        setNombre("")
        setCliente("")
        setDescripcion("")
        setFechaEntrega("")
    }

    const { msg } = alerta

  return (
    <form 
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta}/>}
        <div className="mb-5">
            <label
              className="text-gray-700 uppercase font-bold text-sm "
              htmlFor="nombre"
            >Nombre Proyecto</label>

                <input
                 id="nombre"
                 type="text"
                 className="border w-full p-2 mt-2 placeholder-gary-400 rounded-md"
                 placeholder="Nombre del Proyecto"
                 value={nombre}
                 onChange={(e) => setNombre(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label
              className="text-gray-700 uppercase font-bold text-sm "
              htmlFor="descripcion"
            >Descripcion</label>

                <textarea
                 id="descripcion"
                 className="border w-full p-2 mt-2 placeholder-gary-400 rounded-md"
                 placeholder="Descripcion del Proyecto"
                 value={descripcion}
                 onChange={(e) => setDescripcion(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label
              className="text-gray-700 uppercase font-bold text-sm "
              htmlFor="fecha-entrega"
            >Fecha Entrega</label>

                <input
                 id="fecha-entrega"
                 type="date"
                 className="border w-full p-2 mt-2 placeholder-gary-400 rounded-md"
                 value={fechaEntrega}
                 onChange={(e) => setFechaEntrega(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label
              className="text-gray-700 uppercase font-bold text-sm "
              htmlFor="cliente"
            >Nombre Cliente</label>

                <input
                 id="cliente"
                 type="text"
                 className="border w-full p-2 mt-2 placeholder-gary-400 rounded-md"
                 placeholder="Nombre del Cliente"
                 value={cliente}
                 onChange={(e) => setCliente(e.target.value)}
                />
        </div>
        <input
        type="submit"
        value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
        className="bg-purple-600 hover:bg-purple-700 transition-colors rounded text-white focus:outline-none cursor-pointer uppercase w-full font-bold p-3"

        />
    </form>
  )
}

export default FormularioProyecto