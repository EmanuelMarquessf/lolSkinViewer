import{_ as f,t as o,v as a,x as e,L as S,N as m,r as _,G as C,z as v,W as E,X as F,O as d,V as I,P as p,Q as b,R as w,y,C as D,D as L}from"./entry.1f0b25eb.js";const V={},B={class:"h-4 w-8 text-gray-500","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20"},N=e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"},null,-1),R=[N];function A(l,s){return o(),a("svg",B,R)}const z=f(V,[["render",A]]),G={},O={class:"w-full h-[100px] bg-black"},P=S('<div class="flex flex-col mx-48 gap-4"><div class="flex flex-row"></div><div class="w-full h-[1px] bg-[#9F9E9E]"></div><div class="flex flex-row justify-between"><span class="text-sm font-extralight text-[#9F9E9E]">©2023 Design and Develop by Emanuel Fonseca - Nell</span><span class="text-sm font-extralight text-[#9F9E9E]">API - Riot Games, Inc - Ddragons</span></div></div>',1),T=[P];function M(l,s){return o(),a("div",O,T)}const Q=f(G,[["render",M]]);const U=l=>(D("data-v-344abecb"),l=l(),L(),l),W={class:"flex flex-col lg:flex-row gap-8 lg:gap-0 justify-between items-center my-10 m-4 mx-4 md:mx-10 xl:mx-28 2xl:mx-64"},X=U(()=>e("div",{class:"flex flex-col gap-4"},[e("span",{class:"text-center lg:text-left text-5xl md:text-6xl font-sans text-[#90703b] uppercase"},"League of Legends"),e("span",{class:"text-center lg:text-left text-xl md:text-3xl font-thin font-serif text-[#856533]"},"Champion Select")],-1)),Z={class:"relative"},q={class:"absolute inset-y-0 flex items-center ps-3 pointer-events-none"},H={class:"flex flex-row justify-center flex-wrap gap-8 my-10 md:my-20 mx-4 md:mx-10 xl:mx-28 2xl:mx-64"},J=["href"],K={class:"flex flex-col justify-center itens-center w-full h-[20px] md:h-[25px] lg:h-[50px] bg-black/80 content-center"},Y={class:"text-center text-[#eae0cd] text-lg md:text-xl lg:text-2xl"},ee=["href"],te={class:"flex flex-col justify-center itens-center w-full h-[20px] md:h-[25px] lg:h-[50px] bg-black/80 content-center"},se={class:"text-center text-[#eae0cd] text-lg md:text-xl lg:text-2xl"},ne={__name:"index",async setup(l){let s,r;const i=([s,r]=m(()=>$fetch("https://ddragon.leagueoflegends.com/api/versions.json").catch(c=>c.data)),s=await s,r(),s)[0],$=([s,r]=m(()=>$fetch(`https://ddragon.leagueoflegends.com/cdn/${i}/data/pt_BR/champion.json`).catch(c=>c.data)),s=await s,r(),s),g=_(Object.values($.data)),x=_([]),n=_("");function h(){x.value=g.value.filter(c=>c.name.toLowerCase().includes(n.value.toLowerCase()))}return C(()=>n.value,async()=>{(n.value.length>=3||n.value.length==0)&&h()}),(c,u)=>{const k=z,j=Q;return o(),a(p,null,[e("div",W,[X,e("div",Z,[e("div",q,[e("button",{onClick:h},[v(k)])]),E(e("input",{type:"search","onUpdate:modelValue":u[0]||(u[0]=t=>I(n)?n.value=t:null),class:"block w-[250px] md:w-[400px] p-4 ps-12 text-lg text-[#e4dac8] border border-b-[#90703b] border-t-0 border-l-0 border-r-0 bg-[#141124]",placeholder:"Find a Champion"},null,512),[[F,d(n)]])])]),e("div",H,[d(x).length>0?(o(!0),a(p,{key:0},b(d(x),t=>(o(),a("div",{key:t.id,class:"itens-center bg-[#0a0a0b] rounded shadow-md cursor-pointer"},[e("a",{href:`${d(i)}/${t.id}`},[e("div",{class:"flex flex-col justify-end bg-top bg-cover w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[363px]",style:w({"background-image":`url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${t.id}_0.jpg)`})},[e("div",K,[e("span",Y,y(t.name),1)])],4)],8,J)]))),128)):(o(!0),a(p,{key:1},b(d(g),t=>(o(),a("div",{key:t.id,class:"itens-center bg-[#0a0a0b] rounded shadow-md cursor-pointer"},[e("a",{href:`${d(i)}/${t.id}`},[e("div",{class:"flex flex-col justify-end bg-top bg-cover w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[363px]",style:w({"background-image":`url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${t.id}_0.jpg)`})},[e("div",te,[e("span",se,y(t.name),1)])],4)],8,ee)]))),128))]),v(j)],64)}}},le=f(ne,[["__scopeId","data-v-344abecb"]]);export{le as default};
