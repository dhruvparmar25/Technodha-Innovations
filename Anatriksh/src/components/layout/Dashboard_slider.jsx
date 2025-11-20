import React from 'react'
import { NavLink } from 'react-router-dom'

function Dashboard_slider() {
  return (
 <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/" className="nav-item">
            Dashboard
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default Dashboard_slider