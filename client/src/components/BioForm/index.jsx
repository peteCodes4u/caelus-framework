import { useState } from 'react';
import GeneralForm from '../GeneralForm';
import LinksForm from '../LinksForm';
import { Card, Button } from 'react-bootstrap';

const biofields = [
    { label: "Name", name: "name", type: "text", placeholder: "Your Name", required: false, autoComplete: "on" },
    { label: "Location", name: "location", type: "text", placeholder: "your location", required: false, autoComplete: "on" },
    { label: "Bio", name: "bio", type: "textarea", placeholder: "Tell us about yourself", required: false, autoComplete: "off", rows: 5, cols: 40 },
    { label: "Password", name: "password", type: "password", required: true, placeholder: "Enter your password" },

];

export default function BioForm({ activeStyle = 'app-style2', onSubmit = () => { }, initialValues = {}, formClass = "BioForm" }) {
    const [showLinksForm, setShowLinksForm] = useState(false);

    return (
        <Card className={`${activeStyle}-bio-form`}>
            <GeneralForm
                fields={biofields}
                submitLabel="Publish Bio"
                formClass={formClass}
            >
                {/* Toggle Links Form */}
                <Button
                    type="button"
                    className={`${activeStyle}-show-links-form-button mb-2`}
                    onClick={() => setShowLinksForm((prev) => !prev)}
                >
                    {showLinksForm ? "Hide Links" : "Add Links"}
                </Button>
                {showLinksForm && <LinksForm className={`${activeStyle}-links-form`} />}
            </GeneralForm>
        </Card>
    );
};