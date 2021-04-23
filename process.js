var obj = window.document.getElementById("listaPokemones");
var objDetails = window.document.getElementById("listaPokemonesDetails");
var objPokedex = window.document.getElementById("listaPokemonesPokedex");

var pokedexSesion = window.sessionStorage;

function consultarPokemones(){
    var pokemones = new Array();

    for(var i=0;i<10;i++)
    {
        pokemones[i] = Math.round(Math.random() * 898);
        consultarPokemon(i,pokemones[i]);
    }       
}

function consultarPokemon(id,numPokemon){
    fetch("https://pokeapi.co/api/v2/pokemon/"+numPokemon)
        .then(function (response){
            response.json()
            .then(function (pokemon){
                //console.log(pokemon);
                buildHtmlPokemon(id,pokemon);
            })
        })
}

function buildHtmlPokemon(id,pokemon)
{
    var html = "";
    html +="<div class='pokemon' id='pokemon-"+id+"'>";
    html +="<a href='#' onclick='pokemonDetails(\""+pokemon.id+"\");'><image src='"+pokemon.sprites.front_default+"' /></a>";
    html +="<p><b>Nombre:</b> "+pokemon.name+"</p>";
    html +="<p><b>Tipos:</b> </p>"; 
    html +="<ul>";
    Object.entries(pokemon.types).forEach( (tipo,index) => {
        //console.log(tipo[1].type.name);
        html += "<li>"+tipo[1].type.name+"</li>";
    });
    html +="</ul>";
    html +="</div>";
    objDetails.innerHTML = "";
    objPokedex.innerHTML = "";
    obj.innerHTML += html;
}

//***************************************************************************/
//***************************************************************************/

function pokemonDetails(id)
{
    fetch("https://pokeapi.co/api/v2/pokemon/"+id)
        .then(function (response){
            response.json()
            .then(function (pokemon){
                buildHtmlPokemonDetails(pokemon);
            })
        })
}


function buildHtmlPokemonDetails(pokemon)
{
    var id=0;

    var html = "";
    html +="<div class='pokemon' id='pokemon-"+id+"'>";
    html +="<image src='"+pokemon.sprites.front_default+"' />";
    html +="<p><b>Nombre:</b> "+pokemon.name+"</p>";
    html +="<p><b>Tipos:</b> </p>"; 
    html +="<ul>";
    Object.entries(pokemon.types).forEach( (tipo,index) => {
        html += "<li>"+tipo[1].type.name+"</li>";
    });
    html +="</ul>";
    html +="<br><br><input type='button' onclick='addPokedex("+pokemon.id+",\""+pokemon.name+"\")' value='ADD TO POKEDEX'>";
    html +="</div>";
    obj.innerHTML = "";
    objPokedex.innerHTML = "";
    objDetails.innerHTML = html;
    
}

//***************************************************************************/
//***************************************************************************/

function addPokedex(id,name){
    window.sessionStorage.setItem(id,name);
    console.log(window.sessionStorage);
}

function deletePokedex(id){
    window.sessionStorage.removeItem(id);
    console.log(window.sessionStorage);
    objPokedex.innerHTML ="";
    showPokedex();
}
//***************************************************************************/
//***************************************************************************/

function showPokedex(){
    let storage = {}
    let cont = 0;
    Object.keys(window.sessionStorage).forEach((key) => {
        storage[key] = window.sessionStorage.getItem(key);
        console.log(key);
        consultarPokedex(cont, key);
        cont++;
    });

    if(cont == 0 )
    {
        var html = "<CENTER><B>NO HAY POKEMONES EN POKEDEX<B></CENTER>";
        obj.innerHTML = "";
        objDetails.innerHTML = "";
        objPokedex.innerHTML += html;
    }
}

function consultarPokedex(id,numPokemon){
    fetch("https://pokeapi.co/api/v2/pokemon/"+numPokemon)
        .then(function (response){
            response.json()
            .then(function (pokemon){
                console.log(pokemon);
                buildHtmlPokedex(id,pokemon);
            })
        })
}

function buildHtmlPokedex(id,pokemon)
{
    var html = "";
    html +="<div class='pokemon' id='pokemon-"+id+"'>";
    html +="<a href='#' onclick='pokemonDetails(\""+pokemon.id+"\");'><image src='"+pokemon.sprites.front_default+"' /></a>";
    html +="<p><b>Nombre:</b> "+pokemon.name+"</p>";
    html +="<p><b>Tipos:</b> </p>"; 
    html +="<ul>";
    Object.entries(pokemon.types).forEach( (tipo,index) => {
        //console.log(tipo[1].type.name);
        html += "<li>"+tipo[1].type.name+"</li>";
    });
    html +="</ul>";
    html +="<br><br><input type='button' onclick='deletePokedex("+pokemon.id+")' value='DELETE POKEDEX'>";
    html +="</div>";
    obj.innerHTML = "";
    objDetails.innerHTML = "";
    objPokedex.innerHTML += html;
}