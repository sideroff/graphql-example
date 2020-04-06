const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')


const schema = require('./schema/schema')

const app = express()

app.use(cors())

mongoose.connect('mongodb://admin:admin_password1@ds145193.mlab.com:45193/graphql-example', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
}))

app.listen(4000, () => {
  console.log('server listening on 4000')
})