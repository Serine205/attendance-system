/* js/students.js - client side helpers to add students to table (for attendance page) */
async function loadStudentsIntoTable(){
  try {
    const resp = await fetch('../data/students.json');
    const students = await resp.json();
    const tbody = document.getElementById('studentsTbody');
    tbody.innerHTML = '';
    students.forEach(s=>{
      const tr = document.createElement('tr');
      tr.classList.add('row-hover');
      tr.innerHTML = `
        <td>${s.student_id}</td>
        <td>${s.last_name}</td>
        <td>${s.first_name}</td>
        <td><input type="checkbox" name="present" data-id="${s.student_id}"></td>
        <td><input type="checkbox" name="participated" data-id="${s.student_id}"></td>
      `;
      tbody.appendChild(tr);
    });
  } catch(e){
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('studentsTbody')) loadStudentsIntoTable();
});
