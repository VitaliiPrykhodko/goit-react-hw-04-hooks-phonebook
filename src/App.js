import { useState, useEffect } from "react";
import shortid from "shortid";
import Form from "./Form/Form.js";
import ContactList from "./Contacts/ContactsList";
import Filter from "./Filter/Filter";
import styles from "./App.module.css";

function App() {
  const [contacts, setContacts] = useState(() => localStorage() ?? []);
  const [filter, setFilter] = useState("");

  function localStorage() {
    const contacts = window.localStorage.getItem("contacts");
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  }

  useEffect(() => {
    if (contacts !== []) {
      window.localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  function handleFilter(e) {
    const { value } = e.currentTarget;
    setFilter(value);
  }

  function handleDeleteContact(contactId) {
    setContacts(contacts.filter((contact) => contact.key !== contactId));
  }

  function foundContacts() {
    const normalizeFilter = filter.toLowerCase();
    if (contacts) {
      return contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(normalizeFilter);
      });
    }
  }

  function handleAddContact(name, number) {
    if (
      contacts.find((contact) => {
        return contact.name === name || contact.number === number;
      })
    )
      return alert(`${name} is already in contacts`);

    if (name === "" || number === "") return alert("Please enter correct name");
    else {
      setContacts((prev) => [
        ...prev,
        {
          key: shortid.generate(),
          name: name,
          number: number,
        },
      ]);
    }
  }

  return (
    <div className={styles.App}>
      <h1>Phonebook</h1>
      <Form onClick={handleAddContact} />
      <h2 className="contact_title">Contacts</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <ContactList
        contacts={foundContacts()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

export default App;
