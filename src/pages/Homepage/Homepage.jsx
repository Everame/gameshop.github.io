import React, { Component} from 'react'
import "./homepage.scss"
import Header from '../../components/header/Header'
import FetchHttpClient from '../../apiQueries'
import GameCard from '../../components/gameCard/GameCard';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  getData(){
    const fhc = new FetchHttpClient({'Content-Type': 'application/json'});
    console.log(process.env)
    const data = fhc.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`);
    data.then((result) => {
      this.setState({
        games: result.results
      });
    })
    
  }

  componentDidMount = () => {
    this.getData();
  }


  render() {
    const {games} = this.state;
    return (
      <>
        <Header/>
        <div className="bodyBlock">
          <h1 onClick={() => {console.log(this.state.games);}}>Most popular games</h1>
          <div id="gamesGrid">
            {games.map((game) => {
              return <GameCard  title={game.name} image={game.background_image} rate={game.rating_top} relizeDate={game.released} key={game.id} /> 
            })}
          </div>
        </div>
      </>
    )
  }
}
