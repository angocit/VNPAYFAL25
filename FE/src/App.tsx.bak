import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import type { IProduct } from './types/product';
import ProductItem from './components/products/productItem';

function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [products,setProduct] = useState<IProduct[]>([])
  const [value,setValue] = useState<string>('')
  useEffect(()=>{
    const getAllProduct = async ()=>{
        try {
          const {data} = await axios.get(`http://localhost:3000/products`)
          setProduct(data)
        } catch (error) {          
        }
    } 
    getAllProduct()    
  },[])
  const MessageFn = (title:string)=>{
    alert(title)
  }
  return (
    <>
      {/* <h1>Vite + React</h1> */}
        <h1 className="text-3xl font-bold underline text-red-700">
      Hello world!
    </h1>
      <input onChange={(e:any)=>setValue(e.target.value)} placeholder='Nhập tên sản phẩm'/>
      {products&&products.length>0&&
        products.map(item=>
            <ProductItem MessageFn={MessageFn} product={item} key={item.id}/>
        )}
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount2((count2) => count2 + 1)}>
          count2 is {count2}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
