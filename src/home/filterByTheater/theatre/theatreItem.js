import React, { Component } from 'react'

export default class theatreItem extends Component {

    handleClick = (value) =>{
        this.props.getFilter(value);
    }


  render() {
    return (
      <div>
        <button className="dropdown-item" href="/" onClick={()=> this.handleClick(this.props.theatre)}>{this.props.theatre}</button>
      </div>
    )
  }
}
