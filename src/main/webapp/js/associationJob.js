  //回显Yamls设置
  function echoYamls(jobKey){
//	  debugger
	  var jobValue = document.getElementById(jobKey).value;
	  var assJobName = document.getElementById("assJobName");
	  assJobName.value=jobKey;
	  var assJobXml = document.getElementById("assJobXml");
	  var AssJobAll = jobValue.split("@@")
	  var assTable = document.getElementById("assTable");
	  var yamlsValue = "";
	  for(var i=1;i<AssJobAll.length;i++){
		  var AssJob = AssJobAll[i].split(",")
		  for(var j=0;j<AssJob.length;j++){
			  //当前Job数据显示
//				  var key = "'"+visFor[j]+Math.random()+"'";
//				  yamlsValue += '<label id='+key+' ondragstart="drag(event,'+key+')" draggable="true" style="display:block;margin:5px 2px 6px 5px; font-size:13px;cursor: hand;cursor: pointer; ">JobName：'+visFor[j]+'<input style="float:right" type="button" value="移除" onclick="stageRemoveYaml('+key+')"/></label>';
			  var assJob = "'"+AssJob[j]+"'";
			  yamlsValue += '<tr id='+AssJob[j]+' style="display:block;margin:2px 0;"><td style="width:90px;padding:5px;border-bottom:1px solid #E6E6FA;"><font size="3" face="arial">'+AssJob[j]+'</font></td><td style="width:90px;padding:5px;"><input type="button" onclick="removeAssc('+assJob+')" value="移除"></input></td></tr>';			  
		  }
	  }
	  assTable.innerHTML=yamlsValue;
	  assJobXml.value=AssJobAll[0];
  }
  //回显AssJob模板设置
  function associationAdd(jobKey){
	  var jobValue = document.getElementById(jobKey).value;
	  document.getElementById("assJobName").value=jobKey;
	  document.getElementById("assJobXml").value=jobValue;
	  
  }
  //删除设置值
  function submitFun(act,assJobKey){
	  console.log(act);
      if (confirm("删除job会将有模板关联的job全删除，是否确认")) {  
		  var myForms = document.getElementById("myForms");
		  //设置删除的值
		  var assJobKeys = document.getElementById("assJobKey");
		  assJobKeys.value=assJobKey;
		  myForms.action = act;
		  myForms.submit();          
      }  
      else {
    	  return false;
      }

  }
  //查看job
  function associationAppend(jobValue){
	  var jobValues = document.getElementById(jobValue).value;
	  document.getElementById("asscXml").style.display="";
	  document.getElementById("asscXmlYalue").value=jobValues;
  }
  //收起
  function collapse(collapseId){
	  document.getElementById(collapseId).style.display="none";
  }
  //添加关联job
  function associationJobAdd(jobValue){
	  var assTable = document.getElementById("assTable");
	  var jobValues = RegExp(jobValue);
	  if(jobValues.test(assTable.innerHTML)){
		  alert("已关联Job，勿重复点击！")
		  return false;
	  }
		  var trs=assTable.innerHTML;
		  var tabl = trs+'<tr id='+jobValue+' style="display:block;margin:2px 0;"><td style="width:90px;padding:5px;border-bottom:1px solid #E6E6FA;"><font size="3" face="arial">'+jobValue+'</font></td><td style="width:90px;padding:5px;"><input type="button" onclick="removeAssc('+jobValue+')" value="移除"/></td></tr>';
		  assTable.innerHTML=tabl;
  }
  //移除关联job
  function removeAssc(assJob){
//	  debugger
//	中文字段传递来的参数无法正常获取，获取后需要正则，但是数字参数不需要
	  if(assJob.outerText!=null){
		  assJob = assJob.outerText;
		  assJob = assJob.replace(/\"/g, "");
		  assJob = assJob.replace(/(^\s*)|(\s*$)/g, "");
	  }
	  //去除空格   暂时不去除空格 但是可能存在bug 建议详细测试
//	  assJob=assJob.replace(/\s+/g, ""); 
	var trs = document.getElementById(assJob);
	var tabs = trs.parentNode;
	tabs.removeChild(trs);

  }
  function submitFunManage(act){
//	  debugger
	  var a = document.getElementById("associationYamlsAdd");
	  a.action = act;
	  if(act=== 'associationYamlsAdd'){
//		     转换关联Job
		  var assTable = document.getElementById("assTable");
		  var font = assTable.getElementsByTagName("font");
		  var assJob = "";
		  for(var i=0;i<font.length;i++){
			  assJob += font[i].textContent+",";
		  }
		  assJob = assJob.substr(0,assJob.length-1);
		  document.getElementById("assctionXml").value=assJob;
	  }
	  document.getElementById("associationYamlsAdd").submit();
  }
  //移除当前Yaml:
  function stageRemoveYaml(yamkKey){
	  var a = document.getElementById(yamkKey);
	  a.remove();
  }