const inputHidden = document.getElementById("photoWork");
const falseBtn = document.getElementById("falseBtn");
const containerAddPhoto = document.querySelector(".container-add-photo");
const iconPicture = document.getElementById("iconPicture");
const formAddWork = document.querySelector(".form-addWork");
const labelBtnFile = document.querySelector(".labelBtnFile");
const fileInput = document.getElementById("photoWork");
const titleWork = document.getElementById("titleWork");
const btnAddPhoto = document.getElementById('btnAddPhoto');
const crossForclose2 = document.getElementById("crossForclose2");
export const preview = document.createElement("img");
export const submitWork = document.getElementById("submitWork");


// function for displaying message 
function snackbar(x) {
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


// function for all modals
export function TabEscRules(modalX, elemInModalX, n, x) {

    modalX.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            e.preventDefault();

            let index = elemInModalX.indexOf(modalX.querySelector(':focus'));
            if (e.shiftKey === true) { index--; }
            else { index++; }
            // Considering if one of the buttons in modal2 is not activated
            if (submitWork.disabled === true) {

                if (index < 0) { index = elemInModalX.length - x; };
                if (index >= elemInModalX.length - n) { index = 0 };
            }
            else {
                if (index < 0) { index = elemInModalX.length - 1 };
                if (index >= elemInModalX.length) { index = 0; };
            }
            elemInModalX[index].focus();
        }
        //closing part
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(modalX);
        }
        if (document.activeElement === inputHidden) { falseBtn.style.outline = "2px solid blue" }
        else { falseBtn.style.outline = "none" }
    })};


// Displaying preview of picture selected in "input type=file" for modal2 
export function previewPicModal2() {

    function handleFileChange() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                // convert picture in base64 character string 
                preview.src = reader.result;
                containerAddPhoto.appendChild(preview);
            });
            // we get extension of the file loaded
            let fileName = fileInput.value;
            let extension = fileName.split('.').pop();
            let size = (fileInput.files[0].size) / 1024;

            // If the extension of the is not correct
            if (extension != "png" && extension != "jpg" || size > 4000) {
                const snackFormat = document.getElementById("snack-format")
                snackbar(snackFormat);
                fileInput.value = "";
                // we stop the rest of the function
                return;
            }
            // we demand to read string character as an URL
            reader.readAsDataURL(file);
            // managing the style of elements in modal2
            preview.style.width = "30%";
            preview.style.height = "inherit";
            iconPicture.style.display = "none";
            falseBtn.style.display = "none";
            formAddWork.style.paddingTop = "92px";
            labelBtnFile.style.display = "none";
        }};
    fileInput.addEventListener("change", handleFileChange);
};


// function for remove disabled mode on button submit work in modal2
export function removeEltsInModal2() {

    function checkFormFilled() {
        if (fileInput.files.length > 0 && titleWork.value !== "") {
            submitWork.disabled = false;
        } else {
            submitWork.disabled = true;
        }};
    formAddWork.addEventListener("change", checkFormFilled);
    titleWork.addEventListener("input", checkFormFilled);
    window.addEventListener('beforeunload', function () {
        submitWork.disabled = true;
    })
    // Deleting picture in preview inside modal2 when we close it
    function deletePreview() {
        preview.remove();
    }
    crossForclose2.addEventListener("click", deletePreview);
    submitWork.addEventListener("click", deletePreview);
};


export function WhenClickOnBtnAddPhoto() {

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
    });
    crossForclose2.addEventListener("click", () => {
        closeModal(modal2);
    })};






