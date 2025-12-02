import { Card } from 'react-bootstrap';
import UserBio from '../UserBio';

export default function UserProfile({ user }, { activeStyle = "app-style1" }) {
    return (
        <section className={`${activeStyle}-user-profile`}>
            <div className={`${activeStyle}-profile-card`}>
                <h4 className={`${activeStyle}-profile-card-header`}>About Me</h4>
                <UserBio activeStyle={activeStyle} />
                <div className={`${activeStyle}-profile-card-footer`}>
                    <p>
                        <strong>Your email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Your name:</strong> {user.name}
                    </p>
                </div>
            </div>
        </section>
    );
};