import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./Form.module.css"

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { name, number } = this.state;
    this.resetState()
    this.props.onClick(name, number);
    this.setState({ name: "", number: "" });
  };

  resetState = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form_contact}>
        <label className={styles.form_label}>
          Name
          <input
            onChange={this.handleChange}
            value={name}
            className={styles.input_contact}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={styles.form_label}>
          Number
          <input
            onChange={this.handleChange}
            value={number}
            className={styles.input_contact}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button
          type="button"
          className={styles.btn_contact}
          onClick={this.handleClick}
        >
          Add contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Form;
