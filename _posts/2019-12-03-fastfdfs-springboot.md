---
layout: post
title: SpringBoot集成FastDFS（防盗链）
categories: springboot fastdfs
---

FastDFS是一款开源的轻量级分布式文件系统C实现，支持Linux、FreeBSD等UNIX系统类google FS，不是通用的文件系统，只能通过专有API访问，目前提供了C、Java和PHP API为互联网应用量身定做，解决大容量文件存储问题，追求高性能和高扩展性FastDFS可以看做是基于文件的key value pair存储系统，称作分布式文件存储服务更为合适。

## 服务器端防盗链设置

修改/etc/fdfs/http.conf

    http.anti_steal.check_token=true
    http.anti_steal.token_ttl=120
    http.anti_steal.secret_key=FastDFS1234567890
    http.anti_steal.token_check_fail=/fastdfs/store_path/timg.jpg

http.conf中防盗链相关的几个参数如下：
http.anti_steal.check_token:是否做token检查，缺省值为false。
http.anti_steal.token_ttl：token TTL，即生成token的有效时长
http.anti_steal.secret_key：生成token的密钥，尽量设置得长一些
http.anti_steal.token_check_fail：token检查失败，返回的文件内容，需指定本地文件名

修改完需要重启nginx。

    nginx -s reload

## maven依赖

    <dependency>
		<groupId>com.github.tobato</groupId>
		<artifactId>fastdfs-client</artifactId>
		<version>1.26.2</version>
	</dependency>
	<dependency>
		<groupId>net.oschina.zcx7878</groupId>
		<artifactId>fastdfs-client-java</artifactId>
		<version>1.27.0.0</version>
	</dependency>

## 导入FastDFS-Client组件

    @Configuration
    @Import(FdfsClientConfig.class) // 导入FastDFS-Client组件
    @EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING) // 解决jmx重复注册bean的问题
    public class FdfsConfiguration {

    }

- RegistrationPolicy需要手动引入 - import org.springframework.jmx.support.RegistrationPolicy;

