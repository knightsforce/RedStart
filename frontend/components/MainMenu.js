import React, { Component } from 'react';
import flags from "../lib/flags";
import resources from '../lib/resources';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    
    this.handlerFocus = this.handlerFocus.bind(this);
    this.handlerBlur = this.handlerBlur.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.handlerKeyDown = this.handlerKeyDown.bind(this);
    this.handlerClick = this.handlerClick.bind(this);

    this.defaultInpText = resources.changeNamePH || "";

  }

  handlerFocus(e) {
    e.target.value="";
  }

  handlerBlur(e) {
    e.target.value=this.defaultInpText;
  }


  handlerInput(e) {
    this.name = e.target.value;
    if(this.name.length>20) {
      this.name = e.target.value = this.name.slice(0, 20);
    }
  }

  handlerKeyDown(e) {
    let name = this.name;
    (e.keyCode==13 && name.length) && this.props.changeName(name);
    e.target.value=(name || "");
  }

  handlerClick(e) {
    if(e.target.className.includes("menu-close") || !e.target.closest(".menu-block")) {
      this.props.toggleMenu(false);
    }
  }

  render() {
    let {style, userName} = this.props;
    return (
      <div
        className="MainMenu"
        style={style}
        onClick={this.handlerClick}
      >
          <div className="menu-block">
              <div className="menu-close">&otimes;</div>
              <div className="menu-content">
                  <div className="menu-image"/>
                  <div className="menu-username">
                    {resources.helloMenuText(userName)}
                  </div>
              </div>
              <div className="menu-actions">
                  <div className="field-changename">
                    <input
                      ref={
                        (input)=>{
                          if(input) {
                            input.value = this.defaultInpText;
                            input.blur();
                          }
                        }
                      }
                      onFocus={this.handlerFocus}
                      onBlur={this.handlerBlur}
                      onChange={this.handlerInput}
                      onKeyDown={this.handlerKeyDown}
                    />
                  </div>
              </div>
          </div>
      </div>
    );
  }
}