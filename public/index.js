const addBtn = document.getElementById('addLegend')
const displayLegends = document.getElementById('allLegends')
const displayRandomLegend = document.getElementById('randomLegend')
const getRandomBtn = document.getElementById('getRandomLegend')
const displayBtn = document.getElementById('displayAll')

const baseURL = 'http://localhost:5555'

const createLegendCard = (legend) => {
    const newLegendCard = document.createElement('section')
    newLegendCard.classList.add('legend-card')

    newLegendCard.innerHTML = `
    <p>Name: ${legend.name}</p>
    <p>Nickname: ${legend.nickname}</p>
    <p>Class: ${legend.legendClass}</p>
    <img src=${legend.image}/>
        <section> 
        <button id="deleteBtn" onclick="deleteLegend(${legend.id})">Delete From Possible Legends</button>
        </section>
    `
    displayLegends.appendChild(newLegendCard)
}

const displayAllLegends = (array) => {
    for(let i = 0; i < array.length; i++) {
        createLegendCard(array[i])
    }
}

const getAllLegends = () => {
    axios.get(`${baseURL}/api/legends`)
    .then((res) => displayAllLegends(res.data))
    .catch((err) => console.log(err))
}


const randomLegendDisplay = (object) => {
    displayLegends.innerHTML = ''
        createLegendCard(object)
}

const getRandomLegend = () => {
    axios.get(`${baseURL}/api/random-legend`)
    .then((res) => randomLegendDisplay(res.data))
    .catch((err) => console.log(err))
}

const addLegend = () => {

    displayLegends.innerHTML = ''

    const name = document.getElementById('name')
    const nickname = document.getElementById('nickname')
    const legendClass = document.getElementById('legendClass')
    const image = document.getElementById('image')

    let newLegend = {
        name: name.value,
        nickname: nickname.value,
        legendClass: legendClass.value,
        image: image.value 
    }


    axios.post(`${baseURL}/api/legends`, newLegend)
    .then((res) => {
        displayAllLegends(res.data)
        alert('Legend Added')

        name.value = ''
        nickname.value = ''
        legendClass.value = ''
        image.value = ''
    })
    .catch((err => console.log(err)))

}

const deleteLegend = (id) => {
    axios.delete(`${baseURL}/api/legends/${id}`)
    .then((res) => {
        displayLegends.innerHTML = ''
        displayAllLegends(res.data)
        alert(`Legend Successfully Deleted From List`)
    })
    .catch((err) => alert(err))
}

addBtn.addEventListener('click', addLegend)
getRandomBtn.addEventListener('click', getRandomLegend)
displayBtn.addEventListener('click',getAllLegends)

getAllLegends()

