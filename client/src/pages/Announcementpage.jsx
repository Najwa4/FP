import React from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import { useNavigate } from 'react-router-dom';
import '../styles/Announcementpage.css';

const AnnouncementPage = () => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/personal-information');
  };

  return (
    <div className="announcement-container1">
    <div className="announcement-container">
      <AnnouncementCard
        title="Announcement 1"
        message="This is the first announcement message."
        onApply={handleApply}
      />
      <AnnouncementCard
        title="Announcement 2"
        message="This is the second announcement message."
        onApply={handleApply}
      />
      <AnnouncementCard
        title="Announcement 3"
        message="This is the third announcement message."
        onApply={handleApply}
      />
      <AnnouncementCard
        title="Announcement 4"
        message="This is the fourth announcement message."
        onApply={handleApply}
      />
    </div>
    </div>
  );
};

export default AnnouncementPage;