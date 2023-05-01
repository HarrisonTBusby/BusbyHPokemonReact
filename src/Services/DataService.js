let boolTrue = true;
let asyncPokemonAPI;
let pokemonNumber;
let randomPokemon;
let pokemonHabitat;
let evolutionChain;
let pokemonTyping1;
let pokemonTyping2;
let pokemonColor1;
let pokemonColor2;
let pokemonCardColor;
let pokemonSpriteShown;
let pokemonSpriteShinyShown;


async function AsyncGetPokemon(actualPokemon){
    var letters = /^[a-zA-Z\s\-]+$/

    if(actualPokemon <= 1008 || actualPokemon.match(letters)){
    
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${actualPokemon}`);
    const data = await promise.json();
    asyncPokemonAPI = data;

    let pokemonNumber = asyncPokemonAPI.id;
    let pokemonName = asyncPokemonAPI.name;

  //------------------------------------------------------------------------------------------------------------

    //Pokemon Evolution

    const promiseName = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const dataName = await promiseName.json();  
    let pokemonEvolution = dataName.evolution_chain.url;

    const promiseEvolution = await fetch(pokemonEvolution);
    const dataEvolution = await promiseEvolution.json();

    if(dataEvolution.chain.evolves_to == 0){
        evolutionChain = 'N/A';
        
    }else if(dataEvolution.chain.evolves_to[0].evolves_to.length > 0){
        let firstEvo = dataEvolution.chain.species.name;
        let secondEvo = dataEvolution.chain.evolves_to[0].species.name;
        let thirdEvo = dataEvolution.chain.evolves_to[0].evolves_to[0].species.name;
        evolutionChain = firstEvo + ', ' + secondEvo + ', ' + thirdEvo;
        
    }else{
        let firstEvo = dataEvolution.chain.species.name;
        const arrayEvoEevee = dataEvolution.chain.evolves_to.map(x => x.species).map(x => x.name).join(', ');
        const mapEvoEevee = arrayEvoEevee;
        evolutionChain = mapEvoEevee;
    }    

    //--------------------------------------------------------------------------------------------------------------------------

    //Location
    const promise2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/encounters`);
    const data2 = await promise2.json();
    

    if(data2.length == 0){
        pokemonHabitat = 'N/A';
    }else{
        pokemonHabitat = data2.map(x => x.location_area.name).join(', ');
        
    }

    //Abilities

    const array1 = asyncPokemonAPI.abilities;
    const map1 = array1.map(x => x.ability.name);
    let pokemonAbilities = map1.join(', ');
    
    //Moves

    const movesArray = asyncPokemonAPI.moves;
    const map2 = movesArray.map(x => x.move.name);
    let pokemonMoves = map2.join(', ');

    //Typing
  
    if(asyncPokemonAPI.types.length == 1){
        pokemonTyping1 = '';
        pokemonTyping2 = '';
        pokemonTyping1 = asyncPokemonAPI.types[0].type.name.toUpperCase();

    if(asyncPokemonAPI.types[0].type.name == 'poison'){
        pokemonColor1 = 'poisonType';
        pokemonColor2 = '';
        pokemonCardColor = 'poisonTypeBackground';
    }
    if(asyncPokemonAPI.types[0].type.name == 'normal'){
        pokemonColor1 = 'normalType';  
        pokemonColor2 = '';
        pokemonCardColor = 'normalTypeBackground';   
    }
    if(asyncPokemonAPI.types[0].type.name == 'fire'){
        pokemonColor1 = 'fireType';
        pokemonColor2 = '';
        pokemonCardColor = 'fireTypeBackground';
    }

    if(asyncPokemonAPI.types[0].type.name == 'water'){
        pokemonColor1 = 'waterType';
        pokemonColor2 = '';
        pokemonCardColor = 'waterTypeBackground';
    }

    if(asyncPokemonAPI.types[0].type.name == 'grass'){
        pokemonColor1 = 'grassType';
        pokemonColor2 = '';
        pokemonCardColor = 'grassTypeBackground';
    }

    if(asyncPokemonAPI.types[0].type.name == 'electric'){
        pokemonColor1 = 'electricType';
        pokemonColor2 = '';
        pokemonCardColor = 'electricTypeBackground';
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'ice'){
        pokemonColor1 = 'iceType';
        pokemonColor2 = '';
        pokemonCardColor = 'iceTypeBackground';
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'dark'){
        pokemonColor1 = 'darkType';
        pokemonColor2 = '';
        pokemonCardColor = 'darkTypeBackground';
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'psychic'){
        pokemonColor1 = 'psychicType';
        pokemonColor2 = '';
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'ghost'){
        pokemonColor1 = 'ghostType';
        pokemonColor2 = '';
        pokemonCardColor = 'ghostTypeBackground';
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'steel'){
        pokemonColor1 = 'steelType';
        pokemonColor2 = '';
        pokemonCardColor = 'steelTypeBackground';
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'rock'){
        pokemonColor1 = 'rockType';
        pokemonColor2 = '';
        pokemonCardColor = 'rockTypeBackground';
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'ground' ){
        pokemonColor1 = 'groundType';
        pokemonColor2 = '';
        pokemonCardColor = 'groundTypeBackground';
       
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'dragon' ){
        pokemonColor1 = 'dragonType';
        pokemonColor2 = '';
        pokemonCardColor = 'dragonTypeBackground';
    
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'fairy'){
        pokemonColor1 = 'fairyType';
        pokemonColor2 = '';
        pokemonCardColor = 'fairyTypeBackground';
       
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'fighting' ){
        pokemonColor1 = 'fightingType';
        pokemonColor2 = '';
        pokemonCardColor = 'fightingTypeBackground';
        
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'bug'){
        pokemonColor1 = 'bugType';
        pokemonColor2 = '';
        pokemonCardColor = 'bugTypeBackground';
       
    }
    
    if(asyncPokemonAPI.types[0].type.name == 'flying'){
        pokemonColor1 = 'flyingType';
        pokemonColor2 = '';
        pokemonCardColor = 'flyingTypeBackground';
        
    }

        
    }else{
        pokemonTyping1 = asyncPokemonAPI.types[0].type.name.toUpperCase();
        pokemonTyping2 = asyncPokemonAPI.types[1].type.name.toUpperCase();


        if(asyncPokemonAPI.types[0].type.name == 'poison'){
            pokemonColor1 = 'poisonType';
            pokemonCardColor = 'poisonTypeBackground';
        
        }
    
        if(asyncPokemonAPI.types[0].type.name == 'normal'){
            pokemonColor1 = 'normalType';
            pokemonCardColor = 'normalTypeBackground';
           
        }
    
        if(asyncPokemonAPI.types[0].type.name == 'fire'){
            pokemonColor1 = 'fireType';
            pokemonCardColor = 'fireTypeBackground';
          
        }
    
        if(asyncPokemonAPI.types[0].type.name == 'water'){
            pokemonColor1 = 'waterType';
            pokemonCardColor = 'waterTypeBackground';
            
        }
    
        if(asyncPokemonAPI.types[0].type.name == 'grass'){
            pokemonColor1 = 'grassType';
            pokemonCardColor = 'grassTypeBackground';
            
        }
    
        if(asyncPokemonAPI.types[0].type.name == 'electric'){
            pokemonColor1 = 'electricType';
            pokemonCardColor = 'electricTypeBackground';
            
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'ice'){
            pokemonColor1 = 'iceType';
            pokemonCardColor = 'iceTypeBackground';
          
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'dark'){
            pokemonColor1 = 'darkType';
            pokemonCardColor = 'darkTypeBackground';
            
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'psychic'){
            pokemonColor1 = 'psychicType';
            pokemonCardColor = 'psychicTypeBackground';
    
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'ghost'){
            pokemonColor1 = 'ghostType';
            pokemonCardColor = 'ghostTypeBackground';

        }
        
        if(asyncPokemonAPI.types[0].type.name == 'steel'){
            pokemonColor1 = 'steelType';
            pokemonCardColor = 'steelTypeBackground';
           
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'rock'){
            pokemonColor1 = 'rockType';
            pokemonCardColor = 'rockTypeBackground';
            
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'ground' ){
            pokemonColor1 = 'groundType';
            pokemonCardColor = 'groundTypeBackground';

        }
        
        if(asyncPokemonAPI.types[0].type.name == 'dragon' ){
            pokemonColor1 = 'dragonType';
        
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'fairy'){
            pokemonColor1 = 'fairyType';
            pokemonCardColor = 'fairyTypeBackground';
           
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'fighting' ){
            pokemonColor1 = 'fightingType';
            pokemonCardColor = 'fightingTypeBackground';
            
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'bug'){
            pokemonColor1 = 'bugType';
            pokemonCardColor = 'bugTypeBackground';
           
        }
        
        if(asyncPokemonAPI.types[0].type.name == 'flying'){
            pokemonColor1 = 'flyingType';
            pokemonCardColor = 'flyingTypeBackground';
            
        }

        // Typing 2

        if(asyncPokemonAPI.types[1].type.name == 'poison'){
            pokemonColor2 = 'poisonType';
            
        }
    
        if(asyncPokemonAPI.types[1].type.name == 'normal'){
            pokemonColor2 = 'normalType';
           
            
        }
    
        if(asyncPokemonAPI.types[1].type.name == 'fire'){
            pokemonColor2 = 'fireType';
          
        }
    
        if(asyncPokemonAPI.types[1].type.name == 'water'){
            pokemonColor2 = 'waterType';
            
        }
    
        if(asyncPokemonAPI.types[1].type.name == 'grass'){
            pokemonColor2 = 'grassType';
            
        }
    
        if(asyncPokemonAPI.types[1].type.name == 'electric'){
            pokemonColor2 = 'electricType';
            
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'ice'){
            pokemonColor2 = 'iceType';
          
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'dark'){
            pokemonColor2 = 'darkType';
            
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'psychic'){
            pokemonColor2 = 'psychicType';
    
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'ghost'){
            pokemonColor2 = 'ghostType';
           
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'steel'){
            pokemonColor2 = 'steelType';
           
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'rock'){
            pokemonColor2 = 'rockType';
            
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'ground' ){
            pokemonColor2 = 'groundType';
           
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'dragon' ){
            pokemonColor2 = 'dragonType';
        
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'fairy'){
            pokemonColor2 = 'fairyType';
           
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'fighting' ){
            pokemonColor2 = 'fightingType';
            
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'bug'){
            pokemonColor2 = 'bugType';
           
        }
        
        if(asyncPokemonAPI.types[1].type.name == 'flying'){
            pokemonColor2 = 'flyingType';
            
        }
    }

    
    


     //Sprites
   
     pokemonSpriteShown = asyncPokemonAPI.sprites.front_default;
     pokemonSpriteShinyShown = asyncPokemonAPI.sprites.front_shiny;

     let pokemonData = {
        Name: pokemonName,
        Number: pokemonNumber,
        Abilities: pokemonAbilities,
        Evolution: evolutionChain,
        Moves: pokemonMoves,
        Locale: pokemonHabitat,
        Typing1: pokemonTyping1,
        Typing2: pokemonTyping2,
        typingColor1: pokemonColor1,
        typingColor2: pokemonColor2,
        PokemonCardColor: pokemonCardColor,
        Sprite: pokemonSpriteShown,
        ShinySprite: pokemonSpriteShinyShown
    };

    return pokemonData;

 }else{


 }
    


}

export {AsyncGetPokemon};