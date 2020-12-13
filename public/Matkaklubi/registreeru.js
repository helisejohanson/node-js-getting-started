

function registreeru () {
    const matkIndex = document.querySelector('#matkIndex').value;
    const email = document.querySelector('#Epost').value;
    const nimi = document.querySelector('#nimi').value;
    const Markused = document.querySelector('#Markused').value;
   const vormEL = document.querySelector('#registreerumisvorm')
  
    var settings = {
        async: true,
        crossDomain: true,
        url: `/kinnita?matkIndex=${matkIndex}&email=${email}&nimi=${nimi}&markused=${Markused}`,
        method: 'GET',
        headers: {},
    };
  
    $.ajax(settings).done(function (response) {
        console.log(response);
        //Näita vastust - näiteks vormi asemel teadet "Salvestamine õnnestus"
      vormEL.innerHTML = `<div class="message">Hea ${nimi} - salvestamine õnnestus!</div>`
    }); 
    return false  
}
