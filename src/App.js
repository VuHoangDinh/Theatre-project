import React, { Component } from 'react';

import './App.css';

import Home from './home/home';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {

      quantity: 0,
      filterValue: '',
      filmDetails: {}
    }
  }

  getFilter = (value) => {
    this.setState({
      filterValue: value
    })
  }

  getFilmDetails = (film) => {
    this.setState({
      filmDetails: film
    })
  }




  render() {
    return (
      <div>
        <Home getFilmDetails={this.getFilmDetails} filmDetails={this.state.filmDetails} getFilter={this.getFilter}  />
        {/* <ModalComponent filmDetails = {this.props.filmDetails}/> */}
      </div>
    );
  }
}




export default App;