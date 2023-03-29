let dataEvents = []
const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"

const queryString = location.search 
const params = new URLSearchParams(queryString)
const id = params.get("id") 
const contenedor = document.getElementById("container-detail")

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const eventsFromAPI = await response.json();

        for (const event of eventsFromAPI.events) {
            dataEvents.push(event)
        }
        console.log(dataEvents)
        
        const eventDetailed = dataEvents.find(evento => evento._id == id) 
        console.log(eventDetailed)


        tarjetas =  `<div class="card" style="width: 36rem;">
                        <img src="${eventDetailed.image}" class="card-img-top" alt="foto de ${eventDetailed.name}">
                        <div class="card-body">
                            <h5 class="card-title fw-bolder">${eventDetailed.name}</h5>
                            <p class="card-text">${eventDetailed.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Date: ${eventDetailed.date}</li>
                            <li class="list-group-item">Category: ${eventDetailed.category}</li>
                            <li class="list-group-item">Price: $${eventDetailed.price}</li>
                        </ul>
                        <div class="card-body">
                            <li class="list-group-item">Place: ${eventDetailed.place}</li>
                            <li class="list-group-item">Capacity: ${eventDetailed.capacity}</li>
                        </div>
                    </div>`
        
        contenedor.innerHTML = tarjetas

    }
    catch (error) {
        console.log("ERROOOOR");
    }
 }

 getEvents()