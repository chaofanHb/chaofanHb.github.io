---
layout: post
title: java填充word文档(带有富文本)
categories: other java
---

java通过freemarker导出包含富文本图片的word文档

## 模板制作

- 提示：这里模板用office word来做，不要用wps

创建word文件，我这里用第二个content来显示我们要的富文本，然后将我们的word文件另存为mht文件

![图片1]({{ site.url }}/assets/images/word1.png)

打开我们的mht文件并处理：在我们的文件里面找到下面这些东西.

![图片2]({{ site.url }}/assets/images/word2.png)

${imagesBase64String} 和 ${imagesXmlHrefString}这两个是我们手动加进去的，简析富文本图片的核心就在这里，然后保存一下，再把文件的后缀名改成[ftl](https://zhidao.baidu.com/question/408434426.html)格式的就ok了（模板处理到此结束）


## 解析html

![图片3]({{ site.url }}/assets/images/word3.png)

这个大家不陌生吧？陌生的自己打脸去，下面的那三个照着写

    handler.handledHtml(false);

    String bodyBlock = handler.getHandledDocBodyBlock();

    data.put("content", bodyBlock);   处理后的html代码块

    data.put("imagesXmlHrefString", xmlimaHref);

    data.put("imagesBase64String", handledBase64Block);  

这两个大家还有印象吧？没错就是我们之前手动在mht模板里加的那两货！

## 填充模板

    String docFilePath = "d:\\temp.doc";
    System.out.println(docFilePath);
    File f = new File(docFilePath);
    OutputStream out;
    try {
        out = new FileOutputStream(f);
        WordGeneratorWithFreemarker.createDoc(data, "temp.ftl", out);

    } catch (FileNotFoundException e) {

    } catch (MalformedTemplateNameException e) {
            e.printStackTrace();
    } catch (ParseException e) {
            e.printStackTrace();
    } catch (IOException e) {
            e.printStackTrace();
    }

## 测试（main）


	public static void main(String[] args) throws Exception {
		HashMap<String, Object> data = new HashMap<String, Object>();

		StringBuilder sb = new StringBuilder();
		sb.append("<div>");
		sb.append("<img style='height:100px;width:200px;display:block;' src='G:\\aaa.png' />");
		sb.append("<img style='height:100px;width:200px;display:block;' src='G:\\29-1Z414195R3.jpg' />");
		sb.append("</br><span>中国梦，幸福梦！</span>");
		sb.append("</div>");
		RichHtmlHandler handler = new RichHtmlHandler(sb.toString());

		handler.setDocSrcLocationPrex("file:///C:/268BA2D4");
		handler.setDocSrcParent("test.files");
		handler.setNextPartId("01D593C6.13671CB0");
		handler.setShapeidPrex("_x56fe__x7247__x0020");
		handler.setSpidPrex("_x0000_i");
		handler.setTypeid("#_x0000_t75");

		handler.handledHtml(false);

		String bodyBlock = handler.getHandledDocBodyBlock();
		System.out.println("bodyBlock:\n"+bodyBlock);

		String handledBase64Block = "";
		if (handler.getDocBase64BlockResults() != null
				&& handler.getDocBase64BlockResults().size() > 0) {
			for (String item : handler.getDocBase64BlockResults()) {
				handledBase64Block += item + "\n";
			}
		}
		data.put("imagesBase64String", handledBase64Block);

		String xmlimaHref = "";
		if (handler.getXmlImgRefs() != null
				&& handler.getXmlImgRefs().size() > 0) {
			for (String item : handler.getXmlImgRefs()) {
				xmlimaHref += item + "\n";
			}
		}
		data.put("imagesXmlHrefString", xmlimaHref);
		data.put("name", "张三");
		data.put("content", bodyBlock);

		String docFilePath = "d:\\temp.doc";
		System.out.println(docFilePath);
		File f = new File(docFilePath);
		OutputStream out;
		try {
			out = new FileOutputStream(f);
			WordGeneratorWithFreemarker.createDoc(data, "test.mht", out);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (MalformedTemplateNameException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}


![图片4]({{ site.url }}/assets/images/word4.png)

到此结束了。