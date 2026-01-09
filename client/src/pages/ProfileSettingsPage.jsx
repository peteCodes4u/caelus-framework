import { useStyle } from "../styleContext";
import UserSettings from "../components/UserSettings";
import UserProfile from "../components/UserProfile";

export default function ProfileSettingsPage() {
  const { activeStyle } = useStyle();

  return (
    <div className={`${activeStyle}-profile-settings-main`}>
      <UserSettings activeStyle={activeStyle} className={`${activeStyle}-user-settings`} />
      <UserProfile activeStyle={activeStyle} className={`${activeStyle}-user-profile`} />
    </div>
  );
};
