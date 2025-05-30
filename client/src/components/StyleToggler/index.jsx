import { NavDropdown } from "react-bootstrap";

export default function StyleToggler({ activeStyle, setActiveStyle }) { 
    const avaialableStyles = [
        {label: 'Style 1', value: 'app-style1'},
        {label: 'Style 2', value: 'app-style2'},
    ];

    return (
        <NavDropdown
            title="Styles"
            id="style-dropdown"
            className={`ms-2 ${activeStyle}-style-dropdown`}
            menuVariant={activeStyle === 'app-style1' ? 'dark' : 'light'}
        >
            {avaialableStyles.map((style) => (
                <NavDropdown.Item
                    key={style.value}
                    className={`${activeStyle}-style-item`}
                    active={activeStyle === style.value}
                    onClick={() => setActiveStyle(style.value)}

                >   
                    {style.label}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    );
};