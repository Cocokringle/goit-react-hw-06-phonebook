import React from 'react';
import ContactListItem from 'components/ContactList/ContactListItem/ContactListItem';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from 'redux/slice';

const ContactList = () => {

   const contacts = useSelector(state => state.contacts.items);
   const filter = useSelector(state => state.contacts.filter);
   const dispatch = useDispatch()
   console.log('filter:', filter)

   const deleteContact = (id) => {
      dispatch(remove(id));
  };
  
  const getVisibleContacts = () => {
      const normalizedFilter = filter.toLowerCase().trim();
      console.log('normalizedFilter', normalizedFilter)
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
  };

  const visibleContacts = getVisibleContacts();
  
   return (
      <ul>{visibleContacts.map((contact) => (<ContactListItem  key={contact.id} contact={contact} onDeleteContact={deleteContact}/>))}
      </ul>
   )


 
}

// ContactList.propTypes = {
//    onDeleteContact: PropTypes.func.isRequired,
//    contacts: PropTypes.array.isRequired
// }

export default ContactList;