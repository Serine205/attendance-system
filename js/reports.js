/* js/reports.js - listing attendance files and rendering charts */
async function loadReportsList(){
  // naive implementation: server endpoint could return list of attendance files
  try {
    const res = await fetch('../php/attendance/read_attendance_data.php?list=true');
    const j = await res.json();
    const container = document.getElementById('reportsList');
    container.innerHTML = '';
    if(!j.success){ container.innerHTML = '<div class="small">No reports</div>'; return; }
    j.files.forEach(f=>{
      const card = document.createElement('div');
      card.className = 'card row';
      card.style.justifyContent='space-between';
      card.innerHTML = `<div><strong>${f}</strong><div class="small">Cliquez pour ouvrir</div></div>
                        <div><button class="button" onclick="openReport('${f}')">Ouvrir</button></div>`;
      container.appendChild(card);
    });
  } catch(e){ console.error(e); }
}

async function openReport(filename){
  try {
    const res = await fetch(`../php/attendance/read_attendance_data.php?file=${encodeURIComponent(filename)}`);
    const j = await res.json();
    if(!j.success){ alert('Erreur: '+j.message); return; }
    // simple summary window
    const total = j.attendance.length;
    const present = j.attendance.filter(a=>a.status==='present').length;
    const participated = j.attendance.filter(a=>a.participated).length;
    const win = window.open('','Report','width=700,height=500');
    win.document.write(`<h3>Rapport: ${filename}</h3><p>Total: ${total} — Présents: ${present} — Participations: ${participated}</p>`);
    win.document.close();
  } catch(e){ alert(e.message); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('reportsList')) loadReportsList();
});
