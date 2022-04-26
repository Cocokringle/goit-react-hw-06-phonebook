import React from 'react';
import ContactListItem from 'components/ContactList/ContactListItem/ContactListItem';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from 'redux/sliceContacts ';

const ContactList = () => {

  //  const contacts = useSelector(state => state.contacts.value);
  //  const filter = useSelector(state => state.filter.value);
  const getContacts = state => state.contacts.value;
  const getFilter = state => state.filter.value;
  const dispatch = useDispatch()
  
  const deleteContact = (id) => {
      dispatch(remove(id));
  };
  
  const getVisibleContacts = state => {
    const allContacts = getContacts(state);
    console.log('allContacts:', allContacts)
    const filter = getFilter(state);
    console.log('filter:', filter)
    const normalizedFilter = filter.toLowerCase();
    return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter));
  };

  const contacts = useSelector(getVisibleContacts);
  console.log('contacts', contacts)


  // const getVisibleContacts = () => {
  //     const normalizedFilter = filter.toLowerCase().trim();
  //     console.log('normalizedFilter', normalizedFilter)
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(normalizedFilter)
  //     );
  // };

  // const visibleContacts = getVisibleContacts();
  
   return (
      <ul>{contacts.map((contact) => (<ContactListItem  key={contact.id} contact={contact} onDeleteContact={deleteContact}/>))}
      </ul>
   )


 
}

// ContactList.propTypes = {
//    onDeleteContact: PropTypes.func.isRequired,
//    contacts: PropTypes.array.isRequired
// }

export default ContactList;