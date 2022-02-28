

window.addEventListener('DOMContentLoaded', (event) => {
   particlesJS("particles-glow-js", {
   "particles": {
      "number": {
         "value": 30,
         "density": {
            "enable": true,
            "value_area": 800
         }
      },
      "color": {
         "value": "#ffffff"
      },
      "shape": {
         "type": "circle",
         "stroke": {
            "width": 0,
            "color": "#f70909"
         },
         "polygon": {
            "nb_sides": 3
         },
         "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
         }
      },
      "opacity": {
         "value": 0.5,
         "random": false,
         "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
         }
      },
      "size": {
         "value": 3,
         "random": true,
         "anim": {
            "enable": true,
            "speed": 10,
            "size_min": 0.1,
            "sync": false
         }
      },
      "line_linked": {
         "enable": true,
         "distance": 0,
         "color": "#ffffff",
         "opacity": 0.4,
         "width": 1
      },
      "move": {
         "enable": true,
         "speed": 1,
         "direction": "top",
         "random": true,
         "straight": false,
         "out_mode": "out",
         "bounce": false,
         "attract": {
            "enable": false,
            "rotateX": 1362.9002517356944,
            "rotateY": 2966.312312601217
         }
      }
   },
   "interactivity": {
      "detect_on": "window",
      "events": {
         "onhover": {
            "enable": true,
            "mode": "grab"
         },
         "onclick": {
            "enable": true,
            "mode": "repulse"
         },
         "resize": true
      },
      "modes": {
         "grab": {
            "distance": 267.9854800594439,
            "line_linked": {
               "opacity": 0.2221088827100576
            }
         },
         "bubble": {
            "distance": 523.7898019343676,
            "size": 81.20772123013451,
            "duration": 3.0046856855149766,
            "opacity": 0.2679854800594439,
            "speed": 3
         },
         "repulse": {
            "distance": 471.00478313478015,
            "duration": 0.4
         },
         "push": {
            "particles_nb": 4
         },
         "remove": {
            "particles_nb": 2
         }
      }
   },
   "retina_detect": true
});
});