import React, { Component } from 'react';
import './book.scss'
import axios from 'axios';
import { Row,Col } from 'react-bootstrap';
import { FaBed,FaWifi } from 'react-icons/fa';



const Overview = function(props){
  return(
    <Row className='overview'>
      <Col md={6} xs={12}>
      <div className='overview-text'>
      <div className='title'>Coliving in {props.location.city}, {props.location.country}</div>
      <h1 >Outsite {props.location.name.split('-')[1]}</h1>
      </div>
      </Col>
      <Col md={6} xs={12}>
        <div className='overview-image' style={{backgroundImage: `url(${props.location.image})`}}></div>
      </Col>
    </Row>

  )
}

const Description = function(props){
  return(
    <Row className='description'>
      <Col xs={12}>
      <h2>Description</h2>
      <div><strong><FaBed/> 9 Bedrooms <FaWifi/> 18 Mbps</strong></div>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque ante in mauris iaculis, eu vestibulum justo faucibus. Praesent magna tellus, efficitur et mollis a, scelerisque ut sem. Proin ligula sapien, tincidunt eget dolor vitae, varius suscipit urna. Aenean venenatis urna quis augue pellentesque consequat. Vivamus finibus, neque vel pulvinar faucibus, nunc dolor sodales dolor, in tristique nisl turpis nec quam. Morbi molestie porttitor lectus tincidunt porta. Curabitur varius lorem tellus.</div>
      </Col>
    </Row>

  )
}

class BookingDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      location: props.location
    }
  }

  render(){
    return(
      <div>
        <Overview location={this.state.location}/>
        <Description location={this.state.location}/>
      </div>
    )
  }
}
class Book extends Component {

  constructor(props) {
    super(props);

    this.state = {
      location: null

    }
  }

  componentDidMount(){
    const {match :{params : {location}}} = this.props;

    axios.get(`/api/locations/${location}`)
    .then(res => {
      const location = res.data;
      this.setState({ location });
    }).catch( error => {
      //// TODO: add error handling
    })
  }
  render() {
    console.log(this.state)

    return (
      <div id='book'>
      {
        this.state.location ?
        <BookingDetails location={this.state.location}/>:
        <div>Loading</div>}
        </div>
      )
    }
  }

  export default Book;
