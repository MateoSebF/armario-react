import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import ProfileCard from '../components/ProfileCard';
import profileImage from '../profile.jpeg'; 

const ProfilePage = () => {
  const profileData = {
    name: 'Murcia',
    username: 'nosejsjs',
    numItems: 20,
    numOutfits: 10,
    profileImage: profileImage, 
  };

  return (
    <div>
      <HeaderComponent />
      <div className="profile-container">
        <ProfileCard profileData={profileData} />
      </div>
    </div>
  );
};

export default ProfilePage;
