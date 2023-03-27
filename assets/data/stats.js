let API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
let dataEvents = [] 

async function getEvents(){

    try{
        const response = await fetch (API_URL) 
        const eventsFromAPI = await response.json() 
        
        for (const event of eventsFromAPI.events) {
            dataEvents.push(event)
        }    

        currentDate = eventsFromAPI.currentDate
        let pastEvents = dataEvents.filter(dataEvents => dataEvents.date < currentDate)
        let upcomingEvents = dataEvents.filter(dataEvents => dataEvents.date >= currentDate)

        console.log(upcomingEvents)
        console.log(pastEvents)

        // ACÁ VOY A LLAMAR LAS FUNCIONES QUE ARMO AFUERA Y VOY A IR PRINTEANDO LA TABLA
        arrayPercentage = getAttendance(pastEvents)
        console.log(arrayPercentage)

        //Primera tabla
        printStatistics(arrayPercentage, pastEvents)
        //Segunda
        upcomingStatistics(upcomingEvents)
        //Tercera
        pastStatistics(pastEvents)
    }
    catch(error){
        console.log(error);
    }
}

getEvents() 


// ACÁ VOY A IR ARMANDO LAS FUNCIONES

//PRIMER TABLA
function getAttendance(array) { 

    array = array.map(element => {
        percentage = (element.assistance) * 100 / element.capacity
        return percentage
    })
    return array
}

function printStatistics(percentages, events) {

    let tableStats = document.getElementById("eventsStatistics")
    
    //Mayor y menor %
    let min = Math.min(...percentages)
    let max = Math.max(...percentages)

    //Busco posiciones de los arrays
    let indexMax = percentages.indexOf(max)
    let indexMin = percentages.indexOf(min)

    //Llevo a array las capacidades
    capacity = events.map(element => {
        return element.capacity
    })

    //Asigno a variable la mayor capacidad, busco index para devolver evento con mayor cap
    let capacityMax = Math.max(...capacity)
    let indexCapacity = capacity.indexOf(capacityMax)

    tableStats.innerHTML = `

    <td class="highestpercentage"> ${events[indexMax].name} (${max}%) </td>
    <td class="lowestCap">${events[indexMin].name} (${min}%) </td>
    <td class="largerCap">${events[indexCapacity].name} (${capacityMax}) </td>
        
     `
}


//SEGUNDA T
function upcomingStatistics(array) {

    //Map para array con categorias
    let mapEvents = array.map(lista => lista.category);
    const dataA = new Set(mapEvents);
    let categories = [...dataA];
 
    //Variables para guardar data
    let revenueFood = 0
    let revenueBooks = 0
    let revenueParty = 0
    let revenueRace = 0
    let revenueConcert = 0
    let revenueMuseum = 0

    let percentageFood = []
    let percentageBooks = []
    let percentageParty = []
    let percentageRace = []
    let percentageConcert = []
    let percentageMuseum = []

    for (let i = 0; i < array.length; i++) {

        switch (array[i].category) {
            case "Food": 
                revenueFood += array[i].price * array[i].estimate 
                percentageFood.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Books":
                revenueBooks += array[i].price * array[i].estimate 
                percentageBooks.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Party":
                revenueParty += array[i].price * array[i].estimate 
                percentageParty.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Race":
                revenueRace += array[i].price * array[i].estimate 
                percentageRace.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Concert":
                revenueConcert += array[i].price * array[i].estimate 
                percentageConcert.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Museum":
                revenueMuseum += array[i].price * array[i].estimate 
                percentageMuseum.push(array[i].estimate * 100 / array[i].capacity)
                break;

        }
    }

    let revenues = [revenueFood, revenueBooks, revenueParty, revenueRace, revenueConcert, revenueMuseum]

    let percentageEvent = [promedioAttendance(percentageFood),
    promedioAttendance(percentageBooks),
    promedioAttendance(percentageParty),
    promedioAttendance(percentageRace),
    promedioAttendance(percentageConcert),
    promedioAttendance(percentageMuseum)]

    let table = document.getElementById("upcomingEventsStatistics")

    let totalArray = []
    for (let i = 0; i < categories.length; i++) {
        let html = `
        <tr>
        <td>${categories[i]}</td>
        <td>$${revenues[i]}</td>
        <td>${percentageEvent[i]}%</td>
        </tr>`
        totalArray.push(html)
    }

    table.innerHTML = totalArray.join('')
} 

function promedioAttendance(array) {
    let sum = 0
    for (let percentage of array) {
        sum += percentage
    }
    return (sum / array.length).toFixed(2)
}

//TERCERA T
function pastStatistics(array) {

    //Map para array con categorias
        let mapEvents = array.map(lista => lista.category);
    const dataA = new Set(mapEvents);
    let categories = [...dataA];
 
    //Variables para guardar datas totales
    let revenueFood = 0
    let revenueBooks = 0
    let revenueParty = 0
    let revenueRace = 0
    let revenueConcert = 0
    let revenueMuseum = 0

    let percentageFood = []
    let percentageBooks = []
    let percentageParty = []
    let percentageRace = []
    let percentageConcert = []
    let percentageMuseum = []

    for (let i = 0; i < array.length; i++) {

        switch (array[i].category) {
            case "Food": 
                revenueFood += array[i].price * array[i].assistance 
                percentageFood.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Books":
                revenueBooks += array[i].price * array[i].assistance
                percentageBooks.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Party":
                revenueParty += array[i].price * array[i].assistance
                percentageParty.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Race":
                revenueRace += array[i].price * array[i].assistance 
                percentageRace.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Concert":
                revenueConcert += array[i].price * array[i].assistance 
                percentageConcert.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Museum":
                revenueMuseum += array[i].price * array[i].assistance 
                percentageMuseum.push(array[i].assistance * 100 / array[i].capacity)
                break;

        }
    }

    let revenues = [revenueFood, revenueBooks, revenueParty, revenueRace, revenueConcert, revenueMuseum]

    let percentageEvent = [promedioAttendance(percentageFood),
    promedioAttendance(percentageBooks),
    promedioAttendance(percentageParty),
    promedioAttendance(percentageRace),
    promedioAttendance(percentageConcert),
    promedioAttendance(percentageMuseum)]

    let table = document.getElementById("pastEventsStatistics")

    let totalArray = []
    for (let i = 0; i < categories.length; i++) {
        let html = `
        <tr>
        <td>${categories[i]}</td>
        <td>$${revenues[i]}</td>
        <td>${percentageEvent[i]}%</td>
        </tr>`
        totalArray.push(html)
    }

    table.innerHTML = totalArray.join('')
}  