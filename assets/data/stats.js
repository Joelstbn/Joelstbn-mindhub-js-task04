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

    <td> ${events[indexMax].name} (${max}%) </td>
    <td>${events[indexMin].name} (${min}%) </td>
    <td>${events[indexCapacity].name} (${capacityMax}) </td>
        
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

    let attendanceFood = []
    let attendanceBooks = []
    let attendanceParty = []
    let attendanceRace = []
    let attendanceConcert = []
    let attendanceMuseum = []

    for (let i = 0; i < array.length; i++) {

        switch (array[i].category) {
            case "Food": 
                revenueFood += array[i].price * array[i].estimate 
                attendanceFood.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Books":
                revenueBooks += array[i].price * array[i].estimate 
                attendanceBooks.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Party":
                revenueParty += array[i].price * array[i].estimate 
                attendanceParty.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Race":
                revenueRace += array[i].price * array[i].estimate 
                attendanceRace.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Concert":
                revenueConcert += array[i].price * array[i].estimate 
                attendanceConcert.push(array[i].estimate * 100 / array[i].capacity)
                break;
            case "Museum":
                revenueMuseum += array[i].price * array[i].estimate 
                attendanceMuseum.push(array[i].estimate * 100 / array[i].capacity)
                break;

        }
    }

    let revenues = [revenueFood, revenueBooks, revenueParty, revenueRace, revenueConcert, revenueMuseum]

    let attendanceEvent = [promedioAttendance(attendanceFood),
    promedioAttendance(attendanceBooks),
    promedioAttendance(attendanceParty),
    promedioAttendance(attendanceRace),
    promedioAttendance(attendanceConcert),
    promedioAttendance(attendanceMuseum)]

    let table = document.getElementById("upcomingEventsStatistics")

    let totalArray = []
    for (let i = 0; i < categories.length; i++) {
        let html = `
        <tr>
        <td>${categories[i]}</td>
        <td>$${revenues[i]}</td>
        <td>${attendanceEvent[i]}%</td>
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

    let attendanceFood = []
    let attendanceBooks = []
    let attendanceParty = []
    let attendanceRace = []
    let attendanceConcert = []
    let attendanceMuseum = []

    for (let i = 0; i < array.length; i++) {

        switch (array[i].category) {
            case "Food": 
                revenueFood += array[i].price * array[i].assistance 
                attendanceFood.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Books":
                revenueBooks += array[i].price * array[i].assistance
                attendanceBooks.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Party":
                revenueParty += array[i].price * array[i].assistance
                attendanceParty.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Race":
                revenueRace += array[i].price * array[i].assistance 
                attendanceRace.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Concert":
                revenueConcert += array[i].price * array[i].assistance 
                attendanceConcert.push(array[i].assistance * 100 / array[i].capacity)
                break;
            case "Museum":
                revenueMuseum += array[i].price * array[i].assistance 
                attendanceMuseum.push(array[i].assistance * 100 / array[i].capacity)
                break;

        }
    }

    let revenues = [revenueFood, revenueBooks, revenueParty, revenueRace, revenueConcert, revenueMuseum]

    let attendanceEvent = [promedioAttendance(attendanceFood),
    promedioAttendance(attendanceBooks),
    promedioAttendance(attendanceParty),
    promedioAttendance(attendanceRace),
    promedioAttendance(attendanceConcert),
    promedioAttendance(attendanceMuseum)]

    let table = document.getElementById("pastEventsStatistics")

    let totalArray = []
    for (let i = 0; i < categories.length; i++) {
        let html = `
        <tr>
        <td>${categories[i]}</td>
        <td>$${revenues[i]}</td>
        <td>${attendanceEvent[i]}%</td>
        </tr>`
        totalArray.push(html)
    }

    table.innerHTML = totalArray.join('')
}  