import PropTypes from "prop-types";
import styles from "./ContactsList.module.css"

const ContactListItem = ({ contacts, handleDeleteContact }) => {
    return contacts.map(({key,name,number}) => {
       return (
    <li key={key} className={styles.contact_item}>
      <span>{name}</span>: <span>{number}</span>
      <button className={styles.contact_btn} onClick={() => handleDeleteContact(key)}>
        Delete
      </button>
    </li>
  );
   })
  
};

ContactListItem.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.node.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    })),
    handleDeleteContact: PropTypes.func.isRequired
}


export { ContactListItem };
