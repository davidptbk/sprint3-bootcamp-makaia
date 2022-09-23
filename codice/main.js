//get elements general
const btnFind = document.getElementById('search');
const containerForm = document.getElementById('containerForm');
const containerItems = document.getElementById('items');
const selectType = document.getElementById('tipo');
const selectLocation = document.getElementById('locacion');
const favoritos = document.getElementsByClassName('btn--favorites')
const show = document.getElementsByClassName('btn--showall')



let houses = [];

const getData = async () =>{
    try{
    const URL_API = 'http://localhost:3000/propierties';
    const response = await fetch(URL_API);
    const data = await response.json();
    houses = data;
    renderCards(houses);
    }catch{
        console.log(error);
    }
}

getData();

const renderCards = (ejem) => {
    containerItems.innerHTML = '';
    ejem.forEach(item => {
        const { id, name, species, status, location } = item;
        containerItems.innerHTML += `
        <article class="card">
                    <figure>
                        <img src="${item.image}" alt="propiedad" class="card__image">
                    </figure>
                    <div class="card__description">
                        <div class="description__name">
                            <p>Nombre:</p>
                            <p>Ubicacion:</p>
                            <p>Precio:</p>
                            <p>Area:</p>
                        </div>
                        <div class="description__details">
                            <p>${item.name}</p>
                            <p>${item.location}</p>
                            <p>${item.price}</p>
                            <p>${item.area}</p>
                        </div>
                    </div>
                    <div class="actions">
                        <button class="btn--favorites" name="${item.id}">Favoritos</button>
                        <button class="btn--show" name="${item.id}">Detalles</button>
                    </div>
        </article>
        `
    });
}    

let favorites = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : [];

const filterArray = (tp, lc) => {
    let newhouses = houses.filter((object) => object.type.includes(tp) && object.location.includes(lc));
    renderCards(newhouses);
}

const handle = ()=>{
    let infoType =  selectType.value;
    let infoLocation =  selectLocation.value;
    filterArray(infoType,infoLocation);
}


btnFind.addEventListener('click',handle)

document.addEventListener('click',({target}) =>{
    document.addEventListener('click', ({ target }) => {

        // Escuchar el evento click sobre el btn ver
        if (target.classList.contains('btn--show')) {
            localStorage.setItem('idVer', JSON.stringify(target.name))
            window.location.href = "../show.html";
        }

        if (target.classList.contains('btn--favorites')) {

            const confirmarFavorito = confirm(`Desea agregar ${target.name} a favoritos?`)
    
            if (confirmarFavorito) {
                getData(urlApi)
                    .then(resp => {
                        const character = resp.find(item => item.id === parseInt(target.name));
                        favorites.push(character);
    
                        localStorage.setItem('favorite', JSON.stringify(favorites));
    
                        //Vamos a desabilitar el btn favorites del personaje que ha sido añadido a favoritos.
    
                        //Capturamos el btn
                        const btnFav = document.getElementById(target.id);
    
                        btnFav.setAttribute("disabled", '');
                        console.log(btnFav);
                        // addFavorites(character, favorites, target);   
    
                    })
                    .catch(error => console.log(error))
            }
        }
    });
})
