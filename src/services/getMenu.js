// var express = require('express');
// import { response } from 'express';
// var cors = require('cors')

// const app = express()

// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions)) // Use this after the variable declaration

const proxyUrl = 'https://proxy.cors.sh/'
const url = "https://kitchen.kanttiinit.fi/menus?lang=fi&restaurants=7,41,2,3,1,51,64,5,52,59,45,50&days=" + new Date().toISOString().split('T')[0]

export default async function getMenu() {
  const menuJSON = await fetch(proxyUrl + url)
  return menuJSON.json()
}
