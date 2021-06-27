import axios from 'axios';
import React, { Component } from 'react'
import {Card} from 'react-bootstrap'


export class App extends Component {
  constructor(props){
  super(props);
  this.state={
    displayName:'',
    longitude:'',
    latitude:'',
    error:'',
    show:true,
    
  }
  }

  nameChangeHandler = (e) => {
    this.setState({
      displayName:e.target.value
    })
  }
  
  dataSubmitHandler = async (e) => {
    e.preventDefault();
    let axiosResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.ea6b96cd46813c4bd134a0701a31ab4b&q=${this.state.displayName}&format=json`)
    
    this.setState({
      displayName: axiosResponse.data[0].display_name,
      longitude: axiosResponse.data[0].lon,
      latitude: axiosResponse.data[0].lat,
      error:true,
    })

  } 
  


  render() {
    return (
      <div>
        
        <form onSubmit={(e) => {this.dataSubmitHandler(e)}} >
        <input style={{width: "100%"}} type="text" placeholder="Enter City Name..." onChange={(e) =>  {this.nameChangeHandler(e)}} /><br></br>
        <input type="submit" value="Explore!"/>    

      </form> 

      
     {(this.state.error && this.state.displayName!=='') &&
      <Card style={{ width: "80%", height: "100%",marginLeft: "7vh" }}>
                            
                            <Card.Body>

                                <Card.Text>
                                  City/Country: {this.state.displayName} <br></br>
                                  Longitude: {this.state.longitude} <br></br>
                                  Latitude: {this.state.latitude} 
                                  

                                </Card.Text>

                                <Card.Img  src={`https://maps.locationiq.com/v3/staticmap?key=pk.ea6b96cd46813c4bd134a0701a31ab4b&center=${this.state.latitude},${this.state.longitude}&zoom=12&&size=300x300x&format=png&maptype=roadmap&markers=icon:large-red-cutout`}/>
                            </Card.Body>




                        </Card>
                        }

                        {(!this.state.error && this.state.show) && 
                      <h1>"error": "Unable to geocode" Please fill in the data</h1>

                        
                        }
      </div>
    )
  }
}

export default App
