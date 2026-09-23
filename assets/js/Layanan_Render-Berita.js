(function(){
    "use strict";
     let isInitialized  = false;

     function createLayananCard(item){
        const card = document.createElement("a");
        card.className = `layanan-card layanan-card-${item.glow}`;
        if(item.featured) card.classList.add("is-featured");
        card.href = item.link;

        const iconWrap = document.createElement("div");
        iconWrap.className = "layanan-card-icon";
        iconWrap.innerHTML = `<i class ="fas fa-${item.icon}"> </i>`;

        const img = document.createElement("img");
        img.className = "layanan-card-img";
        img.src = item.img;
        img.alt = item.title || "";
        const title = document.createElement("div");
        title.className = "layanan-card-title";
        title.textContent = item.title;

        const desc = document.createElement("div");
        desc.className = "layanan-card-desc";
        desc.textContent = item.desc;

        const arrow = document.createElement("span");
        arrow.className = "layanan-card-arrow";
        arrow.innerHTML = `<i class = "layanan-card-arrow-${item.arrow}></i>"`;

        card.append(iconWrap, title, img, desc, arrow);
        return card;        
     } 
    function renderLayananCards(){
        const wrapper = document.querySelector(".layanan-wrapper");
        if(!wrapper) return false;
        if(isInitialized ) return true;
        isInitialized = true;

        wrapper.innerHTML ="";
        const fragment =document.createDocumentFragment();
        // LAYANAN_BERITA.foreach((item) => fragment.appendChild(createLayananCard(item)));
        // wrapper.appendChild(fragment);
        LAYANAN_BERITA.forEach((item) => fragment.appendChild(createLayananCard(item)));
        wrapper.appendChild(fragment);
        return true;
}

document.addEventListener("DOMContentLoaded", renderLayananCards);
document.addEventListener("components:loaded", renderLayananCards)


}());