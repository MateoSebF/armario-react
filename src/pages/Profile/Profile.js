import React, { useEffect, useState } from 'react';
import ProfileCard from '../../components/Profile/ProfileCard';
import NavBar from '../../components/Navbar/NavBar';
import apiClient from '../../services/apiClient';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import LanguageModal from '../../components/Profile/LanguageModal/LanguageModal';

const Profile = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [numItems, setNumItems] = useState(0);
  const [numOutfits, setNumOutfits] = useState(0);
  const [profileImage, setProfileImage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.get('user/profile');
        setName(response.data.name);
        setUsername(response.data.username);
        setNumItems(response.data.numItems);
        setNumOutfits(response.data.numOutfits);
        setProfileImage(response.data.profileImage);
      } catch (error) {
        console.error('Error fetching profile data:', error);
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
        <div className="language-switcher col-2 offset-5">
          <button className="language-button" onClick={() => setIsModalOpen(true)} aria-label="Change language">Change Language</button>
        </div>
        <LanguageModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default Profile;


