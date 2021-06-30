import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card} from 'react-bootstrap'
 class Movies extends Component {
    render() {
        return (
            <div>
          
                

                <Card style={{width:'50vh',  }}>
                            
                            <Card.Body>
                            <Card.Text style={{fontSize:'50px' }}>
                            </Card.Text>
                                <Card.Text>
                                {this.props.movieName}
                                </Card.Text>
                                <Card.Text> Total Votes: 
                                {' '+this.props.movieVotes}
                                </Card.Text>
                                
                                <Card.Img style={{width: '100px'}} src={this.props.movieImage} alt={this.props.movieName}/>
                            </Card.Body>




                        </Card>
            </div>
        )
    }
}

export default Movies
