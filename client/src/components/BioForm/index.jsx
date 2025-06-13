import { Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import GeneralForm from '../GeneralForm';

const biofields = [
    { type: "textarea", placeholder: "Tell us about yourself", required: false, autoComplete: "off" },
]

export default function BioForm({ activeStyle = 'app-style2', onSubmit = () => { }, initialValues = {}, formClass = "BioForm" }) {
    const [formData, setFormData] = useState(initialValues);

    return (
        <>
        <GeneralForm fields={biofields} />
        </>
    );
}