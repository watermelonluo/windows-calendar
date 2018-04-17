window.onload=function(){
	var time1=document.querySelector(".time1");
	var time2=document.querySelector(".time2");
	var number=document.querySelector(".number");
	var strong=document.querySelector(".time3 strong");
	var btns=document.querySelectorAll(".time3 span");
	
	
	//即时时间
	time();
	setInterval(time,1000);
	function time(){
		var d=new Date();
		
		time1.innerHTML=format(d.getHours())+':'+format(d.getMinutes())+':'+format(d.getSeconds());
	};
	
	//补0
	function format(v){
		return v<10?'0'+v:v;
	}
	function formatWeek(v){
		return ['日','一','二','三','四','五','六'][v];
	}
	
	
	//即时日期
	data();
	function data(){
		var d=new Date();
		
		time2.innerHTML=d.getFullYear()+'年'+format(d.getMonth()+1)+'月'+format(d.getDate())+'日,星期'+formatWeek(d.getDay());
	};
	
	
	//日历内容
	/*
	 * 1、需要知道这个月的最后一天
	 * 2、需要知道这个月的第一天是周几
	 * 3、需要知道上个月的最后一天
	 * 
	 * 
	 * 1、某个月有多少天
	 * 2、某个月的第一天是周几
	 */
	
	//某个月有多少天
	function getEndDay(year,month){
		/*
		 * getMonth取到的是月份，但是它比实际月份对应的数字要小1
		 * 也就是5月对应的值是4
		 * 
		 * 
		 * 这个函数的月份你传的是几，返回的就是几月
		 */
		return new Date(year,month,0).getDate();
	}
	
	
	//某个月的第一天是周几
	function getFirstWeek(year,month){
		//这个函数的月份你传的是几，返回的就是几月
		return new Date(year,month-1,1).getDay();
	}
	
	
	//设置日历的内容
	var d=new Date();
	setCalendar(d);
	function setCalendar(d){
		//console.log(d.getMonth());		//4
		//d.getMonth()取到的值是比实际月份小1 ，所以取上个月就不用再减1了
		var lastEndDay=getEndDay(d.getFullYear(),d.getMonth());		//取上个月最后一天
		var curEndDay=getEndDay(d.getFullYear(),d.getMonth()+1);	//取这个月最后一天
		var week=getFirstWeek(d.getFullYear(),d.getMonth()+1);		//取这个月第一天的星期
		
		var nextDay=1;			//下个月的起始天数
		var str='';				//存的是所有的span标签
		var endNum=week-1;		//上个月占了几个格子
		var curDay=1;			//这个月的起始天数
		
		//如果这个月的第一天是周一的话，就没有上个月的日期了，我们给他补一行
		if(endNum==0){
			endNum=7;
		}
		
		//如果这个月的第一天是周日的话，就会没有上个月的日期，因为endNum的值为-1
		if(endNum<0){
			endNum=6;
		}
		
		for(var i=0;i<42;i++){
			if(i<endNum){
				//这个条件成立了，说明这里面生成的是上个月的日期
				str='<span class="color">'+lastEndDay--+'</span>'+str;
				
				//console.log(str);
			}else if(i>=endNum+curEndDay){
				//这个条件成立了，说明这里面生成的是下个月的日期
				str+='<span class="color">'+nextDay+++'</span>';
			}else{
				//这个条件成立了，说明这里面生成的是这个月的日期
				
				/*var cl=curDay==new Date().getDate()?'active':'';
				
				str+='<span class="'+cl+'">'+curDay+++'</span>';*/
				
				if(new Date().getDate()==curDay && new Date().getMonth()==d.getMonth() && new Date().getFullYear()==d.getFullYear()){
					str+='<span class="active">'+curDay+++'</span>';
				}else{
					str+='<span>'+curDay+++'</span>';
				}
			}
		}
		
		
		number.innerHTML=str;
		strong.innerHTML=d.getFullYear()+'年'+(d.getMonth()+1)+'月';
	};
	
	
	//上个月点击
	btns[0].onclick=function(){
		d.setMonth(d.getMonth()-1);
		setCalendar(d);
	};
	
	//下个月点击
	btns[1].onclick=function(){
		d.setMonth(d.getMonth()+1);
		setCalendar(d);
	};
};