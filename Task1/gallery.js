const imageData = [
{
src:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
title:"Mountain View",
desc:"Beautiful mountain landscape",
category:"landscape"
},
{
src:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
title:"Forest Path",
desc:"Green forest trail",
category:"landscape"
},
{
src:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
title:"Peaceful Lake",
desc:"Crystal clear lake",
category:"landscape"
},
{
src:"https://images.unsplash.com/photo-1511497584788-876760111969?w=1200",
title:"Sunset Nature",
desc:"Sunset in mountains",
category:"landscape"
},
{
src:"https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1200",
title:"Lion",
desc:"Wild lion portrait",
category:"animals"
},
{
src:"https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200",
title:"Tiger",
desc:"Tiger in jungle",
category:"animals"
},
{
src:"https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=1200",
title:"Elephant",
desc:"African elephant",
category:"animals"
},
{
src:"https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200",
title:"Dog",
desc:"Cute dog portrait",
category:"animals"
},
{
src:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200",
title:"Healthy Meal",
desc:"Fresh healthy food",
category:"food"
},
{
src:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200",
title:"Burger",
desc:"Delicious burger",
category:"food"
},
{
src:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200",
title:"Salad",
desc:"Healthy vegetable salad",
category:"food"
},
{
src:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
title:"Breakfast",
desc:"Premium breakfast meal",
category:"food"
},
{
src:"https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200",
title:"Clouds",
desc:"White clouds in sky",
category:"sky"
},
{
src:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200",
title:"Blue Sky",
desc:"Clear blue sky",
category:"sky"
},
{
src:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",
title:"Sky Horizon",
desc:"Amazing sky horizon",
category:"sky"
},
{
src:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200",
title:"Sunset Clouds",
desc:"Golden sunset clouds",
category:"sky"
}
];

const galleryGrid = document.getElementById("galleryGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const imageCounter = document.getElementById("imageCounter");

const scrollBtn = document.getElementById("scrollTopBtn");

let currentImages = [...imageData];
let currentIndex = 0;
let currentCategory = "all";

function renderGallery(images){

galleryGrid.innerHTML = "";

images.forEach((img,index)=>{

const card = document.createElement("div");
card.classList.add("gallery-item");

card.innerHTML = `
<img src="${img.src}" alt="${img.title}">
<div class="gallery-info">
<h4>${img.title}</h4>
<p>${img.desc}</p>
</div>
`;

card.addEventListener("click",()=>{
openLightbox(index);
});

galleryGrid.appendChild(card);

});

}

function openLightbox(index){

currentIndex = index;

lightboxImage.src = currentImages[index].src;
lightboxTitle.textContent = currentImages[index].title;
lightboxDesc.textContent = currentImages[index].desc;

imageCounter.textContent =
`${index + 1} / ${currentImages.length}`;

lightbox.classList.add("active");

}

function updateLightbox(){

lightboxImage.src = currentImages[currentIndex].src;
lightboxTitle.textContent = currentImages[currentIndex].title;
lightboxDesc.textContent = currentImages[currentIndex].desc;

imageCounter.textContent =
`${currentIndex + 1} / ${currentImages.length}`;

}

function filterImages(){

const searchTerm =
searchInput.value.toLowerCase();

currentImages = imageData.filter(img=>{

const categoryMatch =
currentCategory === "all" ||
img.category === currentCategory;

const searchMatch =
img.title.toLowerCase().includes(searchTerm) ||
img.desc.toLowerCase().includes(searchTerm);

return categoryMatch && searchMatch;

});

const sortValue = sortSelect.value;

if(sortValue === "name"){

currentImages.sort((a,b)=>
a.title.localeCompare(b.title)
);

}

if(sortValue === "random"){

currentImages.sort(()=>
Math.random() - 0.5
);

}

renderGallery(currentImages);

}

document
.querySelectorAll(".cat-btn")
.forEach(btn=>{

btn.addEventListener("click",()=>{

document
.querySelectorAll(".cat-btn")
.forEach(item=>
item.classList.remove("active")
);

btn.classList.add("active");

currentCategory =
btn.dataset.category;

filterImages();

});

});

searchInput.addEventListener("input",filterImages);

sortSelect.addEventListener("change",filterImages);

closeBtn.addEventListener("click",()=>{

lightbox.classList.remove("active");

});

nextBtn.addEventListener("click",()=>{

currentIndex++;

if(currentIndex >= currentImages.length){

currentIndex = 0;

}

updateLightbox();

});

prevBtn.addEventListener("click",()=>{

currentIndex--;

if(currentIndex < 0){

currentIndex =
currentImages.length - 1;

}

updateLightbox();

});

document.addEventListener("keydown",(e)=>{

if(!lightbox.classList.contains("active")) return;

if(e.key === "ArrowRight"){

nextBtn.click();

}

if(e.key === "ArrowLeft"){

prevBtn.click();

}

if(e.key === "Escape"){

lightbox.classList.remove("active");

}

});

lightbox.addEventListener("click",(e)=>{

if(e.target === lightbox){

lightbox.classList.remove("active");

}

});

window.addEventListener("scroll",()=>{

if(window.scrollY > 300){

scrollBtn.classList.add("show");

}else{

scrollBtn.classList.remove("show");

}

});

scrollBtn.addEventListener("click",()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

});

renderGallery(imageData);