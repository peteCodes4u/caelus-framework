import { Link } from 'react-router-dom';
import {
    NavDropdown,
} from 'react-bootstrap';

export default function GeneralDropDown({ title, items, dropdownClass = `${activeStyle}-dropdown`, activeStyle, setActiveStyle }) {
   const computedDropdownClass = dropdownClass || `${activeStyle}-dropdown`;
    return (
        <NavDropdown
            title={title}
            className={computedDropdownClass}
        >
            {items.map((item, idx) =>
                item.action ? (
                    <NavDropdown.Item
                        key={idx}
                        as={Link}
                        to={item.path || '/'}
                        onClick={item.action}
                        className={`${activeStyle}-dropdown-item`}
                    >
                        {item.label}
                    </NavDropdown.Item>
                ) : (
                    <NavDropdown.Item
                        key={idx}
                        as={Link}
                        to={item.path}
                        className={`${activeStyle}-dropdown-item`}
                    >
                        {item.label}
                    </NavDropdown.Item>
                )
            )}
        </NavDropdown>
    );
};