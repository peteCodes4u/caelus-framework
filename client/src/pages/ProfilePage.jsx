// Import necessary packages
// import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useStyle } from "../styleContext";
import UserSettings from "../components/UserSettings";
import UserProfile from "../components/UserProfile";
// import { useQuery } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';

export default function ProfilePage({ toggleStylesheet }) {
  // const { id } = useParams();
  // const { activeStyle } = useStyle();

  // const { data, loading, error } = useQuery(QUERY_ME, {
  //   variables: { userId: id }
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error loading user.</p>;
          const [activeStyle, setActiveStyle] = useState(() => localStorage.getItem('selectedStyle') || 'app-style1');
  
          //apply the styling classes to the body element via useEffect. 
          useEffect(() => {
              document.body.className = activeStyle;
              localStorage.setItem('selectedStyle', activeStyle);
          }, [activeStyle]); 

  return (
    <div className={`${activeStyle}-profile-page`}>
      <div className={`${activeStyle}-profile-main`}>
        <UserSettings activeStyle={activeStyle} className={`${activeStyle}-user-settings`}/>
        <UserProfile activeStyle={activeStyle} className={`${activeStyle}-user-profile`}/>
      </div>
    </div>
  );
};
