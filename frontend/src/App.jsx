import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { SessionProvider } from './context/SessionContext'


function App() {
  return (
    <div className="bg-slate-100 h-screen ">
      <div className="flex justify-center items-center ">
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
      </div>
    </div>
  )
}

export default App
