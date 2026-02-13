import{r as s,R as o}from"./index-XjwKth4j.js";function w({text:t="",speed:c=40}){const[i,a]=s.useState("");return s.useEffect(()=>{let l=0;a("");const f=setInterval(()=>{a(m=>m+t[l]),l++,l>=t.length&&clearInterval(f)},c);return()=>clearInterval(f)},[t,c]),o.createElement("pre",{className:"typewriter"},i)}function L({open:t,onClose:c}){const i=s.useRef(null),[a,l]=s.useState(""),[f,m]=s.useState(!1),p=`My love,

You make my life brighter every day. I cherish your laugh, your kindness, and the warmth of your hand in mine. Thank you for being you — my partner, my best friend, and my heart.

Forever yours,
❤️`;return s.useEffect(()=>{if(!t)return;let n=!1;const h=async()=>{const r=Date.now(),g=[{url:`https://api.quotable.io/random?tags=love&maxLength=140&_=${r}`,parse:e=>({content:e==null?void 0:e.content,author:e==null?void 0:e.author})},{url:`https://zenquotes.io/api/random?_=${r}`,parse:e=>{var u,y;return{content:(u=e==null?void 0:e[0])==null?void 0:u.q,author:(y=e==null?void 0:e[0])==null?void 0:y.a}}},{url:`https://dummyjson.com/quotes/random?_=${r}`,parse:e=>({content:e==null?void 0:e.quote,author:e==null?void 0:e.author})}];for(const e of g)try{const u=await fetch(e.url,{cache:"no-store"});if(!u.ok)continue;const y=await u.json(),v=e.parse(y);if(v!=null&&v.content)return v}catch{}return null};return(async()=>{m(!0);try{const r=await h();if(!(r!=null&&r.content))throw new Error("Failed to load love quote");if(!n){const g=`My love,

${r.content}

— ${r.author||"Someone who believes in love"}

Forever yours,
❤️`;l(g)}}catch{n||l(p)}finally{n||m(!1)}})(),()=>{n=!0}},[t]),s.useEffect(()=>{var h;if(!t)return;const n=E=>{E.key==="Escape"&&c()};return document.addEventListener("keydown",n),(h=i.current)==null||h.focus(),()=>{document.removeEventListener("keydown",n)}},[t,c]),t?o.createElement("section",{id:"love-letter",className:"letter-card","aria-labelledby":"love-letter-title"},o.createElement("div",{className:"letter-head"},o.createElement("h3",{id:"love-letter-title",className:"modal-title"},"A Love Letter"),o.createElement("button",{ref:i,type:"button",className:"close",onClick:c,"aria-label":"Close love letter"},"✕")),o.createElement("div",{className:"letter-body"},f?o.createElement("p",{className:"hint"},"Fetching a love note…"):o.createElement(w,{text:a||p,speed:25}))):null}export{L as default};
