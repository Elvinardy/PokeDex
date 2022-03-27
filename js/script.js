$(function () {
  // As another example of AJAX calls in jQuery, we access the PokéAPI to build
  // a Pokédex.
  // JSON, $.getJSON()
  var pokeApiUrl = "https://pokeapi.co/api/v2/generation/1";
  var pokeByName = "https://pokeapi.co/api/v2/pokemon/";

  $.getJSON(pokeApiUrl).done(function(data) {

    $.each(data.pokemon_species, function(index, pokemon) {
      // capitalize first letter of the name and append (.slice) the rest of the name in lowercase (without the first letter)
      var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); 
      var link = $("<a>").attr("id", pokemon.name)
      .attr("href","#").append($("<strong>").text(name))
      var par = $("<p>").html("Pokemon species no. " + (index+1) + " is ").append(link);

      link.click(function(event) {

        $.getJSON(pokeByName + pokemon.name).done(function(details) {
          console.log(details);
          var pokemonDiv = $("#pokemon-details");
          pokemonDiv.empty();
          pokemonDiv.append("<h2>" + name + "</h2>")
          pokemonDiv.append("<img src='" + details.sprites.front_default + "'>")
          pokemonDiv.append("<img src='" + details.sprites.back_default + "'>")
          pokemonDiv.append("<img src='" + details.sprites.front_shiny + "'>")
          pokemonDiv.append("<img src='" + details.sprites.back_shiny + "'>")

        });
        event.preventDefault();
      });
      par.appendTo("#pokemon");
    });
    }).fail(function() {
      console.log("Request to PokeApi failed!");
  }).always(function() {
    console.log("I want to be the very best!")
  });

});

// Capitalizes a given string.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
