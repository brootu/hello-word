/*            window.onscroll=function(){
//滚动的距离,距离顶部的距离
            	var topScroll = document.documentElement.scrollTop;
            	var top2 = document.documentElement.scrollLeft;
                var bignav = document.getElementById("bignav");//获取到导航栏id
//                if(topScroll > 72){  //当滚动距离大于250px时执行下面的东西
                if(topScroll > 88){
                    bignav.style.position = 'fixed';
//                    bignav.style.top = '26px';
                    bignav.style.top = '0px';
//                    bignav.style.width = '72.3%';
//                    bignav.style.width = '975px';
//                    bignav.style.zIndex = '1';
                }else{//当滚动距离小于250的时候执行下面的内容，也就是让导航栏恢复原状
                    bignav.style.position = 'static';
                }
            }*/
//$(function(){
//	var nav=$(".nav"); //得到导航对象
//	var win=$(window); //得到窗口对象
//	var sc=$(document);//得到document文档对象。
//	win.scroll(function(){
//	  if(sc.scrollTop()>=100){
//	    nav.addClass("fixednav"); 
//	  }else{
//	   nav.removeClass("fixednav");
//	  }
//	})  
//})
            
function stage(stage){
	var stage = document.getElementById(stage);
	stage.style.color="#000";
//	stage.style.z-index="2";
	stage.style.background="#f9f9f9";
	stage.style.fontWeight="bold";
	stage.style.border="1px solid #cccccc";
	stage.style.borderBottom="1px solid #f9f9f9";
	
}
function help(help,indexs){
	  var tr = document.getElementById("helps"+indexs);
	  var divShow = document.getElementById("divShow"+indexs).style.display;
	  if( divShow == "none") {
		  var td = '<td></td><td colspan="2"><div id="divShow'+indexs+'" class="help" style="display: block;block">'+help+'</div></td><td></td>';
	  }else{
		  var td = '<td></td><td colspan="2"><div id="divShow'+indexs+'" class="help" style="display: none;">'+help+'</div></td><td></td>';
	  }
	  tr.innerHTML=td; 
}


window.onload=function (){
	var curPath = decodeURIComponent(window.document.location.href);
	var strs = new Array();
	strs = curPath.split("/");
	subscript = strs.lastIndexOf("CmbcTemYamSet");
	var jobName = strs[subscript-1];
	var tab = document.getElementById("tab");
	tab.innerHTML="";
	var curl ="";
	for(var i = subscript-2 ; i<=subscript ; i++){
		 curl += strs[i]+"/";
	}
	curPath = curPath.replace(curl,"");
	console.log(curPath);
	var nval = "";
	//jobName赋值
	document.getElementById("templateKey").value=jobName;
	document.getElementById("thisUrl").value=curPath;
	//ajax值的获取
	jobyaml.jobYamlValue(jobName,curPath, function(t) {
		debugger;
		var yamlJson = t.responseJSON;
		var number = 0;
			var tab = document.getElementById("tab");
			var show = RegExp(/show/);
			var text = RegExp(/text/);
			var select = RegExp(/select/);
			var detectionSvn = RegExp(/detectionSvn/);
			var words = yamlJson.split("；");
			if(words.length == 1){
				   alert(yamlJson);
			}
//			document.getElementById("jobName").value=words[words.length-1];
			  for(j = 0; j < words.length; j++) {
				  if(show.test(words[j])){
					  shows = words[j].replace("show：","");
//					  nval拼接
					  nval += shows+","; 
					  var trs=tab.innerHTML;
					  var tr=trs+'<tr><td width="100%" style="width: 100px !important;display:table-cell"><div><div style="width:100px; margin:-2px auto;font-weight:bold;display:flex"><span">'+shows+'</span></div></div></td></tr>';
					  tab.innerHTML=tr; 
				  }
				  if(detectionSvn.test(words[j])){
					  var value = new RegExp("value");
					  var title = new RegExp("title");
					  var tests = words[j].split("，");
					  for(t = 0; t < tests.length; t++) {
						  if(value.test(tests[t])){
							  var values = tests[t].split("_");
							  var svnValue = values[1].replace("'","")
						  }
						  if(title.test(tests[t])){
							  var titles = tests[t].replace("title：",number);
						  }
					  }
					  //弹窗标签匹配
					  var trs=tab.innerHTML;
					  var tr=trs+'<tr id="errId'+j+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">SVN设置</td><td class="setting-main"><input type="hidden" value='+svnValue+' name="_.'+titles+'" /><a href="#" onclick="toSvnSetting(\''+svnValue+'\')">SVN用户名密码设置</a></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';
					  tab.innerHTML=tr; 
					  number++;
				  }
				  if(text.test(words[j])){
					  var tests = words[j].split("，");
					  var description = new RegExp("description");
					  var title = new RegExp("title");
					  var help = new RegExp("help");
					  var helps = null;
					  var descriptions =null;
					  var value = "";
					  for(t = 0; t < tests.length; t++) {
						  if(title.test(tests[t])){
							  var titles = tests[t].replace("title：",number);
						  }
						  if(description.test(tests[t])){
							  descriptions = tests[t].replace("description：","");
						  }
						  if(help.test(tests[t])){
							  helps = tests[t].replace("help：","");
						  }
						  if(text.test(tests[t])){
							  var values = tests[t].split("_");
							  value = values[1].replace("'","");
						  }
					  }
					  var trs=tab.innerHTML;
					  if(helps!=null){
						  //获取help图片路径
						  var helpImg=document.getElementById("helpImg").value;
						  var getHelp="'"+helps+"'";
						  var trHepl = '<tr id="helps'+number+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+number+'" class="help" style="display: none;"></div></td><td></td></tr>'
						  var tr=trs+'<tr id="errId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles.replace(number,"")+'</td><td class="setting-main"><input value="'+value+'" placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+','+number+');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
					  }else{
						  var tr=trs+'<tr id="errId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles.replace(number,"")+'</td><td class="setting-main"><input value="'+value+'" placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';  
					  }
					  tab.innerHTML=tr; 
					  number++;
				  }
				  if(select.test(words[j])){
					  var selectSplit = words[j].split("，");
					  var selValue = new RegExp("selValue");
					  var title = new RegExp("title");
					  var select = new RegExp("select");
					  var help = new RegExp("help");
					  var selectValue = "";
					  var selValues=null;
					  var titles=null;
					  var helps=null;
					  for(s = 0; s < selectSplit.length; s++) {
						if(title.test(selectSplit[s])){
						  titles = selectSplit[s].replace("title：",number);
						}
						if(help.test(selectSplit[s])){
						  helps = selectSplit[s].replace("help：","");
						}
						if(selValue.test(selectSplit[s])){
							var  ops = selectSplit[s].split(":");
							for(v = 1; v < ops.length; v++) {
								selValues+='<option '+ops[v]+'rep value="'+ops[v]+'">'+ops[v]+'</option>';
							}
						}
						if(select.test(selectSplit[s])){
							var selValues = selectSplit[s].split("_");
							var selectValue = selValues[1].replace("'","");
						}
					  }
					  if(selectValue!=""){
						  selValues = selValues.replace(selectValue+"rep","selected");
					  }
					  selValues = selValues.replace("null","");
					  var trs=tab.innerHTML;
					  if(helps!=null){
						  var getHelp="'"+helps+"'";
						  var helpImg=document.getElementById("helpImg").value;
						  var trHepl = '<tr id="helps'+j+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+j+'" class="help" style="display: none;"></div></td><td></td></tr>'
						  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><select name="_.'+titles+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+','+j+');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
					  }else{
						  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><select name="_.'+titles+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-no-help"></td></tr>';
					  }			  
//					  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><select name="_.'+title+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-no-help"></td></tr>';
					  tab.innerHTML=tr;
					  number++;
				  }
			  }	
//			  div.appendChild(tab);
//			  div.setAttribute("class", "yamls"); 
//			  border1.appendChild(div);
		//设置接收值
			  debugger
//		document.getElementById("yamlValues").value=jobName;
			nval=nval.substring(0,nval.length-1);
			var nvls = nval.split(",");
			var bignav = document.getElementById("nvals");//获取到导航栏id
			for(i = 0; i < nvls.length; i++) {
				var trs=bignav.innerHTML;
//				(\''+jobNames[i]+'\')
				var nv = trs+'<div class="box" id='+nvls[i]+' >'+nvls[i]+'</div>';
//				onclick="stage(\''+nvls[i]+'\')"
				bignav.innerHTML=nv;
			}
		});
}



