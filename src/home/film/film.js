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
    testList = ['a'];

    componentDidMount() {
        this.passTheatres(this.state.theatreList)
        console.log(this.state.theatreList);
    }


    componentWillMount() {
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

                    // console.log(showData[i].getElementsByTagName("Images")[0].childNodes[3].innerHTML); -> src of image
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

            })
            .catch(error =>{
                console.log(error);
            })



        // console.log(this.state.data);

        // console.log("hi");



    }

    renderFilmItem = () => {

        
        var filmItemArr = this.state.data.map((film, index) => {
            
            return <FilmItem
                film={film}
                key={index}
                getFilmDetails={this.props.getFilmDetails}
            />
        })
        
        console.log('1')
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
                        {/* {() => this.passTheatres(this.testList)} */}
                        {this.renderFilmItem()}
                        {console.log(this.state.theatreList)}
                    </div>
                </section>
            );
        }
    }
}

export default film;