const accessKey = "0AxnicnUXAro75G_Ts3TAb0c83uDlsiRBGNniyGcRDk";

const formEl = document.querySelector(".search-bar");
const inputEl = document.getElementById("search-id");
const containerResults = document.querySelector(".content-container");
const showMore = document.getElementById("show-more-button");


let inputData = "movie-tamplets";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results

    if (page === 1) {
        containerResults.innerHTML = '';
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-results");
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = '_blank'
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        containerResults.appendChild(imageWrapper);
    })

    page++
    if(page > 1) {
        showMore.style.display = 'block'
    }
}

formEl.addEventListener('submit', (event) =>{
    event.preventDefault()
    page = 1;
    searchImages();
})

showMore.addEventListener("click", (event) => {
  searchImages();
});



