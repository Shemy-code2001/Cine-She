function processMovieData(data) {
    // Créez une map de films par titre pour une recherche facile
    const movieMap = new Map();
  
    data.forEach(movie => {
      movieMap.set(movie.title, {
        id: movie.title.toLowerCase().replace(/\s+/g, '-'),
        title: movie.title,
        description: movie.description,
        type: movie.type,
        image: movie.image,
        stars: movie.stars || '7.0/10',
        language: movie.language || 'unknown'
      });
    });
  
    return Array.from(movieMap.values());
  }