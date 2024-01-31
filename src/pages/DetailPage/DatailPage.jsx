import React, { Component, Suspense } from 'react'
import { useParams } from 'react-router';
import FetchHttpClient from '../../apiQueries';
import Loader from '../../ui/loader/Loader';
import Header from '../../components/header/Header';
import "./detailPage.scss"
import GamesGrid from '../../components/gamesGrid/GamesGrid';
import { useTranslation } from 'react-i18next';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} t={useTranslation()}/>;
}

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          gameLoading: true,
          currentPage: 1,
          currentOrdering: "-rating",
          count: 0,
          end: false,
          slug: this.props.params.slug,
          item: {},
          games: []
        };
      }
    
    getData(){
        this.setState({
            isLoading: true
        });
        const fhc = new FetchHttpClient({'Content-Type': 'application/json'});
        const data = fhc.get(`https://api.rawg.io/api/${this.props.type}/${this.state.slug}?key=${process.env.REACT_APP_API_KEY}`);
        data.then((result) => {
            this.setState({
            item: {...result},
            isLoading: false
            });
        })
    }

    getSuitGame(){
      this.setState({
        gameLoading: true
      });
      const fhc = new FetchHttpClient({'Content-Type': 'application/json'});
      let data;
      if(this.state.count === 0){
        data = fhc.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2023-01-01,2024-01-29&page=${this.state.currentPage}&ordering=${this.state.currentOrdering}&${this.props.type}=${this.state.slug}`);
        data.then((result) => {
          return this.setState({
            gameLoading: false,
            currentPage: this.state.currentPage + 1,
            count: result.count,
            games: [...this.state.games, ...result.results]
          });
        })
      }else{
        if(this.state.currentPage <= this.state.count/20){
          data = fhc.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&dates=2023-01-01,2024-01-29&page=${this.state.currentPage}&ordering=${this.state.currentOrdering}&${this.props.type}=${this.state.slug}`);
          data.then((result) => {
            return this.setState({
              gameLoading: false,
              currentPage: this.state.currentPage + 1,
              games: [...this.state.games, ...result.results]
            });
          })
        }else{
          return this.setState({
            gameLoading: false,
            end: true
          });
        }
      }
  }

    componentDidMount(){
        this.getData();
    }

  render() {
    const {item, isLoading} = this.state;
    const {t} = this.props.t;
    return (
        isLoading ? 
        <Suspense fallback={<Loader/>}>
          <div id="loaderOut">
              <Loader/>
          </div>
        </Suspense>:
        <Suspense fallback={<Loader/>}>
            <Header/>
            <div id="pageArt" style={{backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${item.image_background})`}}></div>
            <div id="contentBlock">
                <div id="doubleBlock">
                    <div id="itemInfo">
                        <h1 id='itemTitle'>{item.name}</h1>
                        <div className="infoRow">
                            <h4>{t('count')}: <span className="listItem" key={0}>{item.games_count}</span></h4>
                        </div>
                        <div id="textBlock">
                            <h4 id='aboutTitle'>{t('about')} {item.name}:</h4>

                            {item.description !== "" ?
                            React.createElement('p', {
                              dangerouslySetInnerHTML: {
                                __html: item.description,
                              },
                            }) :
                            <p>{t('noinfo')}</p>}
                        </div>
                        
                    </div>
                    <div id="itemImg">
                        <img src={item.image_background} alt={`${item.name} screen`} />
                    </div>
                </div>
                <div id="gamesBlock">
                  <h1>{t('suitable')}</h1>
                  <GamesGrid games={this.state.games} titleOn={false} filterOn={false} isLoading={this.state.gameLoading} getData={this.getSuitGame.bind(this)} setState={this.setState.bind(this)} end={this.state.end}/>
                </div>
            </div>
        </Suspense>
    )
  }
}


export default withParams(DetailPage);