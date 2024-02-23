const getToken = window.localStorage.getItem("token");
const fileInput = document.getElementById("photoWork");
const categoryWork = document.getElementById("category");
const myHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken}`
}


export class WorkDataService {
  apiUrl = 'http://localhost:5678/api/'


  // function for get all works 
  async getAll() {
    let data = null

    try {
      const response = await fetch(this.apiUrl + 'works');
      if (!response.ok) { throw new Error(`${response.status} ${response.statusText}`) }
      data = await response.json();
    }
    /*Error caught*/
    catch (e) { alert(e) }
    return data
  }


  // function for add a new work
  async addWork() {

    let data = new FormData()

    data.append('image', fileInput.files[0])
    data.append('title', titleWork.value)
    data.append('category', categoryWork.value)

    await fetch(this.apiUrl + 'works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken}`
      },
      body: data
    });
  
    location.reload();
  };


  // function for delete a work
  async deleteWork(ressource) {

    await fetch(this.apiUrl+"works/" + ressource, {
      method: "DELETE",
      headers: myHeaders,
    });
    location.reload();
  };

} // End of class WorkDataService




// exporting to main.js function for add Work
export function sendWork() {
  const addNewWork = new WorkDataService()
  addNewWork.addWork()
};


// exporting to main.js function for delete a Work
export function classAPIdelete() {
  const AllBtnDelete = document.querySelectorAll(".bttnDeleteWork");
  AllBtnDelete.forEach((element) =>
    element.addEventListener("click", () => {
      // nouvelle instanciation de la classe
      const delW= new WorkDataService();
      let cible= element.id;
      delW.deleteWork(cible);
    }))};












