import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import type { IData, IProduct } from '../types/product'
import AddToCart from '../components/AddToCart'

const Home = () => {
  const queryclient = useQueryClient()
  const {data,isLoading,isError} = useQuery<IData>({
    queryKey: ["AllProduct"],
    queryFn: async ()=>{
      const {data} = await axios.get("http://localhost:3000/api/products")
      return data
    },
    // enabled: !queryclient.getQueryData(["AllProduct"])
     staleTime:Infinity
  })
  if (isLoading) return <>Loading</>
  return (
    <div className='grid grid-cols-5 gap-5'>
       {data&&data.data&&data.data.map(item=>(
        <div key={item._id} className='flex flex-col'>
          <img src={item.image}/>
          <h3>{item.name}</h3>
          <span>{item.price}</span>
          <AddToCart pid={item._id}/>
        </div>
       ))}
    </div>
  )
}

export default Home