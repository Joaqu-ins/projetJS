const getToken = window.localStorage.getItem("token");
const fileInput = document.getElementById("photoWork");
const categoryWork = document.getElementById("category");
const myHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken}`
};


export class WorkDataService {
  apiUrl = 'http://localhost:5678/api/';

  // function for get all works 
  async getAll() {
    let data = null;

    try {
      const response = await fetch(this.apiUrl + 'works');
      if (!response.ok) { throw new Error(`${response.status} ${response.statusText}`) };
      data = await response.json();
    }
    /*Error caught*/
    catch (e) { alert(e) };
    return data;
  }

  // function for add a new work
  async addWork() {

    let data = new FormData();

    data.append('image', fileInput.files[0]);
    data.append('title', titleWork.value);
    data.append('category', categoryWork.value);

    await fetch(this.apiUrl + 'works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken}`
      },
      body: data
    })
  };

  // function for delete a work
  async deleteWork(ressource) {
    await fetch(this.apiUrl + "works/" + ressource, {
      method: "DELETE",
      headers: myHeaders,
    })
  };

} // End of class WorkDataService


// Exporting to main.js function for add Work
export async function sendWork() {

  const addNewWork = new WorkDataService();
  await addNewWork.addWork();
  // Getting last work for display after in modal1
  const allWorks = await addNewWork.getAll();
  const lastWorkAdded = allWorks[allWorks.length - 1];
  return lastWorkAdded;
};


// exporting (to main.js) function for delete a Work
export function classAPIdelete() {

let allBtnDelete = document.querySelectorAll(".bttnDeleteWork");

  allBtnDelete.forEach((bttnDelete) =>
  
  // bttnDelete.append(dernierBouton);
  
  bttnDelete.addEventListener("click", () => {
      let cible = bttnDelete.id;
       // new instanciation of the class
      const delW = new WorkDataService();
      delW.deleteWork(cible);
      // for delete work on home page
      let workToDelete = document.getElementById("work-" + cible)
      workToDelete.remove();
     // for delete work displayed in gallery
      let workIngallery= document.querySelector(".gallery-work-"+cible)
      workIngallery.remove();
    }));
} 













