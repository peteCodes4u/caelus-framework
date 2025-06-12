import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function GeneralForm({ fields, onSubmit, initialValues = {}, submitLabel = "Submit", formClass = "" }) {
  const [formData, setFormData] = useState(initialValues);

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
      {fields.map((field) => (
        <Form.Group className={formClass} key={field.name}>
          <Form.Label htmlFor={field.name}>
            {field.label}
          </Form.Label>
          <Form.Control
            id={field.name}
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={field.autoComplete || "on"}
          />
        </Form.Group>
      ))}
      <Button type="submit">{submitLabel}</Button>
    </Form>
  );
}