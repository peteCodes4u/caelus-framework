// Import necessary packages
import { useParams } from "react-router-dom";
import { useStyle } from "../StyleContext";
import ProfileForm from "../components/ProfileForm";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'; // Define this query

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
      <p> Welcome to your Profile Page! </p>
      <ProfileForm activeStyle={activeStyle} handleModalClose={toggleStylesheet} />
    </div>
  );
};
