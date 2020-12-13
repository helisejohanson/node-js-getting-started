const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  nimi: 'Mägironimine',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Mägironimine.jpg',
  registreeruUrl: '/registreeru?matk=1',
  registreerunud: []
}

const matk2 = {
  nimi: 'Kanuumatk',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Kanuumatk.jpg',
  registreeruUrl: '/registreeru?matk=2',
  registreerunud: []
}

const matk3 = {
  nimi: 'Rabamatk',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Rabamatk.jpg',
  registreeruUrl: '/registreeru?matk=3',
  registreerunud: []
}

const matk4 = {
  nimi: 'Gurmeematk',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Gurmeematk.jpg',
  registreeruUrl: '/registreeru?matk=4',
  registreerunud: []
}
const matkad = [matk1, matk2, matk3, matk4];

function registreeri(req, res) {
  const nimi = req.query.nimi;
  const matkIndex = req.query.matkIndex;
  const email = req.query.email;
  const markused = req.query.markused;
  console.log(`Käivtati registreerumine. Registreerus ${nimi} matkale ${matkIndex} ja kelle email on ${email} ja lisatud ${markused}`);
  const matkaAndmed = { index: matkIndex, nimi: nimi, email: email, markused: markused };
  //TODO: Lisa matkaAndmed registreerumiste info juurde
  // ...
  matkad[matkIndex-1].registreerunud.push(matkaAndmed)
  console.log(matkad[matkIndex-1])
  res.send({ 
    success: true,
teade: `Käivtati registreerumine. Registreerus ${nimi} matkale ${matkIndex} ja kelle email on ${email} ja lisatud ${markused}`
});
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/matkaklubi'))
  .get('/registreeru', (req, res) => res.render('pages/registreerumine', {matk: req.query.matk, andmed: matkad[req.query.matk-1] }))
  .get('/admin', (req, res) => res.render('pages/admin', {andmed: matkad[req.query.matk-1] }))
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/Meist', (req, res) => res.render('pages/Meist'))
  .get('/kinnita', registreeri)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
