// Importing functions
import { WorkDataService } from "./callAPI.js";
import { TabEscRules } from "./forModals.js";
import { previewPicModal2 } from "./forModals.js";
import { removeEltsInModal2 } from "./forModals.js";
import { sendWork } from "./callAPI.js";
import { classAPIdelete } from "./callAPI.js";
import { closeModal } from "./forModals.js";
import { openModal } from "./forModals.js";
import { WhenClickOnBtnAddPhoto } from "./forModals.js";
import { whenClickOnArrow } from "./forModals.js";
import { ClickOutiseModal } from "./forModals.js";


/******************************************* Functions for main code ************************************************/
function displayAllWorks() {
    worksGlobalVariable.forEach((work) => {
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;

        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.textContent = work.title;

        const createWorkElement = document.createElement("figure");
        createWorkElement.setAttribute('id', 'work-' + work.id);
        createWorkElement.classList.add("work");
        createWorkElement.append(imageElement);
        createWorkElement.append(figcaptionElement);
        containerWorks.append(createWorkElement);
    })
}


function filterByCategory(button, category) {
    button.addEventListener("click", () => {
        // bloc pour filter les travaux par catégorie objets
        const worksFiltered = worksGlobalVariable.filter(function (work) {
            return work.category.name === category;
        });
        const works = Array.from(containerWorks.getElementsByClassName('work'));
        works.forEach(work => {
            work.classList.add('hidden');
        });
        worksFiltered.forEach(workFiltered => {
            const workElement = document.getElementById('work-' + workFiltered.id);
            workElement.classList.remove('hidden');
        });
    });
}


function buttonsHomePage() {
    buttonTOUS.addEventListener("click", () => {
        const works = Array.from(containerWorks.getElementsByClassName('work'));
        works.forEach(work => {
            work.classList.remove('hidden');
        });
    });
    filterByCategory(buttonObjet, "Objets");
    filterByCategory(buttonApparts, "Appartements");
    filterByCategory(buttonHR, "Hotels & restaurants");
}


function displayWorksModal1() {
    worksGlobalVariable.forEach(work => {
        const figureGallery = document.createElement("figure");
        figureGallery.classList.add("gallery-work-" + work.id)
        const bttnDelete = document.createElement("button");
        bttnDelete.className = "bttnDeleteWork";
        const iconDelete = document.createElement("i");
        iconDelete.className = "fa-solid fa-trash-can";
        bttnDelete.appendChild(iconDelete);
        figureGallery.appendChild(bttnDelete);

        let idWork = work.id;
        bttnDelete.setAttribute('id', idWork);

        const image = document.createElement("img");
        image.src = work.imageUrl;
        figureGallery.appendChild(image);
        galleryPhoto.appendChild(figureGallery);
    })
}


// Displaying in modal1 the last Work added
function addLastWorkInModal1() {

    const newFigureGallery = document.createElement("figure");
    const newBttnDelete = document.createElement("button");
    newBttnDelete.className = "bttnDeleteWork";
    const newIconDelete = document.createElement("i");
    newIconDelete.className = "fa-solid fa-trash-can";
    newBttnDelete.appendChild(newIconDelete);
    newFigureGallery.appendChild(newBttnDelete);

    let newIdWork = lastWorkAdded.id;
    newBttnDelete.setAttribute('id', newIdWork);
    newFigureGallery.classList.add(`gallery-work-${+ lastWorkAdded.id}`);

    const imagePreview = document.createElement("img");
    imagePreview.src = lastWorkAdded.imageUrl;
    newFigureGallery.appendChild(imagePreview);
    galleryPhoto.appendChild(newFigureGallery);
}

// For display on home page the last work added and close modal2
async function WhenClickOnSubtmitWork() {
    submitWork.addEventListener("click", async function (e) {
        e.preventDefault();
        lastWorkAdded = await sendWork();
        // Displaying last work
        const newImage = document.createElement("img");
        newImage.src = lastWorkAdded.imageUrl;
        const newFigcaption = document.createElement("figcaption");
        newFigcaption.textContent = lastWorkAdded.title;

        const newFigure = document.createElement("figure");
        newFigure.setAttribute('id', 'work-' + lastWorkAdded.id);
        newFigure.classList.add("work");
        newFigure.append(newImage);
        newFigure.append(newFigcaption);

        containerWorks.append(newFigure);
        worksGlobalVariable = await workDataService.getAll();
        addLastWorkInModal1();
        // closing modal2
        closeModal(modal2);

    })
}


