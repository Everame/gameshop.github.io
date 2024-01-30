import React, { useEffect, useMemo, useRef, useState } from 'react'
import "./gamesGrid.scss"
import GameCard from './../gameCard/GameCard';
import SortBtn from '../../ui/sortBtn/SortBtn';
import Loader from '../../ui/loader/Loader';

export default function GamesGrid({games, titleOn, isLoading, getData, setState, end}) {
    const [isRate, setIsRate] = useState(true);
    const [rateTogller, setRateToggler] = useState(true);
    const [dateTogller, setDateToggler] = useState(false);


    useMemo(() => {
        if(isRate){
            if(rateTogller){
                games.sort((a, b) => {return b.rating - a.rating});
                setState({currentOrdering: "-rating"})
            }else{
                games.sort((a, b) => {return a.rating - b.rating});
                setState({currentOrdering: "rating"})
            }
        }else{
            if(dateTogller){
                games.sort((a, b) => {return new Date(b.released) - new Date(a.released)});
                setState({currentOrdering: "-released"})
            }else{
                games.sort((a, b) => {return new Date(a.released) - new Date(b.released)});
                setState({currentOrdering: "released"})
            }
        }
    }, [isRate, rateTogller, dateTogller])

    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting){
                getData()
            }
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
      }, []);
  return (
    <>
        {
        !titleOn ? null : isRate ? 
            <h1>Games by popularity</h1> : <h1>Freshness games</h1>
        }
        <div id="sortRow">
            <SortBtn title={"Relevance"} toggler={rateTogller} 
            onClick={() => {setIsRate(true); setRateToggler(!rateTogller)}} 
            style={{backgroundColor: isRate ? "var(--focus-color)" : "var(--sub-color)"}} />
            <SortBtn title={"Release date"} toggler={dateTogller} 
            onClick={() => {setIsRate(false); setDateToggler(!dateTogller)}} 
            style={{backgroundColor: isRate ? "var(--sub-color)" : "var(--focus-color)"}} />
        </div>
        <div id="gamesGrid">
            {games.map((game) => {
                return <GameCard  title={game.name} image={game.background_image} rating={game.rating} relizeDate={game.released} slug={game.slug} /> 
            })}
        </div>
        <div id="loaderCont" ref={ref}>
            {isLoading ? <Loader/> : null}
            {end ? <h4>End of page</h4> : null}
        </div>
    </>
  )
}
