import React, { Component } from 'react';
import flags from "../lib/flags";
import resources from '../lib/resources';


import MainMenu from './MainMenu';
import FilterMenu from './FilterMenu';
import List from './List';

let attached = false;

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.props=props;

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.toggleReviews = this.toggleReviews.bind(this);
    this.setReviewsData = this.setReviewsData.bind(this);

    this.state = {
      visibleMenu: false,
      visibleFilter: false,
      visibleReviews: false,
      reviewsData: {},
    };

  }

  componentDidMount() {
    if(!attached) {
      let keyDown = (e)=>{
        attached = true;
        (e.keyCode==27 && this.state.visibleMenu) && this.setState({visibleMenu: false});
        (e.keyCode==27 && this.state.visibleFilter) && this.setState({visibleFilter: false});
        (e.keyCode==27 && this.state.visibleReviews) && this.setState({visibleReviews: false});
      }
      document.addEventListener("keydown", keyDown);
    }
  }

  toggleMenu(val) {
    this.setState({visibleMenu: val});
  }

  toggleFilters(val) {
    this.setState({visibleFilter: val});
  }

  toggleReviews(val) {
    this.setState({visibleReviews: val});
  }

  setReviewsData(data) {
    this.setState({reviewsData: data});
  }

  render() {
    let {store, changeName, setFilters} = this.props;
    /*
      Есть вариант (this.state.visibleMenu) ? <MainMenu /> : null
      Но стили - быстрее чем отрисовка с нуля
    */

    return (
      <div className="MainScreen">
        <Toolbar
          key="Tb"
          toggleMenu={this.toggleMenu}
          toggleFilters={this.toggleFilters}
        />
        <MainMenu
          key="Mm"
          style={{display: (this.state.visibleMenu) ? "block" : "none"}}
          userName={store.userName}
          changeName={changeName}
          toggleMenu={this.toggleMenu}
        />
        <FilterMenu
          key="Fm"
          style={{display: (this.state.visibleFilter) ? "block" : "none"}}
          toggleFilters={this.toggleFilters}
          filtersList={store.filtersList}
          selectFilters={store.selectFilters}
          setFilters={setFilters}
        />
        <List
          key="List"
          toggleReviews={this.toggleReviews}
          setReviewsData={this.setReviewsData}
          listPlaces = {store.listPlaces}
          selectFilters = {store.selectFilters}
        />
        <ReviewsToast
          key="Rt"
          style={{display: (this.state.visibleReviews) ? "block" : "none"}}
          toggleReviews={this.toggleReviews}
          data = {this.state.reviewsData}
        />
      </div>
    );
  }
}

function Toolbar(props) {
  let menuHandler = ()=>props.toggleMenu(true);
  let filtersHandler = ()=>props.toggleFilters(true);
  return (
    <div className="Toolbar">
      <button className="button-menu" onClick={menuHandler}>
        <hr/><hr/><hr/>
      </button>
      <div className="toolbar-caption">{resources.toolbarText}</div>
      <button className="button-filter" onClick={filtersHandler}/>
    </div>
  );
}

function ReviewsToast(props) {
  let data = props.data;
  let handlerClick = (e)=>{
    if(e.target.className.includes("close-reviews") || !e.target.closest(".reviews-block")) {
      props.toggleReviews(false);
    }
  }
  return (
    <div className="ReviewsToast" style={props.style} onClick={handlerClick}>
      <div className="reviews-block-wrapper">
        <div className="reviews-block">
          <div className="close-reviews">&otimes;</div>
          <span>{`${resources.revTitleText}:`}</span>
          <ul>
            <li key={1}>{`${resources.revGoodText}:${data.revGood}`}</li>
            <li key={2}>{`${resources.revBadText}:${data.revBad}`}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}