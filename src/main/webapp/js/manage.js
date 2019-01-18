var select=document.getElementById("devTypeId");
  select.onchange=function(){
	  var index=select.selectedIndex ;
	  var selectOption = select.options[index].value;
	  var tab=document.getElementById("tab");
	  var tab2=document.getElementById("tab2");
	  var assc=document.getElementById("assc");
	  if(select.options[index].text==="选 择"){
		  document.getElementById("updDesplay").hidden = true;
		  document.getElementById("delDesplay").hidden = true;
		  document.getElementById("accUpdate").hidden = true;
		  tab.style.display="none";
		  tab2.style.display="none";
		  assc.style.display="none";
		  return false;
	  }
	  assc.style.display="";
	  tab.style.display="";
	  tab2.style.display="";
	  var visualization=document.getElementById("visualization");
	  visualization.style.display="";
	  //改变删除修改值为可用
	  document.getElementById("accUpdate").hidden = false;
	  document.getElementById("updDesplay").hidden = false;
	  document.getElementById("delDesplay").hidden = false;
//	  document.getElementById("accJobxml").hidden = false;
	  //对隐藏域赋值
	  var selKey = document.getElementById("selKey");
	  selKey.value=select.options[index].text;
	  //对模板昵称赋值修改
	  var selOption = selectOption.split("@$#");
	  //回显值设置
	  document.getElementById("selKeys").value=select.options[index].text;
	  document.getElementById("jobName").value=selOption[0];		
	  document.getElementById("uname").value=selOption[3];
	  document.getElementById("pwd").value=selOption[1];
	  document.getElementById("url").value=selOption[2];
	  document.getElementById("jobXml").value=selOption[4];
	  //源数据设置
//	  var textareas = document.getElementById("textareas");
//	  textareas.value=selOption[5];
	  //selOption[6]关联jobList
	  var assTable = document.getElementById("assTable");
	  assTable.innerHTML="";
	  var AssJob = selOption[6];
	  AssJob = AssJob.replace(/\[|]/g,'');
	  //回显assc关联job数据
	  if(AssJob!==""){
//		  debugger
		  AssJob = AssJob.split(",")
			  for(i = 0; i < AssJob.length; i++) {
				  var trs=assTable.innerHTML;
				  var assJob = "'"+AssJob[i]+"'";
				  var tabl = trs+'<tr id='+AssJob[i]+' style="display:block;margin:2px 0;"><td style="width:90px;padding:5px;border-bottom:1px solid #E6E6FA;"><font size="3" face="arial">'+AssJob[i]+'</font></td><td style="width:90px;padding:5px;"><input type="button" onclick="removeAssc('+assJob+')" value="移除"></input></td></tr>';
				  assTable.innerHTML=tabl;
		  }
	  }
//	  var textarea = document.createElement("textarea");
//	  textarea.rows = "20";
//	  textarea.cols = "80";
//	  textarea.name = "yamls";
//	  textarea.id = "yamls";
//	  textarea.value=selOption[5];
//	  debugger
	  //当前Yaml数据显示
	  var visValue = document.getElementById("visValue");
	  var visFor = selOption[5].split(",");
	  var yamlsValue = "";
//	  debugger
	  for(i = 0; i < visFor.length; i++) {
		  var key = "'"+visFor[i]+Math.random()+"'";
		  yamlsValue += '<label id='+key+' ondragstart="drag(event,'+key+')" draggable="true" style="display:block;margin:5px 2px 6px 5px; font-size:13px;cursor: hand;cursor: pointer; ">Stage：'+visFor[i]+'<input style="float:right" type="button" value="移除" onclick="stageRemoveYaml('+key+')"/></label>';
	  }
	  visValue.innerHTML="<span>当前Yamls：</span><br/>"+yamlsValue;
	 
//	  模板昵称修改：<input type="text" name="selKeys" id="selKeys"/>
//	  var selKeys = document.createElement("input");
//	  selKeys.type="text";
//	  selKeys.name="selKeys";
//	  selKeys.id="selKeys";
//	  selKeys.value=select.options[index].text;
//	  var spanSelKeys = document.createElement("span");
//	  spanSelKeys.innerHTML="模板昵称：";
//	  //创建并使用table
//	  var table = document.createElement("table");
//	  var tr1 = document.createElement("tr");
//	  var td1 = document.createElement("td");
//	  var td11 = document.createElement("td");
//	  td1.append(spanSelKeys);
//	  td11.appendChild(selKeys);
//	  tr1.appendChild(td1);
//	  tr1.appendChild(td11);
//	  
//	  var spanYaml = document.createElement("span");
//	  spanYaml.innerHTML="Yaml：";
//	  var spanUserName = document.createElement("span");
//	  spanUserName.innerHTML="用户名："; 
//	  var spanpwd = document.createElement("span");
//	  spanpwd.innerHTML="密码：";
//	  var spanJobXml = document.createElement("span");
//	  spanJobXml.innerHTML="JobXml：";
//	  var spanUrl = document.createElement("span");
//	  spanUrl.innerHTML="url：";
//	  var spanJobName = document.createElement("span");
//	  spanJobName.innerHTML="Job名称：";	  
//		  var jobName = document.createElement("input");
//		  jobName.type="text";
//		  jobName.name="jobName";
//		  jobName.value=selOption[0];			  
//		  var userName = document.createElement("input");
//		  userName.type="text";
//		  userName.name="uname";
//		  userName.value=selOption[3];
//		  var pwds = document.createElement("input");
//		  pwds.name="pwd";
//		  pwds.type="password";
//		  pwds.value=selOption[1];
//		  var url = document.createElement("input");
//		  url.type="text";
//		  url.name="url";
//		  url.value=selOption[2];
//		  var jobXml = document.createElement("textarea");
//		  jobXml.rows = "20";
//		  jobXml.cols = "80";
//		  jobXml.name="jobXml";
//		  jobXml.value=selOption[4];
//		  var tr2 = document.createElement("tr");
//		  var td2 = document.createElement("td");
//		  var td21 = document.createElement("td");
//		  td2.append(spanJobName);
//		  td21.appendChild(jobName);
//		  tr2.appendChild(td2);
//		  tr2.appendChild(td21);		  
//		  var tr3 = document.createElement("tr");
//		  var td3 = document.createElement("td");
//		  var td31 = document.createElement("td");
//		  td3.append(spanUserName);
//		  td31.appendChild(userName);
//		  tr3.appendChild(td3);
//		  tr3.appendChild(td31);
//		  var tr4 = document.createElement("tr");
//		  var td4 = document.createElement("td");
//		  var td41 = document.createElement("td");
//		  td4.append(spanpwd);
//		  td41.appendChild(pwds);
//		  tr4.appendChild(td4);
//		  tr4.appendChild(td41);		  
//		  var tr5 = document.createElement("tr");
//		  var td5 = document.createElement("td");
//		  var td51 = document.createElement("td");
//		  td5.append(spanUrl);
//		  td51.appendChild(url);
//		  tr5.appendChild(td5);
//		  tr5.appendChild(td51);		  
//		  //将两个textarea放置最下方
//		  var tr6 = document.createElement("tr");
//		  var td6 = document.createElement("td");
//		  var td61 = document.createElement("td");
//		  td6.append(spanYaml);
//		  td61.appendChild(textarea);
//		  tr6.appendChild(td6);
//		  tr6.appendChild(td61);		  
//		  var tr7 = document.createElement("tr");
//		  var td7 = document.createElement("td");
//		  var td71 = document.createElement("td");
//		  td7.append(spanJobXml);
//		  td71.appendChild(jobXml);
//		  tr7.appendChild(td7);
//		  tr7.appendChild(td71);
//		  table.appendChild(tr1);
//		  table.appendChild(tr2);
//		  table.appendChild(tr3);
//		  table.appendChild(tr4);
//		  table.appendChild(tr5);
//		  table.appendChild(tr6);
//		  table.appendChild(tr7);
//		  inputs.appendChild(table);
}
  /*
  //修改功能
  var update = document.getElementById("update");
  update.onclick = function(){
	  var index=select.selectedIndex ;
	  var selectKey = select.options[index].text;
	  var selectValue = document.getElementById("yamls").value;
	  var jobName =document.getElementsByName("jobName")[0].value;
	  var uname =document.getElementsByName("uname")[0].value;
	  var pwd =document.getElementsByName("pwd")[0].value;
	  var jobXml =document.getElementsByName("jobXml")[0].value;
	  var url =document.getElementsByName("url")[0].value;
	  //原生ajax
	  var xhr = new XMLHttpRequest();
	  xhr.open('post', 'updateTemplate' );	  
	  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	//发送请求
	  xhr.send("selectKey="+selectKey+"&selectValue="+selectValue+"&jobName="+jobName+"&uname="+uname+"&pwd="+pwd+"&jobXml="+jobXml+"&url="+url+"");
	  xhr.onreadystatechange = function () {
	      // 这步为判断服务器是否正确响应
	    if (xhr.readyState == 4 && xhr.status == 200) {
	    	window.location.reload();
	    }
	    if (xhr.readyState != 4 && xhr.status != 200) {
	    	alert("服务器异常")
	    }
	  };	  
  }*/
 /* 
  var deletes = document.getElementById("delete");
  deletes.onclick = function(){
	  var index=select.selectedIndex ;
	  var selectKey = select.options[index].text;
	  //原生ajax
	  var xhr = new XMLHttpRequest();
	  xhr.open('post', 'removeConfig' );	  
	  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	//发送请求
	  xhr.send("selKey="+selectKey+"");
	  xhr.onreadystatechange = function () {
	      // 这步为判断服务器是否正确响应
	    if (xhr.readyState == 4 && xhr.status == 200) {
	    	window.location.reload();
	    }
	    if (xhr.readyState != 4 && xhr.status != 200) {
	    	alert("服务器异常")
	    }
	  };	  
  }
  */
  /*
  function test(){
	  var visValue = document.getElementById("visValue");
	  var label = visValue.getElementsByTagName("label");
	  var yamlStage = "";
	  //匹配规则
//	  for(var i=0;i<label.length-1;i++){
//		  var yamls = label[i].textContent.replace("Stage：","");
//		  yamlStage += document.getElementById(yamls).value+"\n---\n";
//	  }
//	  debugger
//	  var a = label.length-1;
//	  var y = label[a].textContent.replace("Stage：","");
//	  yamlStage += document.getElementById(y).value;
//	  alert(yamlStage);
	  for(var i=0;i<label.length;i++){
	  var yamls = label[i].textContent.replace("Stage：","");
	  yamlStage += document.getElementById(yamls).value+"\n---\n";
	  }	  
  }
  */
  //提交
  function submitFun(act){
	  var a = document.getElementById("myForms");
	  a.action = act;
//	  debugger
	  if(act=== 'updateTemplate'){
		  //转换Yamls数据
//		  debugger
		  var visValue = document.getElementById("visValue");
		  var label = visValue.getElementsByTagName("label");
		  var yamlStage = "";
		  for(var i=0;i<label.length;i++){
			  var yamls = label[i].textContent.replace("Stage：","");
//			  yamlStage += document.getElementById(yamls).value+"\n---\n";
			  yamlStage +=yamls+",";
		  }
		  yamlStage = yamlStage.substr(0,yamlStage.length-1);
		  document.getElementById("yamls").value=yamlStage;
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
	  document.getElementById("myForms").submit();
  }
  function associationAppend(jobValue){
	  var jobValues = document.getElementById(jobValue).value;
	  document.getElementById("asscXml").style.display="";
	  document.getElementById("asscXmlYalue").value=jobValues;
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
  //添加关联job
  function associationAdd(jobValue){
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
  //可视化与源数据展示
  function displayYamls(displayYamls){
//	  debugger
	  if(displayYamls==1){
		 var vis = document.getElementById("visualization");
		 vis.style.display="";
		 var source = document.getElementById("source");
		 source.style.display="none";
	  }else{
		var vis = document.getElementById("visualization");
		vis.style.display="none";		  
		var source = document.getElementById("source");
		source.style.display="";
		document.getElementById("stageYaml").style.display="none";
		  	
	  }
  } 
 //查看StageYaml
  function lookStageYaml(StageYamls){
	  var source = document.getElementById(StageYamls);
	  document.getElementById("stageYaml").style.display="";
	  document.getElementById("stageYamlTextarea").value=source.value;
//	  var a = document.getElementsByName("name")[0].style.display="";
//	  document.getElementsByName("name")[0].value=StageYamls;
  }
  //移除当前Yaml:
  function stageRemoveYaml(yamkKey){
	  var a = document.getElementById(yamkKey);
	  a.remove();
  }
  //Stage拖动
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
//    	  if(labelAllid == elem){
//    		  
//    	  }
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
  //收起
  function collapse(collapseId){
	  document.getElementById(collapseId).style.display="none";
  }
  function drag(event,id)
  {
  event.dataTransfer.setData("Text",id);
  }