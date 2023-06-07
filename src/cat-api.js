
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const KEY = 'live_YnUNXu6bXgxLKwGsPvVIE5v5vID501IiIO5VxLkOACrsXth5YR7dLVMuzsmKCRQy';
const options = {
    headers:{
        'x-api-key': KEY
    }
};
const FIND_URL_CAT = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreeds() {
   
     return fetch(`${BASE_URL}`, options).then(resp => {if(!resp.ok){
        throw new Error (resp.statusText)
    }
    return resp.json();
});
};

 export function fetchCatByBreed(breedId) {
return fetch(`${FIND_URL_CAT}?breed_ids=${breedId}`, options).then(resp => {
    if(!resp.ok){
    throw new Error(resp.statusText);
}
return resp.json();
});
};




 



