import{_ as t,C as o,c,H as s,k as p,w as l,a as n,Q as r,o as y}from"./chunks/framework.49667a17.js";const C=JSON.parse('{"title":"Redis utils文件","description":"","frontmatter":{"title":"Redis utils文件","layout":"doc"},"headers":[],"relativePath":"blogs/java/redis-utils.md","filePath":"blogs/java/redis-utils.md","lastUpdated":1697914235000}'),E={name:"blogs/java/redis-utils.md"},i=p("h1",{id:"redis-utils文件",tabindex:"-1"},[n("Redis utils文件 "),p("a",{class:"header-anchor",href:"#redis-utils文件","aria-label":'Permalink to "Redis utils文件"'},"​")],-1),A={style:{display:"flex",gap:"10px"}},D=r(`<h2 id="在项目启动目录创建-utils-rediscache-java" tabindex="-1">在项目启动目录创建 utils -&gt; RedisCache.java <a class="header-anchor" href="#在项目启动目录创建-utils-rediscache-java" aria-label="Permalink to &quot;在项目启动目录创建 utils -&gt; RedisCache.java&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Collection;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Iterator;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.List;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Map;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Set;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.concurrent.TimeUnit;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.data.redis.core.BoundSetOperations;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.data.redis.core.HashOperations;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.data.redis.core.RedisTemplate;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.data.redis.core.ValueOperations;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * spring redis 工具类</span></span>
<span class="line"><span style="color:#6A737D;"> **/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SuppressWarnings</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span><span style="color:#9ECBFF;">&quot;unchecked&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;rawtypes&quot;</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RedisCache</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> RedisTemplate redisTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存基本的对象，Integer、String、实体类等</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">   缓存的键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">value</span><span style="color:#6A737D;"> 缓存的值</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setCache</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> T </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        redisTemplate.</span><span style="color:#B392F0;">opsForValue</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(key, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存基本的对象，Integer、String、实体类等</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">      缓存的键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">value</span><span style="color:#6A737D;">    缓存的值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;">  时间</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeUnit</span><span style="color:#6A737D;"> 时间颗粒度</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setCache</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> T </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Integer </span><span style="color:#FFAB70;">timeout</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> TimeUnit </span><span style="color:#FFAB70;">timeUnit</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        redisTemplate.</span><span style="color:#B392F0;">opsForValue</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(key, value, timeout, timeUnit);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 设置有效时间</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">     Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> true=设置成功；false=设置失败</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">expire</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">expire</span><span style="color:#E1E4E8;">(key, timeout, TimeUnit.SECONDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 设置有效时间</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">     Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> true=设置成功；false=设置失败</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">expire</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> TimeUnit </span><span style="color:#FFAB70;">unit</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">expire</span><span style="color:#E1E4E8;">(key, timeout, unit);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取有效时间</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;"> Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 有效时间</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getExpire</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">getExpire</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 判断 key是否存在</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;"> 键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> true 存在 false不存在</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Boolean </span><span style="color:#B392F0;">hasKey</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">hasKey</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的基本对象。</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;"> 缓存键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 缓存键值对应的数据</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; T </span><span style="color:#B392F0;">getCache</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ValueOperations&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; operation </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForValue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> operation.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 删除单个对象</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 删除集合对象</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">collection</span><span style="color:#6A737D;"> 多个对象</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Collection </span><span style="color:#FFAB70;">collection</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(collection) </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存List数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">      缓存的键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">dataList</span><span style="color:#6A737D;"> 待缓存的List数据</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 缓存的对象</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setCacheList</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">dataList</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Long count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForList</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">rightPushAll</span><span style="color:#E1E4E8;">(key, dataList);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> count;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的list对象</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;"> 缓存的键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 缓存键值对应的数据</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; List&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getCacheList</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForList</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">range</span><span style="color:#E1E4E8;">(key, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存Set</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">     缓存键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">dataSet</span><span style="color:#6A737D;"> 缓存的数据</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 缓存数据的对象</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; BoundSetOperations&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">setCacheSet</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Set&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">dataSet</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        BoundSetOperations&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; setOperation </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">boundSetOps</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Iterator&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; it </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> dataSet.</span><span style="color:#B392F0;">iterator</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (it.</span><span style="color:#B392F0;">hasNext</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            setOperation.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(it.</span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> setOperation;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的set</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; Set&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getCacheSet</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForSet</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">members</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存Map</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">dataMap</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setCacheMap</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">dataMap</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (dataMap </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            redisTemplate.</span><span style="color:#B392F0;">opsForHash</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">putAll</span><span style="color:#E1E4E8;">(key, dataMap);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的Map</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getCacheMap</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForHash</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">entries</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 往Hash中存入数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">   Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">hKey</span><span style="color:#6A737D;">  Hash键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">value</span><span style="color:#6A737D;"> 值</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setCacheMapValue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">hKey</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> T </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        redisTemplate.</span><span style="color:#B392F0;">opsForHash</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(key, hKey, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取Hash中的数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">  Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">hKey</span><span style="color:#6A737D;"> Hash键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> Hash中的对象</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; T </span><span style="color:#B392F0;">getCacheMapValue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">hKey</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        HashOperations&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; opsForHash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForHash</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> opsForHash.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key, hKey);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取多个Hash中的数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">   Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">hKeys</span><span style="color:#6A737D;"> Hash键集合</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> Hash对象集合</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; List&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getMultiCacheMapValue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Collection&lt;</span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">hKeys</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForHash</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">multiGet</span><span style="color:#E1E4E8;">(key, hKeys);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 删除Hash中的某条数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span><span style="color:#6A737D;">  Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">hKey</span><span style="color:#6A737D;"> Hash键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否成功</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deleteCacheMapValue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">hKey</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForHash</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(key, hKey) </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的基本对象列表</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">pattern</span><span style="color:#6A737D;"> 字符串前缀</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 对象列表</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Collection&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String </span><span style="color:#FFAB70;">pattern</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;">(pattern);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Collection;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Iterator;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.List;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Map;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Set;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.concurrent.TimeUnit;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.data.redis.core.BoundSetOperations;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.data.redis.core.HashOperations;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.data.redis.core.RedisTemplate;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.data.redis.core.ValueOperations;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * spring redis 工具类</span></span>
<span class="line"><span style="color:#6A737D;"> **/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SuppressWarnings</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span><span style="color:#032F62;">&quot;unchecked&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;rawtypes&quot;</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RedisCache</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> RedisTemplate redisTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存基本的对象，Integer、String、实体类等</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">   缓存的键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">value</span><span style="color:#6A737D;"> 缓存的值</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setCache</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> T </span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        redisTemplate.</span><span style="color:#6F42C1;">opsForValue</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(key, value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存基本的对象，Integer、String、实体类等</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">      缓存的键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">value</span><span style="color:#6A737D;">    缓存的值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;">  时间</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeUnit</span><span style="color:#6A737D;"> 时间颗粒度</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setCache</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> T </span><span style="color:#E36209;">value</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Integer </span><span style="color:#E36209;">timeout</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> TimeUnit </span><span style="color:#E36209;">timeUnit</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        redisTemplate.</span><span style="color:#6F42C1;">opsForValue</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(key, value, timeout, timeUnit);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 设置有效时间</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">     Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> true=设置成功；false=设置失败</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">expire</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#E36209;">timeout</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">expire</span><span style="color:#24292E;">(key, timeout, TimeUnit.SECONDS);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 设置有效时间</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">     Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> true=设置成功；false=设置失败</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">expire</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#E36209;">timeout</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> TimeUnit </span><span style="color:#E36209;">unit</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">expire</span><span style="color:#24292E;">(key, timeout, unit);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取有效时间</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;"> Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 有效时间</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getExpire</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">getExpire</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 判断 key是否存在</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;"> 键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> true 存在 false不存在</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Boolean </span><span style="color:#6F42C1;">hasKey</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">hasKey</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的基本对象。</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;"> 缓存键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 缓存键值对应的数据</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; T </span><span style="color:#6F42C1;">getCache</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        ValueOperations&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; operation </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForValue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> operation.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 删除单个对象</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 删除集合对象</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">collection</span><span style="color:#6A737D;"> 多个对象</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Collection </span><span style="color:#E36209;">collection</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(collection) </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存List数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">      缓存的键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">dataList</span><span style="color:#6A737D;"> 待缓存的List数据</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 缓存的对象</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setCacheList</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">dataList</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Long count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForList</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">rightPushAll</span><span style="color:#24292E;">(key, dataList);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> count;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的list对象</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;"> 缓存的键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 缓存键值对应的数据</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; List&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getCacheList</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForList</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">range</span><span style="color:#24292E;">(key, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存Set</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">     缓存键值</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">dataSet</span><span style="color:#6A737D;"> 缓存的数据</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 缓存数据的对象</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; BoundSetOperations&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">setCacheSet</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Set&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">dataSet</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        BoundSetOperations&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; setOperation </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">boundSetOps</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">        Iterator&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; it </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> dataSet.</span><span style="color:#6F42C1;">iterator</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (it.</span><span style="color:#6F42C1;">hasNext</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            setOperation.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(it.</span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> setOperation;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的set</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; Set&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getCacheSet</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForSet</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">members</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 缓存Map</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">dataMap</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setCacheMap</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">dataMap</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (dataMap </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            redisTemplate.</span><span style="color:#6F42C1;">opsForHash</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">putAll</span><span style="color:#24292E;">(key, dataMap);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的Map</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getCacheMap</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForHash</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">entries</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 往Hash中存入数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">   Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">hKey</span><span style="color:#6A737D;">  Hash键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">value</span><span style="color:#6A737D;"> 值</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setCacheMapValue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">hKey</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> T </span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        redisTemplate.</span><span style="color:#6F42C1;">opsForHash</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(key, hKey, value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取Hash中的数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">  Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">hKey</span><span style="color:#6A737D;"> Hash键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> Hash中的对象</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; T </span><span style="color:#6F42C1;">getCacheMapValue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">hKey</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        HashOperations&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; opsForHash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForHash</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> opsForHash.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key, hKey);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取多个Hash中的数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">   Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">hKeys</span><span style="color:#6A737D;"> Hash键集合</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> Hash对象集合</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> &lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; List&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getMultiCacheMapValue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Collection&lt;</span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">hKeys</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForHash</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">multiGet</span><span style="color:#24292E;">(key, hKeys);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 删除Hash中的某条数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span><span style="color:#6A737D;">  Redis键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">hKey</span><span style="color:#6A737D;"> Hash键</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否成功</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deleteCacheMapValue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">hKey</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForHash</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(key, hKey) </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获得缓存的基本对象列表</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">pattern</span><span style="color:#6A737D;"> 字符串前缀</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 对象列表</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Collection&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String </span><span style="color:#E36209;">pattern</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;">(pattern);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,2);function F(u,m,g,d,B,k){const e=o("el-divider"),a=o("el-tag");return y(),c("div",null,[i,s(e),p("div",A,[s(a,null,{default:l(()=>[n("java")]),_:1}),s(a,null,{default:l(()=>[n("SpringBoot")]),_:1}),s(a,null,{default:l(()=>[n("utils")]),_:1})]),D])}const T=t(E,[["render",F]]);export{C as __pageData,T as default};
