// Import necessary packages
import { useStyle } from "../styleContext";
import UserProfile from "../components/UserProfile";
import ProfileLobby from '../components/ProfileLobby';

export default function ProfilePage() {

    const { activeStyle } = useStyle();

  return (
    <div className={`${activeStyle}-profile-page`}>
      <div className={`${activeStyle}-profile-main`}>
        <UserProfile activeStyle={activeStyle} className={`${activeStyle}-user-profile`}/>
        <ProfileLobby />
      </div>
    </div>
  );
};
