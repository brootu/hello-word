package com.cmbc.ite.common;

import java.io.FileNotFoundException;
import java.io.IOException;

public class Person {
	public static void main(String[] args) throws FileNotFoundException,
			IOException {
		// YamlSequence yamlSequence = Yaml.createYamlInput(
		// new File("D:\\test.yaml")).readYamlSequence();
		// String string = yamlSequence.toString();
		// int size = yamlSequence.size();
		// String[] split = string.split("stage");
		// String replace = string.replace(split[0], "");
		// System.out.println("- " + replace);
		/*
		 * YamlMapping readYamlMapping = Yaml.createYamlInput( new
		 * File("D:\\test.yaml")).readYamlMapping(); String string =
		 * readYamlMapping.toString(); System.out.println(string);
		 */
		/*
		 * String yamlValue = "< a=&apos;asd&apos;>"; yamlValue =
		 * yamlValue.replace("&apos;", "'"); System.out.println(yamlValue);
		 */
		String a = "jobs/tests1/123.xml";
		// String replace = a.replace("#", "").replace("/", ":").replace(" ",
		// "");
		// System.out.println(replace);
		// String regex = "";
		// String substring = a.substring(4, 5);
		// System.out.println(substring);
		String[] split2 = a.split(a.substring(4, 5));
		String string2 = split2[split2.length - 1];
		System.out.println(string2);
	}
}
