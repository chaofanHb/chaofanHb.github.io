---
layout: post
title: SpringBoot高频面试题，看完吊打面试官
categories: springboot other
---

Spring Boot**已经建立在现有spring框架之上**。使用spring启动，我们**避免了**之前我们必须做的所有**样板代码和配置**。因此，Spring Boot可以帮助我们**以最少的工作量，更加健壮地使用现有的Spring功能**。
- 用来简化spring应用的初始搭建以及开发过程 使用特定的方式来进行配置（properties或yml文件）

- 创建独立的spring引用程序 main方法运行

- 嵌入的Tomcat 无需部署war文件

- 简化maven配置

- 自动配置spring添加对应功能starter自动化配置

spring boot来简化spring应用开发，约定大于配置，去繁从简，just run就能创建一个独立的，产品级别的应用

## 1.Spring Boot 有哪些优点？
1.减少开发，测试时间和精力。
2.使用JavaConfig有助于避免使用XML。
3.避免大量的Maven导入和各种版本冲突。
4.通过提供默认值快速开始开发。
5.没有单独的Web服务器需要。这意味着你不再需要启动Tomcat，Glassfish 或其他任何东西。
6.需要更少的配置因为没有web.xml文件。只需添加用@Configuration注释的类，然后添加用@Bean注释的方法，Spring将自动加载对象并像以前一样对其进行管理。您甚至可以将@Autowired添加到bean方法中，以使Spring自动装入需要的依赖关系中。
7.基于环境的配置使用这些属性，您可以将您正在使用的环境传递到应用程序：-Dspring.profiles.active={enviornment}。在加载主应用程序属性文件后，Spring将在（application（environment}.properties）中加载后续的应用程序属性文件。

## 2.什么是JavaConfig？

Spring JavaConfig是Spring社区的产品，它**提供了配置Spring loC容器的纯Java方法**。因此它**有助于避免使用XML配置**。使用JavaConfig的优点在于：

**面向对象的配置**。由于配置被定义为JavaConfig中的类，因此用户可以充分利用Java中的面向对象功能。一个配置类可以继承另一个，重写它的@Bean方法等。

**减少或消除XML配置**。基于依赖注入原则的外化配置的好处已被证明。但是，许多开发人员不希望在XML和Java之间来回切换。JavaConfig为开发人员提供了一种纯Java方法来配置与XML配置概念相似的Spring容器。从技术角度来讲，只使用JavaConfig配置类来配置容器是可行的，但实际上很多人认为将JavaConfig与XML混合匹配是理想的。类型安全和重构友好。JavaConfig 提供了一种类型安全的方法来配置 Spring容器。由于Java5.0对泛型的支持，现在可以按类型而不是按名称检索bean，不需要任何强制转换或基于字符串的查找。

## 3.如何重新加载 Spring Boot上的更改，而无需重新启动服务器？

这可以使用DEV工具来实现。通过这种依赖关系，您可以节省任何更改，嵌入式tomcat 将重新启动。**Spring Boot 有一个开发工具（DevTools）模块**，它有助于提高开发人员的生产力。Java开发人员面临的一个主要挑战是将文件更改自动部署到服务器并自动重启服务器。开发人员可以重新加载Spring Boot上的更改，而无需重新启动服务器。这将消除每次手动部署更改的需要。Spring Boot在发布它的第一个版本时没有这个功能。这是开发人员最需要的功能。DevTools模块完全满足开发人员的需求。该模块将在生产环境中被禁用。它还提供H2数据库控制台以更好地测试应用程序。

## 4.Spring Boot 的核心配置文件有哪几个？它们的区别是什么？

SpringBoot的核心配置文件有application和bootstarp配置文件。
application文件主要用于Springboot自动化配置文件。
bootstarp文件主要有以下几种用途：

- 使用Spring Cloud Config注册中心时 需要在bootStarp配置文件中添加链接到配置中心的配置属性来加载外部配置中心的配置信息。

- 一些固定的不能被覆盖的属性

- 一些加密/解密的场景

## 5.SpringBoot的核心注解是哪个？它主要由哪几个注解组成的？

@SpringBootApplication里面包含@ComponentScan,@EnableAutoConfiguration,@SpringBootConfiguration

- 1.@ComponentScan：

spring里有四大注解：@Service,@Repository,@Component,@Controller用来定义一个bean.@ComponentScan注解就是用来自动扫描被这些注解标识的类，最终生成ioc容器里的bean．可以通过设置@ComponentScan　basePackages，includeFilters，excludeFilters属性来动态确定自动扫描范围，类型已经不扫描的类型．默认情况下:它扫描所有类型，并且扫描范围是@ComponentScan注解所在配置类包及子包的类

- 2.@SpringBootConfiguration:

这个注解的作用与@Configuration作用相同，都是用来声明当前类是一个配置类．可以通过＠Bean注解生成IOC容器管理的bean，以用来替代spring的xml配置文件
{% highlight ruby linenos %}
@SpringBootApplication
public class QuickStartApplication {
  public static void  main(String[]args){
     SpringApplication.run(QuickStartApplication.class,args);
  }
  @Bean
  public BeanTest beanTest(){
     return  new BeanTest();
  }
}
{% endhighlight %}

- @EnableAutoConfiguration：

