import React from 'react';
import ProfileCard from '../secondary/ProfileCard';
import NavBar from '../secondary/NavBar'; 
import profileImage from '../secondary/styles/profile.jpeg'; 

const Profile = () => {
  const profileData = {
    name: 'Murcia',
    username: 'nosejsjs',
    numItems: 20,
    numOutfits: 10,
    profileImage: profileImage, 
  };

  return (
    <div>      
      <div className='col-12'>
        <NavBar/>
      </div>
      <div className="profile-container">
        <ProfileCard profileData={profileData} />
      </div>
    </div>
  );
}

export default Profile;



