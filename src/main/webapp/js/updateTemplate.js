window.onload = function() {
	// 根据url获取value值
	var curPath = decodeURIComponent(window.document.location.href);
	if (curPath.indexOf("?") != -1) {
		curPath = curPath.substr(curPath.indexOf("=") + 1);
	}
	// ajax值的获取
	getValue
			.getJobValue(
					curPath,
					function(t) {
						jobAllValue = t.responseText;
						jsonJobValue = strToJson(jobAllValue);
						// document.getElementById("selKeys").value=curPath;
						if (document.getElementById(jsonJobValue["assType"]) != null) {
							document.getElementById(jsonJobValue["assType"]).style.backgroundColor = "#66cccc";
						}
						document.getElementById("templateType").value = jsonJobValue["assType"];
						document.getElementById("jobName").value = curPath;
						document.getElementById("uname").value = jsonJobValue["userName"];
						document.getElementById("remarks").value = jsonJobValue["remarks"];
						document.getElementById("pwd").value = jsonJobValue["password"];
						document.getElementById("url").value = jsonJobValue["jobUrl"];
						document.getElementById("jobXml").value = jsonJobValue["jobXml"];
						var assJob = jsonJobValue["assJob"].split(",");
						for (i = 0; i < assJob.length; i++) {
							var ass = document.getElementById(assJob[i])
							if (ass != null) {
								ass.style.backgroundColor = "#66cccc";

							}
						}
						var yamls = jsonJobValue["yamls"].split(",");
						if (document.getElementById("assctionYamls") != null) {
							var yamlDivs = "";
							for (i = 0; i < yamls.length; i++) {
								yamlDivs += '<div class="listJob" >' + yamls[i]
										+ '</div>'
							}
							document.getElementById("assctionYamls").innerHTML = yamlDivs;
						}
						if (document.getElementById("currentYamls") != null) {
							var yamlDivs = "";
							for (i = 0; i < yamls.length; i++) {
								var uiId = Math.random();
								var math = yamls[i] + uiId;
								var key = "'" + math + "'";
								var resURL = document.getElementById("resURL").value;
								yamlDivs += '<ul id="'
										+ uiId
										+ '" style="margin-right:30px;" class="curreYamls"><div class="curreYamls" id="'
										+ math
										+ '" onclick="moveStage('
										+ key
										+ ')" style="margin:5px 7px;text-align:center;float:left;border: solid 1px #cbcbcb;">'
										+ yamls[i]
										+ '</div><img style="float:right" onclick="deleteYamls('
										+ uiId
										+ ')" title="移除Yamls" src="'
										+ resURL
										+ '/plugin/template/png/delete.png" alt="移除Yamls" /></ul>';
							}
							document.getElementById("currentYamls").innerHTML = yamlDivs;
						}
					});
}
function strToJson(str) {
	var json = eval('(' + str + ')');
	return json;
}
// 选中关联Job
function getAssJob(assJob) {
	var baclgr = document.getElementById(assJob).style.backgroundColor;
	if (baclgr != "") {
		document.getElementById(assJob).style.backgroundColor = "";
	} else {
		document.getElementById(assJob).style.backgroundColor = "#66cccc";
	}
}
// 移除
function deleteYamls(nodes) {
	document.getElementById(nodes).remove();
	;
}
// 向上移动
function upYamls() {
	var currentYamls = document.getElementById("currentYamls");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes;
	var brother;
	for (var i = 0; i < labelAllid.length; i++) {
		var color = labelAllid[i].style.backgroundColor;
		if (color != "") {
			color = "1";
			nodes = labelAllid[i];
			brother = labelAllid[i - 1];
			break;
		}
	}
	if (color != "") {
		var nodesValue = nodes.outerText;
		if (brother != undefined) {
			nodes.textContent = brother.outerText;
			brother.textContent = nodesValue;
			nodes.style.backgroundColor = "";
			brother.style.backgroundColor = "#66cccc";
		}
	} else {
		alert("请选择Yaml")
	}
}
// 向下移动
function downYamls() {
	var currentYamls = document.getElementById("currentYamls");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes;
	var brother;
	for (var i = 0; i < labelAllid.length; i++) {
		var color = labelAllid[i].style.backgroundColor;
		if (color != "") {
			color = "1";
			nodes = labelAllid[i];
			brother = labelAllid[i + 1];
			break;
		}
	}
	if (color != "") {
		var nodesValue = nodes.outerText;
		// var brotherValue=brother.outerText;
		if (brother != undefined) {
			nodes.textContent = brother.outerText;
			brother.textContent = nodesValue;
			brother.style.backgroundColor = "#66cccc";
			nodes.style.backgroundColor = "";
		}
	} else {
		alert("请选择Yaml")
	}
}
// 添加属性
function appendYamls(appendYamls, resURL) {
	var current = document.getElementById("currentYamls");
	var uiId = Math.random();
	var math = appendYamls + uiId;
	var key = "'" + math + "'";
	var div = '<ul id="'
			+ uiId
			+ '" style="margin-right:30px;" class="curreYamls"><div class="curreYamls" id="'
			+ math
			+ '" onclick="moveStage('
			+ key
			+ ')" style="margin:5px 7px;text-align:center;float:left;border: solid 1px #cbcbcb;">'
			+ appendYamls
			+ '</div><img style="float:right" onclick="deleteYamls(' + uiId
			+ ')" title="移除Yamls" src="' + resURL
			+ '/plugin/template/png/delete.png" alt="移除Yamls" /></ul>';
	var currents = current.innerHTML;
	current.innerHTML = currents + div;
}
// 选中Stage
function moveStage(selectValue) {
	var currentYamls = document.getElementById("currentYamls");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes;
	for (var i = 0; i < labelAllid.length; i++) {
		var color = labelAllid[i].style.backgroundColor;
		if (color != "") {
			color = "1";
			nodes = labelAllid[i];
			break;
		}
	}
	if (color != "") {
		nodes.style.backgroundColor = "";
		document.getElementById(selectValue).style.backgroundColor = "#66cccc";
	} else {
		document.getElementById(selectValue).style.backgroundColor = "#66cccc";
	}
}
// 确认修改
function updateTemplate() {
	// 组装数据关联job
	var assJob = document.getElementById("assctionJob");
	var divs = assJob.getElementsByTagName("div");
	var assJobValue = "";
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].style.backgroundColor != '') {
			assJobValue += divs[i].outerText + ",";
		}
	}
	document.getElementById("assctionXml").value = assJobValue.substr(0,
			assJobValue.length - 1);
	// 组装数据Yamls
	var assYamls = document.getElementById("currentYamls");
	var assYamlsDiv = assYamls.getElementsByTagName("div");
	var assYamlsValue = "";
	for (var j = 0; j < assYamlsDiv.length; j++) {
		assYamlsValue += assYamlsDiv[j].outerText + ",";
	}
	document.getElementById("yamls").value = assYamlsValue.substr(0,
			assYamlsValue.length - 1);
	debugger
	var del = document.getElementById("myForms");
	del.action = "updateTemplate";
	del.submit();
}
// 选中关联Job
function setAssType(templateType) {
	var currentYamls = document.getElementById("templateTypeShow");
	var labelAllid = currentYamls.getElementsByTagName("div");
	var color = "";
	var nodes;
	for (var i = 0; i < labelAllid.length; i++) {
		var color = labelAllid[i].style.backgroundColor;
		if (color != "") {
			color = "1";
			nodes = labelAllid[i];
			break;
		}
	}
	if (color != "") {
		nodes.style.backgroundColor = "";
		document.getElementById(templateType).style.backgroundColor = "#66cccc";
	} else {
		document.getElementById(templateType).style.backgroundColor = "#66cccc";
	}
	var tem = document.getElementById("templateType");
	tem.value = templateType;
}
// 唯一名称前缀(JobName)
function uniqueName() {
	// 1校验
	var curPath = decodeURIComponent(window.document.location.href);
	if (curPath.indexOf("?") != -1) {
		curPath = curPath.substr(curPath.indexOf("=") + 1);
	}
	var jobName = document.getElementById("jobName").value;
	if (jobName != curPath) {
		getTemplateName.getTemplateName(jobName, function(t) {
			var jobAllValue = t.responseText;
			var jobName = document.getElementById("jobName");
			var errors = document.getElementById("errors");
			if (t.responseText != "null") {
				if (document.getElementById("errId") === null) {
					jobName.style.border = "1px solid red";
					var div = document.createElement("div");
					div.id = "errId";
					var textNode = document.createTextNode("名称前缀重复，请修改");
					div.appendChild(textNode);
					errors.appendChild(div);
					document.getElementById("update").disabled = true;
					document.getElementById("jobName").focus();
				}
			} else {
				if (document.getElementById("errId") != null) {
					jobName.style.border = "";
					errors.removeChild(document.getElementById("errId"));
					document.getElementById("update").disabled = false;
				}
			}
		});
	}else{
		var jobName = document.getElementById("jobName");
		if (document.getElementById("errId") != null) {
			jobName.style.border = "";
			errors.removeChild(document.getElementById("errId"));
			document.getElementById("update").disabled = false;
		}
	}
}