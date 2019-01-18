package template;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.yaml.snakeyaml.Yaml;

public class Tests {
	public static void main(String[] args) {
		/*
		 * String a = "asdxc-可选"; String b = "asdxc可选"; String[] split =
		 * b.split("-"); // 最佳实现 if (a.indexOf("-可选") != -1) {
		 * System.out.println("这是可选"); } else { System.out.println("这是步可选"); }
		 */
		// String a = "a"
		// + "b"
		// + "";
		String yamlValue = "- stage:\r\n" + "    name: '上传镜像'\r\n"
				+ "    steps:\r\n" + "      -  name: 'CheckOut'\r\n"
				+ "         parameter:\r\n"
				+ "           -  name: SvnPath_Test\r\n"
				+ "              value: '3'\r\n"
				+ "           -  name: UserId_Test\r\n"
				+ "              value: '182be0c5cdcd5072bb1864cdee4d3d6e'\r\n"
				+ "- stage:\r\n" + "    name: '紧急出口'\r\n"
				+ "    node: 'TDEVOPS03'\r\n" + "    steps:\r\n"
				+ "      -  name: 'CheckOut'\r\n" + "         parameter:\r\n"
				+ "           -  name: SvnPath_Test\r\n"
				+ "              value: 'jobs/FOLDER_BCC_TEST/123.xml'\r\n"
				+ "           -  name: UserId_Test\r\n"
				+ "              value: 'maven2'";
		System.out.println(yamlValue);
		String yamlKey = "";
		// yamlValue = yamlValue.replace("&apos;", "'");
		// MessageInFo("替换后Value" + yamlValue);
		Yaml yaml = new Yaml();
		List list = null;
		try {
			list = (ArrayList) yaml.load(yamlValue);
		} catch (Exception e) {
			System.out.println(e.toString());
		}
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
						yamlKey += entry2.getValue() + ",";
						// MessageInFo("替换后Value" + yamlKey);
						break;
					}
				}
				break;
			}
		}
		System.out.println(yamlKey);
	}
}
