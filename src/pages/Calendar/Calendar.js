import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/Navbar/NavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import OutfitOfDay from '../../components/OutfitOfDay/OutfitOfDay';
import apiClient from '../../services/apiClient';

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [outfitDates, setOutfitDates] = useState([]);

    const onChange = (date) => {
        setDate(date);
    };

    useEffect(() => {
        const fetchOutfitDates = async () => {
            try {
                const response = await apiClient.get('/outfit/dates'); // Cambia la ruta según tu API
                setOutfitDates(response.data);
            } catch (error) {
                console.error('Error fetching outfit dates:', error);
            }
        };

        fetchOutfitDates();
    }, []);

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            if (outfitDates.includes(dateString)) {
                return 'highlight';
            }
        }
        return null;
    };

    return (
        <div className='col-12'>
            <NavBar />
            <div className="row calendar-container">
                <div className="col-10 offset-1 col-sm-10 col-md-4 offset-md-0 col-lg-4 offset-lg-0">
                    <h2 className="text-center">Calendar</h2>
                    <div className="d-flex justify-content-center">
                        <Calendar
                            onChange={onChange}
                            value={date}
                            locale="en-US"
                            tileClassName={tileClassName}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link to="/">
                            <button className="btn btn-primary custom-btn">Create Outfit</button>
                        </Link>
                    </div>
                </div>
                <div className="col-10 offset-1 col-sm-10 col-md-7 offset-md-0 col-lg-7 offset-lg-0">
                    <OutfitOfDay selectedDate={date} />
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;

