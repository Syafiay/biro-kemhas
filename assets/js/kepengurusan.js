/* ---------------- Star field ---------------- */
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
  const count = Math.floor((canvas.width * canvas.height) / 9000);
  stars = Array.from({length: count}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.1 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 0.8
  }));
}
function drawStars(t){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const s of stars){
    const alpha = 0.25 + 0.55 * (0.5 + 0.5*Math.sin(t*0.001*s.speed + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(200,220,255,${alpha.toFixed(2)})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
resizeCanvas();
requestAnimationFrame(drawStars);
window.addEventListener('resize', () => { resizeCanvas(); drawLines(); });

/* ---------------- Connector lines ---------------- */
const svg = document.getElementById('lines');
const chart = document.getElementById('chart');

function centerOf(el, container){
  const r = el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: r.left - c.left + r.width/2, y: r.top - c.top + r.height/2 };
}

function pathBetween(a, b){
  const midY = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
}

function drawLines(){
  const cRect = chart.getBoundingClientRect();
  svg.setAttribute('width', cRect.width);
  svg.setAttribute('height', cRect.height);
  svg.setAttribute('viewBox', `0 0 ${cRect.width} ${cRect.height}`);

  const leader = centerOf(document.getElementById('node-leader'), chart);
  const coLeader = centerOf(document.getElementById('node-co-leader'), chart);
  const m1 = centerOf(document.getElementById('node-mentor-1'), chart);
  const m2 = centerOf(document.getElementById('node-mentor-2'), chart);
  const m3 = centerOf(document.getElementById('node-mentor-3'), chart);
  const m4 = centerOf(document.getElementById('node-mentor-4'), chart);
  const m5 = centerOf(document.getElementById('node-mentor-5'), chart);
  const t1 = centerOf(document.getElementById('node-team-1'), chart);
  const t2 = centerOf(document.getElementById('node-team-2'), chart);
  const t3 = centerOf(document.getElementById('node-team-3'), chart);
  const t4 = centerOf(document.getElementById('node-team-4'), chart);
  const t5 = centerOf(document.getElementById('node-team-5'), chart);
  // pull team anchor point up to top of card
  t1.y -= 60; t2.y -= 60; t3.y -= 60; t4.y -= 60; t5.y -= 60;

  const links = [
    [leader, m1, 'teal'], [leader, m2, 'violet'],
    [coLeader, m3, 'teal'], [coLeader, m4, 'violet'], [coLeader, m5, 'teal'],
    [m1, t1, 'teal'], [m2, t2, 'violet'], [m3, t3, 'teal'], [m4, t4, 'violet'], 
    [m5, t5, 'teal']
  ];

  svg.innerHTML = `
    <defs>
      <linearGradient id="gTeal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f0b94d" stop-opacity=".9"/>
        <stop offset="100%" stop-color="#2dd8c4" stop-opacity=".55"/>
      </linearGradient>
      <linearGradient id="gViolet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f0b94d" stop-opacity=".9"/>
        <stop offset="100%" stop-color="#9b7dff" stop-opacity=".55"/>
      </linearGradient>
    </defs>
  ` + links.map(([a,b,tone]) => `
      <path d="${pathBetween(a,b)}" fill="none" stroke="url(#g${tone==='teal'?'Teal':'Violet'})" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
      <path d="${pathBetween(a,b)}" fill="none" stroke="${tone==='teal'?'#bdf4ec':'#e2d9ff'}" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="2 14" class="flow">
        <animate attributeName="stroke-dashoffset" from="0" to="-160" dur="${3.5 + Math.random()}s" repeatCount="indefinite"/>
      </path>
  `).join('');
}

window.addEventListener('load', drawLines);

/* ---------------- Member data ---------------- */
const akademik = [
  {name:'Dewi', id:'AKD-01', full:'Dewi Anggraini', jurusan:'Manajemen Pendidikan', angkatan:'2023'},
  {name:'Eko', id:'AKD-02', full:'Eko Prasetyo', jurusan:'Pendidikan Bahasa Arab', angkatan:'2023'},
  {name:'Faisal', id:'AKD-03', full:'Faisal Rahman', jurusan:'Manajemen Pendidikan', angkatan:'2022'},
  {name:'Gita', id:'AKD-04', full:'Gita Nuraini', jurusan:'Pendidikan Bahasa Arab', angkatan:'2023'},
];
const organisasi = [
  {name:'Hendra', id:'ORG-01', full:'Hendra Wijaya', jurusan:'Manajemen Pendidikan', angkatan:'2022'},
  {name:'Intan', id:'ORG-02', full:'Intan Permata', jurusan:'Manajemen Pendidikan', angkatan:'2023'},
  {name:'Joko', id:'ORG-03', full:'Joko Susilo', jurusan:'Pendidikan Bahasa Arab', angkatan:'2022'},
  {name:'Kevin', id:'ORG-04', full:'Kevin Halim', jurusan:'Manajemen Pendidikan', angkatan:'2023'},
];
const journalist = [
  {name:'Lina', id:'JRN-01', full:'Lina Marlina', jurusan:'Manajemen Pendidikan', angkatan:'2022'},
  {name:'Mira', id:'JRN-02', full:'Mira Sari', jurusan:'Pendidikan Bahasa Arab', angkatan:'2023'},
];
const administrasi = [
    {name:'Nina', id:'ADM-01', full:'Nina Rahmawati', jurusan:'Manajemen Pendidikan', angkatan:'2022'},
    {name:'Omar', id:'ADM-02', full:'Omar Faruk', jurusan:'Pendidikan Bahasa Arab', angkatan:'2023'},
];
const web = [
    {name:'Rina', id:'WEB-01', full:'Rina Putri', jurusan:'Manajemen Pendidikan', angkatan:'2022'},
    {name:'Sinta', id:'WEB-02', full:'Sinta Dewi', jurusan:'Pendidikan Bahasa Arab', angkatan:'2023'},
];

function initials(name){ return name.slice(0,2).toUpperCase(); }

function renderTeam(containerId, list, role){
  const el = document.getElementById(containerId);
  el.innerHTML = list.map(m => `
    <div class="member" tabindex="0" data-member='${JSON.stringify({name:m.full, role, id:m.id, angkatan:m.angkatan, jurusan:m.jurusan})}'>
      <div class="m-avatar">${initials(m.name)}</div>
      <div class="m-name">${m.name}</div>
    </div>
  `).join('');
}
renderTeam('team-akademik', akademik, 'Anggota Divisi Akademik');
renderTeam('team-organisasi', organisasi, 'Anggota Divisi Organisasi');
renderTeam('team-journalist', journalist, 'Anggota Divisi Journalist');
renderTeam('team-administrasi', administrasi, 'Anggota Divisi Administrasi');
renderTeam('team-website', web, 'Anggota Divisi Website');
/* ---------------- Modal ---------------- */
const modalBg = document.getElementById('modalBg');
const modalCard = document.getElementById('modalCard');

function openModal(data){
  modalCard.innerHTML = `
    <div class="m-avatar" style="background:linear-gradient(135deg,#2dd8c4,#7fe9db); color:#050912; display:flex; align-items:center; justify-content:center; font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:20px;">${initials(data.name)}</div>
    <h3>${data.name}</h3>
    <div class="role">${data.role}</div>
    <dl>
      <dt>Designation</dt><dd>${data.id}</dd>
      <dt>Angkatan</dt><dd>${data.angkatan}</dd>
      <dt>Program Studi</dt><dd>${data.jurusan}</dd>
    </dl>
    <button class="modal-close" id="modalCloseBtn">Tutup</button>
  `;
  modalBg.classList.add('open');
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
}
function closeModal(){ modalBg.classList.remove('open'); }
modalBg.addEventListener('click', e => { if(e.target === modalBg) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

document.querySelectorAll('[data-member]').forEach(el => {
  el.addEventListener('click', () => openModal(JSON.parse(el.dataset.member)));
  el.addEventListener('keydown', e => { if(e.key === 'Enter') openModal(JSON.parse(el.dataset.member)); });
});