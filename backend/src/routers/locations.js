import express from 'express'
import {Location} from '../models/locationModel'

const locations = express.Router()

locations.get('/', async (request, response) => {

  try {

    var allLocations = await Location.find().exec();


    //filter by date
    if (request.query.startDate && request.query.endDate){

      const startDateFilter = new Date(request.query.startDate.slice(1, -1))
      const endDateFilter = new Date(request.query.endDate.slice(1, -1))

      allLocations = allLocations.filter(location => {

        // retrieve list of bookings that overlap with the selected dates
        var overlappingBookings = location.bookings.filter(booking => {
          var bookingStartDateInFilterRange = (startDateFilter <= booking.startDate && booking.startDate < endDateFilter)
          var bookingEndDateInFilterRange = (startDateFilter < booking.endDate && booking.endDate <= endDateFilter)
          var bookingContainsFilterDates = (booking.startDate <= startDateFilter && endDateFilter <= booking.endDate)
          return (bookingStartDateInFilterRange || bookingEndDateInFilterRange || bookingContainsFilterDates)
        })

        // return listings with no bookings that overlap with the selected filter dates
        return overlappingBookings.length == 0
      })

    }

    response.send(allLocations);
  } catch (error) {
    console.log(error)
    response.status(500).send(error);
  }
});

locations.get('/:locationID', async (request, response) => {
  try {
    var location = await Location.findOne({id: request.params.locationID}).exec();
    response.send(location);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default locations;
