/* js/attendance.js - manage session creation and taking attendance */
document.addEventListener('DOMContentLoaded', ()=>{
  const createBtn = document.getElementById('createSessionBtn');
  const submitBtn = document.getElementById('submitAttendance');
  const showReportBtn = document.getElementById('showReportBtn');

  if(createBtn){
    createBtn.addEventListener('click', async ()=>{
      const date = document.getElementById('sessionDate').value || formatDateYMD();
      // call PHP create_session endpoint
      try {
        const fd = new FormData();
        fd.append('date', date);
        const res = await fetch('../php/attendance/create_session.php', {method:'POST', body:fd});
        const j = await res.json();
        if(j.success) alert('Session créée : '+j.session_id);
        else alert('Erreur: '+j.message);
      } catch(e){ alert(e.message); }
    });
  }

  if(submitBtn){
    submitBtn.addEventListener('click', async ()=>{
      const date = document.getElementById('sessionDate').value || formatDateYMD();
      const presentBoxes = [...document.querySelectorAll('input[name="present"]')];
      const participatedBoxes = [...document.querySelectorAll('input[name="participated"]')];

      const attendance = presentBoxes.map(px=>{
        const id = px.dataset.id;
        const status = px.checked ? 'present' : 'absent';
        const partBox = participatedBoxes.find(p => p.dataset.id === id);
        const participated = !!(partBox && partBox.checked);
        return {student_id:id, status, participated};
      });

      try {
        const fd = new FormData();
        fd.append('date', date);
        fd.append('attendance', JSON.stringify(attendance));
        const res = await fetch('../php/attendance/take_attendance.php', {method:'POST', body:fd});
        const j = await res.json();
        if(j.success) {
          alert('Présence enregistrée: '+j.file);
        } else {
          alert('Erreur: '+ j.message);
        }
      } catch(e){
        alert('Erreur réseau: '+e.message);
      }
    });
  }

  if(showReportBtn){
    showReportBtn.addEventListener('click', async ()=>{
      const date = document.getElementById('sessionDate').value || formatDateYMD();
      // read attendance file
      try {
        const res = await fetch(`../php/attendance/read_attendance_data.php?date=${date}`);
        const j = await res.json();
        if(j.success){
          // display summary
          const total = j.attendance.length;
          const present = j.attendance.filter(a=>a.status==='present').length;
          const participated = j.attendance.filter(a=>a.participated).length;
          document.getElementById('reportArea').style.display = 'block';
          const summary = document.getElementById('reportSummary');
          summary.innerHTML = `<div class="kpi card"><div>Total</div><div style="font-weight:800">${total}</div></div>
                               <div class="kpi card"><div>Présents</div><div style="font-weight:800">${present}</div></div>
                               <div class="kpi card"><div>Participation</div><div style="font-weight:800">${participated}</div></div>`;
          // create chart via chart-config (global function)
          if(typeof renderPieChart === 'function'){
            renderPieChart('reportChart', ['Présent','Absent','Participé'], [present, total-present, participated]);
          }
        } else {
          alert('Aucune donnée: '+j.message);
        }
      } catch(e){ alert(e.message) }
    });
  }
});
