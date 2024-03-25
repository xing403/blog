import{l as c,a as p,ah as a,m as n,M as l,O as m,U as e,p as h,aR as s}from"./chunks/framework.7WxYM5Sz.js";const u=c({__name:"date-time-parameter",setup(d){const t=p([{identification:"YY",example:"18",description:"年，两位数"},{identification:"YYYY",example:"2018",description:"年，四位数"},{identification:"M",example:"1-12",description:"月"},{identification:"MM",example:"01-12",description:"月，两位数"},{identification:"MMM",example:"Jan-Dec",description:"月，英文缩写"},{identification:"MMMM",example:"January-December",description:"月，英文全称"},{identification:"D",example:"1-31",description:"日"},{identification:"DD",example:"01",description:"日，两位数"},{identification:"d",example:"0-6",description:"一周中的一天，星期天是 0"},{identification:"dd",example:"Su-Sa",description:"星期，最简写的星期几"},{identification:"ddd",example:"Sun-Sat",description:"简写的星期几"},{identification:"dddd",example:"Sunday-Saturday",description:"星期几，英文全称"},{identification:"H",example:"0-23",description:"小时"},{identification:"HH",example:"00-23",description:"小时，两位数"},{identification:"h",example:"1-12",description:"12小时制小时"},{identification:"hh",example:"01-12",description:"12小时制小时, 两位数"},{identification:"m",example:"0-59",description:"分钟"},{identification:"mm",example:"00-59",description:"分钟，两位数"},{identification:"s",example:"0-59",description:"秒"},{identification:"ss",example:"00-59",description:"秒，两位数"},{identification:"S",example:"0-9",description:"毫秒"},{identification:"SS",example:"00-99",description:"毫秒，两位数"},{identification:"SSS",example:"000-999",description:"毫秒，三位数"},{identification:"A",example:"AM/PM",description:"上午/下午 大写"},{identification:"a",example:"am/pm",description:"上午/下午 小写"},{identification:"Z",example:"+08:00",description:"UTC 偏移量, ±HH:mm"},{identification:"ZZ",example:"+0800",description:"UTC 的偏移量, ±HHmm"}]);return(r,b)=>{const i=a("el-table-column"),o=a("el-table");return n(),l(o,{data:t.value,stripe:"",border:""},{default:m(()=>[e(i,{prop:"identification",label:"identification"}),e(i,{prop:"example",label:"example"}),e(i,{prop:"description",label:"description"})]),_:1},8,["data"])}}}),_=s('<h1 id="date-time" tabindex="-1">date-time <a class="header-anchor" href="#date-time" aria-label="Permalink to &quot;date-time&quot;">​</a></h1><p>get current date and time</p><h2 id="parameter" tabindex="-1">parameter <a class="header-anchor" href="#parameter" aria-label="Permalink to &quot;parameter&quot;">​</a></h2><p><code>format</code>: format of the date and time, Non-required field, default: <code>YYYY-MM-DD HH:mm:ss</code>.</p><h3 id="more-parameter" tabindex="-1">more parameter <a class="header-anchor" href="#more-parameter" aria-label="Permalink to &quot;more parameter&quot;">​</a></h3>',5),f=s(`<h2 id="the-directive-run-result" tabindex="-1">the directive run result <a class="header-anchor" href="#the-directive-run-result" aria-label="Permalink to &quot;the directive run result&quot;">​</a></h2><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;current date time&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,2),S=JSON.parse('{"title":"date-time","description":"","frontmatter":{"layout":"doc","title":"date-time"},"headers":[],"relativePath":"project/schedule/directives/date-time.md","filePath":"project/schedule/directives/date-time.md","lastUpdated":1702524439000}'),x={name:"project/schedule/directives/date-time.md"},v=Object.assign(x,{setup(d){return(t,r)=>(n(),h("div",null,[_,e(u),f]))}});export{S as __pageData,v as default};
