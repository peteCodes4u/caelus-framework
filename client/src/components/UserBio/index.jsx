import { useParams } from 'react-router-dom';
import { useStyle } from '../../styleContext';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

export default function UserBio({ activeStyle = "app-style1" }) {

    const { id } = useParams();

    const { data, loading, error } = useQuery(QUERY_ME, {
    variables: { userId: id }
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user.</p>;
    
    const userName = data?.me?.name;
    const userHomeLocation = data?.me?.location;
    const userBio = data?.me?.bio; 

    return (
        <section className={`${activeStyle}-user-bio`}>
            <div>
                <div className={`${activeStyle}-user-name-section`}>
                        <p className={`${activeStyle}-user-name-section-header`}>My Name is:</p>
                        <p>{userName}</p>
                </div>
                <div className={`${activeStyle}-user-region-section`}>
                    <p className={`${activeStyle}-user-region-header`}>I am From:</p>
                    <p>
                       Not Yet Configured
                    </p>
                </div>
                <div className={`${activeStyle}-user-bio-section`}>
                    <p className={`${activeStyle}-user-bio-blerb-header`}>My Bio:</p>
                    <p>
                        not yet configured
                    </p>
                </div>
                <div className={`${activeStyle}-user-social-links`}>
                    <p className={`${activeStyle}-user-social-links-header`}>My soicials links:</p>
                    <p>
                       not yet configured
                    </p>
                </div>
            </div>
        </section>
    );
};