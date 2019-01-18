//stage1
function getTypeList(getType){
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
    	document.getElementById(getType).style.backgroundColor = "#66cccc";
    }else{
    	document.getElementById(getType).style.backgroundColor = "#66cccc";
    }
    //设置正确选择图片
    var resURL =document.getElementById("resURL").value;
    document.getElementById("begin").src=resURL+"/plugin/template/png/templateOK.png";
//    document.getElementById("begin").style.height="28px";
    //设置竖线
    document.getElementById("step-stroke-bottom").style.background="#949393";
    document.getElementById("step-stroke-bottom").style.backgroundColor="#949393";
    /*document.getElementById("devTypeId").style.display="";
  //ajax请求数据
    getAllYamls.allYamls(function(t) {
    	YamlsAllValue = t.responseJSON;
    	var yaml = YamlsAllValue.split(",")
    	if(new RegExp(getType).test("Kubernetes部署流水线")){
    		var yamlsName = new RegExp("Kubernetes");
    	}else{
    		var yamlsName = new RegExp("Weblogic");
    	}
    	var opt = "";
    	for(var i=0;i<yaml.length;i++){
	    	if(yamlsName.test(yaml[i])){
	    			opt+='<option value='+yaml[i]+'>'+yaml[i]+'</option>';
	    	}
	    }
		document.getElementById("devTypeId").innerHTML="<option value='1'>选择上列类型</option>"+opt;
    });*/
}
//stage2
var select=document.getElementById("devTypeId");
if(select!=null){
	select.onchange=function(){
		//改变左侧竖杠
//		document.getElementById("step-stroke-bottom").style.background="#949393";
//		document.getElementById("step-stroke-bottom").style.backgroundColor="#949393";
		  var index=select.selectedIndex ;
		  var selectValue = select.options[index].text;
		  //ajax请求数据selectValue
		  getAllYamlAll.allYamlName(selectValue,function(t) {
		    	YamlsAllValue = t.responseJSON;
		    	//组装数据
		    	
		    });
	}
}
//设置左侧div高度
//window.onload = function () {
//	var height = document.getElementById("template-tyle").offsetHeight;
//	document.getElementById("step-stroke-bottom").style.height = 80+height +"px";
//}
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
//    allYamlName
	  getAllJobName.allJobName(templateType,function(t) {
		  debugger
		  	allJobName = t.responseJSON;
	    	//组装数据
//	    	console.log(YamlsAllValue);
//	    	<div class="listJob" id="${template.key}" onclick="getTemplateType('${template.key}')">${template.key}</div>
		  	var jobNameDiv = "";
		  	var jobNames = allJobName.split(",");
		  	for(i = 0; i < jobNames.length; i++) {
		  		jobNameDiv+='<div class="listJob" id="'+jobNames[i]+'job" onclick="getTemplateName('+jobNames[i]+')">'+jobNames[i]+'</div>';
		  	}
		  	var jobNamesDiv = document.getElementById("jobListName");
		  	jobNamesDiv.innerHTML=jobNameDiv;
//		  	pngAppend.innerHTML=png;
	    });
}
//每步stageBegin
function getTemplateName(jobName){
	document.getElementById("stage1").hidden = true;
	//ajax请求单个Yaml
	getAllYamls.allYamls(jobName,function(t) {
		console.log(t.responseJSON.split(","));
	});
}

function toDown(){
	var a = document.getElementById("border1");
	if(a.style.webkitTransform!=""){
		var cont = a.style.webkitTransform;
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
		cont = "translateY(-"+cont+"%)";
		a.style.webkitTransform=cont;	
		a.style.transform=cont;
		return false;
	}
	a.style.webkitTransform="translateY(-50%)";
	a.style.transform="translateY(-50%)";
}
