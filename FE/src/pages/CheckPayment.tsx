import axios from 'axios'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const CheckPayment = () => {
    const [params] = useSearchParams()
    useEffect(()=>{
        console.log(params.toString()); 
        (async ()=>{
            const {data} = await axios.get(`http://localhost:3000/api/payment/check-payment?${params.toString()}`)
            console.log(data);            
        })()       
    })
  return (
    <div>CheckPayment</div>
  )
}

export default CheckPayment