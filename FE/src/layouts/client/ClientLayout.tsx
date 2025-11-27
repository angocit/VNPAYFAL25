import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientHeader from './components/ClientHeader'
import ClientFooter from './components/ClientFooter'

const ClientLayout = () => {
  return (
    <>
        <ClientHeader/>
         <div className='max-w-7xl mx-auto relative my-8'>
        <Outlet/>
        </div>
        <ClientFooter/>
    </>
  )
}

export default ClientLayout