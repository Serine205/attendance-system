/* js/main.js */
document.addEventListener('DOMContentLoaded', async ()=>{
  // load basic KPIs from data/students.json and attendance files
  try {
    const resp = await fetch('../data/students.json');
    const students = await resp.json();
    document.getElementById('kpi-students').textContent = students.length;
  } catch(e){
    document.getElementById('kpi-students').textContent = '0';
  }

  // nav toggle
  const toggle = document.querySelector('.nav-toggle');
  if(toggle){
    toggle.addEventListener('click', ()=>{
      const links = document.querySelector('.nav-links');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      links.style.display = expanded ? 'none' : 'flex';
    });
  }
});