自动配置配置，猜测你要用做什么开发，如你在pom里面导入spring-boot-starter-web包，他对自动给你导入相应的web工程必备包，减去了自己导入包的麻烦

## 6.Spring Boot 自动配置原理是什么？

1.SpringBoot启动会加载大量的自动配置类
2.我们看我们需要的功能有没有在SpringBoot默认写好的自动配置类当中；
3.我们再来看这个自动配置类中到底配置了哪些组件；（只要我们要用的组件存在在其中，我们就不需要再手动配置了）
4.给容器中自动配置类添加组件的时候，会从properties类中获取某些属性。我们只需要在配置文件中指定这些属性的值即可；
{% highlight ruby linenos %}
//表示这是一个配置类，和以前编写的配置文件一样，也可以给容器中添加组件；
@Configuration 

//启动指定类的ConfigurationProperties功能；
  //进入这个HttpProperties查看，将配置文件中对应的值和HttpProperties绑定起来；
  //并把HttpProperties加入到ioc容器中
@EnableConfigurationProperties({HttpProperties.class}) 

//Spring底层@Conditional注解
  //根据不同的条件判断，如果满足指定的条件，整个配置类里面的配置就会生效；
  //这里的意思就是判断当前应用是否是web应用，如果是，当前配置类生效
@ConditionalOnWebApplication(
    type = Type.SERVLET
)

//判断当前项目有没有这个类CharacterEncodingFilter；SpringMVC中进行乱码解决的过滤器；
@ConditionalOnClass({CharacterEncodingFilter.class})

//判断配置文件中是否存在某个配置：spring.http.encoding.enabled；
  //如果不存在，判断也是成立的
  //即使我们配置文件中不配置pring.http.encoding.enabled=true，也是默认生效的；
@ConditionalOnProperty(
    prefix = "spring.http.encoding",
    value = {"enabled"},
    matchIfMissing = true
)

public class HttpEncodingAutoConfiguration {
    //他已经和SpringBoot的配置文件映射了
    private final Encoding properties;
    //只有一个有参构造器的情况下，参数的值就会从容器中拿
    public HttpEncodingAutoConfiguration(HttpProperties properties) {
        this.properties = properties.getEncoding();
    }
    
    //给容器中添加一个组件，这个组件的某些值需要从properties中获取
    @Bean
    @ConditionalOnMissingBean //判断容器没有这个组件？
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
        filter.setEncoding(this.properties.getCharset().name());
        filter.setForceRequestEncoding(this.properties.shouldForce(org.springframework.boot.autoconfigure.http.HttpProperties.Encoding.Type.REQUEST));
        filter.setForceResponseEncoding(this.properties.shouldForce(org.springframework.boot.autoconfigure.http.HttpProperties.Encoding.Type.RESPONSE));
        return filter;
    }
    //。。。。。。。
}
{% endhighlight %}

## 7.如何实现Spring Boot 应用程序的安全性？

为了实现Spring Boot的安全性，我们使用spring-boot-starter-security依赖项，并且必须添加安全配置。它只需要很少的代码。配置类将必须扩展WebSecurityConfigurerAdapter 并覆盖其方法。

## 8.什么是FreeMarker模板？

FreeMarker 是一个基于Java的模板引擎，最初专注于使用MVC软件架构进行动态网页生成。使用Freemarker的主要优点是表示层和业务层的完全分离。程序员可以处理应用程序代码，而设计人员可以处理html页面设计。最后使用freemarker可以将这些结合起来，给出最终的输出页面。

## 9.如何使用Spring Boot实现异常处理？

Spring提供了一种使用ControllerAdvice处理异常的非常有用的方法。我们通过实现一个ControlerAdvice类，来处理控制器类抛出的所有异常。

## 10.什么是WebSockets？

WebSocket是一种计算机通信协议，通过单个TCP连接提供全双工通信信道。

WebSocket是双向的-使用WebSocket 客户端或服务器可以发起消息发送。

WebSocket 是全双工的-客户端和服务器通信是相互独立的。

单个TCP连接-初始连接使用HTTP，然后将此连接升级到基于套接字的连接。然后这个单一连接用于所有未来的通信

Light-与http相比，WebSocket 消息数据交换要轻得多。

WebSocket是一种网络通信协议，很多高级功能都需要它。

那么我们有了HTTP协议，为啥还需要另外一个协议呢？答案很简单，因为HTTP协议有一个缺陷：通信只能由客户端发起。

最典型的场景就是聊天室，假如用HTTP协议的话，就只能去轮询获取服务端有没有消息了，而用WebSocket的话，服务端有新消息可以自动推送。

WebSocket协议在2008年诞生，2011年成为国际标准。所有的浏览器都已经支持了。

特点：

服务端可以主动推送信息，属于服务器推送技术的一种。
建立在TCP协议之上，服务端的实现比较容易。
与HTTP协议有着良好的兼容性，默认端口也是80和443，并且握手阶段采用HTTP协议，因此握手时不容易屏蔽，能通过各种HTTP代理服务器。
数据格式比较轻量，性能开销小，通信高效。
可以发送文本，也可以发送二进制数据。
没有同源限制，客户端可以与任意服务器通信。
协议标识符是ws（如果加密，则为wss），服务器网址就是URL。