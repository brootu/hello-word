var stageFlag = true;
function toDown(){
	var a = document.getElementById("border1");
	if(a.style.webkitTransform!=""){
		var cont = a.style.webkitTransform;
		if(cont === "translateY(0%)"){
			alert("已是第一步，请勿再次点击！")
			return false;	
		}
		cont = parseInt(cont.replace("translateY(","").replace("%)",""))+50;
		cont = "translateY("+cont+"%)";
		a.style.webkitTransform=cont;	
		a.style.transform=cont;
		return false;
	}
	a.style.webkitTransform="translateY(-50%)";
	a.style.transform="translateY(-50%)";
}
function toUp(){
	var a = document.getElementById("border1");
		if(a.style.webkitTransform!=""){
			var cont = a.style.webkitTransform;
			cont = parseInt(cont.replace(/[^0-9]/ig,""))+50;
			var endSubmit = document.getElementById("endSubmit").value;
			var endNumber = endSubmit*50+50;
			if(cont <= endNumber){
				cont = "translateY(-"+cont+"%)";
				a.style.webkitTransform=cont;	
				a.style.transform=cont;
				return false;
			}else{
				alert("我是有底线滴...")
				return false;
			}
		}
		a.style.webkitTransform="translateY(-50%)";
		a.style.transform="translateY(-50%)";
}
//选择类别显示当前类别Job
function getTemplateType(templateType){
	//设置单选
	var currentYamls = document.getElementById("typeListName");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes ;
	for(var i=0;i<labelAllid.length;i++){
    	var color = labelAllid[i].style.backgroundColor;
    	if(color!=""){
    		color = "1";
    		nodes = labelAllid[i];
    		break;
    	}
    }
    if(color!=""){
    	nodes.style.backgroundColor = "";
    	document.getElementById(templateType).style.backgroundColor = "#66cccc";
    }else{
    	document.getElementById(templateType).style.backgroundColor = "#66cccc";
    }
    //ajax请求数据回显
	  getAllJobName.allJobName(templateType,function(t) {
		  	allJobName = t.responseJSON;
	    	//组装数据
		  	var jobNameDiv = "";
//		  	var jobNames = allJobName.split(",");
		  	for ( var key in allJobName) {
				value = allJobName[key];
				jobNameDiv+='<div class="listJob" id="'+key+'job" onclick="getTemplateName(\''+key+'\')">'+value+'</div>';
			}
//		  	for(i = 0; i < jobNames.length; i++) {
//		  		jobNameDiv+='<div class="listJob" id="'+jobNames[i]+'job" onclick="getTemplateName(\''+jobNames[i]+'\')">'+jobNames[i]+'</div>';
//		  	}
		  	var jobNamesDiv = document.getElementById("jobListName");
		  	jobNamesDiv.innerHTML=jobNameDiv;
		  	document.getElementById("getTemplateName").hidden = false;
		  	document.getElementById("st2").hidden = false;
	    });
}
//stageBegin
function getTemplateName(jobName){
	//对类别设置进行修改
	if(document.getElementById("templateType").style.backgroundColor!=""){
		document.getElementById("templateType").style.backgroundColor="";
	}
	//设置单选
	var currentYamls = document.getElementById("jobListName");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes ;
	for(var i=0;i<labelAllid.length;i++){
    	var color = labelAllid[i].style.backgroundColor;
    	if(color!=""){
    		color = "1";
    		nodes = labelAllid[i];
    		break;
    	}
    }
    if(color!=""){
    	nodes.style.backgroundColor = "";
    	document.getElementById(jobName+"job").style.backgroundColor = "#66cccc";
    }else{
    	document.getElementById(jobName+"job").style.backgroundColor = "#66cccc";
    }
	getAllYamls.allYamls(jobName,function(t) {
		var yamlJson = t.responseJSON;
		var count = 0;
		var nval = "";
		var arr = document.getElementsByClassName("yamls");
		if(arr.length>0){
			var arrLength = arr.length
			for(var i=0;i<arrLength;i++){
				document.getElementById("border1").removeChild(arr[0]);
			}
		}
		var number = 0;
		var stageMarks = "";
		for(var p in yamlJson){
			stageMarks += p+",";
			number++;
			nval += '<div class="nval1" id="stages'+count+'" onclick="stages('+count+')" >'+p.replace('Stage'+number,'')+'</div>';
			count++;
			var border1 = document.getElementById("border1");
			var div = document.createElement('div');
			div.style.height="400px";
			var tab = document.createElement('table');
			var words = yamlJson[p].split("；");
			//JobName追加   
			 //获取匹配
			var tab = yamlMarch(words,number,count);
			  div.appendChild(tab);
			  div.setAttribute("class", "yamls");
			  div.setAttribute("id", "stage"+number);
			  border1.appendChild(div);
		}
		document.getElementById("stageMarks").value=stageMarks;
		document.getElementById("endSubmit").value=count;
		toUp();
//		nval += '<div class="submit" onclick="submitTemplate()" ><span id="sub">提交</span></div>';
		document.getElementById("nval").innerHTML=nval;
		if(document.getElementById("sub")==null){
			var duvAll = document.getElementById("divNval").innerHTML;
			duvAll += '<div class="submit" onclick="submitTemplate()" ><span id="sub">提交</span></div>';
			document.getElementById("divNval").innerHTML=duvAll;
		}
		//设置接收值
		document.getElementById("yamlValues").value=jobName;
		//默认高亮
		var currentYamls = document.getElementById("nval");
		var labelAllid = currentYamls.getElementsByTagName("div");
		labelAllid[0].style.backgroundColor = "#66cccc";
	});
}
//获取json对象长度
function getJsonLength(jsonData) {
	var length = 0;
	for(var ever in jsonData) {
	    length++;
	}
	return length;
	}
