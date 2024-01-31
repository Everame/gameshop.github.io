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
      currentFilter: "",
      count: 0,
      end: false,
      games: []
    };
  }

  getData(){
    this.setState({
      isLoading: true
    });
    const fhc = new FetchHttpClient({'Content-Type': 'application/json'});
    let data;
    const url = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2023-01-01,2024-01-29&page=${this.state.currentPage}&ordering=${this.state.currentOrdering}`;         
    if(this.state.count === 0){
      data = fhc.get(url);
      data.then((result) => {
        let results = result.results;
        if(this.state.currentFilter !== ""){
          results = results.filter((result) => {return result.parent_platforms.map((platform) => {return platform.platform.name}).includes(this.state.currentFilter)})
        }
        return this.setState({
          isLoading: false,
          currentPage: this.state.currentPage + 1,
          count: result.count,
          games: [...this.state.games, ...results]
        });
      })
    }else{
      if(this.state.currentPage <= this.state.count/20){
        data = fhc.get(url);
        data.then((result) => {
          let results = result.results;
          if(this.state.currentFilter !== ""){
            results = results.filter((result) => {return result.parent_platforms.map((platform) => {return platform.platform.name}).includes(this.state.currentFilter)})
          }
          return this.setState({
            isLoading: false,
            currentPage: this.state.currentPage + 1,
            games: [...this.state.games, ...results]
          });
        })
      }else{
        return this.setState({
          isLoading: false,
          end: true
        });
      }
    }
    
  }


  render() {
    const {games} = this.state;
    return (
      <>
        <Header/>
        <div className="bodyBlock">
          <GamesGrid games={games} titleOn={true} filterOn={true} isLoading={this.state.isLoading} getData={this.getData.bind(this)} setState={this.setState.bind(this)} end={this.state.end}/>
        </div>
      </>
    )
  }
}
