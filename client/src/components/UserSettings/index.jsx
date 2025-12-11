import { useState, useEffect } from 'react';
import { useStyle } from "../../styleContext";
import ProfileForm from '../ProfileForm';

export default function UserSettings() {

    const [activeStyle, setActiveStyle] = useState(() => localStorage.getItem('selectedStyle') || 'app-style1');

    //apply the styling classes to the body element via useEffect. 
    useEffect(() => {
        document.body.className = activeStyle;
        localStorage.setItem('selectedStyle', activeStyle);
    }, [activeStyle]);

    return (
        <section className={`${activeStyle}-user-profile-settings-panel`}>
            <ProfileForm
            />
        </section>
    );
};