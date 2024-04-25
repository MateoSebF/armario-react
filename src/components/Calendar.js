import React from 'react';
import NavBar from './secondary/NavBar';




const Calendar = () => {
    return (
        <div className='col-12'>
            <NavBar/>
            <div className='row'>
                <div className='col-4'>
                    {/* Contenido para el lado izquierdo (30%) */}
                </div>
                <div className='col-8'>

                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {/* Espacio inferior */}
                </div>
            </div>
        </div>
    );
}

export default Calendar;
