import React from 'react'
import "./MenuBtn.scss"
import { Link } from 'react-router-dom'

export default function MenuBtn({text, link, active}) {
  return (
    <Link to={link} className={`linkBtn ${active ? "active" : ""}`}>
        <span className="text">{text}</span>
    </Link>
  )
}
