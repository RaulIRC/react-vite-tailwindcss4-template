import { createFileRoute } from '@tanstack/react-router'
import firebaseLogo from '../assets/firebase-brand-assets/Firebase Logo & Product Icons  2/Firebase Logo/Primary Logomark/SVG/Logomark_Full Color.svg'
import { useState } from 'react'

// This is the root index for the website.

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const tanstackImageUrl = 'https://avatars.githubusercontent.com/u/72518640?s=200&v=4'
  const [count, setCount] = useState(0)
  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center overflow-hidden'>
        <div className='flex gap-4'>
          <a href="https://firebase.google.com/" target="_blank">
            <img src={firebaseLogo} className="h-25 w-25 logo" alt="Vite logo" />
          </a>
          <a href="https://tanstack.com/" target="_blank" className='shadow-lg h-25 w-25'>
            <img src={tanstackImageUrl} className="decoration-warning-content rounded-full" alt="React logo" />
          </a>
        </div>
        <h1 className='text-3xl font-bold mt-4'>Vite + React</h1>
        <div className='mt-4 flex flex-col items-center'>
          {/* DaisyUI + TailwindCSS Modal Button Template */}
          <label htmlFor="my_modal_7" className="btn mb-2" data-theme="light" onClick={() => setCount(count + 1)}>
            Test Button!
          </label>
          {/* This is standard html button with TailwindCSS theme change and styling */}
          <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
            Count is {count}?
          </button>
          <p className='mt-4'>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs mt-4">
          Click on the Vite and React logos to learn more
        </p>
        <input type="checkbox" id="my_modal_7" className='modal-toggle' />
      </div>
    </>
  )
}

export default Route;