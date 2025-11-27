import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import '@ant-design/v5-patch-for-react-19'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </BrowserRouter>
  // </StrictMode>,
)
