const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  nimi: 'Mägironimine',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Mägironimine.jpg',
  registreeruUrl: '/registreeru?matk=1'
}

const matk2 = {
  nimi: 'Kanuumatk',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Kanuumatk.jpg',
  registreeruUrl: '/registreeru?matk=2'
}

const matk3 = {
  nimi: 'Rabamatk',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Rabamatk.jpg',
  registreeruUrl: '/registreeru?matk=3'
}

const matk4 = {
  nimi: 'Gurmeematk',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Gurmeematk.jpg',
  registreeruUrl: '/registreeru?matk=4'
}
const matkad = [matk1, matk2, matk3, matk4];

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/matkaklubi'))
  .get('/registreeru', (req, res) => res.render('pages/registreerumine', {matk: req.query.matk, andmed: matkad[req.query.matk-1] }))
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/Meist', (req, res) => res.render('pages/Meist'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
