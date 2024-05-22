import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/Profile/ProfileCard';
import NavBar from '../../components/Navbar/NavBar';
import apiClient from '../../services/apiClient';
import { useTranslation } from 'react-i18next';

const Profile = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [numItems, setNumItems] = useState(0);
  const [numOutfits, setNumOutfits] = useState(0);
  const [profileImage, setProfileImage] = useState([]);
  
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.get(`user/profile`);
        setName(response.data.name);
        setUsername(response.data.username);
        setNumItems(response.data.numItems);
        setNumOutfits(response.data.numOutfits);
        setProfileImage(response.data.profileImage);
        } catch (error) {
        console.error('Error fetching profile data:', error);
        // setProfileData({});
      }
    };

    fetchProfileData();
  }, []);

  const profileData = {
    name: name,
    username: username,
    numItems: numItems,
    numOutfits: numOutfits,
    profileImage: profileImage
  };

  return (
    <div>      
      <NavBar/>
      <div className="profile-container">
        <ProfileCard profileData={profileData} />
        <div className="language-switcher">
          <button onClick={() => i18n.changeLanguage('en')} aria-label="Change language to English">English</button>
          <button onClick={() => i18n.changeLanguage('es')} aria-label="Change language to Spanish">Español</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
