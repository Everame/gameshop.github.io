import React from 'react'
import './gameCard.scss'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GameCard({title, image, rating, relizeDate, key}) {
  return (
    <article className="gameCard" style={{backgroundImage: `url(${image})`}} key={key} >
        <div id="infoBlock">
            <div id="statRow">
                <span id="rate">
                {Array.from(Array(5), (e, i) => {
                  return <FontAwesomeIcon icon={i < Math.round(rating) ? faStar : regularStar} key={i} />
                })} 
                </span>
                <span id="relizeDate">{relizeDate}</span>
            </div>
            <h4>{title}</h4>
        </div>
    </article>
  )
}
