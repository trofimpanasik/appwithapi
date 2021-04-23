import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Forecast from './components/forecast/forecast';
import Header from './components/header/header';
import Weatherapi from './api/api';
import Position from './api/position'

export default class App extends Component {
    
    WeatherApi = new Weatherapi();
    Position = new Position();
    


    state = {
        weather: {
            city: null,
            temp_c: null,
            country: null
        },
        loading: true,
        error: false,
        forecast: null,
        city:null,

    }


    constructor(){
        super();
        this.SearchCity();
        this.startcity();
    }

    startcity = async() => {
        let city, countrycode ;
        await this.Position.getCity()
            .then((info) => {
                console.log(info)
                city = info.city;
                countrycode = info.country_code;
                if(city === 'Null' || city === 'null' || city === null){
                    city = info.country_name;
                }
            })
            .catch(this.onError);
        await this.updateInfo(city);
    }
    
    updateInfo = (city) => {


        fetch('http://api.openweathermap.org/data/2.5/weather?q=Brest&lang=ru&appid=cb1b368321809eca6a8674ff0437d55d')
        .then(function (resp) {return resp.json() })

        .then(function (data) {
            console.log(data.name);
            console.log(Math.round(data.main.temp - 273));
            console.log(data.weather[0]['description']);

            })
            .catch(function () {
                //Обрабатываем ошибки
        });

        this.WeatherApi.getCyti(city)
        .then((info) => {
            
            this.setState({error: false})
            this.setState(() => {
                return  {weather:{temp_c: info.current.temp_c, city: info.location.name, country: info.location.country}}
            }) 

            this.setState(() => {
                return { forecast:info.forecast.forecastday }
            })

            this.setState(() => {
                return {loading:false}
            })
        })
        .catch(this.onError)

    }
    SearchCity = () => {
        let city;
        this.Position.getCity()
        .then((info) => {
            city = info.city;
                if(city === 'Null' || city === 'null' || city === null){
                    city = info.country_name;
                }
            this.setState({city:city});
        })
        .catch(this.onError);
    }
    

    onError = () => {
        this.setState(() => {
                return { loading: false }
        })
        this.setState(() => {
             return { error: true }
        })
    }
        


    Search = (city) => {
        this.updateInfo(city)
    }

    MapSearch =  () => {
        this.updateInfo(this.state.city);
    }

    render() {
        
        const {error, weather,  forecast, loading} = this.state;

        // const load = loading ? <Loading /> : null;
        // const content = !(loading || error) ? <Viewinfo forecast = {forecast} weather = {weather} /> : null;
        // const err = error ? <Error /> : null;

        return(
            <div style={{width: '95%', margin: '0 auto'}}>
                <Header MapSearchCity = {this.MapSearch} Searchcity = {this.Search}/>
                <Forecast error = {error} weather = {weather} loading = {loading} forecast = {forecast} />
            </div>
        )
    }
}




ReactDOM.render(<App/>, document.getElementById('root'));

reportWebVitals();