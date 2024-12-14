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

        // Add event listeners for both hover and click interactions
        const playButton = movieElement.querySelector('.play-button');
        const playContainer = playButton.closest('.feature-hover-overlay');

        // Function to open movie modal
        const openMovieModal = () => {
            movieSource.src = movie.url;
            moviePlayer.load();
            videoModal.style.display = 'flex';
        };

        // For desktop: hover interactions
        playContainer.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                playButton.style.opacity = '1';
            }
        });

        playContainer.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                playButton.style.opacity = '0';
            }
        });

        // For both desktop and mobile: click interactions
        playButton.addEventListener('click', openMovieModal);
        
        // Add a fallback for mobile to click on the entire card
        movieElement.addEventListener('click', (event) => {
            // Prevent opening if clicking on hover overlay with play button
            if (event.target !== playButton && window.innerWidth <= 768) {
                openMovieModal();
            }
        });

        moviesList.appendChild(movieElement);
    });

    // Close modal functionality
    closeModalBtn.addEventListener('click', () => {
        videoModal.style.display = 'none';
        moviePlayer.pause();
        moviePlayer.currentTime = 0;
    });

    // Close modal when clicking outside the video
    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            moviePlayer.pause();
            moviePlayer.currentTime = 0;
        }
    });

    // Responsive design adjustments
    const adjustPlayButtonVisibility = () => {
        const playButtons = document.querySelectorAll('.feature-hover-overlay');
        playButtons.forEach(overlay => {
            const playButton = overlay.querySelector('.play-button');
            if (window.innerWidth <= 768) {
                // On mobile, make play button always visible
                playButton.style.opacity = '1';
            } else {
                // On desktop, restore hover behavior
                playButton.style.opacity = '0';
            }
        });
    };

    // Initial adjustment and add resize listener
    adjustPlayButtonVisibility();
    window.addEventListener('resize', adjustPlayButtonVisibility);
})
.catch(error => {
    console.error('Error:', error);
});