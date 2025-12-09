import ProfileForm from '../ProfileForm';
import { useStyle } from '../../styleContext';

export default function UserSettings({ activeStyle = "app-style1" }) {
    return(
        <section className={`${activeStyle}-user-profile-settings-panel`}>
            <ProfileForm />
        </section>
    );
};