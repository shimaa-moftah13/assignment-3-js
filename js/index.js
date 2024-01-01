

var bookName = document.getElementById("bookName");
var bookUrl = document.getElementById("bookUrl");

var searchInput = document.getElementById("searchInput");

var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var indexUpdate = 0;



var bookList= [];

if( localStorage.getItem("books") != null){
    bookList =  JSON.parse( localStorage.getItem("books")),
displayData()
}


function addBook(){
    

    var book ={
    name: bookName.value,
    url: bookUrl.value,
    }
   

    var isValidName = validateName(book.name);

    if (!isValidName) {
        document.getElementById("warningName").innerHTML = `<p> Site name must be more than three letters!</p>`;
        document.getElementById("bookName").classList.remove("is-valid");
        document.getElementById("bookName").classList.add("is-invalid");
        return;
    } else {
        document.getElementById("warningpass").innerHTML = "";
        document.getElementById("bookName").classList.remove("is-invalid");
        document.getElementById("bookName").classList.add("is-valid");
    }

       var isValidUrl = validateUrl(book.url);

    if (!isValidUrl) {
        document.getElementById("warningpass").innerHTML = `<p> invalid URL!</p>`;
        document.getElementById("bookUrl").classList.remove("is-valid");
        document.getElementById("bookUrl").classList.add("is-invalid");
        return;
    } else {
        document.getElementById("warningpass").innerHTML = "";
        document.getElementById("bookUrl").classList.remove("is-invalid");
        document.getElementById("bookUrl").classList.add("is-valid");
    }

    bookList.push(book);
    localStorage.setItem("books" ,  JSON.stringify(bookList))


    clearbook();
    displayData();



    console.log(bookList);
 
}


function clearbook(){
    bookName.value = "";
    bookUrl.value =""
}


function displayData(){
    var form ="";

    for( i=0; i<bookList.length; i++){
        form += ` <tr>
        <td> ${i} </td>
        <td> ${bookList[i].name} </td>
        <td>
    
        <a onclick="visitSite(${ bookList[i].url })" class="btn btn-success" href="${ bookList[i].url }"> <i class="fa-solid fa-eye me-2"></i>Visit</a>
        </td>
        
        <td>
              <button class="btn btn-warning btn-sm" onclick="setData(${i})" >update</button>
              <button onclick="deletebook(${i})" class="btn btn-danger btn-sm">delete</button>
            </td>
      </tr>`
    }

    document.getElementById ("tableBody").innerHTML=form;
}

function visitWebsite(url) {
    window.open(url, '_blank') ;
}



function deletebook(index){
    bookList.splice( index , 1 );

    localStorage.setItem("books" ,  JSON.stringify(bookList))

    console.log (bookList);
    displayData()
}



function search(){
  var term = searchInput.value;
  console.log ("hello")
  var form ="";

  for(var i=0; i<bookList.length; i++){
      if(bookList[i].name.toLowerCase().includes(term.toLowerCase() ) )
      {    form += ` <tr>
      <td> ${i} </td>
      <td> ${bookList[i].name} </td>
      <td>
      <a onclick="visitSite(${ bookList[i].url })" class="btn btn-success" href="${ bookList[i].url }"> <i class="fa-solid fa-eye me-2"></i>Visit</a>
      </td>
     
      <td>
            <button class="btn btn-warning btn-sm" onclick="setData(${i})">update</button>
            <button onclick="deleteItem(${i})" class="btn btn-danger btn-sm">delete</button>
          </td>
    </tr>`
  }
  
  }
  document.getElementById ("tableBody").innerHTML=form;
}


function setData(index){

  indexUpdate = index;

  var curentbook = bookList[index]

  bookName.value = curentbook.name;
  bookUrl.value = curentbook.url;

  updateBtn.classList.remove("d-none")
  addBtn.classList.add("d-none")
}

function update(){
  var book ={
      name: bookName.value,
      url: bookUrl.value,
      }

      var isValidName = validateName(book.name);

    if (!isValidName) {
        document.getElementById("warningName").innerHTML = `<p> Site name must be more than three letters!</p>`;
        document.getElementById("bookName").classList.remove("is-valid");
        document.getElementById("bookName").classList.add("is-invalid");
        return;
    } else {
        document.getElementById("warningpass").innerHTML = "";
        document.getElementById("bookName").classList.remove("is-invalid");
        document.getElementById("bookName").classList.add("is-valid");
    }

       var isValidUrl = validateUrl(book.url);

    if (!isValidUrl) {
        document.getElementById("warningpass").innerHTML = `<p> invalid URL!</p>`;
        document.getElementById("bookUrl").classList.remove("is-valid");
        document.getElementById("bookUrl").classList.add("is-invalid");
        return;
    } else {
        document.getElementById("warningpass").innerHTML = "";
        document.getElementById("bookUrl").classList.remove("is-invalid");
        document.getElementById("bookUrl").classList.add("is-valid");
    }

      bookList.splice( indexUpdate, 1 , book )

      localStorage.setItem("books" ,  JSON.stringify(bookList))

     displayData()

     updateBtn.classList.add("d-none")
     addBtn.classList.remove("d-none")
     
}


function validateName(bookName) {
    var regex = /(?:[a-z][- ]?){3}/;

    if (regex.test(bookName)) {
        return true;
    } else {
        return false;
    }
}
function validateUrl(bookUrl) {
    var regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

    if (regex.test(bookUrl)) {
        return true;
    } else {
        return false;
    }
}
