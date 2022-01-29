import { useState } from "react";

export default function useForm(initialValues) {
  const [formValues, setFormValues] = useState(initialValues);

  function handleChange(event) {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [event.target.name]: event.target.value,
    }));
  }

  function clearForm() {
    const emptyForm = {};
    for (const key in formValues) {
      emptyForm[key] = "";
    }

    setFormValues((prevFormValues) => emptyForm);
  }

  return [formValues, handleChange, clearForm];
}
