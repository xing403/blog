import{_ as o,C as a,c as t,H as n,k as s,w as r,a as l,Q as c,o as i}from"./chunks/framework.b0840c63.js";const k=JSON.parse('{"title":"单链表","description":"","frontmatter":{"title":"单链表","layout":"doc"},"headers":[],"relativePath":"blogs/data-structure/link-list.md","filePath":"blogs/data-structure/link-list.md","lastUpdated":1698109494000}'),y={name:"blogs/data-structure/link-list.md"},d=s("h1",{id:"单链表",tabindex:"-1"},[l("单链表 "),s("a",{class:"header-anchor",href:"#单链表","aria-label":'Permalink to "单链表"'},"​")],-1),E={style:{display:"flex",gap:"10px"}},h=c(`<h2 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h2><p>线性表的链式存储又称单链表，它是只通过一组任意的存储单元来存储线性表的数据元素。为建立数据元素之间的线性关系，每个链表节点除了存放元素自身的信息外，还需要存放指向其后继的指针。</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">typedef</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Node</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  ElementType data;</span><span style="color:#6A737D;">    // 数据域，存放数据</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Node</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">next;</span><span style="color:#6A737D;">   // 指针域，存放其后继节点的地址</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span><span style="color:#B392F0;">LNode</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">typedef</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Node</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  ElementType data;</span><span style="color:#6A737D;">    // 数据域，存放数据</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Node</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">next;</span><span style="color:#6A737D;">   // 指针域，存放其后继节点的地址</span></span>
<span class="line"><span style="color:#24292E;">}</span><span style="color:#6F42C1;">LNode</span><span style="color:#24292E;">;</span></span></code></pre></div><h2 id="头指针和头结点的区别" tabindex="-1">头指针和头结点的区别 <a class="header-anchor" href="#头指针和头结点的区别" aria-label="Permalink to &quot;头指针和头结点的区别&quot;">​</a></h2><p>不管带不带头节点，头指针始终指向链表的第一个节点，而头结点是带头结点的链表中的第一个节点，节点数据域通常不存储信息。 头结点的有点：</p><ul><li>由于第一个数据节点的位置被存放在头结点的指针域中，云次在链表的第一个位置上的操作和在表的其他位置操作一致，无需进行特殊处理。</li><li>无论链表是否为空，其头指针都指向头结点的非空指针(空表中头结点的指针域为空)，因此空表和非空表的处理也得到了统一。</li></ul><h2 id="链表基本操作" tabindex="-1">链表基本操作 <a class="header-anchor" href="#链表基本操作" aria-label="Permalink to &quot;链表基本操作&quot;">​</a></h2><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">InitLinkList</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">L);</span><span style="color:#6A737D;">                // 初始化链表</span></span>
<span class="line"><span style="color:#B392F0;">BeforeHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">L, data);</span><span style="color:#6A737D;">          // 头插法</span></span>
<span class="line"><span style="color:#B392F0;">AfterHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">L, data);</span><span style="color:#6A737D;">           // 尾插法</span></span>
<span class="line"><span style="color:#B392F0;">BeforeInsert</span><span style="color:#E1E4E8;">(p, data);</span><span style="color:#6A737D;">           // p 节点之前插入</span></span>
<span class="line"><span style="color:#B392F0;">AfterInsert</span><span style="color:#E1E4E8;">(p, data);</span><span style="color:#6A737D;">            // p 节点之后插入</span></span>
<span class="line"><span style="color:#B392F0;">BeforeDelete</span><span style="color:#E1E4E8;">(p, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">data);</span><span style="color:#6A737D;">          // 删除 p 节点之前节点</span></span>
<span class="line"><span style="color:#B392F0;">AfterDelete</span><span style="color:#E1E4E8;">(p, </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">data);</span><span style="color:#6A737D;">           // 删除 p 节点之后节点</span></span>
<span class="line"><span style="color:#E1E4E8;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">InitLinkList</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">L);</span><span style="color:#6A737D;">                // 初始化链表</span></span>
<span class="line"><span style="color:#6F42C1;">BeforeHeader</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">L, data);</span><span style="color:#6A737D;">          // 头插法</span></span>
<span class="line"><span style="color:#6F42C1;">AfterHeader</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">L, data);</span><span style="color:#6A737D;">           // 尾插法</span></span>
<span class="line"><span style="color:#6F42C1;">BeforeInsert</span><span style="color:#24292E;">(p, data);</span><span style="color:#6A737D;">           // p 节点之前插入</span></span>
<span class="line"><span style="color:#6F42C1;">AfterInsert</span><span style="color:#24292E;">(p, data);</span><span style="color:#6A737D;">            // p 节点之后插入</span></span>
<span class="line"><span style="color:#6F42C1;">BeforeDelete</span><span style="color:#24292E;">(p, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">data);</span><span style="color:#6A737D;">          // 删除 p 节点之前节点</span></span>
<span class="line"><span style="color:#6F42C1;">AfterDelete</span><span style="color:#24292E;">(p, </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">data);</span><span style="color:#6A737D;">           // 删除 p 节点之后节点</span></span>
<span class="line"><span style="color:#24292E;">...</span></span></code></pre></div><h2 id="特殊链表" tabindex="-1">特殊链表 <a class="header-anchor" href="#特殊链表" aria-label="Permalink to &quot;特殊链表&quot;">​</a></h2><h3 id="双链表" tabindex="-1">双链表 <a class="header-anchor" href="#双链表" aria-label="Permalink to &quot;双链表&quot;">​</a></h3><h3 id="循环链表" tabindex="-1">循环链表 <a class="header-anchor" href="#循环链表" aria-label="Permalink to &quot;循环链表&quot;">​</a></h3><h3 id="循环双链表" tabindex="-1">循环双链表 <a class="header-anchor" href="#循环双链表" aria-label="Permalink to &quot;循环双链表&quot;">​</a></h3><h3 id="静态链表" tabindex="-1">静态链表 <a class="header-anchor" href="#静态链表" aria-label="Permalink to &quot;静态链表&quot;">​</a></h3>`,13);function u(A,_,m,f,D,b){const p=a("el-divider"),e=a("el-tag");return i(),t("div",null,[d,n(p),s("div",E,[n(e,null,{default:r(()=>[l("data structure")]),_:1})]),h])}const g=o(y,[["render",u]]);export{k as __pageData,g as default};