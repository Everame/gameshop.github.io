import React, { useEffect, useMemo, useRef, useState } from 'react'
import "./gamesGrid.scss"
import GameCard from './../gameCard/GameCard';
import SortBtn from '../../ui/sortBtn/SortBtn';
import Loader from '../../ui/loader/Loader';
import FilterBtn from '../../ui/filterBtn/FilterBtn';

export default function GamesGrid({games, titleOn, filterOn, isLoading, getData, setState, end}) {
    const [isRate, setIsRate] = useState(true);
    const [rateTogller, setRateToggler] = useState(true);
    const [dateTogller, setDateToggler] = useState(false);
    const [filterTogller, setFilterToggler] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("Choose platform");


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
        if(currentFilter !== "Choose platform"){
            setState({currentFilter: currentFilter, games: [], currentPage: 1, count: 0})
            getData()
        }
    }, [isRate, rateTogller, dateTogller, currentFilter])

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
            {filterOn ? 
                <FilterBtn currentFilter={currentFilter} toggler={filterTogller} setCurrentFilter={setCurrentFilter}
                onClick={() => {setFilterToggler(!filterTogller)}} 
                style={{backgroundColor: isRate ? "var(--sub-color)" : "var(--focus-color)"}} />
                : null
            }
            
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
