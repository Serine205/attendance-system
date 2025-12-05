/* js/form-validation.js - validation for add student form */
function validateStudentForm(form){
  const id = form.student_id.value.trim();
  const last = form.last_name.value.trim();
  const first = form.first_name.value.trim();
  const email = form.email.value.trim();
  let ok = true;

  const idErr = document.getElementById('err-id');
  const lastErr = document.getElementById('err-last');
  const firstErr = document.getElementById('err-first');
  const emailErr = document.getElementById('err-email');

  idErr.style.display = lastErr.style.display = firstErr.style.display = emailErr.style.display = 'none';

  if(!/^\d+$/.test(id)){
    idErr.textContent = 'Matricule requis et doit contenir que des chiffres';
    idErr.style.display = 'block'; ok=false;
  }
  if(!/^[A-Za-zÀ-ÖØ-öø-ÿ \-']{2,}$/.test(last)){
    lastErr.textContent = 'Nom invalide';
    lastErr.style.display = 'block'; ok=false;
  }
  if(!/^[A-Za-zÀ-ÖØ-öø-ÿ \-']{2,}$/.test(first)){
    firstErr.textContent = 'Prénom invalide';
    firstErr.style.display = 'block'; ok=false;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    emailErr.textContent = 'Email invalide';
    emailErr.style.display = 'block'; ok=false;
  }
  return ok;
}

// attach behavior if form present
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('addStudentForm');
  if(!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(!validateStudentForm(form)) return;
    // submit via AJAX to php (JSON-first)
    const fd = new FormData(form);
    try {
      const res = await fetch(form.action, {method:'POST', body:fd});
      const text = await res.text();
      document.getElementById('add-confirm').textContent = text;
      document.getElementById('add-confirm').style.display = 'block';
      form.reset();
    } catch(err){
      document.getElementById('add-confirm').textContent = 'Erreur: '+err.message;
      document.getElementById('add-confirm').style.color = 'var(--danger)';
      document.getElementById('add-confirm').style.display = 'block';
    }
  });
});
