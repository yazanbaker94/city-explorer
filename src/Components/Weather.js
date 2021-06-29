import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap'

 class Weather extends Component {
    render() {
        return (
            <div>
               
                <Table striped bordered hover>
                <thead>
                    <tr>
                    
                    <th>Description</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    
                    <td>{this.props.desc}</td>
                    <td>{this.props.date}</td>
                    </tr>
                </tbody>
                </Table>
            </div>
        )
    }
}

export default Weather
