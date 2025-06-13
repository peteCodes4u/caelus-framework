import { Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import GeneralForm from '../GeneralForm';

const biofields = [
    { username: "username", label: "Username", type: "text" },
    { bio: "bio", label: "Bio", type: "textarea", placeholder: "Tell us about yourself", required: false, autoComplete: "off" },

]

export default function BioForm({ activeStyle = 'app-style2', onSubmit = () => { }, initialValues = {}, formClass = "BioForm" }) {
    const [formData, setFormData] = useState(initialValues);

    return (
        <GeneralForm
        fields={biofields}
        >
            <Form.Group className={formClass} >
                <Card
                    img="https://media.giphy.com/media/DyQrKMpqkAhNHZ1iWe/giphy.gif?cid=82a1493boi0qtei6fk4053oolyjicm28pwm83lghonanq8dv&ep=v1_gifs_trending&rid=giphy.gif&ct=g"
                >
                </Card>
            </Form.Group>
        </GeneralForm>

    );
}