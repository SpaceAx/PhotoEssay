// Audio Control dengan format sederhana
let backgroundMusic, musicToggle, musicIcon;

// Function to initialize audio
function initAudio() {
    backgroundMusic = document.getElementById('backgroundMusic');
    musicToggle = document.getElementById('musicToggle');
    musicIcon = document.getElementById('musicIcon');
    
    console.log('=== Audio Initialization ===');
    console.log('Audio element:', backgroundMusic);
    console.log('Toggle button:', musicToggle);
    console.log('Music icon:', musicIcon);
    
    if (!backgroundMusic) {
        console.error('❌ backgroundMusic element NOT FOUND!');
        return;
    }
    
    // Check audio source
    console.log('Audio src:', backgroundMusic.src);
    console.log('Audio currentSrc:', backgroundMusic.currentSrc);
    
    // Test if audio can be accessed
    try {
        console.log('Audio paused:', backgroundMusic.paused);
        console.log('Audio readyState:', backgroundMusic.readyState);
        console.log('Audio networkState:', backgroundMusic.networkState);
    } catch(e) {
        console.error('Error accessing audio properties:', e);
    }
    
    // Event listeners for debugging
    backgroundMusic.addEventListener('loadstart', () => {
        console.log('🔄 Audio loading started');
    });
    
    backgroundMusic.addEventListener('loadeddata', () => {
        console.log('✅ Audio data loaded');
        console.log('Audio duration:', backgroundMusic.duration, 'seconds');
    });
    
    backgroundMusic.addEventListener('canplay', () => {
        console.log('✅ Audio can play');
    });
    
    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('✅ Audio can play through');
    });
    
    backgroundMusic.addEventListener('error', (e) => {
        console.error('❌ Audio error:', e);
        if (backgroundMusic.error) {
            console.error('Error code:', backgroundMusic.error.code);
            console.error('Error message:', backgroundMusic.error.message);
            switch(backgroundMusic.error.code) {
                case 1: console.error('MEDIA_ERR_ABORTED - Playback aborted'); break;
                case 2: console.error('MEDIA_ERR_NETWORK - Network error'); break;
                case 3: console.error('MEDIA_ERR_DECODE - Decode error'); break;
                case 4: console.error('MEDIA_ERR_SRC_NOT_SUPPORTED - Source not supported'); break;
            }
        }
        console.error('Network state:', backgroundMusic.networkState);
        console.error('Current src:', backgroundMusic.currentSrc);
        alert('❌ Error loading audio!\n\nCheck browser console (F12) for details.\n\nPossible issues:\n- File not found: audio/music.mp3\n- CORS issue (use web server)\n- File corrupted');
    });
    
    // Toggle music play/pause
    if (musicToggle) {
        musicToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!backgroundMusic) {
                console.error('Background music element not found!');
                return;
            }
            
            console.log('🎵 Toggle clicked');
            console.log('Current state - paused:', backgroundMusic.paused);
            
            if (backgroundMusic.paused) {
                console.log('Attempting to play audio...');
                
                // Check if audio is ready
                if (backgroundMusic.readyState < 2) {
                    console.warn('Audio not ready yet, waiting...');
                    backgroundMusic.load();
                }
                
                const playPromise = backgroundMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('✅ Audio playing successfully!');
                            if (musicIcon) musicIcon.textContent = '⏸';
                        })
                        .catch(err => {
                            console.error('❌ Error playing audio:', err);
                            console.error('Error name:', err.name);
                            console.error('Error message:', err.message);
                            
                            let errorMsg = 'Cannot play audio: ' + err.message;
                            if (err.name === 'NotAllowedError') {
                                errorMsg = 'Autoplay blocked by browser. Please click play button.';
                            }
                            
                            alert(errorMsg);
                            if (musicIcon) musicIcon.textContent = '▶';
                        });
                }
            } else {
                backgroundMusic.pause();
                console.log('⏸ Audio paused');
                if (musicIcon) musicIcon.textContent = '▶';
            }
        });
    } else {
        console.error('❌ Music toggle button not found!');
    }
}

// Wait for DOM to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudio);
} else {
    // DOM already loaded
    initAudio();
}

// Setup screen functionality
function initSetupScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const setupScreen = document.getElementById('setupScreen');
    const mainContent = document.getElementById('mainContent');
    const continueBtn = document.getElementById('continueBtn');
    const musicPermission = document.getElementById('musicPermission');

    // Show setup screen after welcome
    setTimeout(() => {
        if (welcomeScreen) {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                if (setupScreen) {
                    setupScreen.classList.remove('hidden');
                }
            }, 500);
        }
    }, 3000);
    
    // Continue button
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (setupScreen) {
                setupScreen.classList.add('hidden');
            }
            if (mainContent) {
                mainContent.classList.remove('hidden');
            }
            
            // Start music if permission is granted (after user interaction)
            if (musicPermission && musicPermission.checked && backgroundMusic) {
                setTimeout(() => {
                    console.log('Attempting to start background music...');
                    const playPromise = backgroundMusic.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                console.log('✅ Background music started');
                                if (musicIcon) musicIcon.textContent = '⏸';
                            })
                            .catch(err => {
                                console.log('⚠️ Autoplay blocked (this is normal):', err.message);
                                console.log('User needs to click play button manually');
                                // Don't show alert, just let user click play button
                            });
                    }
                }, 500);
            }
        });
    }
}

// Initialize setup screen
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSetupScreen);
} else {
    initSetupScreen();
}

// Slide navigation
const slides = document.querySelectorAll('.slide');
const navDots = document.querySelectorAll('.nav-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        showSlide(newIndex);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        showSlide(newIndex);
    });
}

// Nav dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        showSlide(newIndex);
    } else if (e.key === 'ArrowRight') {
        const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        showSlide(newIndex);
    }
});

// Cava Visualizer (simple version)
const cavaVisualizer = document.getElementById('cavaVisualizer');
if (cavaVisualizer && backgroundMusic) {
    let audioContext, analyser, dataArray;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        
        const source = audioContext.createMediaElementSource(backgroundMusic);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        const bars = cavaVisualizer.querySelectorAll('.cava-bar');
        
        function updateVisualizer() {
            if (!backgroundMusic.paused) {
                analyser.getByteFrequencyData(dataArray);
                
                bars.forEach((bar, i) => {
                    const value = dataArray[Math.floor(i * (dataArray.length / bars.length))];
                    const height = Math.max(3, (value / 255) * 100);
                    bar.style.height = height + '%';
                });
                
                requestAnimationFrame(updateVisualizer);
            }
        }
        
        backgroundMusic.addEventListener('play', () => {
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            updateVisualizer();
        });
        
    } catch (e) {
        console.log('Visualizer not supported:', e);
    }
}

