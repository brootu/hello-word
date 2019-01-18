function load(){
	var curPath = decodeURIComponent(window.document.location.href);
	var strs = new Array();
	strs = curPath.split("/");
	subscript = strs.lastIndexOf("CmbcTemYamSet");
	var jobName = strs[subscript-1];
	var tab = document.getElementById("config");
	tab.innerHTML="";
	var curl ="";
	for(var i = subscript-2 ; i<=subscript ; i++){
		 curl += strs[i]+"/";
	}
	curPath = curPath.replace(curl,"");
	var nval = "";
	//jobName赋值
	document.getElementById("templateKey").value=jobName;
	document.getElementById("thisUrl").value=curPath;
	//位标记
	var showNumber = 0; 
	jobyaml.jobYamlValue(jobName,curPath, function(t) {
//	jobyaml.jobYamlValue(jobName,"http://localhost:8080/", function(t) {
		var yamlJson = t.responseJSON;
		var number = 0;
			var tab = document.getElementById("config");
			var show = RegExp(/show/);
			var text = RegExp(/text/);
			var select = RegExp(/select/);
			var detectionSvn = RegExp(/detectionSvn/);
			var area = RegExp(/area/);
			var words = yamlJson.split("；");
			var showTbody = "";
			if(words.length == 1){
				   alert(yamlJson);
				   return false;
			}
//			document.getElementById("jobName").value=words[words.length-1];
			  for(j = 0; j < words.length; j++) {
				  if(show.test(words[j])){
					  shows = words[j].replace("show：","");
//					     导航栏参数拼接
					  nval += shows+","; 
					  var trs=tab.innerHTML;
//					  var tr=trs+'<tr><td width="100%" style="width: 100px !important;display:table-cell"><div><div style="width:100px; margin:-2px auto;font-weight:bold;display:flex"><span">'+shows+'</span></div></div></td></tr>';
//					  if(showNumber === 0){
//						  var tr=trs+'<tbody><tr class="show"><td colspan="4"><div class="section-heade">'+shows+'</div></td></tr>';  
//						  showNumber++;
//					  }else{
//						  var tr=trs+'</tbody><tbody><tr class="show"><td colspan="4"><div class="section-heade">'+shows+'</div></td></tr>';  
//					  }
//					  tab.innerHTML=tr;
					  if(showNumber === 0){
						  var tr = trs+'<tbody><tr class="show"><td colspan="4"><div class="section-heade">'+shows+'</div></td></tr>';
						  showTbody += tr;   
						  showNumber++;
					  }else{
						  showTbody += trs+'</tbody><tbody><tr class="show"><td colspan="4"><div class="section-heade">'+shows+'</div></td></tr>';  
					  }
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
//					  var tr=trs+'<tr id="errId'+j+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">SVN设置</td><td class="setting-main"><input type="hidden" value='+svnValue+' name="_.'+titles+'" /><a href="#" onclick="toSvnSetting(\''+svnValue+'\')">SVN用户名密码设置</a></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';
//					  tab.innerHTML=tr; 
					  showTbody+=trs+'<tr id="errId'+j+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">SVN设置</td><td class="setting-main"><input type="hidden" value='+svnValue+' name="_.'+titles+'" /><a href="#" onclick="toSvnSetting(\''+svnValue+'\')">SVN用户名密码设置</a></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';
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
						  var nameKey = titles.replace(number,"");
//						  alert(nameKey);
						  var tr=trs+'<tr id="errId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+nameKey+'</td><td class="setting-main"><input value="'+value+'" placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+','+number+');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
					  }else{
						  var tr=trs+'<tr id="errId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+nameKey+'</td><td class="setting-main"><input value="'+value+'" placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';  
					  }
//					  tab.innerHTML=tr;
					  showTbody+=tr;
					  number++;
				  }
				  if(area.test(words[j])){
					  var tests = words[j].split("，");
					  var areaValue = tests[tests.length-1];
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
						  if(area.test(tests[t])){
							  //将key区分格式为_  但是与folder明明规则冲突
							  var values = tests[t].split("_");
							  var val = tests[t].replace(values[0],"");
							  var areaKeyAll = val.split(val.substring(5, 6));
							  var areaKey = areaKeyAll[areaKeyAll.length-1];
							  value = areaKey.replace("'","").replace(".xml","");
							  document.getElementById("folder").value=areaKeyAll[areaKeyAll.length-2];
						  }
					  }
					  var trs=tab.innerHTML;
					  if(helps!=null){
						  //获取help图片路径
						  var helpImg=document.getElementById("helpImg").value;
						  var getHelp="'"+helps+"'";
						  var trHepl = '<tr id="helps'+number+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+number+'" class="help" style="display: none;"></div></td><td></td></tr>'
						  var nameKey = titles.replace(number,"");
						  var areaTitles = titles+"area";
						  var areaTr = '<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">Folder内容</td><td><textarea name="_.'+areaTitles+'" rows="5" class="setting-input" style="opacity: 1; height: 358px;">'+areaValue+'</textarea></td></tr>';
						  var tr=trs+'<tr id="errId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+nameKey+'</td><td class="setting-main"><input readonly="readonly" value="'+value+'" placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+','+number+');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl+areaTr;
					  }else{
						  var tr=trs+'<tr id="errId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+nameKey+'</td><td class="setting-main"><input readonly="readonly" value="'+value+'" placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';  
					  }
//					  tab.innerHTML=tr;
					  showTbody+=tr;
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
					  var nameKey = titles.replace(number,"");
					  if(helps!=null){
						  var getHelp="'"+helps+"'";
						  var helpImg=document.getElementById("helpImg").value;
						  var trHepl = '<tr id="helps'+j+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+j+'" class="help" style="display: none;"></div></td><td></td></tr>'
						  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+nameKey+'</td><td class="setting-main"><select name="_.'+titles+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+','+j+');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
					  }else{
						  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+nameKey+'</td><td class="setting-main"><select name="_.'+titles+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-no-help"></td></tr>';
					  }			  
//					  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><select name="_.'+title+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-no-help"></td></tr>';
//					  tab.innerHTML=tr;
					  showTbody+=tr;
					  number++;
				  }
			  }
			  tab.innerHTML=showTbody;
		//设置接收值
//		document.getElementById("yamlValues").value=jobName;
			nval=nval.substring(0,nval.length-1);
			var nvls = nval.split(",");
			var bignav = document.getElementById("nvals");//获取到导航栏id
			//设置提交接受stageName参数
			var stageName = "";
			for(i = 0; i < nvls.length; i++) {
				var trs=bignav.innerHTML;
				if(i == 0){
					var nv = trs+'<div class="box-selected" id='+nvls[i]+' >'+nvls[i]+'</div>';	
				}else{
					var nv = trs+'<div class="box" id='+nvls[i]+' >'+nvls[i]+'</div>';
				}
				stageName += nvls[i]+",";
				bignav.innerHTML=nv;
			}
			document.getElementById("stageName").value=stageName;
		});
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
window.onscroll = function(){
	var navContainer = document.getElementById("nav-container");
	var config = document.getElementById("config");
	var textChild = config.children;
//	var navBox = document.getElementById("nav-box");
	var navBox = document.getElementById("nvals");
	var navBoxChild = navBox.children;
	var a = navContainer.offsetHeight;
	var num = navContainer.offsetTop;
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
  if(scrollTop >= 57){
  	config.style.paddingTop = a +"px";
  	navContainer.style.top = document.getElementById("breadcrumbs").offsetHeight+'px';
  	var nvalWidth = document.getElementById("nval-width");
      navContainer.style.width=nvalWidth.offsetWidth+"px";
      navContainer.style.position = 'fixed';
  }else{
  	navContainer.style.position = 'static';
  	navContainer.removeAttribute("style");
  	config.style.paddingTop = "";
  }
  for(var i=0;i<navBoxChild.length;i++){
      if( scrollTop + a   >= textChild[i].offsetTop){
          for(var j=0;j<navBoxChild.length;j++){
              navBoxChild[j].className = "box";
          }
          navBoxChild[i].className = "box-selected";
     }
  }
//  var navBox = document.getElementById("nvals");
//  if(navBox!=null){
//  	var navBoxChild = navBox.children;
//  	var text = document.getElementById("config");
//  	var textChild = text.children;
//  	var navContainer = document.getElementById("nav-container");
//  	var a = navContainer.offsetHeight;
//  	for(var i=0;i<navBoxChild.length;i++){
//  	  var interval;
//  	  navBoxChild[i].index = i;
//  	  navBoxChild[i].onclick = function(){
//  	      var self = this;
//  	      clearInterval(interval);
//  	      interval = setInterval(function(){
//  	          if(document.documentElement.scrollTop + a<=textChild[self.index].offsetTop){
//  	          	document.documentElement.scrollTop += 40;
//  	              if(document.documentElement.scrollTop + a>=textChild[self.index].offsetTop){
//  	                  document.documentElement.scrollTop = textChild[self.index].offsetTop-a;
//  	                  clearInterval(interval);
//  	              }
//  	          }else{
//  	              document.documentElement.scrollTop /= 1.1;
//  	              if(document.documentElement.scrollTop + a<=textChild[self.index].offsetTop){
//  	                  document.documentElement.scrollTop = textChild[self.index].offsetTop-a;
//  	                  clearInterval(interval);
//  	              }
//  	          }
//  	      },40);
//  	  };
//  	}	
//  }
}
function toSvnSetting(urlKey){
	//url拼接
	window.open('/credentials/store/system/domain/_/credential/'+urlKey+'/update','newwindow','height=700,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
}
