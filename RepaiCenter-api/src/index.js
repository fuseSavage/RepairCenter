const express = require('express')

const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require("cors");
const constants = require('./configs/constants')
const responseCode = require('./configs/responseCode')
const route = require('./routes')


const appname = constants.APP_NAME
const port = constants.PORT

const app = express();

app.use(logger('combined'))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(route)
app.use((req, res) => {
  return res.status(responseCode.ERROR_NOT_FOUND).send({
    code: responseCode.ERROR_NOT_FOUND,
    message: 'Route' + req.url + ' Not found.'
  })
})

// app.post("/webhook", (req, res) => { // <============= เพิ่มเข้ามาใหม่
//   console.log('req.body =>', JSON.stringify(req.body,null,2)) //สิ่งที่ Line ส่งมา
//   res.send("HTTP POST request sent to the webhook URL!")
// })





app.listen(port, () => console.log(`${appname} app listening on port ${port}!`))