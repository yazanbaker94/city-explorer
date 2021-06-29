import axios from 'axios';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button,Form, Card} from 'react-bootstrap'
import Weather from './Components/Weather'

export class App extends Component {
  constructor(props){
  super(props);
  this.state={
  
    longitude:'',
    latitude:'',
    error:false,
    show:true,
    weatherData:[],
    cityData:{},
    errormsg:'',
   

  }
  }

  nameChangeHandler = (e) => {
    this.setState({
      displayName:e.target.value
    })
  }
  

  dataSubmitHandler = async (e) => {
    e.preventDefault();
    try {
    const axiosResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.ea6b96cd46813c4bd134a0701a31ab4b&q=${this.state.displayName}&format=json`)
    
    

    
    this.setState({
      cityData: axiosResponse.data,
      
      longitude: axiosResponse.data[0].lon,
      latitude: axiosResponse.data[0].lat,
      error:true,
   

      
      
    })
    try {
    const axiosLocalApi = await axios.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&searchQuery=${this.state.displayName}`)

    this.setState({
      weatherData: axiosLocalApi.data,
    })
    } catch (e) {
  if (e.response && e.response.data) {
    console.log(e.response.data.message) // some reason error message
  }
}
  }catch(errormsg) {
    console.log()
    this.setState({
      errormsg: "Can't find the forecast for that!",
      error: true,
      
      
    })
    
  } 

}
  

  render() {
    return (
      <div>
        <Form onSubmit={(e) => {this.dataSubmitHandler(e)}} >
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Search for a city, example: Amman, Seattle or Paris</Form.Label>
    <Form.Control type="text" placeholder="City Name..."  onChange={(e) =>  {this.nameChangeHandler(e)}}/> 
      
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
        

      
     {(this.state.error && this.state.displayName!=='') &&
      <Card style={{ width: "80%", height: "100%",marginLeft: "7vh" }}>
                            
                            <Card.Body>
                            <Card.Text style={{fontSize:'50px' }}>
                            {this.state.errormsg}
                            </Card.Text>
                                <Card.Text>
                                
                                  City/Country: {this.state.displayName} <br></br>
                                  Longitude: {this.state.longitude} <br></br>
                                  Latitude: {this.state.latitude} 
                                  

                                </Card.Text>

                                <Card.Img  src={`https://maps.locationiq.com/v3/staticmap?key=pk.ea6b96cd46813c4bd134a0701a31ab4b&center=${this.state.latitude},${this.state.longitude}&zoom=12&&size=300x300x&format=png&maptype=roadmap&markers=icon:large-red-cutout`}/>
                            </Card.Body>




                        </Card>
                        
    }
                       {
                        this.state.weatherData.map(weatherData=> {
                          return <Weather desc={weatherData.description} date={weatherData.date} />
                        })

                       }

                        
                        
      </div>
    )
  }
}

export default App
