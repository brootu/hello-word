package com.cmbc.ite.mode;

import java.util.Map;
import java.util.TreeMap;

public class Template {
	private Map<String, Template> map = new TreeMap<String, Template>();
	private String yamls;
	private String userName;
	private String password;
	private String jobXml;
	private String jobUrl;
	private String assJob;
	private String assType;
	private String remarks;

	public Map<String, Template> getMap() {
		return map;
	}

	public void setMap(Map<String, Template> map) {
		this.map = map;
	}

	public String getYamls() {
		return yamls;
	}

	public void setYamls(String yamls) {
		this.yamls = yamls;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getJobXml() {
		return jobXml;
	}

	public void setJobXml(String jobXml) {
		this.jobXml = jobXml;
	}

	public String getJobUrl() {
		return jobUrl;
	}

	public void setJobUrl(String jobUrl) {
		this.jobUrl = jobUrl;
	}

	public String getAssJob() {
		return assJob;
	}

	public void setAssJob(String assJob) {
		this.assJob = assJob;
	}

	public String getAssType() {
		return assType;
	}

	public void setAssType(String assType) {
		this.assType = assType;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

}
