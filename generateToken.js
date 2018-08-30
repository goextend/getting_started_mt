const rp = require('request-promise');

const extend_host = 'https://sandbox.auth0-extend.com';
const extend_token = '';

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