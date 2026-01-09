import { useStyle } from '../../styleContext';
import UserBio from '../UserBio';

export default function UserProfile({ user }) {
    const { activeStyle } = useStyle();

    return (
        <section className={`${activeStyle}-user-profile`}>
                <h4 className={`${activeStyle}-profile-card-header`}>About Me</h4>
                <UserBio activeStyle={activeStyle} />
        </section>
    );
};