import React, { Component } from 'react';

import FilmItem from './filmItem/filmItem';

class film extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theatreList: [],
            data: [],
            isLoading: true

        };
    }


    filmArr = [];
    theatreArr = [];
    filterArr = [];

    componentDidMount() {
        //////////////////
        ////FETCH DATA////         
        //////////////////
        let url = "http://www.finnkino.fi/xml/Schedule/";
        fetch(url)
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                data = parser.parseFromString(data, "text/xml");
                var showData = data.getElementsByTagName("Show");


                for (let i = 0; i < showData.length; i++) {

                    // console.log(showData[i].getElementsByTagName("Images")[0].childNodes[3].innerHTML); -> src của image
                    // Take out the needed elements
                    let img = showData[i].getElementsByTagName("Images")[0].childNodes[3].innerHTML;
                    let theatre = showData[i].getElementsByTagName("Theatre")[0].innerHTML;
                    let title = showData[i].getElementsByTagName("Title")[0].innerHTML;
                    let length = showData[i].getElementsByTagName("LengthInMinutes")[0].innerHTML;
                    let ratingLabel = showData[i].getElementsByTagName("RatingImageUrl")[0].innerHTML;

                    this.filmArr = [...this.filmArr, { img, theatre, title, length, ratingLabel }]

                    this.theatreArr = [...this.theatreArr, theatre]

                }


                this.setState({
                    isLoading: false,
                    data: this.filmArr,
                    theatreList: this.theatreArr
                })

                let theatreList = this.theatreArr.filter((theatre, pos, arr) => {
                    return arr.indexOf(theatre) === pos
                })
                this.props.passingTheatreList(theatreList)
            })

            .catch(error => {
                console.log(error);
            })

    }

    //Theatre name filter
    filterTheatreItem = (value) => {
        
        switch (value) {
            case "Tennispalatsi, Helsinki":
            case "Itis, Helsinki":
            case "Kinopalatsi, Helsinki":
            case "Omena, Espoo":
            case "Flamingo, Vantaa":
            case "Sello, Espoo":
            case "Maxim, Helsinki":
                this.filterArr = this.state.data.filter((theatre) => {
                    return theatre.theatre === value
                })
                break;
            default: this.filterArr = this.state.data.map((theatre)=>{
                return theatre
            });
        }
    }

    // 
    renderFilmItem = () => {
        this.filterTheatreItem(this.props.filterValue)
        var filmItemArr = this.filterArr.map((film, index) => {
            return <FilmItem
                film={film}
                key={index}
                getFilmDetails={this.props.getFilmDetails}
            />
        })

        return filmItemArr;


    }

    
    passTheatres = (theater) => {
        let action = () => {
            this.props.getTheatreList();
        }
        action();
    }


    render() {

        if (this.state.isLoading) {
            console.log("waiting to render");
            return <h1>Loading...</h1>
        }
        else {
            return (
                <section id="film" className="container-fluid pt-5 pb-5">
                    <h1 className="text-dark text-center mb-5">ON AIR</h1>
                    <div className="row">
                        {this.renderFilmItem()}
                    </div>
                </section>
            );
        }
    }
}

export default film;