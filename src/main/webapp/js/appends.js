var select=document.getElementById("devTypeId");
select.onchange=function(){
	var selOpt=document.getElementById("devTypeId");
	  var index=selOpt.selectedIndex;
	  var selectValue = selOpt.options[index].text;
	  var words = selectValue.split("；");
	  var show = RegExp(/show/);
	  var text = RegExp(/text/);
	  var select = RegExp(/select/);
	  var k8s = RegExp(/Kubernetes部署流水线/);
	  var weblogic = RegExp(/Weblogic流水线/);
	  var tab = document.getElementById("tab");
	  tab.innerHTML="";
	  //隐藏显示job昵称
	  document.getElementById("tab2").style.display="none";
	  if(selOpt.options[index].value==="-1"){
		  document.getElementById("jobNameId").hidden = true;
		  return false;
	  }
	  if(selOpt.options[index].value==="-2"){
		  document.getElementById("jobNameId").hidden = true;
		  document.getElementById("tab2").style.display="";
		  return false;
	  }
	  document.getElementById("jobNameId").hidden = false;
	  //全局静态属性路径
	  var resURL=document.getElementById("resURL").value;
	  var pngAppend = document.getElementById("pngAppend");
	  pngAppend.innerHTML="";
	  if(k8s.test(selOpt.options[index].value)){
		  var png = '<br/><div style=" font-weight:bold;display:flex;font-size:14px;">Kubernetes流水线流程图：<img src="'+resURL+'/plugin/template/png/k8s.png" alt="k8s" /><br /></div>';
		  pngAppend.innerHTML=png;
	  }
	  if(weblogic.test(selOpt.options[index].value)){
		  var png = '<br/><div style=" font-weight:bold;display:flex;font-size:14px;">Weblogic流水线流程图：<img src="'+resURL+'/plugin/template/png/weblogic.png" alt="weblogic"/><br /></div>';
		  pngAppend.innerHTML=png;
	  }	  
	  for(j = 0; j < words.length; j++) {
		  if(show.test(words[j])){
			  shows = words[j].replace("show：","");
			  var trs=tab.innerHTML;
			  var tr=trs+'<tr><td width="100%" style="width: 100px !important;display:table-cell"><div><div style="width:100px; margin:-2px auto;font-weight:bold;display:flex">'+shows+'</div></div></td></tr>';
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
					  var titles = tests[t].replace("title：","");
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
				  var trHepl = '<tr id="helps'+j+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+j+'" class="help" style="display: none;"></div></td><td></td></tr>'
				  var tr=trs+'<tr id="errId'+j+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><input placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+j+'"></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+','+j+');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
			  }else{
				  var tr=trs+'<tr id="errId'+j+'"><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><input placeholder="'+descriptions+'" name="_.'+titles+'" type="text" class="setting-input" id="ers'+j+'"></td><td class="setting-no-help"></td><td class="setting-no-help"></td></tr>';  
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
				  titles = selectSplit[s].replace("title：","");
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
				  var trHepl = '<tr id="helps'+j+'" class="help-area"><td></td><td colspan="2"><div id="divShow'+j+'" class="help" style="display: none;"></div></td><td></td></tr>'
				  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><select name="_.'+titles+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-help"><a tabindex="9999" href="javascript:help('+getHelp+','+j+');" ><img src="'+helpImg+'" alt="help" style="width: 16px; height: 16px; " class="setting-help"></a></td><td class="setting-no-help"></td></tr>'+trHepl;
			  }else{
				  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><select name="_.'+titles+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-no-help"></td></tr>';
			  }			  
//			  var tr=trs+'<tr><td class="setting-leftspace">&nbsp;</td><td class="setting-name">'+titles+'</td><td class="setting-main"><select name="_.'+title+'" class="setting-input">'+selValues+'</select><br></td><td class="setting-no-help"></td></tr>';
			  tab.innerHTML=tr;
		  }
	  }	  
}
//help:
function help(help,indexs){
//	debugger
	  var tr = document.getElementById("helps"+indexs);
	  var divShow = document.getElementById("divShow"+indexs).style.display;
	  if( divShow == "none") {
		  var td = '<td></td><td colspan="2"><div id="divShow'+indexs+'" class="help" style="display: block;block">'+help+'</div></td><td></td>';
	  }else{
		  var td = '<td></td><td colspan="2"><div id="divShow'+indexs+'" class="help" style="display: none;">'+help+'</div></td><td></td>';
	  }
	  tr.innerHTML=td; 
}
function check(obj){
//	debugger
	var flag = 0 ;
	var errGif=document.getElementById("errGif").value;
	var subSetId=document.getElementById("myBtn-button");
	var errMs = new RegExp("Please input parameters");
	if(subSetId != null){
		subSetId.id="";
		subSetId.value="submit";
	}
	for(var i of obj){
		if(i.value!="-1"){
			if(i.value==""||i.value==null){
				flag++;
				if(i.id == "" || i.id == null ){
				}else{
					//校验错误消息是否存在
					if(i.id=="jobNames"){
						var inputId = document.getElementById(i.id).parentNode;
						var inputMes = inputId.innerHTML;
						if(errMs.test(inputMes)){
							continue;
						}
						var tr = inputMes+'<div class="error"><img src="'+errGif+'" height="16" width="1">Please input parameters</div>';
						inputId.innerHTML=tr;	
						continue;
					}
					var inputId = document.getElementById(i.id).parentNode;
					var inputMes = inputId.innerHTML;
					if(errMs.test(inputMes)){
						continue;
					}
					var tr = inputMes+'<div class="error"><img src="'+errGif+'" height="16" width="1">Please input parameters</div>';
					inputId.innerHTML=tr;
				}
			}
			if(i.value!=""&&i.value!=null){
				if(i.id != "devTypeId" && i.id != null & i.id!=""){
//					debugger
					var inputId = document.getElementById(i.id).parentNode;
					var iValue = document.getElementById(i.id).value;
					var inputMes = inputId.innerHTML;
					if(errMs.test(inputMes)){
					inputMes = inputMes.replace('<div class="error"><img src="'+errGif+'" height="16" width="1">Please input parameters</div>',"");
					inputId.innerHTML=inputMes;
					document.getElementById(i.id).value=iValue;
					}
				}
			}
		}else{
			alert("请选择类别！")
			return false;
		}
	}
	var jobNameParent = document.getElementById("jobNames").parentNode;
	var trs=jobNameParent.innerHTML;
	var errMsJob = new RegExp("系统名称已存在");
	if(errMsJob.test(trs)){
		alert("系统名称已存在！!")
		return false;
	}
	if(flag== 0 ){
		return true;
	}else{
		alert("请检查参数!")
		return false;
	}
}
function verification(){
	debugger
	var errGif=document.getElementById("errGif").value;
	var selOpt=document.getElementById("devTypeId");
	var index=selOpt.selectedIndex ;
	var selectValue = selOpt.options[index].value
	var resURL = document.getElementById("resURL").value;
	
	//获取当前路径值
//	var curPath=window.document.location.href; 
	var curPath = decodeURIComponent(window.document.location.href); 
	a.increment(selectValue,curPath, function(t) {
		var jobName = document.getElementById("jobNames").value;
		//尝试设置值
		var errMs = new RegExp("系统名称已存在");
		if(jobName!=null && jobName!=""){//验证
			var allJobName = t.responseObject().split(",")
			var jobNames = allJobName[allJobName.length-1]+jobName;
//			var flag = 0 ;
			for(i = 0; i < allJobName.length-1; i++) {
				if(allJobName[i] == jobNames){
//					flag++;
					var jobNameParent = document.getElementById("jobNames").parentNode;
					var trs=jobNameParent.innerHTML;
					if(errMs.test(trs)){
						return false;
					}
					var tr=trs+'<div class="error" id="ErrJobName"><img src="'+errGif+'" height="16" width="1">系统名称已存在</div>';
					jobNameParent.innerHTML=tr;
					var errMs = new RegExp("Please input parameters");
					if(errMs.test(trs)){
						debugger
						document.getElementById("ErrJobName").previousSibling.remove();
					}					
					document.getElementById("jobNames").value=jobName;
					return false;
					}
				}
			var jobNameParent = document.getElementById("jobNames").parentNode;
			var trs=jobNameParent.innerHTML;
			if(errMs.test(trs)){
				document.getElementById("ErrJobName").remove();
			}
		}
	});
}
//Yamls设置：
var moveItem = document.getElementsByTagName('label');
for (let i = 0; i < moveItem.length; i++) {
    moveItem[i].setAttribute('id', 'label' + i);
    moveItem[i].ondragstart = function (ev) {
        ev.dataTransfer.setData("Text", this.id);
    };
}

