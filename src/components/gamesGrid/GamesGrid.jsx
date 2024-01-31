import React, { useEffect, useMemo, useRef, useState } from 'react'
import "./gamesGrid.scss"
import GameCard from './../gameCard/GameCard';
import SortBtn from '../../ui/sortBtn/SortBtn';
import Loader from '../../ui/loader/Loader';
import FilterBtn from '../../ui/filterBtn/FilterBtn';
import { useTranslation } from 'react-i18next';

export default function GamesGrid({games, titleOn, filterOn, isLoading, getData, setState, end}) {
    const {t} = useTranslation();
    const choseText = t('choose');
    const relevanceText = t('relevance');
    const dateText = t('date');
    const [isRate, setIsRate] = useState(true);
    const [rateTogller, setRateToggler] = useState(true);
    const [dateTogller, setDateToggler] = useState(false);
    const [filterTogller, setFilterToggler] = useState(false);
    const [currentFilter, setCurrentFilter] = useState(t('choose'));
    
    useMemo(() => {
        if(currentFilter === "Choose platform" || currentFilter === "Выберите платформу"){
            setCurrentFilter(choseText);
        }
    }, [choseText])

    
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
        if(currentFilter !== "Choose platform" && currentFilter !== "Выберите платформу"){
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
            <h1>{t("popular")}</h1> : <h1>{t("fresh")}</h1>
        }
        <div id="sortRow">
            <SortBtn title={relevanceText} toggler={rateTogller} 
            onClick={() => {setIsRate(true); setRateToggler(!rateTogller)}} 
            style={{backgroundColor: isRate ? "var(--focus-color)" : "var(--sub-color)"}} />
            <SortBtn title={dateText} toggler={dateTogller} 
            onClick={() => {setIsRate(false); setDateToggler(!dateTogller)}} 
            style={{backgroundColor: isRate ? "var(--sub-color)" : "var(--focus-color)"}} />
            {filterOn ? 
                <FilterBtn currentFilter={currentFilter} toggler={filterTogller} setCurrentFilter={setCurrentFilter}
                onClick={() => {setFilterToggler(!filterTogller)}} 
                style={{backgroundColor: currentFilter !== "Choose platform" && currentFilter !== "Выберите платформу" ? "var(--focus-color)" : "var(--sub-color)"}} />
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
            {end ? <h4>{t('end')}</h4> : null}
        </div>
    </>
  )
}
