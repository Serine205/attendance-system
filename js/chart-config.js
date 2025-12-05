/* js/chart-config.js - minimal chart renderer (no external lib). 
   We'll draw a simple pie chart on a canvas.
*/
function renderPieChart(canvasId, labels, values){
  const c = document.getElementById(canvasId);
  if(!c) return;
  c.width = 600; c.height = 300;
  const ctx = c.getContext('2d');
  const total = values.reduce((a,b)=>a+b,0);
  let start = 0;
  const colors = ['#6a5ae0','#ef4444','#0ea5a4','#f59e0b','#3b82f6'];
  for(let i=0;i<values.length;i++){
    const slice = values[i]/(total||1);
    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.arc(150,150,120,start,start+slice*Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    start+=slice*Math.PI*2;
  }
  // legend
  ctx.font = '14px Arial';
  let lx = 320, ly = 40;
  for(let i=0;i<labels.length;i++){
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(lx, ly-12, 16, 12);
    ctx.fillStyle = '#111';
    ctx.fillText(`${labels[i]}: ${values[i]}`, lx+22, ly);
    ly+=22;
  }
}
