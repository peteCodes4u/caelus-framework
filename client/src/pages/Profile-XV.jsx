// This is the profile page that displays the user's information and allows them to edit it.

// this enables navigation between pages in the application. useParams is used to access the parameters of the URL. The parameters of the URL are nested in the URL and are used to access the user's information with various opperator methods.
import { Navigate, useParams } from "react-router-dom";

// this enables the useQuery hook from apollo client which is used to make queries to the server
import { useQuery } from "@apollo/client";

// this imports the QUERY_USER and QUERY_ME queries from the queries folder which are used to get the user's information
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

export default function Profile() {
    const { profileId } = useParams();
    const { loading, data } = useQuery(
        profileId ? QUERY_USER : QUERY_ME,
        {
            variables: { username: profileId },
        }
    );

    const profile = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === profileId) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <section>Loading...</section>;
    }

    if (!profile?.username) {
        return (
            <section>
                <h4>Sorry, You need to login to access this feature, please login or signup</h4>
            </section>
        );
    }

    return (
        <section>
            <section>
                <h2>
                    {profileId ? `${profile.username}'s` : 'Your'} Profile
                </h2>
            </section>
            <section>
                <p>
                    Username: {profile.username}
                </p>
                <p>
                    Email: {profile.email}
                </p>
                <p>
                    Password: {profile.password.replace(/./g, '*')} (hidden for security)
                </p>
                <p>
                    Member Since: {new Date(profile.createdAt).toLocaleDateString()}
                </p>
            </section>
        </section>
    )

};