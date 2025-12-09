import { Card } from 'react-bootstrap';
import UserBio from '../UserBio';

export default function UserProfile({ user }, { activeStyle = "app-style1" }) {
    return (
        <section className={`${activeStyle}-user-profile`}>
            <div className={`${activeStyle}-profile-card`}>
                <h4 className={`${activeStyle}-profile-card-header`}>About Me</h4>
                <UserBio activeStyle={activeStyle} />
            </div>
        </section>
    );
};