function help(help,indexs){
	  var tr = document.getElementById(indexs);
	  var divShow = document.getElementById("divShow"+indexs).style.display;
	  if( divShow == "none") {
		  var td = '<td></td><td colspan="2"><div id="divShow'+indexs+'" class="help" style="display: block;block">'+help+'</div></td><td></td>';
	  }else{
		  var td = '<td></td><td colspan="2"><div id="divShow'+indexs+'" class="help" style="display: none;">'+help+'</div></td><td></td>';
	  }
	  tr.innerHTML=td; 
}
//第一步跳转
function stage1(stage){
	if(stage===1){
		var a = document.getElementById("border1");
		a.style.webkitTransform="translateY(0%)";
	}else{
		var a = document.getElementById("border1");
		a.style.webkitTransform="translateY(-50%)";		
	}
}
//第n步跳转
function stages(stage){
	if(stageFlag){
		var currentYamls = document.getElementById("nval");
		var labelAllid = currentYamls.getElementsByTagName("div");
		var color = "";
		var nodes ;
		var border1 = document.getElementById("border1");
		var willStage = document.getElementById("stages"+stage);
		var stagePosition ;
	    for(var i=0;i<labelAllid.length;i++){
	    	var color = labelAllid[i].style.backgroundColor;
	    	if(color!=""){
	    		color = "1";
	    		nodes = labelAllid[i];
	    		break;
	    	}
	    }
	    var div = document.getElementsByClassName("yamls");
	    var stagetoTop = document.getElementById("stage"+(stage+1))
	    if(stage!=-1){
		    for(var i=0;i<div.length;i++){
		    	if(stagetoTop == div[i]){
		    		var count = (i+1)*50;
		    		break;
		    	}
		    }
	    }else{
	    	var count = 0;
	    }
	    border1.style.webkitTransform="translateY(-"+count+"%)";
		    if(document.getElementById("stages"+stage) == labelAllid[labelAllid.length-1]){
		    	if(stage!="-1"){
		    		setTimeout(function(){ document.getElementById("myBtn").hidden=false; }, 1000);
		    	}
		    }else{
		    	document.getElementById("myBtn").hidden=true;
		    }
	    if(color!=""){
	    	nodes.style.backgroundColor = "";
	    	if(count==0){
				document.getElementById("templateType").style.backgroundColor = "#66cccc";
			}else{
				document.getElementById("stages"+stage).style.backgroundColor = "#66cccc";
			}
	    }else{
	    	document.getElementById("stages"+stage).style.backgroundColor = "#66cccc";
	    	if(document.getElementById("templateType").style.backgroundColor!=""){
				document.getElementById("templateType").style.backgroundColor = "";		
			}
	    }
	}else{
		alert("请填写配置参数！")
	}
}
//按键事件
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==40){
//    	var next = document.getElementById("stageDown").hidden;
//    	if(!next){
//    		toUp();
//    	}
      }
    if(e && e.keyCode==38){
//    	var next = document.getElementById("stageUp").hidden;
//    	if(!next){
    		toDown();
//    	}
      }
}; 

