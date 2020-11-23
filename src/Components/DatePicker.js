import React, { useState } from 'react'
import './DatePicker.css'
import { useHistory } from "react-router-dom";
//css for the datepicker library
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRangePicker } from "react-date-range";
import { Button } from "@material-ui/core";

//Might have to replace this Datepicker for some other (or modify it) because this one allows you to pick dates that have already passed

function DatePicker() {
  const history = useHistory();
  const [startdate, setstartdate] = useState(new Date());
  const [enddate, setenddate] = useState(new Date());
  //DateRangePicker package
  const selectionrange = {
    startdate: startdate,
    enddate: enddate,
    key: "selection",
  };

  function handleselect(ranges) {
        setstartdate(11/11/20);
        setenddate(ranges.selection.enddate);
    }
  //End of DateRangepicker package
  return  (
    <div className = 'datepicker'>
      <DateRangePicker ranges = {[selectionrange]} onChange = {handleselect} />
      //Adding guest no.
      <h5>Number of Guests</h5>
      <input min = {0} defaultValue = {2} type = 'number' />
      <Button onClick = {() => history.push('/search')}>
        <h6>Search for hotels</h6>
      </Button>
    </div>
    )
}

export default DatePicker
