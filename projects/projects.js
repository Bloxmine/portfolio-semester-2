// Description: JavaScript file for the projects page.
// Author: Hein Dijstelbloem
// Last updated: 2024-06-02

// JSON loader when pressing a certain button
const buttons = document.querySelectorAll('.outcomesbutton');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // using the class name to get the json file
        const className = this.className.split(' ')[1];
        const jsonFile = 'projects/group/' + className + '.json';

        // changing the URL
        const identifier = this.className.split(' ')[1];
        const url = new URL(window.location.href);
        url.searchParams.delete('id');
        url.searchParams.append('id', identifier);
        window.history.pushState({path: url.toString()}, '', url.toString());

        // fetch the JSON file
        fetch(jsonFile)
            .then(response => {
                // error checking
                if (!response.ok) {
                    throw new Error(`FLAGRANT SYSTEM ERROR!! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const infoboardH1 = document.querySelector('.infoboard h1');
                const infoboardP = document.querySelector('.infoboard p');
                const contentDiv = document.querySelector('.content');
                while (contentDiv.firstChild) {
                    contentDiv.firstChild.remove();
                }

                infoboardH1.textContent = data.title;
                infoboardP.textContent = data.description;

                const h1 = document.createElement('h1');
                h1.textContent = data.title;
                contentDiv.appendChild(h1);

                const p = document.createElement('p');
                p.textContent = data.description;
                contentDiv.appendChild(p);

                const pageContent = document.createElement('p');
                pageContent.textContent = data.pagecontent;
                contentDiv.appendChild(pageContent);

                const imagefileDiv = document.querySelector('.imagefile');
                while (imagefileDiv.firstChild) {
                    imagefileDiv.firstChild.remove();
                }
                const img = document.createElement('img');
                img.src = data.imagefile;
                imagefileDiv.appendChild(img);

                // create new elements for each project
                data.projects.forEach((project, index) => {
                    const projectDiv = document.createElement('div');
                    projectDiv.className = 'project';

                    const projectTitle = document.createElement('h2');
                    projectTitle.textContent = project.title;
                    projectDiv.appendChild(projectTitle);

                    const projectLink = document.createElement('a');
                    projectLink.href = project.imagelink;

                    const projectImg = document.createElement('img');
                    projectImg.src = `images/${className}/${project.imagefile}`;
                    projectLink.appendChild(projectImg);

                    projectDiv.appendChild(projectLink);

                    const projectDescription = document.createElement('h4');
                    projectDescription.textContent = project.description;
                    projectDiv.appendChild(projectDescription);

                    // split the content into paragraphs
                    const paragraphs = project.projectcontent.split('\n\n');
                    paragraphs.forEach(paragraph => {
                        const projectContent = document.createElement('p');
                        projectContent.innerHTML = marked(paragraph);
                        projectDiv.appendChild(projectContent);
                    });
                    contentDiv.appendChild(projectDiv);
                });
                // change the border color
                contentDiv.style.borderColor = data.bordercolor;

                // GSAP animations
                gsap.from('.project', { duration: 0.2, y: -50, opacity: 0, stagger: 0.2 });
                gsap.from('.project img', { duration: 0.2, y: -50, opacity: 0, stagger: 0.2 });
                gsap.from('.project h4', { duration: 0.2, y: -50, opacity: 0, stagger: 0.2 });
                gsap.from('.project p', { duration: 0.2, y: -50, opacity: 0, stagger: 0.2 });
                gsap.from(h1, { duration: 0.5, y: -50, opacity: 0 });
                gsap.from(p, { duration: 0.5, y: -50, opacity: 0, stagger: 0.2 });
                gsap.from('.outcomesbutton', { duration: 0.5, y: -20, opacity: 0, stagger: 0.1 });
                gsap.from(img, { duration: 0.5, y: -50, opacity: 0 });

            })
    });
});

// Load JSON based on URL parameter
const urlParams = new URLSearchParams(window.location.search);
const identifier = urlParams.get('id');
if (identifier) {
    const button = document.querySelector(`.outcomesbutton.${identifier}`);
    if (button) {
        button.click();
    }
}
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

// when the user clicks on the changefont button, the variable --font-primary will be changed to Arial
document.addEventListener('DOMContentLoaded', function() {
    let changeFont = document.getElementById('changeFont'); // Assuming the button has an ID 'changeFont'
    if (changeFont) {
        changeFont.addEventListener('click', function() {
            document.documentElement.style.setProperty('--font-primary', 'Arial');
        });
    } else {
        console.error('changeFont button not found');
    }
});