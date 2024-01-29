import React from 'react'
import "./SortBtn.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function SortBtn({title, toggler, ...buttonProps}) {
  return (
    <button className="sortBtn" {...buttonProps}>
        <span className="btnTitle">{title}</span>
        {toggler === true ?
            <FontAwesomeIcon icon={faAngleDown}/>:
            <FontAwesomeIcon icon={faAngleUp} />
        }
    </button>
  )
}
