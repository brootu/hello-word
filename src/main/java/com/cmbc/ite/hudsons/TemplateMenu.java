package com.cmbc.ite.hudsons;

import hudson.Extension;
import hudson.XmlFile;
import hudson.model.Action;
import hudson.model.Descriptor.FormException;
import hudson.util.FormApply;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import javax.servlet.ServletException;

import jenkins.model.TransientActionFactory;
import jenkins.model.Jenkins;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.client.HttpResponseException;
import org.kohsuke.stapler.HttpResponse;
import org.kohsuke.stapler.StaplerRequest;
import org.kohsuke.stapler.StaplerResponse;
import org.kohsuke.stapler.bind.JavaScriptMethod;

import com.cloudbees.hudson.plugins.folder.AbstractFolder;
import com.cmbc.ite.common.InterfaceBuild;
import com.cmbc.ite.mode.AssociationJob;
import com.cmbc.ite.mode.AssociationYamls;
import com.cmbc.ite.mode.Template;
import com.cmbc.ite.mode.TemplateType;
import com.offbytwo.jenkins.JenkinsServer;

public class TemplateMenu implements Action {

	private AbstractFolder<?> folder;

	public AbstractFolder<?> getFolder() {
		return folder;
	}

	public TemplateMenu(AbstractFolder folder) {
		this.folder = folder;
	}

	/**
	 * Features：Build JobName Interface The annotation exposes this method to
	 * JavaScript proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public String getJobAllName(String selKey, String curPath)
			throws IOException, URISyntaxException {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template template = (Template) templateFile.unmarshal(this);
			Template template2 = template.getMap().get(selKey);
			String jobUrl;
			if (!"".equals(template2.getJobUrl())) {
				jobUrl = template2.getJobUrl();
			} else {
				jobUrl = curPath.replace("CmbcTemplate/", "");
			}
			JenkinsServer serverNew = serverNew(jobUrl,
					template2.getUserName(), template2.getPassword());
			Map<String, com.offbytwo.jenkins.model.Job> jobs = serverNew
					.getJobs();
			StringBuilder allJobNames = new StringBuilder();
			for (String key : jobs.keySet()) {
				// StringBuilder+=key+",";
				allJobNames.append(key + ",");
			}
			return allJobNames + selKey;
		}
		return null;
	}

	/**
	 * Features：Verify that the textarea exists JavaScript proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public String getTextareaName(String textareaName, String curPath)
			throws IOException, URISyntaxException {
		XmlFile xmlFile = new XmlFile(new File(Jenkins.getInstance()
				.getRootDir() + "//jobs//" + curPath, textareaName + ".xml"));
		if (xmlFile.exists()) {
			return "//jobs//" + curPath;
		} else {
			return null;
			// return Jenkins.getInstance().getRootDir() + "\\jobs\\" + curPath;
		}
	}

	/**
	 * Features：Verify that the textarea exists JavaScript proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public String getTextareaValue(String textareaName, String curPath)
			throws IOException, URISyntaxException {
		XmlFile xmlFile = new XmlFile(new File(Jenkins.getInstance()
				.getRootDir() + "//jobs//" + curPath, textareaName + ".xml"));
		if (xmlFile.exists()) {
			return (String) xmlFile.unmarshal(this);
		} else {
			return null;
			// return Jenkins.getInstance().getRootDir() + "\\jobs\\" + curPath;
		}
	}

	/**
	 * Features：get All Yamls The annotation exposes this method to JavaScript
	 * proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public Map<String, String> allYamls(String jobName) throws IOException,
			URISyntaxException {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template treeMod = (Template) templateFile.unmarshal(this);
			Template treeMod2 = treeMod.getMap().get(jobName);
			String[] split = treeMod2.getYamls().split(",");
			// Map<String, String> map = new TreeMap<String, String>();
			Map<String, String> map = new LinkedHashMap<String, String>();
			Integer i = 1;
			for (String string : split) {
				XmlFile associationYamlsFile = getAssociationYamlsFile();
				AssociationYamls associationYamls = (AssociationYamls) associationYamlsFile
						.unmarshal(this);
				String yaml = associationYamls.getAssociationMap().get(string)
						.getYaml();
				map.put("Stage" + i + string, yaml);
				i++;
			}
			// TODO 我记得这个功能取消掉了？
			// String[] split2 = treeMod2.getJobXml().split("；");
			// for (int j = 0; j < split2.length; j++) {
			// if (split2[j].contains("text")) {
			// String[] split3 = split2[j].split("，");
			// for (String string : split3) {
			// if (string.contains("title：")) {
			// map.put("Stage" + i + string.replace("title：", ""),
			// split2[j]);
			// i++;
			// }
			// }
			// }
			// }
			return map;
		}
		return null;
	}

	/**
	 * Features：get All Yamls The annotation exposes this method to JavaScript
	 * proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public Map<String, String> allYaml() throws IOException, URISyntaxException {
		XmlFile associationYamlsFile = getAssociationYamlsFile();
		if (associationYamlsFile.exists()) {
			AssociationYamls association = (AssociationYamls) associationYamlsFile
					.unmarshal(this);
			Map<String, AssociationYamls> associationMap = association
					.getAssociationMap();
			Iterator<Entry<String, AssociationYamls>> it = associationMap
					.entrySet().iterator();
			Map<String, String> map = new TreeMap<String, String>();
			while (it.hasNext()) {
				Entry<String, AssociationYamls> next = it.next();
				String key = next.getKey();
				if (key.indexOf(" 可选") != -1) {
					map.put(key, next.getValue().getYaml());
				}
			}
			return map;
		}
		return null;
	}

	/**
	 * Features：getYamlValue this method to JavaScript
	 * 
	 * @throws IOException
	 */
	@JavaScriptMethod
	public String getYamlValue(String yamlKey) throws IOException {
		XmlFile associationYamlsFile = getAssociationYamlsFile();
		if (associationYamlsFile.exists()) {
			AssociationYamls associationYamls = (AssociationYamls) associationYamlsFile
					.unmarshal(this);
			return associationYamls.getAssociationMap().get(yamlKey).getYaml();
		}
		return null;
	}

