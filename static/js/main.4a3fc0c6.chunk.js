(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(2),o=a.n(r);a(13);var i=function(e){let{onUpload:t}=e;const[a,r]=Object(n.useState)([]);return l.a.createElement("div",null,l.a.createElement("input",{type:"file",multiple:!0,accept:"image/*",onChange:e=>{const a=Array.from(e.target.files);r(a),t(a)},style:{marginBottom:"10px"}}),l.a.createElement("div",{style:{marginTop:"10px"}},a.map((e,t)=>l.a.createElement("p",{key:t},e.name))))},c=a(3),m=a.n(c);var s=function(){const[e,t]=Object(n.useState)([]),[a,r]=Object(n.useState)(!1),[o,c]=Object(n.useState)(0),[s,p]=Object(n.useState)(!1),[d,u]=Object(n.useState)(""),g=()=>e.length>0&&o>0?Math.floor(60*o/e.length):0;return l.a.createElement("div",{style:{padding:"20px",fontFamily:"Arial"}},l.a.createElement("h1",null,"Ad Display Portal"),l.a.createElement(i,{onUpload:async e=>{const a=await Promise.all(Array.from(e).map(e=>(e=>new Promise(t=>{m.a.imageFileResizer(e,800,800,"JPEG",90,0,e=>t(e),"base64")}))(e)));t(a.map((t,a)=>({file:e[a],base64:t,duration:0})))}}),e.length>0&&l.a.createElement("div",{style:{marginTop:"20px"}},l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",checked:a,onChange:e=>r(e.target.checked)}),"Divide time Duration equally"),a&&l.a.createElement("div",{style:{marginTop:"10px"}},l.a.createElement("label",null,"Total Duration (in minutes): "),l.a.createElement("input",{type:"number",value:o,onChange:e=>c(e.target.value),style:{marginLeft:"10px"}}))),e.length>0&&l.a.createElement("div",{style:{marginTop:"20px"}},l.a.createElement("h3",null,"Uploaded Images"),e.map((n,r)=>l.a.createElement("div",{key:r,style:{display:"flex",alignItems:"center",marginBottom:"10px"}},l.a.createElement("img",{src:n.base64,alt:n.file.name,style:{width:"60px",height:"60px"}}),l.a.createElement("input",{type:"number",value:a?g():n.duration,onChange:a=>((a,n)=>{const l=[...e];l[a].duration=n,t(l)})(r,a.target.value),disabled:a,style:{marginLeft:"10px"}}),l.a.createElement("button",{onClick:()=>(a=>{const n=[...e];n.splice(a,1),t(n)})(r),style:{marginLeft:"10px"}},"Remove")))),l.a.createElement("button",{onClick:async()=>{p(!0),u("");for(const t of e){const e={imageName:t.file.name,imageUrl:t.base64,startDate:"2024-11-20",endDate:"2024-11-25",startTime:"08:00:00",endTime:"18:00:00",duration:a?g():Number(t.duration)};console.log("data sending",JSON.stringify(e));try{const a=await fetch("https://ad-display-backend.onrender.com/api/images",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(a.ok){const e=await a.json();console.log(`Image ${t.file.name} uploaded successfully:`,e),u(`Image ${t.file.name} uploaded successfully!`)}else{const e=await a.json();console.error(`Error uploading ${t.file.name}:`,e.error),u(e.error||`Failed to upload ${t.file.name}.`)}}catch(n){console.error(`Error uploading ${t.file.name}:`,n),u(`An error occurred while uploading ${t.file.name}.`)}}p(!1),t([])},disabled:!a&&0!==e.length&&e.some(e=>0===e.duration)||s,style:{marginTop:"20px",padding:"10px 20px",backgroundColor:"blue",color:"white"}},s?"Uploading...":"Submit"),d&&l.a.createElement("p",{style:{marginTop:"20px",color:"red"}},d))};o.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(s,null)))},4:function(e,t,a){e.exports=a(14)}},[[4,1,2]]]);
//# sourceMappingURL=main.4a3fc0c6.chunk.js.map