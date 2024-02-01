import React from 'react'
import "./SortBtn.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function SortBtn({title, toggler, ...buttonProps}) {
  return (
    <button data-testid="sortCont" className="sortBtn" {...buttonProps}>
        <span data-testid="sortText" className="btnTitle">{title}</span>
        {toggler === true ?
            <FontAwesomeIcon icon={faAngleDown}/>:
            <FontAwesomeIcon icon={faAngleUp} />
        }
    </button>
  )
}
