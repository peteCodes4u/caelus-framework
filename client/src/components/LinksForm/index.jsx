// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { UPDATE_PROFILE } from '../../utils/mutations';
import {Card, Button, Alert } from 'react-bootstrap';
import GeneralForm from '../GeneralForm';

export default function LinksForm({ activeStyle = 'app-style1', onSubmit = () => {}, initialValues = {}, formClass = "LinksForm" }) {
    
    const linksFields = [
        { label: "Link", name: "newLink", type: "text", placeholder: "Social Accounts / Website", required: false, autoComplete: "off" },
    ];

    // const [updateProfile, {loading}] = useMutation(UPDATE_PROFILE);
    // const [ successMsg, setSuccessMsg ] = useState('');
    // const [ errorMsg, setErrorMsg ] = useState('');

    // const handleUpdateLinks = async(formData) => {
    //     setSuccessMsg('');
    //     setErrorMsg('');

    //     try {
    //         const { data } = await updateProfile({
    //             variables: {
    //                 newLink: [formData.newLink]
    //             }
    //         });

    //         if (data && data.updateProfile) {
    //         setSuccessMsg('Link added');
    //         } else {
    //         setErrorMsg('failed to update profile.')
    //         }

    //     } catch (err) {
    //         setErrorMsg(err.message && 'failed to update')
    //     }

    // }

    return (
        <Card className={`${activeStyle}-links-form`}>
            <>
            <GeneralForm
                fields={linksFields}
                submitLabel="🔗 Update Links 🔗"
                formClass={formClass}
            />
            </>
        </Card>
    );
};