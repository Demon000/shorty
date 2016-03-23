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
		select(document.querySelector('#shortened'));
	});
}
function select(dom)
{
	if(document.selection)
	{
		var range = document.body.createTextRange();
		range.moveToElementText(dom);
		range.select();
	}
	else if(window.getSelection)
	{
		var range = document.createRange();
		range.selectNode(dom);
		window.getSelection().addRange(range);
	}
}