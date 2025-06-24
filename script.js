const spaceID = "0qgpkdqukdj7";
const accessToken = "s_WbL4oqsFzGhnI0dm7nfMQI2chKa3j5O4zBw2C4hio";
const url = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=project`;

async function fetchProjects() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const projects = data.items;
    const assets = data.includes.Asset;
    console.log(projects[0].fields.projectName);

    const projectContainer = document.querySelector(
      ".experience-details-container .about-containers"
    );
    projectContainer.innerHTML = ""; // Clear existing projects

    projects.forEach((project) => {
      const projectData = project.fields;
      const imageID = projectData.projectThumbnail.sys.id;
      const image = assets.find((asset) => asset.sys.id === imageID);

      const projectHTML = `
                <div class="details-container color-container">
                    <div class="article-container">
                      <img src="${image.fields.file.url}" alt="${projectData.title}" class="project-img" />
                    </div>
                    <h2 class="experience-sub-title project-title">${projectData.projectName}</h2>
                    <p>${projectData.projectSummary}</p>
                    <div class="btn-container">
                      <button class="btn btn-color-2 project-btn" onclick="location.href='${projectData.githubUrl}'">
                            GitHub
                        </button>
                        <button class="btn btn-color-2 project-btn" onclick="viewProject('${project.sys.id}')">
              View Project
            </button>
                      
                    </div>
                </div>
            `;

      projectContainer.innerHTML += projectHTML;
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

// Navigate to the new page with project ID
function viewProject(projectId) {
  console.log("hi ${projectId}");
  window.location.href = `project.html?id=${projectId}`;
}

// Fetch projects when the page loads
document.addEventListener("DOMContentLoaded", fetchProjects);

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.querySelector(".section__text_p2");
  const cursorElement = document.createElement("span");
  cursorElement.classList.add("typewriter-cursor");
  textElement.appendChild(cursorElement);

  const words = ["Software Engineer", "Data Engineer", "AI/ML Engineer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textElement.innerHTML =
      currentWord.substring(0, charIndex) +
      `<span class="typewriter-cursor">|</span>`;

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), 1000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Move to next word
    }

    setTimeout(typeEffect, isDeleting ? 100 : 150); // Typing speed
  }

  typeEffect();
});

// VARIABLES
const elH = document.querySelectorAll(".timeline li > div");

// START
window.addEventListener("load", init);

function init() {
  setEqualHeights(elH);
}

// SET EQUAL HEIGHTS
function setEqualHeights(el) {
  let counter = 0;
  for (let i = 0; i < el.length; i++) {
    const singleHeight = el[i].offsetHeight;

    if (counter < singleHeight) {
      counter = singleHeight;
    }
  }

  for (let i = 0; i < el.length; i++) {
    el[i].style.height = `${counter}px`;
  }
}
