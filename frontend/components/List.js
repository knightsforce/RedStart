import React, { Component } from 'react';
import flags from "../lib/flags";
import {formatDate, parseString} from "../lib/dist"

/*
  Классы с большой буквы у компонентов, с маленькой у простых элементов
*/

export default class List extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.handlerItemClick=this.handlerItemClick.bind(this);
  }

  handlerItemClick(data) {
    this.props.toggleReviews(true);
    this.props.setReviewsData(data);
  }

  render() {
    let {selectFilters, listPlaces, toggleReviews} = this.props;
    let countFilters = Object.keys(selectFilters).length;
    /*
      Вставляется флаг,
      Если фильтров нет, то и фильтровать незачем.
      flag=true;
      Если хоть один фильтры не совпал flag=false;

      Два раза привоение flag=true - 1) инициализация,
      2) - при следующий итерациях,
      т.к. берется из замыкания - нужно переопределить, чтобы сбросить редыдущее значение
    */
    let flag = null;
    let fields=listPlaces.map((item)=>{
      flag = true;
      if(countFilters) {
        for(let key in selectFilters) {
          (selectFilters[key]) && (flag = item.filters.includes(key));//Если фильтр true
          if(!flag) return null;
        }

      }
      return (
        <Field key={item.id} data={item} handlerClick={this.handlerItemClick}/>
      )
    });
    return (
      <div className="List">
        <ul>{fields}</ul>
      </div>
    );
  }
}

function Field(props) {
  
  let data = props.data;
  let {name, logo, revGood, revBad} = data;
  
  let handlerClick=()=>{
    props.handlerClick(data);
  }

  return (
      <li onClick={handlerClick}>
          <img className="list-item-logo" src={logo}/>
          <div className="list-item-content">{name}</div>
      </li>
  )
}