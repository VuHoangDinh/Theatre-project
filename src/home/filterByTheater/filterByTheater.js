import React, { Component } from 'react';
import TheatreItem from './theatre/theatreItem';
class filterByTheater extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    renderTheatre = () => {
        var theatreArr = this.props.theatreList.map((theatre, index) => {
            return <TheatreItem 
            theatre = {theatre} 
            key={index}
            getFilter = {this.props.getFilter}
            />
        })
        return theatreArr;
    }
    render() {

        return (
            <div className="text-center mt-3">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Choose theatre
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.renderTheatre()}
                    </div>
                </div>
            </div>

        );
    }
}

export default filterByTheater;