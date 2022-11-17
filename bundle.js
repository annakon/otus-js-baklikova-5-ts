!function(){"use strict";class e{field=[];constructor(e=0,t=1){const i=[];for(let n=0;n<t;n++){i[n]=[];for(let t=0;t<e;t++)i[n][t]=0;this.field=i}}getAliveCellCount(e,t){let i=0;for(let n=t-1;n<=t+1;n++)for(let l=e-1;l<=e+1;l++)l===e&&n===t||1!==this.field[n]?.[l]||i++;return i}nextGeneration(){let e=!1;for(let t=0;t<this.field.length;t++)for(let i=0;i<this.field[t].length;i++){const n=this.getAliveCellCount(i,t);3===n&&0===this.field[t][i]&&(0===this.field[t][i]&&(e=!0),this.field[t][i]=1),3!==n&&2!==n&&1===this.field[t][i]&&(1===this.field[t][i]&&(e=!0),this.field[t][i]=0)}return e}getState(){return this.field}toggleCellState(e,t){1===this.field[t][e]?this.field[t][e]=0:this.field[t][e]=1}setSize(e,t){const i=[];for(let n=0;n<t;n++){i.push([]);for(let t=0;t<e;t++)void 0!==this.field[n]&&void 0!==this.field[n][t]?i[n][t]=this.field[n][t]:i[n][t]=0}this.field=i}}class t{constructor(e,t,i,n){this.state=t,this.el=e,this.el.innerHTML="<div class='gameField'></div><div class='gameControls'></div>";const l=this.el.querySelector(".gameControls"),s=document.createElement("button");s.innerHTML="Play",s.className="run-button run-button--stopped",s.addEventListener("click",(e=>{i("Play"===s.innerHTML)})),l.appendChild(s);let a=[document.createElement("input"),document.createElement("input")];for(let e=0;e<2;e++)a[e].type="number",a[e].className=0===e?"field-size field-size--width":"field-size field-size--height",l.appendChild(a[e]),a[e].addEventListener("change",(e=>{n(a[0].valueAsNumber,a[1].valueAsNumber)}));const d=document.createElement("input");d.type="range",d.className="field-range",l.appendChild(d),d.addEventListener("change",(e=>{this.state.stepDurationMs=d.valueAsNumber}))}updateGameField(e,t){const i=this.el.querySelector(".gameField");i.innerHTML="";const n=document.createElement("table");i.appendChild(n);for(let i=0;i<e.length;i++){const l=document.createElement("tr");n.appendChild(l);for(let n=0;n<e[i].length;n++){const s=document.createElement("td");1===e[i][n]?s.className="cell cell--alive":s.className="cell cell--dead",s.addEventListener("click",(e=>{t(n,i)})),l.appendChild(s)}}}updateGameState(e){this.state={...this.state,...e},this.el.querySelector(".field-size--width").valueAsNumber=this.state.width,this.el.querySelector(".field-size--height").valueAsNumber=this.state.height;const t=this.el.querySelector("input[type='range']");"number"!=typeof e.stepDurationMs||isNaN(e.stepDurationMs)||(t.max=String(2*e.stepDurationMs),t.valueAsNumber=e.stepDurationMs);const i=this.el.querySelector(".run-button");this.state.isRunning?(i.className="run-button run-button--runned",i.innerHTML="Stop",t.disabled=!0):(i.className="run-button run-button--stopped",i.innerHTML="Play",t.disabled=!1)}getDuration(){return this.state.stepDurationMs}}const i=document.getElementById("app");new class{constructor(i,n,l,s=1e3){const a=new e(5,5);let d;function r(e,t){a.toggleCellState(e,t),d.updateGameField(a.getState(),r)}d=new t(i,{width:n,height:l,isRunning:!1,stepDurationMs:s},(e=>{e?(a.nextGeneration(),d.updateGameField(a.getState(),r),this.timerId=setInterval((()=>{a.nextGeneration()?d.updateGameField(a.getState(),r):(clearInterval(this.timerId),d.updateGameState({isRunning:!1}))}),d.getDuration())):(d.updateGameField(a.getState(),r),clearInterval(this.timerId)),d.updateGameState({isRunning:e})}),(function(e,t){a.setSize(e,t),d.updateGameField(a.getState(),r),d.updateGameState({width:e,height:t})}));const u=a.getState();a.setSize(u[0].length,u.length),d.updateGameField(u,r),d.updateGameState({isRunning:!1,width:u[0].length,height:u.length,stepDurationMs:s})}}(i,5,5,1e3)}();
//# sourceMappingURL=bundle.js.map