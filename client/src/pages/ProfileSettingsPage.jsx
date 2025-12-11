import { useState, useEffect } from 'react';
import { useStyle } from "../styleContext";
import UserSettings from "../components/UserSettings";
import UserProfile from "../components/UserProfile";

export default function ProfileSettingsPage({ toggleStylesheet }) {
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
