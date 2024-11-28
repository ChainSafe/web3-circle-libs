import{r as d,j as e,R as p}from"./jsx-runtime-BMrMXMSG.js";import{h as j,j as g,_ as f,L as w,N as k,M as v,k as S,S as b}from"./components-DLJPF6N_.js";import{c as n}from"./createLucideIcon-C4w8rdXb.js";import{u as L,d as N,O as M}from"./index-BvnfiDyM.js";import"./index-BlA7Mg33.js";/**
 * @remix-run/react v2.15.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let x="positions";function O({getKey:t,...a}){let{isSpaMode:i}=j(),r=L(),h=N();g({getKey:t,storageKey:x});let u=d.useMemo(()=>{if(!t)return null;let s=t(r,h);return s!==r.key?s:null},[]);if(i)return null;let m=((s,y)=>{if(!window.history.state||!window.history.state.key){let o=Math.random().toString(32).slice(2);window.history.replaceState({key:o},"")}try{let c=JSON.parse(sessionStorage.getItem(s)||"{}")[y||window.history.state.key];typeof c=="number"&&window.scrollTo(0,c)}catch(o){console.error(o),sessionStorage.removeItem(s)}}).toString();return d.createElement("script",f({},a,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${m})(${JSON.stringify(x)}, ${JSON.stringify(u)})`}}))}/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=n("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=n("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=n("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),E="/assets/circle-logo-D9PjkPMG.svg";function l({to:t,icon:a,label:i}){return e.jsxs(k,{to:t,className:({isActive:r})=>`flex items-center gap-3 px-4 py-2 rounded-md ${r?"bg-purple-100 text-purple-700":"text-gray-600"} hover:bg-purple-50`,children:[p.cloneElement(a,{size:20}),i]})}function I(){return e.jsxs("aside",{className:"bg-white w-64 h-full shadow-md flex flex-col",children:[e.jsx("div",{className:"p-6 max-w-[180px]",children:e.jsx(w,{to:"/",children:e.jsx("img",{src:E,alt:"Circle Logo"})})}),e.jsxs("nav",{className:"flex-1 px-4",children:[e.jsx(l,{to:"/overview",icon:e.jsx(D,{}),label:"Overview"}),e.jsx(l,{to:"/customers",icon:e.jsx(C,{}),label:"Customers"}),e.jsx(l,{to:"/products",icon:e.jsx(R,{}),label:"Products"})]})]})}const P=()=>[{title:"Circle SDK Demo"}];function B({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(v,{}),e.jsx(S,{})]}),e.jsxs("body",{children:[t,e.jsx(O,{}),e.jsx(b,{})]})]})}function T(){return e.jsxs("div",{className:"flex h-screen",children:[e.jsx(I,{}),e.jsx("div",{className:"flex-1 p-12 overflow-y-auto bg-gray-50",children:e.jsx(M,{})})]})}export{B as Layout,T as default,P as meta};
