
// Variables
let toReturn;
let titleS;
let imageS;



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
let figureS = document.querySelectorAll(".work");
const buttonTOUS = document.querySelector(".bttnTous")
const buttonObjet = document.querySelector(".bttnObjets")
const buttonApparts = document.querySelector(".bttnApparts")
const buttonHR = document.querySelector(".bttnHR")




    // Function for display all the works //////////////////////////////////////////////////////////////
    function displayAllWorks() {    

        // Code to reach pictures of all works
        imageS = toReturn.map(dataWorks => dataWorks.imageUrl)

        // Code to reach titles of all works
        titleS = toReturn.map(dataWorks => dataWorks.title)

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
    ///////////////////////////////////////////////////////////////////////////////////////////////////


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

});

