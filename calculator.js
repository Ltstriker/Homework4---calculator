/**
 * just a test
 */
var tal="0";
var v1="";
var c2="";
var arr1=["+","-","*","/"];
var arr2=["1","2","3","4","5","6","7","8","9","0"];

function get(var1)
{
	if(tal!="0"||var1=='.')
		tal=tal.concat(var1);
	else
		tal=var1;
	document.getElementById("demo").innerHTML=tal;
}

function inArray(charactor,array)
{
	for(var c1=0;c1<array.length;c1++)
	{
		if(charactor==array[c1])
			return true;
	}

	return false;
}

function varify1()
{
	var count=0;
	for(var c1=0;c1<tal.length;c1++)
	{
		if(tal[c1] == '(')
		{
			count++;
			if((c1==0 || inArray(tal[c1-1],arr1) || tal[c1-1] == "(" ) && (c1!=tal.length-1&& inArray(tal[c1+1],arr2)))
				;
			else {
				return false;
			}
		}
		else if (tal[c1] == ')')
		{
			count--;
			if((c1 == tal.length-1 || inArray(tal[c1+1],arr1) || tal[c1+1] == ")") && (c1 != 0 && inArray(tal[c1-1],arr2)))
				;
			else {
				return false;
			}
		}
		else if (inArray(tal[c1],arr1)) {
			if(c1==0||c1==tal.length-1)
				return false;
				else if (inArray(tal[c1-1],arr1) || inArray(tal[c1+1],arr1)) {
					return false;
				}
		}
		if(count < 0)
			return false;
	}
	return true;
}

function varify2()
{
	return true;
}


function cal()
{

}

function calculate()
{
	if(varify1() && varify2()){
		cal();
	}
	else {
		window.alert("wrong format");
		tal="0";
	}
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
