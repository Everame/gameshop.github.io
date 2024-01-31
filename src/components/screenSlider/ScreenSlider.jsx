import { faAngleLeft, faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import "./screenSlider.scss"

export default function ScreenSlider({screenshots, close}) {
    const[currentScreen, setCurrentScreen] = useState(0);
    useEffect(() => {
        document.querySelector('#mainScreen').classList.add("anim")
        setTimeout(() => {
            document.querySelector('#mainScreen').classList.remove("anim")
        }, 600)
    }, [currentScreen])
  return (
    <div id="outerCont">
        <div id="btnsRow">
            <div id="prevBtn" 
            className={currentScreen === 0 ? "hide" : ""} 
            onClick={(e) => {setCurrentScreen(currentScreen - 1)}}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div id="nextBtn" 
            className={screenshots && currentScreen === screenshots.length - 1 ? "hide" : ""} 
            onClick={(e) => {setCurrentScreen(currentScreen + 1)}}>
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <div id="closeBtn" onClick={() => {close()}}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
        <div id="contentBlock">
            <div id='left' 
            className={`navBtn ${currentScreen === 0 ? "hide" : ""}`}
            onClick={(e) => {setCurrentScreen(currentScreen - 1)}}></div>
            <div id='right' 
            className={`navBtn ${screenshots && currentScreen === screenshots.length - 1 ? "hide" : ""}`}
            onClick={(e) => {setCurrentScreen(currentScreen + 1)}}></div>
            <div id="mainScreen">
                <img src={screenshots ? screenshots[currentScreen].image : ""} style={{animation: "fadeOut 1s ease"}} alt="main screenshot" />
            </div>
        </div>
        <div id="thumbRow">
            
            {screenshots?.map((screen, index) => {
                return (
                    <div className={`thumbCont ${currentScreen === index ? "active" : ""}`} key={index} onClick={(e) => {setCurrentScreen(index)}}>
                        <img className='thumb' src={screen.image} alt="thumb screenshot" />
                    </div>
                )
            })}
        </div>
    </div>
  )
}
