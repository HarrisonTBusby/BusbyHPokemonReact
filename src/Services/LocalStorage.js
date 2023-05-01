function saveToLocalStorageByName(actualPokemon){
    const existingList = JSON.parse(localStorage.getItem('Favorites')) || [];
    if (existingList.some((p) => p.Name === actualPokemon.Name)) {
        return;
      }
      existingList.push(actualPokemon);
      localStorage.setItem('Favorites', JSON.stringify(existingList));
}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');
    if(localStorageData === null){
        return [];
    }
    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(actualPokemon){
    let favorites = getLocalStorage();
    let nameIndex = favorites.indexOf(actualPokemon);
    favorites.splice(nameIndex, 1);
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage };
