const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// this function is used to search through the fruit array after someone has started typing in the input box
function search(str) {
	// filtering the fruit array using what the user has input and adding .toLowerCase to make it case-insensitive
	let results = fruit.filter((el) => el.toLowerCase().includes(str.toLowerCase()));

	// passing the new array of results and what the user input to the showSuggestions function 
	showSuggestions(results, str)
}

// this function runs when someone starts typing
function searchHandler(e) {
	// prevents any possible form submission before something is typed in
	e.preventDefault();

	// this passes the value of the input box to the search function
	search(input.value);
}

// this function handles displaying search results in the suggestions ul in on the page
function showSuggestions(results, inputVal) {

	// making sure that there is something in the input before running anything
	if (inputVal) {

		// clearing the suggestions ul so that the list only shows once
		suggestions.innerHTML = '';

		// running through the function for each value in the results array
		for (let fruit of results) {

			// creating a new li element to append to the suggestions ul
			const newLi = document.createElement('li');

			// running a helper function to bold any letters that match the users input
			let boldFruit = boldMatchingCharacters(fruit, inputVal)

			// adding this new bolded text to the li
			newLi.innerHTML = boldFruit

			// appending the li to the suggestions section
			suggestions.append(newLi);

			// adding a class to handle styles once the section is visible
			suggestions.classList.add('has-suggestions')
		} 
	} else {
		// removing the style if nothing is currently showing on the page
		suggestions.classList.remove('has-suggestions');

		// removing any content in the suggestions section if the form input has no value
		suggestions.innerHTML = '';
	}
}

// a helper function added to bold specific letters that match the user's input
function boldMatchingCharacters(fruit, char) {
	// using a regular expresion that takes the character provided
	// gi is a modification that makes the character case-insensitive
	const regEx = new RegExp(char, 'gi');

	// returning the fruit name back with the matching letters bolded
    return fruit.replace(regEx, '<strong>$&</strong>');
}

// this lets the person select the fruit from the list that is generated
function useSuggestion(e) {

	// this changes the value of the input on the page to be the fruit that is clicked
	input.value = e.target.innerText;

	// this removes the styles from the suggestion ul that is about to disappear
	suggestions.classList.remove('has-suggestions');

	// this removes any content that was in the suggestions ul
	suggestions.innerHTML = '';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);