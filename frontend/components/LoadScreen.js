import React, { Component } from 'react';
import flags from "../lib/flags";
import {formatDate, parseString} from "../lib/dist";
import resources from '../lib/resources';

export default class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.props=props;

  }
  componentDidMount() {
    this.props.getCafeList();
    this.props.getFilters();
  }
//
  render() {

    return (
      <div className="LoadScreen">
        <div className="logo">
          <div className="logo-image"/>
        </div>
        <div className="load-text">{resources.loadText}</div>
      </div>
    );
  }
}