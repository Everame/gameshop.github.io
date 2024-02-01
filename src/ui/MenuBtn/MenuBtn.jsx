import React from 'react'
import "./MenuBtn.scss"
import { Link } from 'react-router-dom'

export default function MenuBtn({text, link, active}) {
  return (
    <Link to={link} data-testid="linkParent" className={`linkBtn ${active ? "active" : ""}`}>
        <span data-testid="text" className="text">{text}</span>
    </Link>
  )
}
