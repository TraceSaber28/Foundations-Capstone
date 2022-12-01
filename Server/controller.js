const legends = require('./db.json')
let globalId = 22 

module.exports = {
    getAllLegends: (req, res) => {
        res.status(200).send(legends)
    },

    getRandomLegend: (req, res) => {
        let randomIndex = Math.floor(Math.random() * legends.length);
        let randomLegend = legends[randomIndex];
      
        res.status(200).send(randomLegend);
    },
    addLegend: (req, res) => {
        const {name, nickname, legendClass, image} = req.body

        const userLegend = {
            id: globalId,
            name,
            nickname,
            legendClass,
            image
        }

        legends.push(userLegend)

        globalId++

        res.status(200).send(legends)
    },

    deleteLegend: (req, res) => {
        const index = legends.findIndex((element) => element.id === +req.params.id)

        legends.splice(index, 1) 
        res.status(200).send(legends)
    }

}