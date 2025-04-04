import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

const TemplateApp = () => {

  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center overflow-hidden'>
        <div className='flex gap-4'>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className='shadow-lg'>
            <img src={reactLogo} className="decoration-warning-content" alt="React logo" />
          </a>
        </div>
        <h1 className='text-3xl font-bold mt-4'>Vite + React</h1>
        <div className='mt-4 flex flex-col items-center'>
          {/* DaisyUI + TailwindCSS Modal Button Template */}
          <label htmlFor="my_modal_7" className="btn mb-2" data-theme="light" onClick={() => setCount(count + 1)}>
            Login! {count}
          </label>
          {/* This is standard html button with TailwindCSS theme change and styling */}
          <button className="btn btn-primary" data-theme="synthwave" onClick={() => setCount(count + 1)}>
            Count is {count}
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

export default TemplateApp;
