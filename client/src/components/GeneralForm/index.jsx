import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function GeneralForm({
  fields,
  onSubmit,
  initialValues = {},
  submitLabel = "Submit",
  formClass = "",
  children,
  formData: parentFormData,
  setFormData: parentSetFormData
}) {
  const isControlled = !!parentFormData && !!parentSetFormData;
  const [formData, setFormData] = useState(() => ({ ...initialValues }));

  // If controlled, always use parent state
  const currentFormData = isControlled ? parentFormData : formData;
  const currentSetFormData = isControlled ? parentSetFormData : setFormData;

  useEffect(() => {
    if (!isControlled) {
      setFormData(prev => {
        const keys = Object.keys(initialValues);
        let changed = false;
        for (const k of keys) {
          if (initialValues[k] !== prev[k]) { changed = true; break; }
        }
        return changed ? { ...prev, ...initialValues } : prev;
      });
    }
  }, [initialValues, isControlled]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    currentSetFormData({ ...currentFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(currentFormData);
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
            value={currentFormData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            autoComplete={field.autoComplete || "on"}
          />
        </Form.Group>
      ))}
      {children}
      <br />
      <Button type="submit" className='btn-info'>{submitLabel}</Button>
    </Form>
  );
}
