import React, { Component } from 'react';
import flags from "../lib/flags";
import resources from '../lib/resources';

export default class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.handlerFilters = this.handlerFilters.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
    this.state={
      selectFilter: (this.props.selectFilters || {}),
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.selectFilters) {
      this.setState({selectFilter: newProps.selectFilters});
    }
  }

  handlerFilters() {
    this.props.toggleFilters(false);
    console.log(this.state)
    this.props.setFilters(this.state.selectFilter);
  }

  handlerClick(data) {

    var newSelectFilter = {};
    newSelectFilter[data.filter_name]=data.active;

    this.setState((prevState)=>{  
      return {
        selectFilter: Object.assign({}, prevState.selectFilter, newSelectFilter)
      };
    });

  }

  render() {

    let {style, filtersList} = this.props;
    let state = this.state;
    let value = null;
    let fields = [];
    let currfiltList = this.state.selectFilter;
    for(let key in filtersList) {
      value = filtersList[key];
      fields.push(
        <Field
          key={key}
          data={value}
          active={!!currfiltList[value.filter_name]}
          handlerClick={this.handlerClick}
        />
      );
    }

    return (
      <div className="FilterMenu" style={style}>
        <div className="filter-nav-container">
          <div className="filter-back-button" onClick={this.handlerFilters}></div>
        </div>
        <div className="filter-list">
          <ul>
            {fields}
          </ul>
        </div>
      </div>
    );
  }
}

function Field(props) {
  
  let data = props.data;
  let {name, filter_name} = data;
  let active = props.active;
  let handlerClick=()=>{
    props.handlerClick({filter_name: filter_name, active: !active});
  }
  return (
      <li onClick={handlerClick}>
        <div className="filter-radio-button">
          {(active) ? <div className="filter-radio"></div> : null}
        </div>
        <div className="filter-content">{name}</div>
      </li>
  )
}