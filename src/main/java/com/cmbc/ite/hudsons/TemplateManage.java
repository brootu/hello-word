package com.cmbc.ite.hudsons;

import hudson.Extension;
import hudson.XmlFile;
import hudson.model.ManagementLink;
import hudson.util.FormApply;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;

import jenkins.model.Jenkins;

import org.kohsuke.stapler.HttpResponse;
import org.kohsuke.stapler.StaplerRequest;
import org.kohsuke.stapler.StaplerResponse;
import org.kohsuke.stapler.bind.JavaScriptMethod;

import com.cmbc.ite.mode.AssociationJob;
import com.cmbc.ite.mode.AssociationYamls;
import com.cmbc.ite.mode.Template;
import com.cmbc.ite.mode.TemplateType;
import com.offbytwo.jenkins.JenkinsServer;

@Extension
public class TemplateManage extends ManagementLink {

	/**
	 * Features：manage select getList and allValue(manage.jelly)
	 * 
	 * @return select allValue
	 * @throws IOException
	 *             file read exception
	 */
	public Map<String, Template> getList() throws IOException {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template template = (Template) templateFile.unmarshal(this);
			Map<String, Template> map = template.getMap();
			return map;
		}
		return null;
	}

	public XmlFile getConfigFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"template.xml"));
	}

	public XmlFile getTemplateFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"template.xml"));
	}

	public XmlFile getAssociationJobFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"associationJob.xml"));
	}

	public XmlFile getTemplateTypeFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"templateType.xml"));
	}

	public XmlFile getAssociationYamlsFile() {
		return new XmlFile(new File(Jenkins.getInstance().getRootDir(),
				"associationYamls.xml"));
	}

	public String doScripts(StaplerRequest req, StaplerResponse rsp)
			throws IOException, URISyntaxException {
		String use = req.getParameter("use");
		String pwd = req.getParameter("pwd");
		String script = req.getParameter("script");
		String jobUrl = req.getParameter("url");
		String runScript = use + pwd + script + jobUrl;
		String xml = "<?xml version='1.0' encoding='UTF-8'?>"
				+ "<com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>"
				+ "    <scope>GLOBAL</scope>"
				+ "    <id>deploy-key</id>"
				+ "    <username>"
				+ use
				+ "</username>"
				+ "    <password>"
				+ pwd
				+ "</password>"
				+ "</com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>";
		System.out.println(xml);
		// paraText = InterfaceBuild.tryCallCreateCredentials(req, svnUser,
		// svnPwd, treeMod2);
		return "null";
	}

	private JenkinsServer serverNew(String jobUrl, String use, String pwd)
			throws URISyntaxException {
		JenkinsServer jenkinsServer = new JenkinsServer(new URI(jobUrl), use,
				pwd);
		return jenkinsServer;
	}

	/**
	 * Features：Template manage deleteAll ps:Delete associated information
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return ../
	 * @throws IOException
	 *             file read exception
	 */
	public HttpResponse doRemoveConfig(StaplerRequest req, StaplerResponse rsp)
			throws IOException {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			String[] split = req.getParameter("selKey").split(",");
			Template template = (Template) templateFile.unmarshal(this);
			Map<String, Template> map = template.getMap();
			XmlFile templateTypeFile = getTemplateTypeFile();
			if (templateTypeFile.exists()) {
				TemplateType templateType = (TemplateType) templateTypeFile
						.unmarshal(this);
				for (String string : split) {
					Template templateValue = map.get(string);
					String assType = templateValue.getAssType();
					String string2 = templateType.getTypeMap().get(assType);
					string2 = string2.replace(string, "");
					if (string2.length() != 0) {
						if (string2.charAt(0) == ',') {
							string2 = string2.substring(1, string2.length());
						}
						if (string2.charAt(string2.length() - 1) == ',') {
							string2 = string2
									.substring(0, string2.length() - 1);
						}
						string2 = string2.replace(",,", ",");
					}
					templateType.getTypeMap().put(map.get(string).getAssType(),
							string2);
				}
				getTemplateTypeFile().write(templateType);
			}
			for (String string : split) {
				map.remove(string);
			}
			getTemplateFile().write(template);
			return FormApply.success(".");
		}
		return null;
	}

	/**
	 * Features：Template manage update
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return Todo待具体修改，目前是js判断响应值 200 为修改成功
	 * @throws IOException
	 *             file read exception
	 */
	public HttpResponse doUpdateTemplate(StaplerRequest req, StaplerResponse rsp)
			throws IOException {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			String jobName = req.getParameter("jobName");
			Template template = (Template) templateFile.unmarshal(this);
			Map<String, Template> map = template.getMap();
			Template template2 = new Template();
			template2.setYamls(req.getParameter("yamls"));
			template2.setUserName(req.getParameter("uname"));
			template2.setJobUrl(req.getParameter("url"));
			template2.setJobXml(req.getParameter("jobXml"));
			template2.setPassword(req.getParameter("pwd"));
			template2.setAssJob(req.getParameter("bah"));
			template2.setAssType(req.getParameter("assType"));
			template2.setRemarks(req.getParameter("_.remarks"));
			if (!"".equals(jobName)) {
				map.put(jobName, template2);
			}
			getTemplateFile().write(template);
			return FormApply.success(".");
		}
		return null;
	}

	/**
	 * Features：Ajax getJobValue The annotation exposes this method to
	 * JavaScript proxy.
	 * 
	 * @throws IOException
	 * @throws URISyntaxException
	 */
	@JavaScriptMethod
	public Template getJobValue(String jobKey) throws IOException,
			URISyntaxException {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template template = (Template) templateFile.unmarshal(this);
			return template.getMap().get(jobKey);
		}
		return null;
	}

	/**
	 * Features：Ajax Verify that the JobName is unique JavaScript proxy.
	 */
	@JavaScriptMethod
	public Template getTemplateName(String jobKey) {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template template = null;
			try {
				template = (Template) templateFile.unmarshal(this);
				template = template.getMap().get(jobKey);
			} catch (IOException e) {
				// TODO 日志规范
				e.printStackTrace();
			}
			return template;
		}
		return null;
	}

	/**
	 * Features：template associationJob remove
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return 上层目录
	 * @throws IOException
	 *             file read exception
	 */
	public HttpResponse doRemoveAssJob(StaplerRequest req, StaplerResponse rsp)
			throws IOException {
		String assJobKey = req.getParameter("assJobKey");
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			// delete association template job
			deleteAssociationTemplate(assJobKey, templateFile);
		}
		XmlFile associationYamlsFile = getAssociationYamlsFile();
		if (associationYamlsFile.exists()) {
			// delete association yaml job
			deleteAssociaYaml(assJobKey, associationYamlsFile);
		}
		// delete association create job
		XmlFile xml = getAssociationJobFile();
		if (xml.exists()) {
			AssociationJob unmarshal = (AssociationJob) xml.unmarshal(this);
			Map<String, String> map = unmarshal.getAssociationMap();
			map.remove(assJobKey);
			getAssociationJobFile().write(unmarshal);
			return FormApply.success("addAssociationJob");
		}

		return FormApply.success("error");
	}

	private void deleteAssociaYaml(String assJobKey,
			XmlFile associationYamlsFile) throws IOException {
		AssociationYamls association = (AssociationYamls) associationYamlsFile
				.unmarshal(this);
		Map<String, AssociationYamls> associationMap = association
				.getAssociationMap();
		Iterator<Entry<String, AssociationYamls>> iterator = associationMap
				.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<String, AssociationYamls> next = iterator.next();
			String assJobs = next.getValue().getAssJobs();
			boolean flag = false;
			if (assJobs.contains(assJobKey)) {
				assJobs = assJobs.replace(assJobKey, "");
				if (assJobs.length() != 0) {
					if (assJobs.charAt(0) == ',') {
						assJobs = assJobs.substring(1, assJobs.length());
					}
					if (assJobs.charAt(assJobs.length() - 1) == ',') {
						assJobs = assJobs.substring(0, assJobs.length() - 1);
					}
					assJobs = assJobs.replace(",,", "");
				}
				flag = true;
			}
			if (flag) {
				AssociationYamls associationYamls = association
						.getAssociationMap().get(next.getKey());
				associationYamls.setAssJobs(assJobs);
				association.getAssociationMap().put(next.getKey(),
						associationYamls);
				getAssociationYamlsFile().write(association);
			}
		}

	}

	private void deleteAssociationTemplate(String assJobKey,
			XmlFile templateFile) throws IOException {
		Template template = (Template) templateFile.unmarshal(this);
		Map<String, Template> templateMap = template.getMap();
		Iterator<Entry<String, Template>> it = templateMap.entrySet()
				.iterator();
		while (it.hasNext()) {
			Entry<String, Template> entry = it.next();
			String treeToMoney = entry.getValue().getAssJob();
			boolean flag = false;
			if (treeToMoney.contains(assJobKey)) {
				treeToMoney = treeToMoney.replace(assJobKey, "");
				if (treeToMoney.length() != 0) {
					if (treeToMoney.charAt(0) == ',') {
						treeToMoney = treeToMoney.substring(1,
								treeToMoney.length());
					}
					if (treeToMoney.charAt(treeToMoney.length() - 1) == ',') {
						treeToMoney = treeToMoney.substring(0,
								treeToMoney.length() - 1);
					}
					treeToMoney = treeToMoney.replace(",,", "");
				}
				flag = true;
			}
			if (flag) {
				Template template2 = template.getMap().get(entry.getKey());
				template2.setAssJob(treeToMoney);
				template.getMap().put(entry.getKey(), template2);
				getTemplateFile().write(template);
				// TreeMod treeMod2 = treeMod.getMap().get(entry.getKey());
				// treeMod2.setAssJob(treeToMoney);
				// treeMod.getMap().put(entry.getKey(), treeMod2);
				// getConfigFile().write(treeMod);
			}
		}

	}

	/**
	 * Features：template associationYamls remove
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return 上层目录
	 * @throws IOException
	 *             file read exception
	 */
	public HttpResponse doRemoveAssYamls(StaplerRequest req, StaplerResponse rsp)
			throws IOException {
		XmlFile xml = getAssociationYamlsFile();
		if (xml.exists()) {
			String assJobKey = req.getParameter("assJobKey");
			// delete association job
			AssociationYamls associationYamls = (AssociationYamls) xml
					.unmarshal(this);
			Map<String, AssociationYamls> map = associationYamls
					.getAssociationMap();
			map.remove(assJobKey);
			try {
				// delete association yaml
				deleteAssocYaml(assJobKey);
			} catch (IOException e) {
				// TODO 日志格式定义规范
				e.printStackTrace();
			}
			getAssociationYamlsFile().write(associationYamls);
			return FormApply.success("associationYamlsManage");
		}
		return FormApply.success("error");
	}

	/**
	 * Features：templateAssType remove 1:remove Template 2:removeTemplateType
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return 上层目录
	 * @throws IOException
	 */
	public HttpResponse doRemoveAssType(StaplerRequest req, StaplerResponse rsp)
			throws IOException {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template template = (Template) templateFile.unmarshal(this);
			XmlFile templateTypeFile = getTemplateTypeFile();
			if (templateTypeFile.exists()) {
				String templateTypeKey = req.getParameter("_.templateType");
				TemplateType templateType = (TemplateType) templateTypeFile
						.unmarshal(this);
				String templateTypeValue = templateType.getTypeMap().get(
						templateTypeKey);
				String[] TypeValyeSplit = templateTypeValue.split(",");
				for (String string : TypeValyeSplit) {
					template.getMap().remove(string);
				}
				templateType.getTypeMap().remove(templateTypeKey);
				getTemplateFile().write(template);
				getTemplateTypeFile().write(templateType);
				return FormApply.success("associationYamlsManage");
			}
		}

		return FormApply.success("error");
	}

	private void deleteAssocYaml(String assJobKey) throws IOException {
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template treeMod = (Template) templateFile.unmarshal(this);
			Map<String, Template> map2 = treeMod.getMap();
			Iterator<Entry<String, Template>> it = map2.entrySet().iterator();
			while (it.hasNext()) {
				Entry<String, Template> entry = it.next();
				String[] split = entry.getValue().getYamls().split(",");
				for (int i = 0; i < split.length; i++) {
					if (assJobKey.equals(split[i])) {
						String yamls = entry.getValue().getYamls();
						yamls = yamls.replace(assJobKey, "").replace(",,", ",");
						char charAt = yamls.charAt(yamls.length() - 1);
						char end = ',';
						if (charAt == end) {
							yamls = yamls.substring(0, yamls.length() - 1);
						}
						if (yamls.charAt(0) == end) {
							yamls = yamls.substring(1, yamls.length());
						}
						// 替换值
						String key = entry.getKey();
						Template treeMod2 = treeMod.getMap().get(key);
						treeMod2.setYamls(yamls);
						treeMod.getMap().put(key, treeMod2);
						templateFile.write(treeMod);
						break;
					}
				}
			}
		}

	}

	// save templateType
	public void saveTemplateType(String templateTypeValue, String jobName)
			throws IOException {
		TemplateType templateType;
		XmlFile templateTypeFile = getTemplateTypeFile();
		if (templateTypeFile.exists()) {
			templateType = (TemplateType) templateTypeFile.unmarshal(this);
			String string = templateType.getTypeMap().get(templateTypeValue);
			if (string != null & string != "") {
				templateType.getTypeMap().put(templateTypeValue,
						string + "," + jobName);
			} else {
				templateType.getTypeMap().put(templateTypeValue, jobName);
			}
		} else {
			templateType = new TemplateType();
			Map<String, String> typeMap = templateType.getTypeMap();
			typeMap.put(templateTypeValue, jobName);
		}
		getTemplateTypeFile().write(templateType);
	}

	// add template
	private void addTemplate(String templateType, String jobName,
			StaplerRequest req) throws IOException {
		String yamls = req.getParameter("_.yamls");
		String jobXml = req.getParameter("_.jobXml");
		XmlFile templateFile = getTemplateFile();
		if (templateFile.exists()) {
			Template template = (Template) templateFile.unmarshal(this);
			Map<String, Template> map = template.getMap();
			Template templateValue = new Template();
			templateValue.setYamls(yamls);
			if (jobXml != null) {
				templateValue.setUserName(req.getParameter("_.userName"));
				templateValue.setPassword(req.getParameter("_.password"));
				templateValue.setJobUrl(req.getParameter("_.jobUrl"));
				templateValue.setRemarks(req.getParameter("_.remarks"));
				templateValue.setAssJob(req.getParameter("bah"));
				templateValue.setAssType(templateType);
				templateValue.setJobXml(jobXml);
			} else {
				// TODO 不允许JobXml为空 建议前端加入校验
				// return null;
			}
			map.put(jobName, templateValue);
			getConfigFile().write(template);
		} else {
			Template template = new Template();
			Template templateValue = new Template();
			Map<String, Template> templateMap = template.getMap();
			templateValue.setYamls(yamls);
			if (jobXml != null) {
				templateValue.setUserName(req.getParameter("_.userName"));
				templateValue.setPassword(req.getParameter("_.password"));
				templateValue
						.setJobUrl(req.getParameter("_.JobUrl") == null ? ""
								: req.getParameter("_.JobUrl"));
				templateValue.setJobXml(jobXml);
				templateValue.setAssJob(req.getParameter("bah"));
				templateValue.setAssType(templateType);
			}
			templateMap.put(jobName, templateValue);
			getTemplateFile().write(template);
		}
	}

	/**
	 * Features：add template
	 * 
	 * @param req
	 *            this is req
	 * @param rsp
	 *            this is rsp
	 * @return save template
	 * @throws IOException
	 *             file read exception
	 * @throws ServletException
	 */
	public HttpResponse doConfigSubmit(StaplerRequest req, StaplerResponse rsp)
			throws IOException, ServletException {
		String jobName = req.getParameter("_.jobName");
		String templateType = req.getParameter("_.templateType");
		try {
			// save templateType
			saveTemplateType(templateType, jobName);
			// add template
			addTemplate(templateType, jobName, req);
		} catch (IOException e) {
			// TODO 日志格式定义规范
			e.printStackTrace();
		}
		return FormApply.success(".");
	}

	/**
	 * Features：get TemplateTypes
	 * 
	 * @return select allValue
	 * @throws IOException
	 *             file read exception
	 */
	public Map<String, String> getTemplateType() throws IOException {
		XmlFile xml = getTemplateTypeFile();
		if (xml.exists()) {
			TemplateType templateType = (TemplateType) xml.unmarshal(this);
			return templateType.getTypeMap();
		}
		return null;
	}

	/**
	 * Features：AssociationJobAdd
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return Todo待具体修改，目前是js判断响应值 200 为修改成功
	 * @throws IOException
	 *             file read exception
	 */
	public HttpResponse doAssociationJobAdd(StaplerRequest req,
			StaplerResponse rsp) throws IOException {
		String Jobkey = req.getParameter("_.name");
		String JobXml = req.getParameter("_.jobXml");
		XmlFile associationJobFile = getAssociationJobFile();
		AssociationJob associationJob;
		if (associationJobFile.exists()) {
			associationJob = (AssociationJob) associationJobFile
					.unmarshal(this);
			Map<String, String> associationMap = associationJob
					.getAssociationMap();
			associationMap.put(Jobkey, JobXml);
		} else {
			associationJob = new AssociationJob();
			Map<String, String> associationMap = associationJob
					.getAssociationMap();
			associationMap.put(Jobkey, JobXml);
		}
		getAssociationJobFile().write(associationJob);
		return FormApply.success("addAssociationJob");
	}

	/**
	 * Features：AssociationYamlsAdd
	 * 
	 * @param req
	 *            extend servlet request
	 * @param rsp
	 *            extend servlet response
	 * @return Todo待具体修改，目前是js判断响应值 200 为修改成功
	 * @throws IOException
	 *             file read exception
	 */
	public HttpResponse doAssociationYamlsAdd(StaplerRequest req,
			StaplerResponse rsp) throws IOException {
		String Yamlskey = req.getParameter("_.name");
		String YamlsValue = req.getParameter("_.jobXml");
		String bah = req.getParameter("bah");
		XmlFile xml = getAssociationYamlsFile();
		XmlFile associationYamlsFile = getAssociationYamlsFile();
		AssociationYamls associationYamls;
		if (associationYamlsFile.exists()) {
			associationYamls = (AssociationYamls) xml.unmarshal(this);
			associationYamls = (AssociationYamls) associationYamlsFile
					.unmarshal(this);
			Map<String, AssociationYamls> associationMap = associationYamls
					.getAssociationMap();
			AssociationYamls associationYamls2 = associationMap.get(Yamlskey);
			if (associationYamls2 != null) {
				associationYamls2.setAssJobs(bah);
				associationYamls2.setYaml(YamlsValue);
			} else {
				AssociationYamls assYamls2 = new AssociationYamls();
				assYamls2.setAssJobs(bah);
				assYamls2.setYaml(YamlsValue);
				associationMap.put(Yamlskey, assYamls2);
			}
		} else {
			associationYamls = new AssociationYamls();
			Map<String, AssociationYamls> associationMap = associationYamls
					.getAssociationMap();
			associationYamls.setAssJobs(bah);
			associationYamls.setYaml(YamlsValue);
			associationMap.put(Yamlskey, associationYamls);
		}
		getAssociationYamlsFile().write(associationYamls);
		return FormApply.success("associationYamlsManage");
	}

	/**
	 * Features：get Association Job File
	 * 
	 * @return select allValue
	 * @throws IOException
	 *             file read exception
	 */
	public Map<String, String> getAssociationJob() throws IOException {
		XmlFile associationJobFile = getAssociationJobFile();
		if (associationJobFile.exists()) {
			AssociationJob associationJob = (AssociationJob) associationJobFile
					.unmarshal(this);
			return associationJob.getAssociationMap();
		}
		return null;
	}

	/**
	 * Features：get Association Yamls File
	 * 
	 * @return select allValue
	 * @throws IOException
	 *             file read exception
	 */
	public Map<String, AssociationYamls> getAssociationYamls()
			throws IOException {
		XmlFile xml = getAssociationYamlsFile();
		if (xml.exists()) {
			AssociationYamls associationYamls = (AssociationYamls) xml
					.unmarshal(this);
			Map<String, AssociationYamls> associationMap = associationYamls
					.getAssociationMap();
			return associationMap;
		}
		return null;
	}

	@Override
	public String getDisplayName() {
		// TODO Auto-generated method stub
		return "民生DevOps部署模板管理";
	}

	@Override
	public String getIconFileName() {
		// TODO Auto-generated method stub
		return "document.png";
	}

	@Override
	public String getUrlName() {
		return "templateManage";
	}

	@Override
	public String getDescription() {
		return "配置流水线类型模板，管理关联job新建";
	}
}
