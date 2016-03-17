window.request = superagent;
function shorty()
{
	var address = document.querySelector('#address').value;
	request
	.get(`${location.protocol}//${location.host}/create/${address}`)
	.end(function(err, res) 
	{
		console.log(err, res);
		document.querySelector('#shortened').innerHTML = `${location.protocol}//${location.host}/go/${res.body.short}`;
	});
}