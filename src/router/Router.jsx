import {createBrowserRouter} from "react-router-dom"
import Home from "../pages/Home"
import Login from  "../pages/Login"
import Categoria from "../pages/Categoria"
import Almacen from "../pages/Almacen"

const router = createBrowserRouter([
{
    path:"/",
    element:<Home/>,
},
{
    path:"/login",
    element:<Login/>
},
{
    path:"/categoria",
    element:<Categoria/>
},
{
    path:"/almacen",
    element:<Almacen/>
}
])

export default router