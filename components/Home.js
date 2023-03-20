import { useEffect, useState } from 'react';
import { Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Movie from './Movie';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';

//mettre props en arguments pour pouvoir utiliser movieData présent dans index (page parente)
function Home(props) {
  const [likedMovies, setLikedMovies] = useState([]);

  // Liked movies (inverse data flow)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find(movie => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter(movie => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  //peupler les liked movies dans le contenu du popover
  const likedMoviesPopover = likedMovies.map((data, i) => {
    return (
      <div key={i} className={styles.likedMoviesContainer}>
        <span className="likedMovie">{data}</span>
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => updateLikedMovies(data)} className={styles.crossIcon} />
      </div>
    );
  });

  const popoverContent = (
    <div className={styles.popoverContent}>
      {likedMoviesPopover}
    </div>
  );

//mettre en place les cartes movies via l'api themoviedatabase 
//ici on ne fait plus le use effect car les cartes sont récupérées en SSR dans index.js
//Plus vraiment besoin de setter ici car l'état intial est props.data
  const [moviesData, setMoviesData] = useState(props.data); // props.data : le nom qu'on lui a donné dans index. Récupère les films fetchés

//inutile maintenant
//  useEffect(() => {
//    fetch('https://mymoviz-back-two.vercel.app/movies')
//      .then(response => response.json())
//      .then(data => {
//        setMoviesData(data.movies);
//      });
//  }, []);


  const movies = moviesData.map((data, i) => {
    const isLiked = likedMovies.some(movie => movie === data.title);


    return <Movie key={i} updateLikedMovies={updateLikedMovies} isLiked={isLiked} title={data.title} overview={data.overview} poster={data.poster_path} voteAverage={data.vote_average} voteCount={data.vote_count} />;
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover title="Liked movies" content={popoverContent} className={styles.popover} trigger="click">
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      <div className={styles.moviesContainer}>
        {movies}
      </div>
    </div>
  );
}

export default Home;