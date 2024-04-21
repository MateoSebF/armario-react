import React from 'react';
import HeaderComponent from '../components/HeaderComponent'; 
import LeftComponent from '../components/LeftComponent'; 
import RightComponentCalendar from '../components/RightComponentCalendar';
import RightComponentCommunity from '../components/RightComponentCommunity';
import CenteredCloset from '../components/CenteredCloset';

const HomePage = () => {
  return (
    <div>
      <HeaderComponent />
      <LeftComponent />
      <CenteredCloset/>
      <RightComponentCalendar />
      <RightComponentCommunity/>
      
    </div>
  );
};

export default HomePage;
