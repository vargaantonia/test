import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "A név mező kitöltése kötelező!";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Az email cím mező kitöltése kötelező!";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Kérlek adj meg egy érvényes email címet!";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "A jelszó mező kitöltése kötelező!";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "A jelszónak legalább 6 karakterből kell állnia!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log("Űrlap adatainak elküldése:", formData);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>Regisztráció</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Név</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Add meg a neved"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email cím</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Add meg az email címed"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Jelszó</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Add meg a jelszavad"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Regisztráció</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
