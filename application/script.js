const searchInput = document.getElementById('search-input');
const names = document.getElementById('names');

const init = {
	method: 'GET',
	headers: { 'Content-Type': 'application/json' },
	mode: 'cors',
	cache: 'default'
}

const file = new Request('./data.json', init);

fetch(file)
.then( (resp) => resp.json() )
.then( (data) => {

	data.customers.map( (customer) => {
		names.innerHTML += `<p>${customer.name}</p>`
	});


	searchInput.oninput = (e) => {
		let value = e.target.value;
		
		if (value && value.trim().length > 0) {
			value = value.trim().toLowerCase();

			setList(data.customers.filter( (person) => {
				return person.name.toLowerCase().includes(value);
			}));
		}

		if (searchInput.value === "" || searchInput.value === null) {
			names.innerHTML = '';
			
			data.customers.map( (customer) => {
				names.innerHTML += `<p>${customer.name}</p>`
			});
		}
	}

});


function setList(results) {
	names.innerHTML = '';

	for (const person of results) {
		const result = document.createElement('p');
		const text = document.createTextNode(person.name);

		result.appendChild(text);
		names.appendChild(result);
	}
}