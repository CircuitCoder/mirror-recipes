module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s="qVkA")}({"++6B":function(e,t,r){e.exports={container:"container__1bdtp",title:"title__3q31p","title-row":"title-row__395Ks",sep:"sep__zj3cc",hint:"hint__2xB8n",breadcrumb:"breadcrumb__2SMJD",preset:"preset__1iX0X"}},"6Fm8":function(e,t,r){},DU1j:function(e,t,r){},HteQ:function(e,t){e.exports=require("preact")},IELz:function(e,t,r){e.exports={container:"container__2hjHJ",title:"title__ppfmn","title-row":"title-row__1fioq",sep:"sep__ddU2a",hint:"hint__3EiYj",breadcrumb:"breadcrumb__3fOXX",preset:"preset__nfoKa",warning:"warning__1ykwW",counter:"counter__6p-pJ",entry:"entry__cqeQh","entry-title":"entry-title__8Xwjn","entry-desc":"entry-desc__3_CD1","non-applicable":"non-applicable__2INTq"}},Mauj:function(e,t,r){var n={"./TUNA.yaml":"Ta76"};function i(e){var t=o(e);return r(t)}function o(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}i.keys=function(){return Object.keys(n)},i.resolve=o,e.exports=i,i.id="Mauj"},Okkg:function(e,t,r){e.exports={container:"container__3aHDU",title:"title__51rU6","title-row":"title-row__A5KHy",sep:"sep__2vA5P",hint:"hint__vON0K",breadcrumb:"breadcrumb__3Z2eO",banner:"banner__2DpRy",button:"button__OEVpU",primary:"primary__3C8bN",buttons:"buttons__33s12",tldr:"tldr__F6KuF",sub:"sub__2gVta"}},Ta76:function(e){e.exports=JSON.parse('{"homepage":"https://mirrors.tuna.tsinghua.edu.cn","fullname":"Tsinghua University Open Source Mirrors","shared":{"SITE_BASE":"https://mirrors.tuna.tsinghua.edu.cn"},"presets":{"ubuntu":{"BASE":"{SITE_BASE}/ubuntu"},"AUR":{"URL":"https://aur.mirrors.tuna.tsinghua.edu.cn/"},"archlinux":{"BASE":"{SITE_BASE}/archlinux"}}}')},bbG7:function(e,t,r){e.exports={footer:"footer__35uS-",inner:"inner__BuOt4"}},bbHE:function(e){e.exports=JSON.parse('{"params":{"DIST":{"possible-value":["archlinux"]},"URL":{"description":"The URL of the mirror"},"TOOL":{"description":"The tool you use","possible-value":["yay","yaourt"]}},"procedures":[{"when":{"DIST":"archlinux","TOOL":"yay"},"steps":[{"run":"yay --aururl \\"{URL}\\" --save"}]},{"when":{"DIST":"archlinux","TOOL":"yaourt"},"steps":[{"append":"/etc/yaourtrc"},{"with":"AURURL=\\"{URL}\\""}]}]}')},hFeo:function(e){e.exports=JSON.parse('{"params":{"DIST":{"possible-value":["ubuntu"]},"RELEASE":{"description":"The formal release name of the ubuntu version","possible-value":["focal","bionic","xenial"],"obtained-by":"cat /etc/apt/sources.list | awk \'{ print $3 }\' | grep -v - | head -n 1"},"BASE":{"description":"The base of the mirror"}},"steps":{"change-sources-list":{"replace":"/etc/apt/sources.list","with":"deb {BASE} {RELEASE} main restricted universe multiverse\\ndeb {BASE} {RELEASE}-security main restricted universe multiverse\\ndeb {BASE} {RELEASE}-backports main restricted universe multiverse\\ndeb {BASE} {RELEASE}-updates main restricted universe multiverse\\n# Enable if you want to get proposed packages\\n# deb {BASE} {RELEASE}-proposed main restricted universe multiverse\\n\\ndeb-src {BASE} {RELEASE} main restricted universe multiverse\\ndeb-src {BASE} {RELEASE}-security main restricted universe multiverse\\ndeb-src {BASE} {RELEASE}-backports main restricted universe multiverse\\ndeb-src {BASE} {RELEASE}-updates main restricted universe multiverse\\n# Enable if you want to get proposed packages\\n# deb-src {BASE} {RELEASE}-proposed main restricted universe multiverse\\n"}},"procedures":[{"when":{"DIST":"ubuntu"},"steps":[{"do":"change-sources-list"},{"run":"sudo apt update"}]}]}')},jh0i:function(e,t,r){e.exports={select:"select__1gF0M"}},qVkA:function(e,t,r){"use strict";r.r(t);var n,i,o,a=r("HteQ"),c=0,s=[],u=a.options.__b,l=a.options.__r,p=a.options.diffed,h=a.options.__c,f=a.options.unmount;function b(e,t){a.options.__h&&a.options.__h(i,e,c||t),c=0;var r=i.__H||(i.__H={__:[],__h:[]});return e>=r.__.length&&r.__.push({}),r.__[e]}function d(e){return c=1,v(w,e)}function v(e,t,r){var o=b(n++,2);return o.t=e,o.__c||(o.__=[r?r(t):w(void 0,t),function(e){var t=o.t(o.__[0],e);o.__[0]!==t&&(o.__=[t,o.__[1]],o.__c.setState({}))}],o.__c=i),o.__}function m(e,t){var r=b(n++,7);return E(r.__H,t)&&(r.__=e(),r.__H=t,r.__h=e),r.__}function _(e){var t=i.context[e.__c],r=b(n++,9);return r.__c=e,t?(null==r.__&&(r.__=!0,t.sub(i)),t.props.value):e.__}function O(){s.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(j),e.__H.__h.forEach(g),e.__H.__h=[]}catch(t){e.__H.__h=[],a.options.__e(t,e.__v)}})),s=[]}a.options.__b=function(e){i=null,u&&u(e)},a.options.__r=function(e){l&&l(e),n=0;var t=(i=e.__c).__H;t&&(t.__h.forEach(j),t.__h.forEach(g),t.__h=[])},a.options.diffed=function(e){p&&p(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==s.push(t)&&o===a.options.requestAnimationFrame||((o=a.options.requestAnimationFrame)||function(e){var t,r=function(){clearTimeout(n),y&&cancelAnimationFrame(t),setTimeout(e)},n=setTimeout(r,100);y&&(t=requestAnimationFrame(r))})(O)),i=void 0},a.options.__c=function(e,t){t.some((function(e){try{e.__h.forEach(j),e.__h=e.__h.filter((function(e){return!e.__||g(e)}))}catch(r){t.some((function(e){e.__h&&(e.__h=[])})),t=[],a.options.__e(r,e.__v)}})),h&&h(e,t)},a.options.unmount=function(e){f&&f(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(j)}catch(e){a.options.__e(e,t.__v)}};var y="function"==typeof requestAnimationFrame;function j(e){var t=i;"function"==typeof e.__c&&e.__c(),i=t}function g(e){var t=i;e.__c=e.__(),i=t}function E(e,t){return!e||e.length!==t.length||t.some((function(t,r){return t!==e[r]}))}function w(e,t){return"function"==typeof t?t(e):t}var S={};function A(e,t){for(var r in t)e[r]=t[r];return e}function x(e,t,r){var n,i=/(?:\?([^#]*))?(#.*)?$/,o=e.match(i),a={};if(o&&o[1])for(var c=o[1].split("&"),s=0;s<c.length;s++){var u=c[s].split("=");a[decodeURIComponent(u[0])]=decodeURIComponent(u.slice(1).join("="))}e=T(e.replace(i,"")),t=T(t||"");for(var l=Math.max(e.length,t.length),p=0;p<l;p++)if(t[p]&&":"===t[p].charAt(0)){var h=t[p].replace(/(^:|[+*?]+$)/g,""),f=(t[p].match(/[+*?]+$/)||S)[0]||"",b=~f.indexOf("+"),d=~f.indexOf("*"),v=e[p]||"";if(!v&&!d&&(f.indexOf("?")<0||b)){n=!1;break}if(a[h]=decodeURIComponent(v),b||d){a[h]=e.slice(p).map(decodeURIComponent).join("/");break}}else if(t[p]!==e[p]){n=!1;break}return(!0===r.default||!1!==n)&&a}function k(e,t){return e.rank<t.rank?1:e.rank>t.rank?-1:e.index-t.index}function P(e,t){return e.index=t,e.rank=function(e){return e.props.default?0:(t=e.props.path,T(t).map(U).join(""));var t}(e),e.props}function T(e){return e.replace(/(^\/+|\/+$)/g,"").split("/")}function U(e){return":"==e.charAt(0)?1+"*+?".indexOf(e.charAt(e.length-1))||4:5}var R=null,C=[],D=[],L={};function I(){var e;return""+((e=R&&R.location?R.location:R&&R.getCurrentLocation?R.getCurrentLocation():"undefined"!=typeof location?location:L).pathname||"")+(e.search||"")}function B(e,t){return void 0===t&&(t=!1),"string"!=typeof e&&e.url&&(t=e.replace,e=e.url),function(e){for(var t=C.length;t--;)if(C[t].canRoute(e))return!0;return!1}(e)&&function(e,t){void 0===t&&(t="push"),R&&R[t]?R[t](e):"undefined"!=typeof history&&history[t+"State"]&&history[t+"State"](null,null,e)}(e,t?"replace":"push"),N(e)}function N(e){for(var t=!1,r=0;r<C.length;r++)!0===C[r].routeTo(e)&&(t=!0);for(var n=D.length;n--;)D[n](e);return t}function F(e){if(e&&e.getAttribute){var t=e.getAttribute("href"),r=e.getAttribute("target");if(t&&t.match(/^\//g)&&(!r||r.match(/^_?self$/i)))return B(t)}}function M(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||0!==e.button))return F(e.currentTarget||e.target||this),H(e)}function H(e){return e&&(e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.stopPropagation&&e.stopPropagation(),e.preventDefault()),!1}function K(e){if(!(e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||0!==e.button)){var t=e.target;do{if("A"===String(t.nodeName).toUpperCase()&&t.getAttribute("href")){if(t.hasAttribute("native"))return;if(F(t))return H(e)}}while(t=t.parentNode)}}var q=!1;var $=function(e){function t(t){e.call(this,t),t.history&&(R=t.history),this.state={url:t.url||I()},q||("function"==typeof addEventListener&&(R||addEventListener("popstate",(function(){N(I())})),addEventListener("click",K)),q=!0)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.shouldComponentUpdate=function(e){return!0!==e.static||(e.url!==this.props.url||e.onChange!==this.props.onChange)},t.prototype.canRoute=function(e){var t=Object(a.toChildArray)(this.props.children);return this.getMatchingChildren(t,e,!1).length>0},t.prototype.routeTo=function(e){this.setState({url:e});var t=this.canRoute(e);return this.updating||this.forceUpdate(),t},t.prototype.componentWillMount=function(){C.push(this),this.updating=!0},t.prototype.componentDidMount=function(){var e=this;R&&(this.unlisten=R.listen((function(t){e.routeTo(""+(t.pathname||"")+(t.search||""))}))),this.updating=!1},t.prototype.componentWillUnmount=function(){"function"==typeof this.unlisten&&this.unlisten(),C.splice(C.indexOf(this),1)},t.prototype.componentWillUpdate=function(){this.updating=!0},t.prototype.componentDidUpdate=function(){this.updating=!1},t.prototype.getMatchingChildren=function(e,t,r){return e.filter(P).sort(k).map((function(e){var n=x(t,e.props.path,e.props);if(n){if(!1!==r){var i={url:t,matches:n};return A(i,n),delete i.ref,delete i.key,Object(a.cloneElement)(e,i)}return e}})).filter(Boolean)},t.prototype.render=function(e,t){var r=e.children,n=e.onChange,i=t.url,o=this.getMatchingChildren(Object(a.toChildArray)(r),i,!0),c=o[0]||null,s=this.previousUrl;return i!==s&&(this.previousUrl=i,"function"==typeof n&&n({router:this,url:i,previous:s,active:o,current:c})),c},t}(a.Component),J=function(e){return Object(a.createElement)("a",A({onClick:M},e))},X=function(e){return Object(a.createElement)(e.component,e)};$.subscribers=D,$.getCurrentUrl=I,$.route=B,$.Router=$,$.Route=X,$.Link=J,$.exec=x;var z=r("bbG7"),W=r.n(z),V=r("Okkg"),G=r.n(V);function Q(e){var t,r,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=Q(e[t]))&&(n&&(n+=" "),n+=r);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}var Z=function(){for(var e,t,r=0,n="";r<arguments.length;)(e=arguments[r++])&&(t=Q(e))&&(n&&(n+=" "),n+=t);return n},Y=function(){return Object(a.h)(a.Fragment,null,Object(a.h)("div",{class:G.a.banner},Object(a.h)("div",{class:G.a.container},Object(a.h)("div",{class:G.a.title},"mirror-recipes"),Object(a.h)("div",{class:G.a.buttons},Object(a.h)("a",{href:"https://github.com/CircuitCoder/mirror-recipes/releases"},Object(a.h)("button",{class:Z(G.a.button,G.a.primary)},"Download Driver")),Object(a.h)(J,{href:"/recipe"},Object(a.h)("button",{class:G.a.button},"Explore Recipes"))))),Object(a.h)("div",{class:G.a.container},Object(a.h)("div",{class:G.a.tldr},Object(a.h)("p",null,Object(a.h)("a",{href:"https://github.com/CircuitCoder/mirror-recipes"},"mirror-recipes")," ","is a project aiming to produce a general description of"," ",Object(a.h)("strong",null,"procedures to apply various open source mirrors"),", so that it can be used as:",Object(a.h)("ul",null,Object(a.h)("li",null,"a source format to render documentations"),Object(a.h)("li",null,"a script to apply mirrors automatically to one's installation"),Object(a.h)("li",null,"directly readable references")))),Object(a.h)("div",{class:G.a.sub},"Scope"),Object(a.h)("p",null,"In the box there are three main components:",Object(a.h)("ul",null,Object(a.h)("li",null,"Recipes themself, containing procudures, parameter presets for well-known mirror sites and JSON schemas for validating them"),Object(a.h)("li",null,"A driver written in Rust for applying recipes on Linux/Unix environments"),Object(a.h)("li",null,"A preact component with Custom Element wrapper for rendering recipes in webpages"))),Object(a.h)("p",null,"What's considered a ",Object(a.h)("em",null,"open source software mirror")," is hard to define. But generally speaking, you can expect to find repositories and update sites of Linux distributions, utilitites (e.g. TexLive), etc. as those are mirrors that you can"," ",Object(a.h)("em",null,"apply to your installation"),". Other forms of mirrors (Fonts, ISO images) are not within the scope of this project."),Object(a.h)("div",{class:G.a.sub},"Contributing"),Object(a.h)("p",null,"This project is still in early development, so the recipe formats and API are subject to severe changes. That said, we welcome contributions of all forms, especially for recipes and site presets, as well as procedures in existing recipes for lesser-known platforms."),Object(a.h)("p",null,"To add a new recipe or preset, a short-name/slug would have to be allocated for it. Please use the generally agreed on names (e.g."," ",Object(a.h)("code",null,"ubuntu")," for Ubuntu package, ",Object(a.h)("code",null,"TUNA")," for Tsinghua TUNA Mirrors)."),Object(a.h)("p",null,"For more guidance, please refer to the ",Object(a.h)("code",null,"CONTRIBUTE")," file in the GitHub repository.")))},ee=function(){return Object(a.h)("div",null,"Not Found")};function te(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function re(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?te(Object(r),!0).forEach((function(t){ne(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):te(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ne(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ie=r("zBN9"),oe=r("Mauj");function ae(e){var t,r;return null!=(t=null==(r=e.match(/\/(.*).ya?ml$/))?void 0:r[1])?t:""}var ce=ie.keys().reduce((function(e,t){var r;return re(re({},e),{},((r={})[ae(t)]=ie(t),r))}),{}),se=oe.keys().reduce((function(e,t){var r;return re(re({},e),{},((r={})[ae(t)]=oe(t),r))}),{}),ue=r("++6B"),le=r.n(ue);function pe(e,t){for(var r,n=e,i=/\{ *([A-Z0-9_]+) *\}/g,o=[];null!==(r=i.exec(n));){var a,c=r[1];o.push([r.index,i.lastIndex,null!=(a=t[c])?a:"["+c+"]"])}o.reverse();for(var s=0,u=o;s<u.length;s++){var l=u[s],p=l[0],h=l[1],f=l[2];n=n.substr(0,p)+f+n.substr(h)}return n}var he=function(e){var t=e.step,r=e.params,n=e.number;if(console.log(t),"append"in t||"replace"in t){var i,o=pe(t.with,r);return Object(a.h)("div",{class:"mr-step mr-step-"+("append"in t?"append":"replace")},Object(a.h)("div",{class:"mr-step-header"},n,Object(a.h)("div",{class:"mr-step-op"},"append"in t?"Append to file":"Replace file")),Object(a.h)("div",{class:"mr-step-path"},null!=(i=t.replace)?i:t.append),Object(a.h)("pre",{class:"mr-step-file"},o))}if("run"in t){var c=pe(t.run,r);return Object(a.h)("div",{class:"mr-step mr-step-run"},Object(a.h)("div",{class:"mr-step-header"},n,Object(a.h)("div",{class:"mr-step-op"},"Run script")),t.with&&Object(a.h)("div",{class:"mr-step-executor"},t.with),Object(a.h)("pre",{class:"mr-step-script"},c))}if("manually"in t){var s=pe(t.manually,r);return Object(a.h)("div",{class:"mr-step mr-step-run"},Object(a.h)("div",{class:"mr-step-header"},n,Object(a.h)("div",{class:"mr-step-op"},"Manually do")),Object(a.h)("pre",{class:"mr-step-manually"},s))}return null};function fe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function be(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?fe(Object(r),!0).forEach((function(t){de(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):fe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function de(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ve=function(e){var t=e.recipe,r=e.params,n=d({}),i=n[0],o=n[1],c=m((function(){var e=Object.keys(t.params).map((function(e){return[e,t.params[e].default]})).filter((function(e){return!!e[1]})).reduce((function(e,t){var r,n=t[0],i=t[1];return be(be({},e),{},((r={})[n]=i,r))}),{}),n=Object.keys(t.params).filter((function(e){var r=t.params[e]["possible-value"];return Array.isArray(r)&&1===r.length})).map((function(e){return[e,t.params[e]["possible-value"][0]]})).reduce((function(e,t){var r,n=t[0],i=t[1];return be(be({},e),{},((r={})[n]=i,r))}),{});return be(be(be(be({},e),n),i),r)}),[i,t.params,r]),s=Object.keys(t.params).map((function(e){var r=t.params[e],n=r["possible-value"],o=!1;if(c[e])if(Array.isArray(n))o=n.includes(c[e]);else if("string"==typeof n){var a=new RegExp(n);o=!!c[e].match(a)}else o=!0;else o=!!r.default;var s=Array.isArray(n)&&1===n.length;return{key:e,param:r,input:i[e],value:c[e],valid:o,fixed:s}})),u=s.filter((function(e){return!(e.key in r)&&!e.fixed})),l=s.every((function(e){return e.valid})),p=t.procedures.find((function(e){if(!e.when)return!0;for(var t in e.when)if(e.when[t]!==c[t])return!1;return!0}));return Object(a.h)(a.Fragment,null,u.map((function(e){var t,r=e.key,n=e.param,i=e.input,c=(e.valid,n["possible-value"]);t=Array.isArray(c)?Object(a.h)("select",{value:i,class:"mr-param-select",onChange:function(e){o((function(t){var n;return be(be({},t),{},((n={})[r]=e.currentTarget.value,n))}))}},Object(a.h)("option",{disabled:!0,default:!0,selected:!0},"Please select"),c.map((function(e){return Object(a.h)("option",{key:e,value:e},e)}))):Object(a.h)("input",{placeholder:n.default,value:i,class:"mr-param-input",onInput:function(e){var t=e.currentTarget.value;console.log(t),o((function(e){var n;if(""!==t)return be(be({},e),{},((n={})[r]=t,n));var i=be({},e);return delete i[r],i}))}});var s=[];return n["obtained-by"]&&s.push(Object(a.h)("div",{class:"mr-hint"},"Try execute ",Object(a.h)("code",null,n["obtained-by"]))),"string"==typeof c&&s.push(Object(a.h)("div",{class:"mr-hint"},"Should match ",Object(a.h)("code",null,c))),Object(a.h)("div",{class:"mr-param"},Object(a.h)("div",{class:"mr-param-title"},r),Object(a.h)("div",{class:"mr-param-desc"},n.description),t,s)})),l&&Object(a.h)("div",{class:"mr-sep"}),l&&(p?p.steps.map((function(e){return e.do?t.steps[e.do]:e})).map((function(e,t){return Object(a.h)(he,{step:e,params:c,number:Object(a.h)("div",{class:"mr-step-number"},Object(a.h)("span",{class:"mr-step-number-hint"},"Step"),t+1,"/",p.steps.length)})})):Object(a.h)("div",{class:"mr-failed"},"No applicable procedure found")))};function me(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _e(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?me(Object(r),!0).forEach((function(t){Oe(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):me(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Oe(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ye(e,t){var r=e.presets[t];return r?function e(t,r,n,i){if(0===Object.keys(t).length)return{};var o=null!=n?n:new Set,a=null!=i?i:new Map,c=null!=r?r:Object.keys(t).find((function(e){return!a.has(e)}));if(!c)return _e({},Array.from(a.entries()).reduce((function(e,t){var r,n=t[0],i=t[1];return _e(_e({},e),{},((r={})[n]=i,r))}),{}));if(console.log("Resolving "+c),o.has(c))throw new Error("Recursive expansion in param set at "+c);o.add(c);var s,u=t[c],l=/\{ *([A-Z0-9_]+) *\}/g,p=[];for(;null!==(s=l.exec(u));){var h,f=s[1];a.has(f)||e(t,f,o,a),p.push([s.index,l.lastIndex,null!=(h=a.get(f))?h:"__RESOLUTION_FAILED__"])}p.reverse();for(var b=0,d=p;b<d.length;b++){var v=d[b],m=v[0],_=v[1],O=v[2];u=u.substr(0,m)+O+u.substr(_)}return o.delete(c),a.set(c,u),console.log("Current stash",a),e(t,void 0,o,a)}(_e(_e({},e.shared),r)):{}}var je=r("jh0i"),ge=r.n(je),Ee=function(){var e,t=_(Ce),r=t.state,n=t.dispatch;return Object(a.h)("select",{class:ge.a.select,value:null!=(e=r.site)?e:"__unset__",onChange:function(e){return n({type:"SetSite",site:"__unset__"===e.currentTarget.value?null:e.currentTarget.value})}},Object(a.h)("option",{value:"__unset__"},"Unset"),Object(a.h)("optgroup",null,Object.keys(se).map((function(e){return Object(a.h)("option",{value:e,key:e},e)}))))},we=function(e){var t,r=e.id,n=ce[r],i=_(Ce),o=i.state,c=(i.dispatch,o.site&&null!=(t=se[o.site])?t:null),s=c?ye(c,r):{};return Object(a.h)(a.Fragment,null,Object(a.h)("div",{class:le.a.container},Object(a.h)("div",{class:le.a.breadcrumb},Object(a.h)(J,{href:"/"},"mirror-recipes"),Object(a.h)(J,{href:"/recipe"},"List")),Object(a.h)("div",{class:le.a["title-row"]},Object(a.h)("div",{class:le.a.title},r),Object(a.h)("div",{class:le.a.sep},"/"),Object(a.h)("div",{class:le.a.preset},Object(a.h)("div",{class:le.a.hint},"Preset"),Object(a.h)(Ee,null))),Object(a.h)(ve,{recipe:n,params:s})))},Se=r("IELz"),Ae=r.n(Se),xe=function(){var e=_(Ce).state,t=m((function(){var t,r=e.site&&null!=(t=se[e.site])?t:null,n=Object.keys(ce).map((function(e){return{key:e,applicable:!r||!!r.presets[e]}}));return n.sort((function(e,t){return e.key.localeCompare(t.key)})),n}),[e.site]),r=t.filter((function(e){return e.applicable})).length,n=d(!1),i=n[0],o=n[1];return Object(a.h)(a.Fragment,null,Object(a.h)("div",{class:Ae.a.container},Object(a.h)("div",{class:Ae.a.breadcrumb},Object(a.h)(J,{href:"/"},"mirror-recipes")),Object(a.h)("div",{class:Ae.a["title-row"]},Object(a.h)("div",{class:Ae.a.title},"List"),Object(a.h)("div",{class:Ae.a.sep},"/"),Object(a.h)("div",{class:Ae.a.preset},Object(a.h)("div",{class:Ae.a.hint},"Preset"),Object(a.h)(Ee,null)),Object(a.h)("div",{class:Ae.a.counter},Object(a.h)("div",{class:Ae.a.hint},"Count"),null===e.site?Object.keys(ce).length+" recipies":r+"/"+Object.keys(ce).length+"  applicable"))),Object(a.h)("div",{class:Ae.a.container},null!==e.site&&Object(a.h)("div",{class:Ae.a.warning},"Some recipes may not be applicable to this preset. Click"," ",Object(a.h)("a",{onClick:function(){return o(!i)}},"here")," to"," ",i?"hide":"show"," them."),t.map((function(e){var t,r=e.key,n=e.applicable;if(!n&&!i)return null;var o=ce[r];return Object(a.h)(J,{href:"/recipe/"+r,class:Z(Ae.a.entry,(t={},t[Ae.a["non-applicable"]]=!n,t))},Object(a.h)("div",{class:Ae.a["entry-title"]},r),Object(a.h)("div",{class:Ae.a["entry-desc"]},o.procedures.length," procedures / ",Object.keys(o.params).length," params"))}))))};function ke(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Pe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ke(Object(r),!0).forEach((function(t){Te(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ke(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Te(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Ue(e,t){return"SetSite"===t.type?Pe(Pe({},e),{},{site:t.site}):e}var Re={site:null},Ce=Object(a.createContext)({state:Re,dispatch:function(){}}),De=function(){var e=v(Ue,Re),t=e[0],r=e[1];return Object(a.h)("div",{id:"app"},Object(a.h)("div",{class:W.a.inner},Object(a.h)(Ce.Provider,{value:{state:t,dispatch:r}},Object(a.h)($,null,Object(a.h)(X,{path:"/",component:Y}),Object(a.h)(X,{path:"/recipe",component:xe}),Object(a.h)(X,{path:"/recipe/:id",component:we}),Object(a.h)(X,{default:!0,component:ee})))),Object(a.h)("div",{class:W.a.footer},"Made with <3 by TUNA contributors. Contents within this site are distributed under the MIT License."))};r("DU1j"),r("6Fm8"),t.default=De},yFXU:function(e){e.exports=JSON.parse('{"params":{"DIST":{"possible-value":["archlinux"]},"BASE":{"description":"The base of the mirror"}},"procedures":[{"when":{"DIST":"archlinux"},"steps":[{"replace":"/etc/pacman.d/mirrorlist","with":"Server = {BASE}/$repo/os/$arch"},{"run":"pacman -Syy"}]}]}')},zBN9:function(e,t,r){var n={"./AUR.yml":"bbHE","./archlinux.yaml":"yFXU","./ubuntu.yaml":"hFeo"};function i(e){var t=o(e);return r(t)}function o(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}i.keys=function(){return Object.keys(n)},i.resolve=o,e.exports=i,i.id="zBN9"}});
//# sourceMappingURL=ssr-bundle.js.map