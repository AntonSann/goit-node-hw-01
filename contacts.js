const path = require('path');
const fsPromises = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  try{
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch(error){
console.error(error);
  }  
}
  
const getContactById = async (contactId) => {
  try{
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    contacts.map((contact)=>{
      if(contact.id === Number(contactId)){
        console.table(contact);
      }})
  } catch(error){
console.error(error);
  }  
  }
  
  const removeContact = async (contactId) => {
    try {
      const data = await fsPromises.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(
        (contact) => contact.id !== Number(contactId)
      );
      await fsPromises.writeFile(contactsPath, JSON.stringify(newContacts));
      console.log(`Contact ${contactId} was removed`);
    } catch (e) {
      console.error(e);
    }
  }
  
  const addContact = async (name, email, phone) => {
    try {
      const contact = {
        id: uuidv4(),
        name: name,
        email: email,
        phone: phone
      }
      const data = await fsPromises.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const newContacts = [...contacts, contact];
      await fsPromises.writeFile(contactsPath, JSON.stringify(newContacts));
      console.log(`${name} was added to contacts`);
    } catch (e) {
      console.error(e);
    }
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }