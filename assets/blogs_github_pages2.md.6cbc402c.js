import{_ as t,C as o,c,H as s,k as p,w as l,a,Q as r,o as i}from"./chunks/framework.b5bec2ca.js";const B=JSON.parse('{"title":"GitHub pages2","description":"","frontmatter":{"title":"GitHub pages2","layout":"doc"},"headers":[],"relativePath":"blogs/github/pages2.md","filePath":"blogs/github/pages2.md","lastUpdated":1696985159000}'),y={name:"blogs/github/pages2.md"},d=p("h1",{id:"github-pages2",tabindex:"-1"},[a("GitHub pages2 "),p("a",{class:"header-anchor",href:"#github-pages2","aria-label":'Permalink to "GitHub pages2"'},"​")],-1),E={style:{display:"flex",gap:"10px"}},u=r(`<blockquote><p>第二种配置自动部署方式</p></blockquote><h2 id="_1-创建新仓库" tabindex="-1">1. 创建新仓库 <a class="header-anchor" href="#_1-创建新仓库" aria-label="Permalink to &quot;1. 创建新仓库&quot;">​</a></h2><ol><li>创建一个新的仓库放置打包的文件</li></ol><blockquote><p>将仓库命名为 <code>&lt;username&gt;.github.io</code> -username 为用户名</p></blockquote><h2 id="_2-配置脚本" tabindex="-1">2. 配置脚本 <a class="header-anchor" href="#_2-配置脚本" aria-label="Permalink to &quot;2. 配置脚本&quot;">​</a></h2><p>在项目的根目录下 deploy.sh 文件中添加如下脚本</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#6A737D;"># 打包项目</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docs:build</span></span>
<span class="line"><span style="color:#6A737D;"># 切换到dist目录</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.vitepress/dist/</span></span>
<span class="line"><span style="color:#6A737D;"># 将打包文件提交到新仓库中</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">commit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;deploy&#39;</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">push</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">git@github.com:xing403/xing403.github.io.git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">master</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#6A737D;"># 打包项目</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docs:build</span></span>
<span class="line"><span style="color:#6A737D;"># 切换到dist目录</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.vitepress/dist/</span></span>
<span class="line"><span style="color:#6A737D;"># 将打包文件提交到新仓库中</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">commit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;deploy&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">push</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">git@github.com:xing403/xing403.github.io.git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">master</span></span></code></pre></div><h2 id="_3-配置script-命令" tabindex="-1">3. 配置script 命令 <a class="header-anchor" href="#_3-配置script-命令" aria-label="Permalink to &quot;3. 配置script 命令&quot;">​</a></h2><p>在 package.json 文件中添加如下命令</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;scripts&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;deploy:github&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;deploy.sh&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;scripts&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;deploy:github&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;deploy.sh&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_4-本地执行" tabindex="-1">4. 本地执行 <a class="header-anchor" href="#_4-本地执行" aria-label="Permalink to &quot;4. 本地执行&quot;">​</a></h2><p>在项目根目录下执行</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deploy:github</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deploy:github</span></span></code></pre></div>`,13);function h(g,F,b,_,C,m){const e=o("el-divider"),n=o("el-tag");return i(),c("div",null,[d,s(e),p("div",E,[s(n,null,{default:l(()=>[a("github")]),_:1}),s(n,null,{default:l(()=>[a("pages")]),_:1}),s(n,null,{default:l(()=>[a("tools")]),_:1}),s(n,null,{default:l(()=>[a("automation")]),_:1})]),u])}const k=t(y,[["render",h]]);export{B as __pageData,k as default};