	/**
	 * Features：get yamlValue The annotation exposes this method to JavaScript
	 * proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public String yamlValue(String yamlValue) throws IOException,
			URISyntaxException {
		XmlFile associationYamlsFile = getAssociationYamlsFile();
		if (associationYamlsFile.exists()) {
			AssociationYamls associationYamls = (AssociationYamls) associationYamlsFile
					.unmarshal(this);
			AssociationYamls associationYamls2 = associationYamls
					.getAssociationMap().get(yamlValue);
			return associationYamls2.getYaml();
		}
		return null;
	}

	/**
	 * Features：get All JobName The annotation exposes this method to JavaScript
	 * proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public Map<String, String> allJobName(String JobType) throws IOException,
			URISyntaxException {
		XmlFile templateTypeFile = getTemplateTypeFile();
		if (templateTypeFile.exists()) {
			TemplateType templateType = (TemplateType) templateTypeFile
					.unmarshal(this);
			String jobKey = templateType.getTypeMap().get(JobType);
			String[] jobKeySplit = jobKey.split(",");
			XmlFile templateFile = getTemplateFile();
			Template template = (Template) templateFile.unmarshal(this);
			Map<String, String> map = new HashMap<String, String>();
			for (int i = 0; i < jobKeySplit.length; i++) {
				String remarks = template.getMap().get(jobKeySplit[i])
						.getRemarks();
				map.put(jobKeySplit[i], remarks);
			}
			return map;
		}
		return null;
	}

	/**
	 * Features：get allYamlName The annotation exposes this method to JavaScript
	 * proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public String allYamlName(String templateName) throws IOException,
			URISyntaxException {
		// XmlFile xml = getConfigFile();
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			XmlFile yamlsFile = getAssociationYamlsFile();
			// 判断是否存在关联Yaml
			if (yamlsFile.exists()) {
				StringBuilder yamlsAssembly = new StringBuilder();
				Template unmarshal = (Template) templateFile.unmarshal(this);
				// TreeMod unmarshal = (TreeMod) xml.unmarshal(this);
				Map<String, Template> map = unmarshal.getMap();
				// Map<String, TreeMod> map = unmarshal.getMap();
				Template treeMod = map.get(templateName);
				// 将Yamls至唯一化
				String yamls = yamlsAssembly(treeMod.getYamls());
				AssociationYamls yamlsValue = (AssociationYamls) yamlsFile
						.unmarshal(this);
				Map<String, AssociationYamls> associationMap = yamlsValue
						.getAssociationMap();
				String[] yamlSplit = yamls.split(",");// 此处加入判断数据不合法
				for (String string : yamlSplit) {
					if (associationMap.get(string) == null) {
						String repeatYamls = "";// Yamls值
						String count = "";// Yamls值后缀
						while (string.length() > 0) {
							count += string.replace(
									string.substring(0, string.length() - 1),
									"");// 存在bug
							string = string.substring(0, string.length() - 1);
							if (associationMap.get(string) != null) {
								// ArrayList<String> arrayList =
								// associationMap.get(string);
								AssociationYamls arrayList = associationMap
										.get(string);
								repeatYamls = arrayList.getYaml();
								break;
							}
						}
						// 对重复Yamls操作
						if ("".equals(repeatYamls)) {
							return null;// This is not a best practice
							// return FormApply.success("error");
						} else {
							String[] split = repeatYamls.split("；");
							for (String string2 : split) {
								if (string2.contains("show")) {
									repeatYamls = repeatYamls.replace(string2,
											string2);
								}
								if (string2.contains("title")) {
									String string2s = string2;
									String[] split2 = string2.split("，");
									for (String string3 : split2) {
										if (string3.contains("title")) {
											string2 = string2.replace(string3,
													string3 + count);
										}
									}
									repeatYamls = repeatYamls.replace(string2s,
											string2);
								}
							}
							yamlsAssembly.append(repeatYamls);
							yamlsAssembly.append("\n---\n");
						}
					} else {
						yamlsAssembly.append(associationMap.get(string)
								.getYaml());
						yamlsAssembly.append("\n---\n");
					}
				}
				return yamlsAssembly.toString();
			}
		}
		return null;
	}

	/**
	 * Features：IndexList
	 * 
	 * @return select list
	 * @throws IOException
	 *             file read exception
	 */
	public Template getIndexList() throws IOException {
		// XmlFile xml = getConfigFile();
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template unmarshal = (Template) templateFile.unmarshal(this);
			// 重新组装Yaml
			Map<String, Template> map = unmarshal.getMap();
			Iterator<Entry<String, Template>> it = map.entrySet().iterator();
			while (it.hasNext()) {
				StringBuilder yamlsAssembly = new StringBuilder();
				XmlFile yamlsFile = getAssociationYamlsFile();
				if (yamlsFile.exists()) {
					Entry<String, Template> entry = it.next();
					Template treeModValue = entry.getValue();
					// 将Yamls至唯一化
					String yamls = yamlsAssembly(treeModValue.getYamls());
					AssociationYamls yamlsValue = (AssociationYamls) yamlsFile
							.unmarshal(this);
					// Map<String, String> associationMap =
					// Map<String, ArrayList<String>> associationMap =
					// yamlsValue.getAssociationMap();
					Map<String, AssociationYamls> associationMap = yamlsValue
							.getAssociationMap();
					String[] yamlSplit = yamls.split(",");// 此处加入判断数据不合法
					for (String string : yamlSplit) {
						if (associationMap.get(string) == null) {
							String repeatYamls = "";// Yamls值
							String count = "";// Yamls值后缀
							while (string.length() > 0) {
								count += string.replace(string.substring(0,
										string.length() - 1), "");// 存在bug
								string = string.substring(0,
										string.length() - 1);
								if (associationMap.get(string) != null) {
									// ArrayList<String> arrayList =
									// associationMap.get(string);
									AssociationYamls arrayList = associationMap
											.get(string);
									// repeatYamls = arrayList.get(0);
									repeatYamls = arrayList.getYaml();
									break;
								}
							}
							// 对重复Yamls操作
							if ("".equals(repeatYamls)) {
								return null;// This is not a best practice
								// return FormApply.success("error");
							} else {
								String[] split = repeatYamls.split("；");
								for (String string2 : split) {
									if (string2.contains("show")) {
										repeatYamls = repeatYamls.replace(
												string2, string2);
									}
									if (string2.contains("title")) {
										String string2s = string2;
										String[] split2 = string2.split("，");
										for (String string3 : split2) {
											if (string3.contains("title")) {
												string2 = string2.replace(
														string3, string3
																+ count);
											}
										}
										repeatYamls = repeatYamls.replace(
												string2s, string2);
									}
								}
								yamlsAssembly.append(repeatYamls);
								yamlsAssembly.append("\n---\n");
							}
						} else {
							yamlsAssembly.append(associationMap.get(string)
									.getYaml());
							yamlsAssembly.append("\n---\n");
						}
					}
					// yamlsAssembly.substring(0,yamlsAssembly.length()-5);
					treeModValue.setYamls(yamlsAssembly.toString());
				}
			}

			return unmarshal;
		}
		return null;
	}

	public String yamlsAssembly(String yamls) {
		String[] split = yamls.split(",");
		StringBuilder Yamls = new StringBuilder();
		int count = 1;
		for (int i = 0; i < split.length; i++) {
			for (int j = i + 1; j < split.length; j++) {
				if (split[i].equals(split[j])) {
					split[j] = split[j] + count;
					count++;
				}
			}
			Yamls.append(split[i]);
			Yamls.append(",");
		}
		return Yamls.substring(0, Yamls.length() - 1);
	}

	/**
	 * 
	 * @throws IOException
	 */
	@JavaScriptMethod
	public String areaSetting(String url, String folderKey, String folderValue)
			throws IOException {
		// String area = req.getParameter("area");
		// String curl = req.getParameter("curl");
		// String folderKey = req.getParameter("folderKey");
		// 参数创建或修改
		if (folderValue != null) {
			XmlFile xmlFile = new XmlFile(new File(Jenkins.getInstance()
					.getRootDir() + "//jobs//" + url, folderKey + ".xml"));
			try {
				xmlFile.write(folderValue);
			} catch (IOException e) {
				errorMesIn(e.toString(), "FolderError", folderKey, folderKey);
				return null;
			}
			return "ok";
		} else {
			return null;
		}
	}

	/**
	 * 读写关联Yamls
	 * 
	 * @return
	 */
	public XmlFile getAssociationYamlsFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"associationYamls.xml"));
	}

	/**
	 * caveat !!! 功能暂停使用 Features：get Select Option(Index.jelly)
	 * 
	 * @return Options
	 * @throws IOException
	 *             file read exception
	 */
	/*
	 * public SelectOptions getOptions() throws IOException { XmlFile xml =
	 * getConfigSelect(); if (xml.exists()) { SelectOptions selOpt =
	 * (SelectOptions) xml.unmarshal(this); return selOpt;// problem:存在空值
	 * 若空是否抛异常？ 暂不处理 但要解决的problem } return null; }
	 */

	/**
	 * caveat !!! 功能暂停使用 Features：template selectSet
	 * 
	 * @param req
	 *            this is req
	 * @param rsp
	 *            this is rsp
	 * @return write Select Option Value
	 * @throws IOException
	 *             file read exception
	 */
	/*
	 * public boolean doSelectKey(StaplerRequest req, StaplerResponse rsp)
	 * throws IOException { String selKey = req.getParameter("selectValue");
	 * XmlFile xml = getConfigFile(); TreeMod unmarshal = (TreeMod)
	 * xml.unmarshal(this); String selValue =
	 * unmarshal.getMap().get(selKey).getYamls(); SelectOptions selectOption =
	 * new SelectOptions(); String[] split = selValue.split("；"); for (String
	 * string : split) { if (string.contains("text") ||
	 * string.contains("select") || string.contains("display") ||
	 * string.contains("show")) { SelectOptions selectOption2 = new
	 * SelectOptions(); Map<String, SelectOptions> map = selectOption.getMap();
	 * if (string.contains("，")) { String[] split2 = string.split("，"); for (int
	 * i = 0; i < split2.length; i++) { if (split2[i].contains("text") ||
	 * split2[i].contains("select")) { String[] split3 = split2[i].split(":");
	 * selectOption2.setType(split3[1].replace("'", "")); } if
	 * (split2[i].contains("selValue")) { String[] split3 = split2[i]
	 * .replace("selValue:", "").split(":"); for (String string2 : split3) {
	 * selectOption2.getSelList().add(string2); } } if
	 * (split2[i].contains("title")) {
	 * selectOption2.setTitle(split2[i].replace("title:", "")); } if
	 * (split2[i].contains("help")) { selectOption2
	 * .setHelp(split2[i].replace("help", "")); } if
	 * (split2[i].contains("description")) {
	 * selectOption2.setDescription(split2[i].replace( "description", "")); } }
	 * } if (string.contains("display")) {
	 * selectOption2.setDisplay(string.replace("display:", "")); } if
	 * (string.contains("show")) { selectOption2.setShow(string.replace("show:",
	 * "")); } map.put(string, selectOption2); } }
	 * getConfigSelect().write(selectOption); return true; }
	 */
	/**
	 * 
	 * @param req
	 * @param rsp
	 * @return
	 * @throws IOException
	 * @throws ServletException
	 * @throws FormException
	 */
	public HttpResponse doScriptSubmit(StaplerRequest req, StaplerResponse rsp)
			throws ServletException, IOException, FormException {
		// CredentialsBuild credentialsBuild = new CredentialsBuild();
		// String credent = credentialsBuild.toCredent(req);
		// System.out.println(credent);
		// int localPort = req.getLocalPort();
		// String servletPath = req.getServletPath();
		// String realPath = req.getServletContext().getRealPath("/");
		String scheme = req.getScheme();// http
		String serverName = req.getServerName();// localhost
		int serverPort = req.getServerPort();// 8090
		// System.out.println(scheme);
		// System.out.println(serverName);
		// System.out.println(serverPort);
		return FormApply.success("error");
	}

	public String resolveYaml(StaplerRequest req, String yaml, Integer integer,
			Template treeMod2) throws IOException {
		String yamlsValue = yaml;
		String[] split2 = yaml.split("；");
		for (String string2 : split2) {
			if (string2.contains("show")) {
				yamlsValue = yamlsValue.replace(string2, "");
				continue;
			}
			if (string2.contains("detectionSvn")) {
				// 获取svn参数 创建凭据Job将值输入 获取返回值替换
				String[] split3 = string2.split("，");
				String paraText = null;
				String key = null;
				for (String string3 : split3) {
					if (string3.contains("title")) {
						String userName = string3.replace("title：", "_."
								+ integer);
						// String password = string3.replace("title：", "_."
						// + integer + "pwd");
						String svnUser = req.getParameter(userName);
						String svnPwd = req
								.getParameter("_." + integer + "pwd");
						paraText = InterfaceBuild.tryCallCreateCredentials(req,
								svnUser, svnPwd, treeMod2);
						// md5Hex = paraText;
					}
					if (string3.contains("detectionSvn")) {
						key = string3;
					}
				}
				if (paraText != null) {
					yamlsValue = yamlsValue.replace(string2,
							key.replace("detectionSvn", paraText));
				}
			}
			if (string2.contains("text")) {
				String[] split3 = string2.split("，");
				String paraText = null;
				String key = null;
				for (String string3 : split3) {
					if (string3.contains("title")) {
						String replace = string3.replace("title：", "_."
								+ integer);
						paraText = req.getParameter(replace);
					}
					if (string3.contains("text")) {
						key = string3;
					}
				}
				if (paraText != null) {
					yamlsValue = yamlsValue.replace(string2,
							key.replace("text", paraText));
				}
			}
			if (string2.contains("area")) {
				String[] split3 = string2.split("，");
				String paraText = null;
				String key = null;
				String fileValue = null;
				// TODO 硬编码
				String curl = new String(req.getRequestURL());
				String[] curlSplit = curl.replace(
						"/CmbcTemplate/templateSubmit", "").split("/");
				String folder = curlSplit[curlSplit.length - 1];
				for (String string3 : split3) {
					if (string3.contains("title")) {
						String replace = string3.replace("title：", "_."
								+ integer);
						paraText = req.getParameter(replace);
						fileValue = req.getParameter(replace + "area");
					}
					if (string3.contains("area")) {
						key = string3;
					}
				}
				if (paraText != null) {
					yamlsValue = yamlsValue.replace(
							string2,
							key.replace("area", "jobs/" + folder + "/"
									+ paraText + ".xml"));
				}
				// if (fileValue != null) {
				// XmlFile xmlFile = new XmlFile(new File(Jenkins
				// .getInstance().getRootDir() + "//jobs//" + folder,
				// paraText + ".xml"));
				// xmlFile.write(fileValue);
				// }
			}
			if (string2.contains("select")) {
				String[] split3 = string2.split("，");
				String paraSel = null;
				String key = null;
				for (String string3 : split3) {
					if (string3.contains("title")) {
						String replace = string3.replace("title：", "_."
								+ integer);
						paraSel = req.getParameter(replace);
					}
					if (string3.contains("select")) {
						key = string3;
					}
				}
				if (paraSel != null) {
					yamlsValue = yamlsValue.replace(string2,
							key.replace("select", paraSel));
				}
			}
		}
		return yamlsValue;
	}

	/**
	 * Features：template submit
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return converts success
	 * @throws IOException
	 *             file read exception
	 */
	public HttpResponse doTemplateSubmit(StaplerRequest req, StaplerResponse rsp)
			throws IOException {
		XmlFile associationYamlsFile = getAssociationYamlsFile();
		if (associationYamlsFile.exists()) {
			String templateKey = req.getParameter("yamlValues");
			XmlFile templateFile = getTemplateFile();
			Template treeMod = (Template) templateFile.unmarshal(this);
			Template treeMod2 = treeMod.getMap().get(templateKey);
			AssociationYamls associationYamls = (AssociationYamls) associationYamlsFile
					.unmarshal(this);
			StringBuilder yamlValue = new StringBuilder();
			String yamlKey = req.getParameter("stageKey");
			String[] stageValue = req.getParameter("stageValue").split(",");
			String[] split = yamlKey.split(",");
			for (int i = 0; i < split.length; i++) {
				String yaml = associationYamls.getAssociationMap()
						.get(split[i]).getYaml();
				String resolveYaml = resolveYaml(req, yaml,
						Integer.valueOf(stageValue[i]) + 1, treeMod2);
				yamlValue.append(resolveYaml);
				yamlValue.append("\n");
			}
			String yamls = yamlValue.toString().replace("；", "")
					.replace("&", "&amp;");
			if (treeMod2.getJobXml() != null) {
				// 去除template JobName所有空格
				String jobName = req.getParameter("_.jobName").replace(" ", "");
				jobName = templateKey + jobName;
				String jobXml = treeMod2.getJobXml();
				// Assembly JobXml
				jobXml = jobXml.replace("；yaml；", yamls);
				String jobUrl;
				if (!"".equals(treeMod2.getJobUrl())) {
					jobUrl = treeMod2.getJobUrl();
				} else {
					String string = new String(req.getRequestURL());
					jobUrl = string.replace("CmbcTemplate/templateSubmit", "");
				}
				JenkinsServer jenkinsServer = null;
				JenkinsServer serverNew = null;
				try {
					serverNew = serverNew(jobUrl, treeMod2.getUserName(),
							treeMod2.getPassword());
					jenkinsServer = serverNew(jobUrl, treeMod2.getUserName(),
							treeMod2.getPassword());
					jenkinsServer.createJob(jobName, jobXml, true);
				} catch (URISyntaxException e) {
					errorMesIn(e.toString(), ";" + treeMod2.getUserName(), ";"
							+ jobUrl, ";" + jobName);
					return FormApply.success("error");
				} catch (HttpResponseException e) {
					errorMesIn(e.toString(), ";" + treeMod2.getUserName(), ";"
							+ jobUrl, ";" + jobName + "JobXml" + jobXml);
					return FormApply.success("error");
				}
				// Create templateJob
				String treeToMoney = treeMod2.getAssJob();
				AssociationJob assJob = null;
				if (!"".equals(treeToMoney) & treeToMoney != null) {
					XmlFile association = getAssociationJobFile();
					assJob = (AssociationJob) association.unmarshal(this);
					String[] split3 = treeToMoney.split(",");
					// Create AssociationJob
					for (int i = 0; i < split3.length; i++) {
						String assJobXml = assJob.getAssociationMap().get(
								split3[i]);
						try {
							serverNew.createJob(split3[i], assJobXml, true);
						} catch (HttpResponseException e) {
							errorMesIn(e.toString() + ";AssociationJobName:"
									+ split3[i], ";" + treeMod.getUserName(),
									";" + jobUrl, ";" + jobName);
						}
					}
				}
				String[] yamlSplit = treeMod2.getYamls().split(",");
				for (String string : yamlSplit) {
					String assJobs = associationYamls.getAssociationMap()
							.get(string).getAssJobs();
					if (!"".equals(assJobs) & treeToMoney != null) {
						try {
							serverNew.createJob(assJobs, assJob
									.getAssociationMap().get(assJobs), true);
						} catch (HttpResponseException e) {
							errorMesIn(e.toString() + ";AssociationYamlName:"
									+ yamlKey, ";" + treeMod.getUserName(), ";"
									+ jobUrl, ";" + jobName);
						}
					}
				}
				return FormApply.success("../");
			}
		}
		return null;
	}

	private String Credential(String user, String pwd, Template treeMod2,
			StaplerRequest req) throws IOException, URISyntaxException {
		String jobUrl;
		if (!"".equals(treeMod2.getJobUrl())) {
			jobUrl = treeMod2.getJobUrl();
		} else {
			String string = new String(req.getRequestURL());
			jobUrl = string.replace("CmbcTemplate/templateSubmit", "");
		}

		String jobXml = credential_JobXml();
		String md5Hex = DigestUtils.md5Hex(user + pwd);
		String script = credential_Script(user, pwd, jobUrl,
				treeMod2.getUserName(), treeMod2.getPassword(), md5Hex);
		jobXml = jobXml.replace("；Credential；", script);
		// 设置Md5值
		JenkinsServer jenkinsServer = serverNew(jobUrl, treeMod2.getUserName(),
				treeMod2.getPassword());
		try {
			jenkinsServer.createJob(md5Hex, jobXml, true);
			jenkinsServer.getJob(md5Hex).build();
		} catch (HttpResponseException e) {
			errorMesIn(e.toString(), ";createCredential;" + jobUrl, ";",
					treeMod2.getUserName());
			return null;
		}
		return md5Hex;
	}

	private String credential_Script(String svnUser, String svnPwd,
			String jobUrl, String userName, String password, String md5Hex) {
		String script = "node('master') {\n" + "   sh '''\n"
				+ "   curl -X POST 'http://"
				+ userName
				+ ":"
				+ password
				+ "@"
				+ jobUrl.replace("http://", "")
				+ "credentials/store/folder/domain/_/createCredentials' \\\n"
				+ "--data-urlencode 'json={\n"
				+ "  \"\": \"0\",\n"
				+ "  \"credentials\": {\n"
				+ "    \"scope\": \"GLOBAL\",\n"
				+ "    \"username\": \""
				+ svnUser
				+ "\",\n"
				+ "    \"password\": \""
				+ svnPwd
				+ "\",\n"
				+ "    \"description\": \"System creation\",\n"
				+ "    \"id\": \""
				+ md5Hex
				+ "\",\n"
				+ "    \"$class\": \"com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl\"\n"
				+ "  }\n" + "}'\n" + "   '''\n" + "}";
		return script;
	}

	private String credential_JobXml() {
		String jobXml = "<?xml version='1.1' encoding='UTF-8'?>"
				+ "<flow-definition plugin='workflow-job@2.25'>"
				+ "  <actions/>"
				+ "  <description></description>"
				+ "  <keepDependencies>false</keepDependencies>"
				+ "  <properties>"
				+ "    <io.fabric8.jenkins.openshiftsync.BuildConfigProjectProperty plugin='openshift-sync@1.0.28'>"
				+ "      <uid></uid>"
				+ "      <namespace></namespace>"
				+ "      <name></name>"
				+ "      <resourceVersion></resourceVersion>"
				+ "    </io.fabric8.jenkins.openshiftsync.BuildConfigProjectProperty>"
				+ "  </properties>"
				+ "  <definition class='org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition' plugin='workflow-cps@2.55'>"
				+ "    <script>；Credential；</script>"
				+ "    <sandbox>false</sandbox>" + "  </definition>"
				+ "  <triggers/>" + "  <disabled>false</disabled>"
				+ "</flow-definition>";
		return jobXml;
	}

	/**
	 * Features：template converts
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return converts success
	 * @throws IOException
	 *             file read exception
	 * @throws URISyntaxException
	 *             interface buill exception
	 */
	public HttpResponse doConverts(StaplerRequest req, StaplerResponse rsp)
			throws IOException, URISyntaxException {
		// XmlFile xml = getConfigFile();
		XmlFile templateFile = getTemplateFile();
		// 判定是否存在此xml文件
		if (templateFile.exists()) {
			Template unmarshal = (Template) templateFile.unmarshal(this);
			Template treeMod = unmarshal.getMap().get(
					req.getParameter("selKey"));
			// String yamlsStage =
			// 将Yamls至唯一化
			String yamlsStage = yamlsAssembly(treeMod.getYamls());
			// Yamls重组
			String yamls = "";
			StringBuilder yamlsAssembly = new StringBuilder();
			XmlFile yamlsFile = getAssociationYamlsFile();
			if (yamlsFile.exists()) {
				AssociationYamls yamlsValue = (AssociationYamls) yamlsFile
						.unmarshal(this);
				// Map<String, ArrayList<String>> associationMap =
				// yamlsValue.getAssociationMap();
				Map<String, AssociationYamls> associationMap = yamlsValue
						.getAssociationMap();
				String[] yamlSplit = yamlsStage.split(",");
				for (String string : yamlSplit) {
					if (associationMap.get(string) == null) {
						String repeatYamls = "";// Yamls值
						String count = "";// Yamls值后缀
						while (string.length() >= 0) {
							count += string.replace(
									string.substring(0, string.length() - 1),
									"");
							string = string.substring(0, string.length() - 1);
							if (associationMap.get(string) != null) {
								// ArrayList<String> arrayList =
								// associationMap.get(string);
								// repeatYamls = arrayList.get(0);
								AssociationYamls arrayList = associationMap
										.get(string);
								repeatYamls = arrayList.getYaml();
								break;
							}
						}
						// 对重复Yamls操作
						if ("".equals(repeatYamls)) {
							return null;
						} else {
							String[] split = repeatYamls.split("；");
							for (String string2 : split) {
								if (string2.contains("show")) {
									repeatYamls = repeatYamls.replace(string2,
											string2);
								}
								if (string2.contains("title")) {
									String string2s = string2;
									String[] split2 = string2.split("，");
									for (String string3 : split2) {
										if (string3.contains("title")) {
											string2 = string2.replace(string3,
													string3 + count);
										}
									}
									repeatYamls = repeatYamls.replace(string2s,
											string2);
								}
							}
							yamlsAssembly.append(repeatYamls);
							yamlsAssembly.append("\n---\n");
						}
					} else {
						yamlsAssembly.append(associationMap.get(string));
						yamlsAssembly.append("\n---\n");
					}
				}
			}
			yamls = yamlsAssembly.toString();
			String[] split = yamls.toString().split("；");
			// yaml组装
			for (String string : split) {
				if (string.contains("show")) {
					yamls = yamls.replace(string, "");
				}
				if (string.contains("text")) {
					String[] split2 = string.split("，");
					String paraText = null;
					String key = null;
					for (String string2 : split2) {
						if (string2.contains("title")) {
							String replace = string2.replace("title：", "_.");
							paraText = req.getParameter(replace);
						}
						if (string2.contains("text")) {
							key = string2;
						}
					}
					if (paraText != null) {
						yamls = yamls.replace(string,
								key.replace("text", paraText));
					}
				}
				if (string.contains("select")) {
					String[] split2 = string.split("，");
					String paraSel = null;
					String key = null;
					for (String string2 : split2) {
						if (string2.contains("title")) {
							String replace = string2.replace("title：", "_.");
							paraSel = req.getParameter(replace);
						}
						if (string2.contains("select")) {
							key = string2;
						}
					}
					if (paraSel != null) {
						yamls = yamls.replace(string,
								key.replace("select", paraSel));
					}
					// if(key.contains("'")){
					// yamls = yamls.replace(string, key.replace("'", ":") +
					// "'"+paraSel+"'");
					// }else{
					// yamls = yamls.replace(string, key + ":"+ paraSel);
					// }
				}
			}
			yamls = yamls.replace("；", "").replace("，", "");
			yamls = yamls.substring(0, yamls.length() - 5);
			if (treeMod.getJobXml() != null) {
				// 1创建job 2组装数据：a:xml b:job名称
				String jobName = req.getParameter("_.jobName");
				// TODO 更改JobName信息中，调试Manage
				// jobName = treeMod.getJobName() + jobName;
				String jobXml = treeMod.getJobXml();
				String[] split2 = treeMod.getJobXml().split("；");
				for (String string2 : split2) {
					if (string2.contains("text")) {
						// 建议加判断 增强可用性
						if (string2.split("，").length > 1) {
							String paraText = null;
							String[] split3 = string2.split("，");
							for (String string3 : split3) {
								if (string3.contains("title")) {
									String replace = string3.replace("title：",
											"_.");
									paraText = req.getParameter(replace);
								}
							}
							// 替换参数
							if (paraText != null) {
								jobXml = jobXml.replace(string2, paraText);
							}
						}
					}
				}
				jobXml = jobXml.replace("；yaml；", yamls).replace("；", "");
				String jobUrl;
				if (!"".equals(treeMod.getJobUrl())) {
					jobUrl = treeMod.getJobUrl();
				} else {
					String string = new String(req.getRequestURL());
					jobUrl = string.replace("CmbcTemplate/converts", "");
				}
				// List<String> treeToMoney = treeMod.getTreeToMoney();
				String treeToMoney = treeMod.getAssJob();
				JenkinsServer jenkinsServer = serverNew(jobUrl,
						treeMod.getUserName(), treeMod.getPassword());
				try {
					jenkinsServer.createJob(jobName, jobXml, true);
					String[] split3 = treeToMoney.split(",");
					for (String string : split3) {
						XmlFile association = getAssociationJobFile();
						// 根据Key获取value调用接口
						AssociationJob assoc = (AssociationJob) association
								.unmarshal(this);
						Map<String, String> map = assoc.getAssociationMap();
						String assJobXml = map.get(string);
						JenkinsServer serverNew = serverNew(jobUrl,
								treeMod.getUserName(), treeMod.getPassword());
						try {
							serverNew.createJob(string, assJobXml, true);
						} catch (HttpResponseException e) {
							errorMesIn(e.toString() + ";AssociationJobName:"
									+ string, ";" + treeMod.getUserName(), ";"
									+ jobUrl, ";" + jobName);
						}
					}
				} catch (HttpResponseException e) {
					errorMesIn(e.toString(), ";" + treeMod.getUserName(), ";"
							+ jobUrl, ";" + jobName);
					return FormApply.success("error");
				}
				// 创建成功：返回url:
				return FormApply.success("../");
			}
		}
		return null;
	}

	public JenkinsServer serverNew(String jobUrl, String UserName, String Pwd)
			throws URISyntaxException {
		JenkinsServer jenkinsServer = new JenkinsServer(new URI(jobUrl),
				UserName, Pwd);
		return jenkinsServer;
	}

	public void errorMesIn(String e, String user, String url, String JobName)
			throws IOException {
		String Nowtime = new SimpleDateFormat("yy-MM-dd HH:mm:ss")
				.format(new Date());
		XmlFile errXml = getErrorLog();
		if (errXml.exists()) {
			Errors errXmls = (Errors) errXml.unmarshal(this);
			Map<String, String> error = errXmls.getError();
			error.put(Nowtime, e.toString() + ";  userName：" + user + ";  Url:"
					+ url + ";  JobName:" + JobName);
			getErrorLog().write(errXmls);
		} else {
			Errors err = new Errors();
			err.getError().put(
					Nowtime,
					e.toString() + ";  userName：" + user + ";  Url:" + url
							+ ";  JobName:" + JobName);
			getErrorLog().write(err);
			// File f = new File("d:" + File.separator + "test.txt");
			// Writer out = null;
			// out = new FileWriter(f);
			// getErrorLog().writeRawTo(out);
		}
	}

	/**
	 * Features：get TemplateTypes
	 * 
	 * @return select allValue
	 * @throws IOException
	 *             file read exception
	 */
	public Map<String, String> getTemplateType() throws IOException {
		XmlFile templateTypeFile = getTemplateTypeFile();
		if (templateTypeFile.exists()) {
			TemplateType templateType = (TemplateType) templateTypeFile
					.unmarshal(this);
			return templateType.getTypeMap();
		}
		return null;
	}

	/**
	 * Features：get Association Yamls All
	 * 
	 * @return select allValue
	 * @throws IOException
	 *             file read exception
	 */
	public Map<String, AssociationYamls> associationYamls() throws IOException {
		XmlFile xml = getAssociationYamlsFile();
		if (xml.exists()) {
			AssociationYamls associationYamls = (AssociationYamls) xml
					.unmarshal(this);
			return associationYamls.getAssociationMap();
		}
		return null;
	}

	public XmlFile getTemplateFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"template.xml"));
	}

	public XmlFile getTemplateTypeFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"templateType.xml"));
	}

	public XmlFile getAssociationJobFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"associationJob.xml"));
	}

	/*
	 * public XmlFile getConfigValueFile() { return new XmlFile(new
	 * File(Jenkins.getInstance().getRootDir(), "configValue.xml")); }
	 */

	public XmlFile getErrorLog() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"errors.xml"));
	}

	@Override
	public String getDisplayName() {
		return "CMBC配置模板";
	}

	@Override
	public String getIconFileName() {
		return "document.png";
	}

	@Override
	public String getUrlName() {
		return "CmbcTemplate";
	}

	@Extension(optional = true)
	@SuppressWarnings("rawtypes")
	public static class ActionFactory extends
			TransientActionFactory<AbstractFolder> {
		@Override
		public Class<AbstractFolder> type() {
			return AbstractFolder.class;
		}

		@Override
		public Collection<? extends Action> createFor(AbstractFolder target) {
			return Collections.singleton(new TemplateMenu(target));
		}
	}
}