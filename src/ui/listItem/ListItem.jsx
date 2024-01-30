import React from 'react'
import './ListItem.scss'
import { Link } from 'react-router-dom';

export default function LisItem({title, type, image, gamesCount, slug}) {
  return (
    <Link to={`/${type}/${slug}`} className="listItem" style={{backgroundImage: `url(${image})`}} key={slug} >
        <div id="infoBlock">
            <div id="statRow">
                <span id="gamesCount">{gamesCount}</span>
            </div>
            <h4>{title}</h4>
        </div>
    </Link>
  )
}