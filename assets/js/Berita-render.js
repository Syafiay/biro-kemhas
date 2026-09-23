(function(){
    "use strict";
    let isInitialized = false;

    function createMeta(authors){
        const meta = document.createElement("div");
        meta.className ="berita-meta";

        authors.forEach((name, index) => {
            const span = document.createElement("span");
            span.className = "berita-meta-author";
            span.innerHTML = `<i class="fas ${index === 0 ? "fa-user" : "fa-user-edit"}"></i> ${name}`;
            meta.appendChild(span);
        })
        return meta; 
    }

    function createDateBadge(item){
        const badge = document.createElement("div");
        badge.className = "berita-date-badge";
        badge.innerHTML =  `<span class="berita-date-day">${item.day}</span><span class="berita-date-month">${item.month}</span>`;
        return badge;
    }
    function createFeaturedCard(item){
        const card = document.createElement("article");
        card.className = "berita-card berita-card-featured";
        
        const media = document.createElement("div");
        media.className= "berita-media";
        media.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
        media.appendChild(createDateBadge(item));

        if(item.tag){
            const tag = document.createElement("span");
            tag.className = "berita-tag";
            tag.innerHTML =`<i class="fas fa-star"></i> ${item.tag}`;
            media.appendChild(tag);
        }
        const body = document.createElement("div");
        body.className = "berita-body";

        const title = document.createElement("h3");
        title.className = "berita-title";
        title.textContent = item.title;
    
        const meta = createMeta(item.authors);
    
        const excerpt = document.createElement("p");
        excerpt.className = "berita-excerpt";
        excerpt.textContent = item.excerpt || "";
    
        const btn = document.createElement("a");
        btn.className = "berita-btn";
        btn.href = `pages/berita/berita-detail.html?id=${encodeURIComponent(item.id)}`
        btn.innerHTML = `Baca Selengkapnya <i class="fas fa-arrow-right"></i>`;
    
        body.append(title, meta, excerpt, btn);
        card.append(media, body);
        
        return card;
    }

    function createCardGrid(item){

        const card = document.createElement("article");
        card.className = "berita-card berita-card-grid";

        const media = document.createElement("div");
        media.className = "berita-media";
        media.innerHTML = `<img src="${item.image}" alt="${item.title}">`;
        media.appendChild(createDateBadge(item));

        const body = document.createElement("div");
        body.className = "berita-body";

        const title = document.createElement("h2");
        title.className = "berita-title";
        title.textContent = item.title;

        const meta = createMeta(item.authors);

        const btn = document.createElement("a");
        btn.className = "berita-btn";
        btn.href = `pages/berita/berita-detail.html?id=${encodeURIComponent(item.id)}`
        btn.innerHTML = `Baca Selengkapnya <i class="fas fa-arrow-right"></i>`;
 
    body.append(title, meta, btn);
    card.append(media, body);
    return card;
    }

    function renderBerita(){
        const featuredSlot= document.querySelector(".berita-featured-slot");
        const gridSlot = document.querySelector(".berita-grid");

        if(!featuredSlot || !gridSlot) return false;
        if (isInitialized) return true;
        isInitialized =  true;

        featuredSlot.innerHTML= "";
        gridSlot.innerHTML = "";

        const featureItem = BERITA_DATA.find((item) =>item.featured);
        const restItems = BERITA_DATA.filter((item) => item !== featureItem);

        if (featureItem){
            featuredSlot.appendChild(createFeaturedCard(featureItem));
        }

            const fragment = document.createDocumentFragment();
            restItems.forEach((item) => fragment.appendChild(createCardGrid(item)));
            gridSlot.appendChild(fragment);
        
            return true;
    }
document.addEventListener("DOMContentLoaded", renderBerita);
document.addEventListener("components:loaded", renderBerita)


}());