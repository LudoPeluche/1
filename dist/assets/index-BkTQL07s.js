(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var Vy={exports:{}},Jl={},Oy={exports:{}},te={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vo=Symbol.for("react.element"),WE=Symbol.for("react.portal"),GE=Symbol.for("react.fragment"),KE=Symbol.for("react.strict_mode"),QE=Symbol.for("react.profiler"),JE=Symbol.for("react.provider"),XE=Symbol.for("react.context"),YE=Symbol.for("react.forward_ref"),ZE=Symbol.for("react.suspense"),eT=Symbol.for("react.memo"),tT=Symbol.for("react.lazy"),Bp=Symbol.iterator;function nT(t){return t===null||typeof t!="object"?null:(t=Bp&&t[Bp]||t["@@iterator"],typeof t=="function"?t:null)}var Ly={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},My=Object.assign,Fy={};function is(t,e,n){this.props=t,this.context=e,this.refs=Fy,this.updater=n||Ly}is.prototype.isReactComponent={};is.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};is.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function jy(){}jy.prototype=is.prototype;function td(t,e,n){this.props=t,this.context=e,this.refs=Fy,this.updater=n||Ly}var nd=td.prototype=new jy;nd.constructor=td;My(nd,is.prototype);nd.isPureReactComponent=!0;var $p=Array.isArray,Uy=Object.prototype.hasOwnProperty,rd={current:null},zy={key:!0,ref:!0,__self:!0,__source:!0};function By(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Uy.call(e,r)&&!zy.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:Vo,type:t,key:s,ref:o,props:i,_owner:rd.current}}function rT(t,e){return{$$typeof:Vo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function id(t){return typeof t=="object"&&t!==null&&t.$$typeof===Vo}function iT(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Hp=/\/+/g;function Zu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?iT(""+t.key):e.toString(36)}function Ma(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Vo:case WE:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Zu(o,0):r,$p(i)?(n="",t!=null&&(n=t.replace(Hp,"$&/")+"/"),Ma(i,e,n,"",function(h){return h})):i!=null&&(id(i)&&(i=rT(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Hp,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",$p(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Zu(s,l);o+=Ma(s,e,n,u,i)}else if(u=nT(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Zu(s,l++),o+=Ma(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function pa(t,e,n){if(t==null)return t;var r=[],i=0;return Ma(t,r,"","",function(s){return e.call(n,s,i++)}),r}function sT(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var pt={current:null},Fa={transition:null},oT={ReactCurrentDispatcher:pt,ReactCurrentBatchConfig:Fa,ReactCurrentOwner:rd};function $y(){throw Error("act(...) is not supported in production builds of React.")}te.Children={map:pa,forEach:function(t,e,n){pa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return pa(t,function(){e++}),e},toArray:function(t){return pa(t,function(e){return e})||[]},only:function(t){if(!id(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};te.Component=is;te.Fragment=GE;te.Profiler=QE;te.PureComponent=td;te.StrictMode=KE;te.Suspense=ZE;te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oT;te.act=$y;te.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=My({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=rd.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)Uy.call(e,u)&&!zy.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:Vo,type:t.type,key:i,ref:s,props:r,_owner:o}};te.createContext=function(t){return t={$$typeof:XE,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:JE,_context:t},t.Consumer=t};te.createElement=By;te.createFactory=function(t){var e=By.bind(null,t);return e.type=t,e};te.createRef=function(){return{current:null}};te.forwardRef=function(t){return{$$typeof:YE,render:t}};te.isValidElement=id;te.lazy=function(t){return{$$typeof:tT,_payload:{_status:-1,_result:t},_init:sT}};te.memo=function(t,e){return{$$typeof:eT,type:t,compare:e===void 0?null:e}};te.startTransition=function(t){var e=Fa.transition;Fa.transition={};try{t()}finally{Fa.transition=e}};te.unstable_act=$y;te.useCallback=function(t,e){return pt.current.useCallback(t,e)};te.useContext=function(t){return pt.current.useContext(t)};te.useDebugValue=function(){};te.useDeferredValue=function(t){return pt.current.useDeferredValue(t)};te.useEffect=function(t,e){return pt.current.useEffect(t,e)};te.useId=function(){return pt.current.useId()};te.useImperativeHandle=function(t,e,n){return pt.current.useImperativeHandle(t,e,n)};te.useInsertionEffect=function(t,e){return pt.current.useInsertionEffect(t,e)};te.useLayoutEffect=function(t,e){return pt.current.useLayoutEffect(t,e)};te.useMemo=function(t,e){return pt.current.useMemo(t,e)};te.useReducer=function(t,e,n){return pt.current.useReducer(t,e,n)};te.useRef=function(t){return pt.current.useRef(t)};te.useState=function(t){return pt.current.useState(t)};te.useSyncExternalStore=function(t,e,n){return pt.current.useSyncExternalStore(t,e,n)};te.useTransition=function(){return pt.current.useTransition()};te.version="18.3.1";Oy.exports=te;var Z=Oy.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var aT=Z,lT=Symbol.for("react.element"),uT=Symbol.for("react.fragment"),cT=Object.prototype.hasOwnProperty,hT=aT.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,dT={key:!0,ref:!0,__self:!0,__source:!0};function Hy(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)cT.call(e,r)&&!dT.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:lT,type:t,key:s,ref:o,props:i,_owner:hT.current}}Jl.Fragment=uT;Jl.jsx=Hy;Jl.jsxs=Hy;Vy.exports=Jl;var C=Vy.exports,qy={exports:{}},Dt={},Wy={exports:{}},Gy={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,G){var Y=z.length;z.push(G);e:for(;0<Y;){var ge=Y-1>>>1,ce=z[ge];if(0<i(ce,G))z[ge]=G,z[Y]=ce,Y=ge;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var G=z[0],Y=z.pop();if(Y!==G){z[0]=Y;e:for(var ge=0,ce=z.length,Te=ce>>>1;ge<Te;){var $t=2*(ge+1)-1,q=z[$t],le=$t+1,se=z[le];if(0>i(q,Y))le<ce&&0>i(se,q)?(z[ge]=se,z[le]=Y,ge=le):(z[ge]=q,z[$t]=Y,ge=$t);else if(le<ce&&0>i(se,Y))z[ge]=se,z[le]=Y,ge=le;else break e}}return G}function i(z,G){var Y=z.sortIndex-G.sortIndex;return Y!==0?Y:z.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],f=1,m=null,p=3,I=!1,k=!1,N=!1,V=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(z){for(var G=n(h);G!==null;){if(G.callback===null)r(h);else if(G.startTime<=z)r(h),G.sortIndex=G.expirationTime,e(u,G);else break;G=n(h)}}function b(z){if(N=!1,A(z),!k)if(n(u)!==null)k=!0,At(j);else{var G=n(h);G!==null&&Bt(b,G.startTime-z)}}function j(z,G){k=!1,N&&(N=!1,S(y),y=-1),I=!0;var Y=p;try{for(A(G),m=n(u);m!==null&&(!(m.expirationTime>G)||z&&!R());){var ge=m.callback;if(typeof ge=="function"){m.callback=null,p=m.priorityLevel;var ce=ge(m.expirationTime<=G);G=t.unstable_now(),typeof ce=="function"?m.callback=ce:m===n(u)&&r(u),A(G)}else r(u);m=n(u)}if(m!==null)var Te=!0;else{var $t=n(h);$t!==null&&Bt(b,$t.startTime-G),Te=!1}return Te}finally{m=null,p=Y,I=!1}}var F=!1,w=null,y=-1,_=5,E=-1;function R(){return!(t.unstable_now()-E<_)}function P(){if(w!==null){var z=t.unstable_now();E=z;var G=!0;try{G=w(!0,z)}finally{G?T():(F=!1,w=null)}}else F=!1}var T;if(typeof v=="function")T=function(){v(P)};else if(typeof MessageChannel<"u"){var He=new MessageChannel,gn=He.port2;He.port1.onmessage=P,T=function(){gn.postMessage(null)}}else T=function(){V(P,0)};function At(z){w=z,F||(F=!0,T())}function Bt(z,G){y=V(function(){z(t.unstable_now())},G)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){k||I||(k=!0,At(j))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(z){switch(p){case 1:case 2:case 3:var G=3;break;default:G=p}var Y=p;p=G;try{return z()}finally{p=Y}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,G){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var Y=p;p=z;try{return G()}finally{p=Y}},t.unstable_scheduleCallback=function(z,G,Y){var ge=t.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?ge+Y:ge):Y=ge,z){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=Y+ce,z={id:f++,callback:G,priorityLevel:z,startTime:Y,expirationTime:ce,sortIndex:-1},Y>ge?(z.sortIndex=Y,e(h,z),n(u)===null&&z===n(h)&&(N?(S(y),y=-1):N=!0,Bt(b,Y-ge))):(z.sortIndex=ce,e(u,z),k||I||(k=!0,At(j))),z},t.unstable_shouldYield=R,t.unstable_wrapCallback=function(z){var G=p;return function(){var Y=p;p=G;try{return z.apply(this,arguments)}finally{p=Y}}}})(Gy);Wy.exports=Gy;var fT=Wy.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pT=Z,Nt=fT;function M(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ky=new Set,so={};function ri(t,e){qi(t,e),qi(t+"Capture",e)}function qi(t,e){for(so[t]=e,t=0;t<e.length;t++)Ky.add(e[t])}var kn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Mc=Object.prototype.hasOwnProperty,mT=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,qp={},Wp={};function gT(t){return Mc.call(Wp,t)?!0:Mc.call(qp,t)?!1:mT.test(t)?Wp[t]=!0:(qp[t]=!0,!1)}function yT(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function _T(t,e,n,r){if(e===null||typeof e>"u"||yT(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function mt(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Je={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Je[t]=new mt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Je[e]=new mt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Je[t]=new mt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Je[t]=new mt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Je[t]=new mt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Je[t]=new mt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Je[t]=new mt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Je[t]=new mt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Je[t]=new mt(t,5,!1,t.toLowerCase(),null,!1,!1)});var sd=/[\-:]([a-z])/g;function od(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(sd,od);Je[e]=new mt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(sd,od);Je[e]=new mt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(sd,od);Je[e]=new mt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Je[t]=new mt(t,1,!1,t.toLowerCase(),null,!1,!1)});Je.xlinkHref=new mt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Je[t]=new mt(t,1,!1,t.toLowerCase(),null,!0,!0)});function ad(t,e,n,r){var i=Je.hasOwnProperty(e)?Je[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(_T(e,n,i,r)&&(n=null),r||i===null?gT(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Fn=pT.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ma=Symbol.for("react.element"),vi=Symbol.for("react.portal"),wi=Symbol.for("react.fragment"),ld=Symbol.for("react.strict_mode"),Fc=Symbol.for("react.profiler"),Qy=Symbol.for("react.provider"),Jy=Symbol.for("react.context"),ud=Symbol.for("react.forward_ref"),jc=Symbol.for("react.suspense"),Uc=Symbol.for("react.suspense_list"),cd=Symbol.for("react.memo"),qn=Symbol.for("react.lazy"),Xy=Symbol.for("react.offscreen"),Gp=Symbol.iterator;function ks(t){return t===null||typeof t!="object"?null:(t=Gp&&t[Gp]||t["@@iterator"],typeof t=="function"?t:null)}var Ce=Object.assign,ec;function Ls(t){if(ec===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);ec=e&&e[1]||""}return`
`+ec+t}var tc=!1;function nc(t,e){if(!t||tc)return"";tc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{tc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ls(t):""}function vT(t){switch(t.tag){case 5:return Ls(t.type);case 16:return Ls("Lazy");case 13:return Ls("Suspense");case 19:return Ls("SuspenseList");case 0:case 2:case 15:return t=nc(t.type,!1),t;case 11:return t=nc(t.type.render,!1),t;case 1:return t=nc(t.type,!0),t;default:return""}}function zc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case wi:return"Fragment";case vi:return"Portal";case Fc:return"Profiler";case ld:return"StrictMode";case jc:return"Suspense";case Uc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Jy:return(t.displayName||"Context")+".Consumer";case Qy:return(t._context.displayName||"Context")+".Provider";case ud:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case cd:return e=t.displayName||null,e!==null?e:zc(t.type)||"Memo";case qn:e=t._payload,t=t._init;try{return zc(t(e))}catch{}}return null}function wT(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return zc(e);case 8:return e===ld?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function mr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Yy(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function ET(t){var e=Yy(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ga(t){t._valueTracker||(t._valueTracker=ET(t))}function Zy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Yy(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function al(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Bc(t,e){var n=e.checked;return Ce({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Kp(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=mr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function e_(t,e){e=e.checked,e!=null&&ad(t,"checked",e,!1)}function $c(t,e){e_(t,e);var n=mr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Hc(t,e.type,n):e.hasOwnProperty("defaultValue")&&Hc(t,e.type,mr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Qp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Hc(t,e,n){(e!=="number"||al(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ms=Array.isArray;function bi(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+mr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function qc(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(M(91));return Ce({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Jp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(M(92));if(Ms(n)){if(1<n.length)throw Error(M(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:mr(n)}}function t_(t,e){var n=mr(e.value),r=mr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Xp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function n_(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Wc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?n_(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ya,r_=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ya=ya||document.createElement("div"),ya.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ya.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function oo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Hs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},TT=["Webkit","ms","Moz","O"];Object.keys(Hs).forEach(function(t){TT.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Hs[e]=Hs[t]})});function i_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Hs.hasOwnProperty(t)&&Hs[t]?(""+e).trim():e+"px"}function s_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=i_(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var IT=Ce({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Gc(t,e){if(e){if(IT[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(M(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(M(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(M(61))}if(e.style!=null&&typeof e.style!="object")throw Error(M(62))}}function Kc(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Qc=null;function hd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Jc=null,Vi=null,Oi=null;function Yp(t){if(t=Mo(t)){if(typeof Jc!="function")throw Error(M(280));var e=t.stateNode;e&&(e=tu(e),Jc(t.stateNode,t.type,e))}}function o_(t){Vi?Oi?Oi.push(t):Oi=[t]:Vi=t}function a_(){if(Vi){var t=Vi,e=Oi;if(Oi=Vi=null,Yp(t),e)for(t=0;t<e.length;t++)Yp(e[t])}}function l_(t,e){return t(e)}function u_(){}var rc=!1;function c_(t,e,n){if(rc)return t(e,n);rc=!0;try{return l_(t,e,n)}finally{rc=!1,(Vi!==null||Oi!==null)&&(u_(),a_())}}function ao(t,e){var n=t.stateNode;if(n===null)return null;var r=tu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(M(231,e,typeof n));return n}var Xc=!1;if(kn)try{var Ps={};Object.defineProperty(Ps,"passive",{get:function(){Xc=!0}}),window.addEventListener("test",Ps,Ps),window.removeEventListener("test",Ps,Ps)}catch{Xc=!1}function ST(t,e,n,r,i,s,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(f){this.onError(f)}}var qs=!1,ll=null,ul=!1,Yc=null,AT={onError:function(t){qs=!0,ll=t}};function CT(t,e,n,r,i,s,o,l,u){qs=!1,ll=null,ST.apply(AT,arguments)}function RT(t,e,n,r,i,s,o,l,u){if(CT.apply(this,arguments),qs){if(qs){var h=ll;qs=!1,ll=null}else throw Error(M(198));ul||(ul=!0,Yc=h)}}function ii(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function h_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Zp(t){if(ii(t)!==t)throw Error(M(188))}function kT(t){var e=t.alternate;if(!e){if(e=ii(t),e===null)throw Error(M(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Zp(i),t;if(s===r)return Zp(i),e;s=s.sibling}throw Error(M(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(M(189))}}if(n.alternate!==r)throw Error(M(190))}if(n.tag!==3)throw Error(M(188));return n.stateNode.current===n?t:e}function d_(t){return t=kT(t),t!==null?f_(t):null}function f_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=f_(t);if(e!==null)return e;t=t.sibling}return null}var p_=Nt.unstable_scheduleCallback,em=Nt.unstable_cancelCallback,PT=Nt.unstable_shouldYield,xT=Nt.unstable_requestPaint,Ne=Nt.unstable_now,NT=Nt.unstable_getCurrentPriorityLevel,dd=Nt.unstable_ImmediatePriority,m_=Nt.unstable_UserBlockingPriority,cl=Nt.unstable_NormalPriority,DT=Nt.unstable_LowPriority,g_=Nt.unstable_IdlePriority,Xl=null,on=null;function bT(t){if(on&&typeof on.onCommitFiberRoot=="function")try{on.onCommitFiberRoot(Xl,t,void 0,(t.current.flags&128)===128)}catch{}}var Xt=Math.clz32?Math.clz32:LT,VT=Math.log,OT=Math.LN2;function LT(t){return t>>>=0,t===0?32:31-(VT(t)/OT|0)|0}var _a=64,va=4194304;function Fs(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function hl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=Fs(l):(s&=o,s!==0&&(r=Fs(s)))}else o=n&~i,o!==0?r=Fs(o):s!==0&&(r=Fs(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Xt(e),i=1<<n,r|=t[n],e&=~i;return r}function MT(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function FT(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Xt(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=MT(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function Zc(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function y_(){var t=_a;return _a<<=1,!(_a&4194240)&&(_a=64),t}function ic(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Oo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Xt(e),t[e]=n}function jT(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Xt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function fd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Xt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var he=0;function __(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var v_,pd,w_,E_,T_,eh=!1,wa=[],nr=null,rr=null,ir=null,lo=new Map,uo=new Map,Gn=[],UT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function tm(t,e){switch(t){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":rr=null;break;case"mouseover":case"mouseout":ir=null;break;case"pointerover":case"pointerout":lo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":uo.delete(e.pointerId)}}function xs(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Mo(e),e!==null&&pd(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function zT(t,e,n,r,i){switch(e){case"focusin":return nr=xs(nr,t,e,n,r,i),!0;case"dragenter":return rr=xs(rr,t,e,n,r,i),!0;case"mouseover":return ir=xs(ir,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return lo.set(s,xs(lo.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,uo.set(s,xs(uo.get(s)||null,t,e,n,r,i)),!0}return!1}function I_(t){var e=Fr(t.target);if(e!==null){var n=ii(e);if(n!==null){if(e=n.tag,e===13){if(e=h_(n),e!==null){t.blockedOn=e,T_(t.priority,function(){w_(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ja(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=th(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Qc=r,n.target.dispatchEvent(r),Qc=null}else return e=Mo(n),e!==null&&pd(e),t.blockedOn=n,!1;e.shift()}return!0}function nm(t,e,n){ja(t)&&n.delete(e)}function BT(){eh=!1,nr!==null&&ja(nr)&&(nr=null),rr!==null&&ja(rr)&&(rr=null),ir!==null&&ja(ir)&&(ir=null),lo.forEach(nm),uo.forEach(nm)}function Ns(t,e){t.blockedOn===e&&(t.blockedOn=null,eh||(eh=!0,Nt.unstable_scheduleCallback(Nt.unstable_NormalPriority,BT)))}function co(t){function e(i){return Ns(i,t)}if(0<wa.length){Ns(wa[0],t);for(var n=1;n<wa.length;n++){var r=wa[n];r.blockedOn===t&&(r.blockedOn=null)}}for(nr!==null&&Ns(nr,t),rr!==null&&Ns(rr,t),ir!==null&&Ns(ir,t),lo.forEach(e),uo.forEach(e),n=0;n<Gn.length;n++)r=Gn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Gn.length&&(n=Gn[0],n.blockedOn===null);)I_(n),n.blockedOn===null&&Gn.shift()}var Li=Fn.ReactCurrentBatchConfig,dl=!0;function $T(t,e,n,r){var i=he,s=Li.transition;Li.transition=null;try{he=1,md(t,e,n,r)}finally{he=i,Li.transition=s}}function HT(t,e,n,r){var i=he,s=Li.transition;Li.transition=null;try{he=4,md(t,e,n,r)}finally{he=i,Li.transition=s}}function md(t,e,n,r){if(dl){var i=th(t,e,n,r);if(i===null)pc(t,e,r,fl,n),tm(t,r);else if(zT(i,t,e,n,r))r.stopPropagation();else if(tm(t,r),e&4&&-1<UT.indexOf(t)){for(;i!==null;){var s=Mo(i);if(s!==null&&v_(s),s=th(t,e,n,r),s===null&&pc(t,e,r,fl,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else pc(t,e,r,null,n)}}var fl=null;function th(t,e,n,r){if(fl=null,t=hd(r),t=Fr(t),t!==null)if(e=ii(t),e===null)t=null;else if(n=e.tag,n===13){if(t=h_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return fl=t,null}function S_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(NT()){case dd:return 1;case m_:return 4;case cl:case DT:return 16;case g_:return 536870912;default:return 16}default:return 16}}var Zn=null,gd=null,Ua=null;function A_(){if(Ua)return Ua;var t,e=gd,n=e.length,r,i="value"in Zn?Zn.value:Zn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return Ua=i.slice(t,1<r?1-r:void 0)}function za(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ea(){return!0}function rm(){return!1}function bt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ea:rm,this.isPropagationStopped=rm,this}return Ce(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ea)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ea)},persist:function(){},isPersistent:Ea}),e}var ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yd=bt(ss),Lo=Ce({},ss,{view:0,detail:0}),qT=bt(Lo),sc,oc,Ds,Yl=Ce({},Lo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_d,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ds&&(Ds&&t.type==="mousemove"?(sc=t.screenX-Ds.screenX,oc=t.screenY-Ds.screenY):oc=sc=0,Ds=t),sc)},movementY:function(t){return"movementY"in t?t.movementY:oc}}),im=bt(Yl),WT=Ce({},Yl,{dataTransfer:0}),GT=bt(WT),KT=Ce({},Lo,{relatedTarget:0}),ac=bt(KT),QT=Ce({},ss,{animationName:0,elapsedTime:0,pseudoElement:0}),JT=bt(QT),XT=Ce({},ss,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),YT=bt(XT),ZT=Ce({},ss,{data:0}),sm=bt(ZT),eI={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},tI={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nI={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function rI(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=nI[t])?!!e[t]:!1}function _d(){return rI}var iI=Ce({},Lo,{key:function(t){if(t.key){var e=eI[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=za(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?tI[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_d,charCode:function(t){return t.type==="keypress"?za(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?za(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),sI=bt(iI),oI=Ce({},Yl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),om=bt(oI),aI=Ce({},Lo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_d}),lI=bt(aI),uI=Ce({},ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),cI=bt(uI),hI=Ce({},Yl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),dI=bt(hI),fI=[9,13,27,32],vd=kn&&"CompositionEvent"in window,Ws=null;kn&&"documentMode"in document&&(Ws=document.documentMode);var pI=kn&&"TextEvent"in window&&!Ws,C_=kn&&(!vd||Ws&&8<Ws&&11>=Ws),am=" ",lm=!1;function R_(t,e){switch(t){case"keyup":return fI.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function k_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ei=!1;function mI(t,e){switch(t){case"compositionend":return k_(e);case"keypress":return e.which!==32?null:(lm=!0,am);case"textInput":return t=e.data,t===am&&lm?null:t;default:return null}}function gI(t,e){if(Ei)return t==="compositionend"||!vd&&R_(t,e)?(t=A_(),Ua=gd=Zn=null,Ei=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return C_&&e.locale!=="ko"?null:e.data;default:return null}}var yI={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function um(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!yI[t.type]:e==="textarea"}function P_(t,e,n,r){o_(r),e=pl(e,"onChange"),0<e.length&&(n=new yd("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Gs=null,ho=null;function _I(t){U_(t,0)}function Zl(t){var e=Si(t);if(Zy(e))return t}function vI(t,e){if(t==="change")return e}var x_=!1;if(kn){var lc;if(kn){var uc="oninput"in document;if(!uc){var cm=document.createElement("div");cm.setAttribute("oninput","return;"),uc=typeof cm.oninput=="function"}lc=uc}else lc=!1;x_=lc&&(!document.documentMode||9<document.documentMode)}function hm(){Gs&&(Gs.detachEvent("onpropertychange",N_),ho=Gs=null)}function N_(t){if(t.propertyName==="value"&&Zl(ho)){var e=[];P_(e,ho,t,hd(t)),c_(_I,e)}}function wI(t,e,n){t==="focusin"?(hm(),Gs=e,ho=n,Gs.attachEvent("onpropertychange",N_)):t==="focusout"&&hm()}function EI(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Zl(ho)}function TI(t,e){if(t==="click")return Zl(e)}function II(t,e){if(t==="input"||t==="change")return Zl(e)}function SI(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Zt=typeof Object.is=="function"?Object.is:SI;function fo(t,e){if(Zt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Mc.call(e,i)||!Zt(t[i],e[i]))return!1}return!0}function dm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function fm(t,e){var n=dm(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=dm(n)}}function D_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?D_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function b_(){for(var t=window,e=al();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=al(t.document)}return e}function wd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function AI(t){var e=b_(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&D_(n.ownerDocument.documentElement,n)){if(r!==null&&wd(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=fm(n,s);var o=fm(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var CI=kn&&"documentMode"in document&&11>=document.documentMode,Ti=null,nh=null,Ks=null,rh=!1;function pm(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;rh||Ti==null||Ti!==al(r)||(r=Ti,"selectionStart"in r&&wd(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ks&&fo(Ks,r)||(Ks=r,r=pl(nh,"onSelect"),0<r.length&&(e=new yd("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Ti)))}function Ta(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ii={animationend:Ta("Animation","AnimationEnd"),animationiteration:Ta("Animation","AnimationIteration"),animationstart:Ta("Animation","AnimationStart"),transitionend:Ta("Transition","TransitionEnd")},cc={},V_={};kn&&(V_=document.createElement("div").style,"AnimationEvent"in window||(delete Ii.animationend.animation,delete Ii.animationiteration.animation,delete Ii.animationstart.animation),"TransitionEvent"in window||delete Ii.transitionend.transition);function eu(t){if(cc[t])return cc[t];if(!Ii[t])return t;var e=Ii[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in V_)return cc[t]=e[n];return t}var O_=eu("animationend"),L_=eu("animationiteration"),M_=eu("animationstart"),F_=eu("transitionend"),j_=new Map,mm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ar(t,e){j_.set(t,e),ri(e,[t])}for(var hc=0;hc<mm.length;hc++){var dc=mm[hc],RI=dc.toLowerCase(),kI=dc[0].toUpperCase()+dc.slice(1);Ar(RI,"on"+kI)}Ar(O_,"onAnimationEnd");Ar(L_,"onAnimationIteration");Ar(M_,"onAnimationStart");Ar("dblclick","onDoubleClick");Ar("focusin","onFocus");Ar("focusout","onBlur");Ar(F_,"onTransitionEnd");qi("onMouseEnter",["mouseout","mouseover"]);qi("onMouseLeave",["mouseout","mouseover"]);qi("onPointerEnter",["pointerout","pointerover"]);qi("onPointerLeave",["pointerout","pointerover"]);ri("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ri("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ri("onBeforeInput",["compositionend","keypress","textInput","paste"]);ri("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ri("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ri("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var js="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),PI=new Set("cancel close invalid load scroll toggle".split(" ").concat(js));function gm(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,RT(r,e,void 0,t),t.currentTarget=null}function U_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;gm(i,l,h),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;gm(i,l,h),s=u}}}if(ul)throw t=Yc,ul=!1,Yc=null,t}function _e(t,e){var n=e[lh];n===void 0&&(n=e[lh]=new Set);var r=t+"__bubble";n.has(r)||(z_(e,t,2,!1),n.add(r))}function fc(t,e,n){var r=0;e&&(r|=4),z_(n,t,r,e)}var Ia="_reactListening"+Math.random().toString(36).slice(2);function po(t){if(!t[Ia]){t[Ia]=!0,Ky.forEach(function(n){n!=="selectionchange"&&(PI.has(n)||fc(n,!1,t),fc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ia]||(e[Ia]=!0,fc("selectionchange",!1,e))}}function z_(t,e,n,r){switch(S_(e)){case 1:var i=$T;break;case 4:i=HT;break;default:i=md}n=i.bind(null,e,n,t),i=void 0,!Xc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function pc(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=Fr(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}c_(function(){var h=s,f=hd(n),m=[];e:{var p=j_.get(t);if(p!==void 0){var I=yd,k=t;switch(t){case"keypress":if(za(n)===0)break e;case"keydown":case"keyup":I=sI;break;case"focusin":k="focus",I=ac;break;case"focusout":k="blur",I=ac;break;case"beforeblur":case"afterblur":I=ac;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":I=im;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":I=GT;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":I=lI;break;case O_:case L_:case M_:I=JT;break;case F_:I=cI;break;case"scroll":I=qT;break;case"wheel":I=dI;break;case"copy":case"cut":case"paste":I=YT;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":I=om}var N=(e&4)!==0,V=!N&&t==="scroll",S=N?p!==null?p+"Capture":null:p;N=[];for(var v=h,A;v!==null;){A=v;var b=A.stateNode;if(A.tag===5&&b!==null&&(A=b,S!==null&&(b=ao(v,S),b!=null&&N.push(mo(v,b,A)))),V)break;v=v.return}0<N.length&&(p=new I(p,k,null,n,f),m.push({event:p,listeners:N}))}}if(!(e&7)){e:{if(p=t==="mouseover"||t==="pointerover",I=t==="mouseout"||t==="pointerout",p&&n!==Qc&&(k=n.relatedTarget||n.fromElement)&&(Fr(k)||k[Pn]))break e;if((I||p)&&(p=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,I?(k=n.relatedTarget||n.toElement,I=h,k=k?Fr(k):null,k!==null&&(V=ii(k),k!==V||k.tag!==5&&k.tag!==6)&&(k=null)):(I=null,k=h),I!==k)){if(N=im,b="onMouseLeave",S="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(N=om,b="onPointerLeave",S="onPointerEnter",v="pointer"),V=I==null?p:Si(I),A=k==null?p:Si(k),p=new N(b,v+"leave",I,n,f),p.target=V,p.relatedTarget=A,b=null,Fr(f)===h&&(N=new N(S,v+"enter",k,n,f),N.target=A,N.relatedTarget=V,b=N),V=b,I&&k)t:{for(N=I,S=k,v=0,A=N;A;A=fi(A))v++;for(A=0,b=S;b;b=fi(b))A++;for(;0<v-A;)N=fi(N),v--;for(;0<A-v;)S=fi(S),A--;for(;v--;){if(N===S||S!==null&&N===S.alternate)break t;N=fi(N),S=fi(S)}N=null}else N=null;I!==null&&ym(m,p,I,N,!1),k!==null&&V!==null&&ym(m,V,k,N,!0)}}e:{if(p=h?Si(h):window,I=p.nodeName&&p.nodeName.toLowerCase(),I==="select"||I==="input"&&p.type==="file")var j=vI;else if(um(p))if(x_)j=II;else{j=EI;var F=wI}else(I=p.nodeName)&&I.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(j=TI);if(j&&(j=j(t,h))){P_(m,j,n,f);break e}F&&F(t,p,h),t==="focusout"&&(F=p._wrapperState)&&F.controlled&&p.type==="number"&&Hc(p,"number",p.value)}switch(F=h?Si(h):window,t){case"focusin":(um(F)||F.contentEditable==="true")&&(Ti=F,nh=h,Ks=null);break;case"focusout":Ks=nh=Ti=null;break;case"mousedown":rh=!0;break;case"contextmenu":case"mouseup":case"dragend":rh=!1,pm(m,n,f);break;case"selectionchange":if(CI)break;case"keydown":case"keyup":pm(m,n,f)}var w;if(vd)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Ei?R_(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(C_&&n.locale!=="ko"&&(Ei||y!=="onCompositionStart"?y==="onCompositionEnd"&&Ei&&(w=A_()):(Zn=f,gd="value"in Zn?Zn.value:Zn.textContent,Ei=!0)),F=pl(h,y),0<F.length&&(y=new sm(y,t,null,n,f),m.push({event:y,listeners:F}),w?y.data=w:(w=k_(n),w!==null&&(y.data=w)))),(w=pI?mI(t,n):gI(t,n))&&(h=pl(h,"onBeforeInput"),0<h.length&&(f=new sm("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:h}),f.data=w))}U_(m,e)})}function mo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function pl(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=ao(t,n),s!=null&&r.unshift(mo(t,s,i)),s=ao(t,e),s!=null&&r.push(mo(t,s,i))),t=t.return}return r}function fi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function ym(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,i?(u=ao(n,s),u!=null&&o.unshift(mo(n,u,l))):i||(u=ao(n,s),u!=null&&o.push(mo(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var xI=/\r\n?/g,NI=/\u0000|\uFFFD/g;function _m(t){return(typeof t=="string"?t:""+t).replace(xI,`
`).replace(NI,"")}function Sa(t,e,n){if(e=_m(e),_m(t)!==e&&n)throw Error(M(425))}function ml(){}var ih=null,sh=null;function oh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ah=typeof setTimeout=="function"?setTimeout:void 0,DI=typeof clearTimeout=="function"?clearTimeout:void 0,vm=typeof Promise=="function"?Promise:void 0,bI=typeof queueMicrotask=="function"?queueMicrotask:typeof vm<"u"?function(t){return vm.resolve(null).then(t).catch(VI)}:ah;function VI(t){setTimeout(function(){throw t})}function mc(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),co(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);co(e)}function sr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function wm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var os=Math.random().toString(36).slice(2),sn="__reactFiber$"+os,go="__reactProps$"+os,Pn="__reactContainer$"+os,lh="__reactEvents$"+os,OI="__reactListeners$"+os,LI="__reactHandles$"+os;function Fr(t){var e=t[sn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Pn]||n[sn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=wm(t);t!==null;){if(n=t[sn])return n;t=wm(t)}return e}t=n,n=t.parentNode}return null}function Mo(t){return t=t[sn]||t[Pn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Si(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(M(33))}function tu(t){return t[go]||null}var uh=[],Ai=-1;function Cr(t){return{current:t}}function we(t){0>Ai||(t.current=uh[Ai],uh[Ai]=null,Ai--)}function me(t,e){Ai++,uh[Ai]=t.current,t.current=e}var gr={},lt=Cr(gr),Et=Cr(!1),Kr=gr;function Wi(t,e){var n=t.type.contextTypes;if(!n)return gr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Tt(t){return t=t.childContextTypes,t!=null}function gl(){we(Et),we(lt)}function Em(t,e,n){if(lt.current!==gr)throw Error(M(168));me(lt,e),me(Et,n)}function B_(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(M(108,wT(t)||"Unknown",i));return Ce({},n,r)}function yl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||gr,Kr=lt.current,me(lt,t),me(Et,Et.current),!0}function Tm(t,e,n){var r=t.stateNode;if(!r)throw Error(M(169));n?(t=B_(t,e,Kr),r.__reactInternalMemoizedMergedChildContext=t,we(Et),we(lt),me(lt,t)):we(Et),me(Et,n)}var En=null,nu=!1,gc=!1;function $_(t){En===null?En=[t]:En.push(t)}function MI(t){nu=!0,$_(t)}function Rr(){if(!gc&&En!==null){gc=!0;var t=0,e=he;try{var n=En;for(he=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}En=null,nu=!1}catch(i){throw En!==null&&(En=En.slice(t+1)),p_(dd,Rr),i}finally{he=e,gc=!1}}return null}var Ci=[],Ri=0,_l=null,vl=0,Vt=[],Ot=0,Qr=null,Tn=1,In="";function Or(t,e){Ci[Ri++]=vl,Ci[Ri++]=_l,_l=t,vl=e}function H_(t,e,n){Vt[Ot++]=Tn,Vt[Ot++]=In,Vt[Ot++]=Qr,Qr=t;var r=Tn;t=In;var i=32-Xt(r)-1;r&=~(1<<i),n+=1;var s=32-Xt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Tn=1<<32-Xt(e)+i|n<<i|r,In=s+t}else Tn=1<<s|n<<i|r,In=t}function Ed(t){t.return!==null&&(Or(t,1),H_(t,1,0))}function Td(t){for(;t===_l;)_l=Ci[--Ri],Ci[Ri]=null,vl=Ci[--Ri],Ci[Ri]=null;for(;t===Qr;)Qr=Vt[--Ot],Vt[Ot]=null,In=Vt[--Ot],Vt[Ot]=null,Tn=Vt[--Ot],Vt[Ot]=null}var xt=null,kt=null,Ee=!1,Qt=null;function q_(t,e){var n=Ft(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Im(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,xt=t,kt=sr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,xt=t,kt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Qr!==null?{id:Tn,overflow:In}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Ft(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,xt=t,kt=null,!0):!1;default:return!1}}function ch(t){return(t.mode&1)!==0&&(t.flags&128)===0}function hh(t){if(Ee){var e=kt;if(e){var n=e;if(!Im(t,e)){if(ch(t))throw Error(M(418));e=sr(n.nextSibling);var r=xt;e&&Im(t,e)?q_(r,n):(t.flags=t.flags&-4097|2,Ee=!1,xt=t)}}else{if(ch(t))throw Error(M(418));t.flags=t.flags&-4097|2,Ee=!1,xt=t}}}function Sm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;xt=t}function Aa(t){if(t!==xt)return!1;if(!Ee)return Sm(t),Ee=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!oh(t.type,t.memoizedProps)),e&&(e=kt)){if(ch(t))throw W_(),Error(M(418));for(;e;)q_(t,e),e=sr(e.nextSibling)}if(Sm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(M(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){kt=sr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}kt=null}}else kt=xt?sr(t.stateNode.nextSibling):null;return!0}function W_(){for(var t=kt;t;)t=sr(t.nextSibling)}function Gi(){kt=xt=null,Ee=!1}function Id(t){Qt===null?Qt=[t]:Qt.push(t)}var FI=Fn.ReactCurrentBatchConfig;function bs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(M(309));var r=n.stateNode}if(!r)throw Error(M(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(M(284));if(!n._owner)throw Error(M(290,t))}return t}function Ca(t,e){throw t=Object.prototype.toString.call(e),Error(M(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Am(t){var e=t._init;return e(t._payload)}function G_(t){function e(S,v){if(t){var A=S.deletions;A===null?(S.deletions=[v],S.flags|=16):A.push(v)}}function n(S,v){if(!t)return null;for(;v!==null;)e(S,v),v=v.sibling;return null}function r(S,v){for(S=new Map;v!==null;)v.key!==null?S.set(v.key,v):S.set(v.index,v),v=v.sibling;return S}function i(S,v){return S=ur(S,v),S.index=0,S.sibling=null,S}function s(S,v,A){return S.index=A,t?(A=S.alternate,A!==null?(A=A.index,A<v?(S.flags|=2,v):A):(S.flags|=2,v)):(S.flags|=1048576,v)}function o(S){return t&&S.alternate===null&&(S.flags|=2),S}function l(S,v,A,b){return v===null||v.tag!==6?(v=Ic(A,S.mode,b),v.return=S,v):(v=i(v,A),v.return=S,v)}function u(S,v,A,b){var j=A.type;return j===wi?f(S,v,A.props.children,b,A.key):v!==null&&(v.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===qn&&Am(j)===v.type)?(b=i(v,A.props),b.ref=bs(S,v,A),b.return=S,b):(b=Ka(A.type,A.key,A.props,null,S.mode,b),b.ref=bs(S,v,A),b.return=S,b)}function h(S,v,A,b){return v===null||v.tag!==4||v.stateNode.containerInfo!==A.containerInfo||v.stateNode.implementation!==A.implementation?(v=Sc(A,S.mode,b),v.return=S,v):(v=i(v,A.children||[]),v.return=S,v)}function f(S,v,A,b,j){return v===null||v.tag!==7?(v=$r(A,S.mode,b,j),v.return=S,v):(v=i(v,A),v.return=S,v)}function m(S,v,A){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Ic(""+v,S.mode,A),v.return=S,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ma:return A=Ka(v.type,v.key,v.props,null,S.mode,A),A.ref=bs(S,null,v),A.return=S,A;case vi:return v=Sc(v,S.mode,A),v.return=S,v;case qn:var b=v._init;return m(S,b(v._payload),A)}if(Ms(v)||ks(v))return v=$r(v,S.mode,A,null),v.return=S,v;Ca(S,v)}return null}function p(S,v,A,b){var j=v!==null?v.key:null;if(typeof A=="string"&&A!==""||typeof A=="number")return j!==null?null:l(S,v,""+A,b);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case ma:return A.key===j?u(S,v,A,b):null;case vi:return A.key===j?h(S,v,A,b):null;case qn:return j=A._init,p(S,v,j(A._payload),b)}if(Ms(A)||ks(A))return j!==null?null:f(S,v,A,b,null);Ca(S,A)}return null}function I(S,v,A,b,j){if(typeof b=="string"&&b!==""||typeof b=="number")return S=S.get(A)||null,l(v,S,""+b,j);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ma:return S=S.get(b.key===null?A:b.key)||null,u(v,S,b,j);case vi:return S=S.get(b.key===null?A:b.key)||null,h(v,S,b,j);case qn:var F=b._init;return I(S,v,A,F(b._payload),j)}if(Ms(b)||ks(b))return S=S.get(A)||null,f(v,S,b,j,null);Ca(v,b)}return null}function k(S,v,A,b){for(var j=null,F=null,w=v,y=v=0,_=null;w!==null&&y<A.length;y++){w.index>y?(_=w,w=null):_=w.sibling;var E=p(S,w,A[y],b);if(E===null){w===null&&(w=_);break}t&&w&&E.alternate===null&&e(S,w),v=s(E,v,y),F===null?j=E:F.sibling=E,F=E,w=_}if(y===A.length)return n(S,w),Ee&&Or(S,y),j;if(w===null){for(;y<A.length;y++)w=m(S,A[y],b),w!==null&&(v=s(w,v,y),F===null?j=w:F.sibling=w,F=w);return Ee&&Or(S,y),j}for(w=r(S,w);y<A.length;y++)_=I(w,S,y,A[y],b),_!==null&&(t&&_.alternate!==null&&w.delete(_.key===null?y:_.key),v=s(_,v,y),F===null?j=_:F.sibling=_,F=_);return t&&w.forEach(function(R){return e(S,R)}),Ee&&Or(S,y),j}function N(S,v,A,b){var j=ks(A);if(typeof j!="function")throw Error(M(150));if(A=j.call(A),A==null)throw Error(M(151));for(var F=j=null,w=v,y=v=0,_=null,E=A.next();w!==null&&!E.done;y++,E=A.next()){w.index>y?(_=w,w=null):_=w.sibling;var R=p(S,w,E.value,b);if(R===null){w===null&&(w=_);break}t&&w&&R.alternate===null&&e(S,w),v=s(R,v,y),F===null?j=R:F.sibling=R,F=R,w=_}if(E.done)return n(S,w),Ee&&Or(S,y),j;if(w===null){for(;!E.done;y++,E=A.next())E=m(S,E.value,b),E!==null&&(v=s(E,v,y),F===null?j=E:F.sibling=E,F=E);return Ee&&Or(S,y),j}for(w=r(S,w);!E.done;y++,E=A.next())E=I(w,S,y,E.value,b),E!==null&&(t&&E.alternate!==null&&w.delete(E.key===null?y:E.key),v=s(E,v,y),F===null?j=E:F.sibling=E,F=E);return t&&w.forEach(function(P){return e(S,P)}),Ee&&Or(S,y),j}function V(S,v,A,b){if(typeof A=="object"&&A!==null&&A.type===wi&&A.key===null&&(A=A.props.children),typeof A=="object"&&A!==null){switch(A.$$typeof){case ma:e:{for(var j=A.key,F=v;F!==null;){if(F.key===j){if(j=A.type,j===wi){if(F.tag===7){n(S,F.sibling),v=i(F,A.props.children),v.return=S,S=v;break e}}else if(F.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===qn&&Am(j)===F.type){n(S,F.sibling),v=i(F,A.props),v.ref=bs(S,F,A),v.return=S,S=v;break e}n(S,F);break}else e(S,F);F=F.sibling}A.type===wi?(v=$r(A.props.children,S.mode,b,A.key),v.return=S,S=v):(b=Ka(A.type,A.key,A.props,null,S.mode,b),b.ref=bs(S,v,A),b.return=S,S=b)}return o(S);case vi:e:{for(F=A.key;v!==null;){if(v.key===F)if(v.tag===4&&v.stateNode.containerInfo===A.containerInfo&&v.stateNode.implementation===A.implementation){n(S,v.sibling),v=i(v,A.children||[]),v.return=S,S=v;break e}else{n(S,v);break}else e(S,v);v=v.sibling}v=Sc(A,S.mode,b),v.return=S,S=v}return o(S);case qn:return F=A._init,V(S,v,F(A._payload),b)}if(Ms(A))return k(S,v,A,b);if(ks(A))return N(S,v,A,b);Ca(S,A)}return typeof A=="string"&&A!==""||typeof A=="number"?(A=""+A,v!==null&&v.tag===6?(n(S,v.sibling),v=i(v,A),v.return=S,S=v):(n(S,v),v=Ic(A,S.mode,b),v.return=S,S=v),o(S)):n(S,v)}return V}var Ki=G_(!0),K_=G_(!1),wl=Cr(null),El=null,ki=null,Sd=null;function Ad(){Sd=ki=El=null}function Cd(t){var e=wl.current;we(wl),t._currentValue=e}function dh(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Mi(t,e){El=t,Sd=ki=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(wt=!0),t.firstContext=null)}function Ut(t){var e=t._currentValue;if(Sd!==t)if(t={context:t,memoizedValue:e,next:null},ki===null){if(El===null)throw Error(M(308));ki=t,El.dependencies={lanes:0,firstContext:t}}else ki=ki.next=t;return e}var jr=null;function Rd(t){jr===null?jr=[t]:jr.push(t)}function Q_(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Rd(e)):(n.next=i.next,i.next=n),e.interleaved=n,xn(t,r)}function xn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Wn=!1;function kd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function J_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Cn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function or(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,oe&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,xn(t,n)}return i=r.interleaved,i===null?(e.next=e,Rd(r)):(e.next=i.next,i.next=e),r.interleaved=e,xn(t,n)}function Ba(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,fd(t,n)}}function Cm(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Tl(t,e,n,r){var i=t.updateQueue;Wn=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?s=h:o.next=h,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=h:l.next=h,f.lastBaseUpdate=u))}if(s!==null){var m=i.baseState;o=0,f=h=u=null,l=s;do{var p=l.lane,I=l.eventTime;if((r&p)===p){f!==null&&(f=f.next={eventTime:I,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var k=t,N=l;switch(p=e,I=n,N.tag){case 1:if(k=N.payload,typeof k=="function"){m=k.call(I,m,p);break e}m=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=N.payload,p=typeof k=="function"?k.call(I,m,p):k,p==null)break e;m=Ce({},m,p);break e;case 2:Wn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,p=i.effects,p===null?i.effects=[l]:p.push(l))}else I={eventTime:I,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(h=f=I,u=m):f=f.next=I,o|=p;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;p=l,l=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(f===null&&(u=m),i.baseState=u,i.firstBaseUpdate=h,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Xr|=o,t.lanes=o,t.memoizedState=m}}function Rm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(M(191,i));i.call(r)}}}var Fo={},an=Cr(Fo),yo=Cr(Fo),_o=Cr(Fo);function Ur(t){if(t===Fo)throw Error(M(174));return t}function Pd(t,e){switch(me(_o,e),me(yo,t),me(an,Fo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Wc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Wc(e,t)}we(an),me(an,e)}function Qi(){we(an),we(yo),we(_o)}function X_(t){Ur(_o.current);var e=Ur(an.current),n=Wc(e,t.type);e!==n&&(me(yo,t),me(an,n))}function xd(t){yo.current===t&&(we(an),we(yo))}var Se=Cr(0);function Il(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var yc=[];function Nd(){for(var t=0;t<yc.length;t++)yc[t]._workInProgressVersionPrimary=null;yc.length=0}var $a=Fn.ReactCurrentDispatcher,_c=Fn.ReactCurrentBatchConfig,Jr=0,Ae=null,Fe=null,Be=null,Sl=!1,Qs=!1,vo=0,jI=0;function nt(){throw Error(M(321))}function Dd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Zt(t[n],e[n]))return!1;return!0}function bd(t,e,n,r,i,s){if(Jr=s,Ae=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,$a.current=t===null||t.memoizedState===null?$I:HI,t=n(r,i),Qs){s=0;do{if(Qs=!1,vo=0,25<=s)throw Error(M(301));s+=1,Be=Fe=null,e.updateQueue=null,$a.current=qI,t=n(r,i)}while(Qs)}if($a.current=Al,e=Fe!==null&&Fe.next!==null,Jr=0,Be=Fe=Ae=null,Sl=!1,e)throw Error(M(300));return t}function Vd(){var t=vo!==0;return vo=0,t}function nn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Be===null?Ae.memoizedState=Be=t:Be=Be.next=t,Be}function zt(){if(Fe===null){var t=Ae.alternate;t=t!==null?t.memoizedState:null}else t=Fe.next;var e=Be===null?Ae.memoizedState:Be.next;if(e!==null)Be=e,Fe=t;else{if(t===null)throw Error(M(310));Fe=t,t={memoizedState:Fe.memoizedState,baseState:Fe.baseState,baseQueue:Fe.baseQueue,queue:Fe.queue,next:null},Be===null?Ae.memoizedState=Be=t:Be=Be.next=t}return Be}function wo(t,e){return typeof e=="function"?e(t):e}function vc(t){var e=zt(),n=e.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=t;var r=Fe,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,h=s;do{var f=h.lane;if((Jr&f)===f)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var m={lane:f,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=m,o=r):u=u.next=m,Ae.lanes|=f,Xr|=f}h=h.next}while(h!==null&&h!==s);u===null?o=r:u.next=l,Zt(r,e.memoizedState)||(wt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Ae.lanes|=s,Xr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function wc(t){var e=zt(),n=e.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);Zt(s,e.memoizedState)||(wt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function Y_(){}function Z_(t,e){var n=Ae,r=zt(),i=e(),s=!Zt(r.memoizedState,i);if(s&&(r.memoizedState=i,wt=!0),r=r.queue,Od(nv.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Be!==null&&Be.memoizedState.tag&1){if(n.flags|=2048,Eo(9,tv.bind(null,n,r,i,e),void 0,null),$e===null)throw Error(M(349));Jr&30||ev(n,e,i)}return i}function ev(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ae.updateQueue,e===null?(e={lastEffect:null,stores:null},Ae.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function tv(t,e,n,r){e.value=n,e.getSnapshot=r,rv(e)&&iv(t)}function nv(t,e,n){return n(function(){rv(e)&&iv(t)})}function rv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Zt(t,n)}catch{return!0}}function iv(t){var e=xn(t,1);e!==null&&Yt(e,t,1,-1)}function km(t){var e=nn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},e.queue=t,t=t.dispatch=BI.bind(null,Ae,t),[e.memoizedState,t]}function Eo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Ae.updateQueue,e===null?(e={lastEffect:null,stores:null},Ae.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function sv(){return zt().memoizedState}function Ha(t,e,n,r){var i=nn();Ae.flags|=t,i.memoizedState=Eo(1|e,n,void 0,r===void 0?null:r)}function ru(t,e,n,r){var i=zt();r=r===void 0?null:r;var s=void 0;if(Fe!==null){var o=Fe.memoizedState;if(s=o.destroy,r!==null&&Dd(r,o.deps)){i.memoizedState=Eo(e,n,s,r);return}}Ae.flags|=t,i.memoizedState=Eo(1|e,n,s,r)}function Pm(t,e){return Ha(8390656,8,t,e)}function Od(t,e){return ru(2048,8,t,e)}function ov(t,e){return ru(4,2,t,e)}function av(t,e){return ru(4,4,t,e)}function lv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function uv(t,e,n){return n=n!=null?n.concat([t]):null,ru(4,4,lv.bind(null,e,t),n)}function Ld(){}function cv(t,e){var n=zt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Dd(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function hv(t,e){var n=zt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Dd(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function dv(t,e,n){return Jr&21?(Zt(n,e)||(n=y_(),Ae.lanes|=n,Xr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,wt=!0),t.memoizedState=n)}function UI(t,e){var n=he;he=n!==0&&4>n?n:4,t(!0);var r=_c.transition;_c.transition={};try{t(!1),e()}finally{he=n,_c.transition=r}}function fv(){return zt().memoizedState}function zI(t,e,n){var r=lr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},pv(t))mv(e,n);else if(n=Q_(t,e,n,r),n!==null){var i=ft();Yt(n,t,r,i),gv(n,e,r)}}function BI(t,e,n){var r=lr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(pv(t))mv(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,Zt(l,o)){var u=e.interleaved;u===null?(i.next=i,Rd(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=Q_(t,e,i,r),n!==null&&(i=ft(),Yt(n,t,r,i),gv(n,e,r))}}function pv(t){var e=t.alternate;return t===Ae||e!==null&&e===Ae}function mv(t,e){Qs=Sl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function gv(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,fd(t,n)}}var Al={readContext:Ut,useCallback:nt,useContext:nt,useEffect:nt,useImperativeHandle:nt,useInsertionEffect:nt,useLayoutEffect:nt,useMemo:nt,useReducer:nt,useRef:nt,useState:nt,useDebugValue:nt,useDeferredValue:nt,useTransition:nt,useMutableSource:nt,useSyncExternalStore:nt,useId:nt,unstable_isNewReconciler:!1},$I={readContext:Ut,useCallback:function(t,e){return nn().memoizedState=[t,e===void 0?null:e],t},useContext:Ut,useEffect:Pm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ha(4194308,4,lv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ha(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ha(4,2,t,e)},useMemo:function(t,e){var n=nn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=nn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=zI.bind(null,Ae,t),[r.memoizedState,t]},useRef:function(t){var e=nn();return t={current:t},e.memoizedState=t},useState:km,useDebugValue:Ld,useDeferredValue:function(t){return nn().memoizedState=t},useTransition:function(){var t=km(!1),e=t[0];return t=UI.bind(null,t[1]),nn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Ae,i=nn();if(Ee){if(n===void 0)throw Error(M(407));n=n()}else{if(n=e(),$e===null)throw Error(M(349));Jr&30||ev(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Pm(nv.bind(null,r,s,t),[t]),r.flags|=2048,Eo(9,tv.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=nn(),e=$e.identifierPrefix;if(Ee){var n=In,r=Tn;n=(r&~(1<<32-Xt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=vo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=jI++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},HI={readContext:Ut,useCallback:cv,useContext:Ut,useEffect:Od,useImperativeHandle:uv,useInsertionEffect:ov,useLayoutEffect:av,useMemo:hv,useReducer:vc,useRef:sv,useState:function(){return vc(wo)},useDebugValue:Ld,useDeferredValue:function(t){var e=zt();return dv(e,Fe.memoizedState,t)},useTransition:function(){var t=vc(wo)[0],e=zt().memoizedState;return[t,e]},useMutableSource:Y_,useSyncExternalStore:Z_,useId:fv,unstable_isNewReconciler:!1},qI={readContext:Ut,useCallback:cv,useContext:Ut,useEffect:Od,useImperativeHandle:uv,useInsertionEffect:ov,useLayoutEffect:av,useMemo:hv,useReducer:wc,useRef:sv,useState:function(){return wc(wo)},useDebugValue:Ld,useDeferredValue:function(t){var e=zt();return Fe===null?e.memoizedState=t:dv(e,Fe.memoizedState,t)},useTransition:function(){var t=wc(wo)[0],e=zt().memoizedState;return[t,e]},useMutableSource:Y_,useSyncExternalStore:Z_,useId:fv,unstable_isNewReconciler:!1};function Gt(t,e){if(t&&t.defaultProps){e=Ce({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function fh(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ce({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var iu={isMounted:function(t){return(t=t._reactInternals)?ii(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=ft(),i=lr(t),s=Cn(r,i);s.payload=e,n!=null&&(s.callback=n),e=or(t,s,i),e!==null&&(Yt(e,t,i,r),Ba(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=ft(),i=lr(t),s=Cn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=or(t,s,i),e!==null&&(Yt(e,t,i,r),Ba(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ft(),r=lr(t),i=Cn(n,r);i.tag=2,e!=null&&(i.callback=e),e=or(t,i,r),e!==null&&(Yt(e,t,r,n),Ba(e,t,r))}};function xm(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!fo(n,r)||!fo(i,s):!0}function yv(t,e,n){var r=!1,i=gr,s=e.contextType;return typeof s=="object"&&s!==null?s=Ut(s):(i=Tt(e)?Kr:lt.current,r=e.contextTypes,s=(r=r!=null)?Wi(t,i):gr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=iu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Nm(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&iu.enqueueReplaceState(e,e.state,null)}function ph(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},kd(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Ut(s):(s=Tt(e)?Kr:lt.current,i.context=Wi(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(fh(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&iu.enqueueReplaceState(i,i.state,null),Tl(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function Ji(t,e){try{var n="",r=e;do n+=vT(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function Ec(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function mh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var WI=typeof WeakMap=="function"?WeakMap:Map;function _v(t,e,n){n=Cn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Rl||(Rl=!0,Ah=r),mh(t,e)},n}function vv(t,e,n){n=Cn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){mh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){mh(t,e),typeof r!="function"&&(ar===null?ar=new Set([this]):ar.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Dm(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new WI;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=o1.bind(null,t,e,n),e.then(t,t))}function bm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Vm(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Cn(-1,1),e.tag=2,or(n,e,1))),n.lanes|=1),t)}var GI=Fn.ReactCurrentOwner,wt=!1;function dt(t,e,n,r){e.child=t===null?K_(e,null,n,r):Ki(e,t.child,n,r)}function Om(t,e,n,r,i){n=n.render;var s=e.ref;return Mi(e,i),r=bd(t,e,n,r,s,i),n=Vd(),t!==null&&!wt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Nn(t,e,i)):(Ee&&n&&Ed(e),e.flags|=1,dt(t,e,r,i),e.child)}function Lm(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Hd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,wv(t,e,s,r,i)):(t=Ka(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:fo,n(o,r)&&t.ref===e.ref)return Nn(t,e,i)}return e.flags|=1,t=ur(s,r),t.ref=e.ref,t.return=e,e.child=t}function wv(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(fo(s,r)&&t.ref===e.ref)if(wt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(wt=!0);else return e.lanes=t.lanes,Nn(t,e,i)}return gh(t,e,n,r,i)}function Ev(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},me(xi,Rt),Rt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,me(xi,Rt),Rt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,me(xi,Rt),Rt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,me(xi,Rt),Rt|=r;return dt(t,e,i,n),e.child}function Tv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function gh(t,e,n,r,i){var s=Tt(n)?Kr:lt.current;return s=Wi(e,s),Mi(e,i),n=bd(t,e,n,r,s,i),r=Vd(),t!==null&&!wt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Nn(t,e,i)):(Ee&&r&&Ed(e),e.flags|=1,dt(t,e,n,i),e.child)}function Mm(t,e,n,r,i){if(Tt(n)){var s=!0;yl(e)}else s=!1;if(Mi(e,i),e.stateNode===null)qa(t,e),yv(e,n,r),ph(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=Ut(h):(h=Tt(n)?Kr:lt.current,h=Wi(e,h));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&Nm(e,o,r,h),Wn=!1;var p=e.memoizedState;o.state=p,Tl(e,r,o,i),u=e.memoizedState,l!==r||p!==u||Et.current||Wn?(typeof f=="function"&&(fh(e,n,f,r),u=e.memoizedState),(l=Wn||xm(e,n,l,r,p,u,h))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,J_(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Gt(e.type,l),o.props=h,m=e.pendingProps,p=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Ut(u):(u=Tt(n)?Kr:lt.current,u=Wi(e,u));var I=n.getDerivedStateFromProps;(f=typeof I=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||p!==u)&&Nm(e,o,r,u),Wn=!1,p=e.memoizedState,o.state=p,Tl(e,r,o,i);var k=e.memoizedState;l!==m||p!==k||Et.current||Wn?(typeof I=="function"&&(fh(e,n,I,r),k=e.memoizedState),(h=Wn||xm(e,n,h,r,p,k,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,k,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,k,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=k),o.props=r,o.state=k,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),r=!1)}return yh(t,e,n,r,s,i)}function yh(t,e,n,r,i,s){Tv(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Tm(e,n,!1),Nn(t,e,s);r=e.stateNode,GI.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Ki(e,t.child,null,s),e.child=Ki(e,null,l,s)):dt(t,e,l,s),e.memoizedState=r.state,i&&Tm(e,n,!0),e.child}function Iv(t){var e=t.stateNode;e.pendingContext?Em(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Em(t,e.context,!1),Pd(t,e.containerInfo)}function Fm(t,e,n,r,i){return Gi(),Id(i),e.flags|=256,dt(t,e,n,r),e.child}var _h={dehydrated:null,treeContext:null,retryLane:0};function vh(t){return{baseLanes:t,cachePool:null,transitions:null}}function Sv(t,e,n){var r=e.pendingProps,i=Se.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),me(Se,i&1),t===null)return hh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=au(o,r,0,null),t=$r(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=vh(n),e.memoizedState=_h,t):Md(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return KI(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=ur(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=ur(l,s):(s=$r(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?vh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=_h,r}return s=t.child,t=s.sibling,r=ur(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Md(t,e){return e=au({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ra(t,e,n,r){return r!==null&&Id(r),Ki(e,t.child,null,n),t=Md(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function KI(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=Ec(Error(M(422))),Ra(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=au({mode:"visible",children:r.children},i,0,null),s=$r(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Ki(e,t.child,null,o),e.child.memoizedState=vh(o),e.memoizedState=_h,s);if(!(e.mode&1))return Ra(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(M(419)),r=Ec(s,r,void 0),Ra(t,e,o,r)}if(l=(o&t.childLanes)!==0,wt||l){if(r=$e,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,xn(t,i),Yt(r,t,i,-1))}return $d(),r=Ec(Error(M(421))),Ra(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=a1.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,kt=sr(i.nextSibling),xt=e,Ee=!0,Qt=null,t!==null&&(Vt[Ot++]=Tn,Vt[Ot++]=In,Vt[Ot++]=Qr,Tn=t.id,In=t.overflow,Qr=e),e=Md(e,r.children),e.flags|=4096,e)}function jm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),dh(t.return,e,n)}function Tc(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Av(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(dt(t,e,r.children,n),r=Se.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&jm(t,n,e);else if(t.tag===19)jm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(me(Se,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Il(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Tc(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Il(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Tc(e,!0,n,null,s);break;case"together":Tc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function qa(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Nn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Xr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(M(153));if(e.child!==null){for(t=e.child,n=ur(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ur(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function QI(t,e,n){switch(e.tag){case 3:Iv(e),Gi();break;case 5:X_(e);break;case 1:Tt(e.type)&&yl(e);break;case 4:Pd(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;me(wl,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(me(Se,Se.current&1),e.flags|=128,null):n&e.child.childLanes?Sv(t,e,n):(me(Se,Se.current&1),t=Nn(t,e,n),t!==null?t.sibling:null);me(Se,Se.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Av(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),me(Se,Se.current),r)break;return null;case 22:case 23:return e.lanes=0,Ev(t,e,n)}return Nn(t,e,n)}var Cv,wh,Rv,kv;Cv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};wh=function(){};Rv=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Ur(an.current);var s=null;switch(n){case"input":i=Bc(t,i),r=Bc(t,r),s=[];break;case"select":i=Ce({},i,{value:void 0}),r=Ce({},r,{value:void 0}),s=[];break;case"textarea":i=qc(t,i),r=qc(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=ml)}Gc(n,r);var o;n=null;for(h in i)if(!r.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var l=i[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(so.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in r){var u=r[h];if(l=i!=null?i[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(so.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&_e("scroll",t),s||l===u||(s=[])):(s=s||[]).push(h,u))}n&&(s=s||[]).push("style",n);var h=s;(e.updateQueue=h)&&(e.flags|=4)}};kv=function(t,e,n,r){n!==r&&(e.flags|=4)};function Vs(t,e){if(!Ee)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function rt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function JI(t,e,n){var r=e.pendingProps;switch(Td(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rt(e),null;case 1:return Tt(e.type)&&gl(),rt(e),null;case 3:return r=e.stateNode,Qi(),we(Et),we(lt),Nd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Aa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Qt!==null&&(kh(Qt),Qt=null))),wh(t,e),rt(e),null;case 5:xd(e);var i=Ur(_o.current);if(n=e.type,t!==null&&e.stateNode!=null)Rv(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(M(166));return rt(e),null}if(t=Ur(an.current),Aa(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[sn]=e,r[go]=s,t=(e.mode&1)!==0,n){case"dialog":_e("cancel",r),_e("close",r);break;case"iframe":case"object":case"embed":_e("load",r);break;case"video":case"audio":for(i=0;i<js.length;i++)_e(js[i],r);break;case"source":_e("error",r);break;case"img":case"image":case"link":_e("error",r),_e("load",r);break;case"details":_e("toggle",r);break;case"input":Kp(r,s),_e("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},_e("invalid",r);break;case"textarea":Jp(r,s),_e("invalid",r)}Gc(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&Sa(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&Sa(r.textContent,l,t),i=["children",""+l]):so.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&_e("scroll",r)}switch(n){case"input":ga(r),Qp(r,s,!0);break;case"textarea":ga(r),Xp(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=ml)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=n_(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[sn]=e,t[go]=r,Cv(t,e,!1,!1),e.stateNode=t;e:{switch(o=Kc(n,r),n){case"dialog":_e("cancel",t),_e("close",t),i=r;break;case"iframe":case"object":case"embed":_e("load",t),i=r;break;case"video":case"audio":for(i=0;i<js.length;i++)_e(js[i],t);i=r;break;case"source":_e("error",t),i=r;break;case"img":case"image":case"link":_e("error",t),_e("load",t),i=r;break;case"details":_e("toggle",t),i=r;break;case"input":Kp(t,r),i=Bc(t,r),_e("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Ce({},r,{value:void 0}),_e("invalid",t);break;case"textarea":Jp(t,r),i=qc(t,r),_e("invalid",t);break;default:i=r}Gc(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?s_(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&r_(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&oo(t,u):typeof u=="number"&&oo(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(so.hasOwnProperty(s)?u!=null&&s==="onScroll"&&_e("scroll",t):u!=null&&ad(t,s,u,o))}switch(n){case"input":ga(t),Qp(t,r,!1);break;case"textarea":ga(t),Xp(t);break;case"option":r.value!=null&&t.setAttribute("value",""+mr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?bi(t,!!r.multiple,s,!1):r.defaultValue!=null&&bi(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=ml)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return rt(e),null;case 6:if(t&&e.stateNode!=null)kv(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(M(166));if(n=Ur(_o.current),Ur(an.current),Aa(e)){if(r=e.stateNode,n=e.memoizedProps,r[sn]=e,(s=r.nodeValue!==n)&&(t=xt,t!==null))switch(t.tag){case 3:Sa(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Sa(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[sn]=e,e.stateNode=r}return rt(e),null;case 13:if(we(Se),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ee&&kt!==null&&e.mode&1&&!(e.flags&128))W_(),Gi(),e.flags|=98560,s=!1;else if(s=Aa(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(M(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(M(317));s[sn]=e}else Gi(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;rt(e),s=!1}else Qt!==null&&(kh(Qt),Qt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Se.current&1?je===0&&(je=3):$d())),e.updateQueue!==null&&(e.flags|=4),rt(e),null);case 4:return Qi(),wh(t,e),t===null&&po(e.stateNode.containerInfo),rt(e),null;case 10:return Cd(e.type._context),rt(e),null;case 17:return Tt(e.type)&&gl(),rt(e),null;case 19:if(we(Se),s=e.memoizedState,s===null)return rt(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Vs(s,!1);else{if(je!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Il(t),o!==null){for(e.flags|=128,Vs(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return me(Se,Se.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ne()>Xi&&(e.flags|=128,r=!0,Vs(s,!1),e.lanes=4194304)}else{if(!r)if(t=Il(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Vs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ee)return rt(e),null}else 2*Ne()-s.renderingStartTime>Xi&&n!==1073741824&&(e.flags|=128,r=!0,Vs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ne(),e.sibling=null,n=Se.current,me(Se,r?n&1|2:n&1),e):(rt(e),null);case 22:case 23:return Bd(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Rt&1073741824&&(rt(e),e.subtreeFlags&6&&(e.flags|=8192)):rt(e),null;case 24:return null;case 25:return null}throw Error(M(156,e.tag))}function XI(t,e){switch(Td(e),e.tag){case 1:return Tt(e.type)&&gl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Qi(),we(Et),we(lt),Nd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return xd(e),null;case 13:if(we(Se),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(M(340));Gi()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return we(Se),null;case 4:return Qi(),null;case 10:return Cd(e.type._context),null;case 22:case 23:return Bd(),null;case 24:return null;default:return null}}var ka=!1,ot=!1,YI=typeof WeakSet=="function"?WeakSet:Set,H=null;function Pi(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Pe(t,e,r)}else n.current=null}function Eh(t,e,n){try{n()}catch(r){Pe(t,e,r)}}var Um=!1;function ZI(t,e){if(ih=dl,t=b_(),wd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,f=0,m=t,p=null;t:for(;;){for(var I;m!==n||i!==0&&m.nodeType!==3||(l=o+i),m!==s||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(I=m.firstChild)!==null;)p=m,m=I;for(;;){if(m===t)break t;if(p===n&&++h===i&&(l=o),p===s&&++f===r&&(u=o),(I=m.nextSibling)!==null)break;m=p,p=m.parentNode}m=I}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(sh={focusedElem:t,selectionRange:n},dl=!1,H=e;H!==null;)if(e=H,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,H=t;else for(;H!==null;){e=H;try{var k=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var N=k.memoizedProps,V=k.memoizedState,S=e.stateNode,v=S.getSnapshotBeforeUpdate(e.elementType===e.type?N:Gt(e.type,N),V);S.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var A=e.stateNode.containerInfo;A.nodeType===1?A.textContent="":A.nodeType===9&&A.documentElement&&A.removeChild(A.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(M(163))}}catch(b){Pe(e,e.return,b)}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}return k=Um,Um=!1,k}function Js(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Eh(e,n,s)}i=i.next}while(i!==r)}}function su(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Th(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Pv(t){var e=t.alternate;e!==null&&(t.alternate=null,Pv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[sn],delete e[go],delete e[lh],delete e[OI],delete e[LI])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function xv(t){return t.tag===5||t.tag===3||t.tag===4}function zm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||xv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ih(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ml));else if(r!==4&&(t=t.child,t!==null))for(Ih(t,e,n),t=t.sibling;t!==null;)Ih(t,e,n),t=t.sibling}function Sh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Sh(t,e,n),t=t.sibling;t!==null;)Sh(t,e,n),t=t.sibling}var We=null,Kt=!1;function $n(t,e,n){for(n=n.child;n!==null;)Nv(t,e,n),n=n.sibling}function Nv(t,e,n){if(on&&typeof on.onCommitFiberUnmount=="function")try{on.onCommitFiberUnmount(Xl,n)}catch{}switch(n.tag){case 5:ot||Pi(n,e);case 6:var r=We,i=Kt;We=null,$n(t,e,n),We=r,Kt=i,We!==null&&(Kt?(t=We,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):We.removeChild(n.stateNode));break;case 18:We!==null&&(Kt?(t=We,n=n.stateNode,t.nodeType===8?mc(t.parentNode,n):t.nodeType===1&&mc(t,n),co(t)):mc(We,n.stateNode));break;case 4:r=We,i=Kt,We=n.stateNode.containerInfo,Kt=!0,$n(t,e,n),We=r,Kt=i;break;case 0:case 11:case 14:case 15:if(!ot&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Eh(n,e,o),i=i.next}while(i!==r)}$n(t,e,n);break;case 1:if(!ot&&(Pi(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Pe(n,e,l)}$n(t,e,n);break;case 21:$n(t,e,n);break;case 22:n.mode&1?(ot=(r=ot)||n.memoizedState!==null,$n(t,e,n),ot=r):$n(t,e,n);break;default:$n(t,e,n)}}function Bm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new YI),e.forEach(function(r){var i=l1.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Wt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:We=l.stateNode,Kt=!1;break e;case 3:We=l.stateNode.containerInfo,Kt=!0;break e;case 4:We=l.stateNode.containerInfo,Kt=!0;break e}l=l.return}if(We===null)throw Error(M(160));Nv(s,o,i),We=null,Kt=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(h){Pe(i,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Dv(e,t),e=e.sibling}function Dv(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Wt(e,t),tn(t),r&4){try{Js(3,t,t.return),su(3,t)}catch(N){Pe(t,t.return,N)}try{Js(5,t,t.return)}catch(N){Pe(t,t.return,N)}}break;case 1:Wt(e,t),tn(t),r&512&&n!==null&&Pi(n,n.return);break;case 5:if(Wt(e,t),tn(t),r&512&&n!==null&&Pi(n,n.return),t.flags&32){var i=t.stateNode;try{oo(i,"")}catch(N){Pe(t,t.return,N)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&e_(i,s),Kc(l,o);var h=Kc(l,s);for(o=0;o<u.length;o+=2){var f=u[o],m=u[o+1];f==="style"?s_(i,m):f==="dangerouslySetInnerHTML"?r_(i,m):f==="children"?oo(i,m):ad(i,f,m,h)}switch(l){case"input":$c(i,s);break;case"textarea":t_(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var I=s.value;I!=null?bi(i,!!s.multiple,I,!1):p!==!!s.multiple&&(s.defaultValue!=null?bi(i,!!s.multiple,s.defaultValue,!0):bi(i,!!s.multiple,s.multiple?[]:"",!1))}i[go]=s}catch(N){Pe(t,t.return,N)}}break;case 6:if(Wt(e,t),tn(t),r&4){if(t.stateNode===null)throw Error(M(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(N){Pe(t,t.return,N)}}break;case 3:if(Wt(e,t),tn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{co(e.containerInfo)}catch(N){Pe(t,t.return,N)}break;case 4:Wt(e,t),tn(t);break;case 13:Wt(e,t),tn(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Ud=Ne())),r&4&&Bm(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(ot=(h=ot)||f,Wt(e,t),ot=h):Wt(e,t),tn(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!f&&t.mode&1)for(H=t,f=t.child;f!==null;){for(m=H=f;H!==null;){switch(p=H,I=p.child,p.tag){case 0:case 11:case 14:case 15:Js(4,p,p.return);break;case 1:Pi(p,p.return);var k=p.stateNode;if(typeof k.componentWillUnmount=="function"){r=p,n=p.return;try{e=r,k.props=e.memoizedProps,k.state=e.memoizedState,k.componentWillUnmount()}catch(N){Pe(r,n,N)}}break;case 5:Pi(p,p.return);break;case 22:if(p.memoizedState!==null){Hm(m);continue}}I!==null?(I.return=p,H=I):Hm(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{i=m.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=i_("display",o))}catch(N){Pe(t,t.return,N)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=h?"":m.memoizedProps}catch(N){Pe(t,t.return,N)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Wt(e,t),tn(t),r&4&&Bm(t);break;case 21:break;default:Wt(e,t),tn(t)}}function tn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(xv(n)){var r=n;break e}n=n.return}throw Error(M(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(oo(i,""),r.flags&=-33);var s=zm(t);Sh(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=zm(t);Ih(t,l,o);break;default:throw Error(M(161))}}catch(u){Pe(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function e1(t,e,n){H=t,bv(t)}function bv(t,e,n){for(var r=(t.mode&1)!==0;H!==null;){var i=H,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ka;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||ot;l=ka;var h=ot;if(ka=o,(ot=u)&&!h)for(H=i;H!==null;)o=H,u=o.child,o.tag===22&&o.memoizedState!==null?qm(i):u!==null?(u.return=o,H=u):qm(i);for(;s!==null;)H=s,bv(s),s=s.sibling;H=i,ka=l,ot=h}$m(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,H=s):$m(t)}}function $m(t){for(;H!==null;){var e=H;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ot||su(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!ot)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Gt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Rm(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Rm(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var f=h.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&co(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(M(163))}ot||e.flags&512&&Th(e)}catch(p){Pe(e,e.return,p)}}if(e===t){H=null;break}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}}function Hm(t){for(;H!==null;){var e=H;if(e===t){H=null;break}var n=e.sibling;if(n!==null){n.return=e.return,H=n;break}H=e.return}}function qm(t){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{su(4,e)}catch(u){Pe(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Pe(e,i,u)}}var s=e.return;try{Th(e)}catch(u){Pe(e,s,u)}break;case 5:var o=e.return;try{Th(e)}catch(u){Pe(e,o,u)}}}catch(u){Pe(e,e.return,u)}if(e===t){H=null;break}var l=e.sibling;if(l!==null){l.return=e.return,H=l;break}H=e.return}}var t1=Math.ceil,Cl=Fn.ReactCurrentDispatcher,Fd=Fn.ReactCurrentOwner,jt=Fn.ReactCurrentBatchConfig,oe=0,$e=null,be=null,Qe=0,Rt=0,xi=Cr(0),je=0,To=null,Xr=0,ou=0,jd=0,Xs=null,_t=null,Ud=0,Xi=1/0,wn=null,Rl=!1,Ah=null,ar=null,Pa=!1,er=null,kl=0,Ys=0,Ch=null,Wa=-1,Ga=0;function ft(){return oe&6?Ne():Wa!==-1?Wa:Wa=Ne()}function lr(t){return t.mode&1?oe&2&&Qe!==0?Qe&-Qe:FI.transition!==null?(Ga===0&&(Ga=y_()),Ga):(t=he,t!==0||(t=window.event,t=t===void 0?16:S_(t.type)),t):1}function Yt(t,e,n,r){if(50<Ys)throw Ys=0,Ch=null,Error(M(185));Oo(t,n,r),(!(oe&2)||t!==$e)&&(t===$e&&(!(oe&2)&&(ou|=n),je===4&&Kn(t,Qe)),It(t,r),n===1&&oe===0&&!(e.mode&1)&&(Xi=Ne()+500,nu&&Rr()))}function It(t,e){var n=t.callbackNode;FT(t,e);var r=hl(t,t===$e?Qe:0);if(r===0)n!==null&&em(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&em(n),e===1)t.tag===0?MI(Wm.bind(null,t)):$_(Wm.bind(null,t)),bI(function(){!(oe&6)&&Rr()}),n=null;else{switch(__(r)){case 1:n=dd;break;case 4:n=m_;break;case 16:n=cl;break;case 536870912:n=g_;break;default:n=cl}n=zv(n,Vv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Vv(t,e){if(Wa=-1,Ga=0,oe&6)throw Error(M(327));var n=t.callbackNode;if(Fi()&&t.callbackNode!==n)return null;var r=hl(t,t===$e?Qe:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Pl(t,r);else{e=r;var i=oe;oe|=2;var s=Lv();($e!==t||Qe!==e)&&(wn=null,Xi=Ne()+500,Br(t,e));do try{i1();break}catch(l){Ov(t,l)}while(!0);Ad(),Cl.current=s,oe=i,be!==null?e=0:($e=null,Qe=0,e=je)}if(e!==0){if(e===2&&(i=Zc(t),i!==0&&(r=i,e=Rh(t,i))),e===1)throw n=To,Br(t,0),Kn(t,r),It(t,Ne()),n;if(e===6)Kn(t,r);else{if(i=t.current.alternate,!(r&30)&&!n1(i)&&(e=Pl(t,r),e===2&&(s=Zc(t),s!==0&&(r=s,e=Rh(t,s))),e===1))throw n=To,Br(t,0),Kn(t,r),It(t,Ne()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(M(345));case 2:Lr(t,_t,wn);break;case 3:if(Kn(t,r),(r&130023424)===r&&(e=Ud+500-Ne(),10<e)){if(hl(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){ft(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=ah(Lr.bind(null,t,_t,wn),e);break}Lr(t,_t,wn);break;case 4:if(Kn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Xt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Ne()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*t1(r/1960))-r,10<r){t.timeoutHandle=ah(Lr.bind(null,t,_t,wn),r);break}Lr(t,_t,wn);break;case 5:Lr(t,_t,wn);break;default:throw Error(M(329))}}}return It(t,Ne()),t.callbackNode===n?Vv.bind(null,t):null}function Rh(t,e){var n=Xs;return t.current.memoizedState.isDehydrated&&(Br(t,e).flags|=256),t=Pl(t,e),t!==2&&(e=_t,_t=n,e!==null&&kh(e)),t}function kh(t){_t===null?_t=t:_t.push.apply(_t,t)}function n1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Zt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Kn(t,e){for(e&=~jd,e&=~ou,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Xt(e),r=1<<n;t[n]=-1,e&=~r}}function Wm(t){if(oe&6)throw Error(M(327));Fi();var e=hl(t,0);if(!(e&1))return It(t,Ne()),null;var n=Pl(t,e);if(t.tag!==0&&n===2){var r=Zc(t);r!==0&&(e=r,n=Rh(t,r))}if(n===1)throw n=To,Br(t,0),Kn(t,e),It(t,Ne()),n;if(n===6)throw Error(M(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Lr(t,_t,wn),It(t,Ne()),null}function zd(t,e){var n=oe;oe|=1;try{return t(e)}finally{oe=n,oe===0&&(Xi=Ne()+500,nu&&Rr())}}function Yr(t){er!==null&&er.tag===0&&!(oe&6)&&Fi();var e=oe;oe|=1;var n=jt.transition,r=he;try{if(jt.transition=null,he=1,t)return t()}finally{he=r,jt.transition=n,oe=e,!(oe&6)&&Rr()}}function Bd(){Rt=xi.current,we(xi)}function Br(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,DI(n)),be!==null)for(n=be.return;n!==null;){var r=n;switch(Td(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&gl();break;case 3:Qi(),we(Et),we(lt),Nd();break;case 5:xd(r);break;case 4:Qi();break;case 13:we(Se);break;case 19:we(Se);break;case 10:Cd(r.type._context);break;case 22:case 23:Bd()}n=n.return}if($e=t,be=t=ur(t.current,null),Qe=Rt=e,je=0,To=null,jd=ou=Xr=0,_t=Xs=null,jr!==null){for(e=0;e<jr.length;e++)if(n=jr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}jr=null}return t}function Ov(t,e){do{var n=be;try{if(Ad(),$a.current=Al,Sl){for(var r=Ae.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Sl=!1}if(Jr=0,Be=Fe=Ae=null,Qs=!1,vo=0,Fd.current=null,n===null||n.return===null){je=1,To=e,be=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=Qe,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,f=l,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var p=f.alternate;p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var I=bm(o);if(I!==null){I.flags&=-257,Vm(I,o,l,s,e),I.mode&1&&Dm(s,h,e),e=I,u=h;var k=e.updateQueue;if(k===null){var N=new Set;N.add(u),e.updateQueue=N}else k.add(u);break e}else{if(!(e&1)){Dm(s,h,e),$d();break e}u=Error(M(426))}}else if(Ee&&l.mode&1){var V=bm(o);if(V!==null){!(V.flags&65536)&&(V.flags|=256),Vm(V,o,l,s,e),Id(Ji(u,l));break e}}s=u=Ji(u,l),je!==4&&(je=2),Xs===null?Xs=[s]:Xs.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var S=_v(s,u,e);Cm(s,S);break e;case 1:l=u;var v=s.type,A=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||A!==null&&typeof A.componentDidCatch=="function"&&(ar===null||!ar.has(A)))){s.flags|=65536,e&=-e,s.lanes|=e;var b=vv(s,l,e);Cm(s,b);break e}}s=s.return}while(s!==null)}Fv(n)}catch(j){e=j,be===n&&n!==null&&(be=n=n.return);continue}break}while(!0)}function Lv(){var t=Cl.current;return Cl.current=Al,t===null?Al:t}function $d(){(je===0||je===3||je===2)&&(je=4),$e===null||!(Xr&268435455)&&!(ou&268435455)||Kn($e,Qe)}function Pl(t,e){var n=oe;oe|=2;var r=Lv();($e!==t||Qe!==e)&&(wn=null,Br(t,e));do try{r1();break}catch(i){Ov(t,i)}while(!0);if(Ad(),oe=n,Cl.current=r,be!==null)throw Error(M(261));return $e=null,Qe=0,je}function r1(){for(;be!==null;)Mv(be)}function i1(){for(;be!==null&&!PT();)Mv(be)}function Mv(t){var e=Uv(t.alternate,t,Rt);t.memoizedProps=t.pendingProps,e===null?Fv(t):be=e,Fd.current=null}function Fv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=XI(n,e),n!==null){n.flags&=32767,be=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{je=6,be=null;return}}else if(n=JI(n,e,Rt),n!==null){be=n;return}if(e=e.sibling,e!==null){be=e;return}be=e=t}while(e!==null);je===0&&(je=5)}function Lr(t,e,n){var r=he,i=jt.transition;try{jt.transition=null,he=1,s1(t,e,n,r)}finally{jt.transition=i,he=r}return null}function s1(t,e,n,r){do Fi();while(er!==null);if(oe&6)throw Error(M(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(M(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(jT(t,s),t===$e&&(be=$e=null,Qe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Pa||(Pa=!0,zv(cl,function(){return Fi(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=jt.transition,jt.transition=null;var o=he;he=1;var l=oe;oe|=4,Fd.current=null,ZI(t,n),Dv(n,t),AI(sh),dl=!!ih,sh=ih=null,t.current=n,e1(n),xT(),oe=l,he=o,jt.transition=s}else t.current=n;if(Pa&&(Pa=!1,er=t,kl=i),s=t.pendingLanes,s===0&&(ar=null),bT(n.stateNode),It(t,Ne()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Rl)throw Rl=!1,t=Ah,Ah=null,t;return kl&1&&t.tag!==0&&Fi(),s=t.pendingLanes,s&1?t===Ch?Ys++:(Ys=0,Ch=t):Ys=0,Rr(),null}function Fi(){if(er!==null){var t=__(kl),e=jt.transition,n=he;try{if(jt.transition=null,he=16>t?16:t,er===null)var r=!1;else{if(t=er,er=null,kl=0,oe&6)throw Error(M(331));var i=oe;for(oe|=4,H=t.current;H!==null;){var s=H,o=s.child;if(H.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(H=h;H!==null;){var f=H;switch(f.tag){case 0:case 11:case 15:Js(8,f,s)}var m=f.child;if(m!==null)m.return=f,H=m;else for(;H!==null;){f=H;var p=f.sibling,I=f.return;if(Pv(f),f===h){H=null;break}if(p!==null){p.return=I,H=p;break}H=I}}}var k=s.alternate;if(k!==null){var N=k.child;if(N!==null){k.child=null;do{var V=N.sibling;N.sibling=null,N=V}while(N!==null)}}H=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,H=o;else e:for(;H!==null;){if(s=H,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Js(9,s,s.return)}var S=s.sibling;if(S!==null){S.return=s.return,H=S;break e}H=s.return}}var v=t.current;for(H=v;H!==null;){o=H;var A=o.child;if(o.subtreeFlags&2064&&A!==null)A.return=o,H=A;else e:for(o=v;H!==null;){if(l=H,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:su(9,l)}}catch(j){Pe(l,l.return,j)}if(l===o){H=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,H=b;break e}H=l.return}}if(oe=i,Rr(),on&&typeof on.onPostCommitFiberRoot=="function")try{on.onPostCommitFiberRoot(Xl,t)}catch{}r=!0}return r}finally{he=n,jt.transition=e}}return!1}function Gm(t,e,n){e=Ji(n,e),e=_v(t,e,1),t=or(t,e,1),e=ft(),t!==null&&(Oo(t,1,e),It(t,e))}function Pe(t,e,n){if(t.tag===3)Gm(t,t,n);else for(;e!==null;){if(e.tag===3){Gm(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ar===null||!ar.has(r))){t=Ji(n,t),t=vv(e,t,1),e=or(e,t,1),t=ft(),e!==null&&(Oo(e,1,t),It(e,t));break}}e=e.return}}function o1(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=ft(),t.pingedLanes|=t.suspendedLanes&n,$e===t&&(Qe&n)===n&&(je===4||je===3&&(Qe&130023424)===Qe&&500>Ne()-Ud?Br(t,0):jd|=n),It(t,e)}function jv(t,e){e===0&&(t.mode&1?(e=va,va<<=1,!(va&130023424)&&(va=4194304)):e=1);var n=ft();t=xn(t,e),t!==null&&(Oo(t,e,n),It(t,n))}function a1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),jv(t,n)}function l1(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(M(314))}r!==null&&r.delete(e),jv(t,n)}var Uv;Uv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Et.current)wt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return wt=!1,QI(t,e,n);wt=!!(t.flags&131072)}else wt=!1,Ee&&e.flags&1048576&&H_(e,vl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;qa(t,e),t=e.pendingProps;var i=Wi(e,lt.current);Mi(e,n),i=bd(null,e,r,t,i,n);var s=Vd();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Tt(r)?(s=!0,yl(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,kd(e),i.updater=iu,e.stateNode=i,i._reactInternals=e,ph(e,r,t,n),e=yh(null,e,r,!0,s,n)):(e.tag=0,Ee&&s&&Ed(e),dt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(qa(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=c1(r),t=Gt(r,t),i){case 0:e=gh(null,e,r,t,n);break e;case 1:e=Mm(null,e,r,t,n);break e;case 11:e=Om(null,e,r,t,n);break e;case 14:e=Lm(null,e,r,Gt(r.type,t),n);break e}throw Error(M(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Gt(r,i),gh(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Gt(r,i),Mm(t,e,r,i,n);case 3:e:{if(Iv(e),t===null)throw Error(M(387));r=e.pendingProps,s=e.memoizedState,i=s.element,J_(t,e),Tl(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Ji(Error(M(423)),e),e=Fm(t,e,r,n,i);break e}else if(r!==i){i=Ji(Error(M(424)),e),e=Fm(t,e,r,n,i);break e}else for(kt=sr(e.stateNode.containerInfo.firstChild),xt=e,Ee=!0,Qt=null,n=K_(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Gi(),r===i){e=Nn(t,e,n);break e}dt(t,e,r,n)}e=e.child}return e;case 5:return X_(e),t===null&&hh(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,oh(r,i)?o=null:s!==null&&oh(r,s)&&(e.flags|=32),Tv(t,e),dt(t,e,o,n),e.child;case 6:return t===null&&hh(e),null;case 13:return Sv(t,e,n);case 4:return Pd(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Ki(e,null,r,n):dt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Gt(r,i),Om(t,e,r,i,n);case 7:return dt(t,e,e.pendingProps,n),e.child;case 8:return dt(t,e,e.pendingProps.children,n),e.child;case 12:return dt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,me(wl,r._currentValue),r._currentValue=o,s!==null)if(Zt(s.value,o)){if(s.children===i.children&&!Et.current){e=Nn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Cn(-1,n&-n),u.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var f=h.pending;f===null?u.next=u:(u.next=f.next,f.next=u),h.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),dh(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(M(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),dh(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}dt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Mi(e,n),i=Ut(i),r=r(i),e.flags|=1,dt(t,e,r,n),e.child;case 14:return r=e.type,i=Gt(r,e.pendingProps),i=Gt(r.type,i),Lm(t,e,r,i,n);case 15:return wv(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Gt(r,i),qa(t,e),e.tag=1,Tt(r)?(t=!0,yl(e)):t=!1,Mi(e,n),yv(e,r,i),ph(e,r,i,n),yh(null,e,r,!0,t,n);case 19:return Av(t,e,n);case 22:return Ev(t,e,n)}throw Error(M(156,e.tag))};function zv(t,e){return p_(t,e)}function u1(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ft(t,e,n,r){return new u1(t,e,n,r)}function Hd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function c1(t){if(typeof t=="function")return Hd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ud)return 11;if(t===cd)return 14}return 2}function ur(t,e){var n=t.alternate;return n===null?(n=Ft(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ka(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Hd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case wi:return $r(n.children,i,s,e);case ld:o=8,i|=8;break;case Fc:return t=Ft(12,n,e,i|2),t.elementType=Fc,t.lanes=s,t;case jc:return t=Ft(13,n,e,i),t.elementType=jc,t.lanes=s,t;case Uc:return t=Ft(19,n,e,i),t.elementType=Uc,t.lanes=s,t;case Xy:return au(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Qy:o=10;break e;case Jy:o=9;break e;case ud:o=11;break e;case cd:o=14;break e;case qn:o=16,r=null;break e}throw Error(M(130,t==null?t:typeof t,""))}return e=Ft(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function $r(t,e,n,r){return t=Ft(7,t,r,e),t.lanes=n,t}function au(t,e,n,r){return t=Ft(22,t,r,e),t.elementType=Xy,t.lanes=n,t.stateNode={isHidden:!1},t}function Ic(t,e,n){return t=Ft(6,t,null,e),t.lanes=n,t}function Sc(t,e,n){return e=Ft(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function h1(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ic(0),this.expirationTimes=ic(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ic(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function qd(t,e,n,r,i,s,o,l,u){return t=new h1(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Ft(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},kd(s),t}function d1(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:vi,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Bv(t){if(!t)return gr;t=t._reactInternals;e:{if(ii(t)!==t||t.tag!==1)throw Error(M(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Tt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(M(171))}if(t.tag===1){var n=t.type;if(Tt(n))return B_(t,n,e)}return e}function $v(t,e,n,r,i,s,o,l,u){return t=qd(n,r,!0,t,i,s,o,l,u),t.context=Bv(null),n=t.current,r=ft(),i=lr(n),s=Cn(r,i),s.callback=e??null,or(n,s,i),t.current.lanes=i,Oo(t,i,r),It(t,r),t}function lu(t,e,n,r){var i=e.current,s=ft(),o=lr(i);return n=Bv(n),e.context===null?e.context=n:e.pendingContext=n,e=Cn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=or(i,e,o),t!==null&&(Yt(t,i,o,s),Ba(t,i,o)),o}function xl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Km(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Wd(t,e){Km(t,e),(t=t.alternate)&&Km(t,e)}function f1(){return null}var Hv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Gd(t){this._internalRoot=t}uu.prototype.render=Gd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(M(409));lu(t,e,null,null)};uu.prototype.unmount=Gd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Yr(function(){lu(null,t,null,null)}),e[Pn]=null}};function uu(t){this._internalRoot=t}uu.prototype.unstable_scheduleHydration=function(t){if(t){var e=E_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Gn.length&&e!==0&&e<Gn[n].priority;n++);Gn.splice(n,0,t),n===0&&I_(t)}};function Kd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function cu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Qm(){}function p1(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var h=xl(o);s.call(h)}}var o=$v(e,r,t,0,null,!1,!1,"",Qm);return t._reactRootContainer=o,t[Pn]=o.current,po(t.nodeType===8?t.parentNode:t),Yr(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var h=xl(u);l.call(h)}}var u=qd(t,0,!1,null,null,!1,!1,"",Qm);return t._reactRootContainer=u,t[Pn]=u.current,po(t.nodeType===8?t.parentNode:t),Yr(function(){lu(e,u,n,r)}),u}function hu(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=xl(o);l.call(u)}}lu(e,o,t,i)}else o=p1(n,e,t,i,r);return xl(o)}v_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Fs(e.pendingLanes);n!==0&&(fd(e,n|1),It(e,Ne()),!(oe&6)&&(Xi=Ne()+500,Rr()))}break;case 13:Yr(function(){var r=xn(t,1);if(r!==null){var i=ft();Yt(r,t,1,i)}}),Wd(t,1)}};pd=function(t){if(t.tag===13){var e=xn(t,134217728);if(e!==null){var n=ft();Yt(e,t,134217728,n)}Wd(t,134217728)}};w_=function(t){if(t.tag===13){var e=lr(t),n=xn(t,e);if(n!==null){var r=ft();Yt(n,t,e,r)}Wd(t,e)}};E_=function(){return he};T_=function(t,e){var n=he;try{return he=t,e()}finally{he=n}};Jc=function(t,e,n){switch(e){case"input":if($c(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=tu(r);if(!i)throw Error(M(90));Zy(r),$c(r,i)}}}break;case"textarea":t_(t,n);break;case"select":e=n.value,e!=null&&bi(t,!!n.multiple,e,!1)}};l_=zd;u_=Yr;var m1={usingClientEntryPoint:!1,Events:[Mo,Si,tu,o_,a_,zd]},Os={findFiberByHostInstance:Fr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},g1={bundleType:Os.bundleType,version:Os.version,rendererPackageName:Os.rendererPackageName,rendererConfig:Os.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Fn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=d_(t),t===null?null:t.stateNode},findFiberByHostInstance:Os.findFiberByHostInstance||f1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var xa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!xa.isDisabled&&xa.supportsFiber)try{Xl=xa.inject(g1),on=xa}catch{}}Dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=m1;Dt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Kd(e))throw Error(M(200));return d1(t,e,null,n)};Dt.createRoot=function(t,e){if(!Kd(t))throw Error(M(299));var n=!1,r="",i=Hv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=qd(t,1,!1,null,null,n,!1,r,i),t[Pn]=e.current,po(t.nodeType===8?t.parentNode:t),new Gd(e)};Dt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(M(188)):(t=Object.keys(t).join(","),Error(M(268,t)));return t=d_(e),t=t===null?null:t.stateNode,t};Dt.flushSync=function(t){return Yr(t)};Dt.hydrate=function(t,e,n){if(!cu(e))throw Error(M(200));return hu(null,t,e,!0,n)};Dt.hydrateRoot=function(t,e,n){if(!Kd(t))throw Error(M(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Hv;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=$v(e,null,t,1,n??null,i,!1,s,o),t[Pn]=e.current,po(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new uu(e)};Dt.render=function(t,e,n){if(!cu(e))throw Error(M(200));return hu(null,t,e,!1,n)};Dt.unmountComponentAtNode=function(t){if(!cu(t))throw Error(M(40));return t._reactRootContainer?(Yr(function(){hu(null,null,t,!1,function(){t._reactRootContainer=null,t[Pn]=null})}),!0):!1};Dt.unstable_batchedUpdates=zd;Dt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!cu(n))throw Error(M(200));if(t==null||t._reactInternals===void 0)throw Error(M(38));return hu(t,e,n,!1,r)};Dt.version="18.3.1-next-f1338f8080-20240426";function qv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qv)}catch(t){console.error(t)}}qv(),qy.exports=Dt;var y1=qy.exports,Wv,Jm=y1;Wv=Jm.createRoot,Jm.hydrateRoot;const _1=()=>{};var Xm={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gv=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},v1=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Kv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,h=u?t[i+2]:0,f=s>>2,m=(s&3)<<4|l>>4;let p=(l&15)<<2|h>>6,I=h&63;u||(I=64,o||(p=64)),r.push(n[f],n[m],n[p],n[I])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Gv(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):v1(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const h=i<t.length?n[t.charAt(i)]:64;++i;const m=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||h==null||m==null)throw new w1;const p=s<<2|l>>4;if(r.push(p),h!==64){const I=l<<4&240|h>>2;if(r.push(I),m!==64){const k=h<<6&192|m;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class w1 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const E1=function(t){const e=Gv(t);return Kv.encodeByteArray(e,!0)},Nl=function(t){return E1(t).replace(/\./g,"")},Qv=function(t){try{return Kv.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T1(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I1=()=>T1().__FIREBASE_DEFAULTS__,S1=()=>{if(typeof process>"u"||typeof Xm>"u")return;const t=Xm.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},A1=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Qv(t[1]);return e&&JSON.parse(e)},du=()=>{try{return _1()||I1()||S1()||A1()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Jv=t=>{var e,n;return(n=(e=du())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},C1=t=>{const e=Jv(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Xv=()=>{var t;return(t=du())===null||t===void 0?void 0:t.config},Yv=t=>{var e;return(e=du())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R1{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function as(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Zv(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k1(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Nl(JSON.stringify(n)),Nl(JSON.stringify(o)),""].join(".")}const Zs={};function P1(){const t={prod:[],emulator:[]};for(const e of Object.keys(Zs))Zs[e]?t.emulator.push(e):t.prod.push(e);return t}function x1(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Ym=!1;function e0(t,e){if(typeof window>"u"||typeof document>"u"||!as(window.location.host)||Zs[t]===e||Zs[t]||Ym)return;Zs[t]=e;function n(p){return`__firebase__banner__${p}`}const r="__firebase__banner",s=P1().prod.length>0;function o(){const p=document.getElementById(r);p&&p.remove()}function l(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function u(p,I){p.setAttribute("width","24"),p.setAttribute("id",I),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function h(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{Ym=!0,o()},p}function f(p,I){p.setAttribute("id",I),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function m(){const p=x1(r),I=n("text"),k=document.getElementById(I)||document.createElement("span"),N=n("learnmore"),V=document.getElementById(N)||document.createElement("a"),S=n("preprendIcon"),v=document.getElementById(S)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const A=p.element;l(A),f(V,N);const b=h();u(v,S),A.append(v,k,V,b),document.body.appendChild(A)}s?(k.innerText="Preview backend disconnected.",v.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(v.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",I)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function N1(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ut())}function D1(){var t;const e=(t=du())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function b1(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function V1(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function O1(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function L1(){const t=ut();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function M1(){return!D1()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function F1(){try{return typeof indexedDB=="object"}catch{return!1}}function j1(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U1="FirebaseError";class jn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=U1,Object.setPrototypeOf(this,jn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jo.prototype.create)}}class jo{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?z1(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new jn(i,l,r)}}function z1(t,e){return t.replace(B1,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const B1=/\{\$([^}]+)}/g;function $1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Zr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Zm(s)&&Zm(o)){if(!Zr(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Zm(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uo(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function H1(t,e){const n=new q1(t,e);return n.subscribe.bind(n)}class q1{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");W1(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Ac),i.error===void 0&&(i.error=Ac),i.complete===void 0&&(i.complete=Ac);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function W1(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ac(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(t){return t&&t._delegate?t._delegate:t}class ei{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G1{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new R1;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Q1(e))try{this.getOrInitializeService({instanceIdentifier:Mr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Mr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Mr){return this.instances.has(e)}getOptions(e=Mr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:K1(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Mr){return this.component?this.component.multipleInstances?e:Mr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function K1(t){return t===Mr?void 0:t}function Q1(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new G1(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ne;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ne||(ne={}));const X1={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},Y1=ne.INFO,Z1={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},eS=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Z1[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Qd{constructor(e){this.name=e,this._logLevel=Y1,this._logHandler=eS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?X1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const tS=(t,e)=>e.some(n=>t instanceof n);let eg,tg;function nS(){return eg||(eg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function rS(){return tg||(tg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const t0=new WeakMap,Ph=new WeakMap,n0=new WeakMap,Cc=new WeakMap,Jd=new WeakMap;function iS(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(cr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&t0.set(n,t)}).catch(()=>{}),Jd.set(e,t),e}function sS(t){if(Ph.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Ph.set(t,e)}let xh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ph.get(t);if(e==="objectStoreNames")return t.objectStoreNames||n0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return cr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function oS(t){xh=t(xh)}function aS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Rc(this),e,...n);return n0.set(r,e.sort?e.sort():[e]),cr(r)}:rS().includes(t)?function(...e){return t.apply(Rc(this),e),cr(t0.get(this))}:function(...e){return cr(t.apply(Rc(this),e))}}function lS(t){return typeof t=="function"?aS(t):(t instanceof IDBTransaction&&sS(t),tS(t,nS())?new Proxy(t,xh):t)}function cr(t){if(t instanceof IDBRequest)return iS(t);if(Cc.has(t))return Cc.get(t);const e=lS(t);return e!==t&&(Cc.set(t,e),Jd.set(e,t)),e}const Rc=t=>Jd.get(t);function uS(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=cr(o);return r&&o.addEventListener("upgradeneeded",u=>{r(cr(o.result),u.oldVersion,u.newVersion,cr(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const cS=["get","getKey","getAll","getAllKeys","count"],hS=["put","add","delete","clear"],kc=new Map;function ng(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(kc.get(e))return kc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=hS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||cS.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),i&&u.done]))[0]};return kc.set(e,s),s}oS(t=>({...t,get:(e,n,r)=>ng(e,n)||t.get(e,n,r),has:(e,n)=>!!ng(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(fS(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function fS(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Nh="@firebase/app",rg="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn=new Qd("@firebase/app"),pS="@firebase/app-compat",mS="@firebase/analytics-compat",gS="@firebase/analytics",yS="@firebase/app-check-compat",_S="@firebase/app-check",vS="@firebase/auth",wS="@firebase/auth-compat",ES="@firebase/database",TS="@firebase/data-connect",IS="@firebase/database-compat",SS="@firebase/functions",AS="@firebase/functions-compat",CS="@firebase/installations",RS="@firebase/installations-compat",kS="@firebase/messaging",PS="@firebase/messaging-compat",xS="@firebase/performance",NS="@firebase/performance-compat",DS="@firebase/remote-config",bS="@firebase/remote-config-compat",VS="@firebase/storage",OS="@firebase/storage-compat",LS="@firebase/firestore",MS="@firebase/ai",FS="@firebase/firestore-compat",jS="firebase",US="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh="[DEFAULT]",zS={[Nh]:"fire-core",[pS]:"fire-core-compat",[gS]:"fire-analytics",[mS]:"fire-analytics-compat",[_S]:"fire-app-check",[yS]:"fire-app-check-compat",[vS]:"fire-auth",[wS]:"fire-auth-compat",[ES]:"fire-rtdb",[TS]:"fire-data-connect",[IS]:"fire-rtdb-compat",[SS]:"fire-fn",[AS]:"fire-fn-compat",[CS]:"fire-iid",[RS]:"fire-iid-compat",[kS]:"fire-fcm",[PS]:"fire-fcm-compat",[xS]:"fire-perf",[NS]:"fire-perf-compat",[DS]:"fire-rc",[bS]:"fire-rc-compat",[VS]:"fire-gcs",[OS]:"fire-gcs-compat",[LS]:"fire-fst",[FS]:"fire-fst-compat",[MS]:"fire-vertex","fire-js":"fire-js",[jS]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl=new Map,BS=new Map,bh=new Map;function ig(t,e){try{t.container.addComponent(e)}catch(n){Dn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Yi(t){const e=t.name;if(bh.has(e))return Dn.debug(`There were multiple attempts to register component ${e}.`),!1;bh.set(e,t);for(const n of Dl.values())ig(n,t);for(const n of BS.values())ig(n,t);return!0}function Xd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Lt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $S={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},hr=new jo("app","Firebase",$S);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HS{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ei("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw hr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls=US;function r0(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Dh,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw hr.create("bad-app-name",{appName:String(i)});if(n||(n=Xv()),!n)throw hr.create("no-options");const s=Dl.get(i);if(s){if(Zr(n,s.options)&&Zr(r,s.config))return s;throw hr.create("duplicate-app",{appName:i})}const o=new J1(i);for(const u of bh.values())o.addComponent(u);const l=new HS(n,r,o);return Dl.set(i,l),l}function i0(t=Dh){const e=Dl.get(t);if(!e&&t===Dh&&Xv())return r0();if(!e)throw hr.create("no-app",{appName:t});return e}function dr(t,e,n){var r;let i=(r=zS[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Dn.warn(l.join(" "));return}Yi(new ei(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qS="firebase-heartbeat-database",WS=1,Io="firebase-heartbeat-store";let Pc=null;function s0(){return Pc||(Pc=uS(qS,WS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Io)}catch(n){console.warn(n)}}}}).catch(t=>{throw hr.create("idb-open",{originalErrorMessage:t.message})})),Pc}async function GS(t){try{const n=(await s0()).transaction(Io),r=await n.objectStore(Io).get(o0(t));return await n.done,r}catch(e){if(e instanceof jn)Dn.warn(e.message);else{const n=hr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Dn.warn(n.message)}}}async function sg(t,e){try{const r=(await s0()).transaction(Io,"readwrite");await r.objectStore(Io).put(e,o0(t)),await r.done}catch(n){if(n instanceof jn)Dn.warn(n.message);else{const r=hr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Dn.warn(r.message)}}}function o0(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KS=1024,QS=30;class JS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new YS(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=og();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>QS){const o=ZS(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Dn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=og(),{heartbeatsToSend:r,unsentEntries:i}=XS(this._heartbeatsCache.heartbeats),s=Nl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Dn.warn(n),""}}}function og(){return new Date().toISOString().substring(0,10)}function XS(t,e=KS){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),ag(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),ag(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class YS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return F1()?j1().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await GS(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return sg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return sg(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ag(t){return Nl(JSON.stringify({version:2,heartbeats:t})).length}function ZS(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eA(t){Yi(new ei("platform-logger",e=>new dS(e),"PRIVATE")),Yi(new ei("heartbeat",e=>new JS(e),"PRIVATE")),dr(Nh,rg,t),dr(Nh,rg,"esm2017"),dr("fire-js","")}eA("");var tA="firebase",nA="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */dr(tA,nA,"app");function Yd(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function a0(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const rA=a0,l0=new jo("auth","Firebase",a0());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl=new Qd("@firebase/auth");function iA(t,...e){bl.logLevel<=ne.WARN&&bl.warn(`Auth (${ls}): ${t}`,...e)}function Qa(t,...e){bl.logLevel<=ne.ERROR&&bl.error(`Auth (${ls}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(t,...e){throw Zd(t,...e)}function ln(t,...e){return Zd(t,...e)}function u0(t,e,n){const r=Object.assign(Object.assign({},rA()),{[e]:n});return new jo("auth","Firebase",r).create(e,{appName:t.name})}function Rn(t){return u0(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Zd(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return l0.create(t,...e)}function Q(t,e,...n){if(!t)throw Zd(e,...n)}function Sn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Qa(e),new Error(e)}function Vn(t,e){t||Sn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function sA(){return lg()==="http:"||lg()==="https:"}function lg(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(sA()||V1()||"connection"in navigator)?navigator.onLine:!0}function aA(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(e,n){this.shortDelay=e,this.longDelay=n,Vn(n>e,"Short delay should be less than long delay!"),this.isMobile=N1()||O1()}get(){return oA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(t,e){Vn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Sn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Sn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Sn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uA=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],cA=new zo(3e4,6e4);function Bo(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function us(t,e,n,r,i={}){return h0(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=Uo(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},s);return b1()||(h.referrerPolicy="no-referrer"),t.emulatorConfig&&as(t.emulatorConfig.host)&&(h.credentials="include"),c0.fetch()(await d0(t,t.config.apiHost,n,l),h)})}async function h0(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},lA),e);try{const i=new hA(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Na(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Na(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Na(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Na(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw u0(t,f,h);bn(t,f)}}catch(i){if(i instanceof jn)throw i;bn(t,"network-request-failed",{message:String(i)})}}async function tf(t,e,n,r,i={}){const s=await us(t,e,n,r,i);return"mfaPendingCredential"in s&&bn(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function d0(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?ef(t.config,i):`${t.config.apiScheme}://${i}`;return uA.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class hA{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(ln(this.auth,"network-request-failed")),cA.get())})}}function Na(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=ln(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dA(t,e){return us(t,"POST","/v1/accounts:delete",e)}async function Vl(t,e){return us(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function fA(t,e=!1){const n=Xe(t),r=await n.getIdToken(e),i=nf(r);Q(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:eo(xc(i.auth_time)),issuedAtTime:eo(xc(i.iat)),expirationTime:eo(xc(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function xc(t){return Number(t)*1e3}function nf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Qa("JWT malformed, contained fewer than 3 sections"),null;try{const i=Qv(n);return i?JSON.parse(i):(Qa("Failed to decode base64 JWT payload"),null)}catch(i){return Qa("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function ug(t){const e=nf(t);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function So(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof jn&&pA(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function pA({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=eo(this.lastLoginAt),this.creationTime=eo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ol(t){var e;const n=t.auth,r=await t.getIdToken(),i=await So(t,Vl(n,{idToken:r}));Q(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?f0(s.providerUserInfo):[],l=yA(t.providerData,o),u=t.isAnonymous,h=!(t.email&&s.passwordHash)&&!(l!=null&&l.length),f=u?h:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new Oh(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(t,m)}async function gA(t){const e=Xe(t);await Ol(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function yA(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function f0(t){return t.map(e=>{var{providerId:n}=e,r=Yd(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _A(t,e){const n=await h0(t,{},async()=>{const r=Uo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await d0(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return t.emulatorConfig&&as(t.emulatorConfig.host)&&(u.credentials="include"),c0.fetch()(o,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function vA(t,e){return us(t,"POST","/v2/accounts:revokeToken",Bo(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ug(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const n=ug(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await _A(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new ji;return r&&(Q(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Q(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Q(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ji,this.toJSON())}_performRefresh(){return Sn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hn(t,e){Q(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Jt{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Yd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new mA(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Oh(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await So(this,this.stsTokenManager.getToken(this.auth,e));return Q(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return fA(this,e)}reload(){return gA(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Jt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ol(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Lt(this.auth.app))return Promise.reject(Rn(this.auth));const e=await this.getIdToken();return await So(this,dA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,l,u,h,f;const m=(r=n.displayName)!==null&&r!==void 0?r:void 0,p=(i=n.email)!==null&&i!==void 0?i:void 0,I=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,k=(o=n.photoURL)!==null&&o!==void 0?o:void 0,N=(l=n.tenantId)!==null&&l!==void 0?l:void 0,V=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,S=(h=n.createdAt)!==null&&h!==void 0?h:void 0,v=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:A,emailVerified:b,isAnonymous:j,providerData:F,stsTokenManager:w}=n;Q(A&&w,e,"internal-error");const y=ji.fromJSON(this.name,w);Q(typeof A=="string",e,"internal-error"),Hn(m,e.name),Hn(p,e.name),Q(typeof b=="boolean",e,"internal-error"),Q(typeof j=="boolean",e,"internal-error"),Hn(I,e.name),Hn(k,e.name),Hn(N,e.name),Hn(V,e.name),Hn(S,e.name),Hn(v,e.name);const _=new Jt({uid:A,auth:e,email:p,emailVerified:b,displayName:m,isAnonymous:j,photoURL:k,phoneNumber:I,tenantId:N,stsTokenManager:y,createdAt:S,lastLoginAt:v});return F&&Array.isArray(F)&&(_.providerData=F.map(E=>Object.assign({},E))),V&&(_._redirectEventId=V),_}static async _fromIdTokenResponse(e,n,r=!1){const i=new ji;i.updateFromServerResponse(n);const s=new Jt({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ol(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];Q(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?f0(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new ji;l.updateFromIdToken(r);const u=new Jt({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Oh(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cg=new Map;function An(t){Vn(t instanceof Function,"Expected a class definition");let e=cg.get(t);return e?(Vn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,cg.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p0{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}p0.type="NONE";const hg=p0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(t,e,n){return`firebase:${t}:${e}:${n}`}class Ui{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ja(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ja("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Vl(this.auth,{idToken:e}).catch(()=>{});return n?Jt._fromGetAccountInfoResponse(this.auth,n,e):null}return Jt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ui(An(hg),e,r);const i=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||An(hg);const o=Ja(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const f=await h._get(o);if(f){let m;if(typeof f=="string"){const p=await Vl(e,{idToken:f}).catch(()=>{});if(!p)break;m=await Jt._fromGetAccountInfoResponse(e,p,f)}else m=Jt._fromJSON(e,f);h!==s&&(l=m),s=h;break}}catch{}const u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Ui(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new Ui(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dg(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(_0(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(m0(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(w0(e))return"Blackberry";if(E0(e))return"Webos";if(g0(e))return"Safari";if((e.includes("chrome/")||y0(e))&&!e.includes("edge/"))return"Chrome";if(v0(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function m0(t=ut()){return/firefox\//i.test(t)}function g0(t=ut()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function y0(t=ut()){return/crios\//i.test(t)}function _0(t=ut()){return/iemobile/i.test(t)}function v0(t=ut()){return/android/i.test(t)}function w0(t=ut()){return/blackberry/i.test(t)}function E0(t=ut()){return/webos/i.test(t)}function rf(t=ut()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function wA(t=ut()){var e;return rf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function EA(){return L1()&&document.documentMode===10}function T0(t=ut()){return rf(t)||v0(t)||E0(t)||w0(t)||/windows phone/i.test(t)||_0(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I0(t,e=[]){let n;switch(t){case"Browser":n=dg(ut());break;case"Worker":n=`${dg(ut())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ls}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IA(t,e={}){return us(t,"GET","/v2/passwordPolicy",Bo(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SA=6;class AA{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:SA,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CA{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new fg(this),this.idTokenSubscription=new fg(this),this.beforeStateQueue=new TA(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=l0,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=An(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Ui.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Vl(this,{idToken:e}),r=await Jt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Lt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ol(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=aA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Lt(this.app))return Promise.reject(Rn(this));const n=e?Xe(e):null;return n&&Q(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Lt(this.app)?Promise.reject(Rn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Lt(this.app)?Promise.reject(Rn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(An(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await IA(this),n=new AA(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new jo("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await vA(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&An(e)||this._popupRedirectResolver;Q(n,this,"argument-error"),this.redirectPersistenceManager=await Ui.create(this,[An(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=I0(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;if(Lt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&iA(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function $o(t){return Xe(t)}class fg{constructor(e){this.auth=e,this.observer=null,this.addObserver=H1(n=>this.observer=n)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sf={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function RA(t){sf=t}function kA(t){return sf.loadJS(t)}function PA(){return sf.gapiScript}function xA(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NA(t,e){const n=Xd(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Zr(s,e??{}))return i;bn(i,"already-initialized")}return n.initialize({options:e})}function DA(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(An);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function bA(t,e,n){const r=$o(t);Q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=S0(e),{host:o,port:l}=VA(e),u=l===null?"":`:${l}`,h={url:`${s}//${o}${u}/`},f=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){Q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Q(Zr(h,r.config.emulator)&&Zr(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,as(o)?(Zv(`${s}//${o}${u}`),e0("Auth",!0)):OA()}function S0(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function VA(t){const e=S0(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:pg(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:pg(o)}}}function pg(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function OA(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A0{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Sn("not implemented")}_getIdTokenResponse(e){return Sn("not implemented")}_linkToIdToken(e,n){return Sn("not implemented")}_getReauthenticationResolver(e){return Sn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zi(t,e){return tf(t,"POST","/v1/accounts:signInWithIdp",Bo(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA="http://localhost";class ti extends A0{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ti(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):bn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Yd(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new ti(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return zi(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,zi(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,zi(e,n)}buildRequest(){const e={requestUri:LA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Uo(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C0{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho extends C0{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn extends Ho{constructor(){super("facebook.com")}static credential(e){return ti._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qn.credential(e.oauthAccessToken)}catch{return null}}}Qn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn extends Ho{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ti._fromParams({providerId:Jn.PROVIDER_ID,signInMethod:Jn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Jn.credentialFromTaggedObject(e)}static credentialFromError(e){return Jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Jn.credential(n,r)}catch{return null}}}Jn.GOOGLE_SIGN_IN_METHOD="google.com";Jn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn extends Ho{constructor(){super("github.com")}static credential(e){return ti._fromParams({providerId:Xn.PROVIDER_ID,signInMethod:Xn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xn.credentialFromTaggedObject(e)}static credentialFromError(e){return Xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xn.credential(e.oauthAccessToken)}catch{return null}}}Xn.GITHUB_SIGN_IN_METHOD="github.com";Xn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn extends Ho{constructor(){super("twitter.com")}static credential(e,n){return ti._fromParams({providerId:Yn.PROVIDER_ID,signInMethod:Yn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Yn.credentialFromTaggedObject(e)}static credentialFromError(e){return Yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Yn.credential(n,r)}catch{return null}}}Yn.TWITTER_SIGN_IN_METHOD="twitter.com";Yn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MA(t,e){return tf(t,"POST","/v1/accounts:signUp",Bo(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await Jt._fromIdTokenResponse(e,r,i),o=mg(r);return new On({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=mg(r);return new On({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function mg(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FA(t){var e;if(Lt(t.app))return Promise.reject(Rn(t));const n=$o(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new On({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await MA(n,{returnSecureToken:!0}),i=await On._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll extends jn{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ll.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new Ll(e,n,r,i)}}function R0(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ll._fromErrorAndOperation(t,s,e,r):s})}async function jA(t,e,n=!1){const r=await So(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return On._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UA(t,e,n=!1){const{auth:r}=t;if(Lt(r.app))return Promise.reject(Rn(r));const i="reauthenticate";try{const s=await So(t,R0(r,i,e,t),n);Q(s.idToken,r,"internal-error");const o=nf(s.idToken);Q(o,r,"internal-error");const{sub:l}=o;return Q(t.uid===l,r,"user-mismatch"),On._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&bn(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zA(t,e,n=!1){if(Lt(t.app))return Promise.reject(Rn(t));const r="signIn",i=await R0(t,r,e),s=await On._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BA(t,e){return tf(t,"POST","/v1/accounts:signInWithCustomToken",Bo(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $A(t,e){if(Lt(t.app))return Promise.reject(Rn(t));const n=$o(t),r=await BA(n,{token:e,returnSecureToken:!0}),i=await On._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(i.user),i}function HA(t,e,n,r){return Xe(t).onIdTokenChanged(e,n,r)}function qA(t,e,n){return Xe(t).beforeAuthStateChanged(e,n)}function WA(t,e,n,r){return Xe(t).onAuthStateChanged(e,n,r)}const Ml="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k0{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ml,"1"),this.storage.removeItem(Ml),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GA=1e3,KA=10;class P0 extends k0{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=T0(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);EA()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,KA):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},GA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}P0.type="LOCAL";const QA=P0;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x0 extends k0{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}x0.type="SESSION";const N0=x0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JA(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new fu(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async h=>h(n.origin,s)),u=await JA(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}fu.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function of(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const h=of("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(m){const p=m;if(p.data.eventId===h)switch(p.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(p.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(){return window}function YA(t){un().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D0(){return typeof un().WorkerGlobalScope<"u"&&typeof un().importScripts=="function"}async function ZA(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function eC(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function tC(){return D0()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b0="firebaseLocalStorageDb",nC=1,Fl="firebaseLocalStorage",V0="fbase_key";class qo{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function pu(t,e){return t.transaction([Fl],e?"readwrite":"readonly").objectStore(Fl)}function rC(){const t=indexedDB.deleteDatabase(b0);return new qo(t).toPromise()}function Lh(){const t=indexedDB.open(b0,nC);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Fl,{keyPath:V0})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Fl)?e(r):(r.close(),await rC(),e(await Lh()))})})}async function gg(t,e,n){const r=pu(t,!0).put({[V0]:e,value:n});return new qo(r).toPromise()}async function iC(t,e){const n=pu(t,!1).get(e),r=await new qo(n).toPromise();return r===void 0?null:r.value}function yg(t,e){const n=pu(t,!0).delete(e);return new qo(n).toPromise()}const sC=800,oC=3;class O0{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Lh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>oC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return D0()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=fu._getInstance(tC()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await ZA(),!this.activeServiceWorker)return;this.sender=new XA(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||eC()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Lh();return await gg(e,Ml,"1"),await yg(e,Ml),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>gg(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>iC(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>yg(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=pu(i,!1).getAll();return new qo(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),sC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}O0.type="LOCAL";const aC=O0;new zo(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lC(t,e){return e?An(e):(Q(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af extends A0{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return zi(e,this._buildIdpRequest())}_linkToIdToken(e,n){return zi(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return zi(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function uC(t){return zA(t.auth,new af(t),t.bypassAuthState)}function cC(t){const{auth:e,user:n}=t;return Q(n,e,"internal-error"),UA(n,new af(t),t.bypassAuthState)}async function hC(t){const{auth:e,user:n}=t;return Q(n,e,"internal-error"),jA(n,new af(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L0{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uC;case"linkViaPopup":case"linkViaRedirect":return hC;case"reauthViaPopup":case"reauthViaRedirect":return cC;default:bn(this.auth,"internal-error")}}resolve(e){Vn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Vn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dC=new zo(2e3,1e4);class Ni extends L0{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Ni.currentPopupAction&&Ni.currentPopupAction.cancel(),Ni.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){Vn(this.filter.length===1,"Popup operations only handle one event");const e=of();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ln(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ln(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ni.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ln(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,dC.get())};e()}}Ni.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fC="pendingRedirect",Xa=new Map;class pC extends L0{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Xa.get(this.auth._key());if(!e){try{const r=await mC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Xa.set(this.auth._key(),e)}return this.bypassAuthState||Xa.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function mC(t,e){const n=_C(e),r=yC(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function gC(t,e){Xa.set(t._key(),e)}function yC(t){return An(t._redirectPersistence)}function _C(t){return Ja(fC,t.config.apiKey,t.name)}async function vC(t,e,n=!1){if(Lt(t.app))return Promise.reject(Rn(t));const r=$o(t),i=lC(r,e),o=await new pC(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wC=10*60*1e3;class EC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!TC(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!M0(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(ln(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=wC&&this.cachedEventUids.clear(),this.cachedEventUids.has(_g(e))}saveEventToCache(e){this.cachedEventUids.add(_g(e)),this.lastProcessedEventTime=Date.now()}}function _g(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function M0({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function TC(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return M0(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IC(t,e={}){return us(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SC=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,AC=/^https?/;async function CC(t){if(t.config.emulator)return;const{authorizedDomains:e}=await IC(t);for(const n of e)try{if(RC(n))return}catch{}bn(t,"unauthorized-domain")}function RC(t){const e=Vh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!AC.test(n))return!1;if(SC.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kC=new zo(3e4,6e4);function vg(){const t=un().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function PC(t){return new Promise((e,n)=>{var r,i,s;function o(){vg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{vg(),n(ln(t,"network-request-failed"))},timeout:kC.get()})}if(!((i=(r=un().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=un().gapi)===null||s===void 0)&&s.load)o();else{const l=xA("iframefcb");return un()[l]=()=>{gapi.load?o():n(ln(t,"network-request-failed"))},kA(`${PA()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Ya=null,e})}let Ya=null;function xC(t){return Ya=Ya||PC(t),Ya}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NC=new zo(5e3,15e3),DC="__/auth/iframe",bC="emulator/auth/iframe",VC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},OC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function LC(t){const e=t.config;Q(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ef(e,bC):`https://${t.config.authDomain}/${DC}`,r={apiKey:e.apiKey,appName:t.name,v:ls},i=OC.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Uo(r).slice(1)}`}async function MC(t){const e=await xC(t),n=un().gapi;return Q(n,t,"internal-error"),e.open({where:document.body,url:LC(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:VC,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=ln(t,"network-request-failed"),l=un().setTimeout(()=>{s(o)},NC.get());function u(){un().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},jC=500,UC=600,zC="_blank",BC="http://localhost";class wg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function $C(t,e,n,r=jC,i=UC){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},FC),{width:r.toString(),height:i.toString(),top:s,left:o}),h=ut().toLowerCase();n&&(l=y0(h)?zC:n),m0(h)&&(e=e||BC,u.scrollbars="yes");const f=Object.entries(u).reduce((p,[I,k])=>`${p}${I}=${k},`,"");if(wA(h)&&l!=="_self")return HC(e||"",l),new wg(null);const m=window.open(e||"",l,f);Q(m,t,"popup-blocked");try{m.focus()}catch{}return new wg(m)}function HC(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qC="__/auth/handler",WC="emulator/auth/handler",GC=encodeURIComponent("fac");async function Eg(t,e,n,r,i,s){Q(t.config.authDomain,t,"auth-domain-config-required"),Q(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ls,eventId:i};if(e instanceof C0){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",$1(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof Ho){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),h=u?`#${GC}=${encodeURIComponent(u)}`:"";return`${KC(t)}?${Uo(l).slice(1)}${h}`}function KC({config:t}){return t.emulator?ef(t,WC):`https://${t.authDomain}/${qC}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc="webStorageSupport";class QC{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=N0,this._completeRedirectFn=vC,this._overrideRedirectResult=gC}async _openPopup(e,n,r,i){var s;Vn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Eg(e,n,r,Vh(),i);return $C(e,o,of())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Eg(e,n,r,Vh(),i);return YA(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Vn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await MC(e),r=new EC(e);return n.register("authEvent",i=>(Q(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Nc,{type:Nc},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Nc];o!==void 0&&n(!!o),bn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=CC(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return T0()||g0()||rf()}}const JC=QC;var Tg="@firebase/auth",Ig="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XC{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YC(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ZC(t){Yi(new ei("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:I0(t)},h=new CA(r,i,s,u);return DA(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Yi(new ei("auth-internal",e=>{const n=$o(e.getProvider("auth").getImmediate());return(r=>new XC(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),dr(Tg,Ig,YC(t)),dr(Tg,Ig,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eR=5*60,tR=Yv("authIdTokenMaxAge")||eR;let Sg=null;const nR=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>tR)return;const i=n==null?void 0:n.token;Sg!==i&&(Sg=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function rR(t=i0()){const e=Xd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=NA(t,{popupRedirectResolver:JC,persistence:[aC,QA,N0]}),r=Yv("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=nR(s.toString());qA(n,o,()=>o(n.currentUser)),HA(n,l=>o(l))}}const i=Jv("auth");return i&&bA(n,`http://${i}`),n}function iR(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}RA({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=ln("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",iR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ZC("Browser");var Ag=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fr,F0;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,y){function _(){}_.prototype=y.prototype,w.D=y.prototype,w.prototype=new _,w.prototype.constructor=w,w.C=function(E,R,P){for(var T=Array(arguments.length-2),He=2;He<arguments.length;He++)T[He-2]=arguments[He];return y.prototype[R].apply(E,T)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,y,_){_||(_=0);var E=Array(16);if(typeof y=="string")for(var R=0;16>R;++R)E[R]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(R=0;16>R;++R)E[R]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=w.g[0],_=w.g[1],R=w.g[2];var P=w.g[3],T=y+(P^_&(R^P))+E[0]+3614090360&4294967295;y=_+(T<<7&4294967295|T>>>25),T=P+(R^y&(_^R))+E[1]+3905402710&4294967295,P=y+(T<<12&4294967295|T>>>20),T=R+(_^P&(y^_))+E[2]+606105819&4294967295,R=P+(T<<17&4294967295|T>>>15),T=_+(y^R&(P^y))+E[3]+3250441966&4294967295,_=R+(T<<22&4294967295|T>>>10),T=y+(P^_&(R^P))+E[4]+4118548399&4294967295,y=_+(T<<7&4294967295|T>>>25),T=P+(R^y&(_^R))+E[5]+1200080426&4294967295,P=y+(T<<12&4294967295|T>>>20),T=R+(_^P&(y^_))+E[6]+2821735955&4294967295,R=P+(T<<17&4294967295|T>>>15),T=_+(y^R&(P^y))+E[7]+4249261313&4294967295,_=R+(T<<22&4294967295|T>>>10),T=y+(P^_&(R^P))+E[8]+1770035416&4294967295,y=_+(T<<7&4294967295|T>>>25),T=P+(R^y&(_^R))+E[9]+2336552879&4294967295,P=y+(T<<12&4294967295|T>>>20),T=R+(_^P&(y^_))+E[10]+4294925233&4294967295,R=P+(T<<17&4294967295|T>>>15),T=_+(y^R&(P^y))+E[11]+2304563134&4294967295,_=R+(T<<22&4294967295|T>>>10),T=y+(P^_&(R^P))+E[12]+1804603682&4294967295,y=_+(T<<7&4294967295|T>>>25),T=P+(R^y&(_^R))+E[13]+4254626195&4294967295,P=y+(T<<12&4294967295|T>>>20),T=R+(_^P&(y^_))+E[14]+2792965006&4294967295,R=P+(T<<17&4294967295|T>>>15),T=_+(y^R&(P^y))+E[15]+1236535329&4294967295,_=R+(T<<22&4294967295|T>>>10),T=y+(R^P&(_^R))+E[1]+4129170786&4294967295,y=_+(T<<5&4294967295|T>>>27),T=P+(_^R&(y^_))+E[6]+3225465664&4294967295,P=y+(T<<9&4294967295|T>>>23),T=R+(y^_&(P^y))+E[11]+643717713&4294967295,R=P+(T<<14&4294967295|T>>>18),T=_+(P^y&(R^P))+E[0]+3921069994&4294967295,_=R+(T<<20&4294967295|T>>>12),T=y+(R^P&(_^R))+E[5]+3593408605&4294967295,y=_+(T<<5&4294967295|T>>>27),T=P+(_^R&(y^_))+E[10]+38016083&4294967295,P=y+(T<<9&4294967295|T>>>23),T=R+(y^_&(P^y))+E[15]+3634488961&4294967295,R=P+(T<<14&4294967295|T>>>18),T=_+(P^y&(R^P))+E[4]+3889429448&4294967295,_=R+(T<<20&4294967295|T>>>12),T=y+(R^P&(_^R))+E[9]+568446438&4294967295,y=_+(T<<5&4294967295|T>>>27),T=P+(_^R&(y^_))+E[14]+3275163606&4294967295,P=y+(T<<9&4294967295|T>>>23),T=R+(y^_&(P^y))+E[3]+4107603335&4294967295,R=P+(T<<14&4294967295|T>>>18),T=_+(P^y&(R^P))+E[8]+1163531501&4294967295,_=R+(T<<20&4294967295|T>>>12),T=y+(R^P&(_^R))+E[13]+2850285829&4294967295,y=_+(T<<5&4294967295|T>>>27),T=P+(_^R&(y^_))+E[2]+4243563512&4294967295,P=y+(T<<9&4294967295|T>>>23),T=R+(y^_&(P^y))+E[7]+1735328473&4294967295,R=P+(T<<14&4294967295|T>>>18),T=_+(P^y&(R^P))+E[12]+2368359562&4294967295,_=R+(T<<20&4294967295|T>>>12),T=y+(_^R^P)+E[5]+4294588738&4294967295,y=_+(T<<4&4294967295|T>>>28),T=P+(y^_^R)+E[8]+2272392833&4294967295,P=y+(T<<11&4294967295|T>>>21),T=R+(P^y^_)+E[11]+1839030562&4294967295,R=P+(T<<16&4294967295|T>>>16),T=_+(R^P^y)+E[14]+4259657740&4294967295,_=R+(T<<23&4294967295|T>>>9),T=y+(_^R^P)+E[1]+2763975236&4294967295,y=_+(T<<4&4294967295|T>>>28),T=P+(y^_^R)+E[4]+1272893353&4294967295,P=y+(T<<11&4294967295|T>>>21),T=R+(P^y^_)+E[7]+4139469664&4294967295,R=P+(T<<16&4294967295|T>>>16),T=_+(R^P^y)+E[10]+3200236656&4294967295,_=R+(T<<23&4294967295|T>>>9),T=y+(_^R^P)+E[13]+681279174&4294967295,y=_+(T<<4&4294967295|T>>>28),T=P+(y^_^R)+E[0]+3936430074&4294967295,P=y+(T<<11&4294967295|T>>>21),T=R+(P^y^_)+E[3]+3572445317&4294967295,R=P+(T<<16&4294967295|T>>>16),T=_+(R^P^y)+E[6]+76029189&4294967295,_=R+(T<<23&4294967295|T>>>9),T=y+(_^R^P)+E[9]+3654602809&4294967295,y=_+(T<<4&4294967295|T>>>28),T=P+(y^_^R)+E[12]+3873151461&4294967295,P=y+(T<<11&4294967295|T>>>21),T=R+(P^y^_)+E[15]+530742520&4294967295,R=P+(T<<16&4294967295|T>>>16),T=_+(R^P^y)+E[2]+3299628645&4294967295,_=R+(T<<23&4294967295|T>>>9),T=y+(R^(_|~P))+E[0]+4096336452&4294967295,y=_+(T<<6&4294967295|T>>>26),T=P+(_^(y|~R))+E[7]+1126891415&4294967295,P=y+(T<<10&4294967295|T>>>22),T=R+(y^(P|~_))+E[14]+2878612391&4294967295,R=P+(T<<15&4294967295|T>>>17),T=_+(P^(R|~y))+E[5]+4237533241&4294967295,_=R+(T<<21&4294967295|T>>>11),T=y+(R^(_|~P))+E[12]+1700485571&4294967295,y=_+(T<<6&4294967295|T>>>26),T=P+(_^(y|~R))+E[3]+2399980690&4294967295,P=y+(T<<10&4294967295|T>>>22),T=R+(y^(P|~_))+E[10]+4293915773&4294967295,R=P+(T<<15&4294967295|T>>>17),T=_+(P^(R|~y))+E[1]+2240044497&4294967295,_=R+(T<<21&4294967295|T>>>11),T=y+(R^(_|~P))+E[8]+1873313359&4294967295,y=_+(T<<6&4294967295|T>>>26),T=P+(_^(y|~R))+E[15]+4264355552&4294967295,P=y+(T<<10&4294967295|T>>>22),T=R+(y^(P|~_))+E[6]+2734768916&4294967295,R=P+(T<<15&4294967295|T>>>17),T=_+(P^(R|~y))+E[13]+1309151649&4294967295,_=R+(T<<21&4294967295|T>>>11),T=y+(R^(_|~P))+E[4]+4149444226&4294967295,y=_+(T<<6&4294967295|T>>>26),T=P+(_^(y|~R))+E[11]+3174756917&4294967295,P=y+(T<<10&4294967295|T>>>22),T=R+(y^(P|~_))+E[2]+718787259&4294967295,R=P+(T<<15&4294967295|T>>>17),T=_+(P^(R|~y))+E[9]+3951481745&4294967295,w.g[0]=w.g[0]+y&4294967295,w.g[1]=w.g[1]+(R+(T<<21&4294967295|T>>>11))&4294967295,w.g[2]=w.g[2]+R&4294967295,w.g[3]=w.g[3]+P&4294967295}r.prototype.u=function(w,y){y===void 0&&(y=w.length);for(var _=y-this.blockSize,E=this.B,R=this.h,P=0;P<y;){if(R==0)for(;P<=_;)i(this,w,P),P+=this.blockSize;if(typeof w=="string"){for(;P<y;)if(E[R++]=w.charCodeAt(P++),R==this.blockSize){i(this,E),R=0;break}}else for(;P<y;)if(E[R++]=w[P++],R==this.blockSize){i(this,E),R=0;break}}this.h=R,this.o+=y},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var y=1;y<w.length-8;++y)w[y]=0;var _=8*this.o;for(y=w.length-8;y<w.length;++y)w[y]=_&255,_/=256;for(this.u(w),w=Array(16),y=_=0;4>y;++y)for(var E=0;32>E;E+=8)w[_++]=this.g[y]>>>E&255;return w};function s(w,y){var _=l;return Object.prototype.hasOwnProperty.call(_,w)?_[w]:_[w]=y(w)}function o(w,y){this.h=y;for(var _=[],E=!0,R=w.length-1;0<=R;R--){var P=w[R]|0;E&&P==y||(_[R]=P,E=!1)}this.g=_}var l={};function u(w){return-128<=w&&128>w?s(w,function(y){return new o([y|0],0>y?-1:0)}):new o([w|0],0>w?-1:0)}function h(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return V(h(-w));for(var y=[],_=1,E=0;w>=_;E++)y[E]=w/_|0,_*=4294967296;return new o(y,0)}function f(w,y){if(w.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(w.charAt(0)=="-")return V(f(w.substring(1),y));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(y,8)),E=m,R=0;R<w.length;R+=8){var P=Math.min(8,w.length-R),T=parseInt(w.substring(R,R+P),y);8>P?(P=h(Math.pow(y,P)),E=E.j(P).add(h(T))):(E=E.j(_),E=E.add(h(T)))}return E}var m=u(0),p=u(1),I=u(16777216);t=o.prototype,t.m=function(){if(N(this))return-V(this).m();for(var w=0,y=1,_=0;_<this.g.length;_++){var E=this.i(_);w+=(0<=E?E:4294967296+E)*y,y*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(k(this))return"0";if(N(this))return"-"+V(this).toString(w);for(var y=h(Math.pow(w,6)),_=this,E="";;){var R=b(_,y).g;_=S(_,R.j(y));var P=((0<_.g.length?_.g[0]:_.h)>>>0).toString(w);if(_=R,k(_))return P+E;for(;6>P.length;)P="0"+P;E=P+E}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function k(w){if(w.h!=0)return!1;for(var y=0;y<w.g.length;y++)if(w.g[y]!=0)return!1;return!0}function N(w){return w.h==-1}t.l=function(w){return w=S(this,w),N(w)?-1:k(w)?0:1};function V(w){for(var y=w.g.length,_=[],E=0;E<y;E++)_[E]=~w.g[E];return new o(_,~w.h).add(p)}t.abs=function(){return N(this)?V(this):this},t.add=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],E=0,R=0;R<=y;R++){var P=E+(this.i(R)&65535)+(w.i(R)&65535),T=(P>>>16)+(this.i(R)>>>16)+(w.i(R)>>>16);E=T>>>16,P&=65535,T&=65535,_[R]=T<<16|P}return new o(_,_[_.length-1]&-2147483648?-1:0)};function S(w,y){return w.add(V(y))}t.j=function(w){if(k(this)||k(w))return m;if(N(this))return N(w)?V(this).j(V(w)):V(V(this).j(w));if(N(w))return V(this.j(V(w)));if(0>this.l(I)&&0>w.l(I))return h(this.m()*w.m());for(var y=this.g.length+w.g.length,_=[],E=0;E<2*y;E++)_[E]=0;for(E=0;E<this.g.length;E++)for(var R=0;R<w.g.length;R++){var P=this.i(E)>>>16,T=this.i(E)&65535,He=w.i(R)>>>16,gn=w.i(R)&65535;_[2*E+2*R]+=T*gn,v(_,2*E+2*R),_[2*E+2*R+1]+=P*gn,v(_,2*E+2*R+1),_[2*E+2*R+1]+=T*He,v(_,2*E+2*R+1),_[2*E+2*R+2]+=P*He,v(_,2*E+2*R+2)}for(E=0;E<y;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=y;E<2*y;E++)_[E]=0;return new o(_,0)};function v(w,y){for(;(w[y]&65535)!=w[y];)w[y+1]+=w[y]>>>16,w[y]&=65535,y++}function A(w,y){this.g=w,this.h=y}function b(w,y){if(k(y))throw Error("division by zero");if(k(w))return new A(m,m);if(N(w))return y=b(V(w),y),new A(V(y.g),V(y.h));if(N(y))return y=b(w,V(y)),new A(V(y.g),y.h);if(30<w.g.length){if(N(w)||N(y))throw Error("slowDivide_ only works with positive integers.");for(var _=p,E=y;0>=E.l(w);)_=j(_),E=j(E);var R=F(_,1),P=F(E,1);for(E=F(E,2),_=F(_,2);!k(E);){var T=P.add(E);0>=T.l(w)&&(R=R.add(_),P=T),E=F(E,1),_=F(_,1)}return y=S(w,R.j(y)),new A(R,y)}for(R=m;0<=w.l(y);){for(_=Math.max(1,Math.floor(w.m()/y.m())),E=Math.ceil(Math.log(_)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),P=h(_),T=P.j(y);N(T)||0<T.l(w);)_-=E,P=h(_),T=P.j(y);k(P)&&(P=p),R=R.add(P),w=S(w,T)}return new A(R,w)}t.A=function(w){return b(this,w).h},t.and=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],E=0;E<y;E++)_[E]=this.i(E)&w.i(E);return new o(_,this.h&w.h)},t.or=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],E=0;E<y;E++)_[E]=this.i(E)|w.i(E);return new o(_,this.h|w.h)},t.xor=function(w){for(var y=Math.max(this.g.length,w.g.length),_=[],E=0;E<y;E++)_[E]=this.i(E)^w.i(E);return new o(_,this.h^w.h)};function j(w){for(var y=w.g.length+1,_=[],E=0;E<y;E++)_[E]=w.i(E)<<1|w.i(E-1)>>>31;return new o(_,w.h)}function F(w,y){var _=y>>5;y%=32;for(var E=w.g.length-_,R=[],P=0;P<E;P++)R[P]=0<y?w.i(P+_)>>>y|w.i(P+_+1)<<32-y:w.i(P+_);return new o(R,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,F0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,fr=o}).apply(typeof Ag<"u"?Ag:typeof self<"u"?self:typeof window<"u"?window:{});var Da=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var j0,Us,U0,Za,Mh,z0,B0,$0;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,c,d){return a==Array.prototype||a==Object.prototype||(a[c]=d.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Da=="object"&&Da];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function i(a,c){if(c)e:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var x=a[g];if(!(x in d))break e;d=d[x]}a=a[a.length-1],g=d[a],c=c(g),c!=g&&c!=null&&e(d,a,{configurable:!0,writable:!0,value:c})}}function s(a,c){a instanceof String&&(a+="");var d=0,g=!1,x={next:function(){if(!g&&d<a.length){var D=d++;return{value:c(D,a[D]),done:!1}}return g=!0,{done:!0,value:void 0}}};return x[Symbol.iterator]=function(){return x},x}i("Array.prototype.values",function(a){return a||function(){return s(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var c=typeof a;return c=c!="object"?c:a?Array.isArray(a)?"array":c:"null",c=="array"||c=="object"&&typeof a.length=="number"}function h(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function f(a,c,d){return a.call.apply(a.bind,arguments)}function m(a,c,d){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var x=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(x,g),a.apply(c,x)}}return function(){return a.apply(c,arguments)}}function p(a,c,d){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,p.apply(null,arguments)}function I(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function k(a,c){function d(){}d.prototype=c.prototype,a.aa=c.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(g,x,D){for(var U=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)U[fe-2]=arguments[fe];return c.prototype[x].apply(g,U)}}function N(a){const c=a.length;if(0<c){const d=Array(c);for(let g=0;g<c;g++)d[g]=a[g];return d}return[]}function V(a,c){for(let d=1;d<arguments.length;d++){const g=arguments[d];if(u(g)){const x=a.length||0,D=g.length||0;a.length=x+D;for(let U=0;U<D;U++)a[x+U]=g[U]}else a.push(g)}}class S{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function v(a){return/^[\s\xa0]*$/.test(a)}function A(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function b(a){return b[" "](a),a}b[" "]=function(){};var j=A().indexOf("Gecko")!=-1&&!(A().toLowerCase().indexOf("webkit")!=-1&&A().indexOf("Edge")==-1)&&!(A().indexOf("Trident")!=-1||A().indexOf("MSIE")!=-1)&&A().indexOf("Edge")==-1;function F(a,c,d){for(const g in a)c.call(d,a[g],g,a)}function w(a,c){for(const d in a)c.call(void 0,a[d],d,a)}function y(a){const c={};for(const d in a)c[d]=a[d];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,c){let d,g;for(let x=1;x<arguments.length;x++){g=arguments[x];for(d in g)a[d]=g[d];for(let D=0;D<_.length;D++)d=_[D],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function R(a){var c=1;a=a.split(":");const d=[];for(;0<c&&a.length;)d.push(a.shift()),c--;return a.length&&d.push(a.join(":")),d}function P(a){l.setTimeout(()=>{throw a},0)}function T(){var a=G;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class He{constructor(){this.h=this.g=null}add(c,d){const g=gn.get();g.set(c,d),this.h?this.h.next=g:this.g=g,this.h=g}}var gn=new S(()=>new At,a=>a.reset());class At{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Bt,z=!1,G=new He,Y=()=>{const a=l.Promise.resolve(void 0);Bt=()=>{a.then(ge)}};var ge=()=>{for(var a;a=T();){try{a.h.call(a.g)}catch(d){P(d)}var c=gn;c.j(a),100>c.h&&(c.h++,a.next=c.g,c.g=a)}z=!1};function ce(){this.s=this.s,this.C=this.C}ce.prototype.s=!1,ce.prototype.ma=function(){this.s||(this.s=!0,this.N())},ce.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Te(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}Te.prototype.h=function(){this.defaultPrevented=!0};var $t=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return a}();function q(a,c){if(Te.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget){if(j){e:{try{b(c.nodeName);var x=!0;break e}catch{}x=!1}x||(c=null)}}else d=="mouseover"?c=a.fromElement:d=="mouseout"&&(c=a.toElement);this.relatedTarget=c,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:le[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&q.aa.h.call(this)}}k(q,Te);var le={2:"touch",3:"pen",4:"mouse"};q.prototype.h=function(){q.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var se="closure_listenable_"+(1e6*Math.random()|0),de=0;function Ie(a,c,d,g,x){this.listener=a,this.proxy=null,this.src=c,this.type=d,this.capture=!!g,this.ha=x,this.key=++de,this.da=this.fa=!1}function gt(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Me(a){this.src=a,this.g={},this.h=0}Me.prototype.add=function(a,c,d,g,x){var D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);var U=ai(a,c,g,x);return-1<U?(c=a[U],d||(c.fa=!1)):(c=new Ie(c,this.src,D,!!g,x),c.fa=d,a.push(c)),c};function Ht(a,c){var d=c.type;if(d in a.g){var g=a.g[d],x=Array.prototype.indexOf.call(g,c,void 0),D;(D=0<=x)&&Array.prototype.splice.call(g,x,1),D&&(gt(c),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ai(a,c,d,g){for(var x=0;x<a.length;++x){var D=a[x];if(!D.da&&D.listener==c&&D.capture==!!d&&D.ha==g)return x}return-1}var li="closure_lm_"+(1e6*Math.random()|0),bu={};function $f(a,c,d,g,x){if(Array.isArray(c)){for(var D=0;D<c.length;D++)$f(a,c[D],d,g,x);return null}return d=Wf(d),a&&a[se]?a.K(c,d,h(g)?!!g.capture:!1,x):yE(a,c,d,!1,g,x)}function yE(a,c,d,g,x,D){if(!c)throw Error("Invalid event type");var U=h(x)?!!x.capture:!!x,fe=Ou(a);if(fe||(a[li]=fe=new Me(a)),d=fe.add(c,d,g,U,D),d.proxy)return d;if(g=_E(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)$t||(x=U),x===void 0&&(x=!1),a.addEventListener(c.toString(),g,x);else if(a.attachEvent)a.attachEvent(qf(c.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function _E(){function a(d){return c.call(a.src,a.listener,d)}const c=vE;return a}function Hf(a,c,d,g,x){if(Array.isArray(c))for(var D=0;D<c.length;D++)Hf(a,c[D],d,g,x);else g=h(g)?!!g.capture:!!g,d=Wf(d),a&&a[se]?(a=a.i,c=String(c).toString(),c in a.g&&(D=a.g[c],d=ai(D,d,g,x),-1<d&&(gt(D[d]),Array.prototype.splice.call(D,d,1),D.length==0&&(delete a.g[c],a.h--)))):a&&(a=Ou(a))&&(c=a.g[c.toString()],a=-1,c&&(a=ai(c,d,g,x)),(d=-1<a?c[a]:null)&&Vu(d))}function Vu(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[se])Ht(c.i,a);else{var d=a.type,g=a.proxy;c.removeEventListener?c.removeEventListener(d,g,a.capture):c.detachEvent?c.detachEvent(qf(d),g):c.addListener&&c.removeListener&&c.removeListener(g),(d=Ou(c))?(Ht(d,a),d.h==0&&(d.src=null,c[li]=null)):gt(a)}}}function qf(a){return a in bu?bu[a]:bu[a]="on"+a}function vE(a,c){if(a.da)a=!0;else{c=new q(c,this);var d=a.listener,g=a.ha||a.src;a.fa&&Vu(a),a=d.call(g,c)}return a}function Ou(a){return a=a[li],a instanceof Me?a:null}var Lu="__closure_events_fn_"+(1e9*Math.random()>>>0);function Wf(a){return typeof a=="function"?a:(a[Lu]||(a[Lu]=function(c){return a.handleEvent(c)}),a[Lu])}function Ze(){ce.call(this),this.i=new Me(this),this.M=this,this.F=null}k(Ze,ce),Ze.prototype[se]=!0,Ze.prototype.removeEventListener=function(a,c,d,g){Hf(this,a,c,d,g)};function ct(a,c){var d,g=a.F;if(g)for(d=[];g;g=g.F)d.push(g);if(a=a.M,g=c.type||c,typeof c=="string")c=new Te(c,a);else if(c instanceof Te)c.target=c.target||a;else{var x=c;c=new Te(g,a),E(c,x)}if(x=!0,d)for(var D=d.length-1;0<=D;D--){var U=c.g=d[D];x=Yo(U,g,!0,c)&&x}if(U=c.g=a,x=Yo(U,g,!0,c)&&x,x=Yo(U,g,!1,c)&&x,d)for(D=0;D<d.length;D++)U=c.g=d[D],x=Yo(U,g,!1,c)&&x}Ze.prototype.N=function(){if(Ze.aa.N.call(this),this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],g=0;g<d.length;g++)gt(d[g]);delete a.g[c],a.h--}}this.F=null},Ze.prototype.K=function(a,c,d,g){return this.i.add(String(a),c,!1,d,g)},Ze.prototype.L=function(a,c,d,g){return this.i.add(String(a),c,!0,d,g)};function Yo(a,c,d,g){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();for(var x=!0,D=0;D<c.length;++D){var U=c[D];if(U&&!U.da&&U.capture==d){var fe=U.listener,qe=U.ha||U.src;U.fa&&Ht(a.i,U),x=fe.call(qe,g)!==!1&&x}}return x&&!g.defaultPrevented}function Gf(a,c,d){if(typeof a=="function")d&&(a=p(a,d));else if(a&&typeof a.handleEvent=="function")a=p(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(a,c||0)}function Kf(a){a.g=Gf(()=>{a.g=null,a.i&&(a.i=!1,Kf(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class wE extends ce{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Kf(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ms(a){ce.call(this),this.h=a,this.g={}}k(ms,ce);var Qf=[];function Jf(a){F(a.g,function(c,d){this.g.hasOwnProperty(d)&&Vu(c)},a),a.g={}}ms.prototype.N=function(){ms.aa.N.call(this),Jf(this)},ms.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Mu=l.JSON.stringify,EE=l.JSON.parse,TE=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Fu(){}Fu.prototype.h=null;function Xf(a){return a.h||(a.h=a.i())}function Yf(){}var gs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ju(){Te.call(this,"d")}k(ju,Te);function Uu(){Te.call(this,"c")}k(Uu,Te);var Nr={},Zf=null;function Zo(){return Zf=Zf||new Ze}Nr.La="serverreachability";function ep(a){Te.call(this,Nr.La,a)}k(ep,Te);function ys(a){const c=Zo();ct(c,new ep(c))}Nr.STAT_EVENT="statevent";function tp(a,c){Te.call(this,Nr.STAT_EVENT,a),this.stat=c}k(tp,Te);function ht(a){const c=Zo();ct(c,new tp(c,a))}Nr.Ma="timingevent";function np(a,c){Te.call(this,Nr.Ma,a),this.size=c}k(np,Te);function _s(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},c)}function vs(){this.g=!0}vs.prototype.xa=function(){this.g=!1};function IE(a,c,d,g,x,D){a.info(function(){if(a.g)if(D)for(var U="",fe=D.split("&"),qe=0;qe<fe.length;qe++){var ae=fe[qe].split("=");if(1<ae.length){var et=ae[0];ae=ae[1];var tt=et.split("_");U=2<=tt.length&&tt[1]=="type"?U+(et+"="+ae+"&"):U+(et+"=redacted&")}}else U=null;else U=D;return"XMLHTTP REQ ("+g+") [attempt "+x+"]: "+c+`
`+d+`
`+U})}function SE(a,c,d,g,x,D,U){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+x+"]: "+c+`
`+d+`
`+D+" "+U})}function ui(a,c,d,g){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+CE(a,d)+(g?" "+g:"")})}function AE(a,c){a.info(function(){return"TIMEOUT: "+c})}vs.prototype.info=function(){};function CE(a,c){if(!a.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var g=d[a];if(!(2>g.length)){var x=g[1];if(Array.isArray(x)&&!(1>x.length)){var D=x[0];if(D!="noop"&&D!="stop"&&D!="close")for(var U=1;U<x.length;U++)x[U]=""}}}}return Mu(d)}catch{return c}}var ea={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},rp={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},zu;function ta(){}k(ta,Fu),ta.prototype.g=function(){return new XMLHttpRequest},ta.prototype.i=function(){return{}},zu=new ta;function Un(a,c,d,g){this.j=a,this.i=c,this.l=d,this.R=g||1,this.U=new ms(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ip}function ip(){this.i=null,this.g="",this.h=!1}var sp={},Bu={};function $u(a,c,d){a.L=1,a.v=sa(yn(c)),a.m=d,a.P=!0,op(a,null)}function op(a,c){a.F=Date.now(),na(a),a.A=yn(a.v);var d=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),wp(d.i,"t",g),a.C=0,d=a.j.J,a.h=new ip,a.g=Fp(a.j,d?c:null,!a.m),0<a.O&&(a.M=new wE(p(a.Y,a,a.g),a.O)),c=a.U,d=a.g,g=a.ca;var x="readystatechange";Array.isArray(x)||(x&&(Qf[0]=x.toString()),x=Qf);for(var D=0;D<x.length;D++){var U=$f(d,x[D],g||c.handleEvent,!1,c.h||c);if(!U)break;c.g[U.key]=U}c=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,c)):(a.u="GET",a.g.ea(a.A,a.u,null,c)),ys(),IE(a.i,a.u,a.A,a.l,a.R,a.m)}Un.prototype.ca=function(a){a=a.target;const c=this.M;c&&_n(a)==3?c.j():this.Y(a)},Un.prototype.Y=function(a){try{if(a==this.g)e:{const tt=_n(this.g);var c=this.g.Ba();const di=this.g.Z();if(!(3>tt)&&(tt!=3||this.g&&(this.h.h||this.g.oa()||Rp(this.g)))){this.J||tt!=4||c==7||(c==8||0>=di?ys(3):ys(2)),Hu(this);var d=this.g.Z();this.X=d;t:if(ap(this)){var g=Rp(this.g);a="";var x=g.length,D=_n(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Dr(this),ws(this);var U="";break t}this.h.i=new l.TextDecoder}for(c=0;c<x;c++)this.h.h=!0,a+=this.h.i.decode(g[c],{stream:!(D&&c==x-1)});g.length=0,this.h.g+=a,this.C=0,U=this.h.g}else U=this.g.oa();if(this.o=d==200,SE(this.i,this.u,this.A,this.l,this.R,tt,d),this.o){if(this.T&&!this.K){t:{if(this.g){var fe,qe=this.g;if((fe=qe.g?qe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(fe)){var ae=fe;break t}}ae=null}if(d=ae)ui(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,qu(this,d);else{this.o=!1,this.s=3,ht(12),Dr(this),ws(this);break e}}if(this.P){d=!0;let qt;for(;!this.J&&this.C<U.length;)if(qt=RE(this,U),qt==Bu){tt==4&&(this.s=4,ht(14),d=!1),ui(this.i,this.l,null,"[Incomplete Response]");break}else if(qt==sp){this.s=4,ht(15),ui(this.i,this.l,U,"[Invalid Chunk]"),d=!1;break}else ui(this.i,this.l,qt,null),qu(this,qt);if(ap(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||U.length!=0||this.h.h||(this.s=1,ht(16),d=!1),this.o=this.o&&d,!d)ui(this.i,this.l,U,"[Invalid Chunked Response]"),Dr(this),ws(this);else if(0<U.length&&!this.W){this.W=!0;var et=this.j;et.g==this&&et.ba&&!et.M&&(et.j.info("Great, no buffering proxy detected. Bytes received: "+U.length),Xu(et),et.M=!0,ht(11))}}else ui(this.i,this.l,U,null),qu(this,U);tt==4&&Dr(this),this.o&&!this.J&&(tt==4?Vp(this.j,this):(this.o=!1,na(this)))}else HE(this.g),d==400&&0<U.indexOf("Unknown SID")?(this.s=3,ht(12)):(this.s=0,ht(13)),Dr(this),ws(this)}}}catch{}finally{}};function ap(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function RE(a,c){var d=a.C,g=c.indexOf(`
`,d);return g==-1?Bu:(d=Number(c.substring(d,g)),isNaN(d)?sp:(g+=1,g+d>c.length?Bu:(c=c.slice(g,g+d),a.C=g+d,c)))}Un.prototype.cancel=function(){this.J=!0,Dr(this)};function na(a){a.S=Date.now()+a.I,lp(a,a.I)}function lp(a,c){if(a.B!=null)throw Error("WatchDog timer not null");a.B=_s(p(a.ba,a),c)}function Hu(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Un.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(AE(this.i,this.A),this.L!=2&&(ys(),ht(17)),Dr(this),this.s=2,ws(this)):lp(this,this.S-a)};function ws(a){a.j.G==0||a.J||Vp(a.j,a)}function Dr(a){Hu(a);var c=a.M;c&&typeof c.ma=="function"&&c.ma(),a.M=null,Jf(a.U),a.g&&(c=a.g,a.g=null,c.abort(),c.ma())}function qu(a,c){try{var d=a.j;if(d.G!=0&&(d.g==a||Wu(d.h,a))){if(!a.K&&Wu(d.h,a)&&d.G==3){try{var g=d.Da.g.parse(c)}catch{g=null}if(Array.isArray(g)&&g.length==3){var x=g;if(x[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)ha(d),ua(d);else break e;Ju(d),ht(18)}}else d.za=x[1],0<d.za-d.T&&37500>x[2]&&d.F&&d.v==0&&!d.C&&(d.C=_s(p(d.Za,d),6e3));if(1>=hp(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Vr(d,11)}else if((a.K||d.g==a)&&ha(d),!v(c))for(x=d.Da.g.parse(c),c=0;c<x.length;c++){let ae=x[c];if(d.T=ae[0],ae=ae[1],d.G==2)if(ae[0]=="c"){d.K=ae[1],d.ia=ae[2];const et=ae[3];et!=null&&(d.la=et,d.j.info("VER="+d.la));const tt=ae[4];tt!=null&&(d.Aa=tt,d.j.info("SVER="+d.Aa));const di=ae[5];di!=null&&typeof di=="number"&&0<di&&(g=1.5*di,d.L=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const qt=a.g;if(qt){const fa=qt.g?qt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(fa){var D=g.h;D.g||fa.indexOf("spdy")==-1&&fa.indexOf("quic")==-1&&fa.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Gu(D,D.h),D.h=null))}if(g.D){const Yu=qt.g?qt.g.getResponseHeader("X-HTTP-Session-Id"):null;Yu&&(g.ya=Yu,ye(g.I,g.D,Yu))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),g=d;var U=a;if(g.qa=Mp(g,g.J?g.ia:null,g.W),U.K){dp(g.h,U);var fe=U,qe=g.L;qe&&(fe.I=qe),fe.B&&(Hu(fe),na(fe)),g.g=U}else Dp(g);0<d.i.length&&ca(d)}else ae[0]!="stop"&&ae[0]!="close"||Vr(d,7);else d.G==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?Vr(d,7):Qu(d):ae[0]!="noop"&&d.l&&d.l.ta(ae),d.v=0)}}ys(4)}catch{}}var kE=class{constructor(a,c){this.g=a,this.map=c}};function up(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function cp(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function hp(a){return a.h?1:a.g?a.g.size:0}function Wu(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function Gu(a,c){a.g?a.g.add(c):a.h=c}function dp(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}up.prototype.cancel=function(){if(this.i=fp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function fp(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const d of a.g.values())c=c.concat(d.D);return c}return N(a.i)}function PE(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var c=[],d=a.length,g=0;g<d;g++)c.push(a[g]);return c}c=[],d=0;for(g in a)c[d++]=a[g];return c}function xE(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var c=[];a=a.length;for(var d=0;d<a;d++)c.push(d);return c}c=[],d=0;for(const g in a)c[d++]=g;return c}}}function pp(a,c){if(a.forEach&&typeof a.forEach=="function")a.forEach(c,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,c,void 0);else for(var d=xE(a),g=PE(a),x=g.length,D=0;D<x;D++)c.call(void 0,g[D],d&&d[D],a)}var mp=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function NE(a,c){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var g=a[d].indexOf("="),x=null;if(0<=g){var D=a[d].substring(0,g);x=a[d].substring(g+1)}else D=a[d];c(D,x?decodeURIComponent(x.replace(/\+/g," ")):"")}}}function br(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof br){this.h=a.h,ra(this,a.j),this.o=a.o,this.g=a.g,ia(this,a.s),this.l=a.l;var c=a.i,d=new Is;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),gp(this,d),this.m=a.m}else a&&(c=String(a).match(mp))?(this.h=!1,ra(this,c[1]||"",!0),this.o=Es(c[2]||""),this.g=Es(c[3]||"",!0),ia(this,c[4]),this.l=Es(c[5]||"",!0),gp(this,c[6]||"",!0),this.m=Es(c[7]||"")):(this.h=!1,this.i=new Is(null,this.h))}br.prototype.toString=function(){var a=[],c=this.j;c&&a.push(Ts(c,yp,!0),":");var d=this.g;return(d||c=="file")&&(a.push("//"),(c=this.o)&&a.push(Ts(c,yp,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Ts(d,d.charAt(0)=="/"?VE:bE,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Ts(d,LE)),a.join("")};function yn(a){return new br(a)}function ra(a,c,d){a.j=d?Es(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function ia(a,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);a.s=c}else a.s=null}function gp(a,c,d){c instanceof Is?(a.i=c,ME(a.i,a.h)):(d||(c=Ts(c,OE)),a.i=new Is(c,a.h))}function ye(a,c,d){a.i.set(c,d)}function sa(a){return ye(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Es(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ts(a,c,d){return typeof a=="string"?(a=encodeURI(a).replace(c,DE),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function DE(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var yp=/[#\/\?@]/g,bE=/[#\?:]/g,VE=/[#\?]/g,OE=/[#\?@]/g,LE=/#/g;function Is(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function zn(a){a.g||(a.g=new Map,a.h=0,a.i&&NE(a.i,function(c,d){a.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=Is.prototype,t.add=function(a,c){zn(this),this.i=null,a=ci(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(c),this.h+=1,this};function _p(a,c){zn(a),c=ci(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function vp(a,c){return zn(a),c=ci(a,c),a.g.has(c)}t.forEach=function(a,c){zn(this),this.g.forEach(function(d,g){d.forEach(function(x){a.call(c,x,g,this)},this)},this)},t.na=function(){zn(this);const a=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let g=0;g<c.length;g++){const x=a[g];for(let D=0;D<x.length;D++)d.push(c[g])}return d},t.V=function(a){zn(this);let c=[];if(typeof a=="string")vp(this,a)&&(c=c.concat(this.g.get(ci(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)c=c.concat(a[d])}return c},t.set=function(a,c){return zn(this),this.i=null,a=ci(this,a),vp(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},t.get=function(a,c){return a?(a=this.V(a),0<a.length?String(a[0]):c):c};function wp(a,c,d){_p(a,c),0<d.length&&(a.i=null,a.g.set(ci(a,c),N(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var g=c[d];const D=encodeURIComponent(String(g)),U=this.V(g);for(g=0;g<U.length;g++){var x=D;U[g]!==""&&(x+="="+encodeURIComponent(String(U[g]))),a.push(x)}}return this.i=a.join("&")};function ci(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function ME(a,c){c&&!a.j&&(zn(a),a.i=null,a.g.forEach(function(d,g){var x=g.toLowerCase();g!=x&&(_p(this,g),wp(this,x,d))},a)),a.j=c}function FE(a,c){const d=new vs;if(l.Image){const g=new Image;g.onload=I(Bn,d,"TestLoadImage: loaded",!0,c,g),g.onerror=I(Bn,d,"TestLoadImage: error",!1,c,g),g.onabort=I(Bn,d,"TestLoadImage: abort",!1,c,g),g.ontimeout=I(Bn,d,"TestLoadImage: timeout",!1,c,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else c(!1)}function jE(a,c){const d=new vs,g=new AbortController,x=setTimeout(()=>{g.abort(),Bn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:g.signal}).then(D=>{clearTimeout(x),D.ok?Bn(d,"TestPingServer: ok",!0,c):Bn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(x),Bn(d,"TestPingServer: error",!1,c)})}function Bn(a,c,d,g,x){try{x&&(x.onload=null,x.onerror=null,x.onabort=null,x.ontimeout=null),g(d)}catch{}}function UE(){this.g=new TE}function zE(a,c,d){const g=d||"";try{pp(a,function(x,D){let U=x;h(x)&&(U=Mu(x)),c.push(g+D+"="+encodeURIComponent(U))})}catch(x){throw c.push(g+"type="+encodeURIComponent("_badmap")),x}}function oa(a){this.l=a.Ub||null,this.j=a.eb||!1}k(oa,Fu),oa.prototype.g=function(){return new aa(this.l,this.j)},oa.prototype.i=function(a){return function(){return a}}({});function aa(a,c){Ze.call(this),this.D=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(aa,Ze),t=aa.prototype,t.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=c,this.readyState=1,As(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(c.body=a),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ss(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,As(this)),this.g&&(this.readyState=3,As(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ep(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ep(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?Ss(this):As(this),this.readyState==3&&Ep(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Ss(this))},t.Qa=function(a){this.g&&(this.response=a,Ss(this))},t.ga=function(){this.g&&Ss(this)};function Ss(a){a.readyState=4,a.l=null,a.j=null,a.v=null,As(a)}t.setRequestHeader=function(a,c){this.u.append(a,c)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=c.next();return a.join(`\r
`)};function As(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(aa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Tp(a){let c="";return F(a,function(d,g){c+=g,c+=":",c+=d,c+=`\r
`}),c}function Ku(a,c,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=Tp(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ye(a,c,d))}function ke(a){Ze.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(ke,Ze);var BE=/^https?$/i,$E=["POST","PUT"];t=ke.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,c,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():zu.g(),this.v=this.o?Xf(this.o):Xf(zu),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(D){Ip(this,D);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var x in g)d.set(x,g[x]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const D of g.keys())d.set(D,g.get(D));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(D=>D.toLowerCase()=="content-type"),x=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call($E,c,void 0))||g||x||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,U]of d)this.g.setRequestHeader(D,U);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Cp(this),this.u=!0,this.g.send(a),this.u=!1}catch(D){Ip(this,D)}};function Ip(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.m=5,Sp(a),la(a)}function Sp(a){a.A||(a.A=!0,ct(a,"complete"),ct(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,ct(this,"complete"),ct(this,"abort"),la(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),la(this,!0)),ke.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Ap(this):this.bb())},t.bb=function(){Ap(this)};function Ap(a){if(a.h&&typeof o<"u"&&(!a.v[1]||_n(a)!=4||a.Z()!=2)){if(a.u&&_n(a)==4)Gf(a.Ea,0,a);else if(ct(a,"readystatechange"),_n(a)==4){a.h=!1;try{const U=a.Z();e:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var g;if(g=U===0){var x=String(a.D).match(mp)[1]||null;!x&&l.self&&l.self.location&&(x=l.self.location.protocol.slice(0,-1)),g=!BE.test(x?x.toLowerCase():"")}d=g}if(d)ct(a,"complete"),ct(a,"success");else{a.m=6;try{var D=2<_n(a)?a.g.statusText:""}catch{D=""}a.l=D+" ["+a.Z()+"]",Sp(a)}}finally{la(a)}}}}function la(a,c){if(a.g){Cp(a);const d=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,c||ct(a,"ready");try{d.onreadystatechange=g}catch{}}}function Cp(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function _n(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<_n(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),EE(c)}};function Rp(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function HE(a){const c={};a=(a.g&&2<=_n(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(v(a[g]))continue;var d=R(a[g]);const x=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const D=c[x]||[];c[x]=D,D.push(d)}w(c,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Cs(a,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||c}function kp(a){this.Aa=0,this.i=[],this.j=new vs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Cs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Cs("baseRetryDelayMs",5e3,a),this.cb=Cs("retryDelaySeedMs",1e4,a),this.Wa=Cs("forwardChannelMaxRetries",2,a),this.wa=Cs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new up(a&&a.concurrentRequestLimit),this.Da=new UE,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=kp.prototype,t.la=8,t.G=1,t.connect=function(a,c,d,g){ht(0),this.W=a,this.H=c||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.I=Mp(this,null,this.W),ca(this)};function Qu(a){if(Pp(a),a.G==3){var c=a.U++,d=yn(a.I);if(ye(d,"SID",a.K),ye(d,"RID",c),ye(d,"TYPE","terminate"),Rs(a,d),c=new Un(a,a.j,c),c.L=2,c.v=sa(yn(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=Fp(c.j,null),c.g.ea(c.v)),c.F=Date.now(),na(c)}Lp(a)}function ua(a){a.g&&(Xu(a),a.g.cancel(),a.g=null)}function Pp(a){ua(a),a.u&&(l.clearTimeout(a.u),a.u=null),ha(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function ca(a){if(!cp(a.h)&&!a.s){a.s=!0;var c=a.Ga;Bt||Y(),z||(Bt(),z=!0),G.add(c,a),a.B=0}}function qE(a,c){return hp(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=c.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=_s(p(a.Ga,a,c),Op(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const x=new Un(this,this.j,a);let D=this.o;if(this.S&&(D?(D=y(D),E(D,this.S)):D=this.S),this.m!==null||this.O||(x.H=D,D=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(c+=g,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=Np(this,x,c),d=yn(this.I),ye(d,"RID",a),ye(d,"CVER",22),this.D&&ye(d,"X-HTTP-Session-Id",this.D),Rs(this,d),D&&(this.O?c="headers="+encodeURIComponent(String(Tp(D)))+"&"+c:this.m&&Ku(d,this.m,D)),Gu(this.h,x),this.Ua&&ye(d,"TYPE","init"),this.P?(ye(d,"$req",c),ye(d,"SID","null"),x.T=!0,$u(x,d,null)):$u(x,d,c),this.G=2}}else this.G==3&&(a?xp(this,a):this.i.length==0||cp(this.h)||xp(this))};function xp(a,c){var d;c?d=c.l:d=a.U++;const g=yn(a.I);ye(g,"SID",a.K),ye(g,"RID",d),ye(g,"AID",a.T),Rs(a,g),a.m&&a.o&&Ku(g,a.m,a.o),d=new Un(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),c&&(a.i=c.D.concat(a.i)),c=Np(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Gu(a.h,d),$u(d,g,c)}function Rs(a,c){a.H&&F(a.H,function(d,g){ye(c,g,d)}),a.l&&pp({},function(d,g){ye(c,g,d)})}function Np(a,c,d){d=Math.min(a.i.length,d);var g=a.l?p(a.l.Na,a.l,a):null;e:{var x=a.i;let D=-1;for(;;){const U=["count="+d];D==-1?0<d?(D=x[0].g,U.push("ofs="+D)):D=0:U.push("ofs="+D);let fe=!0;for(let qe=0;qe<d;qe++){let ae=x[qe].g;const et=x[qe].map;if(ae-=D,0>ae)D=Math.max(0,x[qe].g-100),fe=!1;else try{zE(et,U,"req"+ae+"_")}catch{g&&g(et)}}if(fe){g=U.join("&");break e}}}return a=a.i.splice(0,d),c.D=a,g}function Dp(a){if(!a.g&&!a.u){a.Y=1;var c=a.Fa;Bt||Y(),z||(Bt(),z=!0),G.add(c,a),a.v=0}}function Ju(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=_s(p(a.Fa,a),Op(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,bp(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=_s(p(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ht(10),ua(this),bp(this))};function Xu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function bp(a){a.g=new Un(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var c=yn(a.qa);ye(c,"RID","rpc"),ye(c,"SID",a.K),ye(c,"AID",a.T),ye(c,"CI",a.F?"0":"1"),!a.F&&a.ja&&ye(c,"TO",a.ja),ye(c,"TYPE","xmlhttp"),Rs(a,c),a.m&&a.o&&Ku(c,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=sa(yn(c)),d.m=null,d.P=!0,op(d,a)}t.Za=function(){this.C!=null&&(this.C=null,ua(this),Ju(this),ht(19))};function ha(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Vp(a,c){var d=null;if(a.g==c){ha(a),Xu(a),a.g=null;var g=2}else if(Wu(a.h,c))d=c.D,dp(a.h,c),g=1;else return;if(a.G!=0){if(c.o)if(g==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var x=a.B;g=Zo(),ct(g,new np(g,d)),ca(a)}else Dp(a);else if(x=c.s,x==3||x==0&&0<c.X||!(g==1&&qE(a,c)||g==2&&Ju(a)))switch(d&&0<d.length&&(c=a.h,c.i=c.i.concat(d)),x){case 1:Vr(a,5);break;case 4:Vr(a,10);break;case 3:Vr(a,6);break;default:Vr(a,2)}}}function Op(a,c){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*c}function Vr(a,c){if(a.j.info("Error code "+c),c==2){var d=p(a.fb,a),g=a.Xa;const x=!g;g=new br(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ra(g,"https"),sa(g),x?FE(g.toString(),d):jE(g.toString(),d)}else ht(2);a.G=0,a.l&&a.l.sa(c),Lp(a),Pp(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ht(2)):(this.j.info("Failed to ping google.com"),ht(1))};function Lp(a){if(a.G=0,a.ka=[],a.l){const c=fp(a.h);(c.length!=0||a.i.length!=0)&&(V(a.ka,c),V(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function Mp(a,c,d){var g=d instanceof br?yn(d):new br(d);if(g.g!="")c&&(g.g=c+"."+g.g),ia(g,g.s);else{var x=l.location;g=x.protocol,c=c?c+"."+x.hostname:x.hostname,x=+x.port;var D=new br(null);g&&ra(D,g),c&&(D.g=c),x&&ia(D,x),d&&(D.l=d),g=D}return d=a.D,c=a.ya,d&&c&&ye(g,d,c),ye(g,"VER",a.la),Rs(a,g),g}function Fp(a,c,d){if(c&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Ca&&!a.pa?new ke(new oa({eb:d})):new ke(a.pa),c.Ha(a.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function jp(){}t=jp.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function da(){}da.prototype.g=function(a,c){return new Ct(a,c)};function Ct(a,c){Ze.call(this),this.g=new kp(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(a?a["X-WebChannel-Client-Profile"]=c.va:a={"X-WebChannel-Client-Profile":c.va}),this.g.S=a,(a=c&&c.Sb)&&!v(a)&&(this.g.m=a),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!v(c)&&(this.g.D=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new hi(this)}k(Ct,Ze),Ct.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ct.prototype.close=function(){Qu(this.g)},Ct.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Mu(a),a=d);c.i.push(new kE(c.Ya++,a)),c.G==3&&ca(c)},Ct.prototype.N=function(){this.g.l=null,delete this.j,Qu(this.g),delete this.g,Ct.aa.N.call(this)};function Up(a){ju.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const d in c){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}k(Up,ju);function zp(){Uu.call(this),this.status=1}k(zp,Uu);function hi(a){this.g=a}k(hi,jp),hi.prototype.ua=function(){ct(this.g,"a")},hi.prototype.ta=function(a){ct(this.g,new Up(a))},hi.prototype.sa=function(a){ct(this.g,new zp)},hi.prototype.ra=function(){ct(this.g,"b")},da.prototype.createWebChannel=da.prototype.g,Ct.prototype.send=Ct.prototype.o,Ct.prototype.open=Ct.prototype.m,Ct.prototype.close=Ct.prototype.close,$0=function(){return new da},B0=function(){return Zo()},z0=Nr,Mh={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ea.NO_ERROR=0,ea.TIMEOUT=8,ea.HTTP_ERROR=6,Za=ea,rp.COMPLETE="complete",U0=rp,Yf.EventType=gs,gs.OPEN="a",gs.CLOSE="b",gs.ERROR="c",gs.MESSAGE="d",Ze.prototype.listen=Ze.prototype.K,Us=Yf,ke.prototype.listenOnce=ke.prototype.L,ke.prototype.getLastError=ke.prototype.Ka,ke.prototype.getLastErrorCode=ke.prototype.Ba,ke.prototype.getStatus=ke.prototype.Z,ke.prototype.getResponseJson=ke.prototype.Oa,ke.prototype.getResponseText=ke.prototype.oa,ke.prototype.send=ke.prototype.ea,ke.prototype.setWithCredentials=ke.prototype.Ha,j0=ke}).apply(typeof Da<"u"?Da:typeof self<"u"?self:typeof window<"u"?window:{});const Cg="@firebase/firestore",Rg="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}st.UNAUTHENTICATED=new st(null),st.GOOGLE_CREDENTIALS=new st("google-credentials-uid"),st.FIRST_PARTY=new st("first-party-uid"),st.MOCK_USER=new st("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cs="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=new Qd("@firebase/firestore");function pi(){return yr.logLevel}function sR(t){yr.setLogLevel(t)}function $(t,...e){if(yr.logLevel<=ne.DEBUG){const n=e.map(lf);yr.debug(`Firestore (${cs}): ${t}`,...n)}}function Ln(t,...e){if(yr.logLevel<=ne.ERROR){const n=e.map(lf);yr.error(`Firestore (${cs}): ${t}`,...n)}}function _r(t,...e){if(yr.logLevel<=ne.WARN){const n=e.map(lf);yr.warn(`Firestore (${cs}): ${t}`,...n)}}function lf(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,H0(t,r,n)}function H0(t,e,n){let r=`FIRESTORE (${cs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw Ln(r),new Error(r)}function ue(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||H0(e,i,r)}function X(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends jn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q0{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class oR{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(st.UNAUTHENTICATED))}shutdown(){}}class aR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class lR{constructor(e){this.t=e,this.currentUser=st.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ue(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new Hr;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Hr,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Hr)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ue(typeof r.accessToken=="string",31837,{l:r}),new q0(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ue(e===null||typeof e=="string",2055,{h:e}),new st(e)}}class uR{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=st.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class cR{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new uR(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(st.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class kg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hR{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Lt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){ue(this.o===void 0,3512);const r=s=>{s.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,$("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new kg(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(ue(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new kg(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dR(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W0(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=dR(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%62))}return r}}function ee(t,e){return t<e?-1:t>e?1:0}function Fh(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),i=e.codePointAt(n);if(r!==i){if(r<128&&i<128)return ee(r,i);{const s=W0(),o=fR(s.encode(Pg(t,n)),s.encode(Pg(e,n)));return o!==0?o:ee(r,i)}}n+=r>65535?2:1}return ee(t.length,e.length)}function Pg(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function fR(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return ee(t[n],e[n]);return ee(t.length,e.length)}function Zi(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xg="__name__";class rn{constructor(e,n,r){n===void 0?n=0:n>e.length&&K(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&K(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return rn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof rn?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=rn.compareSegments(e.get(i),n.get(i));if(s!==0)return s}return ee(e.length,n.length)}static compareSegments(e,n){const r=rn.isNumericId(e),i=rn.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?rn.extractNumericId(e).compare(rn.extractNumericId(n)):Fh(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return fr.fromString(e.substring(4,e.length-2))}}class pe extends rn{construct(e,n,r){return new pe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new B(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new pe(n)}static emptyPath(){return new pe([])}}const pR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ke extends rn{construct(e,n,r){return new Ke(e,n,r)}static isValidIdentifier(e){return pR.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ke.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===xg}static keyField(){return new Ke([xg])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new B(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new B(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new B(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new B(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ke(n)}static emptyPath(){return new Ke([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.path=e}static fromPath(e){return new W(pe.fromString(e))}static fromName(e){return new W(pe.fromString(e).popFirst(5))}static empty(){return new W(pe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&pe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return pe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new W(new pe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G0(t,e,n){if(!n)throw new B(O.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function mR(t,e,n,r){if(e===!0&&r===!0)throw new B(O.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Ng(t){if(!W.isDocumentKey(t))throw new B(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Dg(t){if(W.isDocumentKey(t))throw new B(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function K0(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function mu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":K(12329,{type:typeof t})}function qr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new B(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=mu(t);throw new B(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function gR(t,e){if(e<=0)throw new B(O.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(t,e){const n={typeString:t};return e&&(n.value=e),n}function Wo(t,e){if(!K0(t))throw new B(O.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new B(O.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg=-62135596800,Vg=1e6;class ve{static now(){return ve.fromMillis(Date.now())}static fromDate(e){return ve.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Vg);return new ve(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new B(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new B(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<bg)throw new B(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new B(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Vg}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ve._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Wo(e,ve._jsonSchema))return new ve(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-bg;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ve._jsonSchemaVersion="firestore/timestamp/1.0",ve._jsonSchema={type:Oe("string",ve._jsonSchemaVersion),seconds:Oe("number"),nanoseconds:Oe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{static fromTimestamp(e){return new J(e)}static min(){return new J(new ve(0,0))}static max(){return new J(new ve(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ao=-1;function yR(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=J.fromTimestamp(r===1e9?new ve(n+1,0):new ve(n,r));return new vr(i,W.empty(),e)}function _R(t){return new vr(t.readTime,t.key,Ao)}class vr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new vr(J.min(),W.empty(),Ao)}static max(){return new vr(J.max(),W.empty(),Ao)}}function vR(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=W.comparator(t.documentKey,e.documentKey),n!==0?n:ee(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wR="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ER{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hs(t){if(t.code!==O.FAILED_PRECONDITION||t.message!==wR)throw t;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&K(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new L((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof L?n:L.resolve(n)}catch(n){return L.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):L.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):L.reject(n)}static resolve(e){return new L((n,r)=>{n(e)})}static reject(e){return new L((n,r)=>{r(e)})}static waitFor(e){return new L((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=L.resolve(!1);for(const r of e)n=n.next(i=>i?L.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new L((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const h=u;n(e[h]).next(f=>{o[h]=f,++l,l===s&&r(o)},f=>i(f))}})}static doWhile(e,n){return new L((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function TR(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function ds(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this._e(r),this.ae=r=>n.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}gu.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cf=-1;function yu(t){return t==null}function jl(t){return t===0&&1/t==-1/0}function IR(t){return typeof t=="number"&&Number.isInteger(t)&&!jl(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q0="";function SR(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Og(e)),e=AR(t.get(n),e);return Og(e)}function AR(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case Q0:n+="";break;default:n+=s}}return n}function Og(t){return t+Q0+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lg(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function kr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function J0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,n){this.comparator=e,this.root=n||Ge.EMPTY}insert(e,n){return new Re(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ge.BLACK,null,null))}remove(e){return new Re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ge.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ba(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ba(this.root,e,this.comparator,!1)}getReverseIterator(){return new ba(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ba(this.root,e,this.comparator,!0)}}class ba{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ge{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Ge.RED,this.left=i??Ge.EMPTY,this.right=s??Ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Ge(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Ge.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw K(43730,{key:this.key,value:this.value});if(this.right.isRed())throw K(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw K(27949);return e+(this.isRed()?0:1)}}Ge.EMPTY=null,Ge.RED=!0,Ge.BLACK=!1;Ge.EMPTY=new class{constructor(){this.size=0}get key(){throw K(57766)}get value(){throw K(16141)}get color(){throw K(16727)}get left(){throw K(29726)}get right(){throw K(36894)}copy(e,n,r,i,s){return this}insert(e,n,r){return new Ge(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.comparator=e,this.data=new Re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Mg(this.data.getIterator())}getIteratorFrom(e){return new Mg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Ue)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Ue(this.comparator);return n.data=e,n}}class Mg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new Pt([])}unionWith(e){let n=new Ue(Ke.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Pt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Zi(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new X0("Invalid base64 string: "+s):s}}(e);return new Ye(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Ye(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ye.EMPTY_BYTE_STRING=new Ye("");const CR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function wr(t){if(ue(!!t,39018),typeof t=="string"){let e=0;const n=CR.exec(t);if(ue(!!n,46558,{timestamp:t}),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(t.seconds),nanos:xe(t.nanos)}}function xe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Er(t){return typeof t=="string"?Ye.fromBase64String(t):Ye.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y0="server_timestamp",Z0="__type__",ew="__previous_value__",tw="__local_write_time__";function hf(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[Z0])===null||n===void 0?void 0:n.stringValue)===Y0}function _u(t){const e=t.mapValue.fields[ew];return hf(e)?_u(e):e}function Co(t){const e=wr(t.mapValue.fields[tw].timestampValue);return new ve(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RR{constructor(e,n,r,i,s,o,l,u,h,f){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const Ul="(default)";class Ro{constructor(e,n){this.projectId=e,this.database=n||Ul}static empty(){return new Ro("","")}get isDefaultDatabase(){return this.database===Ul}isEqual(e){return e instanceof Ro&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nw="__type__",kR="__max__",Va={mapValue:{}},rw="__vector__",zl="value";function Tr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?hf(t)?4:xR(t)?9007199254740991:PR(t)?10:11:K(28295,{value:t})}function mn(t,e){if(t===e)return!0;const n=Tr(t);if(n!==Tr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Co(t).isEqual(Co(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=wr(i.timestampValue),l=wr(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Er(i.bytesValue).isEqual(Er(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return xe(i.geoPointValue.latitude)===xe(s.geoPointValue.latitude)&&xe(i.geoPointValue.longitude)===xe(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return xe(i.integerValue)===xe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=xe(i.doubleValue),l=xe(s.doubleValue);return o===l?jl(o)===jl(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Zi(t.arrayValue.values||[],e.arrayValue.values||[],mn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(Lg(o)!==Lg(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!mn(o[u],l[u])))return!1;return!0}(t,e);default:return K(52216,{left:t})}}function ko(t,e){return(t.values||[]).find(n=>mn(n,e))!==void 0}function es(t,e){if(t===e)return 0;const n=Tr(t),r=Tr(e);if(n!==r)return ee(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ee(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=xe(s.integerValue||s.doubleValue),u=xe(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Fg(t.timestampValue,e.timestampValue);case 4:return Fg(Co(t),Co(e));case 5:return Fh(t.stringValue,e.stringValue);case 6:return function(s,o){const l=Er(s),u=Er(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=ee(l[h],u[h]);if(f!==0)return f}return ee(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=ee(xe(s.latitude),xe(o.latitude));return l!==0?l:ee(xe(s.longitude),xe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return jg(t.arrayValue,e.arrayValue);case 10:return function(s,o){var l,u,h,f;const m=s.fields||{},p=o.fields||{},I=(l=m[zl])===null||l===void 0?void 0:l.arrayValue,k=(u=p[zl])===null||u===void 0?void 0:u.arrayValue,N=ee(((h=I==null?void 0:I.values)===null||h===void 0?void 0:h.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:jg(I,k)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===Va.mapValue&&o===Va.mapValue)return 0;if(s===Va.mapValue)return 1;if(o===Va.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const p=Fh(u[m],f[m]);if(p!==0)return p;const I=es(l[u[m]],h[f[m]]);if(I!==0)return I}return ee(u.length,f.length)}(t.mapValue,e.mapValue);default:throw K(23264,{le:n})}}function Fg(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ee(t,e);const n=wr(t),r=wr(e),i=ee(n.seconds,r.seconds);return i!==0?i:ee(n.nanos,r.nanos)}function jg(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=es(n[i],r[i]);if(s)return s}return ee(n.length,r.length)}function ts(t){return jh(t)}function jh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=wr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Er(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return W.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=jh(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${jh(n.fields[o])}`;return i+"}"}(t.mapValue):K(61005,{value:t})}function el(t){switch(Tr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=_u(t);return e?16+el(e):16;case 5:return 2*t.stringValue.length;case 6:return Er(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+el(s),0)}(t.arrayValue);case 10:case 11:return function(r){let i=0;return kr(r.fields,(s,o)=>{i+=s.length+el(o)}),i}(t.mapValue);default:throw K(13486,{value:t})}}function Ug(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Uh(t){return!!t&&"integerValue"in t}function df(t){return!!t&&"arrayValue"in t}function zg(t){return!!t&&"nullValue"in t}function Bg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function tl(t){return!!t&&"mapValue"in t}function PR(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[nw])===null||n===void 0?void 0:n.stringValue)===rw}function to(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return kr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=to(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=to(t.arrayValue.values[n]);return e}return Object.assign({},t)}function xR(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===kR}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.value=e}static empty(){return new vt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!tl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=to(n)}setAll(e){let n=Ke.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=to(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());tl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return mn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];tl(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){kr(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new vt(to(this.value))}}function iw(t){const e=[];return kr(t.fields,(n,r)=>{const i=new Ke([n]);if(tl(r)){const s=iw(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Pt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new at(e,0,J.min(),J.min(),J.min(),vt.empty(),0)}static newFoundDocument(e,n,r,i){return new at(e,1,n,J.min(),r,i,0)}static newNoDocument(e,n){return new at(e,2,n,J.min(),J.min(),vt.empty(),0)}static newUnknownDocument(e,n){return new at(e,3,n,J.min(),J.min(),vt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=vt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof at&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new at(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e,n){this.position=e,this.inclusive=n}}function $g(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=W.comparator(W.fromName(o.referenceValue),n.key):r=es(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Hg(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!mn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,n="asc"){this.field=e,this.dir=n}}function NR(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{}class Ve extends sw{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new bR(e,n,r):n==="array-contains"?new LR(e,r):n==="in"?new MR(e,r):n==="not-in"?new FR(e,r):n==="array-contains-any"?new jR(e,r):new Ve(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new VR(e,r):new OR(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(es(n,this.value)):n!==null&&Tr(this.value)===Tr(n)&&this.matchesComparison(es(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class en extends sw{constructor(e,n){super(),this.filters=e,this.op=n,this.he=null}static create(e,n){return new en(e,n)}matches(e){return ow(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function ow(t){return t.op==="and"}function aw(t){return DR(t)&&ow(t)}function DR(t){for(const e of t.filters)if(e instanceof en)return!1;return!0}function zh(t){if(t instanceof Ve)return t.field.canonicalString()+t.op.toString()+ts(t.value);if(aw(t))return t.filters.map(e=>zh(e)).join(",");{const e=t.filters.map(n=>zh(n)).join(",");return`${t.op}(${e})`}}function lw(t,e){return t instanceof Ve?function(r,i){return i instanceof Ve&&r.op===i.op&&r.field.isEqual(i.field)&&mn(r.value,i.value)}(t,e):t instanceof en?function(r,i){return i instanceof en&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&lw(o,i.filters[l]),!0):!1}(t,e):void K(19439)}function uw(t){return t instanceof Ve?function(n){return`${n.field.canonicalString()} ${n.op} ${ts(n.value)}`}(t):t instanceof en?function(n){return n.op.toString()+" {"+n.getFilters().map(uw).join(" ,")+"}"}(t):"Filter"}class bR extends Ve{constructor(e,n,r){super(e,n,r),this.key=W.fromName(r.referenceValue)}matches(e){const n=W.comparator(e.key,this.key);return this.matchesComparison(n)}}class VR extends Ve{constructor(e,n){super(e,"in",n),this.keys=cw("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class OR extends Ve{constructor(e,n){super(e,"not-in",n),this.keys=cw("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function cw(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>W.fromName(r.referenceValue))}class LR extends Ve{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return df(n)&&ko(n.arrayValue,this.value)}}class MR extends Ve{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ko(this.value.arrayValue,n)}}class FR extends Ve{constructor(e,n){super(e,"not-in",n)}matches(e){if(ko(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!ko(this.value.arrayValue,n)}}class jR extends Ve{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!df(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ko(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UR{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.Pe=null}}function qg(t,e=null,n=[],r=[],i=null,s=null,o=null){return new UR(t,e,n,r,i,s,o)}function ff(t){const e=X(t);if(e.Pe===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>zh(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),yu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ts(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ts(r)).join(",")),e.Pe=n}return e.Pe}function pf(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!NR(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!lw(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Hg(t.startAt,e.startAt)&&Hg(t.endAt,e.endAt)}function Bh(t){return W.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function zR(t,e,n,r,i,s,o,l){return new fs(t,e,n,r,i,s,o,l)}function mf(t){return new fs(t)}function Wg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function hw(t){return t.collectionGroup!==null}function no(t){const e=X(t);if(e.Te===null){e.Te=[];const n=new Set;for(const s of e.explicitOrderBy)e.Te.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Ue(Ke.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.Te.push(new Po(s,r))}),n.has(Ke.keyField().canonicalString())||e.Te.push(new Po(Ke.keyField(),r))}return e.Te}function cn(t){const e=X(t);return e.Ie||(e.Ie=BR(e,no(t))),e.Ie}function BR(t,e){if(t.limitType==="F")return qg(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Po(i.field,s)});const n=t.endAt?new Bl(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Bl(t.startAt.position,t.startAt.inclusive):null;return qg(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function $h(t,e){const n=t.filters.concat([e]);return new fs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function $l(t,e,n){return new fs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function vu(t,e){return pf(cn(t),cn(e))&&t.limitType===e.limitType}function dw(t){return`${ff(cn(t))}|lt:${t.limitType}`}function mi(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>uw(i)).join(", ")}]`),yu(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>ts(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>ts(i)).join(",")),`Target(${r})`}(cn(t))}; limitType=${t.limitType})`}function wu(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):W.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of no(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const h=$g(o,l,u);return o.inclusive?h<=0:h<0}(r.startAt,no(r),i)||r.endAt&&!function(o,l,u){const h=$g(o,l,u);return o.inclusive?h>=0:h>0}(r.endAt,no(r),i))}(t,e)}function $R(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function fw(t){return(e,n)=>{let r=!1;for(const i of no(t)){const s=HR(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function HR(t,e,n){const r=t.field.isKeyField()?W.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),h=l.data.field(s);return u!==null&&h!==null?es(u,h):K(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return K(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){kr(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return J0(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qR=new Re(W.comparator);function Mn(){return qR}const pw=new Re(W.comparator);function zs(...t){let e=pw;for(const n of t)e=e.insert(n.key,n);return e}function mw(t){let e=pw;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function zr(){return ro()}function gw(){return ro()}function ro(){return new si(t=>t.toString(),(t,e)=>t.isEqual(e))}const WR=new Re(W.comparator),GR=new Ue(W.comparator);function re(...t){let e=GR;for(const n of t)e=e.add(n);return e}const KR=new Ue(ee);function QR(){return KR}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gf(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:jl(e)?"-0":e}}function yw(t){return{integerValue:""+t}}function JR(t,e){return IR(e)?yw(e):gf(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(){this._=void 0}}function XR(t,e,n){return t instanceof xo?function(i,s){const o={fields:{[Z0]:{stringValue:Y0},[tw]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&hf(s)&&(s=_u(s)),s&&(o.fields[ew]=s),{mapValue:o}}(n,e):t instanceof No?vw(t,e):t instanceof Do?ww(t,e):function(i,s){const o=_w(i,s),l=Gg(o)+Gg(i.Ee);return Uh(o)&&Uh(i.Ee)?yw(l):gf(i.serializer,l)}(t,e)}function YR(t,e,n){return t instanceof No?vw(t,e):t instanceof Do?ww(t,e):n}function _w(t,e){return t instanceof Hl?function(r){return Uh(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class xo extends Eu{}class No extends Eu{constructor(e){super(),this.elements=e}}function vw(t,e){const n=Ew(e);for(const r of t.elements)n.some(i=>mn(i,r))||n.push(r);return{arrayValue:{values:n}}}class Do extends Eu{constructor(e){super(),this.elements=e}}function ww(t,e){let n=Ew(e);for(const r of t.elements)n=n.filter(i=>!mn(i,r));return{arrayValue:{values:n}}}class Hl extends Eu{constructor(e,n){super(),this.serializer=e,this.Ee=n}}function Gg(t){return xe(t.integerValue||t.doubleValue)}function Ew(t){return df(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZR{constructor(e,n){this.field=e,this.transform=n}}function ek(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof No&&i instanceof No||r instanceof Do&&i instanceof Do?Zi(r.elements,i.elements,mn):r instanceof Hl&&i instanceof Hl?mn(r.Ee,i.Ee):r instanceof xo&&i instanceof xo}(t.transform,e.transform)}class tk{constructor(e,n){this.version=e,this.transformResults=n}}class hn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new hn}static exists(e){return new hn(void 0,e)}static updateTime(e){return new hn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function nl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Tu{}function Tw(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Sw(t.key,hn.none()):new Go(t.key,t.data,hn.none());{const n=t.data,r=vt.empty();let i=new Ue(Ke.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Pr(t.key,r,new Pt(i.toArray()),hn.none())}}function nk(t,e,n){t instanceof Go?function(i,s,o){const l=i.value.clone(),u=Qg(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Pr?function(i,s,o){if(!nl(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=Qg(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(Iw(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function io(t,e,n,r){return t instanceof Go?function(s,o,l,u){if(!nl(s.precondition,o))return l;const h=s.value.clone(),f=Jg(s.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Pr?function(s,o,l,u){if(!nl(s.precondition,o))return l;const h=Jg(s.fieldTransforms,u,o),f=o.data;return f.setAll(Iw(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(s,o,l){return nl(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function rk(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=_w(r.transform,i||null);s!=null&&(n===null&&(n=vt.empty()),n.set(r.field,s))}return n||null}function Kg(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Zi(r,i,(s,o)=>ek(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Go extends Tu{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Pr extends Tu{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Iw(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Qg(t,e,n){const r=new Map;ue(t.length===n.length,32656,{Ae:n.length,Re:t.length});for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,YR(o,l,n[i]))}return r}function Jg(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,XR(s,o,e))}return r}class Sw extends Tu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ik extends Tu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&nk(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=io(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=io(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=gw();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=Tw(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(J.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),re())}isEqual(e){return this.batchId===e.batchId&&Zi(this.mutations,e.mutations,(n,r)=>Kg(n,r))&&Zi(this.baseMutations,e.baseMutations,(n,r)=>Kg(n,r))}}class yf{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){ue(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return WR}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new yf(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ok{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ak{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De,ie;function lk(t){switch(t){case O.OK:return K(64938);case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return K(15467,{code:t})}}function Aw(t){if(t===void 0)return Ln("GRPC error has no .code"),O.UNKNOWN;switch(t){case De.OK:return O.OK;case De.CANCELLED:return O.CANCELLED;case De.UNKNOWN:return O.UNKNOWN;case De.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case De.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case De.INTERNAL:return O.INTERNAL;case De.UNAVAILABLE:return O.UNAVAILABLE;case De.UNAUTHENTICATED:return O.UNAUTHENTICATED;case De.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case De.NOT_FOUND:return O.NOT_FOUND;case De.ALREADY_EXISTS:return O.ALREADY_EXISTS;case De.PERMISSION_DENIED:return O.PERMISSION_DENIED;case De.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case De.ABORTED:return O.ABORTED;case De.OUT_OF_RANGE:return O.OUT_OF_RANGE;case De.UNIMPLEMENTED:return O.UNIMPLEMENTED;case De.DATA_LOSS:return O.DATA_LOSS;default:return K(39323,{code:t})}}(ie=De||(De={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uk=new fr([4294967295,4294967295],0);function Xg(t){const e=W0().encode(t),n=new F0;return n.update(e),new Uint8Array(n.digest())}function Yg(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new fr([n,r],0),new fr([i,s],0)]}class _f{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Bs(`Invalid padding: ${n}`);if(r<0)throw new Bs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Bs(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Bs(`Invalid padding when bitmap length is 0: ${n}`);this.fe=8*e.length-n,this.ge=fr.fromNumber(this.fe)}pe(e,n,r){let i=e.add(n.multiply(fr.fromNumber(r)));return i.compare(uk)===1&&(i=new fr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const n=Xg(e),[r,i]=Yg(n);for(let s=0;s<this.hashCount;s++){const o=this.pe(r,i,s);if(!this.ye(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new _f(s,i,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.fe===0)return;const n=Xg(e),[r,i]=Yg(n);for(let s=0;s<this.hashCount;s++){const o=this.pe(r,i,s);this.we(o)}}we(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Bs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,Ko.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Iu(J.min(),i,new Re(ee),Mn(),re())}}class Ko{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Ko(r,n,re(),re(),re())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,n,r,i){this.Se=e,this.removedTargetIds=n,this.key=r,this.be=i}}class Cw{constructor(e,n){this.targetId=e,this.De=n}}class Rw{constructor(e,n,r=Ye.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class Zg{constructor(){this.ve=0,this.Ce=ey(),this.Fe=Ye.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=re(),n=re(),r=re();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:K(38017,{changeType:s})}}),new Ko(this.Fe,this.Me,e,n,r)}ke(){this.xe=!1,this.Ce=ey()}qe(e,n){this.xe=!0,this.Ce=this.Ce.insert(e,n)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,ue(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class ck{constructor(e){this.We=e,this.Ge=new Map,this.ze=Mn(),this.je=Oa(),this.Je=Oa(),this.He=new Re(ee)}Ye(e){for(const n of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(n,e.be):this.Xe(n,e.key,e.be);for(const n of e.removedTargetIds)this.Xe(n,e.key,e.be)}et(e){this.forEachTarget(e,n=>{const r=this.tt(n);switch(e.state){case 0:this.nt(n)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(n);break;case 3:this.nt(n)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(n)&&(this.rt(n),r.Be(e.resumeToken));break;default:K(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Ge.forEach((r,i)=>{this.nt(i)&&n(i)})}it(e){const n=e.targetId,r=e.De.count,i=this.st(n);if(i){const s=i.target;if(Bh(s))if(r===0){const o=new W(s.path);this.Xe(n,o,at.newNoDocument(o,J.min()))}else ue(r===1,20013,{expectedCount:r});else{const o=this.ot(n);if(o!==r){const l=this._t(e),u=l?this.ut(l,e,o):1;if(u!==0){this.rt(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(n,h)}}}}}_t(e){const n=e.De.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,l;try{o=Er(r).toUint8Array()}catch(u){if(u instanceof X0)return _r("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new _f(o,i,s)}catch(u){return _r(u instanceof Bs?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,n,r){return n.De.count===r-this.ht(e,n.targetId)?0:2}ht(e,n){const r=this.We.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.We.lt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Xe(n,s,null),i++)}),i}Pt(e){const n=new Map;this.Ge.forEach((s,o)=>{const l=this.st(o);if(l){if(s.current&&Bh(l.target)){const u=new W(l.target.path);this.Tt(u).has(o)||this.It(o,u)||this.Xe(o,u,at.newNoDocument(u,e))}s.Ne&&(n.set(o,s.Le()),s.ke())}});let r=re();this.Je.forEach((s,o)=>{let l=!0;o.forEachWhile(u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ze.forEach((s,o)=>o.setReadTime(e));const i=new Iu(e,n,this.He,this.ze,r);return this.ze=Mn(),this.je=Oa(),this.Je=Oa(),this.He=new Re(ee),i}Ze(e,n){if(!this.nt(e))return;const r=this.It(e,n.key)?2:0;this.tt(e).qe(n.key,r),this.ze=this.ze.insert(n.key,n),this.je=this.je.insert(n.key,this.Tt(n.key).add(e)),this.Je=this.Je.insert(n.key,this.dt(n.key).add(e))}Xe(e,n,r){if(!this.nt(e))return;const i=this.tt(e);this.It(e,n)?i.qe(n,1):i.Qe(n),this.Je=this.Je.insert(n,this.dt(n).delete(e)),this.Je=this.Je.insert(n,this.dt(n).add(e)),r&&(this.ze=this.ze.insert(n,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const n=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let n=this.Ge.get(e);return n||(n=new Zg,this.Ge.set(e,n)),n}dt(e){let n=this.Je.get(e);return n||(n=new Ue(ee),this.Je=this.Je.insert(e,n)),n}Tt(e){let n=this.je.get(e);return n||(n=new Ue(ee),this.je=this.je.insert(e,n)),n}nt(e){const n=this.st(e)!==null;return n||$("WatchChangeAggregator","Detected inactive target",e),n}st(e){const n=this.Ge.get(e);return n&&n.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Zg),this.We.getRemoteKeysForTarget(e).forEach(n=>{this.Xe(e,n,null)})}It(e,n){return this.We.getRemoteKeysForTarget(e).has(n)}}function Oa(){return new Re(W.comparator)}function ey(){return new Re(W.comparator)}const hk={asc:"ASCENDING",desc:"DESCENDING"},dk={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fk={and:"AND",or:"OR"};class pk{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Hh(t,e){return t.useProto3Json||yu(e)?e:{value:e}}function ql(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function kw(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function mk(t,e){return ql(t,e.toTimestamp())}function dn(t){return ue(!!t,49232),J.fromTimestamp(function(n){const r=wr(n);return new ve(r.seconds,r.nanos)}(t))}function vf(t,e){return qh(t,e).canonicalString()}function qh(t,e){const n=function(i){return new pe(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Pw(t){const e=pe.fromString(t);return ue(Vw(e),10190,{key:e.toString()}),e}function Wh(t,e){return vf(t.databaseId,e.path)}function Dc(t,e){const n=Pw(e);if(n.get(1)!==t.databaseId.projectId)throw new B(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new B(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new W(Nw(n))}function xw(t,e){return vf(t.databaseId,e)}function gk(t){const e=Pw(t);return e.length===4?pe.emptyPath():Nw(e)}function Gh(t){return new pe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Nw(t){return ue(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function ty(t,e,n){return{name:Wh(t,e),fields:n.value.mapValue.fields}}function yk(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:K(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(ue(f===void 0||typeof f=="string",58123),Ye.fromBase64String(f||"")):(ue(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ye.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const f=h.code===void 0?O.UNKNOWN:Aw(h.code);return new B(f,h.message||"")}(o);n=new Rw(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Dc(t,r.document.name),s=dn(r.document.updateTime),o=r.document.createTime?dn(r.document.createTime):J.min(),l=new vt({mapValue:{fields:r.document.fields}}),u=at.newFoundDocument(i,s,o,l),h=r.targetIds||[],f=r.removedTargetIds||[];n=new rl(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Dc(t,r.document),s=r.readTime?dn(r.readTime):J.min(),o=at.newNoDocument(i,s),l=r.removedTargetIds||[];n=new rl([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Dc(t,r.document),s=r.removedTargetIds||[];n=new rl([],s,i,null)}else{if(!("filter"in e))return K(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new ak(i,s),l=r.targetId;n=new Cw(l,o)}}return n}function _k(t,e){let n;if(e instanceof Go)n={update:ty(t,e.key,e.value)};else if(e instanceof Sw)n={delete:Wh(t,e.key)};else if(e instanceof Pr)n={update:ty(t,e.key,e.data),updateMask:Rk(e.fieldMask)};else{if(!(e instanceof ik))return K(16599,{Rt:e.type});n={verify:Wh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof xo)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof No)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Do)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Hl)return{fieldPath:o.field.canonicalString(),increment:l.Ee};throw K(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:mk(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:K(27497)}(t,e.precondition)),n}function vk(t,e){return t&&t.length>0?(ue(e!==void 0,14353),t.map(n=>function(i,s){let o=i.updateTime?dn(i.updateTime):dn(s);return o.isEqual(J.min())&&(o=dn(s)),new tk(o,i.transformResults||[])}(n,e))):[]}function wk(t,e){return{documents:[xw(t,e.path)]}}function Ek(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=xw(t,i);const s=function(h){if(h.length!==0)return bw(en.create(h,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(h){if(h.length!==0)return h.map(f=>function(p){return{field:gi(p.field),direction:Sk(p.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Hh(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:n,parent:i}}function Tk(t){let e=gk(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){ue(r===1,65062);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(m){const p=Dw(m);return p instanceof en&&aw(p)?p.getFilters():[p]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(p=>function(k){return new Po(yi(k.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(p))}(n.orderBy));let l=null;n.limit&&(l=function(m){let p;return p=typeof m=="object"?m.value:m,yu(p)?null:p}(n.limit));let u=null;n.startAt&&(u=function(m){const p=!!m.before,I=m.values||[];return new Bl(I,p)}(n.startAt));let h=null;return n.endAt&&(h=function(m){const p=!m.before,I=m.values||[];return new Bl(I,p)}(n.endAt)),zR(e,i,o,s,l,"F",u,h)}function Ik(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K(28987,{purpose:i})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Dw(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=yi(n.unaryFilter.field);return Ve.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=yi(n.unaryFilter.field);return Ve.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=yi(n.unaryFilter.field);return Ve.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=yi(n.unaryFilter.field);return Ve.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return K(61313);default:return K(60726)}}(t):t.fieldFilter!==void 0?function(n){return Ve.create(yi(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return K(58110);default:return K(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return en.create(n.compositeFilter.filters.map(r=>Dw(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return K(1026)}}(n.compositeFilter.op))}(t):K(30097,{filter:t})}function Sk(t){return hk[t]}function Ak(t){return dk[t]}function Ck(t){return fk[t]}function gi(t){return{fieldPath:t.canonicalString()}}function yi(t){return Ke.fromServerFormat(t.fieldPath)}function bw(t){return t instanceof Ve?function(n){if(n.op==="=="){if(Bg(n.value))return{unaryFilter:{field:gi(n.field),op:"IS_NAN"}};if(zg(n.value))return{unaryFilter:{field:gi(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Bg(n.value))return{unaryFilter:{field:gi(n.field),op:"IS_NOT_NAN"}};if(zg(n.value))return{unaryFilter:{field:gi(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:gi(n.field),op:Ak(n.op),value:n.value}}}(t):t instanceof en?function(n){const r=n.getFilters().map(i=>bw(i));return r.length===1?r[0]:{compositeFilter:{op:Ck(n.op),filters:r}}}(t):K(54877,{filter:t})}function Rk(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Vw(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,n,r,i,s=J.min(),o=J.min(),l=Ye.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new tr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kk{constructor(e){this.gt=e}}function Pk(t){const e=Tk({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?$l(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xk{constructor(){this.Dn=new Nk}addToCollectionParentIndex(e,n){return this.Dn.add(n),L.resolve()}getCollectionParents(e,n){return L.resolve(this.Dn.getEntries(n))}addFieldIndex(e,n){return L.resolve()}deleteFieldIndex(e,n){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,n){return L.resolve()}getDocumentsMatchingTarget(e,n){return L.resolve(null)}getIndexType(e,n){return L.resolve(0)}getFieldIndexes(e,n){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,n){return L.resolve(vr.min())}getMinOffsetFromCollectionGroup(e,n){return L.resolve(vr.min())}updateCollectionGroup(e,n,r){return L.resolve()}updateIndexEntries(e,n){return L.resolve()}}class Nk{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new Ue(pe.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ue(pe.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ow=41943040;class yt{static withCacheSize(e){return new yt(e,yt.DEFAULT_COLLECTION_PERCENTILE,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */yt.DEFAULT_COLLECTION_PERCENTILE=10,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,yt.DEFAULT=new yt(Ow,yt.DEFAULT_COLLECTION_PERCENTILE,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),yt.DISABLED=new yt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new ns(0)}static ur(){return new ns(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ry="LruGarbageCollector",Dk=1048576;function iy([t,e],[n,r]){const i=ee(t,n);return i===0?ee(e,r):i}class bk{constructor(e){this.Tr=e,this.buffer=new Ue(iy),this.Ir=0}dr(){return++this.Ir}Er(e){const n=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();iy(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class Vk{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){$(ry,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){ds(n)?$(ry,"Ignoring IndexedDB error during garbage collection: ",n):await hs(n)}await this.Rr(3e5)})}}class Ok{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.mr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return L.resolve(gu.ue);const r=new bk(n);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Vr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),L.resolve(ny)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ny):this.pr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,n){let r,i,s,o,l,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(r=m,l=Date.now(),this.removeTargets(e,r,n))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),pi()<=ne.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),L.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}}function Lk(t,e){return new Ok(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mk{constructor(){this.changes=new si(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,at.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?L.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fk{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jk{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&io(r.mutation,i,Pt.empty(),ve.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,n,r=re()){const i=zr();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=zs();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=zr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,re()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=Mn();const o=ro(),l=function(){return ro()}();return n.forEach((u,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Pr)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),io(f.mutation,h,f.mutation.getFieldMask(),ve.now())):o.set(h.key,Pt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>o.set(h,f)),n.forEach((h,f)=>{var m;return l.set(h,new Fk(f,(m=o.get(h))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=ro();let i=new Re((o,l)=>o-l),s=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let f=r.get(u)||Pt.empty();f=l.applyToLocalView(h,f),r.set(u,f);const m=(i.get(l.batchId)||re()).add(u);i=i.insert(l.batchId,m)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,m=gw();f.forEach(p=>{if(!s.has(p)){const I=Tw(n.get(p),r.get(p));I!==null&&m.set(p,I),s=s.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return L.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return W.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):hw(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):L.resolve(zr());let l=Ao,u=s;return o.next(h=>L.forEach(h,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),s.get(f)?L.resolve():this.remoteDocumentCache.getEntry(e,f).next(p=>{u=u.insert(f,p)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,re())).next(f=>({batchId:l,changes:mw(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new W(n)).next(r=>{let i=zs();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=zs();return this.indexManager.getCollectionParents(e,s).next(l=>L.forEach(l,u=>{const h=function(m,p){return new fs(p,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((m,p)=>{o=o.insert(m,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,at.newInvalidDocument(f)))});let l=zs();return o.forEach((u,h)=>{const f=s.get(u);f!==void 0&&io(f.mutation,h,Pt.empty(),ve.now()),wu(n,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uk{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,n){return L.resolve(this.Br.get(n))}saveBundleMetadata(e,n){return this.Br.set(n.id,function(i){return{id:i.id,version:i.version,createTime:dn(i.createTime)}}(n)),L.resolve()}getNamedQuery(e,n){return L.resolve(this.Lr.get(n))}saveNamedQuery(e,n){return this.Lr.set(n.name,function(i){return{name:i.name,query:Pk(i.bundledQuery),readTime:dn(i.readTime)}}(n)),L.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zk{constructor(){this.overlays=new Re(W.comparator),this.kr=new Map}getOverlay(e,n){return L.resolve(this.overlays.get(n))}getOverlays(e,n){const r=zr();return L.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.wt(e,n,s)}),L.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),L.resolve()}getOverlaysForCollection(e,n,r){const i=zr(),s=n.length+1,o=new W(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return L.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Re((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=zr(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=zr(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return L.resolve(l)}wt(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ok(n,r));let s=this.kr.get(n);s===void 0&&(s=re(),this.kr.set(n,s)),this.kr.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bk{constructor(){this.sessionToken=Ye.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,L.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(){this.qr=new Ue(ze.Qr),this.$r=new Ue(ze.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,n){const r=new ze(e,n);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Wr(new ze(e,n))}Gr(e,n){e.forEach(r=>this.removeReference(r,n))}zr(e){const n=new W(new pe([])),r=new ze(n,e),i=new ze(n,e+1),s=[];return this.$r.forEachInRange([r,i],o=>{this.Wr(o),s.push(o.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const n=new W(new pe([])),r=new ze(n,e),i=new ze(n,e+1);let s=re();return this.$r.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new ze(e,0),r=this.qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class ze{constructor(e,n){this.key=e,this.Hr=n}static Qr(e,n){return W.comparator(e.key,n.key)||ee(e.Hr,n.Hr)}static Ur(e,n){return ee(e.Hr,n.Hr)||W.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $k{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.er=1,this.Yr=new Ue(ze.Qr)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new sk(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.Yr=this.Yr.add(new ze(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return L.resolve(o)}lookupMutationBatch(e,n){return L.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.Xr(r),s=i<0?0:i;return L.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?cf:this.er-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new ze(n,0),i=new ze(n,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],o=>{const l=this.Zr(o.Hr);s.push(l)}),L.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Ue(ee);return n.forEach(i=>{const s=new ze(i,0),o=new ze(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,o],l=>{r=r.add(l.Hr)})}),L.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;W.isDocumentKey(s)||(s=s.child(""));const o=new ze(new W(s),0);let l=new Ue(ee);return this.Yr.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(u.Hr)),!0)},o),L.resolve(this.ei(l))}ei(e){const n=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){ue(this.ti(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return L.forEach(n.mutations,i=>{const s=new ze(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,n){const r=new ze(n,0),i=this.Yr.firstAfterOrEqual(r);return L.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}ti(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hk{constructor(e){this.ni=e,this.docs=function(){return new Re(W.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.ni(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return L.resolve(r?r.document.mutableCopy():at.newInvalidDocument(n))}getEntries(e,n){let r=Mn();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():at.newInvalidDocument(i))}),L.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Mn();const o=n.path,l=new W(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||vR(_R(f),r)<=0||(i.has(f.key)||wu(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return L.resolve(s)}getAllFromCollectionGroup(e,n,r,i){K(9500)}ri(e,n){return L.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new qk(this)}getSize(e){return L.resolve(this.size)}}class qk extends Mk{constructor(e){super(),this.Or=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),L.waitFor(n)}getFromCache(e,n){return this.Or.getEntry(e,n)}getAllFromCache(e,n){return this.Or.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wk{constructor(e){this.persistence=e,this.ii=new si(n=>ff(n),pf),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.si=0,this.oi=new wf,this.targetCount=0,this._i=ns.ar()}forEachTarget(e,n){return this.ii.forEach((r,i)=>n(i)),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.si&&(this.si=n),L.resolve()}hr(e){this.ii.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this._i=new ns(n),this.highestTargetId=n),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,n){return this.hr(n),this.targetCount+=1,L.resolve()}updateTargetData(e,n){return this.hr(n),L.resolve()}removeTargetData(e,n){return this.ii.delete(n.target),this.oi.zr(n.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.ii.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.ii.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),L.waitFor(s).next(()=>i)}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,n){const r=this.ii.get(n)||null;return L.resolve(r)}addMatchingKeys(e,n,r){return this.oi.Kr(n,r),L.resolve()}removeMatchingKeys(e,n,r){this.oi.Gr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),L.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.oi.zr(n),L.resolve()}getMatchingKeysForTargetId(e,n){const r=this.oi.Jr(n);return L.resolve(r)}containsKey(e,n){return L.resolve(this.oi.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e,n){this.ai={},this.overlays={},this.ui=new gu(0),this.ci=!1,this.ci=!0,this.li=new Bk,this.referenceDelegate=e(this),this.hi=new Wk(this),this.indexManager=new xk,this.remoteDocumentCache=function(i){return new Hk(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new kk(n),this.Ti=new Uk(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new zk,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ai[e.toKey()];return r||(r=new $k(n,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,n,r){$("MemoryPersistence","Starting transaction:",e);const i=new Gk(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,n){return L.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,n)))}}class Gk extends ER{constructor(e){super(),this.currentSequenceNumber=e}}class Ef{constructor(e){this.persistence=e,this.Ai=new wf,this.Ri=null}static Vi(e){return new Ef(e)}get mi(){if(this.Ri)return this.Ri;throw K(60996)}addReference(e,n,r){return this.Ai.addReference(r,n),this.mi.delete(r.toString()),L.resolve()}removeReference(e,n,r){return this.Ai.removeReference(r,n),this.mi.add(r.toString()),L.resolve()}markPotentiallyOrphaned(e,n){return this.mi.add(n.toString()),L.resolve()}removeTarget(e,n){this.Ai.zr(n.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}Ii(){this.Ri=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.mi,r=>{const i=W.fromPath(r);return this.fi(e,i).next(s=>{s||n.removeEntry(i,J.min())})}).next(()=>(this.Ri=null,n.apply(e)))}updateLimboDocument(e,n){return this.fi(e,n).next(r=>{r?this.mi.delete(n.toString()):this.mi.add(n.toString())})}Pi(e){return 0}fi(e,n){return L.or([()=>L.resolve(this.Ai.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ei(e,n)])}}class Wl{constructor(e,n){this.persistence=e,this.gi=new si(r=>SR(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Lk(this,n)}static Vi(e,n){return new Wl(e,n)}Ii(){}di(e){return L.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}mr(e){const n=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(i=>r+i))}yr(e){let n=0;return this.gr(e,r=>{n++}).next(()=>n)}gr(e,n){return L.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?L.resolve():n(i)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,o=>this.Sr(e,o,n).next(l=>{l||(r++,s.removeEntry(o,J.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.gi.set(n,e.currentSequenceNumber),L.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.gi.set(r,e.currentSequenceNumber),L.resolve()}removeReference(e,n,r){return this.gi.set(r,e.currentSequenceNumber),L.resolve()}updateLimboDocument(e,n){return this.gi.set(n,e.currentSequenceNumber),L.resolve()}Pi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=el(e.data.value)),n}Sr(e,n,r){return L.or([()=>this.persistence.Ei(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const i=this.gi.get(n);return L.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.Is=r,this.ds=i}static Es(e,n){let r=re(),i=re();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Tf(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kk{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qk{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return M1()?8:TR(ut())>0?6:4}()}initialize(e,n){this.gs=e,this.indexManager=n,this.As=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.ps(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ys(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new Kk;return this.ws(e,n,o).next(l=>{if(s.result=l,this.Rs)return this.Ss(e,n,o,l.size)})}).next(()=>s.result)}Ss(e,n,r,i){return r.documentReadCount<this.Vs?(pi()<=ne.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",mi(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),L.resolve()):(pi()<=ne.DEBUG&&$("QueryEngine","Query:",mi(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(pi()<=ne.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",mi(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,cn(n))):L.resolve())}ps(e,n){if(Wg(n))return L.resolve(null);let r=cn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=$l(n,null,"F"),r=cn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=re(...s);return this.gs.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.bs(n,l);return this.Ds(n,h,o,u.readTime)?this.ps(e,$l(n,null,"F")):this.vs(e,h,n,u)}))})))}ys(e,n,r,i){return Wg(n)||i.isEqual(J.min())?L.resolve(null):this.gs.getDocuments(e,r).next(s=>{const o=this.bs(n,s);return this.Ds(n,o,r,i)?L.resolve(null):(pi()<=ne.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),mi(n)),this.vs(e,o,n,yR(i,Ao)).next(l=>l))})}bs(e,n){let r=new Ue(fw(e));return n.forEach((i,s)=>{wu(e,s)&&(r=r.add(s))}),r}Ds(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,n,r){return pi()<=ne.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",mi(n)),this.gs.getDocumentsMatchingQuery(e,n,vr.min(),r)}vs(e,n,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If="LocalStore",Jk=3e8;class Xk{constructor(e,n,r,i){this.persistence=e,this.Cs=n,this.serializer=i,this.Fs=new Re(ee),this.Ms=new si(s=>ff(s),pf),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new jk(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Fs))}}function Yk(t,e,n,r){return new Xk(t,e,n,r)}async function Mw(t,e){const n=X(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.Ns(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=re();for(const h of i){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(h=>({Bs:h,removedBatchIds:o,addedBatchIds:l}))})})}function Zk(t,e){const n=X(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const m=h.batch,p=m.keys();let I=L.resolve();return p.forEach(k=>{I=I.next(()=>f.getEntry(u,k)).next(N=>{const V=h.docVersions.get(k);ue(V!==null,48541),N.version.compareTo(V)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),I.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=re();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function Fw(t){const e=X(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.hi.getLastRemoteSnapshotVersion(n))}function eP(t,e){const n=X(t),r=e.snapshotVersion;let i=n.Fs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.Os.newChangeBuffer({trackRemovals:!0});i=n.Fs;const l=[];e.targetChanges.forEach((f,m)=>{const p=i.get(m);if(!p)return;l.push(n.hi.removeMatchingKeys(s,f.removedDocuments,m).next(()=>n.hi.addMatchingKeys(s,f.addedDocuments,m)));let I=p.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?I=I.withResumeToken(Ye.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),i=i.insert(m,I),function(N,V,S){return N.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Jk?!0:S.addedDocuments.size+S.modifiedDocuments.size+S.removedDocuments.size>0}(p,I,f)&&l.push(n.hi.updateTargetData(s,I))});let u=Mn(),h=re();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(tP(s,o,e.documentUpdates).next(f=>{u=f.Ls,h=f.ks})),!r.isEqual(J.min())){const f=n.hi.getLastRemoteSnapshotVersion(s).next(m=>n.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return L.waitFor(l).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(n.Fs=i,s))}function tP(t,e,n){let r=re(),i=re();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=Mn();return n.forEach((l,u)=>{const h=s.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(J.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):$(If,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ls:o,ks:i}})}function nP(t,e){const n=X(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=cf),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function rP(t,e){const n=X(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.hi.getTargetData(r,e).next(s=>s?(i=s,L.resolve(i)):n.hi.allocateTargetId(r).next(o=>(i=new tr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.Fs=n.Fs.insert(r.targetId,r),n.Ms.set(e,r.targetId)),r})}async function Kh(t,e,n){const r=X(t),i=r.Fs.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!ds(o))throw o;$(If,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function sy(t,e,n){const r=X(t);let i=J.min(),s=re();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){const m=X(u),p=m.Ms.get(f);return p!==void 0?L.resolve(m.Fs.get(p)):m.hi.getTargetData(h,f)}(r,o,cn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(o,l.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,n?i:J.min(),n?s:re())).next(l=>(iP(r,$R(e),l),{documents:l,qs:s})))}function iP(t,e,n){let r=t.xs.get(e)||J.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.xs.set(e,r)}class oy{constructor(){this.activeTargetIds=QR()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class sP{constructor(){this.Fo=new oy,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,n,r){this.Mo[e]=n}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new oy,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oP{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay="ConnectivityMonitor";class ly{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){$(ay,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){$(ay,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let La=null;function Qh(){return La===null?La=function(){return 268435456+Math.round(2147483648*Math.random())}():La++,"0x"+La.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc="RestConnection",aP={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class lP{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=n+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Ul?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,n,r,i,s){const o=Qh(),l=this.Go(e,n.toUriEncodedString());$(bc,`Sending RPC '${e}' ${o}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,s);const{host:h}=new URL(l),f=as(h);return this.jo(e,l,u,r,f).then(m=>($(bc,`Received RPC '${e}' ${o}: `,m),m),m=>{throw _r(bc,`RPC '${e}' ${o} failed with error: `,m,"url: ",l,"request:",r),m})}Jo(e,n,r,i,s,o){return this.Wo(e,n,r,i,s)}zo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,n){const r=aP[e];return`${this.$o}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uP{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it="WebChannelConnection";class cP extends lP{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,n,r,i,s){const o=Qh();return new Promise((l,u)=>{const h=new j0;h.setWithCredentials(!0),h.listenOnce(U0.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Za.NO_ERROR:const m=h.getResponseJson();$(it,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),l(m);break;case Za.TIMEOUT:$(it,`RPC '${e}' ${o} timed out`),u(new B(O.DEADLINE_EXCEEDED,"Request time out"));break;case Za.HTTP_ERROR:const p=h.getStatus();if($(it,`RPC '${e}' ${o} failed with status:`,p,"response text:",h.getResponseText()),p>0){let I=h.getResponseJson();Array.isArray(I)&&(I=I[0]);const k=I==null?void 0:I.error;if(k&&k.status&&k.message){const N=function(S){const v=S.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(v)>=0?v:O.UNKNOWN}(k.status);u(new B(N,k.message))}else u(new B(O.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new B(O.UNAVAILABLE,"Connection failed."));break;default:K(9055,{c_:e,streamId:o,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{$(it,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);$(it,`RPC '${e}' ${o} sending request:`,i),h.send(n,"POST",f,r,15)})}P_(e,n,r){const i=Qh(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=$0(),l=B0(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=s.join("");$(it,`Creating RPC '${e}' stream ${i}: ${f}`,u);const m=o.createWebChannel(f,u);this.T_(m);let p=!1,I=!1;const k=new uP({Ho:V=>{I?$(it,`Not sending because RPC '${e}' stream ${i} is closed:`,V):(p||($(it,`Opening RPC '${e}' stream ${i} transport.`),m.open(),p=!0),$(it,`RPC '${e}' stream ${i} sending:`,V),m.send(V))},Yo:()=>m.close()}),N=(V,S,v)=>{V.listen(S,A=>{try{v(A)}catch(b){setTimeout(()=>{throw b},0)}})};return N(m,Us.EventType.OPEN,()=>{I||($(it,`RPC '${e}' stream ${i} transport opened.`),k.s_())}),N(m,Us.EventType.CLOSE,()=>{I||(I=!0,$(it,`RPC '${e}' stream ${i} transport closed`),k.__(),this.I_(m))}),N(m,Us.EventType.ERROR,V=>{I||(I=!0,_r(it,`RPC '${e}' stream ${i} transport errored. Name:`,V.name,"Message:",V.message),k.__(new B(O.UNAVAILABLE,"The operation could not be completed")))}),N(m,Us.EventType.MESSAGE,V=>{var S;if(!I){const v=V.data[0];ue(!!v,16349);const A=v,b=(A==null?void 0:A.error)||((S=A[0])===null||S===void 0?void 0:S.error);if(b){$(it,`RPC '${e}' stream ${i} received error:`,b);const j=b.status;let F=function(_){const E=De[_];if(E!==void 0)return Aw(E)}(j),w=b.message;F===void 0&&(F=O.INTERNAL,w="Unknown error status: "+j+" with message "+b.message),I=!0,k.__(new B(F,w)),m.close()}else $(it,`RPC '${e}' stream ${i} received:`,v),k.a_(v)}}),N(l,z0.STAT_EVENT,V=>{V.stat===Mh.PROXY?$(it,`RPC '${e}' stream ${i} detected buffering proxy`):V.stat===Mh.NOPROXY&&$(it,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.o_()},0),k}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(n=>n===e)}}function Vc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Su(t){return new pk(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e,n,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=n,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const n=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,n-r);i>0&&$("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy="PersistentStream";class Uw{constructor(e,n,r,i,s,o,l,u){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new jw(e,n)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():n&&n.code===O.RESOURCE_EXHAUSTED?(Ln(n.toString()),Ln("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):n&&n.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(n)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),n=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===n&&this.W_(r,i)},r=>{e(()=>{const i=new B(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,n){const r=this.K_(this.b_);this.stream=this.z_(e,n),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return $(uy,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return n=>{this.Fi.enqueueAndForget(()=>this.b_===e?n():($(uy,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class hP extends Uw{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}z_(e,n){return this.connection.P_("Listen",e,n)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const n=yk(this.serializer,e),r=function(s){if(!("targetChange"in s))return J.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?dn(o.readTime):J.min()}(e);return this.listener.J_(n,r)}H_(e){const n={};n.database=Gh(this.serializer),n.addTarget=function(s,o){let l;const u=o.target;if(l=Bh(u)?{documents:wk(s,u)}:{query:Ek(s,u).Vt},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=kw(s,o.resumeToken);const h=Hh(s,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(J.min())>0){l.readTime=ql(s,o.snapshotVersion.toTimestamp());const h=Hh(s,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=Ik(this.serializer,e);r&&(n.labels=r),this.k_(n)}Y_(e){const n={};n.database=Gh(this.serializer),n.removeTarget=e,this.k_(n)}}class dP extends Uw{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,n){return this.connection.P_("Write",e,n)}j_(e){return ue(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ue(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){ue(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const n=vk(e.writeResults,e.commitTime),r=dn(e.commitTime);return this.listener.ta(r,n)}na(){const e={};e.database=Gh(this.serializer),this.k_(e)}X_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>_k(this.serializer,r))};this.k_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fP{}class pP extends fP{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new B(O.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Wo(e,qh(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new B(O.UNKNOWN,s.toString())})}Jo(e,n,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Jo(e,qh(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new B(O.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class mP{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Ln(n),this._a=!1):$("OnlineStateTracker",n)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni="RemoteStore";class gP{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(o=>{r.enqueueAndForget(async()=>{oi(this)&&($(ni,"Restarting streams for network reachability change."),await async function(u){const h=X(u);h.Ia.add(4),await Qo(h),h.Aa.set("Unknown"),h.Ia.delete(4),await Au(h)}(this))})}),this.Aa=new mP(r,i)}}async function Au(t){if(oi(t))for(const e of t.da)await e(!0)}async function Qo(t){for(const e of t.da)await e(!1)}function zw(t,e){const n=X(t);n.Ta.has(e.targetId)||(n.Ta.set(e.targetId,e),Rf(n)?Cf(n):ps(n).x_()&&Af(n,e))}function Sf(t,e){const n=X(t),r=ps(n);n.Ta.delete(e),r.x_()&&Bw(n,e),n.Ta.size===0&&(r.x_()?r.B_():oi(n)&&n.Aa.set("Unknown"))}function Af(t,e){if(t.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}ps(t).H_(e)}function Bw(t,e){t.Ra.$e(e),ps(t).Y_(e)}function Cf(t){t.Ra=new ck({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>t.Ta.get(e)||null,lt:()=>t.datastore.serializer.databaseId}),ps(t).start(),t.Aa.aa()}function Rf(t){return oi(t)&&!ps(t).M_()&&t.Ta.size>0}function oi(t){return X(t).Ia.size===0}function $w(t){t.Ra=void 0}async function yP(t){t.Aa.set("Online")}async function _P(t){t.Ta.forEach((e,n)=>{Af(t,e)})}async function vP(t,e){$w(t),Rf(t)?(t.Aa.la(e),Cf(t)):t.Aa.set("Unknown")}async function wP(t,e,n){if(t.Aa.set("Online"),e instanceof Rw&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const l of s.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.Ta.delete(l),i.Ra.removeTarget(l))}(t,e)}catch(r){$(ni,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Gl(t,r)}else if(e instanceof rl?t.Ra.Ye(e):e instanceof Cw?t.Ra.it(e):t.Ra.et(e),!n.isEqual(J.min()))try{const r=await Fw(t.localStore);n.compareTo(r)>=0&&await function(s,o){const l=s.Ra.Pt(o);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.Ta.get(h);f&&s.Ta.set(h,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,h)=>{const f=s.Ta.get(u);if(!f)return;s.Ta.set(u,f.withResumeToken(Ye.EMPTY_BYTE_STRING,f.snapshotVersion)),Bw(s,u);const m=new tr(f.target,u,h,f.sequenceNumber);Af(s,m)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){$(ni,"Failed to raise snapshot:",r),await Gl(t,r)}}async function Gl(t,e,n){if(!ds(e))throw e;t.Ia.add(1),await Qo(t),t.Aa.set("Offline"),n||(n=()=>Fw(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{$(ni,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await Au(t)})}function Hw(t,e){return e().catch(n=>Gl(t,n,e))}async function Cu(t){const e=X(t),n=Ir(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:cf;for(;EP(e);)try{const i=await nP(e.localStore,r);if(i===null){e.Pa.length===0&&n.B_();break}r=i.batchId,TP(e,i)}catch(i){await Gl(e,i)}qw(e)&&Ww(e)}function EP(t){return oi(t)&&t.Pa.length<10}function TP(t,e){t.Pa.push(e);const n=Ir(t);n.x_()&&n.Z_&&n.X_(e.mutations)}function qw(t){return oi(t)&&!Ir(t).M_()&&t.Pa.length>0}function Ww(t){Ir(t).start()}async function IP(t){Ir(t).na()}async function SP(t){const e=Ir(t);for(const n of t.Pa)e.X_(n.mutations)}async function AP(t,e,n){const r=t.Pa.shift(),i=yf.from(r,e,n);await Hw(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await Cu(t)}async function CP(t,e){e&&Ir(t).Z_&&await async function(r,i){if(function(o){return lk(o)&&o!==O.ABORTED}(i.code)){const s=r.Pa.shift();Ir(r).N_(),await Hw(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Cu(r)}}(t,e),qw(t)&&Ww(t)}async function cy(t,e){const n=X(t);n.asyncQueue.verifyOperationInProgress(),$(ni,"RemoteStore received new credentials");const r=oi(n);n.Ia.add(3),await Qo(n),r&&n.Aa.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await Au(n)}async function RP(t,e){const n=X(t);e?(n.Ia.delete(2),await Au(n)):e||(n.Ia.add(2),await Qo(n),n.Aa.set("Unknown"))}function ps(t){return t.Va||(t.Va=function(n,r,i){const s=X(n);return s.ia(),new hP(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Zo:yP.bind(null,t),e_:_P.bind(null,t),n_:vP.bind(null,t),J_:wP.bind(null,t)}),t.da.push(async e=>{e?(t.Va.N_(),Rf(t)?Cf(t):t.Aa.set("Unknown")):(await t.Va.stop(),$w(t))})),t.Va}function Ir(t){return t.ma||(t.ma=function(n,r,i){const s=X(n);return s.ia(),new dP(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),e_:IP.bind(null,t),n_:CP.bind(null,t),ea:SP.bind(null,t),ta:AP.bind(null,t)}),t.da.push(async e=>{e?(t.ma.N_(),await Cu(t)):(await t.ma.stop(),t.Pa.length>0&&($(ni,`Stopping write stream with ${t.Pa.length} pending writes`),t.Pa=[]))})),t.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Hr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new kf(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Pf(t,e){if(Ln("AsyncQueue",`${e}: ${t}`),ds(t))return new B(O.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{static emptySet(e){return new Bi(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||W.comparator(n.key,r.key):(n,r)=>W.comparator(n.key,r.key),this.keyedMap=zs(),this.sortedSet=new Re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Bi)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Bi;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hy{constructor(){this.fa=new Re(W.comparator)}track(e){const n=e.doc.key,r=this.fa.get(n);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(n,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(n):e.type===1&&r.type===2?this.fa=this.fa.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):K(63341,{At:e,ga:r}):this.fa=this.fa.insert(n,e)}pa(){const e=[];return this.fa.inorderTraversal((n,r)=>{e.push(r)}),e}}class rs{constructor(e,n,r,i,s,o,l,u,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new rs(e,n,Bi.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&vu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kP{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class PP{constructor(){this.queries=dy(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(n,r){const i=X(n),s=i.queries;i.queries=dy(),s.forEach((o,l)=>{for(const u of l.wa)u.onError(r)})})(this,new B(O.ABORTED,"Firestore shutting down"))}}function dy(){return new si(t=>dw(t),vu)}async function xP(t,e){const n=X(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new kP,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await n.onListen(i,!0);break;case 1:s.ya=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const l=Pf(o,`Initialization of query '${mi(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.wa.push(e),e.va(n.onlineState),s.ya&&e.Ca(s.ya)&&xf(n)}async function NP(t,e){const n=X(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.wa.indexOf(e);o>=0&&(s.wa.splice(o,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function DP(t,e){const n=X(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const l of o.wa)l.Ca(i)&&(r=!0);o.ya=i}}r&&xf(n)}function bP(t,e,n){const r=X(t),i=r.queries.get(e);if(i)for(const s of i.wa)s.onError(n);r.queries.delete(e)}function xf(t){t.Da.forEach(e=>{e.next()})}var Jh,fy;(fy=Jh||(Jh={})).Fa="default",fy.Cache="cache";class VP{constructor(e,n,r){this.query=e,this.Ma=n,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new rs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),n=!0):this.Ba(e,this.onlineState)&&(this.La(e),n=!0),this.Oa=e,n}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let n=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),n=!0),n}Ba(e,n){if(!e.fromCache||!this.ba())return!0;const r=n!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const n=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}La(e){e=rs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Jh.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e){this.key=e}}class Kw{constructor(e){this.key=e}}class OP{constructor(e,n){this.query=e,this.Ha=n,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=re(),this.mutatedKeys=re(),this.Xa=fw(e),this.eu=new Bi(this.Xa)}get tu(){return this.Ha}nu(e,n){const r=n?n.ru:new hy,i=n?n.eu:this.eu;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{const p=i.get(f),I=wu(this.query,m)?m:null,k=!!p&&this.mutatedKeys.has(p.key),N=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let V=!1;p&&I?p.data.isEqual(I.data)?k!==N&&(r.track({type:3,doc:I}),V=!0):this.iu(p,I)||(r.track({type:2,doc:I}),V=!0,(u&&this.Xa(I,u)>0||h&&this.Xa(I,h)<0)&&(l=!0)):!p&&I?(r.track({type:0,doc:I}),V=!0):p&&!I&&(r.track({type:1,doc:p}),V=!0,(u||h)&&(l=!0)),V&&(I?(o=o.add(I),s=N?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{eu:o,ru:r,Ds:l,mutatedKeys:s}}iu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort((f,m)=>function(I,k){const N=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K(20277,{At:V})}};return N(I)-N(k)}(f.type,m.type)||this.Xa(f.doc,m.doc)),this.su(r),i=i!=null&&i;const l=n&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,h=u!==this.Ya;return this.Ya=u,o.length!==0||h?{snapshot:new rs(this.query,e.eu,s,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new hy,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(n=>this.Ha=this.Ha.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ha=this.Ha.delete(n)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=re(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const n=[];return e.forEach(r=>{this.Za.has(r)||n.push(new Kw(r))}),this.Za.forEach(r=>{e.has(r)||n.push(new Gw(r))}),n}uu(e){this.Ha=e.qs,this.Za=re();const n=this.nu(e.documents);return this.applyChanges(n,!0)}cu(){return rs.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Nf="SyncEngine";class LP{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class MP{constructor(e){this.key=e,this.lu=!1}}class FP{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new si(l=>dw(l),vu),this.Tu=new Map,this.Iu=new Set,this.du=new Re(W.comparator),this.Eu=new Map,this.Au=new wf,this.Ru={},this.Vu=new Map,this.mu=ns.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function jP(t,e,n=!0){const r=eE(t);let i;const s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await Qw(r,e,n,!0),i}async function UP(t,e){const n=eE(t);await Qw(n,e,!0,!1)}async function Qw(t,e,n,r){const i=await rP(t.localStore,cn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await zP(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&zw(t.remoteStore,i),l}async function zP(t,e,n,r,i){t.gu=(m,p,I)=>async function(N,V,S,v){let A=V.view.nu(S);A.Ds&&(A=await sy(N.localStore,V.query,!1).then(({documents:w})=>V.view.nu(w,A)));const b=v&&v.targetChanges.get(V.targetId),j=v&&v.targetMismatches.get(V.targetId)!=null,F=V.view.applyChanges(A,N.isPrimaryClient,b,j);return my(N,V.targetId,F._u),F.snapshot}(t,m,p,I);const s=await sy(t.localStore,e,!0),o=new OP(e,s.qs),l=o.nu(s.documents),u=Ko.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),h=o.applyChanges(l,t.isPrimaryClient,u);my(t,n,h._u);const f=new LP(e,n,o);return t.Pu.set(e,f),t.Tu.has(n)?t.Tu.get(n).push(e):t.Tu.set(n,[e]),h.snapshot}async function BP(t,e,n){const r=X(t),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(o=>!vu(o,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Kh(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Sf(r.remoteStore,i.targetId),Xh(r,i.targetId)}).catch(hs)):(Xh(r,i.targetId),await Kh(r.localStore,i.targetId,!0))}async function $P(t,e){const n=X(t),r=n.Pu.get(e),i=n.Tu.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Sf(n.remoteStore,r.targetId))}async function HP(t,e,n){const r=XP(t);try{const i=await function(o,l){const u=X(o),h=ve.now(),f=l.reduce((I,k)=>I.add(k.key),re());let m,p;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let k=Mn(),N=re();return u.Os.getEntries(I,f).next(V=>{k=V,k.forEach((S,v)=>{v.isValidDocument()||(N=N.add(S))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,k)).next(V=>{m=V;const S=[];for(const v of l){const A=rk(v,m.get(v.key).overlayedDocument);A!=null&&S.push(new Pr(v.key,A,iw(A.value.mapValue),hn.exists(!0)))}return u.mutationQueue.addMutationBatch(I,h,S,l)}).next(V=>{p=V;const S=V.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(I,V.batchId,S)})}).then(()=>({batchId:p.batchId,changes:mw(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let h=o.Ru[o.currentUser.toKey()];h||(h=new Re(ee)),h=h.insert(l,u),o.Ru[o.currentUser.toKey()]=h}(r,i.batchId,n),await Jo(r,i.changes),await Cu(r.remoteStore)}catch(i){const s=Pf(i,"Failed to persist write");n.reject(s)}}async function Jw(t,e){const n=X(t);try{const r=await eP(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Eu.get(s);o&&(ue(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.lu=!0:i.modifiedDocuments.size>0?ue(o.lu,14607):i.removedDocuments.size>0&&(ue(o.lu,42227),o.lu=!1))}),await Jo(n,r,e)}catch(r){await hs(r)}}function py(t,e,n){const r=X(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Pu.forEach((s,o)=>{const l=o.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=X(o);u.onlineState=l;let h=!1;u.queries.forEach((f,m)=>{for(const p of m.wa)p.va(l)&&(h=!0)}),h&&xf(u)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function qP(t,e,n){const r=X(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Eu.get(e),s=i&&i.key;if(s){let o=new Re(W.comparator);o=o.insert(s,at.newNoDocument(s,J.min()));const l=re().add(s),u=new Iu(J.min(),new Map,new Re(ee),o,l);await Jw(r,u),r.du=r.du.remove(s),r.Eu.delete(e),Df(r)}else await Kh(r.localStore,e,!1).then(()=>Xh(r,e,n)).catch(hs)}async function WP(t,e){const n=X(t),r=e.batch.batchId;try{const i=await Zk(n.localStore,e);Yw(n,r,null),Xw(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Jo(n,i)}catch(i){await hs(i)}}async function GP(t,e,n){const r=X(t);try{const i=await function(o,l){const u=X(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(m=>(ue(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);Yw(r,e,n),Xw(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Jo(r,i)}catch(i){await hs(i)}}function Xw(t,e){(t.Vu.get(e)||[]).forEach(n=>{n.resolve()}),t.Vu.delete(e)}function Yw(t,e,n){const r=X(t);let i=r.Ru[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function Xh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Tu.get(e))t.Pu.delete(r),n&&t.hu.pu(r,n);t.Tu.delete(e),t.isPrimaryClient&&t.Au.zr(e).forEach(r=>{t.Au.containsKey(r)||Zw(t,r)})}function Zw(t,e){t.Iu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Sf(t.remoteStore,n),t.du=t.du.remove(e),t.Eu.delete(n),Df(t))}function my(t,e,n){for(const r of n)r instanceof Gw?(t.Au.addReference(r.key,e),KP(t,r)):r instanceof Kw?($(Nf,"Document no longer in limbo: "+r.key),t.Au.removeReference(r.key,e),t.Au.containsKey(r.key)||Zw(t,r.key)):K(19791,{yu:r})}function KP(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Iu.has(r)||($(Nf,"New document in limbo: "+n),t.Iu.add(r),Df(t))}function Df(t){for(;t.Iu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new W(pe.fromString(e)),r=t.mu.next();t.Eu.set(r,new MP(n)),t.du=t.du.insert(n,r),zw(t.remoteStore,new tr(cn(mf(n.path)),r,"TargetPurposeLimboResolution",gu.ue))}}async function Jo(t,e,n){const r=X(t),i=[],s=[],o=[];r.Pu.isEmpty()||(r.Pu.forEach((l,u)=>{o.push(r.gu(u,e,n).then(h=>{var f;if((h||n)&&r.isPrimaryClient){const m=h?!h.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){i.push(h);const m=Tf.Es(u.targetId,h);s.push(m)}}))}),await Promise.all(o),r.hu.J_(i),await async function(u,h){const f=X(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>L.forEach(h,p=>L.forEach(p.Is,I=>f.persistence.referenceDelegate.addReference(m,p.targetId,I)).next(()=>L.forEach(p.ds,I=>f.persistence.referenceDelegate.removeReference(m,p.targetId,I)))))}catch(m){if(!ds(m))throw m;$(If,"Failed to update sequence numbers: "+m)}for(const m of h){const p=m.targetId;if(!m.fromCache){const I=f.Fs.get(p),k=I.snapshotVersion,N=I.withLastLimboFreeSnapshotVersion(k);f.Fs=f.Fs.insert(p,N)}}}(r.localStore,s))}async function QP(t,e){const n=X(t);if(!n.currentUser.isEqual(e)){$(Nf,"User change. New user:",e.toKey());const r=await Mw(n.localStore,e);n.currentUser=e,function(s,o){s.Vu.forEach(l=>{l.forEach(u=>{u.reject(new B(O.CANCELLED,o))})}),s.Vu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Jo(n,r.Bs)}}function JP(t,e){const n=X(t),r=n.Eu.get(e);if(r&&r.lu)return re().add(r.key);{let i=re();const s=n.Tu.get(e);if(!s)return i;for(const o of s){const l=n.Pu.get(o);i=i.unionWith(l.view.tu)}return i}}function eE(t){const e=X(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Jw.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=JP.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=qP.bind(null,e),e.hu.J_=DP.bind(null,e.eventManager),e.hu.pu=bP.bind(null,e.eventManager),e}function XP(t){const e=X(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=WP.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=GP.bind(null,e),e}class Kl{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Su(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,n){return null}Fu(e,n){return null}vu(e){return Yk(this.persistence,new Qk,e.initialUser,this.serializer)}Du(e){return new Lw(Ef.Vi,this.serializer)}bu(e){return new sP}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Kl.provider={build:()=>new Kl};class YP extends Kl{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,n){ue(this.persistence.referenceDelegate instanceof Wl,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Vk(r,e.asyncQueue,n)}Du(e){const n=this.cacheSizeBytes!==void 0?yt.withCacheSize(this.cacheSizeBytes):yt.DEFAULT;return new Lw(r=>Wl.Vi(r,n),this.serializer)}}class Yh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>py(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=QP.bind(null,this.syncEngine),await RP(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new PP}()}createDatastore(e){const n=Su(e.databaseInfo.databaseId),r=function(s){return new cP(s)}(e.databaseInfo);return function(s,o,l,u){return new pP(s,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new gP(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>py(this.syncEngine,n,0),function(){return ly.C()?new ly:new oP}())}createSyncEngine(e,n){return function(i,s,o,l,u,h,f){const m=new FP(i,s,o,l,u,h);return f&&(m.fu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=X(i);$(ni,"RemoteStore shutting down."),s.Ia.add(5),await Qo(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Yh.provider={build:()=>new Yh};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZP{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Ln("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr="FirestoreClient";class ex{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=st.UNAUTHENTICATED,this.clientId=uf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{$(Sr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>($(Sr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Hr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Pf(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Oc(t,e){t.asyncQueue.verifyOperationInProgress(),$(Sr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Mw(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{_r("Terminating Firestore due to IndexedDb database deletion"),t.terminate().then(()=>{$("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{_r("Terminating Firestore due to IndexedDb database deletion failed",i)})}),t._offlineComponents=e}async function gy(t,e){t.asyncQueue.verifyOperationInProgress();const n=await tx(t);$(Sr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>cy(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>cy(e.remoteStore,i)),t._onlineComponents=e}async function tx(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){$(Sr,"Using user provided OfflineComponentProvider");try{await Oc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===O.FAILED_PRECONDITION||i.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;_r("Error using user provided cache. Falling back to memory cache: "+n),await Oc(t,new Kl)}}else $(Sr,"Using default OfflineComponentProvider"),await Oc(t,new YP(void 0));return t._offlineComponents}async function tE(t){return t._onlineComponents||(t._uninitializedComponentsProvider?($(Sr,"Using user provided OnlineComponentProvider"),await gy(t,t._uninitializedComponentsProvider._online)):($(Sr,"Using default OnlineComponentProvider"),await gy(t,new Yh))),t._onlineComponents}function nx(t){return tE(t).then(e=>e.syncEngine)}async function yy(t){const e=await tE(t),n=e.eventManager;return n.onListen=jP.bind(null,e.syncEngine),n.onUnlisten=BP.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=UP.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=$P.bind(null,e.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nE(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _y=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE="firestore.googleapis.com",vy=!0;class wy{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new B(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=rE,this.ssl=vy}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:vy;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ow;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Dk)throw new B(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}mR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=nE((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new B(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new B(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new B(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ru{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new wy({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new B(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new wy(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new oR;switch(r.type){case"firstParty":return new cR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new B(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=_y.get(n);r&&($("ComponentProvider","Removing Datastore"),_y.delete(n),r.terminate())}(this),Promise.resolve()}}function rx(t,e,n,r={}){var i;t=qr(t,Ru);const s=as(e),o=t._getSettings(),l=Object.assign(Object.assign({},o),{emulatorOptions:t._getEmulatorOptions()}),u=`${e}:${n}`;s&&(Zv(`https://${u}`),e0("Firestore",!0)),o.host!==rE&&o.host!==u&&_r("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},o),{host:u,ssl:s,emulatorOptions:r});if(!Zr(h,l)&&(t._setSettings(h),r.mockUserToken)){let f,m;if(typeof r.mockUserToken=="string")f=r.mockUserToken,m=st.MOCK_USER;else{f=k1(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new B(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new st(p)}t._authCredentials=new aR(new q0(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new xr(this.firestore,e,this._query)}}class Le{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new pr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Le(this.firestore,e,this._key)}toJSON(){return{type:Le._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Wo(n,Le._jsonSchema))return new Le(e,r||null,new W(pe.fromString(n.referencePath)))}}Le._jsonSchemaVersion="firestore/documentReference/1.0",Le._jsonSchema={type:Oe("string",Le._jsonSchemaVersion),referencePath:Oe("string")};class pr extends xr{constructor(e,n,r){super(e,n,mf(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Le(this.firestore,null,new W(e))}withConverter(e){return new pr(this.firestore,e,this._path)}}function _i(t,e,...n){if(t=Xe(t),G0("collection","path",e),t instanceof Ru){const r=pe.fromString(e,...n);return Dg(r),new pr(t,null,r)}{if(!(t instanceof Le||t instanceof pr))throw new B(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(pe.fromString(e,...n));return Dg(r),new pr(t.firestore,null,r)}}function iE(t,e,...n){if(t=Xe(t),arguments.length===1&&(e=uf.newId()),G0("doc","path",e),t instanceof Ru){const r=pe.fromString(e,...n);return Ng(r),new Le(t,null,new W(r))}{if(!(t instanceof Le||t instanceof pr))throw new B(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(pe.fromString(e,...n));return Ng(r),new Le(t.firestore,t instanceof pr?t.converter:null,new W(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="AsyncQueue";class Ty{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new jw(this,"async_queue_retry"),this.oc=()=>{const r=Vc();r&&$(Ey,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const n=Vc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const n=Vc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const n=new Hr;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!ds(e))throw e;$(Ey,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const n=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,Ln("INTERNAL UNHANDLED ERROR: ",Iy(r)),r}).then(r=>(this.nc=!1,r))));return this._c=n,n}enqueueAfterDelay(e,n,r){this.ac(),this.sc.indexOf(e)>-1&&(n=0);const i=kf.createAndSchedule(this,e,n,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&K(47125,{hc:Iy(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const n of this.ec)if(n.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.ec)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const n=this.ec.indexOf(e);this.ec.splice(n,1)}}function Iy(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sy(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class bo extends Ru{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new Ty,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ty(e),this._firestoreClient=void 0,await e}}}function ix(t,e){const n=typeof t=="object"?t:i0(),r=typeof t=="string"?t:Ul,i=Xd(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=C1("firestore");s&&rx(i,...s)}return i}function sE(t){if(t._terminated)throw new B(O.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||sx(t),t._firestoreClient}function sx(t){var e,n,r;const i=t._freezeSettings(),s=function(l,u,h,f){return new RR(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,nE(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new ex(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Mt(Ye.fromBase64String(e))}catch(n){throw new B(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Mt(Ye.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Mt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Wo(e,Mt._jsonSchema))return Mt.fromBase64String(e.bytes)}}Mt._jsonSchemaVersion="firestore/bytes/1.0",Mt._jsonSchema={type:Oe("string",Mt._jsonSchemaVersion),bytes:Oe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new B(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new B(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new B(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:fn._jsonSchemaVersion}}static fromJSON(e){if(Wo(e,fn._jsonSchema))return new fn(e.latitude,e.longitude)}}fn._jsonSchemaVersion="firestore/geoPoint/1.0",fn._jsonSchema={type:Oe("string",fn._jsonSchemaVersion),latitude:Oe("number"),longitude:Oe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:pn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Wo(e,pn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new pn(e.vectorValues);throw new B(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}pn._jsonSchemaVersion="firestore/vectorValue/1.0",pn._jsonSchema={type:Oe("string",pn._jsonSchemaVersion),vectorValues:Oe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ox=/^__.*__$/;class ax{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Pr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Go(e,this.data,n,this.fieldTransforms)}}class oE{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Pr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function aE(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K(40011,{Ec:t})}}class bf{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new bf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Ql(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(aE(this.Ec)&&ox.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class lx{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Su(e)}Dc(e,n,r,i=!1){return new bf({Ec:e,methodName:n,bc:r,path:Ke.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Vf(t){const e=t._freezeSettings(),n=Su(t._databaseId);return new lx(t._databaseId,!!e.ignoreUndefinedProperties,n)}function ux(t,e,n,r,i,s={}){const o=t.Dc(s.merge||s.mergeFields?2:0,e,n,i);Lf("Data must be an object, but it was:",o,r);const l=lE(r,o);let u,h;if(s.merge)u=new Pt(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const p=Zh(e,m,n);if(!o.contains(p))throw new B(O.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);cE(f,p)||f.push(p)}u=new Pt(f),h=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=o.fieldTransforms;return new ax(new vt(l),u,h)}class xu extends Pu{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof xu}}class Of extends Pu{_toFieldTransform(e){return new ZR(e.path,new xo)}isEqual(e){return e instanceof Of}}function cx(t,e,n,r){const i=t.Dc(1,e,n);Lf("Data must be an object, but it was:",i,r);const s=[],o=vt.empty();kr(r,(u,h)=>{const f=Mf(e,u,n);h=Xe(h);const m=i.gc(f);if(h instanceof xu)s.push(f);else{const p=Xo(h,m);p!=null&&(s.push(f),o.set(f,p))}});const l=new Pt(s);return new oE(o,l,i.fieldTransforms)}function hx(t,e,n,r,i,s){const o=t.Dc(1,e,n),l=[Zh(e,r,n)],u=[i];if(s.length%2!=0)throw new B(O.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<s.length;p+=2)l.push(Zh(e,s[p])),u.push(s[p+1]);const h=[],f=vt.empty();for(let p=l.length-1;p>=0;--p)if(!cE(h,l[p])){const I=l[p];let k=u[p];k=Xe(k);const N=o.gc(I);if(k instanceof xu)h.push(I);else{const V=Xo(k,N);V!=null&&(h.push(I),f.set(I,V))}}const m=new Pt(h);return new oE(f,m,o.fieldTransforms)}function dx(t,e,n,r=!1){return Xo(n,t.Dc(r?4:3,e))}function Xo(t,e){if(uE(t=Xe(t)))return Lf("Unsupported field value:",e,t),lE(t,e);if(t instanceof Pu)return function(r,i){if(!aE(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=Xo(l,i.yc(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Xe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return JR(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ve.fromDate(r);return{timestampValue:ql(i.serializer,s)}}if(r instanceof ve){const s=new ve(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ql(i.serializer,s)}}if(r instanceof fn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Mt)return{bytesValue:kw(i.serializer,r._byteString)};if(r instanceof Le){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:vf(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof pn)return function(o,l){return{mapValue:{fields:{[nw]:{stringValue:rw},[zl]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return gf(l.serializer,h)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${mu(r)}`)}(t,e)}function lE(t,e){const n={};return J0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):kr(t,(r,i)=>{const s=Xo(i,e.Vc(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function uE(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ve||t instanceof fn||t instanceof Mt||t instanceof Le||t instanceof Pu||t instanceof pn)}function Lf(t,e,n){if(!uE(n)||!K0(n)){const r=mu(n);throw r==="an object"?e.wc(t+" a custom object"):e.wc(t+" "+r)}}function Zh(t,e,n){if((e=Xe(e))instanceof ku)return e._internalPath;if(typeof e=="string")return Mf(t,e);throw Ql("Field path arguments must be of type string or ",t,!1,void 0,n)}const fx=new RegExp("[~\\*/\\[\\]]");function Mf(t,e,n){if(e.search(fx)>=0)throw Ql(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ku(...e.split("."))._internalPath}catch{throw Ql(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Ql(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new B(O.INVALID_ARGUMENT,l+t+u)}function cE(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hE{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new px(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Nu("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class px extends hE{data(){return super.data()}}function Nu(t,e){return typeof e=="string"?Mf(t,e):e instanceof ku?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mx(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new B(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ff{}class jf extends Ff{}function il(t,e,...n){let r=[];e instanceof Ff&&r.push(e),r=r.concat(n),function(s){const o=s.filter(u=>u instanceof Uf).length,l=s.filter(u=>u instanceof Du).length;if(o>1||o>0&&l>0)throw new B(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class Du extends jf{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Du(e,n,r)}_apply(e){const n=this._parse(e);return dE(e._query,n),new xr(e.firestore,e.converter,$h(e._query,n))}_parse(e){const n=Vf(e.firestore);return function(s,o,l,u,h,f,m){let p;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new B(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ry(m,f);const k=[];for(const N of m)k.push(Cy(u,s,N));p={arrayValue:{values:k}}}else p=Cy(u,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ry(m,f),p=dx(l,o,m,f==="in"||f==="not-in");return Ve.create(h,f,p)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function gx(t,e,n){const r=e,i=Nu("where",t);return Du._create(i,r,n)}class Uf extends Ff{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Uf(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:en.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const l=s.getFlattenedFilters();for(const u of l)dE(o,u),o=$h(o,u)}(e._query,n),new xr(e.firestore,e.converter,$h(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class zf extends jf{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new zf(e,n)}_apply(e){const n=function(i,s,o){if(i.startAt!==null)throw new B(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new B(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Po(s,o)}(e._query,this._field,this._direction);return new xr(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new fs(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,n))}}function ed(t,e="asc"){const n=e,r=Nu("orderBy",t);return zf._create(r,n)}class Bf extends jf{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new Bf(e,n,r)}_apply(e){return new xr(e.firestore,e.converter,$l(e._query,this._limit,this._limitType))}}function Ay(t){return gR("limit",t),Bf._create("limit",t,"F")}function Cy(t,e,n){if(typeof(n=Xe(n))=="string"){if(n==="")throw new B(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!hw(e)&&n.indexOf("/")!==-1)throw new B(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(pe.fromString(n));if(!W.isDocumentKey(r))throw new B(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ug(t,new W(r))}if(n instanceof Le)return Ug(t,n._key);throw new B(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${mu(n)}.`)}function Ry(t,e){if(!Array.isArray(t)||t.length===0)throw new B(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function dE(t,e){const n=function(i,s){for(const o of i)for(const l of o.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new B(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new B(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class yx{convertValue(e,n="none"){switch(Tr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Er(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw K(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return kr(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n[zl].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>xe(o.doubleValue));return new pn(s)}convertGeoPoint(e){return new fn(xe(e.latitude),xe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=_u(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Co(e));default:return null}}convertTimestamp(e){const n=wr(e);return new ve(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=pe.fromString(e);ue(Vw(r),9688,{name:e});const i=new Ro(r.get(1),r.get(3)),s=new W(r.popFirst(5));return i.isEqual(n)||Ln(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _x(t,e,n){let r;return r=t?t.toFirestore(e):e,r}class $s{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Wr extends hE{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new sl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Nu("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new B(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Wr._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Wr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Wr._jsonSchema={type:Oe("string",Wr._jsonSchemaVersion),bundleSource:Oe("string","DocumentSnapshot"),bundleName:Oe("string"),bundle:Oe("string")};class sl extends Wr{data(e={}){return super.data(e)}}class $i{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new $s(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new sl(this._firestore,this._userDataWriter,r.key,r,new $s(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new B(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new sl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new $s(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new sl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new $s(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:vx(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new B(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=$i._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=uf.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(n.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function vx(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K(61501,{type:t})}}$i._jsonSchemaVersion="firestore/querySnapshot/1.0",$i._jsonSchema={type:Oe("string",$i._jsonSchemaVersion),bundleSource:Oe("string","QuerySnapshot"),bundleName:Oe("string"),bundle:Oe("string")};class fE extends yx{constructor(e){super(),this.firestore=e}convertBytes(e){return new Mt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Le(this.firestore,null,n)}}function wx(t,e,n,...r){t=qr(t,Le);const i=qr(t.firestore,bo),s=Vf(i);let o;return o=typeof(e=Xe(e))=="string"||e instanceof ku?hx(s,"updateDoc",t._key,e,n,r):cx(s,"updateDoc",t._key,e),pE(i,[o.toMutation(t._key,hn.exists(!0))])}function ky(t,e){const n=qr(t.firestore,bo),r=iE(t),i=_x(t.converter,e);return pE(n,[ux(Vf(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,hn.exists(!1))]).then(()=>r)}function ol(t,...e){var n,r,i;t=Xe(t);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Sy(e[o])||(s=e[o++]);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Sy(e[o])){const m=e[o];e[o]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,h,f;if(t instanceof Le)h=qr(t.firestore,bo),f=mf(t._key.path),u={next:m=>{e[o]&&e[o](Ex(h,t,m))},error:e[o+1],complete:e[o+2]};else{const m=qr(t,xr);h=qr(m.firestore,bo),f=m._query;const p=new fE(h);u={next:I=>{e[o]&&e[o](new $i(h,p,m,I))},error:e[o+1],complete:e[o+2]},mx(t._query)}return function(p,I,k,N){const V=new ZP(N),S=new VP(I,V,k);return p.asyncQueue.enqueueAndForget(async()=>xP(await yy(p),S)),()=>{V.Ou(),p.asyncQueue.enqueueAndForget(async()=>NP(await yy(p),S))}}(sE(h),f,l,u)}function pE(t,e){return function(r,i){const s=new Hr;return r.asyncQueue.enqueueAndForget(async()=>HP(await nx(r),i,s)),s.promise}(sE(t),e)}function Ex(t,e,n){const r=n.docs.get(e._key),i=new fE(t);return new Wr(t,i,e._key,r,new $s(n.hasPendingWrites,n.fromCache),e.converter)}function Lc(){return new Of("serverTimestamp")}(function(e,n=!0){(function(i){cs=i})(ls),Yi(new ei("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new bo(new lR(r.getProvider("auth-internal")),new hR(o,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new B(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ro(h.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),dr(Cg,Rg,e),dr(Cg,Rg,"esm2017")})();/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Tx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),St=(t,e)=>{const n=Z.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:l="",children:u,...h},f)=>Z.createElement("svg",{ref:f,...Tx,width:i,height:i,stroke:r,strokeWidth:o?Number(s)*24/Number(i):s,className:["lucide",`lucide-${Ix(t)}`,l].join(" "),...h},[...e.map(([m,p])=>Z.createElement(m,p)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=St("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mE=St("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=St("BarChart2",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=St("BarChart",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=St("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gE=St("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kx=St("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=St("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Py=St("List",[["line",{x1:"8",x2:"21",y1:"6",y2:"6",key:"7ey8pc"}],["line",{x1:"8",x2:"21",y1:"12",y2:"12",key:"rjfblc"}],["line",{x1:"8",x2:"21",y1:"18",y2:"18",key:"c3b1m8"}],["line",{x1:"3",x2:"3.01",y1:"6",y2:"6",key:"1g7gq3"}],["line",{x1:"3",x2:"3.01",y1:"12",y2:"12",key:"1pjlvk"}],["line",{x1:"3",x2:"3.01",y1:"18",y2:"18",key:"28t2mc"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=St("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xx=St("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=St("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xy=St("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=St("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),Gr={VITE_FIREBASE_API_KEY:"AIzaSyDq53Gwwjb8LjlkZHY0wUDA8KPZOCoJedo",VITE_FIREBASE_APP_ID:"1:473451648647:web:819e4600673c63575e0a22",VITE_FIREBASE_AUTH_DOMAIN:"pia-inspecciones-predictivas.firebaseapp.com",VITE_FIREBASE_MESSAGING_SENDER_ID:"473451648647",VITE_FIREBASE_PROJECT_ID:"pia-inspecciones-predictivas",VITE_FIREBASE_STORAGE_BUCKET:"pia-inspecciones-predictivas.appspot.com"};let Hi={};try{typeof __firebase_config<"u"&&__firebase_config&&(Hi=JSON.parse(__firebase_config))}catch{}if(!Hi||Object.keys(Hi).length===0){const t=typeof import.meta<"u"?Gr:void 0;if(t){const e={apiKey:t.VITE_FIREBASE_API_KEY,authDomain:t.VITE_FIREBASE_AUTH_DOMAIN,projectId:t.VITE_FIREBASE_PROJECT_ID,storageBucket:t.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:t.VITE_FIREBASE_MESSAGING_SENDER_ID,appId:t.VITE_FIREBASE_APP_ID};e.apiKey&&(Hi=e)}}const Ny=(typeof __initial_auth_token<"u"?__initial_auth_token:typeof import.meta<"u"?Gr==null?void 0:Gr.VITE_INITIAL_AUTH_TOKEN:null)||null,vn=(typeof __app_id<"u"?__app_id:typeof import.meta<"u"?Gr==null?void 0:Gr.VITE_APP_ID:void 0)||"default-app-id",bx="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=",Vx="",Ox=[{text:"Verificar nivel de aceite (visual)",type:"boolean"},{text:"Detectar vibración anormal (tacto/oído)",type:"boolean"},{text:"Temperatura superficial (tacto/termómetro)",type:"text"},{text:"Presencia de fugas o derrames",type:"boolean"}],Dy=async t=>{var n,r,i,s,o;let e=null;for(let l=0;l<3;l++){const u=Math.pow(2,l)*1e3;l>0&&await new Promise(h=>setTimeout(h,u));try{const h=await fetch(bx+Vx,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!h.ok){e=`HTTP error! status: ${h.status}`;continue}const f=await h.json(),m=(o=(s=(i=(r=(n=f==null?void 0:f.candidates)==null?void 0:n[0])==null?void 0:r.content)==null?void 0:i.parts)==null?void 0:s[0])==null?void 0:o.text;if(m)return m.trim();e="Respuesta de Gemini vacía o inesperada."}catch(h){e=h.message}}throw new Error(`Fallo la llamada a Gemini después de 3 intentos. Último error: ${e}`)},Lx=({db:t,userId:e,appId:n,asset:r,onBack:i})=>{const[s,o]=Z.useState([]),[l,u]=Z.useState(null),[h,f]=Z.useState(!0);Z.useEffect(()=>{if(!t||!e||!(r!=null&&r.id))return;f(!0);const p=`/artifacts/${n}/users/${e}/inspections`,I=_i(t,p),k=il(I,gx("assetId","==",r.id),ed("date","desc")),N=ol(k,V=>{const S=V.docs.map(v=>{var A;return{id:v.id,...v.data(),date:(A=v.data().date)!=null&&A.toDate?v.data().date.toDate():new Date}});o(S),f(!1),S.length>0&&!l&&u(S[0])},V=>{console.error("Error fetching asset history:",V),f(!1)});return()=>N()},[t,e,n,r]);const m=p=>{switch(p){case"A":return"bg-red-500 text-white";case"B":return"bg-orange-500 text-white";case"C":return"bg-yellow-500 text-gray-800";case"D":return"bg-green-500 text-white";default:return"bg-gray-400 text-white"}};return C.jsxs("div",{className:"space-y-6",children:[C.jsxs("div",{className:"flex justify-between items-center bg-gray-800 p-6 rounded-xl shadow-2xl border-b border-gray-700",children:[C.jsxs("h2",{className:"text-3xl font-bold text-teal-400",children:["Historial de ",r.name]}),C.jsxs("button",{onClick:()=>{u(null),i()},className:"px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition duration-150 flex items-center",children:[C.jsx(mE,{className:"w-4 h-4 mr-2"})," Volver a Dashboard"]})]}),C.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[C.jsxs("div",{className:"lg:col-span-1 bg-gray-800 p-4 rounded-xl shadow-lg h-96 overflow-y-auto",children:[C.jsxs("p",{className:"text-xl font-semibold text-blue-300 mb-4 border-b border-gray-700 pb-2",children:["Registros (",s.length,")"]}),h?C.jsx("div",{className:"flex justify-center items-center h-full",children:C.jsx(Di,{className:"w-6 h-6 animate-spin text-blue-400"})}):s.length===0?C.jsx("p",{className:"text-gray-400 italic",children:"No hay inspecciones registradas para este activo."}):C.jsx("div",{className:"space-y-3",children:s.map(p=>C.jsx("div",{onClick:()=>u(p),className:`p-3 rounded-lg cursor-pointer transition duration-150 border-l-4 ${(l==null?void 0:l.id)===p.id?"bg-blue-900 border-blue-400 shadow-xl":"bg-gray-700 hover:bg-gray-700/80 border-gray-600"}`,children:C.jsxs("div",{className:"flex justify-between items-center",children:[C.jsxs("div",{className:"flex items-center text-sm font-medium",children:[C.jsx(Rx,{className:"w-4 h-4 mr-2 text-gray-400"}),p.date.toLocaleDateString()]}),C.jsx("span",{className:`px-2 py-0.5 text-xs font-semibold rounded-full ${p.overallStatus==="ALERT"?"bg-red-600":"bg-green-600"} text-white`,children:p.overallStatus})]})},p.id))})]}),C.jsx("div",{className:"lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg",children:l?C.jsxs(C.Fragment,{children:[C.jsxs("div",{className:"mb-6 pb-4 border-b border-gray-700",children:[C.jsxs("div",{className:"flex justify-between items-center",children:[C.jsxs("h3",{className:"text-2xl font-bold text-white",children:["Registro del ",l.date.toLocaleDateString()]}),C.jsxs("span",{className:`font-bold p-2 rounded ${m(r.criticality)}`,children:["Crit.: ",r.criticality]})]}),C.jsxs("p",{className:"text-sm text-gray-400 mt-1",children:["Notas Generales: ",C.jsx("span",{className:"text-gray-200 italic",children:l.notes||"N/A"})]})]}),C.jsx("div",{className:"space-y-3 h-80 overflow-y-auto pr-2",children:l.results.map((p,I)=>C.jsxs("div",{className:`p-3 rounded-lg shadow-md ${p.status==="ALERT"?"bg-red-900/50 border-l-4 border-red-500":"bg-gray-700 border-l-4 border-green-500"}`,children:[C.jsxs("p",{className:"text-base font-medium text-gray-50",children:[I+1,". ",p.text]}),C.jsxs("div",{className:"flex justify-between items-start mt-1 text-sm",children:[C.jsxs("span",{className:"text-gray-300",children:["Respuesta: ",C.jsx("strong",{className:"text-white",children:p.answer})]}),C.jsx("span",{className:`text-xs font-semibold ${p.status==="ALERT"?"text-red-300":"text-green-300"}`,children:p.status})]}),p.notes&&C.jsxs("p",{className:"text-xs text-gray-400 mt-1 italic",children:["Notas: ",p.notes]})]},I))})]}):C.jsxs("div",{className:"flex justify-center items-center h-full text-gray-500",children:[C.jsx(Px,{className:"w-10 h-10 mr-3"}),"Selecciona un registro de inspección para ver los detalles del checklist."]})})]})]})},by=({data:t})=>{const e=t.reduce((r,i)=>r+i.value,0);if(e===0)return C.jsx("p",{className:"text-gray-400 italic",children:"No hay datos para mostrar."});let n=0;return C.jsx("svg",{viewBox:"0 0 100 100",className:"w-full max-w-xs mx-auto",children:t.map((r,i)=>{const s=r.value/e*360,o=s>180?1:0,l=50+50*Math.sin(n*Math.PI/180),u=50-50*Math.cos(n*Math.PI/180);n+=s;const h=50+50*Math.sin(n*Math.PI/180),f=50-50*Math.cos(n*Math.PI/180),m=s===360?"M 50 50 L 50 0 A 50 50 0 1 1 49.9 0 Z":`M 50 50 L ${l} ${u} A 50 50 0 ${o} 1 ${h} ${f} Z`;return C.jsx("path",{d:m,fill:r.color},i)})})},Mx=({data:t})=>{const e=Math.max(...t.map(u=>u.valueOK+u.valueALERT))||1,n=t.slice(-12),r=24,i=12,s=380,o=135,l=o-i;return C.jsxs("svg",{viewBox:"0 0 400 200",className:"w-full h-auto",children:[C.jsx("line",{x1:r,y1:o,x2:s,y2:o,stroke:"#4B5563"}),C.jsx("line",{x1:r,y1:i,x2:r,y2:o,stroke:"#4B5563"}),n.map((u,h)=>{const p=r+10+h*30,I=u.valueOK/e*l,k=u.valueALERT/e*l;return C.jsxs("g",{children:[C.jsx("rect",{x:p,y:o-I,width:16,height:I,fill:"#10B981",rx:"2"}),C.jsx("rect",{x:p,y:o-I-k,width:16,height:k,fill:"#EF4444",rx:"2"}),C.jsx("text",{x:p+16/2,y:o-3,textAnchor:"middle",fontSize:"9",fill:"#9CA3AF",children:u.month})]},h)}),[0,25,50,75,100].map((u,h)=>C.jsx("text",{x:r-4,y:o-u/100*l,textAnchor:"end",fontSize:"7",fill:"#9CA3AF",children:(u/100*e).toFixed(0)},h))]})},Fx=({assets:t,latestInspections:e,allInspections:n,onInspectAssetHistory:r})=>{const i=Z.useMemo(()=>{const l={OK:0,ALERT:0,Uninspected:0};t.forEach(f=>{l[f.status]=(l[f.status]||0)+1});const u=t.length;return{data:[{name:"OK",value:l.OK,color:"#10B981"},{name:"ALERTA",value:l.ALERT,color:"#EF4444"},{name:"No Insp.",value:l.Uninspected,color:"#F59E0B"}].filter(f=>f.value>0),total:u}},[t]),s=Z.useMemo(()=>{const l={A:0,B:0,C:0,D:0};t.forEach(f=>{l[f.criticality]=(l[f.criticality]||0)+1});const u=t.length;return{data:[{name:"A (Alta)",value:l.A,color:"#DC2626"},{name:"B (M-Alta)",value:l.B,color:"#F97316"},{name:"C (M-Baja)",value:l.C,color:"#FCD34D"},{name:"D (Baja)",value:l.D,color:"#4ADE80"}].filter(f=>f.value>0),total:u}},[t]),o=Z.useMemo(()=>{const u=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"].map(m=>({month:m,valueOK:0,valueALERT:0})),h=new Date,f=new Date(h.getFullYear(),h.getMonth()-11,1);return Array.isArray(n)&&n.forEach(m=>{var I;const p=(I=m==null?void 0:m.date)!=null&&I.toDate?m.date.toDate():(m==null?void 0:m.date)instanceof Date?m.date:null;if(p&&p>=f&&p<=h){const k=p.getMonth();m.overallStatus==="ALERT"?u[k].valueALERT+=1:m.overallStatus==="OK"&&(u[k].valueOK+=1)}}),u},[n]);return C.jsxs("div",{className:"space-y-8",children:[C.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-4 gap-6",children:[C.jsxs("div",{className:"bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-blue-500",children:[C.jsx("p",{className:"text-sm font-medium text-gray-400",children:"Activos Totales"}),C.jsxs("div",{className:"flex items-center justify-between mt-1",children:[C.jsx("span",{className:"text-5xl font-extrabold text-white",children:i.total}),C.jsx(Dx,{className:"w-10 h-10 text-blue-400"})]})]}),C.jsxs("div",{className:"lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-teal-500",children:[C.jsx("p",{className:"text-xl font-semibold text-teal-300 mb-4",children:"Estado de Activos (Actual)"}),C.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 items-center",children:[C.jsx("div",{children:C.jsx(by,{data:i.data})}),C.jsx("div",{className:"space-y-2",children:i.data.map((l,u)=>C.jsxs("div",{className:"flex items-center",children:[C.jsx("div",{className:"w-3 h-3 rounded-full mr-3",style:{backgroundColor:l.color}}),C.jsxs("span",{className:"text-gray-200",children:[l.name,":"]}),C.jsx("span",{className:"ml-2 font-bold text-lg",children:l.value}),C.jsxs("span",{className:"text-gray-400 ml-1",children:["(",(l.value/i.total*100).toFixed(1),"%)"]})]},u))})]})]}),C.jsxs("div",{className:"bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-yellow-500",children:[C.jsx("p",{className:"text-sm font-medium text-gray-400",children:"Distribución por Criticidad"}),C.jsx("div",{className:"h-40 flex flex-col justify-center",children:C.jsx(by,{data:s.data})}),C.jsx("div",{className:"mt-4 space-y-1 text-xs",children:s.data.map((l,u)=>C.jsxs("div",{className:"flex justify-between items-center",children:[C.jsxs("div",{className:"flex items-center",children:[C.jsx("div",{className:"w-2 h-2 rounded-full mr-2",style:{backgroundColor:l.color}}),C.jsx("span",{className:"text-gray-300 font-semibold",children:l.name})]}),C.jsx("span",{className:"font-bold text-white",children:l.value})]},u))})]})]}),C.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[C.jsxs("div",{className:"lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-indigo-500 overflow-hidden",children:[C.jsxs("h2",{className:"text-2xl font-semibold mb-2 flex items-center text-indigo-300",children:[C.jsx(Cx,{className:"w-5 h-5 mr-2"})," Evolución del Estado (Últimos 12 meses)"]}),C.jsx("div",{className:"h-90 flex items-start justify-center pt-1",children:C.jsx(Mx,{data:o})}),C.jsxs("div",{className:"flex justify-center mt-4 space-x-6 text-sm",children:[C.jsxs("div",{className:"flex items-center",children:[C.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full mr-2"}),C.jsx("span",{className:"text-gray-300",children:"OK"})]}),C.jsxs("div",{className:"flex items-center",children:[C.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full mr-2"}),C.jsx("span",{className:"text-gray-300",children:"ALERTA"})]})]})]}),C.jsxs("div",{className:"bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-purple-500",children:[C.jsxs("h2",{className:"text-2xl font-semibold mb-4 flex items-center text-purple-300",children:[C.jsx(kx,{className:"w-5 h-5 mr-2"})," Últimas 10 Inspecciones"]}),e.length===0?C.jsx("p",{className:"text-gray-400 italic",children:"No hay registros de inspección recientes."}):C.jsx("div",{className:"space-y-3",children:e.map(l=>C.jsxs("div",{className:`flex items-center p-3 rounded-lg shadow-md border-l-4 ${l.overallStatus==="ALERT"?"border-red-500 bg-gray-700/50":"border-green-500 bg-gray-700"}`,children:[C.jsxs("div",{className:"flex-grow",children:[C.jsx("p",{className:"text-lg font-bold text-white",children:l.assetName}),C.jsxs("p",{className:"text-sm text-gray-300",children:["Insp: ",l.date.toLocaleDateString()]})]}),C.jsx("span",{className:`flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full ${l.overallStatus==="ALERT"?"bg-red-600":"bg-green-600"} text-white`,children:l.overallStatus}),C.jsx("button",{className:"ml-4 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white text-sm font-medium",onClick:()=>{const u=t.find(h=>h.id===l.assetId);u&&r(u)},children:"Detalle"})]},l.id))})]})]})]})},jx=({asset:t,onBack:e,onSave:n,loading:r})=>{const[i,s]=Z.useState([]),[o,l]=Z.useState("");Z.useEffect(()=>{if(t!=null&&t.checklist){const I=t.checklist.map((k,N)=>({questionIndex:N,text:k.text,type:k.type,answer:k.type==="boolean"?"No":"",status:"OK",notes:""}));s(I)}},[t]);const u=(I,k)=>{s(N=>{const V=[...N],S=V[I];let v="OK";return S.type==="boolean"?(S.answer=k,v=k==="Si"?"ALERT":"OK"):S.answer=k,S.status=v,V})},h=(I,k)=>{s(N=>{const V=[...N];return V[I].notes=k,V})},f=i.some(I=>I.status==="ALERT")?"ALERT":"OK",m=()=>{n(i,o,f)},p=i.every(I=>I.type==="boolean"?["Si","No"].includes(I.answer):I.answer.trim()!=="");return C.jsxs("div",{className:"bg-gray-800 p-6 rounded-xl shadow-2xl",children:[C.jsxs("div",{className:"flex justify-between items-center mb-6 border-b border-gray-700 pb-4",children:[C.jsxs("h2",{className:"text-3xl font-bold text-blue-400",children:["Inspección de: ",t.name]}),C.jsxs("button",{onClick:e,className:"px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition duration-150 flex items-center",children:[C.jsx(mE,{className:"w-4 h-4 mr-2"})," Volver a Activos"]})]}),C.jsxs("p",{className:"text-lg mb-4 text-gray-300",children:["Ubicación: ",t.location," | Criticidad: ",C.jsx("span",{className:`font-bold p-1 rounded ${t.criticality==="A"?"bg-red-500":t.criticality==="D"?"bg-green-500":"bg-orange-500"}`,children:t.criticality})]}),C.jsxs("div",{className:"space-y-6",children:[C.jsx("p",{className:"text-sm italic text-gray-400 mb-4 border-b border-gray-700 pb-2",children:"Marque los resultados. Un resultado 'Si' (para booleanos) o cualquier alerta en notas, marcará el punto como ALERTA."}),i.map((I,k)=>C.jsxs("div",{className:`p-4 rounded-lg shadow-md transition duration-150 ${I.status==="ALERT"?"bg-red-900 border-l-4 border-red-500":"bg-gray-700 border-l-4 border-teal-500"}`,children:[C.jsxs("label",{className:"block text-lg font-medium mb-2 text-gray-50",children:[k+1,". ",I.text]}),I.type==="boolean"?C.jsx("div",{className:"flex space-x-4 mt-2",children:["No","Si"].map((N,V)=>C.jsxs("button",{type:"button",onClick:()=>u(k,N),className:`px-4 py-2 rounded-lg font-semibold transition duration-150 ${I.answer===N?N==="Si"?"bg-red-500 text-white":"bg-green-500 text-white":"bg-gray-500 hover:bg-gray-600 text-gray-100"}`,children:[N," (",N==="Si"?"ALERTA":"OK",")"]},V))}):C.jsx("input",{type:"text",value:I.answer,onChange:N=>u(k,N.target.value),placeholder:"Introduzca lectura o valor...",className:"w-full p-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-teal-500 focus:border-teal-500",required:!0}),C.jsx("textarea",{value:I.notes,onChange:N=>h(k,N.target.value),placeholder:"Notas detalladas de la inspección o hallazgos (opcional)...",rows:"2",className:"w-full mt-3 p-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none text-sm"})]},k))]}),C.jsxs("div",{className:"mt-8 p-4 bg-gray-700 rounded-lg shadow-inner",children:[C.jsx("label",{htmlFor:"generalNotes",className:"block text-lg font-medium text-gray-200 mb-2",children:"Notas Generales de la Inspección"}),C.jsx("textarea",{id:"generalNotes",value:o,onChange:I=>l(I.target.value),placeholder:"Comentarios adicionales sobre el estado general del activo o el entorno...",rows:"3",className:"w-full p-3 bg-gray-600 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"})]}),C.jsxs("div",{className:"mt-6 flex justify-between items-center pt-4 border-t border-gray-700",children:[C.jsxs("div",{className:"text-xl font-bold",children:["Estado Final:",C.jsx("span",{className:`ml-2 px-3 py-1 rounded-full ${f==="ALERT"?"bg-red-500":"bg-green-500"} text-white`,children:f==="ALERT"?"ALERTA":"OK"})]}),C.jsxs("button",{onClick:m,className:`px-6 py-3 text-white font-bold rounded-lg transition duration-300 transform flex items-center justify-center ${r||!p?"bg-green-600/70 cursor-not-allowed":"bg-green-600 hover:bg-green-700 hover:shadow-xl"}`,disabled:r||!p,children:[r?C.jsx(Di,{className:"w-5 h-5 inline animate-spin mr-2"}):C.jsx(gE,{className:"w-5 h-5 inline mr-2"}),"Guardar Registro de Inspección"]})]}),!p&&C.jsx("p",{className:"text-center mt-3 text-sm text-red-400",children:"* Por favor, complete todos los puntos de inspección para guardar."})]})},Ux=()=>{const[t,e]=Z.useState(null),[n,r]=Z.useState(null),[i,s]=Z.useState(null),[o,l]=Z.useState(!1),[u,h]=Z.useState([]),[f,m]=Z.useState([]),[p,I]=Z.useState(""),[k,N]=Z.useState(""),[V,S]=Z.useState(""),[v,A]=Z.useState("D"),[b,j]=Z.useState(!1),[F,w]=Z.useState(!1),[y,_]=Z.useState(null),[E,R]=Z.useState("list"),[P,T]=Z.useState(null),[He,gn]=Z.useState(""),At=Z.useCallback((q,le=null)=>{R(q),T(le)},[]);Z.useEffect(()=>{if(sR("error"),Object.keys(Hi).length===0){console.error("Firebase config is missing."),_("Error: Configuración de Firebase faltante."),l(!0);return}try{const q=r0(Hi),le=ix(q),se=rR(q);e(le),r(se);const de=WA(se,async Ie=>{var gt;Ie||(Ny?await $A(se,Ny):await FA(se)),s(((gt=se.currentUser)==null?void 0:gt.uid)||crypto.randomUUID()),l(!0)});return()=>de()}catch(q){console.error("Error during Firebase initialization:",q),_("Error al inicializar Firebase. Ver consola.")}},[]),Z.useEffect(()=>{if(t&&i){const q=`/artifacts/${vn}/users/${i}/assets`,le=_i(t,q),se=il(le),de=ol(se,Ie=>{const gt=Ie.docs.map(Me=>({id:Me.id,...Me.data()}));gt.sort((Me,Ht)=>{var ai,li;return(((ai=Ht.createdAt)==null?void 0:ai.toMillis())||0)-(((li=Me.createdAt)==null?void 0:li.toMillis())||0)}),h(gt),_(null)},Ie=>{console.error("Error fetching assets:",Ie),_("Error al cargar los activos. Ver consola.")});return()=>de()}},[t,i]),Z.useEffect(()=>{if(t&&i){const q=`/artifacts/${vn}/users/${i}/inspections`,le=_i(t,q),se=il(le,ed("date","desc"),Ay(10)),de=ol(se,Ie=>{const gt=Ie.docs.map(Me=>{var Ht;return{id:Me.id,...Me.data(),date:(Ht=Me.data().date)!=null&&Ht.toDate?Me.data().date.toDate():new Date}});m(gt)},Ie=>{console.error("Error fetching latest inspections:",Ie)});return()=>de()}},[t,i]);const[Bt,z]=Z.useState([]);Z.useEffect(()=>{if(t&&i){const q=`/artifacts/${vn}/users/${i}/inspections`,le=_i(t,q),se=il(le,ed("date","desc"),Ay(500)),de=ol(se,Ie=>{const gt=Ie.docs.map(Me=>{var Ht;return{id:Me.id,...Me.data(),date:(Ht=Me.data().date)!=null&&Ht.toDate?Me.data().date.toDate():new Date}});z(gt)},Ie=>{console.error("Error fetching all inspections:",Ie)});return()=>de()}},[t,i]);const G=Z.useMemo(()=>{if(!He)return u;const q=He.toLowerCase();return u.filter(le=>{const se=le.name.toLowerCase().includes(q),de=(le.location||"").toLowerCase().includes(q);return se||de})},[u,He]),Y=q=>{switch(q){case"A":return"bg-red-500 text-white";case"B":return"bg-orange-500 text-white";case"C":return"bg-yellow-500 text-gray-800";case"D":return"bg-green-500 text-white";default:return"bg-gray-400 text-white"}},ge=async()=>{if(!p||!v){_("Necesitas al menos el Nombre y la Criticidad para generar una lista.");return}w(!0),_(null);const se={contents:[{parts:[{text:`Activo: "${p}". Criticidad: ${v}.`}]}],systemInstruction:{parts:[{text:"Eres un ingeniero de confiabilidad experto. Tu tarea es generar un JSON de 4 a 6 puntos de inspección visual y auditiva de rutina (diaria) para el activo proporcionado. Céntrate en fallos comunes detectables sin instrumentación avanzada. La respuesta DEBE ser un arreglo JSON de objetos, sin preámbulos, explicaciones ni markdown envolvente (e.g., ```json)."}]},generationConfig:{responseMimeType:"application/json",responseSchema:{type:"ARRAY",items:{type:"OBJECT",properties:{text:{type:"STRING",description:"La pregunta o punto de inspección, e.g., 'Detectar ruidos anómalos o golpeteo.'"},type:{type:"STRING",enum:["boolean","text"],description:"El tipo de entrada que necesita el inspector."}},propertyOrdering:["text","type"]}}}};try{const de=await Dy(se),Ie=JSON.parse(de);sessionStorage.setItem("suggestedChecklist",JSON.stringify(Ie)),_("✨ Checklist sugerido por IA listo. ¡Presiona 'Guardar Activo' para almacenarlo!")}catch(de){console.error("Error generating checklist:",de),_(`Error del Generador IA: ${de.message}. Usando plantilla por defecto.`),sessionStorage.removeItem("suggestedChecklist")}finally{w(!1)}},ce=async()=>{if(!V){_("Por favor, introduce una Descripción del activo para el análisis de criticidad.");return}w(!0),_(null);const se={contents:[{parts:[{text:`Descripción del Activo: "${V}". Basado en esta descripción, asigna una criticidad entre A (Muy Alta) y D (Baja).`}]}],systemInstruction:{parts:[{text:"Eres un Ingeniero de Confiabilidad. Analiza la siguiente descripción de activo. Tu tarea es asignar la criticidad más adecuada (A, B, C o D) y justificar brevemente por qué. La respuesta DEBE ser un objeto JSON de 2 campos, sin preámbulos ni markdown envolvente."}]},generationConfig:{responseMimeType:"application/json",responseSchema:{type:"OBJECT",properties:{criticality:{type:"STRING",enum:["A","B","C","D"]},justification:{type:"STRING",description:"Breve justificación del por qué de la criticidad asignada."}},propertyOrdering:["criticality","justification"]}}};try{const de=await Dy(se),Ie=JSON.parse(de);A(Ie.criticality),_(`✨ Criticidad sugerida por IA: ${Ie.criticality}. Justificación: ${Ie.justification}`)}catch(de){console.error("Error analyzing criticality:",de),_(`Error del Analizador IA: ${de.message}. No se pudo sugerir la criticidad.`)}finally{w(!1)}},Te=Z.useCallback(async q=>{if(q.preventDefault(),!p||!t||!i){_("El nombre del activo es obligatorio.");return}j(!0),_(null);try{const le=`/artifacts/${vn}/users/${i}/assets`,se=sessionStorage.getItem("suggestedChecklist"),de=se?JSON.parse(se):Ox;sessionStorage.removeItem("suggestedChecklist"),await ky(_i(t,le),{name:p,location:k,description:V,criticality:v,status:"Uninspected",createdAt:Lc(),checklist:de}),I(""),N(""),S(""),A("D")}catch(le){console.error("Error adding document: ",le),_("Error al guardar el activo: "+le.message)}finally{j(!1)}},[t,i,p,k,V,v]),$t=Z.useCallback(async(q,le,se)=>{if(!(!t||!i||!P)){j(!0),_(null);try{const de=`/artifacts/${vn}/users/${i}/inspections`;await ky(_i(t,de),{assetId:P.id,assetName:P.name,inspectorUserId:i,date:Lc(),results:q,notes:le,overallStatus:se});const Ie=iE(t,`/artifacts/${vn}/users/${i}/assets`,P.id);await wx(Ie,{status:se,lastInspectionDate:Lc()}),j(!1),T(null),R("list"),_("✅ Inspección guardada y estado del activo actualizado.")}catch(de){console.error("Error saving inspection:",de),_("Error al guardar la inspección: "+de.message),j(!1)}}},[t,i,P]);return o?C.jsxs("div",{className:"min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8 font-sans",children:[C.jsxs("header",{className:"mb-8 pb-4 border-b border-gray-700",children:[C.jsxs("div",{className:"flex justify-between items-center",children:[C.jsx("h1",{className:"text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400",children:"PIA (Predictive Inspection App)"}),C.jsxs("nav",{className:"flex space-x-3",children:[C.jsxs("button",{onClick:()=>At("list"),className:`px-3 py-2 rounded-lg font-semibold transition duration-150 flex items-center ${E==="list"?"bg-blue-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:[C.jsx(Py,{className:"w-5 h-5 mr-2"})," Activos"]}),C.jsxs("button",{onClick:()=>At("dashboard"),className:`px-3 py-2 rounded-lg font-semibold transition duration-150 flex items-center ${E==="dashboard"?"bg-teal-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`,children:[C.jsx(Ax,{className:"w-5 h-5 mr-2"})," Dashboard"]})]})]}),C.jsxs("p",{className:"text-sm text-gray-400 mt-1",children:[i&&`Usuario: ${i}`," | Entorno: ",vn]})]}),y&&C.jsxs("div",{className:"p-3 mb-4 bg-red-800 rounded-lg flex items-center shadow-lg",children:[C.jsx(Sx,{className:"w-5 h-5 mr-2"}),C.jsx("span",{className:"text-sm",children:y})]}),E==="list"&&C.jsxs(C.Fragment,{children:[C.jsxs("div",{className:"bg-gray-800 p-6 rounded-xl shadow-2xl mb-8",children:[C.jsxs("h2",{className:"text-2xl font-semibold mb-4 flex items-center text-teal-300",children:[C.jsx(xx,{className:"w-5 h-5 mr-2"})," Nuevo Activo y Generación Inteligente"]}),C.jsxs("form",{onSubmit:Te,className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[C.jsxs("div",{className:"md:col-span-2",children:[C.jsx("label",{htmlFor:"assetName",className:"block text-sm font-medium text-gray-400 mb-1",children:"1. Nombre del Activo (Ej: Bomba Principal M-1)"}),C.jsx("input",{id:"assetName",type:"text",value:p,onChange:q=>I(q.target.value),placeholder:"Escribe el nombre del activo",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150",required:!0,disabled:b||F})]}),C.jsxs("div",{className:"md:col-span-2",children:[C.jsx("label",{htmlFor:"assetLocation",className:"block text-sm font-medium text-gray-400 mb-1",children:"Ubicación"}),C.jsx("input",{id:"assetLocation",type:"text",value:k,onChange:q=>N(q.target.value),placeholder:"Ej: Planta Baja, Área 3",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150",disabled:b||F})]}),C.jsxs("div",{className:"md:col-span-2",children:[C.jsx("label",{htmlFor:"assetDescription",className:"block text-sm font-medium text-gray-400 mb-1",children:"2. Descripción y Contexto (Para Análisis IA)"}),C.jsx("textarea",{id:"assetDescription",value:V,onChange:q=>S(q.target.value),placeholder:"Ej: Motor eléctrico de 500HP. Componente crítico en la línea de producción, si falla se detiene toda la planta.",rows:"3",className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none",disabled:b||F})]}),C.jsxs("div",{className:"grid grid-cols-1 gap-4 md:col-span-2",children:[C.jsxs("div",{children:[C.jsx("label",{htmlFor:"assetCriticality",className:"block text-sm font-medium text-gray-400 mb-1",children:"3. Criticidad Actual"}),C.jsxs("select",{id:"assetCriticality",value:v,onChange:q=>A(q.target.value),className:"w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none",disabled:b||F,children:[C.jsx("option",{value:"A",children:"A (Alta)"}),C.jsx("option",{value:"B",children:"B (Media-Alta)"}),C.jsx("option",{value:"C",children:"C (Media-Baja)"}),C.jsx("option",{value:"D",children:"D (Baja)"})]})]}),C.jsxs("button",{type:"button",onClick:ce,className:`p-3 text-white font-bold rounded-lg transition duration-300 transform flex items-center justify-center ${F?"bg-indigo-600/70 cursor-not-allowed":"bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"}`,disabled:F,children:[F?C.jsx(Di,{className:"w-5 h-5 inline animate-spin mr-2"}):C.jsx(xy,{className:"w-5 h-5 inline mr-2"}),"Analizar Criticidad (IA)"]})]}),C.jsxs("div",{className:"md:col-span-4 flex justify-end space-x-4",children:[C.jsxs("button",{type:"button",onClick:ge,className:`p-3 text-white font-bold rounded-lg transition duration-300 transform flex items-center justify-center ${F?"bg-pink-600/70 cursor-not-allowed":"bg-pink-600 hover:bg-pink-700 hover:shadow-lg"}`,disabled:F||!p||!v,children:[F?C.jsx(Di,{className:"w-5 h-5 inline animate-spin mr-2"}):C.jsx(xy,{className:"w-5 h-5 inline mr-2"}),"Generar Checklist (IA)"]}),C.jsxs("button",{type:"submit",className:`p-3 text-white font-bold rounded-lg transition duration-300 transform flex items-center justify-center ${b?"bg-blue-600/70 cursor-not-allowed":"bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}`,disabled:b,children:[b?C.jsx(Di,{className:"w-5 h-5 inline animate-spin mr-2"}):C.jsx(gE,{className:"w-5 h-5 inline mr-2"}),"Guardar Activo y Checklist"]})]})]})]}),C.jsxs("div",{className:"bg-gray-800 p-6 rounded-xl shadow-2xl",children:[C.jsxs("h2",{className:"text-2xl font-semibold mb-4 flex items-center text-blue-300",children:[C.jsx(Py,{className:"w-5 h-5 mr-2"})," Mis Activos (",G.length," de ",u.length," mostrados)"]}),C.jsxs("div",{className:"relative mb-6",children:[C.jsx(Nx,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"}),C.jsx("input",{type:"text",placeholder:"Buscar por Nombre o Ubicación del Activo...",value:He,onChange:q=>gn(q.target.value),className:"w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"})]}),G.length===0?C.jsx("p",{className:"text-gray-400 italic",children:"No se encontraron activos que coincidan con la búsqueda."}):C.jsx("div",{className:"space-y-4",children:G.map(q=>C.jsxs("div",{className:"flex items-center p-4 bg-gray-700/50 rounded-lg shadow-md hover:bg-gray-700 transition duration-150 border-l-4 border-teal-400",children:[C.jsx("div",{className:`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold ${Y(q.criticality)}`,children:q.criticality}),C.jsxs("div",{className:"flex-grow",children:[C.jsx("h3",{className:"text-lg font-bold text-gray-50",children:q.name}),C.jsx("p",{className:"text-sm text-gray-300",children:q.location||"Sin ubicación"})]}),C.jsxs("div",{className:"flex-shrink-0 text-right flex items-center",children:[C.jsx("span",{className:`inline-block px-3 py-1 text-xs font-semibold rounded-full ${q.status==="ALERT"?"bg-red-600":"bg-green-600"} text-white mr-4`,children:q.status}),C.jsx("button",{className:"ml-4 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white text-sm font-medium",onClick:()=>{T(q),At("inspection",q)},children:"Inspeccionar"}),C.jsx("button",{className:"ml-2 p-2 bg-teal-600 rounded-lg hover:bg-teal-700 text-white text-sm font-medium",onClick:()=>{T(q),At("assetHistory",q)},children:"Historial"})]})]},q.id))})]})]}),E==="inspection"&&P&&C.jsx(jx,{asset:P,onBack:()=>At("list"),onSave:$t,loading:b}),E==="dashboard"&&C.jsx(Fx,{assets:u,latestInspections:f,allInspections:Bt,onInspectAssetHistory:q=>At("assetHistory",q)}),E==="assetHistory"&&P&&t&&i&&vn&&C.jsx(Lx,{db:t,userId:i,appId:vn,asset:P,onBack:()=>At("dashboard")}),C.jsx("footer",{className:"mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-500",children:"Aplicación PIA (V7.0) - Impulsada por React, Firestore y Gemini"})]}):C.jsxs("div",{className:"flex items-center justify-center min-h-screen bg-gray-900 text-white",children:[C.jsx(Di,{className:"w-8 h-8 animate-spin mr-2"})," Cargando aplicación..."]})};Wv(document.getElementById("root")).render(C.jsx(Z.StrictMode,{children:C.jsx(Ux,{})}));
