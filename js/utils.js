/* js/utils.js - helpers */
const API_BASE = (() => {
  // endpoints PHP relative path
  return '../php';
})();

function fetchJSON(url, opts){
  return fetch(url, opts).then(r=>{
    if(!r.ok) throw new Error('HTTP '+r.status);
    return r.json();
  });
}

function postForm(url, data){
  return fetch(url, {method:'POST', body: data});
}

function formatDateYMD(d){
  const dt = d ? new Date(d) : new Date();
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth()+1).padStart(2,'0');
  const dd = String(dt.getDate()).padStart(2,'0');
  return `${yyyy}-${mm}-${dd}`;
}
