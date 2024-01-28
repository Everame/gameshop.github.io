import React from 'react'
import './gameCard.scss'

export default function GameCard({title, image, rate, relizeDate, key}) {
  return (
    <article className="gameCard" style={{backgroundImage: `url(${image})`}} key={key} >
        <div id="infoBlock">
            <div id="statRow">
                <span id="rate">{rate}</span>
                <span id="relizeDate">{relizeDate}</span>
            </div>
            <h4>{title}</h4>
        </div>
    </article>
  )
}
