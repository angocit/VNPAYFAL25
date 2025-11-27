import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query';
import { Button, message} from 'antd';
import axios from 'axios';
import React from 'react'

type Props = {
    pid:string
}

const AddToCart = ({pid}: Props) => {
    const mutation = useMutation({
        mutationFn: async (pid:string)=>{
            const product={productId:pid,quantity:1}
            const {data} = await axios.post("http://localhost:3000/api/products/addtocart",product)    
            return data      
        },
        onSuccess: (value:any)=>message.success(value.message),
        onError: (err:any)=>message.error(err.message)
    })
const handleAddTocart = ()=>{
    mutation.mutate(pid)
}
  return (
     <Button type="primary" icon={<ShoppingCartOutlined />} onClick={()=>handleAddTocart()}>
        Add to cart
      </Button>
  )
}

export default AddToCart