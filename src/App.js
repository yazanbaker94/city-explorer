import axios from 'axios';
import React, { Component } from 'react'
import {Button,Card} from 'react-bootstrap'
export class App extends Component {
  constructor(props){
  super(props);
  this.state={
    displayName:'',
    longitude:'',
    latitude:'',

  }
  }

  nameChangeHandler = (e) => {
    this.setState({
      displayName:e.target.value
    })
  }
  
  dataSubmitHandler = async (e) => {
    e.preventDefault();
    let axioResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.ea6b96cd46813c4bd134a0701a31ab4b&q=${this.state.displayName}&format=json`)
    this.setState({
      displayName: axioResponse.data[0].display_name,
      longitude: axioResponse.data[0].lon,
      latitude: axioResponse.data[0].lat
    })
    console.log(axioResponse.data[0].lat)

  } 

  render() {
    return (
      <div>
        
        <form onSubmit={(e) => {this.dataSubmitHandler(e)}}>
        <input type="text" placeholder="Enter City Name..." onChange={(e) =>  {this.nameChangeHandler(e)}}/><br></br>
        <input type="submit" value="Explore!"/>
      </form> 

      
     
      <Card style={{ width: "80%", height: "100%",marginLeft: "7vh" }}>
                            <Card.Img width={200}
                                height={280} src="https://static3.depositphotos.com/1000955/129/i/600/depositphotos_1295818-stock-photo-earth.jpg"  />
                            <Card.Body>

                                <Card.Text>
                                  City/Country: {this.state.displayName} <br></br>
                                  Longitude: {this.state.longitude} <br></br>
                                  Latitude: {this.state.latitude} 

                                </Card.Text>
                            </Card.Body>




                        </Card>
      </div>
    )
  }
}

export default App
