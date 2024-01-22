const pokemonNome = document.querySelector('.pokemon__name');
const pokemonImagem = document.querySelector('.pokemon__image');
const pokemonNumero = document.querySelector('.pokemon__number');

const formulario = document.querySelector('.form');
const entradaUsuario = document.querySelector('.input__search');
const proximoBotao = document.querySelector('.btn-next');
const anteriorBotao = document.querySelector('.btn-prev');
//const caminhoDaImagemLocal = 

let buscarPokemon =1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonNome.innerHTML = 'Loading...';
  pokemonNumero.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(entradaUsuario.value.toLowerCase());
    
  });
  if (data) {
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    entradaUsuario.value = '';
    buscarPokemon = data.id;
    if(buscarPokemon>=650){
      pokemonImagem.style.display = 'none';
      //pokemonImagem.src = caminhoDaImagemLocal
      //pokemonImagem.style.display = 'block';
    }
  } 
  else {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Não catalogado:(';
    pokemonNumero.innerHTML = '';
  }
}
  
  anteriorBotao.addEventListener('click', () => {
  if (buscarPokemon > 1) {
    buscarPokemon -= 1;
    renderPokemon(buscarPokemon);
  }
});

proximoBotao.addEventListener('click', () => {
  buscarPokemon += 1;
  renderPokemon(buscarPokemon);
});

renderPokemon(buscarPokemon);
