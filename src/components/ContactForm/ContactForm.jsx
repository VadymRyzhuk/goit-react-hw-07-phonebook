import React from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({ onAddClick, handleChange, handleNumber }) => {
  return (
    <div>
      <form onSubmit={onAddClick} className={css.formData}>
        <label>
          <span className={css.labelTitleName}>Name:</span>
          <input
            type="text"
            placeholder="Anna"
            name="name"
            onChange={handleChange}
            pattern="^[A-Za-z ]*$"
            required
          />
        </label>
        <label>
          <span className={css.labelTitleNumber}>Number:</span>
          <input
            type="tel"
            placeholder="50102050"
            name="number"
            onChange={handleNumber}
            pattern="[0-9]*"
            required
          />
        </label>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    </div>
  );
};

export { ContactForm };
