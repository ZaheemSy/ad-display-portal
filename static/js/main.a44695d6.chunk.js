(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(2),o=a.n(r);a(13);a(3);var i=function(){const[e,t]=Object(n.useState)([]),[a,r]=Object(n.useState)(!1),[o,i]=Object(n.useState)(0),[c,m]=Object(n.useState)(""),[u,p]=Object(n.useState)(""),[d,s]=Object(n.useState)(""),[g,E]=Object(n.useState)("");return l.a.createElement("div",{style:{fontFamily:"Arial",padding:"20px"}},l.a.createElement("h1",null,"Ad Display Portal"),l.a.createElement("div",{style:{marginBottom:"20px"}},l.a.createElement("button",{style:{padding:"10px 20px",marginRight:"10px",backgroundColor:"black",color:"white",border:"none",cursor:"pointer"}},"Choose Images"),l.a.createElement("button",{style:{padding:"10px 20px",backgroundColor:"black",color:"white",border:"none",cursor:"pointer"}},"List Images")),l.a.createElement("div",null,l.a.createElement("h3",null,"Uploaded Image(s) List"),l.a.createElement("div",{style:{border:"1px solid black",height:"100px",overflowY:"scroll",marginBottom:"20px"}},e.map((e,t)=>l.a.createElement("p",{key:t,style:{padding:"5px"}},e.file.name)))),l.a.createElement("div",{style:{marginBottom:"20px",display:"flex",gap:"20px"}},l.a.createElement("div",null,l.a.createElement("h3",null,"Common Start/End Dates and Times"),l.a.createElement("div",null,l.a.createElement("label",null,"Start Date:",l.a.createElement("input",{type:"date",value:c,onChange:e=>m(e.target.value),style:{marginLeft:"10px"}}))),l.a.createElement("div",null,l.a.createElement("label",null,"End Date:",l.a.createElement("input",{type:"date",value:u,onChange:e=>p(e.target.value),style:{marginLeft:"10px"}}))),l.a.createElement("div",null,l.a.createElement("label",null,"Start Time:",l.a.createElement("input",{type:"time",value:d,onChange:e=>s(e.target.value),style:{marginLeft:"10px"}}))),l.a.createElement("div",null,l.a.createElement("label",null,"End Time:",l.a.createElement("input",{type:"time",value:g,onChange:e=>E(e.target.value),style:{marginLeft:"10px"}})))),l.a.createElement("div",null,l.a.createElement("div",{style:{marginBottom:"10px"}},l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",checked:a,onChange:e=>r(e.target.checked),style:{marginRight:"10px"}}),"Divide Time Duration Equally")),a&&l.a.createElement("div",null,l.a.createElement("label",null,"Duration in Minutes:",l.a.createElement("input",{type:"number",value:o,onChange:e=>i(e.target.value),style:{marginLeft:"10px"}}))))),l.a.createElement("div",{style:{display:"flex",flexDirection:"column",border:"1px solid black",padding:"10px"}},e.map((n,r)=>l.a.createElement("div",{key:r,style:{display:"flex",alignItems:"center",marginBottom:"10px",justifyContent:"space-between"}},l.a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"20px"}},l.a.createElement("div",{style:{width:"60px",height:"60px",backgroundColor:"red",display:"flex",justifyContent:"center",alignItems:"center",color:"white"}},"Thumbnail"),l.a.createElement("p",null,n.file.name)),l.a.createElement("input",{type:"number",placeholder:"Duration in seconds",value:a?e.length>0&&o>0?Math.floor(60*o/e.length):0:n.duration,onChange:a=>((a,n)=>{const l=[...e];l[a].duration=n,t(l)})(r,a.target.value),disabled:a}),l.a.createElement("button",{onClick:()=>(a=>{const n=[...e];n.splice(a,1),t(n)})(r),style:{backgroundColor:"red",color:"white",padding:"10px 20px",border:"none",cursor:"pointer"}},"Remove")))),l.a.createElement("button",{onClick:async()=>{console.log("Submitting:",e,c,u,d,g)},style:{marginTop:"20px",padding:"10px 20px",backgroundColor:"blue",color:"white",border:"none",cursor:"pointer"}},"Submit"))};o.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(i,null)))},4:function(e,t,a){e.exports=a(14)}},[[4,1,2]]]);
//# sourceMappingURL=main.a44695d6.chunk.js.map