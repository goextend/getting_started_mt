const rp = require('request-promise');

const extend_host = 'https://sandbox.auth0-extend.com';
const extend_token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IjIifQ.eyJqdGkiOiIzZmRkMjFkNDAyMjM0NTJjYWNkMTljZDExZTRkMTY1ZSIsImlhdCI6MTUzNTA1Mjg3MSwiY2EiOlsiY2RjOTQ5MTQ1Njk1NDA5N2E0ZWE0ZDA2YjI1ZWI1YTMiXSwiZGQiOjIsInRlbiI6Ii9eZXh0LTQxZWJlZWM4OWQ5ZGFlMmYxNDQzMzBjOTg5MGIyOThmLVswLTFdJC8iLCJzaWQiOiJleHRlbmQtZnJlZW1pdW06YXV0aDB8NWI3ZjBjNDVkZDQ0YTkyYTI1OWMxN2Y5In0.B7AjUlSy0zOLD35R98Qfp6iFG0ZSo0u87n482xTLilw';

let options = {
	uri:`${extend_host}/api/tokens/issue`,
	method:'post',
	headers:{
		'Authorization':`Bearer ${extend_token}`
	},
	body:{
		ten:'ext-41ebeec89d9dae2f144330c9890b298f-1'
	},
	json:true
};

rp(options)
.then(res => {
	console.log('Success!');
	console.log(res);
})
.catch(e => {
	console.error(e);
});