import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./components/molecules/ProductCard"
import ProductCard from './components/molecules/ProductCard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductCard />
    <ProductCard />
  </StrictMode>,
)
