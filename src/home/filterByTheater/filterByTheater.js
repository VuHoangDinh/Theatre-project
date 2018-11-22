import React, { Component } from 'react';

class filterByTheater extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theatreList: [],
            isLoading: true

        };
    }





    filterByTheater = (value) => {
        this.props.getFilter(value);
    }


    render() {

        return (
            <div className="text-center mt-3">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Choose theatre
  </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                    </div>
                </div>
            </div>

        );
    }
}

export default filterByTheater;