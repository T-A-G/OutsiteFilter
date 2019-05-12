import React, { Component } from 'react';
import LocationGroups from './locationGroups'
import './locations.scss'
import queryString from 'query-string'
import axios from 'axios';
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import ROUTES from '../../Routes/rootsdirectory'
import { Row,Col } from 'react-bootstrap';
import { FaCalendar } from 'react-icons/fa';


class Locations extends Component {

  constructor(props) {
    super(props);

    const {startDate, endDate} = queryString.parse(this.props.location.search)

    this.state = {
      locations : null,
      filters : {
        startDate : startDate ? moment(startDate): null,
        endDate : endDate ? moment(endDate): null
      }
    }

    this.applyFilters = this.applyFilters.bind(this)
  }

  componentDidMount(){
    this.applyFilters()

  }

  applyFilters(){
    axios.get(`/api/locations`, {
      params: this.state.filters
    })
    .then(res => {
      const locations = res.data;
      this.setState({ locations });
    }).catch( error => {
      //// TODO: add error handling
    })
  }

  updateDateFilter(startDate,endDate){
    this.setState({
      focusedInput:null,
      filters:
      {
        startDate,
        endDate
      }
    }, () => {
      this.props.history.push({
        pathname: ROUTES.locations.path,
        search: `?startDate=${startDate ? moment(startDate).format('MM-DD-YYYY'):null}&endDate=${endDate? moment(endDate).format('MM-DD-YYYY'):null}`
      })
      this.applyFilters()
    })
  }

  render() {

    return (
      <div id='locations'>

      <Row>
        <Col xs={12}>
          <h2 id='select-location-title'>Start by selecting a location</h2>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <DateRangePicker
          startDate={this.state.filters.startDate}
          startDatePlaceholderText={'Check In'}
          startDateId="start-date-input"
          endDate={this.state.filters.endDate}
          endDatePlaceholderText={'Check Out'}
          small={true}
          customInputIcon={<FaCalendar/>}
          endDateId="end-date-input"
          onDatesChange={({ startDate, endDate }) => this.updateDateFilter(startDate,endDate)}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
        </Col>
      </Row>


      {
        this.state.locations ?
        <LocationGroups locations={this.state.locations}/> :
        <div>Loading</div>
      }
      </div>

    )
  }
}

export default Locations;
