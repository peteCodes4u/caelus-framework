import {Card} from 'react-bootstrap';
import GeneralForm from '../GeneralForm';

export default function LinksForm({ activeStyle = 'app-style1', onSubmit = () => {}, initialValues = {}, formClass = "LinksForm" }) {
    const linksFields = [
        { label: "Link 1", name: "link1", type: "text", placeholder: "Social Accounts / Website", required: false, autoComplete: "off" },
        { label: "Link 2", name: "link2", type: "text", placeholder: "Social Accounts / Website", required: false, autoComplete: "off" },
        { label: "Link 3", name: "link3", type: "text", placeholder: "Social Accounts / Website", required: false, autoComplete: "off" },
    ];

    return (
        <Card className={`${activeStyle}-links-form`}>
            <GeneralForm
                fields={linksFields}
                submitLabel="🔗 Update Links 🔗"
                formClass={formClass}
            />
        </Card>
    );
};