







var tal="0";
var arr1=["+","-","*","/"];
var arr2=["1","2","3","4","5","6","7","8","9","0"];

var err=0;

window.onload = function()
{
	document.getElementById("button1").onclick = function(){get('1');};
	document.getElementById("button2").onclick = function(){get('2');};
	document.getElementById("button3").onclick = function(){get('3');};
	document.getElementById("button4").onclick = function(){get('/');};
	document.getElementById("button5").onclick = function(){get('4');};
	document.getElementById("button6").onclick = function(){get('5');};
	document.getElementById("button7").onclick = function(){get('6');};
	document.getElementById("button8").onclick = function(){get('*');};
	document.getElementById("button9").onclick = function(){get('7');};
	document.getElementById("button10").onclick = function(){get('8');};
	document.getElementById("button11").onclick = function(){get('9');};
	document.getElementById("button12").onclick = function(){get('-');};
	document.getElementById("button13").onclick = function(){get('0');};
	document.getElementById("button14").onclick = function(){get('.');};
	document.getElementById("button15").onclick = function(){del();};
	document.getElementById("button16").onclick = function(){get('+');};
	document.getElementById("button17").onclick = function(){get('(');};
	document.getElementById("button18").onclick = function(){get(')');};
	document.getElementById("button19").onclick = function(){CE();};
	document.getElementById("button20").onclick = function(){calculate();};

	document.onkeydown=function(event){
		var E = event || window.event || arguments.callee.caller.arguments[0];
		var keycode = E.keyCode;
		if(keycode>95&&keycode<106)
		{
			if(event.shiftKey==true&&keycode==105)
				get('(');
			else if (event.shiftKey==true&&keycode==95) {
				get(')');
			}
			else
				get((keycode-96).toString());
		}
		else if (keycode == 13) {
			calculate();
		}
		else if (keycode == 8) {
			del();
		}
		else if (keycode == 110) {
			get('.');
		}
		else if(keycode == 107)
		{
			get('+');
		}
		else if (keycode == 109) {
			get('-');
		}
		else if (keycode == 106) {
			get('*');
		}
		else if (keycode == 111) {
			get('/');
		}
	};
}



function check_1()
{
	for(var c1 = tal.length-1;c1>=0;c1--)
	{
		if(tal[c1]==".")
			return false;
		for(var c2= 0;c2<10;c2++)
		{
			if(tal[c1]=='+'||tal[c1]=='-'||tal[c1]=='/'||tal[c1]=='*'||tal[c1]=='('||tal[c1]==')')
				return true;
		}
	}
	return true;
}

function get(var1)
{
	if(tal.length>=21)
		window.alert("太长了，算不过来~~~");
	if(tal!="0"||var1=='.'||inArray(var1,arr1))
	{
		if(var1=='.'&&!check_1())
		{
			return;
		}
		else
		{
			tal=tal.concat(var1);
		}
	}
	else if(var1!= ')')
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
			if((c1==0 || inArray(tal[c1-1],arr1) || tal[c1-1] == "(" ) && (c1!=tal.length-1&& (inArray(tal[c1+1],arr2)||tal[c1+1]=='('||tal[c1+1]=='-')))
				var _nothing=0;
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
				}
				else if (tal[c1-1]=="(") {
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
	for(var c1=0;c1<tal.length;c1++)
	{
		if(tal[c1] == '.')
		{
			if(c1==0 || !inArray(tal[c1-1],arr2) || c1 == tal-1 || !inArray(tal[c1+1],arr2))
				return false;
		}
	}

	return true;
}

function cal1(temp)//get all brackets out
{
	var temp_result="";
	var result="";
	if( temp.indexOf("(") != -1)
	{
		temp_result=temp.substring(temp.indexOf("(")+1,temp.lastIndexOf(")"));
		result+=temp.substring(0,temp.indexOf("("))+cal(temp_result);
		if(temp.lastIndexOf(")")!=temp.length-1)
			result+=temp.substring(temp.lastIndexOf(")")+1);
		return result;
	}
	else
		return temp;
}



