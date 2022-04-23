import React, { useEffect } from 'react';
import { nanoid } from "nanoid";
import s from './App.module.css'
import ContactForm  from 'components/ContactForm/ContactForm ';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter'
import { useSelector, useDispatch } from 'react-redux';
import { set } from 'components/Filter/reduxFilter/filterSlice';
import { addContactsToLS } from 'LocalStorage/LocalStorage';
import { add, remove } from 'components/ContactForm/reduxContact/contactsSlice';



export default function App(){
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter);
    const contacts = useSelector(state => state.contacts);

    useEffect(() => {
        addContactsToLS('contacts', contacts );
    }, [contacts]);

    const saveContact = ({ name, number }) => {
        const contact = {
          id: nanoid(),
          name,
          number,
        };
        const normalizedName = name.toLowerCase();

        if (contacts.find((contact) => contact.name.toLowerCase() === normalizedName)) {
            alert(`${name} is already in contacts list`);
            return;
        } 
        else if (contacts.find((contact) => contact.number === number)) {
            alert(`${number} is already in contacts list`);
            return;
        } 
        else {
            dispatch(add([contact]));
        }

    }

    const deleteContact = e => {
        const contactIndex = findContactIndex(e);
        dispatch(remove(contactIndex));
    };
    
    const findContactIndex = (contact) => {
        return contacts.findIndex(item => item.id === contact);
    }

    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLocaleLowerCase().trim();
        return contacts.filter(contact =>
            contact.name.toLocaleLowerCase().includes(normalizedFilter));
    }

    const changeFilter = e => {
        dispatch(set(e.currentTarget.value))
    }

    return (
        <div className={s.container}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={saveContact} />
            <h2>Contacts</h2>
            <Filter value={filter} onChange={changeFilter}/>
            <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact}>
            </ContactList>
        </div>  )

}

