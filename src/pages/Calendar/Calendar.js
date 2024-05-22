import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/Navbar/NavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import OutfitOfDay from '../../components/OutfitOfDay/OutfitOfDay';
import apiClient from '../../services/apiClient';
import { useTranslation } from 'react-i18next';

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [outfitDates, setOutfitDates] = useState([]);
    const [todayHasOutfit, setTodayHasOutfit] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchOutfitDates = async () => {
            try {
                const response = await apiClient.get('/day/all');
                const datesWithOutfit = response.data.filter(day => day.outfitId !== null).map(day => new Date(day.date));
                setOutfitDates(datesWithOutfit);

                const todayDateString = new Date().toISOString().split('T')[0];
                const todayHasOutfit = datesWithOutfit.some(date => date.toISOString().split('T')[0] === todayDateString);
                setTodayHasOutfit(todayHasOutfit);
            } catch (error) {
                console.error('Error fetching outfit dates:', error);
            }
        };

        fetchOutfitDates();
    }, []);

    const onChange = (date) => {
        setDate(date);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month' && date.toDateString() === new Date().toDateString()) {
            return todayHasOutfit ? 'highlight-today' : null;
        }
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            if (outfitDates.some(outfitDate => outfitDate.toISOString().split('T')[0] === dateString)) {
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
                    <h2 className="text-center">{t('Calendar')}</h2>
                    <div className="d-flex justify-content-center">
                        <Calendar
                            onChange={onChange}
                            value={date}
                            locale={i18n.language}  // This should be a valid locale code for react-calendar
                            tileClassName={tileClassName}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link to="/">
                            <button className="btn btn-primary custom-btn">{t('Create Outfit')}</button>
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



