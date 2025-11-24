// https://randomfox.ca/floof/
let images = new Array;
let masonry = document.querySelector(".masonry");
let btn = document.querySelector(".more");
let model = document.querySelector("#model");
let closeBtn = document.querySelector("#closeBtn")
let nextBtn = document.querySelector("#nextBtn")
let prevBtn = document.querySelector("#prevBtn")
let presentModel = null;

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        images.push(data.image);
        masonry.innerHTML += `
        <div class="item" data-index="${images.length - 1}">
            <img src="${data.image}" alt="Image" data-index="${images.length - 1}">
        </div>
        `
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function fetchLoop() {
    for (let i = 1; i < 11; i++) {
        fetchData("https://randomfox.ca/floof/")
    }
}

fetchLoop();

btn.addEventListener("click", () => {
    fetchLoop();
});

function modelPreview(index) {
    model.style.display = "flex";
    let img = model.querySelector("img");
    img.setAttribute("src", images[index]);
    presentModel = index;
}

function closeModel() {
    model.style.display = "none";
}

function nextModel() {
    presentModel = (presentModel + 1) % images.length;
    modelPreview(presentModel);
}

function prevModel() {
    if (presentModel === 0) {
        presentModel = images.length - 1;
    } else {
        presentModel -= 1;
    }
    modelPreview(presentModel);
}

masonry.addEventListener('click', (e) => {
    if (e.target.matches(".item") || e.target.matches("img")) {
        let elem = e.target;
        let index = Number(elem.getAttribute("data-index"));
        modelPreview(index);
    }
});

closeBtn.addEventListener("click", closeModel);
nextBtn.addEventListener("click", nextModel);
prevBtn.addEventListener("click", prevModel);


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModel();
    else if (e.key === "ArrowRight") {
        if (model.style.display === "flex") {
            nextModel();
        }
    }
    else if (e.key === "ArrowLeft") {
        if (model.style.display === "flex") {
            prevModel();
        }
    }
})