const rp = require('request-promise');

const extend_host = 'https://sandbox.auth0-extend.com';
const extend_token = '';
//this will end in either -0 or -1
const extend_tenant = '';

let options = {
	uri:`${extend_host}/api/tokens/issue`,
	method:'post',
	headers:{
		'Authorization':`Bearer ${extend_token}`
	},
	body:{
		ten:extend_tenant
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