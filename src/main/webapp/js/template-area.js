window.onload = function(){
	//文本域回显
	//对url进行解析
	var curPath = decodeURIComponent(window.document.location.href);
	if (curPath.indexOf("?") != -1) {
		curPath = curPath.substr(curPath.indexOf("=") + 1);
	}
	var url = decodeURIComponent(window.document.location.href).split("area")[0];
	url = url.replace("/CmbcTemplate/","");
	url = url.split("/");
	document.getElementById("folderKey").value=curPath;
	document.getElementById("curl").value=url[url.length-1];
	findTextareaName.getTextareaValue(curPath,url[url.length-1], function(t) {
		var textareValue = t.responseJSON;
		if(textareValue!=null){
			document.getElementById("area").value=textareValue;
		}else{
			return false;
		}
	});
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
		}else{
			alert("参数异常！请稍后再试或联系管理员");
		}
	});
}