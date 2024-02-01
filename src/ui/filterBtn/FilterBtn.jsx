import React from 'react'
import "./filterBtn.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function FilterBtn({toggler, currentFilter, setCurrentFilter, ...buttonProps}) {
    const platforms = ["PC", "PlayStation", "Nintendo", "Android", "IOS"];
  return (
    <button data-testid="filterCont" className="filterBtn" {...buttonProps}>
        <span data-testid="filterText" className="btnTitle">{currentFilter}</span>
        {!toggler ?
            <FontAwesomeIcon icon={faAngleDown}/>:
            <FontAwesomeIcon icon={faAngleUp} />
        }
        <div data-testid="listCont" id="listContent" className={toggler ? "show" : ""}>
            {platforms.map((platform) => {
                return <artcile className="platformItem" 
                onClick={() => {setCurrentFilter(platform)}}>
                    {platform}
                </artcile>
            })}
        </div>
    </button>
  )
}