//左－〉右
document.getElementById('visValue').ondragover = function (ev) {
    ev.preventDefault(); //阻止向上冒泡
}
document.getElementById('visValue').ondrop = function (ev) {
	//设置当前Ymlas为可拖动
//	  debugger
    ev.preventDefault();
    var id = ev.dataTransfer.getData('Text');
    var elem = document.getElementById(id); //当前拖动的元素
    var toElem = ev.toElement.id; //放置位置
    //获取所有子元素
    var right = document.getElementById("visValue");
  //判断是从左移动至右还是右侧单独移动
    var labelAllid = right.getElementsByTagName("label");
    for(var i=0;i<labelAllid.length;i++){
  	  if(labelAllid[i].id == id){
  		  if(toElem == "visValue"){
  			  this.appendChild(elem);
  			  return false;
  		  }
  		  this.insertBefore(elem, document.getElementById(toElem));
  		  return false;
  	  }
//  	  if(labelAllid == elem){
//  		  
//  	  }
    }
    var cNode = elem.cloneNode(true);
    cNode.id=id+Math.random();
    cNode.onclick="";
    cNode.ondragstart = function(event){
  	  event.dataTransfer.setData("Text",cNode.id);
    }
    if (toElem == 'visValue') {
        this.appendChild(cNode);
        var key = "'"+cNode.id+"'";
        var stageRemove = '<input style="float:right" type="button" value="移除" onclick="stageRemoveYaml('+key+')"/>';
        var stageKey=cNode.innerHTML;
        cNode.innerHTML=stageKey+stageRemove;          
    } else {
        //如果为container里的元素，则插入该元素之前
        this.insertBefore(cNode, document.getElementById(toElem));
        var key = "'"+cNode.id+"'";
        var stageRemove = '<input style="float:right" type="button" value="移除" onclick="stageRemoveYaml('+key+')"/>';
        var stageKey=cNode.innerHTML;
        cNode.innerHTML=stageKey+stageRemove;
    }
}
//移除当前Yaml:
function stageRemoveYaml(yamkKey){
	  var a = document.getElementById(yamkKey);
	  a.remove();
}
//查看StageYaml
function lookStageYaml(StageYamls){
	  var source = document.getElementById(StageYamls);
	  document.getElementById("stageYaml").style.display="";
	  document.getElementById("stageYamlTextarea").value=source.value;
}
//收起
function collapse(collapseId){
	  document.getElementById(collapseId).style.display="none";
}