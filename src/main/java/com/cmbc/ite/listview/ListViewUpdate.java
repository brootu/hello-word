package com.cmbc.ite.listview;

import hudson.Extension;
import hudson.XmlFile;
import hudson.model.Action;
import hudson.model.Job;
import hudson.util.FormApply;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import jenkins.model.TransientActionFactory;
import jenkins.model.Jenkins;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.kohsuke.stapler.HttpResponse;
import org.kohsuke.stapler.StaplerRequest;
import org.kohsuke.stapler.StaplerResponse;
import org.kohsuke.stapler.bind.JavaScriptMethod;
import org.yaml.snakeyaml.Yaml;

import com.cmbc.ite.hudsons.Errors;
import com.cmbc.ite.mode.AssociationYamls;
import com.cmbc.ite.mode.Template;
import com.offbytwo.jenkins.JenkinsServer;

public class ListViewUpdate implements Action {

	private final Job job;

	ListViewUpdate(Job job) {
		this.job = job;
	}

	public Job getJob() {
		return job;
	}

	@Override
	public String getIconFileName() {
		return "document.png";
	}

	@Override
	public String getDisplayName() {
		return "CMBC配置";
	}

	@Override
	public String getUrlName() {
		return "CmbcTemYamSet";
	}

	/**
	 * Features：Template User Update
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return ../ file read exception
	 * @throws IOException
	 * @throws URISyntaxException
	 * @throws DocumentException
	 */
	public HttpResponse doTemplateUpdate(StaplerRequest req, StaplerResponse rsp)
			throws IOException, URISyntaxException, DocumentException {
		String[] split = req.getParameter("stageName").split(",");
		XmlFile associationYamlsFile = getAssociationYamlsFile();
		AssociationYamls associationYamls = (AssociationYamls) associationYamlsFile
				.unmarshal(this);
		String temName = req.getParameter("templateKey");
		XmlFile templateFile = getTemplateFile();
		Template template = (Template) templateFile.unmarshal(this);
		// getTemplateName
		String templateName = StringUtils.substringBeforeLast(temName, "_");
		Template treeMod = template.getMap().get(templateName + "_");
		Integer number = 0;
		StringBuilder stringBuilderYaml = new StringBuilder();
		String yamlsValue = "";
		for (String string : split) {
			if (string.equals("选择master")) {
				// _.0master
				String master = req.getParameter("_." + number + "master");
				number++;
				String execMode = req.getParameter("_." + number + "execMode");
				number++;
				StringBuffer stageTitle = new StringBuffer();
				stageTitle.append("masterNode:'" + master + "'");
				stageTitle.append("\n");
				stageTitle.append("#Normal/ CheckOut / DetialLog");
				stageTitle.append("\n");
				stageTitle.append("execMode: '" + execMode + "");
				stageTitle.append("\n");
				stageTitle.append("metaData:");
				stageTitle.append("\n");
				stringBuilderYaml.append(stageTitle);
				continue;
			}
			yamlsValue = associationYamls.getAssociationMap().get(string)
					.getYaml();
			String[] split2 = yamlsValue.split("；");
			for (String string2 : split2) {
				if (string2.contains("show")) {
					yamlsValue = yamlsValue.replace(string2, "");
				}
				// 获取svn参数 创建凭据Job将值输入 获取返回值替换
				if (string2.contains("detectionSvn")) {
					String[] split3 = string2.split("，");
					String paraText = null;
					String key = null;
					for (String string3 : split3) {
						if (string3.contains("title")) {
							String replace = string3.replace("title：", "_."
									+ number);
							paraText = req.getParameter(replace);
							number++;
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
									+ number);
							paraText = req.getParameter(replace);
							number++;
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
					String areaValue = null;
					for (String string3 : split3) {
						if (string3.contains("title")) {
							String replace = string3.replace("title：", "_."
									+ number);
							paraText = req.getParameter(replace);
							areaValue = req.getParameter(replace + "area");
							number++;
						}
						if (string3.contains("area")) {
							key = string3;
						}
					}
					if (paraText != null) {
						String folder = req.getParameter("folder");
						yamlsValue = yamlsValue.replace(
								string2,
								key.replace("area", "jobs/" + folder + "/"
										+ paraText + ".xml"));
						// 进行areaUpdate 需要参数 folder areaKey areaValye
						XmlFile xmlFile = new XmlFile(new File(Jenkins
								.getInstance().getRootDir()
								+ "//jobs//"
								+ folder, paraText + ".xml"));
						xmlFile.write(areaValue);
					}
				}
				if (string2.contains("select")) {
					String[] split3 = string2.split("，");
					String paraSel = null;
					String key = null;
					for (String string3 : split3) {
						if (string3.contains("title")) {
							String replace = string3.replace("title：", "_."
									+ number);
							paraSel = req.getParameter(replace);
							number++;
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
			stringBuilderYaml.append(yamlsValue);
			stringBuilderYaml.append("\n");
		}
		// Yaml值组装完成
		String yamls = stringBuilderYaml.toString().replace("；", "");
		// 接口调用获取参数替换Yaml参数
		// 接口调用获取Yaml
		String curl = req.getParameter("thisUrl");
		JenkinsServer jenkinsServer = serverNew(curl, treeMod.getUserName(),
				treeMod.getPassword());
		String jobXml = jenkinsServer.getJobXml(temName);
		String newJobXml = "";
		// Yaml转换
		try {
			Document dom = DocumentHelper.parseText(jobXml);
			List list = dom
					.selectNodes("/flow-definition/properties/hudson.model.ParametersDefinitionProperty/parameterDefinitions/hudson.model.TextParameterDefinition/defaultValue");
			Iterator iter = list.iterator();
			while (iter.hasNext()) {
				Element element = (Element) iter.next();
				element.setText(yamls);// 设置相应的内容
			}
			// 转String
			newJobXml = dom.asXML();
		} catch (Exception e) {
			e.printStackTrace();
			return FormApply.success("error");
		}
		if (newJobXml != "") {
			jenkinsServer.updateJob(temName, newJobXml, true);
			return FormApply.success("../");
		} else {
			return FormApply.success("error");
		}
	}

	/**
	 * Features：Ajax getJobYamlValue The annotation exposes this method to
	 * JavaScript proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public String jobYamlValue(String jobName, String curl) throws IOException,
			URISyntaxException {
		String[] jobNameSplit = jobName.split("_");
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template template = (Template) templateFile.unmarshal(this);
			String templateName = jobName.replace(
					jobNameSplit[jobNameSplit.length - 1], "");
			Template templateValue = template.getMap().get(templateName);
			if (templateValue != null) {
				curl = curl.replace("CmbcTemYamSet/", "");
				JenkinsServer jenkinsServer = serverNew(curl,
						templateValue.getUserName(),
						templateValue.getPassword());
				String jobXml = jenkinsServer.getJobXml(jobName);
				String yamlValue = "";
				try {
					Document dom = DocumentHelper.parseText(jobXml);
					List list = dom
							.selectNodes("/flow-definition/properties/hudson.model.ParametersDefinitionProperty/parameterDefinitions/hudson.model.TextParameterDefinition/defaultValue");
					Iterator iter = list.iterator();
					while (iter.hasNext()) {
						Element element = (Element) iter.next();
						yamlValue = element.getText();
					}
				} catch (Exception e) {
					e.printStackTrace();
					// return FormApply.success("error");
				}
				// TODO 此处存在异常 若是缺少固定格式参数则此处异常
				String stage1 = yamlValue.split("- stage")[0];
				// 设置一个输入参数与一个select参数或按模板匹配？
				String assemblyYaml = "";
				if (!"".equals(stage1)) {
					// 规定选择master为固定选项，可选择不使用 但若使用则需按此规则展示
					String[] split = stage1.split("\n");
					String masterValue = split[0].split(":")[1]
							.replace("'", "");
					assemblyYaml += "；show：选择master；；value: 'text_"
							+ masterValue
							+ "'，description：master，title：master，help：选择节点信息；";
					String execMode = split[1].replace("#", "")
							.replace("/", ":").replace(" ", "");
					String sekVakue = split[2].split(":")[1].replace("'", "")
							.trim();
					assemblyYaml += "；value: 'select_" + sekVakue
							+ "'，selValue:" + execMode
							+ "，title：execMode，help：选择运行方式；";
				}
				yamlValue = yamlValue.replace(stage1, "");
				String yamlAllKey = getYamlAllKey(yamlValue);
				String[] jobYamlSplit = yamlValue.split("stage");
				// get All YamlName
				String[] templateYamlSplit;
				if (yamlAllKey != null && !"".equals(yamlAllKey)) {
					templateYamlSplit = yamlAllKey.split(",");
				} else {
					if ("".equals(yamlAllKey)) {
						return "Yaml参数获取失败，请检查Job名称";
					}
					return "Yaml格式错误，请检Yaml格式";
				}
				XmlFile associationYamlsFile = getAssociationYamlsFile();
				// 解析templateYaml值
				if (associationYamlsFile.exists()) {
					AssociationYamls assocYaml = (AssociationYamls) associationYamlsFile
							.unmarshal(this);
					// 最外层循环
					Integer number = 1;
					for (String string : templateYamlSplit) {
						String yamlsValue = null;
						try {
							yamlsValue = assocYaml.getAssociationMap()
									.get(string).getYaml();
						} catch (Exception e) {
							MessageInFo("Yaml参数StageName不存在");
							return "Yaml参数错误！模板中无此stage";
						}
						String[] yamlSplit = yamlsValue.split("-");
						for (int i = 0; i < yamlSplit.length; i++) {
							if (yamlSplit[i].contains("；")) {
								String[] split = yamlSplit[i].split("；");
								for (String yamlStageSplit : split) {
									if (yamlStageSplit.contains("show")) {
										assemblyYaml += "；" + yamlStageSplit
												+ "；";
									}
									if (yamlStageSplit.contains("detectionSvn")) {
										String node = StringUtils
												.deleteWhitespace(split[0]);
										String jobYamlValue = "";
										String[] jobYamlStage = StringUtils
												.deleteWhitespace(
														jobYamlSplit[number])
												.split("-");
										for (int j = 0; j < jobYamlStage.length; j++) {
											if (jobYamlStage[j].contains(node)) {
												jobYamlStage[j] = jobYamlStage[j]
														.replace(node, "");
												jobYamlValue = jobYamlStage[j]
														.split(":")[1].replace(
														"'", "").replace(
														"&apos;", "");
												break;
											}
										}
										if (jobYamlValue != "") {
											assemblyYaml += "；";
											assemblyYaml += split[1].replace(
													"detectionSvn",
													"detectionSvn_"
															+ jobYamlValue);
											assemblyYaml += "；";
										} else {
											// TODO若jobYamlValue无对应匹配参数 ... 解析失败
											return "detectionSvn解析失败";
										}
									}
									if (yamlStageSplit.contains("area")) {
										String node = StringUtils
												.deleteWhitespace(split[0]);
										// MessageInFo("节点参数" + node);
										String jobYamlValue = "";
										String[] jobYamlStage = StringUtils
												.deleteWhitespace(
														jobYamlSplit[number])
												.split("-");
										for (int j = 0; j < jobYamlStage.length; j++) {
											if (jobYamlStage[j].contains(node)) {
												jobYamlStage[j] = jobYamlStage[j]
														.replace(node, "");
												jobYamlValue = jobYamlStage[j]
														.split(":")[1].replace(
														"'", "").replace(
														"&apos;", "");
												break;
											}
										}
										if (jobYamlValue != "") {
											assemblyYaml += "；";
											// 进行areaValue查询 param:folderKey;
											// folderValue
											XmlFile xmlFile = new XmlFile(
													new File(Jenkins
															.getInstance()
															.getRootDir()
															+ "//"
															+ jobYamlValue));
											String areaValue = (String) xmlFile
													.unmarshal(this);
											assemblyYaml += split[1].replace(
													"area", "area_"
															+ jobYamlValue);
											assemblyYaml += "，" + areaValue;
											assemblyYaml += "；";
										} else {
											// TODO若jobYamlValue无对应匹配参数 ... 解析失败
											return "area解析失败";
										}
									}
									if (yamlStageSplit.contains("text")) {
										// MessageInFo("被解析的xml" +
										// yamlStageSplit);
										String node = StringUtils
												.deleteWhitespace(split[0]);
										// MessageInFo("节点参数" + node);
										String jobYamlValue = "";
										String[] jobYamlStage = StringUtils
												.deleteWhitespace(
														jobYamlSplit[number])
												.split("-");
										for (int j = 0; j < jobYamlStage.length; j++) {
											if (jobYamlStage[j].contains(node)) {
												jobYamlStage[j] = jobYamlStage[j]
														.replace(node, "");
												jobYamlValue = jobYamlStage[j]
														.split(":")[1].replace(
														"'", "").replace(
														"&apos;", "");
												break;
											}
										}
										if (jobYamlValue != "") {
											assemblyYaml += "；";
											assemblyYaml += split[1].replace(
													"text", "text_"
															+ jobYamlValue);
											assemblyYaml += "；";
										} else {
											// TODO若jobYamlValue无对应匹配参数 ... 解析失败
											return "text解析失败";
										}
									}
									if (yamlStageSplit.contains("select")) {
										String node = StringUtils
												.deleteWhitespace(split[0]);
										String jobYamlValue = "";
										String[] jobYamlStage = StringUtils
												.deleteWhitespace(
														jobYamlSplit[number])
												.split("-");
										for (int j = 0; j < jobYamlStage.length; j++) {
											if (jobYamlStage[j].contains(node)) {
												jobYamlStage[j] = jobYamlStage[j]
														.replace(node, "");
												jobYamlValue = jobYamlStage[j]
														.split(":")[1].replace(
														"'", "").replace(
														"&apos;", "");
												break;
											}
										}
										if (jobYamlValue != "") {
											assemblyYaml += "；";
											assemblyYaml += split[1].replace(
													"select", "select_"
															+ jobYamlValue);
											assemblyYaml += "；";
										} else {
											// TODO若jobYamlValue无对应匹配参数 ... 解析失败
											return "select解析失败";
										}
									}
								}

							}
						}
						// 继续解析
						number++;
					}
					return assemblyYaml;
				}
			} else {
				return "模板未找到";
			}
		} else {
			return "文件解析错误";
		}

		// 1getJobName参数信息获取Yaml
		// 2根据获取的Yaml进行匹配
		/*
		 * XmlFile configValueFile = getConfigValueFile();
		 * if(configValueFile.exists()){ ConfigValue config = (ConfigValue)
		 * configValueFile.unmarshal(this); return config.getMap().get(jobName);
		 * }
		 */
		return null;
	}

	private String getYamlAllKey(String yamlValue) throws IOException {
		if (!"".equals(yamlValue)) {
			String yamlKey = "";
			yamlValue = yamlValue.replace("&apos;", "'");
			// MessageInFo("替换后Value" + yamlValue);
			Yaml yaml = new Yaml();
			List list;
			try {
				list = (ArrayList) yaml.load(yamlValue);
			} catch (Exception e) {
				return null;
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
			return yamlKey;
		} else {
			return "";
		}
	}

	public XmlFile getConfigValueFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"configValue.xml"));
	}

	public XmlFile getConfigFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"template.xml"));
	}

	public XmlFile getTemplateFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"template.xml"));
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
		}
	}

	public XmlFile getErrorLog() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"errors.xml"));
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

	@Extension
	public static class ActionInjector extends TransientActionFactory<Job> {
		@Override
		public Collection<ListViewUpdate> createFor(Job p) {
			ArrayList<ListViewUpdate> list = new ArrayList<ListViewUpdate>();
			list.add(new ListViewUpdate(p));
			return list;
		}

		@Override
		public Class type() {
			return Job.class;
		}
	}

	public void MessageInFo(String messages) throws IOException {
		String Nowtime = new SimpleDateFormat("yy-MM-dd HH:mm:ss")
				.format(new Date());
		XmlFile errXml = getErrorLog();
		if (errXml.exists()) {
			Errors errXmls = (Errors) errXml.unmarshal(this);
			Map<String, String> error = errXmls.getError();
			error.put(Nowtime, messages);
			getErrorLog().write(errXmls);
		} else {
			Errors err = new Errors();
			err.getError().put(Nowtime, messages);
			getErrorLog().write(err);
		}
	}

}