function get_pointOfcc(temp,begin_point)
{
	var var_t1=temp.indexOf("*",begin_point);
	var var_t2=temp.indexOf("/",begin_point);
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

function cal2(temp)//get all * and / out
{
	var result=1;
	var pointer=0;

	var mi = 0;

	if(get_pointOfcc(temp,pointer)==-1)
		return (parseFloat(temp)*100000).toString();
	else {
		result*=parseFloat(temp.substring(pointer,get_pointOfcc(temp,pointer)))*10000;
		mi++;
		pointer=get_pointOfcc(temp,pointer)+1;
	}

	while(pointer<temp.length)
	{
		var temp_var=get_pointOfcc(temp,pointer);
		if(temp_var==-1)
		{
			if(temp[pointer-1]=="*"){
				result*=parseFloat(temp.substring(pointer))*10000;
				mi++;
			}
			else {
				var s_temp=parseFloat(temp.substring(pointer));
				if(s_temp!=0)
				{
					result/=parseFloat(temp.substring(pointer))*10000;
					mi--;
				}
				else {
					window.alert("You could not make '0' as a divisor!");
					err=1;
				}
			}
			pointer=temp.length;
		}
		else {
			if(temp[pointer-1]=="*"){
				result*=parseFloat(temp.substring(pointer,temp_var))*10000;
				mi++;
			}
			else {
				var s_temp=parseFloat(temp.substring(pointer,temp_var));
				if(s_temp!=0)
				{
					result/=s_temp*10000;
				}
				else {
					window.alert("You could not make '0' as a divisor!");
					err=1;
				}
			}
			pointer=temp_var+1;
		}
	}

	if(mi>0)
	{
		while(mi>0)
		{
			result/=10000;
			mi--;
		}
	}
	else if(mi<0)
	{
		while (mi<0) {
			result*=10000;
			mi++;
		}
	}

	return (result*100000).toString();
}


function get_pointOfaddOrdel(temp,begin_point)
{
	var var_t1=temp.indexOf("+",begin_point);
	var var_t2=temp.indexOf("-",begin_point);
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

	// calculate such as 1+2*3/4-5,and return result as string
	var pointer=0;
	var temp_result="";
	var sum=0;
	var count = 0;
	while(pointer<temp.length)
	{
		var temp_var=get_pointOfaddOrdel(temp,pointer);
		if(temp_var==-1)
		{
			temp_result+=cal2(temp.substring(pointer));
			pointer=temp.length;
		}
		else
		{
			temp_result+=cal2(temp.substring(pointer,temp_var))+temp[temp_var];
			pointer=temp_var+1;
		}
	}

	pointer=0;

	var temp_var=get_pointOfaddOrdel(temp_result,pointer);
	if(temp_var==0)
		temp_var=get_pointOfaddOrdel(temp_result,pointer+1);
	if(temp_var==-1)
	{
		sum+=parseFloat(temp_result.substring(pointer));
		pointer=temp_result.length;
	}
	else
	{
		var qwe=temp_result.substring(pointer,temp_var);
		sum+=parseFloat(qwe);
		pointer=temp_var;
	}

	while(pointer<temp_result.length)
	{
		temp_var=get_pointOfaddOrdel(temp_result,pointer+1);
		if(temp_var==-1)
		{
			sum+=parseFloat(temp_result.substring(pointer));
			pointer=temp_result.length;
		}
		else
		{
			var qwe=temp_result.substring(pointer,temp_var);
			sum+=parseFloat(qwe);
			pointer=temp_var;
		}
	}

	return (sum/100000).toString();
}

function calculate()
{
	if(varify1() && varify2()){
		tal=cal(tal);
		if(err==1)
		{
			err =0;
			tal='0';
		}
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