function toSvnSetting(urlKey){
//	alert(urlKey)
	//url拼接
//	http://localhost:8080/credentials/store/system/domain/_/credential/6c8349cc7260ae62e3b1396831a8398f/
//	http://localhost:8080/credentials/store/system/domain/_/credential/d5ee2eedfcf7adc285db4967bd86910d/update
	window.open('/credentials/store/system/domain/_/credential/'+urlKey+'/update','newwindow','height=700,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
//	location.assign('http://www.baidu.com');
}
//跟随导航
var navContainer = document.getElementById("nav-container");
//var navBox = document.getElementById("nav-box");
var navBox = document.getElementById("nvals");
var text = document.getElementById("text");
var navBoxChild = navBox.children;
var textChild = text.children;
var num = navContainer.offsetTop;
//导航栏高度
var head = document.getElementById("page-head").offsetHeight;
var a = navContainer.offsetHeight;
window.onscroll = function(){
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if(scrollTop >= navContainer.offsetLeft+head){
//    	debugger
        navContainer.className = "nav fixed";
        text.style.paddingTop = a +"px";
    }else{
        navContainer.className = "nav";
        text.style.paddingTop = "";
    }
    //当导航与相应文档接触的时候自动切换
    //method1
    for(var i=0;i<navBoxChild.length;i++){
        if( scrollTop + a >= textChild[i].offsetTop){
            for(var j=0;j<navBoxChild.length;j++){
                navBoxChild[j].className = "";
            }
            navBoxChild[i].className = "cur";
       }
    }
};
for(var i=0;i<navBoxChild.length;i++){
    var interval;
    navBoxChild[i].index = i;
    navBoxChild[i].onclick = function(){
        var self = this;
        clearInterval(interval);
        interval = setInterval(function(){
            if(document.body.scrollTop + a<=textChild[self.index].offsetTop){
                document.body.scrollTop += 40;
                if(document.body.scrollTop + a>=textChild[self.index].offsetTop){
                    document.body.scrollTop = textChild[self.index].offsetTop-a;
                    clearInterval(interval);
                }
            }else{
                document.body.scrollTop /= 1.1;
                if(document.body.scrollTop + a<=textChild[self.index].offsetTop){
                    document.body.scrollTop = textChild[self.index].offsetTop-a;
                    clearInterval(interval);
                }
            }
        },40);
    };
}