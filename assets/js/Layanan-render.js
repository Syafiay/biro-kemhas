(function() {
    "use strict";

    let isInitialized = false;

    function createLayananCard(item){
        const card = document.createElement("a");
        card.className = `layanan-card layanan-card-${item.glow}`;
        card.href = item.link;

        const iconWrap = document.createElement("div");
        iconWrap.className = "layanan-card-icon";
        iconWrap.innerHTML = `<i class=" fas fa-${item.icon}"></i>`;

        const title = document.createElement("div");
        title.className = "layanan-card-title";
        title.textContent = item.title;

        const desc = document.createElement("div");
        desc.className = "layanan-card-desc";
        desc.textContent = item.desc;

        const arrow = document.createElement("span");
        arrow.className = "layanan-card-arrow";
        arrow.innerHTML = `<i class= "fas fa-arrow-right"></i>`;

        card.append(iconWrap, title, desc, arrow);
        return card;
    }
function renderLayananCards() {
    const wrapper = document.querySelector(".layanan-wrapper");
    if (!wrapper) return false; // section belum ada di DOM
    if (isInitialized) return true;
    isInitialized = true;
 
    wrapper.innerHTML = "";
    const fragment = document.createDocumentFragment();
    LAYANAN_DATA.forEach((item) => fragment.appendChild(createLayananCard(item)));
    wrapper.appendChild(fragment);
    return true;
  } 
 
  document.addEventListener("DOMContentLoaded", renderLayananCards);
  document.addEventListener("components:loaded", renderLayananCards);
}());