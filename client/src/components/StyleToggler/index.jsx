import GeneralDropDown from "../GeneralDropDown";

export default function StyleToggler({ activeStyle, setActiveStyle }) {
    
    // dropdown configuration array
    const avaialableStyles = [
        { label: 'Style 1', value: 'app-style1' },
        { label: 'Style 2', value: 'app-style2' },
        { label: 'Style 3', value: 'app-style3' },
    ];

    return (
        <GeneralDropDown
            title="Styles"
            items={avaialableStyles.map(style => ({
                label: style.label,
                path: "#",
                action: () => setActiveStyle(style.value)
            }))}
            dropdownClass={`ms-2 ${activeStyle}-style-dropdown`}
            activeStyle={activeStyle}
        />
    );
};