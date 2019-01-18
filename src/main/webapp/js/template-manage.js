//选中关联Job
function getAssJob(assJob){
	var baclgr = document.getElementById(assJob).style.backgroundColor;
	if(baclgr!=""){
		document.getElementById(assJob).style.backgroundColor = "";
	}else{
		document.getElementById(assJob).style.backgroundColor = "#66cccc";
	}
}

//添加属性
function appendYamls(appendYamls,resURL){
	var current = document.getElementById("currentYamls");
	var uiId = Math.random();
	var math = appendYamls+uiId;
	var key = "'"+math+"'";
	var div = '<ul id="'+uiId+'" style="margin-right:7px;" class="curreYamls"><div class="curreYamls" id="'+math+'" onclick="moveStage('+key+')" style="margin:5px 7px;text-align:center;float:left;border: solid 1px #cbcbcb;">'+appendYamls+'</div><img style="float:right" onclick="deleteYamls('+uiId+')" title="移除Yamls" src="'+resURL+'/plugin/template/png/delete.png" alt="移除Yamls" /></ul>';
	var currents=current.innerHTML;
	current.innerHTML=currents+div;
}
//选中Stage
function moveStage(selectValue){
	var currentYamls = document.getElementById("currentYamls");
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
    	document.getElementById(selectValue).style.backgroundColor = "#66cccc";
    }else{
    	document.getElementById(selectValue).style.backgroundColor = "#66cccc";
    }
}
//向上移动
function upYamls(){
	var currentYamls = document.getElementById("currentYamls");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes ;
	var brother; 
    for(var i=0;i<labelAllid.length;i++){
    	var color = labelAllid[i].style.backgroundColor;
    	if(color!=""){
    		color = "1";
    		nodes = labelAllid[i];
    		brother = labelAllid[i-1];
    		break;
    	}
    }
    if(color!=""){
    	var nodesValue=nodes.outerText;
    	if(brother!=undefined){
    		nodes.textContent=brother.outerText;
    		brother.textContent=nodesValue;
    		nodes.style.backgroundColor = "";
    		brother.style.backgroundColor = "#66cccc";
    	}
    }else{
    	alert("请选择Yaml")
    }
}
//向下移动
function downYamls(){
	var currentYamls = document.getElementById("currentYamls");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes ;
	var brother; 
    for(var i=0;i<labelAllid.length;i++){
    	var color = labelAllid[i].style.backgroundColor;
    	if(color!=""){
    		color = "1";
    		nodes = labelAllid[i];
    		brother = labelAllid[i+1];
    		break;
    	}
    }
    if(color!=""){
    	var nodesValue=nodes.outerText;
//    	var brotherValue=brother.outerText;
    	if(brother!=undefined){
    		nodes.textContent=brother.outerText;
    		brother.textContent=nodesValue;
    		brother.style.backgroundColor = "#66cccc";
    		nodes.style.backgroundColor = "";
    	}
    }else{
    	alert("请选择Yaml")
    }
}
//移除
function deleteYamls(nodes){
	document.getElementById(nodes).remove();;
}
//反选
function checkboxAll(){
	debugger
	var oDiv=document.getElementById("cmbcListIndex"); 
	var oInp=oDiv.getElementsByTagName("input");
    for(var i=0; i<oInp.length ; i++){ 
        if(oInp[i].checked==true){ 
            oInp[i].checked=false; 
        } 
        else{ 
            oInp[i].checked=true; 
        } 
    } 
}
//单个删除
function deleteOneTem(selKey){
	document.getElementById(selKey).checked=true;;
	deleteAll();
}
//批量删除
function deleteAll(){
    var msg = "您真的确定要删除吗？";
    if (confirm(msg)==true){
    	var oDiv=document.getElementById("cmbcListIndex"); 
    	var oInp=oDiv.getElementsByTagName("input");
    	var deleteAll = "";
        for(var i=0; i<oInp.length ; i++){ 
            if(oInp[i].type=='checkbox'){
            	if(oInp[i].checked==true){
            		deleteAll+=oInp[i].value+",";
            	}
            } 
        }
    	if(deleteAll!=""){
    		document.getElementById("deleteAllValues").value=deleteAll.substr(0,deleteAll.length-1);;
    		var del = document.getElementById("myForms"); 
    		del.action = "removeConfig";
    		del.submit();
    	}
    }else{
    return false;
    }
}
//确认添加
function addTemplate(){
	//校验模板名称:
	var assJob = document.getElementById("jobName").value;
	if(assJob == ""){
		alert("模板名称不可为空！")
		return false;
	}
	//组装数据关联job
	var assJob = document.getElementById("assctionJob");
	var divs = assJob.getElementsByTagName("div");
	var assJobValue = "";
	for(var i=0; i<divs.length ; i++){ 
        if(divs[i].style.backgroundColor!=''){
        	assJobValue+=divs[i].outerText+",";
        } 
    }	
	document.getElementById("assctionXml").value=assJobValue.substr(0,assJobValue.length-1);
	//组装数据Yamls
	var assYamls = document.getElementById("currentYamls");
	var assYamlsDiv = assYamls.getElementsByTagName("div");
	var assYamlsValue = "";
	for(var j=0; j<assYamlsDiv.length ; j++){ 
		assYamlsValue+=assYamlsDiv[j].outerText+",";
    }
	document.getElementById("yamls").value=assYamlsValue.substr(0,assYamlsValue.length-1);
	var del = document.getElementById("myForms"); 
	del.action = "configSubmit";
	del.submit();
}
//跳转详情
function toDetails(getKey){
	window.open('toUpdate?jobKey='+getKey+'','newwindow','height=700,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
}
//关联Job回显
function setAssJob(jobKey){
	//单选job列表
	var assctionJob = document.getElementById("assctionJob");
	var labelAllid = assctionJob.getElementsByTagName("div");
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
    	document.getElementById(jobKey).style.backgroundColor = "#66cccc";
    }else{
    	document.getElementById(jobKey).style.backgroundColor = "#66cccc";
    }
    //回显值
    document.getElementById("jobName").value=jobKey;
    document.getElementById("jobXml").value=document.getElementById(jobKey+"Value").value;
}
//Yaml关联Job回显
function setAssYaml(jobKey){
	//单选job列表
	var assctionJob = document.getElementById("assctionYamls");
	var labelAllid = assctionJob.getElementsByTagName("div");
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
    	document.getElementById(jobKey).style.backgroundColor = "#66cccc";
    }else{
    	document.getElementById(jobKey).style.backgroundColor = "#66cccc";
    }
    //回显值
    document.getElementById("jobName").value=jobKey;
    document.getElementById("jobXml").value=document.getElementById(jobKey+"yamlValue").value;
    //回显关联Job
    var assJobKey = document.getElementById(jobKey+"assJobValue").value;
    	var assJobValue = assJobKey.split(",")
    //将关联Job设置为白色
    	
    var assctionJobs = document.getElementById("assctionJob");
    var labelAllids = assctionJobs.getElementsByTagName("div");
    for(var i=0;i<labelAllids.length;i++){
    	if(labelAllids[i].style.backgroundColor!=""){
    		labelAllids[i].style.backgroundColor="";
    	}
    }
    //将关联值上色
    for(i = 0; i < assJobValue.length; i++) {
    	if(document.getElementById(assJobValue[i])!=null){
    		document.getElementById(assJobValue[i]).style.backgroundColor = "#66cccc";
    	}
	}    
}
//移除job
function deleteJob(jobKey){
    var msg = "您真的确定要删除吗？";
    if (confirm(msg)==true){
		document.getElementById("assJobKey").value=jobKey;
		var del = document.getElementById("myForms"); 
		del.action = "removeAssJob";
		del.submit();	
    }else{
        return false;
        }
}
//添加关联Job
function addAssocJob(){
	var add = document.getElementById("myForms"); 
	add.action = "associationJobAdd";
	add.submit();	
}
//添加关联Yamls
function addAssocYaml(){
	//设置关联job值：
	var assctionJob = document.getElementById("assctionJob");
	var labelAllid = assctionJob.getElementsByTagName("div");
	var assocJobValue = "";
    for(var i=0;i<labelAllid.length;i++){
    	if(labelAllid[i].style.backgroundColor != ""){
    		assocJobValue+=labelAllid[i].outerText+",";
    	}
    }
    document.getElementById("assctionXml").value=assocJobValue.substr(0,assocJobValue.length-1);;
	var add = document.getElementById("myForms"); 
	add.action = "associationYamlsAdd";
	add.submit();	
}
//Yamls删除设置
function deleteYaml(yamlKey){
    var msg = "您真的确定要删除吗？";
    if (confirm(msg)==true){
		document.getElementById("assYamlsKey").value=yamlKey;
		var del = document.getElementById("myForms"); 
		del.action = "removeAssYamls";
		del.submit();
    }else{
    return false;
    }
}
//跳转修改界面
function toUpdate(jobKey){
	window.location.href = 'update?jobKey='+jobKey;
}
//function getValues(){
//	//根据url获取value值
//	var curPath = decodeURIComponent(window.document.location.href);
//	if (curPath.indexOf("?") != -1) {
//		curPath = curPath.substr(curPath.indexOf("=") + 1);
//    }	
//	//ajax值的获取
//	getValue.getJobValue(curPath, function(t) {
//		jobAllValue = t.responseText;
//		jsonJobValue = strToJson(jobAllValue);
//		jobXml = jsonJobValue["jobXml"];//
//		alert(jobXml)
//	});
//}
function strToJson(str){ 
	var json = eval('(' + str + ')'); 
	return json; 
	} 