## controller层

    @Controller
    @RequestMapping("/fdfs")
    public class FastDFSController {
        
        @Autowired
        private FastDFSClient fdfsClient;
        
        @Value("${fdfs.web-server-url}")
        private String fastdfsUrl;
        
        @Value("${fdfs.http.secret_key}")
        private String fastdfsToken;
    
        /**
        * 文件上传
        * @param file
        * @return
        * @throws Exception
        */
        @RequestMapping("/upload/file")
        @ResponseBody
        public Map<String,Object> upload(@RequestParam("file") MultipartFile file, Model model) throws Exception{
            Map<String,Object> resultMap = new HashMap<>();
            String url = null;
            
            try {
                url = fdfsClient.uploadFile(file);
                resultMap.put("code", 200);
                resultMap.put("message", "上传成功");
                resultMap.put("url", url);
                System.out.println(url);
            } catch (Exception e) {
                // TODO: handle exception
                resultMap.put("status", 500);
                resultMap.put("message", "上传异常！");
            }
            
            return resultMap;
        }
        
        /**
        * 文件下载
        * @param fileUrl  url 开头从组名开始
        * @param response
        * @throws Exception
        */
        @RequestMapping(value="/download", method = {RequestMethod.GET})
        public void  download(HttpServletResponse response, HttpServletRequest request) throws Exception{
            String fileUrl = request.getParameter("fileUrl");
            
            byte[] data = fdfsClient.download(fileUrl);
            
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Content-disposition", "attachment;filename=" + URLEncoder.encode("test.jpg", "UTF-8"));
            
            // 写出
            ServletOutputStream outputStream = response.getOutputStream();
            IOUtils.write(data, outputStream);
        }
        
        /**
        * 生成访问链接
        */
        @RequestMapping(value="/location", method = {RequestMethod.GET})
        @ResponseBody
        public String location(HttpServletResponse response, HttpServletRequest request, Model model) {
            String fileUrl = request.getParameter("location");
            System.out.println(fileUrl);
            //token
            String token = fastdfsToken;
            String IP = fastdfsUrl;
            
            fileUrl = getToken(fileUrl,token,IP);
            System.out.println(fileUrl);
            
            return fileUrl;
        }
        
        /**
        * 获取访问服务器的token，拼接到地址后面
        *
        * @param fid 文件路径 group1/M00/00/00/wKgzgFnkTPyAIAUGAAEoRmXZPp876.jpeg
        * @param secret_key 密钥
        * @return 返回token，如： token=078d370098b03e9020b82c829c205e1f&ts=1508141521
        */
        public static String getToken(String fid, String secret_key, String IP){
            
            String substring = fid.substring(fid.indexOf("/")+1);
            //unix时间戳 以秒为单位
            int ts = (int) (System.currentTimeMillis() / 1000);
            String token=new String();
            try {
                token= ProtoCommon.getToken(substring, ts, secret_key);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (MyException e) {
                e.printStackTrace();
                }
            StringBuilder sb = new StringBuilder();
            sb.append(IP);
            sb.append(fid);
            sb.append("?token=").append(token);
            sb.append("&ts=").append(ts);
            //System.out.println(sb.toString());
            
            return sb.toString();
        }
    }

## 创建FastDFSClient

    @Component
    public class FastDFSClient {
    
        @Autowired
        private FastFileStorageClient storageClient;
    
        @Autowired
        private FdfsWebServer fdfsWebServer;
    
        /**
        * 上传文件
        * @param file 文件对象
        * @return 文件访问地址
        * @throws IOException
        */
        public String uploadFile(MultipartFile file) throws IOException {
            StorePath storePath = storageClient.uploadFile(file.getInputStream(),file.getSize(), FilenameUtils.getExtension(file.getOriginalFilename()),null);
            return getResAccessUrl(storePath);
        }
    
        /**
        * 上传文件
        * @param file 文件对象
        * @return 文件访问地址
        * @throws IOException
        */
        public String uploadFile(File file) throws IOException {
            FileInputStream inputStream = new FileInputStream (file);
            StorePath storePath = storageClient.uploadFile(inputStream,file.length(), FilenameUtils.getExtension(file.getName()),null);
            return getResAccessUrl(storePath);
        }
    
        /**
        * 将一段字符串生成一个文件上传
        * @param content 文件内容
        * @param fileExtension
        * @return
        */
        public String uploadFile(String content, String fileExtension) {
            byte[] buff = content.getBytes(Charset.forName("UTF-8"));
            ByteArrayInputStream stream = new ByteArrayInputStream(buff);
            StorePath storePath = storageClient.uploadFile(stream,buff.length, fileExtension,null);
            return getResAccessUrl(storePath);
        }
    
        // 封装图片完整URL地址
        private String getResAccessUrl(StorePath storePath) {
            String fileUrl = fdfsWebServer.getWebServerUrl() + storePath.getFullPath();
            return fileUrl;
        }
        
        /**
        * 下载文件
        * @param fileUrl 文件url
        * @return
        */
        public byte[]  download(String fileUrl) {
            String group = fileUrl.substring(0, fileUrl.indexOf("/"));
            String path = fileUrl.substring(fileUrl.indexOf("/") + 1);
            byte[] bytes = storageClient.downloadFile(group, path, new DownloadByteArray());
            return bytes;
        }
    
        /**
        * 删除文件
        * @param fileUrl 文件访问地址
        * @return
        */
        public void deleteFile(String fileUrl) {
            if (StringUtils.isEmpty(fileUrl)) {
                return;
            }
            try {
                StorePath storePath = StorePath.praseFromUrl(fileUrl);
                storageClient.deleteFile(storePath.getGroup(), storePath.getPath());
            } catch (FdfsUnsupportStorePathException e) {
                e.getMessage();
            }
        }
    
    }

## application.properties

    server.port=9086

    spring.servlet.multipart.enabled=true
    spring.servlet.multipart.max-file-size=10Mb
    spring.servlet.multipart.max-request-size=100Mb

    # fastDFS 
    fdfs.so-timeout=1501
    fdfs.connect-timeout=601
    fdfs.thumb-image.width=150
    fdfs.thumb-image.height=150
    fdfs.web-server-url=192.168.99.100:8888/
    fdfs.tracker-list[0]=192.168.99.100:22122
    fdfs.http.anti_steal_token = true
    fdfs.http.secret_key = FastDFS1234567890


<div id="gitalk-container-fastdfs-springboot"></div>

<script>
  $(document).ready(function() {
    window.initFastDFSSpringbootComment();
  })
</script>

