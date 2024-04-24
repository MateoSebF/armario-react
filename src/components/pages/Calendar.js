import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import NavBar from '../secondary/NavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import '../secondary/styles/Calendar.css'; 
import OutfitOfDay from '../secondary/OutfitOfDay';

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (date) => {
        setDate(date);
    };

    return (
        <div className='col-12'>
            <NavBar/>
            <div className="row justify-content-center"> 
                <div className="col-md-6">
                    <h2 className="text-center">Calendar</h2>
                    <div className="d-flex justify-content-center"> 
                        <Calendar
                            onChange={onChange}
                            value={date}
                            locale="en-US"
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-3"> 
                        <Link to="/">
                        <button className="btn btn-primary custom-btn">Create Outfit</button> 
                        </Link>
                    </div>
                </div>
                <div className="col-md-6">                  
                    <OutfitOfDay selectedDate={date} />
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;