
// Variables
let toReturn;
let titleS;
let figureS;


/** Function: recovery works of architect (auto-invoquée)**/
let recoveryWorks = (async function fetchWorks() {

    try {
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();

        /** Throw error if response is not ok**/
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`)
        }
        // if response ok
        else { toReturn = data }
        console.log(toReturn);
    }
    /*Error caught*/
    catch (error) { alert(error) }

    finally { return toReturn }
})();



recoveryWorks.then(() => { // When promise is resolved:


    // Targeting
    const buttonTOUS = document.querySelector(".bttnTous")
    const buttonObjet = document.querySelector(".bttnObjets")
    const buttonApparts = document.querySelector(".bttnApparts")
    const buttonHR = document.querySelector(".bttnHR")


    // Code made for create "figure element in DOM" accoording to the number of works in response/////
    let imageS = toReturn.map(dataWorks => dataWorks.imageUrl);
    const portfolio= document.querySelector(".gallery")

    for (let i=0; i<imageS.length; i++) {

        const createWork= document.createElement("figure");
        createWork.classList.add("work");
        portfolio.appendChild(createWork);
        }
    ///////////////////////////////////////////////////////////////////////////////////////////////////

       


// Function for display all the works ////////////////////////////////////////////////////////////////
    function displayAllWorks() {

        // Code to reach titles of all works
        titleS = toReturn.map(dataWorks => dataWorks.title)
        figureS = document.querySelectorAll(".work");
        // For each figure
        for (let i = 0; i < figureS.length; i++) {

            //create img, 
            let image = document.createElement("img");
            image.src = imageS[i];
            figureS[i].appendChild(image);
            //for titles
            let figcaption = document.createElement("figcaption");
            figcaption.textContent = titleS[i];
            figureS[i].appendChild(figcaption);
        }
    };
/////////////////////////////////////////////////////////////////////////////////////////////////////


  // Displaying all the works on home page
    displayAllWorks();
    

  
  
    // Function for buttons /////////////////////////////////////////////////////////////////////////////
    function filterCategory(button, category) {

        button.addEventListener("click", () => {

            // bloc pour filter les travaux par catégorie objets
            const filtreByName = toReturn.filter(function (work) {
                return work.category.name === category;
            })

            // we extract titles and images for array filtreByName
            let imgWorks = filtreByName.map(dataWork => dataWork.imageUrl)
            let titleWorks = filtreByName.map(dataWork => dataWork.title)

            // we delete the display of each work
            figureS.forEach(figure => {
                figure.innerHTML = "";
            });

            for (let i = 0; i < figureS.length; i++) {
                //creating img, joinning an url and adding in DOM
                let image = document.createElement("img");
                image.src = imgWorks[i];
                figureS[i].appendChild(image);

                let figcaption = document.createElement("figcaption");
                figcaption.textContent = titleWorks[i];
                figureS[i].appendChild(figcaption);

                if (i === filtreByName.length - 1) { break };
            };
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////


    // Maneging "Tous" button
    buttonTOUS.addEventListener("click", () => {
        // delete all the works allready displayed
        figureS.forEach(figure => {
            figure.innerHTML = "";
        });
        // Function for display all the works
        displayAllWorks();
    });

    //Menaging "Objects" button
    filterCategory(buttonObjet, "Objets");

    // Menaging "Appartements" button
    filterCategory(buttonApparts, "Appartements");

    // Menaging "Appartements and restaurants" button
    filterCategory(buttonHR, "Hotels & restaurants");



    //Loop for display works in modal1 //////////////////////////////////////////////////////////////////////////////
    const galleryPhoto = document.querySelector(".galleryPhoto");

    for (let i = 0; i < toReturn.length; i++) {

        //adding button containing icon delete
        const figureGallery = document.createElement("figure");
        const bttnDelete = document.createElement("button");
        bttnDelete.className = "bttnDeleteWork";
        const iconDelete = document.createElement("i");
        iconDelete.className = "fa-solid fa-trash-can";
        bttnDelete.appendChild(iconDelete);
        figureGallery.appendChild(bttnDelete);

        //allocation id of work to the button
        let idWork = toReturn[i].id;
        bttnDelete.setAttribute('id', idWork);

        // displaying Work's image 
        const image = document.createElement("img");
        image.src = toReturn[i].imageUrl;
        figureGallery.appendChild(image);
        galleryPhoto.appendChild(figureGallery);

    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const getToken = window.localStorage.getItem("token");
    const AllBtnDelete = document.querySelectorAll(".bttnDeleteWork");
    const myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken}`
    };

    AllBtnDelete.forEach((element) =>

        element.addEventListener("click", (e) => {
            fetch(`http://localhost:5678/api/works/${element.id}`, {
                method: "DELETE",
                headers: myHeaders,
            });
        }));

     









    // Display button "btnChangeWork" if "token" and "id" are saved ////////////////////////////////////////////////
    const testUserId = window.localStorage.getItem("userId");
    const testToken = window.localStorage.getItem("token");
    const btnChangeWork = document.getElementById("btn-change-Work");

    if (testToken && testUserId !== null) { btnChangeWork.style.display = "block" }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const html = document.querySelector(".html");
    const modal1 = document.getElementById("modal1");
    const modal2 = document.getElementById("modal2");
    const bttnChangeWorks = document.getElementById("btn-change-Work")
    const crossForClose = document.querySelector(".closeModal")
    const crossModal2 = document.getElementById("crossForclose2");



    // function for close one modal to specify
    const openModal = function (e) {

        e.removeAttribute('aria-hidden');
        e.setAttribute('aria-modal', true);
        e.style.display = "block";
        html.style.backgroundColor = "#0000004D";
        crossForClose.focus();
    };

    // function for closes all modals    
    const closeModal = function (e) {

        e.removeAttribute('aria-modal');
        e.setAttribute('aria-hidden', true);
        e.style.display = "none";
        html.style.backgroundColor = "#FFFEF8";
    };

    // Menaging modal1 (displaying all works for delete) ////////////////////////////////////
    // Oppening
    bttnChangeWorks.addEventListener("click", () => openModal(modal1));
    // Closing
    crossForClose.addEventListener("click", () => closeModal(modal1));
    //////////////////////////////////////////////////////////////////////////////////////////




    // Menaging modal2 (addPhoto) ///////////////////////////////////////////////////////////
    const btnAddPhoto = document.getElementById('btnAddPhoto');
    const crossForclose2 = document.getElementById("crossForclose2");

    btnAddPhoto.addEventListener("click", () => {
        openModal(modal2);
        crossModal2.focus();
        closeModal(modal1);
        html.style.backgroundColor = "#0000004D";
    });

    crossForclose2.addEventListener("click", () => {
        closeModal(modal2);
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    // Tabulations rules and Escape Rules for Modals /////////////////////////////////////////////////////////////////////

    //for modal1
    let focusablesElementsM1 = [];
    const elementsInModal1 = Array.from(modal1.querySelectorAll("aside button"));

    //for modal2
    let focusablesElementsM2 = [];
    const inputHidden = document.getElementById("photoWork");
    const falseBtn = document.getElementById("falseBtn");
    const elementsInModal2 = Array.from(modal2.querySelectorAll("aside button, input[type=file], input[type=text], select, input[type=submit]"));

    // function for all modals
    function TabEscRules(modalX, elemInModalX, focusablesElementsX) {

        modalX.addEventListener("keydown", function (e) {

            if (e.key === "Tab") {
                e.preventDefault();

                //Building an array including all buttons in the modal
                focusablesElementsX = []
                focusablesElementsX.push(...elemInModalX);
                //searching the index of the button focused
                let index = focusablesElementsX.indexOf(modalX.querySelector(':focus'));

                if (e.shiftKey === true) { index--; }
                else { index++; }

                if (index < 0) { index = focusablesElementsX.length - 1; }
                if (index >= focusablesElementsX.length) { index = 0; }

                //we put the focus on the indexed button
                focusablesElementsX[index].focus();
            }

            //closing part
            if (e.key === "Escape" || e.key === "Esc") {
                closeModal(modalX);
            }

            if (document.activeElement === inputHidden) { falseBtn.style.outline = "2px solid blue" }
            else { falseBtn.style.outline = "none" }

        });
    }

    // Calling function for modal1
    TabEscRules(modal1, elementsInModal1, focusablesElementsM1);
    // Calling function for modal2
    TabEscRules(modal2, elementsInModal2, focusablesElementsM2);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












});




