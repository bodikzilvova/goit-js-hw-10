
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';

  const selector = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
let isLoading = true;


fetchBreeds().then(data => {data.forEach (cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent =cat.name;
    selector.appendChild(option);
});
new SlimSelect({
    select: selector
});
loader.classList.add("hidden");
}).catch(error => {
    console.log(error);
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    loader.classList.add("hidden");
});


selector.addEventListener("change", (evt) => {
const breedID = evt.target.value;

isLoading = true;
loader.classList.remove("hidden");
catInfo.classList.add("hidden");


fetchCatByBreed(breedID).then((catData) => {
isLoading = false;
    catInfo.innerHTML = createMarkup(catData);
    catInfo.classList.remove("hidden");
      loader.classList.add("hidden");
}).catch((error) => {
    isLoading = false;
    console.log(error);
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    loader.classList.add("hidden");
})

});


function createMarkup(catData) {
    const { breeds } = catData;
    const { name, description, temperament } = catData[0].breeds[0];
    const { url } = catData[0];
    return `
        <img src="${url}" alt="${name}" width = "500px">
        <h2>${name}</h2>
        <p>${description}</p>
        <p> <b>Temperament: </b>${temperament}</p>
    `;
};


