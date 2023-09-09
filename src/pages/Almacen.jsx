import { useState,useEffect } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import AlmacenService from "../services/Almacen.service"

const Almacen = () => {
    const [data,setData] = useState([])
    const [newData,setNewData] = useState({
        descripcion:"",
        ubicacion:""
    })
    const [refreshData,setRefreshData] = useState(false)
    const [dataId,setDataId] = useState(0)

    const tab = <>&nbsp;&nbsp;</>;

    useEffect(()=>{
        AlmacenService.getAll().then(
            (res)=>{
                setData(res);
                setRefreshData(false)
            }
        )
    },[refreshData])

    const handleInputChange = (e) =>{
        const {name,value} = e.target
        return setNewData({
            ...newData,[name]:value
        })
    }

    
    const createUpdateData = (e) =>{
        e.preventDefault();
        if(dataId > 0){
            AlmacenService.updateOne(dataId,newData).then(
                (res)=>{
                    setRefreshData(true);
                    setNewData({
                        descripcion:"",
                        ubicacion:""
                    })
                    setDataId(0)
                }
            )
        }
        else{
            AlmacenService.setNew(newData).then(
                (res)=>{
                    console.log(res)
                    setRefreshData(true)
                    setNewData({
                        descripcion:"",
                        ubicacion:""
                    })
                    setDataId(0)
                }
            )
        }
    }

    const editData = (cod) =>{
        AlmacenService.getOne(cod).then(
            (res)=>{
                setNewData({
                    descripcion:res.descripcion,
                    ubicacion:res.ubicacion
                })
                setDataId(cod)
            }
        )
    }

    const deleteData = (cod) =>{
        AlmacenService.deleteOne(cod).then(
            (res)=>{
                setRefreshData(true);
                setNewData({
                    descripcion:"",
                    ubicacion:""
                })
                setDataId(0)
            }
        )
    }

    return(
        <div id="layout-wrapper">
            <Header />
            <div className="vertical-menu">
                <div data-simplebar className="h-100">
                    <Sidebar />
                </div>
            </div>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <h4>Almacenes</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={createUpdateData}>
                                            <div className="form-group">
                                                <label htmlFor="simpleinput">Descripción</label>
                                                <input type="text" 
                                                id="simpleinput" 
                                                className="form-control"
                                                name="descripcion" 
                                                placeholder=""
                                                value={newData.descripcion}
                                                onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="simpleinput">Ubicación</label>
                                                <input type="text" 
                                                id="simpleinput" 
                                                className="form-control"
                                                name="ubicacion" 
                                                placeholder=""
                                                value={newData.ubicacion}
                                                onChange={handleInputChange}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary waves-effect waves-light">Guardar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Descripción</th>
                                                <th>Ubicación</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map(dt => {
                                                return (
                                                    <tr key={dt.id}>
                                                        <td>{dt.descripcion}</td>
                                                        <td>{dt.ubicacion}</td>
                                                        <td>
                                                            <button className="btn btn-success"
                                                            onClick={()=>editData(dt.id)}
                                                            >
                                                                Editar
                                                            </button>
                                                            {tab}
                                                            <button className="btn btn-danger"
                                                            onClick={()=>deleteData(dt.id)}
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Almacen