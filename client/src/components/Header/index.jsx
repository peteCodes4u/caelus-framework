// This is the header component that will be displayed on every page of the application. changes to the header can be made here.
import NavigationBar from '../NavigationBar';

export default function Header({ toggleStylesheet, activeStyle, setActiveStyle }) {


    return (
        <header className={`${activeStyle}-header`}>
            <NavigationBar
                toggleStylesheet={toggleStylesheet}
                activeStyle={activeStyle}
                setActiveStyle={setActiveStyle}
            />
        </header>
    );
};