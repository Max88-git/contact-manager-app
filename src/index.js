import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

// AddPersonForm: a form with the text field and Add button
// AddPersonForm uses state to manage the value of the text field
function AddPersonForm(props) {
	const [ person, setPerson ] = useState('');

	function handleChange(e) {
		setPerson(e.target.value);
	}
	// PeopleList calls the handleSubmit function that it received when the form is submitted, to add a new person to the list
	function handleSubmit(e) {
		props.handleSubmit(person);
		setPerson(''); // Clear the value of the text field using setPerson('') after adding a new person.
		e.preventDefault();
	}
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Add new contact"
				onChange={handleChange}
				value={person}
			/>
			<button type="submit">Add</button>
		</form>
	);
}
// PeopleList: a list of contacts
// PeopleList received an array representing the contacts and renders a list on the page
function PeopleList(props) {
	const arr = props.data;
	const listItems = arr.map((val, index) => <li key={index}>{val}</li>);
	return <ul>{listItems}</ul>;
}
// ContactManager: Parent component of AddPersonForm and PeopleList and holds the contacts list in its state.
// ContactManager component receives the initial contacts list using props, saves it in its state.
// Then it passes down the contacts list to its child component.
function ContactManager(props) {
	const [ contacts, setContacts ] = useState(props.data);
	// addPerson() function to add a new person to our contacts state array
	function addPerson(name) {
		setContacts([ ...contacts, name ]);
	}

	return (
		<div>
			<AddPersonForm handleSubmit={addPerson} />
			<PeopleList data={contacts} />
		</div>
	);
}
//Render our components on the page and include some initial data
const contacts = [ 'James Smith', 'Thomas Anderson', 'Bruce Wayne' ];
// Display contacts inside the "root" element
ReactDOM.render(
	<ContactManager data={contacts} />,
	document.getElementById('root')
);
