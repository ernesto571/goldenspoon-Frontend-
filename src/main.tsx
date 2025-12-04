import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = "pk_test_Y29ycmVjdC10cm9sbC0xOS5jbGVyay5hY2NvdW50cy5kZXYk"

const customAppearance = {
  elements: {
    formButtonPrimary: "bg-[#157c6e] hover:bg-[#116257] text-white border-none",
    footerActionLink: "text-[#157c6e] hover:text-[#116257] font-bold"
    
  }
};

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={customAppearance} >
      <App />
    </ClerkProvider>
  </StrictMode>,
)