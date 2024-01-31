import React, { useMemo, useState } from 'react'
import "./header.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuBtn from '../../ui/MenuBtn/MenuBtn'
import { Link } from 'react-router-dom'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import FetchHttpClient from '../../apiQueries'
import { useTranslation } from 'react-i18next'
import { EN, RU } from '../../assets/assets'

export default function Header({linkActive}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [games, setGames] = useState([]);
    const {t, i18n} = useTranslation();

    function search(){
        const fhc = new FetchHttpClient({'Content-Type': 'application/json'});
        const gamesRes = fhc.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2023-01-01,2024-01-29&search=${searchQuery}`);
        gamesRes.then((result) => {
            return setGames([...result.results])
        })
        const genres = fhc.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2023-01-01,2024-01-29&genres=${searchQuery}`);
        genres.then((result) => {
            return setGames([...games, ...result.results])
        })
        const developers = fhc.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2023-01-01,2024-01-29&developers=${searchQuery}`);
        developers.then((result) => {
            return setGames([...games, ...result.results])
        })
    }

    useMemo(() => {
        search()
    }, [searchQuery])
  return (
    <header>
        <Link to="/" id="logo">
            <h1>G<span className="green">SH</span></h1>
        </Link>
        <div id="searchField">
            <input type="text" id="search" placeholder={t("search")} value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}/>
            <FontAwesomeIcon icon={faSearch} id='searchIcon' className='icon'/>
            <FontAwesomeIcon icon={faTimes} id='clearIcon' style={{display: searchQuery != "" ? "flex" : "none" }} onClick={() => {setSearchQuery("")}}/>
            <div id="responseBlock" className={searchQuery !== "" ? "show" : ""}>
                {games.map((game, index) => {
                    return <Link to={`/game/${game.slug}`} className="responseItem" key={index}>
                        <div className="imgBlock">
                            <img src={game.background_image} alt="game preview" />
                        </div>
                        <h5>{game.name}</h5>
                    </Link>
                })}
                {
                    games.length === 0 && searchQuery !== "" ?
                    <article className="responseItem" key={"nothing"}>
                        <h5>{t('nothing')}</h5>
                    </article> : null
                }
            </div>
        </div>
        <div id="btnMenu">
            <button id='langSwitch' onClick={() => {i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')}}>{i18n.language === 'en' ? <EN/>: <RU/>}</button>
            <MenuBtn text={t('genres')} active={linkActive === 'genres' ? true : false} link="/genres"/>
            <MenuBtn text={t('developers')} active={linkActive === 'developers' ? true : false} link="/developers"/>
        </div>
    </header>
  )
}
