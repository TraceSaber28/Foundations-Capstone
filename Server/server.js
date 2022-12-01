const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static(`${__dirname}/public`))

const {getAllLegends, getRandomLegend, addLegend, deleteLegend} = require('./controller')

app.get('/api/legends', getAllLegends)
app.get('/api/random-legend', getRandomLegend)
app.post('/api/legends', addLegend)
app.delete('/api/legends/:id', deleteLegend)








app.listen(5555, () => console.log('Server running on port 5555'))