import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {

    (async () => {
      const response = await fetch('https://api.github.com/users/Italo1994/repos');
      const data = await response.json();

      setRepositories(data);
    })()

  }, []);

  function handleFavorite(id) {
    const newRepositories = repositories.map( repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    } );

    setRepositories(newRepositories);
  }

  return ( 
      <ul>
        {repositories.map(repo => ( 
          <>
            <li key={repo.id}> 
              { repo.name }
              { repo.favorite && <span>(Favorite)</span> }
            </li>
            <button onClick={ () => handleFavorite(repo.id) }>Favoritar</button>
          </>
        ))}
      </ul>  
  );
}
