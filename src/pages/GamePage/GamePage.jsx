import React, { Component } from 'react'
import { useParams } from 'react-router';
import FetchHttpClient from '../../apiQueries';
import Loader from '../../ui/loader/Loader';
import "./gamePage.scss"
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import ScreenSlider from '../../components/screenSlider/ScreenSlider';
import { Link } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          slug: this.props.params.slug,
          game: {},
          screenshots: [],
          sliderShow: false
        };
      }

    sliderClose(){
        this.setState({
            sliderShow: false
        });
    }
    
    getData(){
        this.setState({
            isLoading: true
        });
        const fhc = new FetchHttpClient({'Content-Type': 'application/json'});
        const data = fhc.get(`https://api.rawg.io/api/games/${this.state.slug}?key=${process.env.REACT_APP_API_KEY}`);
        data.then((result) => {
            this.setState({
            game: {...result}
            });
        })
        const screens = fhc.get(`https://api.rawg.io/api/games/${this.state.slug}/screenshots?key=${process.env.REACT_APP_API_KEY}`);
        screens.then((result) => {
            this.setState({
                isLoading: false,
                screenshots: [...result.results]
            });
        })
    }

    componentDidMount(){
        this.getData();
    }

  render() {
    const {game, isLoading, screenshots, sliderShow} = this.state;
    return (
        isLoading ? 
        <div id="loaderOut">
            <Loader/>
        </div>:
        <>
            <Header/>
            <div id="pageArt" style={{backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${game.background_image_additional})`}}></div>
            <div id="contentBlock">
                <div id="doubleBlock">
                    <div id="infoBlock">
                        <div className="infoRow">
                            <h4>Developers: {game.developers?.map((developer) => {return <Link to={`/developers/${developer.slug}`} className="listItem pointer" key={developer.slug}>{developer.name}</Link>})}</h4>
                        </div>
                        <h1 id='gameTitle'>{game.name}</h1>
                        <div id="rateAndReleased">
                            <span id="rate">
                                {Array.from(Array(5), (e, i) => {
                                    return <FontAwesomeIcon icon={i < Math.round(game.rating) ? faStar : regularStar} key={i} />
                                })} 
                            </span>
                            <span id="relizeDate">
                                <span className="white" style={{marginRight: "calc(var(--index) * 0.3)"}}>Released:</span> 
                                {game.released}
                            </span>
                        </div>
                        <div className="infoRow">
                            <h4>Genres: {game.genres?.map((genre) => {return <Link to={`/genres/${genre.slug}`} className="listItem pointer" key={genre.slug}>{genre.name}</Link>})}</h4>
                        </div>
                        <div className="infoRow">
                            <h4 >Platforms: {game.parent_platforms?.map((platform) => {return <span className="listItem" key={platform.platform.slug}>{platform.platform.name}</span>})}</h4>
                        </div>
                        <div className="infoRow">
                            <h4 >Stores: {game.stores ? game.stores.map((store) => {return <span className="listItem" key={store.store.slug}>{store.store.name}</span>}) : <span className="listItem">Not available for sale</span>}</h4>
                        </div>
                        <div id="rateBlock">
                            <div className="rateCont">
                                {
                                    game.ratings?.map((rate) => {
                                        return(
                                            <div id={rate.title}
                                            onMouseEnter={() => {
                                                const arr = document.querySelectorAll(`#${rate.title}`)
                                                arr[0].classList.add('hover');
                                                arr[1].classList.add('hover');
                                            }}
                                            onMouseLeave={() => {
                                                const arr = document.querySelectorAll(`#${rate.title}`)
                                                arr[0].classList.remove('hover');
                                                arr[1].classList.remove('hover');
                                            }}
                                            style={{width:  `${rate.percent}%` }}
                                            key={rate.slug}></div>
                                        )
                                    })
                                }
                            </div>
                            <div id="statRow">
                                {
                                    game.ratings?.map((rate, index) => {
                                        return(
                                            <div id={rate.title} className={`statItem`}
                                            onMouseEnter={() => {
                                                const arr = document.querySelectorAll(`#${rate.title}`)
                                                arr[0].classList.add('hover');
                                                arr[1].classList.add('hover');
                                            }}
                                            onMouseLeave={() => {
                                                const arr = document.querySelectorAll(`#${rate.title}`)
                                                arr[0].classList.remove('hover');
                                                arr[1].classList.remove('hover');
                                            }}
                                            key={index}>
                                                <div id={`${rate.title}`} className="colorCircle"></div>
                                                <div className="statTitle">{rate.title}</div>
                                                <div className="value">{rate.count}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        {game.website !== "" ?
                            <div className="infoRow">
                                <h5 >Website: <a href={game.website} className="listItem link">{game.website}</a></h5>
                            </div> :
                            null
                        }
                        
                    </div>
                    <div id="screenBlock">
                        {screenshots.map((screen, index) => {
                             return index < 5 ? <img src={screen.image} alt="game screen" onClick={() => {this.setState({sliderShow: true})}} key={screen.id} /> : null
                        })}
                    </div>
                </div>
                <div id="textBlock">
                    <h4 id='aboutTitle'>About Game</h4>
                    <p>{game.description_raw}</p>
                </div>
            </div>
            {sliderShow ? <ScreenSlider screenshots={screenshots} close={this.sliderClose.bind(this)}/> : null}
        </>
    )
  }
}


export default withParams(GamePage);