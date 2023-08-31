const form = document.getElementById('form');

async function getResult() {
	try {
		const res = await axios.get('https://randomuser.me/api/');
		console.log(res);
		return await res.data;
	} catch (err) {
		console.log(err);
	}
}
getResult();

console.log(getResult());
