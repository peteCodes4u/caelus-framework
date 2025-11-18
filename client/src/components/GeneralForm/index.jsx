import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function GeneralForm({ fields, onSubmit, initialValues = {}, submitLabel = "Submit", formClass = "", children }) {
  
  // lazy init to set state once on mount
  const [formData, setFormData] = useState(() => ({...initialValues}));

  // update form data only when initialValues change
  useEffect(() => {
    setFormData( prev => {
      const keys = Object.keys(initialValues);
      let changed = false;
      for (const k of keys) {
        if (initialValues[k] !== prev[k]) {changed = true; break;}
      }
        return changed ? { ... prev, ...initialValues } : prev;
      });
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
      {children}
      <br />
      <Button type="submit">{submitLabel}</Button>
    </Form>
  );
}