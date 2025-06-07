import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function GeneralForm({ fields, onSubmit, initialValues = {}, submitLabel = "Submit" }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSignUp = async (formData) => {
    try {
      const { data } = await addUser({ variables: { ...formData } });
      Auth.login(data.addUser.token);
    } catch (e) {
      setShowAlert(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Form.Group className="mb-3" key={field.name}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        </Form.Group>
      ))}
      <Button type="submit">{submitLabel}</Button>
    </Form>
  );
}