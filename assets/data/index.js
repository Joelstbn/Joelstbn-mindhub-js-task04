let dataEvents = []
let currentDate = ""

const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"

const contenedor = document.getElementById("contenedor")
const input = document.querySelector('input')
const contenedorChecks = document.getElementById("checkContainer") 

// Eventos
input.addEventListener('input',superFiltro)
contenedorChecks.addEventListener('change',superFiltro)

// Función asíncrona que obtiene la data de la API

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const eventsFromAPI = await response.json();

        for (const event of eventsFromAPI.events) {
            dataEvents.push(event)
        }
        
        currentDate = eventsFromAPI.currentDate
 
        // Hasta acá todo bien, tengo los datos desde la API en las variables
        // Llamo funciones
        pintarTarjetas(dataEvents)
        crearCheckboxes(dataEvents)

    }
    catch (error) {
        console.log("ERROOOOR");
    }
 
}

// Llamado de funciones
getEvents()

console.log(dataEvents)

// Funciones
function superFiltro(){
    let arrayFiltrado1 = filtrarPorTexto(dataEvents, input.value)
    let arrayFiltrado2 = filtrarPorCategoria(arrayFiltrado1)
    pintarTarjetas(arrayFiltrado2)
}

function crearCheckboxes(arrayInfo){
    let checks = ``
    let categoriasRepetidas = arrayInfo.map(elemento => elemento.category)
    let categorias = new Set(categoriasRepetidas.sort((a,b)=>{
        if(a>b){
            return 1
        }
        if(a<b){
            return -1
        }
            return 0
    }))
    categorias.forEach(elemento => {
        checks +=`
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="${elemento}" value="${elemento}">
              <label class="form-check-label" for="${elemento}">${elemento}</label>
            </div>        

        `
    })
    contenedorChecks.innerHTML = checks
}

function pintarTarjetas(arrayDatos) {
    if(arrayDatos.length == 0){
        contenedor.innerHTML = "<h3 class='m4 fw-bolder'>No hay coincidencias en la búsqueda</h3>"
        return
    }
    let tarjetas = ``
    arrayDatos.forEach(element => {
        tarjetas += `        
            <div class="card my-3" style="width: 18rem;">
             <img src="${element.image}" class="card-img-top" alt="pic">
                <div class="card-body">
                    <h5 class="card-title fw-bolder">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <div class="card-body2">
                        <p class="card-text">$ ${element.price}</p>
                        <p class="card-text fw-bolder">${element.category}</p>
                        <a href="./details.html?id=${element._id}" class="btn btn-primary">Details</a>
                    </div>
                </div>  
            </div>
        `
    })
    contenedor.innerHTML = tarjetas
}

function filtrarPorTexto(arrayDatos, texto) {
    let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

function filtrarPorCategoria(arrayInfo){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes);
    let arrayChecks = Array.from(checkboxes)
    console.log(arrayChecks);
    let checksChecked = arrayChecks.filter(check => check.checked)
    console.log(checksChecked);
    if (checksChecked.length == 0){
        return arrayInfo
    }
    let checkValues = checksChecked.map(check => check.value)
    console.log(checkValues);
    let arrayFiltrado = arrayInfo.filter(elemento => checkValues.includes(elemento.category)) 
    console.log(arrayFiltrado); 
    return arrayFiltrado
}