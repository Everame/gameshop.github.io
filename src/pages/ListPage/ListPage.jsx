import React, { Component, Suspense } from 'react'
import Header from './../../components/header/Header';
import ListGrid from '../../components/listGrid/ListGrid';
import "./listPage.scss";
import FetchHttpClient from '../../apiQueries';
import Loader from '../../ui/loader/Loader';

export default class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          currentPage: 1,
          end: false,
          count: 0,
          list: []
        };
      }
    
      getData(){
        this.setState({
          isLoading: true
        });
        const fhc = new FetchHttpClient({'Content-Type': 'application/json'});
        let data;
        if(this.state.count === 0){
          data = fhc.get(`https://api.rawg.io/api/${this.props.type}?key=${process.env.REACT_APP_API_KEY}&page=${this.state.currentPage}`);
          data.then((result) => {
            return this.setState({
              isLoading: false,
              currentPage: this.state.currentPage + 1,
              count: result.count,
              list: [...this.state.list, ...result.results]
            });
          })
        }else{
          if(this.state.currentPage <= Math.round(this.state.count/20)){
            data = fhc.get(`https://api.rawg.io/api/${this.props.type}?key=${process.env.REACT_APP_API_KEY}&page=${this.state.currentPage}`);
            data.then((result) => {
              return this.setState({
                isLoading: false,
                currentPage: this.state.currentPage + 1,
                list: [...this.state.list, ...result.results]
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

      componentDidUpdate(prevProps){
        if(prevProps.type !== this.props.type){
          this.setState({list: [], currentPage: 1, end: false, isLoading: false, count: 0})
        }
      }


  render() {
    return (
      <Suspense fallback={<Loader/>}>
        <Header linkActive={this.props.type}/>
        <div className="bodyBlock">
          <ListGrid list={this.state.list} type={this.props.type} isLoading={this.state.isLoading} getData={this.getData.bind(this)} end={this.state.end}/>
        </div>
      </Suspense>
    )
  }
}
