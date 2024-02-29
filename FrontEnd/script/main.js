// Importing functions
import { WorkDataService } from "./callAPI.js";
import { TabEscRules } from "./forModals.js";
import { previewPicModal2 } from "./forModals.js";
import { removeEltsInModal2 } from "./forModals.js";
import { sendWork } from "./callAPI.js";
import { classAPIdelete } from "./callAPI.js";
import { preview } from "./forModals.js";


// Functions
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
    })};


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
    })};


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
    })};


    

// Displaying in modal1 the las Work added
function addLastWorkInModal1(){

    const newFigureGallery = document.createElement("figure");
    const newBttnDelete = document.createElement("button");
    newBttnDelete.className = "bttnDeleteWork";
    const newIconDelete = document.createElement("i");
    newIconDelete.className = "fa-solid fa-trash-can";
    newBttnDelete.appendChild(newIconDelete);
    newFigureGallery.appendChild(newBttnDelete);
    
    let newIdWork = lastWorkAdded.id;
    newBttnDelete.setAttribute('id', newIdWork);
    
    const imagePreview = document.createElement("img");
    imagePreview.src = lastWorkAdded.imageUrl;
    newFigureGallery.appendChild(imagePreview);
    galleryPhoto.appendChild(newFigureGallery);
    }









const openModal = function (e) {
    e.setAttribute('aria-hidden', false);
    e.setAttribute('aria-modal', true);
    e.style.display = "block";
    html.style.backgroundColor = "#0000004D";
    crossForClose1.focus();
};

const closeModal = function (e) {
    e.removeAttribute('aria-modal');
    e.setAttribute('aria-hidden', true);
    e.style.display = "none";
    html.style.backgroundColor = "#FFFEF8";
    fileInput.value = "";
    titleWork.value = "";
    // we make the button submitWork no functional
    submitWork.disabled = true;
};

// Here we open modal 2
function WhenClickOnBtnAddPhoto() {
    btnAddPhoto.addEventListener("click", () => {
        //stop the automatic scroll according axe Y when we open modal2
        const scrollPosition = window.scrollY;
        openModal(modal2);
        window.scrollTo(0, scrollPosition);
        // Managing the style of elements in modal2 according to the code displaying preview of "input type=file"
        iconPicture.style.display = "block";
        falseBtn.style.display = "block";
        formAddWork.style.paddingTop = "0px";
        labelBtnFile.style.display = "block";
        closeModal(modal1);
        html.style.backgroundColor = "#0000004D";
    })};



 async function WhenClickOnSubtmitWork() {
    submitWork.addEventListener("click", async function (e) {
        e.preventDefault();

        lastWorkAdded= await sendWork();
        // Code for displaying on home page the last work added
        const newImage= document.createElement("img");
        newImage.src= lastWorkAdded.imageUrl;
        const newFigcaption = document.createElement("figcaption");
        newFigcaption.textContent = lastWorkAdded.title;

        const newFigure= document.createElement("figure");
        newFigure.setAttribute('id', 'work-' + lastWorkAdded.id);
        newFigure.classList.add("work");
        newFigure.append(newImage);
        newFigure.append(newFigcaption);
       
        containerWorks.append(newFigure);

        closeModal(modal2);
        addLastWorkInModal1();
    })};






// When we click on the arrow in the modals for turn back
function whenClickOnArrow() {
    arrowReturn.addEventListener("click", () => {
        preview.remove();
        submitWork.disabled = true;
        fileInput.value = "";
        titleWork.value = "";
        closeModal(modal2);
        openModal(modal1);
    })};


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
                }}
            event.target.setAttribute("data-clicked", "true");
            event.target.style.backgroundColor = "rgb(29, 97, 84)";
            event.target.style.color = "white";
        })
    })};


// Let the deleting of button for change when we click on "logout" in the nav
function clickLogOut() {
    aLogout.addEventListener("click", () => {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("token");
    })};


// Function for close modal 1 et modal 2 when we click outside the modals
function ClickOutiseModal() {
    document.addEventListener("click", (event) => {
        if (!modal1.contains(event.target) && event.target !== modal1 && event.target != btnChangeWork && !modal2.contains(event.target)) { closeModal(modal1) };
        if (!modal2.contains(event.target) && event.target !== modal2 && event.target !== btnAddPhoto && event.target != btnChangeWork && !modal1.contains(event.target)) { closeModal(modal2) };
    })};

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
    classAPIdelete();
    clickLogOut();
    ClickOutiseModal();

    // variables for TabEscRules function
    const elementsInModal1 = Array.from(modal1.querySelectorAll("aside button"));
    const elementsInModal2 = Array.from(modal2.querySelectorAll("aside button, input[type=file], input[type=text], select, input[type=submit]"));

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
}


/*********** START OF THE SCRIPT ****************/

// Targeting buttons from home page
const buttonTOUS = document.querySelector(".bttnTous");
const buttonObjet = document.querySelector(".bttnObjets");
const buttonApparts = document.querySelector(".bttnApparts");
const buttonHR = document.querySelector(".bttnHR");

// Targeting elements in DOM for manage modals
const html = document.querySelector(".html");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const bttnChangeWorks = document.getElementById("btn-change-Work")
const crossForClose1 = document.querySelector(".closeModal")

// Display button "btnChangeWork" if "token" and "id" are saved ////////////////////////////////////////
const testUserId = window.localStorage.getItem("userId");
const testToken = window.localStorage.getItem("token");
const btnChangeWork = document.getElementById("btn-change-Work");

// Targeting element in DOM for displaying all works
const containerWorks = document.getElementById("worksContainer");

// Targeting element in DOM inside modal1
const btnAddPhoto = document.getElementById('btnAddPhoto');
const galleryPhoto = document.querySelector(".galleryPhoto");

// Targeting element in DOM inside modal2
const arrowReturn = document.getElementById("arrowForReturn");
const crossForclose2 = document.getElementById("crossForclose2");
const fileInput = document.getElementById("photoWork");
const labelBtnFile = document.querySelector(".labelBtnFile");
const formAddWork = document.querySelector(".form-addWork");
const submitWork = document.getElementById("submitWork");
const titleWork = document.getElementById("titleWork");

// Targeting element in DOM on home page, in the nav
const aLogin = document.getElementById("a-login");
const aLogout = document.getElementById("a-logout");
const aProjets = document.getElementById("nav-a-projets");

// Getting data from API
const workDataService = new WorkDataService();
let worksGlobalVariable = null;

let lastWorkAdded = null;


// launch of the all functions
init();











