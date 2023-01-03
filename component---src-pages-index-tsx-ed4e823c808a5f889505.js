/*! For license information please see component---src-pages-index-tsx-ed4e823c808a5f889505.js.LICENSE.txt */
(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[691],{1829:function(e,t,n){var r;!function(){"use strict";var a=!("undefined"==typeof window||!window.document||!window.document.createElement),o={canUseDOM:a,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:a&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:a&&!!window.screen};void 0===(r=function(){return o}.call(t,n,t,e))||(e.exports=r)}()},2993:function(e){"use strict";var t=Array.isArray,n=Object.keys,r=Object.prototype.hasOwnProperty,a="undefined"!=typeof Element;function o(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){var c,u,s,l=t(e),f=t(i);if(l&&f){if((u=e.length)!=i.length)return!1;for(c=u;0!=c--;)if(!o(e[c],i[c]))return!1;return!0}if(l!=f)return!1;var p=e instanceof Date,T=i instanceof Date;if(p!=T)return!1;if(p&&T)return e.getTime()==i.getTime();var d=e instanceof RegExp,E=i instanceof RegExp;if(d!=E)return!1;if(d&&E)return e.toString()==i.toString();var m=n(e);if((u=m.length)!==n(i).length)return!1;for(c=u;0!=c--;)if(!r.call(i,m[c]))return!1;if(a&&e instanceof Element&&i instanceof Element)return e===i;for(c=u;0!=c--;)if(!("_owner"===(s=m[c])&&e.$$typeof||o(e[s],i[s])))return!1;return!0}return e!=e&&i!=i}e.exports=function(e,t){try{return o(e,t)}catch(n){if(n.message&&n.message.match(/stack|recursion/i)||-2146828260===n.number)return console.warn("Warning: react-fast-compare does not handle circular references.",n.name,n.message),!1;throw n}}},7701:function(e,t,n){var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=f(n(7294)),i=f(n(5697)),c=f(n(4839)),u=f(n(2993)),s=n(1640),l=n(286);function f(e){return e&&e.__esModule?e:{default:e}}function p(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function T(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var E,m,h,A=(0,c.default)(s.reducePropsToState,s.handleClientStateChange,s.mapStateOnServer)((function(){return null})),b=(E=A,h=m=function(e){function t(){return T(this,t),d(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!(0,u.default)(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case l.TAG_NAMES.SCRIPT:case l.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case l.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,a=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return r({},a,((t={})[n.type]=[].concat(a[n.type]||[],[r({},o,this.mapNestedChildrenToProps(n,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,a=e.child,o=e.newProps,i=e.newChildProps,c=e.nestedChildren;switch(a.type){case l.TAG_NAMES.TITLE:return r({},o,((t={})[a.type]=c,t.titleAttributes=r({},i),t));case l.TAG_NAMES.BODY:return r({},o,{bodyAttributes:r({},i)});case l.TAG_NAMES.HTML:return r({},o,{htmlAttributes:r({},i)})}return r({},o,((n={})[a.type]=r({},i),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=r({},t);return Object.keys(e).forEach((function(t){var a;n=r({},n,((a={})[t]=e[t],a))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return o.default.Children.forEach(e,(function(e){if(e&&e.props){var a=e.props,o=a.children,i=p(a,["children"]),c=(0,s.convertReactPropstoHtmlAttributes)(i);switch(n.warnOnInvalidChildren(e,o),e.type){case l.TAG_NAMES.LINK:case l.TAG_NAMES.META:case l.TAG_NAMES.NOSCRIPT:case l.TAG_NAMES.SCRIPT:case l.TAG_NAMES.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:c,nestedChildren:o});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:c,nestedChildren:o})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=p(e,["children"]),a=r({},n);return t&&(a=this.mapChildrenToProps(t,a)),o.default.createElement(E,a)},a(t,null,[{key:"canUseDOM",set:function(e){E.canUseDOM=e}}]),t}(o.default.Component),m.propTypes={base:i.default.object,bodyAttributes:i.default.object,children:i.default.oneOfType([i.default.arrayOf(i.default.node),i.default.node]),defaultTitle:i.default.string,defer:i.default.bool,encodeSpecialCharacters:i.default.bool,htmlAttributes:i.default.object,link:i.default.arrayOf(i.default.object),meta:i.default.arrayOf(i.default.object),noscript:i.default.arrayOf(i.default.object),onChangeClientState:i.default.func,script:i.default.arrayOf(i.default.object),style:i.default.arrayOf(i.default.object),title:i.default.string,titleAttributes:i.default.object,titleTemplate:i.default.string},m.defaultProps={defer:!0,encodeSpecialCharacters:!0},m.peek=E.peek,m.rewind=function(){var e=E.rewind();return e||(e=(0,s.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},h);b.renderStatic=b.rewind,t.ZP=b},286:function(e,t){t.__esModule=!0;t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"};var n=t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},r=(t.VALID_TAG_NAMES=Object.keys(n).map((function(e){return n[e]})),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(r).reduce((function(e,t){return e[r[t]]=t,e}),{}),t.SELF_CLOSING_TAGS=[n.NOSCRIPT,n.SCRIPT,n.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},1640:function(e,t,n){t.__esModule=!0,t.warn=t.requestAnimationFrame=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=u(n(7294)),i=u(n(6494)),c=n(286);function u(e){return e&&e.__esModule?e:{default:e}}var s,l=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},f=function(e){var t=m(e,c.TAG_NAMES.TITLE),n=m(e,c.HELMET_PROPS.TITLE_TEMPLATE);if(n&&t)return n.replace(/%s/g,(function(){return t}));var r=m(e,c.HELMET_PROPS.DEFAULT_TITLE);return t||r||void 0},p=function(e){return m(e,c.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},T=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return a({},e,t)}),{})},d=function(e,t){return t.filter((function(e){return void 0!==e[c.TAG_NAMES.BASE]})).map((function(e){return e[c.TAG_NAMES.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),a=0;a<r.length;a++){var o=r[a].toLowerCase();if(-1!==e.indexOf(o)&&n[o])return t.concat(n)}return t}),[])},E=function(e,t,n){var a={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&S("Helmet: "+e+' should be of type "Array". Instead found type "'+r(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var r={};n.filter((function(e){for(var n=void 0,o=Object.keys(e),i=0;i<o.length;i++){var u=o[i],s=u.toLowerCase();-1===t.indexOf(s)||n===c.TAG_PROPERTIES.REL&&"canonical"===e[n].toLowerCase()||s===c.TAG_PROPERTIES.REL&&"stylesheet"===e[s].toLowerCase()||(n=s),-1===t.indexOf(u)||u!==c.TAG_PROPERTIES.INNER_HTML&&u!==c.TAG_PROPERTIES.CSS_TEXT&&u!==c.TAG_PROPERTIES.ITEM_PROP||(n=u)}if(!n||!e[n])return!1;var l=e[n].toLowerCase();return a[n]||(a[n]={}),r[n]||(r[n]={}),!a[n][l]&&(r[n][l]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var o=Object.keys(r),u=0;u<o.length;u++){var s=o[u],l=(0,i.default)({},a[s],r[s]);a[s]=l}return e}),[]).reverse()},m=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},h=(s=Date.now(),function(e){var t=Date.now();t-s>16?(s=t,e(t)):setTimeout((function(){h(e)}),0)}),A=function(e){return clearTimeout(e)},b="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||h:n.g.requestAnimationFrame||h,y="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||A:n.g.cancelAnimationFrame||A,S=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},g=null,w=function(e,t){var n=e.baseTag,r=e.bodyAttributes,a=e.htmlAttributes,o=e.linkTags,i=e.metaTags,u=e.noscriptTags,s=e.onChangeClientState,l=e.scriptTags,f=e.styleTags,p=e.title,T=e.titleAttributes;R(c.TAG_NAMES.BODY,r),R(c.TAG_NAMES.HTML,a),v(p,T);var d={baseTag:P(c.TAG_NAMES.BASE,n),linkTags:P(c.TAG_NAMES.LINK,o),metaTags:P(c.TAG_NAMES.META,i),noscriptTags:P(c.TAG_NAMES.NOSCRIPT,u),scriptTags:P(c.TAG_NAMES.SCRIPT,l),styleTags:P(c.TAG_NAMES.STYLE,f)},E={},m={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(E[e]=n),r.length&&(m[e]=d[e].oldTags)})),t&&t(),s(e,E,m)},_=function(e){return Array.isArray(e)?e.join(""):e},v=function(e,t){void 0!==e&&document.title!==e&&(document.title=_(e)),R(c.TAG_NAMES.TITLE,t)},R=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(c.HELMET_ATTRIBUTE),a=r?r.split(","):[],o=[].concat(a),i=Object.keys(t),u=0;u<i.length;u++){var s=i[u],l=t[s]||"";n.getAttribute(s)!==l&&n.setAttribute(s,l),-1===a.indexOf(s)&&a.push(s);var f=o.indexOf(s);-1!==f&&o.splice(f,1)}for(var p=o.length-1;p>=0;p--)n.removeAttribute(o[p]);a.length===o.length?n.removeAttribute(c.HELMET_ATTRIBUTE):n.getAttribute(c.HELMET_ATTRIBUTE)!==i.join(",")&&n.setAttribute(c.HELMET_ATTRIBUTE,i.join(","))}},P=function(e,t){var n=document.head||document.querySelector(c.TAG_NAMES.HEAD),r=n.querySelectorAll(e+"["+c.HELMET_ATTRIBUTE+"]"),a=Array.prototype.slice.call(r),o=[],i=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===c.TAG_PROPERTIES.INNER_HTML)n.innerHTML=t.innerHTML;else if(r===c.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var u=void 0===t[r]?"":t[r];n.setAttribute(r,u)}n.setAttribute(c.HELMET_ATTRIBUTE,"true"),a.some((function(e,t){return i=t,n.isEqualNode(e)}))?a.splice(i,1):o.push(n)})),a.forEach((function(e){return e.parentNode.removeChild(e)})),o.forEach((function(e){return n.appendChild(e)})),{oldTags:a,newTags:o}},O=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},M=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[c.REACT_TAG_MAP[n]||n]=e[n],t}),t)},C=function(e,t,n){switch(e){case c.TAG_NAMES.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[c.HELMET_ATTRIBUTE]=!0,a=M(n,r),[o.default.createElement(c.TAG_NAMES.TITLE,a,e)];var e,n,r,a},toString:function(){return function(e,t,n,r){var a=O(n),o=_(t);return a?"<"+e+" "+c.HELMET_ATTRIBUTE+'="true" '+a+">"+l(o,r)+"</"+e+">":"<"+e+" "+c.HELMET_ATTRIBUTE+'="true">'+l(o,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case c.ATTRIBUTE_NAMES.BODY:case c.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return M(t)},toString:function(){return O(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,a=((r={key:n})[c.HELMET_ATTRIBUTE]=!0,r);return Object.keys(t).forEach((function(e){var n=c.REACT_TAG_MAP[e]||e;if(n===c.TAG_PROPERTIES.INNER_HTML||n===c.TAG_PROPERTIES.CSS_TEXT){var r=t.innerHTML||t.cssText;a.dangerouslySetInnerHTML={__html:r}}else a[n]=t[e]})),o.default.createElement(e,a)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var a=Object.keys(r).filter((function(e){return!(e===c.TAG_PROPERTIES.INNER_HTML||e===c.TAG_PROPERTIES.CSS_TEXT)})).reduce((function(e,t){var a=void 0===r[t]?t:t+'="'+l(r[t],n)+'"';return e?e+" "+a:a}),""),o=r.innerHTML||r.cssText||"",i=-1===c.SELF_CLOSING_TAGS.indexOf(e);return t+"<"+e+" "+c.HELMET_ATTRIBUTE+'="true" '+a+(i?"/>":">"+o+"</"+e+">")}),"")}(e,t,n)}}}};t.convertReactPropstoHtmlAttributes=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[c.HTML_TAG_MAP[n]||n]=e[n],t}),t)},t.handleClientStateChange=function(e){g&&y(g),e.defer?g=b((function(){w(e,(function(){g=null}))})):(w(e),g=null)},t.mapStateOnServer=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,a=e.htmlAttributes,o=e.linkTags,i=e.metaTags,u=e.noscriptTags,s=e.scriptTags,l=e.styleTags,f=e.title,p=void 0===f?"":f,T=e.titleAttributes;return{base:C(c.TAG_NAMES.BASE,t,r),bodyAttributes:C(c.ATTRIBUTE_NAMES.BODY,n,r),htmlAttributes:C(c.ATTRIBUTE_NAMES.HTML,a,r),link:C(c.TAG_NAMES.LINK,o,r),meta:C(c.TAG_NAMES.META,i,r),noscript:C(c.TAG_NAMES.NOSCRIPT,u,r),script:C(c.TAG_NAMES.SCRIPT,s,r),style:C(c.TAG_NAMES.STYLE,l,r),title:C(c.TAG_NAMES.TITLE,{title:p,titleAttributes:T},r)}},t.reducePropsToState=function(e){return{baseTag:d([c.TAG_PROPERTIES.HREF],e),bodyAttributes:T(c.ATTRIBUTE_NAMES.BODY,e),defer:m(e,c.HELMET_PROPS.DEFER),encode:m(e,c.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:T(c.ATTRIBUTE_NAMES.HTML,e),linkTags:E(c.TAG_NAMES.LINK,[c.TAG_PROPERTIES.REL,c.TAG_PROPERTIES.HREF],e),metaTags:E(c.TAG_NAMES.META,[c.TAG_PROPERTIES.NAME,c.TAG_PROPERTIES.CHARSET,c.TAG_PROPERTIES.HTTPEQUIV,c.TAG_PROPERTIES.PROPERTY,c.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:E(c.TAG_NAMES.NOSCRIPT,[c.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:p(e),scriptTags:E(c.TAG_NAMES.SCRIPT,[c.TAG_PROPERTIES.SRC,c.TAG_PROPERTIES.INNER_HTML],e),styleTags:E(c.TAG_NAMES.STYLE,[c.TAG_PROPERTIES.CSS_TEXT],e),title:f(e),titleAttributes:T(c.ATTRIBUTE_NAMES.TITLE,e)}},t.requestAnimationFrame=b,t.warn=S},4839:function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var a=n(7294),o=r(a),i=r(n(1829)),c=r(n(6872));function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var l=[],f=void 0;function p(){f=e(l.map((function(e){return e.props}))),T.canUseDOM?t(f):n&&(f=n(f))}var T=function(e){function t(){return u(this,t),s(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.peek=function(){return f},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=f;return f=void 0,l=[],e},t.prototype.shouldComponentUpdate=function(e){return!c(e,this.props)},t.prototype.componentWillMount=function(){l.push(this),p()},t.prototype.componentDidUpdate=function(){p()},t.prototype.componentWillUnmount=function(){var e=l.indexOf(this);l.splice(e,1),p()},t.prototype.render=function(){return o.createElement(r,this.props)},t}(a.Component);return T.displayName="SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")",T.canUseDOM=i.canUseDOM,T}}},4845:function(e,t,n){"use strict";var r=n(7294),a=n(9).default.div.withConfig({displayName:"layout__Container",componentId:"sc-1jer9s0-0"})(["max-width:960px;margin:auto;font-family:'Georgia','Times New Roman',serif;font-size:1.1rem;color:#212121;background-color:#fefefe;"]);t.Z=function(e){var t=e.children;return r.createElement(r.Fragment,null,r.createElement(a,null,r.createElement("main",null,t)))}},2936:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return f}});var r=n(7294),a=n(5444),o=n(9),i=n(4845),c=n(7701);var u=function(e){var t=e.description,n=void 0===t?"":t,o=e.lang,i=void 0===o?"en":o,u=e.meta,s=void 0===u?[]:u,l=e.title,f=void 0===l?"":l,p=(0,a.useStaticQuery)("45326706").site,T=""+p.siteMetadata.siteUrl+p.siteMetadata.image,d=n||p.siteMetadata.description,E=f||p.siteMetadata.title;return r.createElement(c.ZP,{htmlAttributes:{lang:i},title:E,titleTemplate:"%s | "+p.siteMetadata.title,meta:[{name:"description",content:d},{property:"og:title",content:f},{property:"og:description",content:d},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:p.siteMetadata.author},{name:"twitter:title",content:f},{name:"twitter:description",content:d},{property:"og:image",content:T},{name:"twitter:card",content:"summary_large_image"}].concat(s)},r.createElement("meta",{name:"description",content:p.siteMetadata.description}),r.createElement("meta",{name:"image",content:p.siteMetadata.image}))},s=n(6125),l=o.default.ul.withConfig({displayName:"pages__ProjectList",componentId:"sc-12s69b8-0"})(["line-height:1.5;"]);function f(){return r.createElement(i.Z,null,r.createElement(u,null),r.createElement(s.S,{src:"../images/me.jpg",width:450,alt:"it's a me",__imageData:n(7253)}),r.createElement("h1",null,"Hello, my name is Aaron Petcoff."),r.createElement("p",null,"i live in brooklyn, new york. i'm originally from"," ",r.createElement("a",{href:"https://www.youtube.com/watch?v=FNFDKm8F4hg"},"Detroit and am very proud of that"),". i work as a software engineer at"," ",r.createElement("a",{href:"https://frame.io"},"Frame.io"),", an"," ",r.createElement("a",{href:"https://www.adobe.com/"},"Adobe")," company."),r.createElement("p",null,"i enjoy dive bars,"," ",r.createElement("a",{href:"https://www.instagram.com/p/CjaUo6sOX2O"},"live music"),", hockey, writing, and history. the two most influential books i've ever read are"," ",r.createElement("a",{href:"https://www.marxists.org/archive/marx/works/1867-c1/index.htm"},r.createElement("i",null,"Capital, Vol. 1"))," ","and"," ",r.createElement("a",{href:"https://web.mit.edu/6.001/6.037/sicp.pdf"},r.createElement("i",null,"Structure and Interpretation of Computer Programs")),"."),r.createElement("p",null,"here are some of the things i've built for the web in my spare time"),r.createElement(l,null,r.createElement("li",null,r.createElement("a",{href:"https://ughitsaaron.github.io/react-wasm-demo/"},r.createElement("strong",null,"react wasm demo"))," ","– a very simple app to demo WebAssembly inside a React app (",r.createElement("a",{href:"https://github.com/ughitsaaron/react-wasm-demo"},"source"),")"),r.createElement("li",null,r.createElement("a",{href:"https://blacknoise.herokuapp.com"},r.createElement("strong",null,"blacknoise 💀"))," ","– an offline-first web app that plays awful noises (",r.createElement("a",{href:"https://github.com/ughitsaaron/blacknoise"},"source"),")"),r.createElement("li",null,r.createElement("a",{href:"https://head-n-3340.herokuapp.com"},r.createElement("strong",null,r.createElement("i",null,"head -n 3340")))," ","– a generative text art project (",r.createElement("a",{href:"https://github.com/ughitsaaron/head-n-3340"},"source"),") (exerpt"," ",r.createElement("a",{href:"http://www.gauss-pdf.com/post/166258256316/gpdf247-aaron-petcoff-head-n-3340"},"published by gauss pdf"),")"),r.createElement("li",null,r.createElement("a",{href:"https://ughitsaaron.github.io/damn/"},r.createElement("strong",null,"damn."))," ","– an app for mimicking the cover of the kendrick lamar record (",r.createElement("a",{href:"https://github.com/ughitsaaron/damn"},"source"),")"),r.createElement("li",null,r.createElement("a",{href:"http://propertypraxis.org"},r.createElement("strong",null,"property praxis"))," ","– an interactive map documenting property speculation in detroit (",r.createElement("a",{href:"https://github.com/alexbhill/project-pip"},"source"),")"),r.createElement("li",null,r.createElement("a",null,r.createElement("strong",null,"bodega cats of nyc (w.i.p.)"))," ","– an interface for collaboratively mapping the feline guardians of new york's most beloved & bathroomless institution")),r.createElement("p",null,"you can find out more about me from"," ",r.createElement("a",{href:"https://www.github.com/ughitsaaron"},"my github")," and"," ",r.createElement(a.Link,{to:"/resume"},"my resume"),"."),r.createElement("p",null,"you can contact me thru electronic mail at"," ",r.createElement("a",{href:"mailto:xfilesfan69@aol.com"},"xfilesfan69 [at] aol [dot] com")),r.createElement(s.S,{src:"../images/valid.gif",alt:"i'm valid",__imageData:n(9829)}))}},7253:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#181818","images":{"fallback":{"src":"/static/c44c16a1fb95a3e573b30450f1b0863d/cd18a/me.jpg","srcSet":"/static/c44c16a1fb95a3e573b30450f1b0863d/fa873/me.jpg 113w,\\n/static/c44c16a1fb95a3e573b30450f1b0863d/1a361/me.jpg 225w,\\n/static/c44c16a1fb95a3e573b30450f1b0863d/cd18a/me.jpg 450w","sizes":"(min-width: 450px) 450px, 100vw"},"sources":[{"srcSet":"/static/c44c16a1fb95a3e573b30450f1b0863d/26b1c/me.webp 113w,\\n/static/c44c16a1fb95a3e573b30450f1b0863d/252a0/me.webp 225w,\\n/static/c44c16a1fb95a3e573b30450f1b0863d/2890f/me.webp 450w","type":"image/webp","sizes":"(min-width: 450px) 450px, 100vw"}]},"width":450,"height":450}')},9829:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/f95a3255380ae8eb8ba3d669f0229f21/0f0d0/valid.gif","srcSet":"/static/f95a3255380ae8eb8ba3d669f0229f21/f8a91/valid.gif 59w,\\n/static/f95a3255380ae8eb8ba3d669f0229f21/19b8f/valid.gif 118w,\\n/static/f95a3255380ae8eb8ba3d669f0229f21/0f0d0/valid.gif 235w","sizes":"(min-width: 235px) 235px, 100vw"},"sources":[{"srcSet":"/static/f95a3255380ae8eb8ba3d669f0229f21/20828/valid.webp 59w,\\n/static/f95a3255380ae8eb8ba3d669f0229f21/8100a/valid.webp 118w,\\n/static/f95a3255380ae8eb8ba3d669f0229f21/ae262/valid.webp 235w","type":"image/webp","sizes":"(min-width: 235px) 235px, 100vw"}]},"width":235,"height":103}')}}]);
//# sourceMappingURL=component---src-pages-index-tsx-ed4e823c808a5f889505.js.map