//TODO 下滑线不支持校验因为在config回显时是根据下划线匹配
function verification(){
	var errGif=document.getElementById("errGif").value;
	var jobName = document.getElementById("yamlValues").value;
	var resURL = document.getElementById("resURL").value;
	var curPath = decodeURIComponent(window.document.location.href);
	//线校验非空，之后校验下划线，最后校验重复
	var regex=/_/ig;
	var userJobName = document.getElementById("ersJobName").value;
	var formatMs = new RegExp("系统名称格式错误：不可存在_");
	if(regex.test(userJobName)){
		var jobNameParent = document.getElementById("ersJobName").parentNode;
		var trs=jobNameParent.innerHTML;
		if(formatMs.test(trs)){
			return false;
		}
		var tr=trs+'<div class="error" id="formatJobName"><img src="'+errGif+'" height="16" width="1">系统名称格式错误：不可存在_</div>';
		jobNameParent.innerHTML=tr;
		document.getElementById("ersJobName").value=userJobName;
		document.getElementById("ersJobName").focus();
		stageFlag = false;	
//		return false;
	}else{
		var jobNameParent = document.getElementById("ersJobName").parentNode;
		var trs=jobNameParent.innerHTML;
		if(formatMs.test(trs)){
			document.getElementById("formatJobName").remove();
		}
	}
	checkJobName.getJobAllName(jobName,curPath, function(t) {
		var jobName = document.getElementById("ersJobName").value.replace(/\s*/g,"");
		//尝试设置值
		var errMs = new RegExp("系统名称已存在");
		var nullMs = new RegExp("系统名称不可为空");
		if(jobName!=null && jobName!=""){
			var allJobName = t.responseObject().split(",");
			var jobNames = allJobName[allJobName.length-1]+jobName;
			for(i = 0; i < allJobName.length-1; i++) {
				if(allJobName[i] == jobNames){
					var jobNameParent = document.getElementById("ersJobName").parentNode;
					var trs=jobNameParent.innerHTML;
					if(errMs.test(trs)){
						return false;
					}
					var tr=trs+'<div class="error" id="ErrJobName"><img src="'+errGif+'" height="16" width="1">系统名称已存在</div>';
					jobNameParent.innerHTML=tr;
					var errMs = new RegExp("Please input parameters");
					if(errMs.test(trs)){
						document.getElementById("ErrJobName").previousSibling.remove();
					}					
					document.getElementById("ersJobName").value=jobName;
					//禁用下一步，鼠标指针指回
					document.getElementById("ersJobName").focus();
//					var ErrJobName = document.getElementById("ErrJobName");
//					if(ErrJobName!=null){
//						ErrJobName.remove();
//					}
					stageFlag = false;		
					return false;
					}
				}
			var jobNameParent = document.getElementById("ersJobName").parentNode;
			var trs=jobNameParent.innerHTML;
			var ErrJobName = document.getElementById("ErrJobName");
			if(ErrJobName!=null){
				ErrJobName.remove();
			}
			var nullName = document.getElementById("NullJobName");
			if(nullName!=null){
				nullName.remove();
			}
			stageFlag = true;
//			document.getElementById("stageDown").hidden = false;
		}else{
			var jobNameParent = document.getElementById("ersJobName").parentNode;
			var trs=jobNameParent.innerHTML;
			if(nullMs.test(trs)){
				return false;
			}
			var tr=trs+'<div class="error" id="NullJobName"><img src="'+errGif+'" height="16" width="1">系统名称不可为空</div>';
			jobNameParent.innerHTML=tr;
			var errMs = new RegExp("Please input parameters");
			if(errMs.test(trs)){
				document.getElementById("NullJobName").previousSibling.remove();
			}					
			document.getElementById("ersJobName").value=jobName;
			document.getElementById("ersJobName").focus();
			stageFlag = false;			
			return false;
		}
	});
}
//按键提示
//document.onkeydown=function(event){
//    var event=event||window.event;
//    alert(event.keyCode);
//}
//非空校验
//function check(obj){
//	var flag = 0 ;
//	var errGif=document.getElementById("errGif").value;
//	var subSetId=document.getElementById("myBtn");
//	var errMs = new RegExp("Please input parameters");
//	if(subSetId != null){
//		subSetId.id="";
//		subSetId.value="submit";
//	}
//	for(var i of obj){
//		if(i.value!="-1"){
//			if(i.value==""||i.value==null){
//				flag++;
//				if(i.id == "" || i.id == null ){
//				}else{
//					//校验错误消息是否存在
//					if(i.id=="jobNames"){
//						var inputId = document.getElementById(i.id).parentNode;
//						var inputMes = inputId.innerHTML;
//						if(errMs.test(inputMes)){
//							continue;
//						}
//						var tr = inputMes+'<div class="error"><img src="'+errGif+'" height="16" width="1">Please input parameters</div>';
//						inputId.innerHTML=tr;	
//						continue;
//					}
//					var inputId = document.getElementById(i.id).parentNode;
//					var inputMes = inputId.innerHTML;
//					if(errMs.test(inputMes)){
//						continue;
//					}
//					var tr = inputMes+'<div class="error"><img src="'+errGif+'" height="16" width="1">Please input parameters</div>';
//					inputId.innerHTML=tr;
//				}
//			}
//			if(i.value!=""&&i.value!=null){
//				if(i.id != "devTypeId" && i.id != null & i.id!=""){
//					var inputId = document.getElementById(i.id).parentNode;
//					var iValue = document.getElementById(i.id).value;
//					var inputMes = inputId.innerHTML;
//					if(errMs.test(inputMes)){
//					inputMes = inputMes.replace('<div class="error"><img src="'+errGif+'" height="16" width="1">Please input parameters</div>',"");
//					inputId.innerHTML=inputMes;
//					document.getElementById(i.id).value=iValue;
//					}
//				}
//			}
//		}else{
//			alert("请选择类别！")
//			return false;
//		}
//	}
//	var jobNameParent = document.getElementById("jobNames").parentNode;
//	var trs=jobNameParent.innerHTML;
//	var errMsJob = new RegExp("系统名称已存在");
//	if(errMsJob.test(trs)){
//		alert("系统名称已存在！!")
//		return false;
//	}
//	if(flag== 0 ){
//		return true;
//	}else{
//		alert("请检查参数!")
//		return false;
//	}
//}
//文本域校验
function verificationTextare(textId){
	var textName = document.getElementById("area"+textId).value;
	//获取当前路径值
	var curPath = decodeURIComponent(window.document.location.href);
	curPath = curPath.replace("/CmbcTemplate/","");
	if(curPath.substr(-1) == "#"){
		curPath = curPath.replace("#","");
	}
	curPath = curPath.split("/");
		findTextareaName.getTextareaName(textName,curPath[curPath.length-1], function(t) {
			debugger
		var textareUrl = t.responseJSON;
		if(textareUrl!=null){
			var trErrId = document.getElementById("tr"+textId);
			if(trErrId!=null){
				trErrId.remove();
			}
			if(document.getElementById("true"+textId)!=null){
				document.getElementById("true"+textId).remove();
			}
			var textareParent = document.getElementById("textareaId"+textId).parentNode;
			var trs=textareParent.innerHTML;
			var textareNew = trs+'<tr id="true'+textId+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name"></td><td><a href="#" onclick="toAreaSetting(\'area'+textId+'\',true)">编辑</a></td></tr>';
			textareParent.innerHTML = textareNew;
			document.getElementById("area"+textId).value=textName;
			stageFlag = true;
			document.getElementById("area"+textId).focus();
		}else{
			var textareaId = "tr"+textId;
			if(document.getElementById(textareaId)==null){
				if(document.getElementById("true"+textId)!=null){
					document.getElementById("true"+textId).remove();
				}
				var textareParent = document.getElementById("textareaId"+textId).parentNode;
				var trs=textareParent.innerHTML;
				var textareNew = trs+'<tr id="tr'+textId+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name"></td><td><a href="#" onclick="toAreaSetting(\'area'+textId+'\',false)">创建</a></td></tr>';
				textareParent.innerHTML = textareNew;
				document.getElementById("area"+textId).value=textName;
			}
			stageFlag = false;
			document.getElementById("area"+textId).focus();
		}		
	});
}
function verNewTextarea(textareaId){
	if(textareaId.value!=null){
		stageFlag = true;
		var boxArr = new Array();
		var parentTextareaId = textareaId.parentNode.previousElementSibling;
		parentTextareaId.style.color="";
	}
	//TODO  此处缺少非空校验
//	else{
//		stageFlag = false;
//		var boxArr = new Array();
//		var parentTextareaId = textareaId.parentNode.previousElementSibling;
//		parentTextareaId.style.color="red";		
//	}
}
window.onload = function(){
	document.getElementById("close").onclick=function(){close()};
	document.getElementById("close2").onclick=function(){close()};
	document.getElementById("stageUp").onclick=function(){addStages()};
	document.getElementById("stageDown").onclick=function(){removeStages()};
	
}
//增加步骤
function addStages(){
	var currentYamls = document.getElementById("nval");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes ;
	var numbers = "0";
    for(var i=0;i<labelAllid.length;i++){
    	var color = labelAllid[i].style.backgroundColor;
    	numbers++;
    	if(color!=""){
    		color = "1";
    		nodes = labelAllid[i];
    		break;
    	}
    }
    var yamlKey = nodes.innerHTML.replace(/[0-9]/g,'');
    getYaml.getYamlValue(yamlKey,function(t) {
    	var yamlValyue = t.responseJSON;
		var currentYamls = document.getElementById("nval");
		var labelAllid = currentYamls.getElementsByTagName("div");
		var words = yamlValyue.split("；");
    	var tab = yamlMarch(words,(labelAllid.length+1),2);
    	var tabs = tab.innerHTML;
    	var addStage = '<div class="yamls" id="stage'+(labelAllid.length+1)+'"><table>'+tabs+"</table></div>";
    	var stages = document.getElementById("stage"+numbers);
    	stages.insertAdjacentHTML("afterEnd",addStage);
		//导航栏追加
//		var parNval = document.getElementById("stages"+(numbers-1));
//		parNval.insertAdjacentHTML("afterEnd",'<div class="nval1" id="stages'+(labelAllid.length)+'" onclick="stages('+labelAllid.length+')" >'+yamlKey+'</div>');
		//修改导航栏追加
    	//TODO
//		var parNval = document.getElementById("stages"+(numbers-1));
    	nodes.insertAdjacentHTML("afterEnd",'<div class="nval1" id="stages'+(labelAllid.length)+'" onclick="stages('+labelAllid.length+')" >'+yamlKey+'</div>');		
//	    document.getElementById("stages"+numbers).click();
    });
}
//减少步骤
function removeStages(){
	//get 当前位置参数
	var currentYamls = document.getElementById("nval");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes ;
	var numbers;
	var brother; 
    for(var i=0;i<labelAllid.length;i++){
    	var color = labelAllid[i].style.backgroundColor;
    	if(color!=""){
    		var num = new Number(labelAllid[i].id.replace("stages",""));
    		numbers = num+1;
    		nodes = labelAllid[i];
    		if(labelAllid.length-1 == i){
    			brother = labelAllid[i-1];
    		}else{
    			brother = labelAllid[i+1];
    		}
    		break;
    	}
    }
    document.getElementById("stage"+numbers).remove();
    nodes.remove();
    document.getElementById(brother.id).click();
//    if(labelAllid.length == (numbers-1)){
//    	document.getElementById("stages"+(numbers-2)).click();
//    }else{
//    	document.getElementById("stages"+numbers).click();
//    }
}
function moveUp(){
	var currentYamls = document.getElementById("nval");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes ;
	var brother;
	var node;
    for(var i=0;i<labelAllid.length;i++){
    	var color = labelAllid[i].style.backgroundColor;
    	if(color!=""){
    		color = "1";
    		nodes = labelAllid[i];
    		brother = labelAllid[i-1];
    		node = labelAllid[i].id.replace("stages","");
    		moveDiv(nodes.id,brother.id);
    		break;
    	}
    }
    if(color!=""){
    	var nodesValue=nodes.outerText;
    	if(brother!=undefined){
    	}
    }else{
    	alert("请选择Yaml")
    	return false;
    }
	var arr = document.getElementsByClassName("yamls");
	var stageNumber = new Number(node) + 1;
	var stageNode = document.getElementById("stage"+stageNumber);
	for(var i=0;i<arr.length;i++){
    	if(stageNode == arr[i]){
    		moveDiv(arr[i].id,arr[i-1].id);
    		break;
    	}
    }
}
function moveDiv(id_1,id_2)  //参数传递的是你需要交换位置的两个div的ID
{
    var insert = function(nodeInsert,nodeTo){
        if(nodeInsert.insertAdjacentElement)
        {
            nodeTo.insertAdjacentElement('beforeBegin',nodeInsert);
        }
        else
        {
            nodeTo.parentNode.insertBefore(nodeInsert,nodeTo);
        }
    }
    var obj= document.createElement("a");
	obj.id="testObjId";
    var t1 = document.getElementById(id_1);
    var t2 = document.getElementById(id_2);
    insert(obj,t2);
    insert(t2,t1);
    insert(t1,obj);
    document.getElementById("testObjId").remove();
}

