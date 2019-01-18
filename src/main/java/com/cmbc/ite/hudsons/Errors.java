package com.cmbc.ite.hudsons;

import java.util.Map;
import java.util.TreeMap;

public class Errors {

	private Map<String, String> error = new TreeMap<String, String>();

	public Map<String, String> getError() {
		return error;
	}

	public void setError(Map<String, String> error) {
		this.error = error;
	}

}
