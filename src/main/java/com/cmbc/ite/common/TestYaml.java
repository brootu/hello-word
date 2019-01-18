package com.cmbc.ite.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.yaml.snakeyaml.Yaml;

public class TestYaml {
	public static void main(String[] args) throws FileNotFoundException {
		Yaml yaml = new Yaml();
		File dumpFile = new File("D:\\test.yaml");
		// File file = new File(
		// "D:\test.yaml");
		// 获取test.yaml文件中的配置数据，然后转换为obj，
		Object load = yaml.load(new FileInputStream(dumpFile));
		// 也可以将值转换为Map
		List list = (ArrayList) yaml.load(new FileInputStream(dumpFile));
		for (int i = 0; i < list.size(); i++) {
			LinkedHashMap linkMap = (LinkedHashMap) list.get(i);
			Iterator iterator = linkMap.entrySet().iterator();
			while (iterator.hasNext()) {
				Map.Entry entry = (Entry) iterator.next();
				LinkedHashMap linkMap2 = (LinkedHashMap) entry.getValue();
				Iterator iterator2 = linkMap2.entrySet().iterator();
				while (iterator2.hasNext()) {
					Map.Entry entry2 = (Entry) iterator2.next();
					if (entry2.getKey().equals("name")) {
						System.out.println(entry2.getValue());
						break;
					}
				}
				break;
			}
		}
		// Iterator iter = map.entrySet().iterator();
		// while (iter.hasNext()) {
		// Map.Entry entry = (Map.Entry) iter.next();
		// String key = (String) entry.getKey();
		// Object val = entry.getValue();
		// System.out.println(key);
		// System.out.println(val);
		// }
	}
}
