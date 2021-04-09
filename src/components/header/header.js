import React, { Component } from 'react';
import './header.css';
import Cloudy from './source/cloudy.png'
import map from './source/map.png'


export default class Header extends Component {


    SubmitSearch = (e) => {
        e.preventDefault();
        // const datainput = e.target.childNodes[0].value;
        // console.log(datainput)
    }

    Searchcity = (e) => {
        const city = e.target.parentNode.childNodes[0].value;
        this.props.Searchcity(city);
    }

    MapCity = () => {
        this.props.MapSearchCity();
    }

    render() {


        return(
            <header>
                <div>
                    <div>
                        <p>Weather
                            <span>Info</span>
                        </p>
                        <img src = {Cloudy} alt='img'/>
                    </div>
                    <div>
                        <img src = {map} alt='map' onClick={this.MapCity}/>
                        <form type='text' onSubmit={this.SubmitSearch}>
                            <input placeholder='Введите название страны или города' />
                            <button onClick={this.Searchcity}>
                                search
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        )
    }
}