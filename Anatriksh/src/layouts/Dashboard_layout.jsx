import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard_Header from '../components/Header/Dashboard_Header'
import Dashboard_slider from '../components/Sidebar/Dashboard_slider'

function Dashboard_layout() {
  return (
    <div>
      <Dashboard_Header />
      <Dashboard_slider />

      <main className="content-area">
        <Outlet /> {/* Yahi par nested routes load honge */}
      </main>
    </div>
  )
}

export default Dashboard_layout
