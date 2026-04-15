import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./components/molecules/ProductCard"
import Gallery from "./components/organisms/gallery/Gallery"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Gallery />
  </StrictMode>,
)
