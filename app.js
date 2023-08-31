const form = document.getElementById('form');
const result = document.getElementById('result');
const search = document.getElementById('search');
let fetchedData = [];
async function getResult() {
	try {
		const res = await axios.get('https://randomuser.me/api/?results=10');
		fetchedData = res.data.results;
		showResult(res.data.results);
	} catch (err) {
		console.log(err);
	}
}

// Call the function to fetch and display results
getResult();

function showResult(finish) {
	// Use map to generate an array of HTML fragments for each user
	const userCards = finish
		.map(
			(el) => `
		<div class="card">
			<div class="img-container">
				<img src="${el.picture.large}" alt="">
			</div>
			<div class="user-info">
				<h4>${el.name.first} ${el.name.last}</h4>
				<p>${el.location.city}, ${el.location.country}</p>
			</div>
		</div>
	`,
		)
		.join(''); // Join the array of HTML fragments into a single string

	// Update the result element with the generated HTML
	result.innerHTML = userCards;
}
search.addEventListener('keyup', (e) => {
	const searchTerm = e.target.value.toLowerCase();
	const filteredUsers = fetchedData.filter((user) => {
		return (
			user.name.first.toLowerCase().includes(searchTerm) ||
			user.name.last.toLowerCase().includes(searchTerm)
		);
	});
	showResult(filteredUsers);
});
