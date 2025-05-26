import { useParams } from 'react-router-dom';
import { useStyle } from '../StyleContext';

export default function ProfilePage() {

    const { id } = useParams();
    const { activeStyle } = useStyle();

    return (
        <div className={`${activeStyle}-profile-page`}>
            <h1>👽 Welcome to your Profile Page! 👽</h1>
            <p>🐸 your userId is: {id} </p>
        </div>
    );
};