// Managing the appearance of the button Filter on home page when we click on it
function styleOfButtonsFilter() {
    let allButtons = [];
    allButtons.push(buttonTOUS, buttonApparts, buttonObjet, buttonHR);

    buttonTOUS.style.backgroundColor = "rgb(29, 97, 84)";
    buttonTOUS.style.color = "white";

    allButtons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            for (let i = 0; i < allButtons.length; i++) {
                let btnAttribute = allButtons[i].getAttribute("data-clicked");

                if (btnAttribute === "true") {
                    allButtons[i].setAttribute("data-clicked", "false");
                    allButtons[i].style.backgroundColor = "white";
                    allButtons[i].style.color = "rgb(29, 97, 84)";
                }
            }
            event.target.setAttribute("data-clicked", "true");
            event.target.style.backgroundColor = "rgb(29, 97, 84)";
            event.target.style.color = "white";
        })
    })
}


// Let the deleting of button for change when we click on "logout" in the nav
function clickLogOut() {
    aLogout.addEventListener("click", () => {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("token");
    })
}


/******************************************* End of functions ************************************************/

// initialization of main code
async function init() {

    worksGlobalVariable = await workDataService.getAll();

    displayAllWorks();
    buttonsHomePage();
    styleOfButtonsFilter();
    displayWorksModal1();
    previewPicModal2();
    removeEltsInModal2();
    WhenClickOnBtnAddPhoto();
    WhenClickOnSubtmitWork();
    whenClickOnArrow();
    clickLogOut();
    ClickOutiseModal();

    // Calling function for Modal1 rules
    TabEscRules(modal1, elementsInModal1, 0, 1);
    // Calling function for modal2 rules
    TabEscRules(modal2, elementsInModal2, 1, 2);

    // Calling function for open and close modal1
    bttnChangeWorks.addEventListener("click", () => openModal(modal1));
    crossForClose1.addEventListener("click", () => closeModal(modal1));

    // Closing modal 2
    crossForclose2.addEventListener("click", () => {
        closeModal(modal2);
    })

    // displaying button "edit work" on home page if user signed in
    if (testToken && testUserId !== null) {
        btnChangeWork.style.display = "block";
        aLogin.style.display = "none";
        aLogout.style.display = "block";
    }

    // putting in bold the link "projets" in the nav
    aProjets.style.fontWeight = "bold";

    // let the update of variable allBtnDelete for the operation of classAPIdelete
    bttnChangeWorks.addEventListener("click", ()=> {
    classAPIdelete();
    })




}


/*********** START OF THE SCRIPT ****************/

// Targeting buttons from home page
const buttonTOUS = document.querySelector(".bttnTous");
const buttonObjet = document.querySelector(".bttnObjets");
const buttonApparts = document.querySelector(".bttnApparts");
const buttonHR = document.querySelector(".bttnHR");
// Targeting elements in DOM for manage modals
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const bttnChangeWorks = document.getElementById("btn-change-Work")
const crossForClose1 = document.querySelector(".closeModal")
// Display button "btnChangeWork" if "token" and "id" are saved 
const testUserId = window.localStorage.getItem("userId");
const testToken = window.localStorage.getItem("token");
const btnChangeWork = document.getElementById("btn-change-Work");
// Targeting element in DOM for displaying all works
const containerWorks = document.getElementById("worksContainer");
// Targeting element in DOM inside modal1
const galleryPhoto = document.querySelector(".galleryPhoto");
// Targeting element in DOM inside modal2
const crossForclose2 = document.getElementById("crossForclose2");
const submitWork = document.getElementById("submitWork");
// Targeting element in DOM on home page, in the nav
const aLogin = document.getElementById("a-login");
const aLogout = document.getElementById("a-logout");
const aProjets = document.getElementById("nav-a-projets");
// variables for TabEscRules function
const elementsInModal1 = Array.from(modal1.querySelectorAll("aside button"));
const elementsInModal2 = Array.from(modal2.querySelectorAll("aside button, input[type=file], input[type=text], select, input[type=submit]"));

// Getting data from API
const workDataService = new WorkDataService();
let worksGlobalVariable = null;
let lastWorkAdded = null;

// launch of the all functions
init();











