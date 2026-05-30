// Typing Effect
const textElement = document.getElementById('typing-text');

const phrases = [
    "IT Student",
    "Front-End Developer",
    "Python Enthusiast"
];

let idx = 0;
let charIdx = 0;

function type(){

    if(charIdx < phrases[idx].length){

        textElement.textContent += phrases[idx].charAt(charIdx);

        charIdx++;

        setTimeout(type,100);

    }

    else{
        setTimeout(erase,2000);
    }

}

function erase(){

    if(charIdx > 0){

        textElement.textContent =
        phrases[idx].substring(0,charIdx - 1);

        charIdx--;

        setTimeout(erase,50);

    }

    else{

        idx = (idx + 1) % phrases.length;

        textElement.textContent = "";

        setTimeout(type,500);

    }

}

/* Intersection Observer */
const revealOptions = {
    threshold:0.15,
    rootMargin:"0px 0px -50px 0px"
};

const revealOnScroll =
new IntersectionObserver((entries, observer)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add('active');

            observer.unobserve(entry.target);

        }

    });

}, revealOptions);

document
.querySelectorAll('.reveal')
.forEach(el => revealOnScroll.observe(el));

/* Theme Persistence */


/* Initialize */
document.addEventListener('DOMContentLoaded', ()=>{

    type();

    setTimeout(()=>{

        document.getElementById('loader').style.display = 'none';

    },1500);

});
