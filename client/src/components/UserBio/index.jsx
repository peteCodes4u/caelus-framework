export default function UserBio({ activeStyle = "app-style1" }) {
    return (
        <section className={`${activeStyle}-user-bio`}>
            <div>
                <div className={`${activeStyle}-user-name-section`}>
                        <strong>My Name is:</strong>
                    <p>
                        <strong>You have not yet configured your profile, if you would like your name to be visible to other users, please configure your bio using the bio form</strong>
                    </p>
                </div>
                <div className={`${activeStyle}-user-region-section`}>
                    <strong>I am From:</strong>
                    <p>
                        <strong>You have not yet configured your profile, if you would like your location to be visible to other users, please configure your bio using the bio form</strong>   
                    </p>
                </div>
                <div className={`${activeStyle}-user-bio-section`}>
                    <strong>My Bio:</strong>
                    <p>
                        <strong>You have not yet configured your profile, if you would like your bio to be visible to other users, please configure your bio using the bio form</strong>
                    </p>
                </div>
                <div className={`${activeStyle}-user-social-links`}>
                    <strong>My soicials links</strong>
                    <p>
                        <strong>You have not yet configured your profile, if you would like your socials to be visible to other users, please configure your bio using the bio form</strong>
                    </p>
                </div>
            </div>
        </section>
    );
};