const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const MongoClient = require('mongodb').MongoClient;
const salas6na = 'KalaSuppG0';
const andmebaas = 'veebg2'; // <= Pane X asemel siia enda number
const uri = `mongodb+srv://veebg0:${salas6na}@cluster0.qz3rv.mongodb.net/${andmebaas}?retryWrites=true&w=majority`;


const matk1 = {
  matk: 1,
  nimi: 'Mägironimine',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Mägironimine.jpg',
  registreeruUrl: '/registreeru?matk=1',
  registreerunud: []
}

const matk2 = {
  matk: 2,
  nimi: 'Kanuumatk',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Kanuumatk.jpg',
  registreeruUrl: '/registreeru?matk=2',
  registreerunud: []
}

const matk3 = {
  matk: 3,
  nimi: 'Rabamatk',
  kirjeldus: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam obcaecati, perferendis sequi corporis repellendus similique nemo veniam aliquam laborum cum eos ipsa aliquid voluptatem. Aliquam, minus iste. Quia, laudantium eaque?',
  piltUrl: '/Matkaklubi/Pildid/Rabamatk.jpg',
  registreeruUrl: '/registreeru?matk=3',
  registreerunud: []
}

const matk4 = {
  matk: 4,
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
  const markused = req.query.markused || '';
  console.log(`Käivtati registreerumine. Registreerus ${nimi} matkale ${matkIndex} ja kelle email on ${email} ja lisatud ${markused}`);
  const matkaAndmed = { index: matkIndex, nimi: nimi, email: email, markused: markused };
  //TODO: Lisa matkaAndmed registreerumiste info juurde
  // ...
  //matkad[matkIndex-1].registreerunud.push(matkaAndmed)
  console.log(matkad[matkIndex-1])

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect((err) => {
      if (err) {
          res.send({ error: 'Viga: ' + err.message });
      } else {
          const collection = client.db(andmebaas).collection('matkaklubi_' + andmebaas + '_registreerumised');
          collection.insertOne(matkaAndmed, (err) => {
              client.close();
              if (err) {
                  return res.send({ error: 'Viga andmete lisamisel: ' + err.message });
              }
              res.send({ success: true });
          });
      }
  });
}

function naitaMatkaAdminLehte(req, res) {
  const andmed = matkad[req.query.matk-1]
  
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect((err) => {
      if (err) {
          res.send({ error: 'Viga: ' + err.message });
      } else {
          const collection = client.db(andmebaas).collection('matkaklubi_' + andmebaas + '_registreerumised');
          collection.find({index : andmed.matk.toString()})
          .toArray( (err, registreerumised) => {
              client.close();
              if (!err) {
                  console.log(registreerumised)
                  andmed.registreerunud = registreerumised
              }
  
              res.render('pages/admin', {andmed: andmed})
          });
      }
  });
 }
 

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/matkaklubi', {matkad: matkad}))
  .get('/registreeru', (req, res) => res.render('pages/registreerumine', {matk: req.query.matk, andmed: matkad[req.query.matk-1] }))
  .get('/admin', naitaMatkaAdminLehte)
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/kinnita', registreeri)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
