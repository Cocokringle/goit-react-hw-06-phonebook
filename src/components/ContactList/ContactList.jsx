import React from 'react';
import ContactListItem from 'components/ContactList/ContactListItem/ContactListItem';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from 'redux/sliceContacts ';

const ContactList = () => {
  const getContacts = state => state.contacts.items;
  const getFilter = state => state.filter.value;
  const dispatch = useDispatch()
  
  const deleteContact = (id) => {
      dispatch(remove(id));
  };
  
  const getVisibleContacts = state => {
    const allContacts = getContacts(state);
    const filter = getFilter(state);
    const normalizedFilter = filter.toLowerCase();
    return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter));
  };

  const contacts = useSelector(getVisibleContacts);

   return (
      <ul>{contacts.map((contact) => (<ContactListItem  key={contact.id} contact={contact} onDeleteContact={deleteContact}/>))}
      </ul>
   )


 
}

export default ContactList;


