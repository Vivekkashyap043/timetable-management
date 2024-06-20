import React from 'react'
import TimeTable from './components/TimeTable'

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark d-flex justify-content-center">
        <h1 style={{ color: "white" }}>Time Table Management</h1>
      </nav>
      <div className='d-flex justify-content-center'>
        <h1>Faculty time table</h1>
      </div>
      <div>
        <TimeTable/>
      </div>
    </div>
  )
}
