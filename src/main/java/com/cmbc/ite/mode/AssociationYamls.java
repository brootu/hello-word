package com.cmbc.ite.mode;

import java.util.Map;
import java.util.TreeMap;

public class AssociationYamls {
	private Map<String, AssociationYamls> AssociationMap = new TreeMap<String, AssociationYamls>();
	private String yaml;
	private String assJobs;
	public Map<String, AssociationYamls> getAssociationMap() {
		return AssociationMap;
	}
	public void setAssociationMap(Map<String, AssociationYamls> associationMap) {
		AssociationMap = associationMap;
	}
	public String getYaml() {
		return yaml;
	}
	public void setYaml(String yaml) {
		this.yaml = yaml;
	}
	public String getAssJobs() {
		return assJobs;
	}
	public void setAssJobs(String assJobs) {
		this.assJobs = assJobs;
	}
	
	
}
