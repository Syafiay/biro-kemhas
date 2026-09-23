// function createCardElement(item){
//     const card =document.createElement("div");
//     card.className = "card";

//     card.innerHTML = `
//     <div class = "card-image">
//         <img src = "${item.image}" alt = "${item.title}">
//           <div class="date-badge" style="background:${item.badgeColor}">
//         <span class="day">${item.day}</span>
//         <span class="month">${item.month}</span>
//       </div>
//     </div>
    
//      <div class="card-content">
//       <span class="tag">${item.tag}</span>
//       <h3>${item.title}</h3>
//       <p>${item.desc}</p>
//       <a href="${item.link}" class="btn-detail">Lihat Detail &rarr;</a>
//     </div>
// `;
// return card;

// }

// function renderCard(data){
//     const container = document.getElementById(".card-list");
//     container.innerHTML = "";

//     data.forEach(item => {
//         const cardEl = document.createElement("item");
//         cardEl.appendChild(cardEl);


//     });
// }
// document.addEventListener("DOMContentLoaded", () => {
//   renderCards(cardData);
// });
// render.js
// Tugasnya cuma satu: ambil data dari data.js, ubah jadi elemen HTML,
// lalu masukkan ke dalam container #cardList.

function createCardElement(item) {
  // Bikin elemen card dari template string
  const card = document.createElement("div");
  card.className = "card-kegiatan";

  card.innerHTML = `
    <div class="card-kegiatan-image">
      <img src="${item.image}" alt="${item.title}">
      <div class="date-badge" style="background:${item.badgeColor}">
        <span class="day">${item.day}</span>
        <span class="month">${item.month}</span>
      </div>
    </div>
    <div class="card-kegiatan-content">
      <span class="tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <a href="${item.link}" class="btn-detail">Lihat Detail &rarr;</a>
    </div>
  `;

  return card;
}

function renderCards(data) {
const container = document.getElementById("card-list"); // huruf l kecil semua, samain persis sama HTML  c
container.innerHTML = ""; // bersihkan dulu kalau ada isi sebelumnya

  data.forEach(item => {
    const cardEl = createCardElement(item);
    container.appendChild(cardEl);
  });
}

// Jalankan render begitu halaman siap
document.addEventListener("DOMContentLoaded", () => {
  renderCards(cardData);
});

// Kalau section ini di-include lewat data-include (fetch async),
// #card-list belum ada pas DOMContentLoaded nembak. Makanya dengerin
// juga event ini, yang ditembak SETELAH semua data-include selesai.
document.addEventListener("components:loaded", () => {
  renderCards(cardData);
});