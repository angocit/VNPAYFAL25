import { Route, Routes, useRoutes } from "react-router-dom"
import Home from "./pages/Home"
import ClientLayout from "./layouts/client/ClientLayout"
import AdminLayout from "./layouts/admin/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import Cart from "./pages/Cart"
import CheckPayment from "./pages/CheckPayment"

function App() {
  const router = useRoutes([
    {path:'/',Component:ClientLayout,children:[
      {path:'',Component:Home},
      {path:'cart',Component:Cart},
      {path:'checkpayment',Component:CheckPayment}
    ]},
    {path:'/admin',Component:AdminLayout,children:[
      {path:'',Component:Dashboard},
    ]}
  ]) 
  return router
}

export default App