//判断下移至最后两步
/*function getSubmitPosition(){
	var currentYamls = document.getElementById("nval");
	var labelAllid = currentYamls.getElementsByTagName("div");
    for(var i=0;i<labelAllid.length;i++){
    	if(labelAllid[i].style.backgroundColor!=""){
    		if(i==labelAllid.length-2){
    			return false;
    		}
    		break;
    	}
    }
    return true;
}*/
function moveDown(){
	var node;
	var currentYamls = document.getElementById("nval");
	var labelAllid = currentYamls.getElementsByTagName("div");
	for(var i=0;i<labelAllid.length;i++){
    	if(labelAllid[i].style.backgroundColor!=""){
    		node = labelAllid[i].id.replace("stages","");
    		moveDiv(labelAllid[i+1].id,labelAllid[i].id);
    		break;
    	}
    }
	var arr = document.getElementsByClassName("yamls");
	var stageNumber = new Number(node) + 1;
	var stageNode = document.getElementById("stage"+stageNumber);
	for(var i=0;i<arr.length;i++){
    	if(stageNode == arr[i]){
    		moveDiv(arr[i+1].id,arr[i].id);
    		break;
    	}
    }
}
function yamlMarch(words,number,count){
	var tab = document.createElement('table');
	var show = RegExp(/show/);
	var text = RegExp(/text/);
	var select = RegExp(/select/);
	var svn = RegExp(/detectionSvn/);
	var area = RegExp(/area/);
	if(count == 1){
		var helpImg=document.getElementById("helpImg").value;
//		var showJobName = '<tr><td width="100%" style="width: 100px !important;display:table-cell"><div><div style="width:100px; margin:-2px auto;font-weight:bold;display:flex"><span>流水线名称</span></div></div></td></tr>'; 
		var jobNameHelp = '<tr id="helpsJobName" class="help-area"><td></td><td colspan="2"><div id="divShowJobName" class="help" style="display: none;"></div></td><td></td></tr>';
		var jobHepl = '<tr id="helpsJobName" class="help-area"><td></td><td colspan="2"><div id="divShowJobName" class="help" style="display: none;"></div></td><td></td></tr>';
		var jobClick = "'系统名称后缀','JobName'";
		var jobNames = '<tr id="errIdJobName"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">流水线名称</td><td class="setting-main"><input placeholder="请输入流水线名称或应用模块名称(使用英文)" onchange="verification()"  name="_.jobName" type="text" class="setting-input" id="ersJobName"></td><td class="setting-help"></td><td class="setting-no-help"></td></tr>'+jobNameHelp+jobHepl ;
		tab.innerHTML=jobNames;
	}
	 for(j = 0; j < words.length; j++) {
//		  if(show.test(words[j])){
//			  shows = words[j].replace("show：","");
//			  var trs=tab.innerHTML;
//			  var tr=trs+'<tr><td width="100%" style="width: 100px !important;display:table-cell"><div><div style="width:100px; margin:-2px auto;font-weight:bold;display:flex"><span>'+shows+'</span></div></div></td></tr>';
//			  tab.innerHTML=tr; 
//		  }
		  if(svn.test(words[j])){
			  var tests = words[j].split("，");
			  var description = new RegExp("description");
			  var title = new RegExp("title");
			  var help = new RegExp("help");
			  var helps = null;
			  var descriptions =null;
			  for(t = 0; t < tests.length; t++) {
				  if(title.test(tests[t])){
					  var titles = tests[t].replace("title：",number);
					  var svnName = tests[t].replace("title：","");; 
				  }
				  if(description.test(tests[t])){
					  descriptions = tests[t].replace("description：","");
				  }
				  if(help.test(tests[t])){
					  helps = tests[t].replace("help：","");
				  }
			  }
			  var trs=tab.innerHTML;
			  if(helps!=null){
				  //获取help图片路径
				  var helpImg=document.getElementById("helpImg").value;
				  var getHelp="'"+helps+"'";
				  var trHepl = '<tr id="'+titles+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+titles+'" class="help" style="display: none;"></div></td><td></td></tr>'
				  var tr=trs+'<tr id="errId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+svnName+'账号</td><td class="setting-main"><input placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+',\''+titles+'\');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr><tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+svnName+'密码</td><td><input class="setting-input" type="password" name="_.'+number+'pwd"/></tr>'+trHepl;
			  }else{
				  var tr=trs+'<tr id="errId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+svnName+'账号</td><td class="setting-main"><input placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td>'+svnName+'密码</td><td><input type="password" name=name="_.'+titles+'"/><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';  
			  }
			  tab.innerHTML=tr; 
		  }
		  if(text.test(words[j])){
			  var tests = words[j].split("，");
			  var description = new RegExp("description");
			  var title = new RegExp("title");
			  var help = new RegExp("help");
			  var helps = null;
			  var descriptions =null;
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
			  }
			  var trs=tab.innerHTML;
			  if(helps!=null){
				  //获取help图片路径
				  var helpImg=document.getElementById("helpImg").value;
				  var getHelp="'"+helps+"'";
				  var trHepl = '<tr id="'+titles+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+titles+'" class="help" style="display: none;"></div></td><td></td></tr>'
				  var tr=trs+'<tr id="errId'+titles+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles.replace(number,"")+'</td><td class="setting-main"><input placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+titles+'"></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+',\''+titles+'\');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
			  }else{
				  var tr=trs+'<tr id="errId'+titles+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles.replace(number,"")+'</td><td class="setting-main"><input placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+titles+'"></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';  
			  }
			  tab.innerHTML=tr; 
		  }
		  if(area.test(words[j])){
			  var tests = words[j].split("，");
			  var description = new RegExp("description");
			  var title = new RegExp("title");
			  var help = new RegExp("help");
			  var helps = null;
			  var descriptions =null;
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
			  }
			  var trs=tab.innerHTML;
			  if(helps!=null){
				  //获取help图片路径
				  var helpImg=document.getElementById("helpImg").value;
				  var getHelp="'"+helps+"'";
//				  var trHepl = '<tr id="helps'+number+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+number+'" class="help" style="display: none;"></div></td><td></td></tr>'
				  var trHepl = '<tr id="'+titles+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+titles+'" class="help" style="display: none;"></div></td><td></td></tr>'
				  var tr=trs+'<tr id="textareaId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles.replace(number,"")+'</td><td class="setting-main"><input oninput="verificationTextare('+number+')" id="area'+number+'" placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+',\''+titles+'\');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
			  }else{
				  var tr=trs+'<tr id="textareaId'+number+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles.replace(number,"")+'</td><td class="setting-main"><input oninput="verificationTextare('+number+')" placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+number+'"></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';  
			  }
			  tab.innerHTML=tr;
		  }
		  if(select.test(words[j])){
			  var selectSplit = words[j].split("，");
			  var selValue = new RegExp("selValue");
			  var title = new RegExp("title");
			  var help = new RegExp("help");
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
						selValues+='<option value="'+ops[v]+'">'+ops[v]+'</option>';
					}
				}
			  }
			  selValues = selValues.replace("null","");
			  var trs=tab.innerHTML;
			  if(helps!=null){
				  var getHelp="'"+helps+"'";
				  var helpImg=document.getElementById("helpImg").value;
				  var trHepl = '<tr id="'+titles+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+titles+'" class="help" style="display: none;"></div></td><td></td></tr>'
				  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles.replace(number,"")+'</td><td class="setting-main"><select name="_.'+titles+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+',\''+titles+'\');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
			  }else{
				  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles.replace(number,"")+'</td><td class="setting-main"><select name="_.'+titles+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-no-help"></td></tr>';
			  }			  
			  tab.innerHTML=tr;
		  }
	  }
	 return tab;
}
function submitTemplate(){
	//组装数据
	var msg = "点击确认提交";
    if (confirm(msg)==true){
    	var currentYamls = document.getElementById("nval");
    	var labelAllid = currentYamls.getElementsByTagName("div");
    	var stageValue = "";
    	var stageKey = "";
        for(var i=0;i<labelAllid.length;i++){
        	stageValue += labelAllid[i].id.replace("stages","")+",";
        	stageKey += labelAllid[i].outerText+",";
        	if(labelAllid[i].style.backgroundColor!=""){
        		labelAllid[i].style.backgroundColor = "";
        	}
        }
        document.getElementById("stageValue").value=stageValue;
        document.getElementById("stageKey").value=stageKey.replace("提交,","");
        document.getElementById("sub").innerHTML="正在提交";
    	var sub = document.getElementById("templateSubmit"); 
    	sub.submit();
    	sub.disable=true;
    	stageFlag = false;
    }else{
    	return false;
    }
}
function toAreaSetting(folderKey,flag){
	document.getElementById('overlay').style.display = 'block';
	document.getElementById('win').style.display = 'block';
	document.getElementById('textarea').style.display = 'block';
	document.getElementById('title').innerHTML=document.getElementById(folderKey).value;
	document.getElementById('title').style.display = 'block';
	document.getElementById('close').style.display = 'block';
	document.getElementById('folderKey').value = document.getElementById(folderKey).value;
	var url = decodeURIComponent(window.document.location.href).split("area")[0];
	url = url.replace("/CmbcTemplate/","").replace("#","");
	url = url.split("/");
	document.getElementById('curl').value = url[url.length-1];
	if(flag){
		//存在获取参数
		getTextareaValue.getTextareaValue(document.getElementById(folderKey).value,url[url.length-1], function(t) {
			var textareValue = t.responseJSON;
			if(textareValue!=null){
				document.getElementById("area").value=textareValue;
			}else{
				document.getElementById("area").value="";
			}
		});
	}else{
		document.getElementById("area").value="";
	}
	//加入参数获取？
//	window.open('area?folderKey='+document.getElementById(folderKey).value+'','newwindow','height=700,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
//	stageFlag = true;
}
function close(){
	document.getElementById('overlay').style.display = 'none';
	document.getElementById('win').style.display = 'none';
	document.getElementById('textarea').style.display = 'none';
	document.getElementById('title').style.display = 'none';
	document.getElementById('close').style.display = 'none';
	stageFlag = true;
}
function submitFolder(){
//	alert("保存成功！");
	var url = document.getElementById("curl").value;
	var folderKey = document.getElementById("folderKey").value;
	var folderValue = document.getElementById("area").value;
	areaSetting.areaSetting(url,folderKey,folderValue, function(t) {
		var textareValue = t.responseJSON;
		if(textareValue!=null){
			alert("保存成功！");
			close();			
		}else{
			alert("参数异常！请稍后再试或联系管理员");
		}
	});
}
document.onkeydown=function(evt){
	 if (evt.keyCode == 9) {
        if (evt.preventDefault) {
        	evt.preventDefault(); 
        }
	 }
}
//新增stage
function addStage(){
//	如何实现：1获取当前选中stage位置  2ajax请求获取所有可选stage 3将选中的信息返回并关闭此div弹窗
	document.getElementById('overlay').style.display = 'block';
	document.getElementById('addStage').style.display = 'block';
	document.getElementById('addStageBody').style.display = 'block';
	document.getElementById('addStageTitle').innerHTML="AddStage";
	document.getElementById('addStageTitle').style.display = 'block';
	document.getElementById('addStageClose').style.display = 'block';
		//存在获取参数
		getAllYaml.allYaml(function(t) {
			var yamlJson = t.responseJSON;
			var endCount = eval(getJsonLength(yamlJson));
			var addStageBody = document.getElementById('addStageBody');
			var div ="<br />" ;
			for(var p in yamlJson){
				div += '<div onclick="addStageYaml(\''+p+'\')" class="addstage">'+p+'</div>';
			}
			addStageBody.innerHTML=div;
		});
}
function addStageYaml(yamlKey){
	addStageClose();
	var currentYamls = document.getElementById("nval");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes ;
	var numbers = "0";
    for(var i=0;i<labelAllid.length;i++){
    	var color = labelAllid[i].style.backgroundColor;
    	numbers++;
    	if(color!=""){
    		color = "1";
    		nodes = labelAllid[i];
    		break;
    	}
    }
//    var yamlKey = nodes.innerHTML.replace(/[0-9]/g,'');
    getYaml.getYamlValue(yamlKey,function(t) {
    	var yamlValyue = t.responseJSON;
		var currentYamls = document.getElementById("nval");
		var labelAllid = currentYamls.getElementsByTagName("div");
		var words = yamlValyue.split("；");
    	var tab = yamlMarch(words,(labelAllid.length+1),2);
    	var tabs = tab.innerHTML;
    	var addStage = '<div class="yamls" id="stage'+(labelAllid.length+1)+'"><table>'+tabs+"</table></div>";
    	var stages = document.getElementById("stage"+numbers);
    	stages.insertAdjacentHTML("afterEnd",addStage);
		//导航栏追加
    	nodes.insertAdjacentHTML("afterEnd",'<div class="nval1" id="stages'+(labelAllid.length)+'" onclick="stages('+labelAllid.length+')" >'+yamlKey+'</div>');		
    });
	
}
function addStageClose(){
	document.getElementById('overlay').style.display = 'none';
	document.getElementById('addStage').style.display = 'none';
	document.getElementById('addStageBody').style.display = 'none';
	document.getElementById('addStageTitle').style.display = 'none';
	document.getElementById('addStageClose').style.display = 'none';
	stageFlag = true;
}