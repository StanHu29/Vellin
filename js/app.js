function login(){

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

if(email && password){

alert("Tweefactorauthenticatie succesvol");

window.location.href =
"dashboard.html";

}else{

alert("Vul alle velden in");

}
}

const producten = {

CHO001:{
naam:"Pure Chocoladereep",
houdbaar:"12-03-2027",
allergenen:"Melk",
herkomst:"Ghana",
certificering:"Fairtrade"
},

CHO002:{
naam:"Melk Chocoladereep",
houdbaar:"20-05-2027",
allergenen:"Melk, Soja",
herkomst:"Ivoorkust",
certificering:"Fairtrade"
}

};

function registreerProduct(){

let code =
document.getElementById("productCode").value;

let product =
producten[code];

if(product){

let div =
document.getElementById("producten");

div.innerHTML += `

<div class="product">

<h3>${product.naam}</h3>

<p>Houdbaar: ${product.houdbaar}</p>

<p>Allergenen: ${product.allergenen}</p>

<p>Herkomst: ${product.herkomst}</p>

<p>Certificering: ${product.certificering}</p>

</div>

`;

}else{

alert("Productcode niet gevonden");

}
}

function verstuurKlacht(){

let tekst =
document.getElementById("beschrijving").value;

let type = "Algemene klacht";

if(
tekst.toLowerCase().includes("gesmolten")
){

type = "Smeltschade";

}

if(
tekst.toLowerCase().includes("gebroken")
){

type = "Breukschade";

}

document.getElementById(
"klachtStatus"
).innerHTML = `

<h3>Klacht ontvangen</h3>

<p>Status: In behandeling</p>

<p>Automatisch herkend:
${type}</p>

`;

}

function bestelProduct(){

let nummer =
Math.floor(
Math.random()*1000
);

document.getElementById(
"orderResultaat"
).innerHTML =

`Bestelling geplaatst!
<br>
Ordernummer:
ORD-${nummer}`;

}

function vraagBot(){

let vraag =
document.getElementById("vraag")
.value.toLowerCase();

let antwoord =
"Sorry, ik begrijp de vraag niet.";

if(vraag.includes("allergenen")){

antwoord =
"Onze chocolade bevat melk en soja.";

}

if(vraag.includes("bestelling")){

antwoord =
"Je bestelling wordt binnen 2 werkdagen geleverd.";

}

if(vraag.includes("klacht")){

antwoord =
"Je kunt een klacht indienen via de klachtenpagina.";

}

document.getElementById(
"antwoord"
).innerHTML =
`<h3>${antwoord}</h3>`;

}