import React, { Component } from 'react';

import Carousel from './carousel/carousel';
import Film from './film/film';
import ModalComponent from './modal/modal';
import FilterByTheater from './filterByTheater/filterByTheater';
import Header from './header/header';

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theatreList: [],
            quantity: 0
        }
    }

    getTheatreList = (data) => {
        this.setState({
            theatreList: data
        })
    }
    
    addToCart = (value) =>{
        this.setState({
            quantity: this.state.quantity += 1
        })
    }


    render() {
        return (
            <div>
                <Header quantity = {this.state.quantity} />
                <Carousel />
                <FilterByTheater filmDetails={this.props.filmDetails} getFilter={this.props.getFilter} theatreList={this.props.theatreList} />
                <Film getFilmDetails={this.props.getFilmDetails} getTheatreList={this.getTheatreList} />
                <ModalComponent filmDetails={this.props.filmDetails} addToCart={this.addToCart} />
            </div>
        );
    }
}

export default home;


// for (value in valueArr) {
//     switch (value) {
//         case value:
//             return
//             break;
//         default abc
//     }
// }