fetch('package.json')  
.then(response => {
    if (!response.ok) {
        throw new Error('Error loading JSON file');
    }
    return response.json();
})
.then(data => {
    const moviesList = document.getElementById('movies-list');  
    const videoModal = document.getElementById('videoModal');
    const modalContent = document.querySelector('.video-modal-content');
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

        // open modal
        const openMovieModal = () => {
            modalContent.innerHTML = ''; 

            if (movie.url.includes('youtu.be') || movie.url.includes('youtube.com')) {
                // Lien YouTube
                const youtubeEmbedUrl = movie.url.replace('youtu.be/', 'www.youtube.com/embed/')
                                                  .replace('watch?v=', 'embed/');
                const iframe = document.createElement('iframe');
                iframe.src = youtubeEmbedUrl;
                iframe.width = "100%";
                iframe.height = "100%";
                iframe.allow = "autoplay; encrypted-media";
                iframe.allowFullscreen = true;
                modalContent.appendChild(iframe);
            } else {
                // Fichier vidéo direct
                const videoPlayer = document.createElement('video');
                videoPlayer.setAttribute('controls', 'true');
                videoPlayer.style.width = '100%';
                const source = document.createElement('source');
                source.src = movie.url;
                source.type = 'video/mp4';
                videoPlayer.appendChild(source);
                modalContent.appendChild(videoPlayer);
            }

            videoModal.style.display = 'flex';
        };

        // add event
        const playButton = movieElement.querySelector('.play-button');
        playButton.addEventListener('click', openMovieModal);

        moviesList.appendChild(movieElement);
    });
    // delete modal
    closeModalBtn.addEventListener('click', () => {
        videoModal.style.display = 'none';
        modalContent.innerHTML = ''; 
    });
    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            modalContent.innerHTML = ''; 
        }
    });
})
.catch(error => {
    console.error('Error:', error);
});
