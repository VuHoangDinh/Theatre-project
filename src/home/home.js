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
            filterValue: '',
            theatreList: [],
            quantity: 0
        }
    }

    addToCart = () => {
        this.setState({
            quantity: this.state.quantity += 1
        })
    }

    getFilter = (value) => {
        this.setState({
            filterValue: value
        })
    }

    passingTheatreList = (data) => {
        this.setState({
            theatreList: data
        })
    }

    render() {
        return (
            <div>
                <Header quantity={this.state.quantity} />
                <Carousel />
                <FilterByTheater filmDetails={this.props.filmDetails} getFilter={this.getFilter} theatreList={this.state.theatreList} />
                <Film getFilmDetails={this.props.getFilmDetails} passingTheatreList={this.passingTheatreList} filterValue={this.state.filterValue} />
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