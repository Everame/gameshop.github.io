import React, { Component} from 'react'
import "./homepage.scss"
import Header from '../../components/header/Header'
import FetchHttpClient from '../../apiQueries'
import GamesGrid from '../../components/gamesGrid/GamesGrid';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentPage: 1,
      currentOrdering: "-rating",
      games: []
    };
  }

  getData(){
    this.setState({
      isLoading: true
    });
    const fhc = new FetchHttpClient({'Content-Type': 'application/json'});
    const data = fhc.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2023-01-01,2024-01-29&page=${this.state.currentPage}&ordering=${this.state.currentOrdering}`);
    data.then((result) => {
      this.setState({
        isLoading: false,
        currentPage: this.state.currentPage + 1,
        games: [...this.state.games, ...result.results]
      });
    })
    
  }


  render() {
    const {games} = this.state;
    return (
      <>
        <Header/>
        <div className="bodyBlock">
          <GamesGrid games={games} titleOn={true} isLoading={this.state.isLoading} getData={this.getData.bind(this)} setState={this.setState.bind(this)}/>
        </div>
      </>
    )
  }
}
