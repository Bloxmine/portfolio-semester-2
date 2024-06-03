        // GSAP animations
        gsap.from('.outcomesbutton', { duration: 0.5, y: -20, opacity: 0, stagger: 0.1 });

        window.onload = function() {
            const viewButton = document.querySelector('.viewbutton');
            const toggleDarkMode = document.querySelector('.toggledarkmode');
            
            // initially hide the toggleDarkMode button
            toggleDarkMode.style.display = 'none';
            
            if (window.self === window.top) {
                viewButton.classList.add('shrinkbutton');
                viewButton.classList.remove('viewbutton');
            
                // show the toggleDarkMode button when shrinkbutton is present
                toggleDarkMode.style.display = 'block';
            }
            
            viewButton.addEventListener('click', function(event) {
                if (window.self === window.top) {
                    event.preventDefault();
                    window.history.back();
                } else {
                    viewButton.setAttribute('href', 'projects.html');
                    viewButton.setAttribute('target', '_top');
                }
            });
            
            // come to the dark side, we have cookies
            // check for saved theme preference in the cookie
            let theme = document.cookie.split('; ').find(row => row.startsWith('theme='));
            if (theme) {
                theme = theme.split('=')[1];
                document.body.classList.add(theme);
            }
            
            toggleDarkMode.addEventListener('click', function() {
                document.body.classList.toggle('lightmode');
                document.body.classList.toggle('darkmode');
            
                // save theme preference in a cookie
                if (document.body.classList.contains('lightmode')) {
                    document.cookie = "theme=lightmode; path=/";
                } else {
                    document.cookie = "theme=darkmode; path=/";
                }
            });
            }

            document.addEventListener('DOMContentLoaded', function() {
                        // Collect images from HTML
        let images = Array.from(document.getElementsByClassName("hidden-image")).map(img => ({
            src: img.getAttribute("data-src"),
            caption: img.getAttribute("data-caption")
        }));
        let index = 0;

        document.getElementById("next").addEventListener("click", function() {
            index = (index + 1) % images.length;
            document.getElementById("display").src = images[index].src;
            document.getElementById("caption").innerText = images[index].caption;
        });

        document.getElementById("prev").addEventListener("click", function() {
            index = (index - 1 + images.length) % images.length;
            document.getElementById("display").src = images[index].src;
            document.getElementById("caption").innerText = images[index].caption;
        });
    });