//job类别回显
function getTemplateType(templateType){
	var tem = document.getElementById("templateType");
	tem.value=templateType;
}
//选择类别
function selTemType(){
	
}
//唯一名称前缀(JobName)
function uniqueName(){
	//1校验
	var jobName = document.getElementById("jobName").value;
	getTemplateName.getTemplateName(jobName, function(t) {
		var jobAllValue = t.responseText;
		var jobName = document.getElementById("jobName");
		var errors = document.getElementById("errors");
		if(t.responseText!="null"){
			if(document.getElementById("errId") === null){
			jobName.style.border="1px solid red";
			var div = document.createElement("div");
			div.id="errId";
			var textNode = document.createTextNode("名称前缀重复，请修改");
			div.appendChild(textNode);
			errors.appendChild(div);
			document.getElementById("templateAdd").disabled=true;
			document.getElementById("reset").disabled=true;
			document.getElementById("jobName").focus();
			}	
		}else{
			if(document.getElementById("errId")!= null){
				jobName.style.border="";
				errors.removeChild(document.getElementById("errId"));
				document.getElementById("templateAdd").disabled=false;
				document.getElementById("reset").disabled=false;
			}
		}
	});
}
//删除关联jOB
function deleteType(templateType){
    var msg = "删除模板类别相应模板也会删除，是否删除？";
    if (confirm(msg)==true){
		document.getElementById("templateType").value=templateType;
		var del = document.getElementById("myForms"); 
		del.action = "removeAssType";
		del.submit();	
    }else{
        return false;
    }	
}