import React, { Component } from "react";
import shortid from "shortid";
import Form from "./Form/Form.js";
import ContactList from "./Contacts/ContactsList";
import Filter from "./Filter/Filter";
import styles from "./App.module.css"

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  

  componentDidMount() {
   const contacts =  localStorage.getItem('contacts')
    const parseContacts = JSON.parse(contacts)
    if (parseContacts) {
      this.setState({
      contacts: parseContacts
    })
    }
  }

   componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
    }
  }

  handleFilter = (e) => {
    const { value } = e.currentTarget;
    this.setState({
      filter: value,
    });
  };

  handleAddContact = (name, number) => {
    const { contacts } = this.state;
    if (
      contacts.find((contact) => {
        return contact.name === name || contact.number === number;
      })
    )
      return alert(`${name} is already in contacts`);

    if (name === "" || number === "") return alert("Please enter correct name");
    else {
      this.setState({
        contacts: [
          ...contacts,
          {
            key: shortid.generate(),
            name: name,
            number: number,
          },
        ],
      });
    }
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.key !== contactId
      ),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    const foundContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(normalizeFilter);
    });

    return (
      <div className={styles.App}>
        <h1>Phonebook</h1>
        <Form onClick={this.handleAddContact} />
        <h2 className="contact_title">Contacts</h2>
        <Filter filter={filter} handleFilter={this.handleFilter} />
        <ContactList
          contacts={foundContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
