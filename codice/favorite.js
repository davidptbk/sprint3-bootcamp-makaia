//get elements general
const containerItems = document.getElementById('items');
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
        containerItems.innerHTML += `
        <article class="card">
                <div class="image_mid">
                    <figure>
                        <img src="${item.image}" alt="propiedad" class="card__image">
                    </figure>
                </div>
                <div class="card__description">
                        <div class="description__name">
                            <p>Nombre:</p>
                            <p>Ubicacion:</p>
                            <p>Precio:</p>
                            <p>Area:</p>
                            <p>Tipo:</p>
                            <p>Renta o Venta:</p>
                            <p>Cuartos:</p>
                            <p>Parqueadero:</p>
                            <p>Dueño:</p>
                            <p>Celular:</p>
                        </div>
                        <div class="description__details">
                            <p>${item.name}</p>
                            <p>${item.location}</p>
                            <p>${item.price}</p>
                            <p>${item.area}</p>
                            <p>${item.type}</p>
                            <p>${item.rent}</p>
                            <p>${item.rooms}</p>
                            <p>${item.parking}</p>
                            <p>${item.dueño}</p>
                            <p>${item.cel}</p>
                        </div>
                </div>
                <div class="actions">
                    <button class="btn--favorites" data-id="${item.id}">Favoritos</button>
                </div>
        </article>
        `
    });
}    