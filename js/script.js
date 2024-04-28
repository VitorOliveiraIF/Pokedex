const pokemon_name = document.querySelector('.pokemon_name');
const pokemon_number = document.querySelector('.pokemon_number');
const pokemon_image = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btn_prev = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');
const btn_rand = document.querySelector('.btn-rand');

let searchPokemon = 1;


const fetchPokemon = async(pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
    else{
        pokemon_image.style.display = 'none';
    }
}

const renderPokemon = async (pokemon) => {

    
    pokemon_name.innerHTML = 'Carregando...';
    pokemon_number.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
    searchPokemon = data.id
    pokemon_name.innerHTML = data.name;
    pokemon_number.innerHTML = data.id
    pokemon_image.src = data['sprites']['front_default'];
    }
    else{
        pokemon_name.innerHTML = 'Pokémon não existe!';
    pokemon_number.innerHTML = '';
    }
  
}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase())
    input.value = '';
});


btn_prev.addEventListener('click', async () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        await renderPokemon(searchPokemon);
    } else {

    }
});

btn_next.addEventListener('click', async () => {
    if (searchPokemon < 1025) {
        searchPokemon += 1;
        await renderPokemon(searchPokemon); 
    } else {
    
    }
});

btn_rand.addEventListener('click', async () => {
    searchPokemon = Math.floor(Math.random() * 1025)
    await renderPokemon(searchPokemon); 
});


renderPokemon(searchPokemon)