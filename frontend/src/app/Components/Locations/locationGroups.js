import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import path from 'path'
import { Row,Col } from 'react-bootstrap';
import ROUTES from '../../Routes/rootsdirectory'

const LocationThumbnail = function(props){
  return (
      <Link className='location-thumbnail' to={path.join(ROUTES.book.path,props.location.id)}>
        <img src={props.location.image}/>
        <div className='description-container'>
        <h3>{props.location.name.split('-')[0]}</h3>
        <h3>{props.location.name.split('-')[1]}</h3>
        </div>
      </Link>
)
}

const LocationGroup = function(props){
  return(
    <div id={props.title}>
    <h3>{props.title}</h3>
    {
      props.locations.length === 0 ?
      <div>No Results were found </div> :
      <div className='location-group'>
        {props.locations.map(location => <LocationThumbnail className={"location-thumbnail"} key={location.id} location={location} />)}
      </div>
    }
    </div>
  )
}

const LocationGroups = function(props){
  return(
    <Row className='location-groups'>
      <Col md={6} cs={12}>
        <LocationGroup locations={props.locations.filter(location => location.country === "USA")} title={'USA'}/>
      </Col>
      <Col md={6} cs={12}>
        <LocationGroup locations={props.locations.filter(location => location.country !== "USA")} title={'International'}/>
      </Col>

    </Row>
  )
}
export default LocationGroups;
