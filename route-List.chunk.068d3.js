(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{GCy2:function(e,t,r){"use strict";r.r(t);var n=r("hosL"),i=r("83Vu"),s=r("IELz"),c=r.n(s),a=r("PDtE"),u=r("QRet"),o=r("y3o+"),l=r("Y3FI"),p=r("n8fc");t.default=function(){var e=Object(u.a)(i.a).state,t=Object(u.b)((function(){var t,r=e.site&&null!=(t=o.a[e.site])?t:null,n=Object.keys(o.b).map((function(e){return{key:e,applicable:!r||!!r.presets[e]}}));return n.sort((function(e,t){return e.key.localeCompare(t.key)})),n}),[e.site]),r=t.filter((function(e){return e.applicable})).length,s=Object(u.d)(!1),b=s[0],f=s[1];return Object(n.f)(n.b,null,Object(n.f)("div",{class:c.a.container},Object(n.f)("div",{class:c.a.breadcrumb},Object(n.f)(l.a,{href:"/"},"mirror-recipes")),Object(n.f)("div",{class:c.a["title-row"]},Object(n.f)("div",{class:c.a.title},"List"),Object(n.f)("div",{class:c.a.sep},"/"),Object(n.f)("div",{class:c.a.preset},Object(n.f)("div",{class:c.a.hint},"Preset"),Object(n.f)(p.a,null)),Object(n.f)("div",{class:c.a.counter},Object(n.f)("div",{class:c.a.hint},"Count"),null===e.site?Object.keys(o.b).length+" recipies":r+"/"+Object.keys(o.b).length+"  applicable"))),Object(n.f)("div",{class:c.a.container},null!==e.site&&Object(n.f)("div",{class:c.a.warning},"Some recipes may not be applicable to this preset. Click"," ",Object(n.f)("a",{onClick:function(){return f(!b)}},"here")," to"," ",b?"hide":"show"," them."),t.map((function(e){var t,r=e.key,i=e.applicable;if(!i&&!b)return null;var s=o.b[r];return Object(n.f)(l.a,{href:"/recipe/"+r,class:Object(a.a)(c.a.entry,(t={},t[c.a["non-applicable"]]=!i,t))},Object(n.f)("div",{class:c.a["entry-title"]},r),Object(n.f)("div",{class:c.a["entry-desc"]},s.procedures.length," procedures / ",Object.keys(s.params).length," params"))}))))}},IELz:function(e){e.exports={container:"container__2hjHJ",title:"title__ppfmn","title-row":"title-row__1fioq",sep:"sep__ddU2a",hint:"hint__3EiYj",breadcrumb:"breadcrumb__3fOXX",preset:"preset__nfoKa",warning:"warning__1ykwW",counter:"counter__6p-pJ",entry:"entry__cqeQh","entry-title":"entry-title__8Xwjn","entry-desc":"entry-desc__3_CD1","non-applicable":"non-applicable__2INTq"}},Mauj:function(e,t,r){function n(e){var t=i(e);return r(t)}function i(e){if(!r.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}var s={"./TUNA.yaml":"Ta76"};n.keys=function(){return Object.keys(s)},n.resolve=i,e.exports=n,n.id="Mauj"},PDtE:function(e,t){"use strict";function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}t.a=function(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(i&&(i+=" "),i+=t);return i}},Ta76:function(e){e.exports=JSON.parse('{"homepage":"https://mirrors.tuna.tsinghua.edu.cn","fullname":"Tsinghua University Open Source Mirrors","shared":{"SITE_BASE":"https://mirrors.tuna.tsinghua.edu.cn"},"presets":{"ubuntu":{"BASE":"{SITE_BASE}/ubuntu"}}}')},hFeo:function(e){e.exports=JSON.parse('{"params":{"DIST":{"possible-value":["ubuntu"]},"RELEASE":{"description":"The formal release name of the ubuntu version","possible-value":["focal","bionic","xenial"],"obtained-by":"cat /etc/apt/sources.list | awk \'{ print $3 }\' | grep -v - | head -n 1"},"BASE":{"description":"The base of the mirror","default":"https://mirrors.tuna.tsinghua.edu.cn/ubuntu"}},"steps":{"change-sources-list":{"replace":"/etc/apt/sources.list","with":"deb {BASE} {RELEASE} main restricted universe multiverse\\ndeb {BASE} {RELEASE}-security main restricted universe multiverse\\ndeb {BASE} {RELEASE}-backports main restricted universe multiverse\\ndeb {BASE} {RELEASE}-updates main restricted universe multiverse\\n# Enable if you want to get proposed packages\\n# deb {BASE} {RELEASE}-proposed main restricted universe multiverse\\n\\ndeb-src {BASE} {RELEASE} main restricted universe multiverse\\ndeb-src {BASE} {RELEASE}-security main restricted universe multiverse\\ndeb-src {BASE} {RELEASE}-backports main restricted universe multiverse\\ndeb-src {BASE} {RELEASE}-updates main restricted universe multiverse\\n# Enable if you want to get proposed packages\\n# deb-src {BASE} {RELEASE}-proposed main restricted universe multiverse\\n"}},"procedures":[{"when":{"DIST":"ubuntu"},"steps":[{"do":"change-sources-list"},{"run":"sudo apt update"}]}]}')},jh0i:function(e){e.exports={select:"select__1gF0M"}},n8fc:function(e,t,r){"use strict";var n=r("hosL"),i=r("QRet"),s=r("83Vu"),c=r("y3o+"),a=r("jh0i"),u=r.n(a);t.a=function(){var e,t=Object(i.a)(s.a),r=t.state,a=t.dispatch;return Object(n.f)("select",{class:u.a.select,value:null!=(e=r.site)?e:"__unset__",onChange:function(e){return a({type:"SetSite",site:"__unset__"===e.currentTarget.value?null:e.currentTarget.value})}},Object(n.f)("option",{value:"__unset__"},"Unset"),Object(n.f)("optgroup",null,Object.keys(c.a).map((function(e){return Object(n.f)("option",{value:e,key:e},e)}))))}},"y3o+":function(e,t,r){"use strict";function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e){var t,r;return null!=(t=null==(r=e.match(/\/(.*).ya?ml$/))?void 0:r[1])?t:""}r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return l}));var a=r("zBN9"),u=r("Mauj"),o=a.keys().reduce((function(e,t){var r;return i(i({},e),{},((r={})[c(t)]=a(t),r))}),{}),l=u.keys().reduce((function(e,t){var r;return i(i({},e),{},((r={})[c(t)]=u(t),r))}),{})},zBN9:function(e,t,r){function n(e){var t=i(e);return r(t)}function i(e){if(!r.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}var s={"./ubuntu.yaml":"hFeo"};n.keys=function(){return Object.keys(s)},n.resolve=i,e.exports=n,n.id="zBN9"}}]);
//# sourceMappingURL=route-List.chunk.068d3.js.map