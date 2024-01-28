import React from 'react'
import "./MenuBtn.scss"
import { Link } from 'react-router-dom'

export default function MenuBtn({text, link}) {
  return (
    <Link to={link} className='linkBtn'>
        <span className="text">{text}</span>
    </Link>
  )
}
