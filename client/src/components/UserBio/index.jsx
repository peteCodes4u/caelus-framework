import { useParams } from 'react-router-dom';
import { useStyle } from '../../styleContext';
import { useQuery } from '@apollo/client';
import {
QUERY_ME,
QUERY_MY_PROFILE
} from '../../utils/queries';

export default function UserBio({ activeStyle = "app-style1" }) {

    const { id } = useParams();
    const { data, loading, error } = useQuery(QUERY_ME, {
        variables: { userId: id }
    });
    const { data: profileData, loading: profileLoading, error: profileError } = useQuery(QUERY_MY_PROFILE, {});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user.</p>;

    const userName = data?.me?.name;
    const userEmail = data?.me?.email;
    const userHomeLocation = profileData?.myProfile?.location;
    const userBio = profileData?.myProfile?.bio;
    const socialLinks = profileData?.myProfile?.socialLinks;

    return (
        <section className={`${activeStyle}-user-bio`}>
                <div className={`${activeStyle}-user-name-section`}>
                    <p className={`${activeStyle}-user-name-section-header`}>My Name is:</p>
                    <p>{userName}</p>
                </div>
                <div className={`${activeStyle}-user-email-section`}>
                    <p className={`${activeStyle}-user-email-header`}>email:</p>
                    <p>{userEmail}</p>
                </div>
                <div className={`${activeStyle}-user-region-section`}>
                    <p className={`${activeStyle}-user-region-header`}>I am From:</p>
                    <p>
                        {userHomeLocation}
                    </p>
                </div>
                <div className={`${activeStyle}-user-bio-blerb`}>
                    <p className={`${activeStyle}-user-bio-blerb-header`}>My Bio:</p>
                    <p>
                        {userBio}
                    </p>
                </div>
                <div className={`${activeStyle}-user-social-links`}>
                    <p className={`${activeStyle}-user-social-links-header`}>links:</p>
                    <div className={`${activeStyle}-user-social-links-list`}>
                        {socialLinks?.map((link, index) => (
                            <a
                                key={index}
                                href={link.startsWith("http") ? link : `https://${link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
        </section>
    );
};