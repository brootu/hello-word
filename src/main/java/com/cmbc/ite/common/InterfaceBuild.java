package com.cmbc.ite.common;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.AuthCache;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.BasicAuthCache;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.protocol.HTTP;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;
import org.kohsuke.stapler.StaplerRequest;

import com.cmbc.ite.mode.Template;

public class InterfaceBuild {
	/**
	 * create domain
	 */
	private static void tryCall() {

		String xml = xmlParse("xml/domain.xml");
		Map<String, String> crumb = getCrumb(xml, xml, 0, null);

		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpHost targetHost = new HttpHost("127.0.0.1", 8080, "http");
		CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
		credentialsProvider.setCredentials(
				new AuthScope(targetHost.getHostName(), targetHost.getPort()),
				new UsernamePasswordCredentials("root", "root"));
		AuthCache authCache = new BasicAuthCache();
		BasicScheme basicScheme = new BasicScheme();
		authCache.put(targetHost, basicScheme);
		HttpClientContext context = HttpClientContext.create();
		context.setCredentialsProvider(credentialsProvider);
		context.setAuthCache(authCache);
		HttpPost httpPost = new HttpPost(
				"/jenkins/credentials/store/system/createDomain");
		// 设置xml请求头
		httpPost.setHeader(HTTP.CONTENT_TYPE, "application/xml");
		// 设置crumb请求头
		httpPost.setHeader("Jenkins-Crumb", crumb.get("Jenkins-Crumb"));
		CloseableHttpResponse response = null;
		try {
			httpPost.setEntity(new StringEntity(xml));
			response = httpClient.execute(targetHost, httpPost, context);
			int statusCode = response.getStatusLine().getStatusCode();
			if (statusCode == HttpURLConnection.HTTP_OK) {
				System.out.println("domain is created!");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (response != null && httpClient != null) {
					httpClient.close();
					response.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * create credentials
	 */
	// @SuppressWarnings("unused")
	public static String tryCallCreateCredentials(StaplerRequest req,
			String svnUser, String svnPwd, Template treeMod2) {
		// String xml = xmlParse("xml/createCredentials.xml");
		String xml = "<?xml version='1.0' encoding='UTF-8'?>"
				+ "<com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>"
				+ "    <scope>GLOBAL</scope>"
				+ "    <id>deploy-key</id>"
				+ "    <username>kanll</username>"
				+ "    <password>secret123</password>"
				+ "</com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>";
		String scheme = req.getScheme();// http
		String serverName = req.getServerName();// localhost
		int serverPort = req.getServerPort();// 8090
		Map<String, String> crumb = getCrumb(scheme, serverName, serverPort,
				treeMod2);
		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpHost httpHost = new HttpHost(serverName, serverPort, scheme);
		String md5Hex = DigestUtils.md5Hex(svnUser + svnPwd);
		xml = xml.replace("kanll", svnUser).replace("secret123", svnPwd)
				.replace("deploy-key", md5Hex);
		CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
		credentialsProvider.setCredentials(new AuthScope(
				httpHost.getHostName(), httpHost.getPort()),
				new UsernamePasswordCredentials(treeMod2.getUserName(),
						treeMod2.getPassword()));
		// create AuthCache instance
		AuthCache authCache = new BasicAuthCache();
		// generate Basic scheme object and add it to auth cache
		BasicScheme basicScheme = new BasicScheme();
		authCache.put(httpHost, basicScheme);

		// add AuthCache to the execution context
		HttpClientContext httpClientContext = HttpClientContext.create();
		httpClientContext.setCredentialsProvider(credentialsProvider);
		httpClientContext.setAuthCache(authCache);
		// create post request
		// HttpPost httpPost = new
		// HttpPost("/jenkins/credentials/store/system/domain/k4/createCredentials");
		HttpPost httpPost = new HttpPost(
				"/credentials/store/system/domain/_/createCredentials");
		// add http head
		httpPost.setHeader(HTTP.CONTENT_TYPE, "application/xml");
		httpPost.setHeader("Jenkins-Crumb", crumb.get("Jenkins-Crumb"));
		CloseableHttpResponse response = null;
		try {
			// put xml string to entity
			StringEntity stringEntity = new StringEntity(xml);
			httpPost.setEntity(stringEntity);
			// execute post request
			response = httpClient
					.execute(httpHost, httpPost, httpClientContext);
			System.out.println(response.getStatusLine().getStatusCode());
			if (response.getStatusLine().getStatusCode() == HttpURLConnection.HTTP_OK) {
				System.out.println("credentials is created!");
			}

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (response != null && httpClient != null) {
				try {
					httpClient.close();
					response.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return md5Hex;
	}

	/**
	 * xml to String
	 * 
	 * @param pathName
	 * @return
	 */
	private static String xmlParse(String pathName) {
		String stringXml = "";
		InputStream resourceAsStream = null;
		try {
			resourceAsStream = Thread.currentThread().getContextClassLoader()
					.getResourceAsStream(pathName);
			SAXReader saxReader = new SAXReader();
			Document read = saxReader.read(resourceAsStream);
			stringXml = read.asXML();
		} catch (DocumentException e) {
			e.printStackTrace();
		} finally {
			try {
				if (resourceAsStream != null) {
					resourceAsStream.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println(stringXml);
		return stringXml;
	}

	/**
	 * 获取 crumb 解决jenkins开启 ：“防止跨站请求伪造攻击”
	 * 
	 * @param treeMod2
	 * @param serverPort
	 * @param serverName
	 * @param scheme
	 * @return
	 */
	private static Map<String, String> getCrumb(String scheme,
			String serverName, int serverPort, Template treeMod2) {
		Map map = new HashMap(16);
		CloseableHttpClient httpClient = HttpClients.createDefault();
		// HttpHost httpHost = new HttpHost("127.0.0.1",8080,"http");
		HttpHost httpHost = new HttpHost(serverName, serverPort, scheme);
		CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
		// credentialsProvider.setCredentials(new
		// AuthScope(httpHost.getHostName(),httpHost.getPort()), new
		// UsernamePasswordCredentials("root", "root"));
		credentialsProvider.setCredentials(new AuthScope(
				httpHost.getHostName(), httpHost.getPort()),
				new UsernamePasswordCredentials(treeMod2.getUserName(),
						treeMod2.getPassword()));
		AuthCache authCache = new BasicAuthCache();
		BasicScheme basicScheme = new BasicScheme();
		authCache.put(httpHost, basicScheme);

		HttpClientContext httpClientContext = HttpClientContext.create();
		httpClientContext.setAuthCache(authCache);
		httpClientContext.setCredentialsProvider(credentialsProvider);

		// HttpGet httpPost = new
		// HttpGet("/jenkins/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,'=',//crumb)");
		HttpGet httpPost = new HttpGet(
				"/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,'=',//crumb)");

		// httpPost.setHeader("Accept","application/json");
		// httpPost.setHeader("Content-Type","application/xml");
		// List<NameValuePair> list = new ArrayList<NameValuePair>();
		// NameValuePair pair = new
		// BasicNameValuePair("xpath","/*/crumb/text()");
		// list.add(pair);
		CloseableHttpResponse response = null;
		InputStream content = null;
		InputStreamReader in = null;
		try {
			// httpPost.setEntity(new UrlEncodedFormEntity(list,HTTP.UTF_8));
			response = httpClient
					.execute(httpHost, httpPost, httpClientContext);
			HttpEntity entity = response.getEntity();
			content = entity.getContent();
			in = new InputStreamReader(content);

			final StringBuilder sb = new StringBuilder("");
			char[] t = new char[60];
			// int time = 0;
			for (;;) {
				int len = in.read(t);
				if (len < 0)
					break;
				sb.append(t, 0, len);
				// time++;
			}
			String jenkinsCrumb = sb.toString();
			String[] split = jenkinsCrumb.split("=");
			// key:Jenkins-Crumb
			map.put(split[0], split[1]);
			// System.out.println("sb : "+sb.toString()+" time : "+time);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (in != null && content != null) {
					in.close();
					content.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println(map);
		return map;
	}

	// public static void main(String[] args) {
	// getCrumb();
	// tryCall();
	// tryCallCreateCredentials();
	// xmlParse("xml/createCredentials.xml");
	// }
}
