const chapeaux = ["Chapeau1", "Chapeau2", "Chapeau3", "Chapeau4", "Chapeau5", "Chapeau6", "Chapeau7", "Chapeau8"];
const chapeaux_dict = {
    "Chapeau1": "Christmas",
    "Chapeau2": "Irish",
    "Chapeau3": "Indiana",
    "Chapeau4": "Holiday",
    "Chapeau5": "Gang",
    "Chapeau6": "Magician",
    "Chapeau7": "Wizard",
    "Chapeau8": "Pirate"
}
const chestButton = document.getElementById('chest');

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function setupInfiniteSlider() {
    const slideTrack = document.querySelector('.slide-track');
    const slides = Array.from(slideTrack.children);

    // Clone each slide and append it to the track
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slideTrack.appendChild(clone);
    });
}

document.querySelectorAll('.percentage').forEach(function(element) {
    let text = element.textContent;
    let value = parseInt(text); // Convertit en nombre

    if (value < 0) {
        element.classList.add('negative');
    } else {
        element.classList.add('positive');
    }
});

document.getElementById("mobile-menu").addEventListener("click", function() {
    let navList = document.querySelector(".nav-list");
    navList.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', () => {
    const nuages = ["Nuage1", "Nuage2"];
    const usedCombinations = new Set();
    const container = document.getElementById('container');
    const maxCombinations = 3;
    const delay = 8000; // 5 second delay
    const speed = 2; // Speed of animation (pixels per frame)

    /**
     * Generates a unique combination of a chapeau and a nuage.
     * @returns {string} A unique combination.
     */
    const generateUniqueCombination = () => {
        let combination;
        do {
            const chapeau = getRandomElement(chapeaux);
            const nuage = getRandomElement(nuages);
            combination = `${chapeau} - ${nuage}`;
        } while (usedCombinations.has(combination));
        usedCombinations.add(combination);
        return combination;
    };

    /**
     * Creates and returns a new combination element.
     * @param {string} combination - The combination text to display.
     * @returns {HTMLElement} The newly created combination element.
     */
    const createCombinationElement = (combination, index) => {
        const element = document.createElement('div');
        element.className = 'combination';
        element.textContent = combination;
        element.id = "container-" + index
        element.style.right = '0px';
        element.style.top = "" + Math.floor(Math.random() * 500) + "px"
        element.innerHTML = "<img class='chapeau' src='./assets/images/chapeaux/" + combination.split(" - ")[0] + ".png' /><img class='chat' src='./assets/images/cat-cl.png' width='80' height='80'/><img class='cloud' src='./assets/images/clouds/" + combination.split(" - ")[1] + ".png' />";
        return element;
    };

    /**
     * Animates the combination element to move it across the screen.
     * @param {HTMLElement} element - The element to animate.
     * @param {function} callback - The callback to call after animation completes.
     */
    const animateElement = (element, callback) => {
        const animate = () => {
            const currentRight = parseFloat(element.style.right);
            if (currentRight >= window.innerWidth + 80) {
                container.removeChild(element);
                callback();
            } else {
                element.style.right = `${currentRight + speed}px`;
                requestAnimationFrame(animate);
            }
        };
        animate();
    };

    /**
     * Starts the animation of the combination elements in sequence.
     */
    const startAnimation = () => {
        let index = 0;

        const addCombination = () => {
            if (index < maxCombinations) {
                const lastElement = container.lastElementChild;
                if (!lastElement || parseFloat(lastElement.style.right) > 250) {
                    const combination = generateUniqueCombination();
                    const element = createCombinationElement(combination, index);
                    container.appendChild(element);

                    // Animate the element after it is added
                    animateElement(element, () => {
                        index--;
                        if (index === 0) {
                            // Restart the animation with a delay after all elements have been removed
                            setTimeout(startAnimation, delay);
                        }
                    });

                    index++;
                }
            }

            // Schedule the next combination to be added
            setTimeout(addCombination, delay);
        };

        addCombination();
    };

    startAnimation();

    setupInfiniteSlider()
});

let i = 0;
document.getElementById('tap').addEventListener('click', () => {
    const frames = [];
    const frameCount = 14;  // Nombre de frames dans votre animation
    const image = document.getElementById('chest')
    let currentFrame = 0;
    let animationInterval;
    
    // Charger les images
    for (let i = 0; i < frameCount; i++) {
        img = `assets/images/chest/frame_0${i}_delay-0.1s.gif`;  // Assurez-vous que les images sont nommées correctement
        frames.push(img);
    }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function drawFrame() {
        for (let j = 0; j < frameCount; j++) {
            image.src = frames[j]
            image.classList.add("active")
            await sleep(100)
        }
    }

    
    
   drawFrame().then(() => {
    chosen_hat = getRandomElement(chapeaux)
    document.querySelector('.overlay').classList.toggle('active')
    document.querySelector('.alert').classList.toggle('toggled')
    document.getElementById('chapeau-modif').src = 'assets/images/chapeaux/' + chosen_hat + '.png'
    document.getElementById('p-chapeau').innerHTML = 'You won the ' + chapeaux_dict[chosen_hat] + ' hat'
   })
})

document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.overlay').classList.toggle('active')
    document.querySelector('.alert').classList.toggle('toggled')
    chest.src = './assets/images/chest_idle.png'
    chest.classList.remove('active')
})
