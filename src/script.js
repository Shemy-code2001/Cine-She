// json reload
fetch('package.json')  
.then(response => {
    if (!response.ok) {
        throw new Error('Reload error in file json');
    }
    return response.json();
})
.then(data => {
    const moviesList = document.getElementById('movies-list');  
    const videoModal = document.getElementById('videoModal');
    const moviePlayer = document.getElementById('moviePlayer');
    const movieSource = document.getElementById('movieSource');
    const closeModalBtn = document.querySelector('.video-modal-close');

    data.movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('feature');

        movieElement.innerHTML = `
            <div class="feature-image-container">
                <img src="${movie.image}" alt="${movie.name}" class="feature-image">
                <div class="feature-hover-overlay">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            </div>
            <div class="feature-details">
                <h3 class="feature-title">${movie.name}</h3>
                <p class="feature-subtitle">${movie.description}</p>
            </div>
        `;

        const playButton = movieElement.querySelector('.play-button');
        playButton.addEventListener('click', () => {
            movieSource.src = movie.url;
            moviePlayer.load();
            videoModal.style.display = 'flex';
        });

        moviesList.appendChild(movieElement);
    });

    closeModalBtn.addEventListener('click', () => {
        videoModal.style.display = 'none';
        moviePlayer.pause();
        moviePlayer.currentTime = 0;
    });

    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            moviePlayer.pause();
            moviePlayer.currentTime = 0;
        }
    });
})
.catch(error => {
    console.error('Error:', error);
});