/**
 * just a test
 */
var tal="0";





function get(var1)
{
	if(tal!="0"||var1=='.')
		tal=tal.concat(var1);
	else
		tal=var1;
	document.getElementById("demo").innerHTML=tal;
}

function varify()
{
	
}

function calculate()
{
	//unfinish
	document.getElementById("demo").innerHTML=tal;
}

function del()
{
	if(tal.length==1)
		tal="0";
	else if(tal.length!=0)
	{
		tal=tal.substr(0,tal.length-1);
	}
	document.getElementById("demo").innerHTML=tal;
}

function CE()
{
	tal="0";
	document.getElementById("demo").innerHTML=tal;
}




