package com.cmbc.ite.common;

import hudson.XmlFile;

import java.io.File;
import java.io.IOException;

public class FileTest {
	public static void main(String[] args) throws IOException {
		// Errors errors = new Errors();
		// errors.getError().put("1111111111111111111", "aaaaaaaaaaaaaaaaaa");
		// 可被读写
		// File rootDir = Jenkins.getInstance().getRootDir();
		// System.out.println(rootDir.toPath());
	}

	public static XmlFile getErrorLog() {
		// return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
		// "errors.xml"));
		return new XmlFile(new File("d:" + File.separator + "test.xml"));
	}

	/* 生成xml */
	public void createXML() throws Exception {
	}
}
