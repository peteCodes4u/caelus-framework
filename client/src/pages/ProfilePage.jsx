// Import necessary packages
import { useParams } from "react-router-dom";
import { useStyle } from "../styleContext";
import UserSettings from "../components/UserSettings";
import UserProfile from "../components/UserProfile";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

export default function ProfilePage({ toggleStylesheet }) {
  const { id } = useParams();
  const { activeStyle } = useStyle();

  const { data, loading, error } = useQuery(QUERY_ME, {
    variables: { userId: id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user.</p>;

  const userName = data?.me?.name;

  return (
    <div className={`${activeStyle}-profile-page`}>
      <h1>🛸 Hello! {userName} 🛸</h1>
      <div className={`${activeStyle}-profile-main`}>
        <UserSettings activeStyle={activeStyle} className={`${activeStyle}-user-settings`}/>
        <UserProfile activeStyle={activeStyle} user={data.me} className={`${activeStyle}-user-profile`}/>
      </div>
    </div>
  );
};
