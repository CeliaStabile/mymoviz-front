import Home from '../components/Home';

//fonction de next pour appeler le server avant toute chose et avant la fonction index plus bas

export async function getServerSideProps(context) {
//faire un const resp = await et mettre dans le fetch l'adresse de ma route
  const resp = await fetch('https://mymoviz-back-two.vercel.app/movies')

  return {
    //mettre en props movieData = ce qu'on reçoit du fetch, pour qu'on puisse l'utiliser dans home
    props: {movieData : await resp.json()}, // await resp.json : la propriété movieData est égale à la réponse du fetch convertie en json
  }
}

//ensuite passer movieData comme props de la fonction index :
//signifie donner accès à movieData dans la page (fonction différente donc pas accès par défaut)
function Index({movieData}) {

  //utilise le composant Home, et lui passe en props movieData.movies (parce que dans la route on doit accéder à la prop movies)
  return <Home data= {movieData.movies} />;
}

export default Index;
