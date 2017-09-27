/**
 * just a test
 */
var tal="0";
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
			if( (c1==0&&tal[c1]!="-") || c1==tal.length-1)
				return false;
				else if (inArray(tal[c1-1],arr1) || inArray(tal[c1+1],arr1)) {
					return false;
				else if (tal[c1-1]=="(") {
					return false;
				}
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


function cal1(temp)//get all brackets out
{
	var temp_result="";
	var result="";
	if( temp.indexOf("(") != -1)
	{
		temp_result=temp.substring(temp.indexOf("(")+1,temp.lastIndexOf(")"));
		result.concat(temp.substring(0,temp.indexOf("(")),cal(temp_result));
		if(temp.lastIndexOf(")")!=temp.length-1)
			result.concat(temp.substring(temp.lastIndexOf(")")+1);
		return result;
	}
	else
		return temp;
}


function cal2(temp)//get all * and / out
{

}


function get_pointOfaddOrdel(temp,bigan_point)
{
	var var_t1=temp.indexOf("+",began_point);
	var var_t2=temp.indexOf("-",began_point);
	if(var_t1==-1)
		if(var_t2==-1)
			return -1;
		else {
			return var_t2;
		}
	else if (var_t2==-1) {
		return var_t1;
	}
	else if (var_t1>var_t2) {
		return var_t2;
	}
	return var_t1;
}

function cal(temp1)
{
	var temp = cal1(temp1);

	/* calculate such as 1+2*3/4-5,and return result as string*/
	var pointer=0;
	var temp_result="";
	var sum=0;
	var count = 0;
	while(pointer<temp.length)
	{
		var temp_var=get_pointOfaddOrdel(temp,pointer);
		if(temp_var==-1)
		{
			temp_result.concat(cal2(temp.substring(pointer)));
			pointer=temp.length;
		}
		else
		{
			temp_result.concat(cal2(temp.substring(pointer,temp_var)),temp[temp_var]);
			pointer=temp_var+1;
		}
	}

	pointer=0;
	while(pointer<temp_result.length)
	{
		var temp_var=get_pointOfaddOrdel(temp_result,pointer);
		if(temp_var==-1)
		{
			sum+=parseInt(temp_result.substring(pointer,temp_result))
		}
		else
		{
			temp_result.concat(cal2(temp.substring(pointer,temp_var)),temp[temp_var]);
			pointer=temp_var+1;
		}
	}

	return sum.toString();
}

function calculate()
{
	if(varify1() && varify2()){
		cal(tal);
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
