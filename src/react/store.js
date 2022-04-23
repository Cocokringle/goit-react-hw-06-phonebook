import {configureStore} from '@reduxjs/toolkit'
import { filterSlice } from 'components/Filter/reduxFilter/filterSlice'
import { contactsSlice } from 'components/ContactForm/reduxContact/contactsSlice'

export const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        contacts: contactsSlice.reducer,
    },
})