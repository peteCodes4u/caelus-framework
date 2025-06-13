import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function GeneralForm({ fields, onSubmit, initialValues = {}, submitLabel = "Submit", formClass = "", children }) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field, idx) => (
        <Form.Group className={formClass} key={field.name || idx}>
          <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
          <Form.Control
            as={field.type === 'textarea' ? 'textarea' : 'input'}
            type={field.type === 'textarea' ? undefined : field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={field.autoComplete || "on"}
          />
        </Form.Group>
      ))}
      {/* Render children (LinksForm and toggle button) above the submit button */}
      {children}
      <br />
      <Button type="submit">{submitLabel}</Button>
    </Form>
  );
}