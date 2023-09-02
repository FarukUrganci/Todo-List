// Elementleri Seçme
const form = document.querySelector('#todo-form');
const todoInput = document.querySelector("#todo");

const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tüm event listenerler
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadALLTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){
    if (confirm("Tümünü Silmek İstediğinize Emin Misiniz..")) {
        //*Arayüzden Todoları Temizleme
        // todoList.innerHTML = ""; // YAVAŞ Yöntem
        
        while(todoList.firstElementChild != null){ // ÇOK DAHA Hızlı Yöntem
            todoList.removeChild(todoList.firstElementChild);
        };
        localStorage.removeItem("todos"); // Key i sildik hepsi gitti

        //Todo: Silme
        // todoList.removeChild(todoList.firstElementChild);
        // todoList.removeChild(todoList.firstElementChild);
        // todoList.removeChild(todoList.firstElementChild);
        // console.log(todoList.firstElementChild);
    }





}
function deleteTodoFromStorage(deletetodo){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo) {
            todos.splice(index,1); //Arraydan değeri silebilirz.
        };
    });

    localStorage.setItem("todos",JSON.stringify(todos)); // setItem("key","value") veri ekleme

};

function filterTodos(e){ // sadece kullandığımız zaman e yi alalım

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();       
        if (text.indexOf(filterValue) === -1){ //  indexof kullanım
            // Bulamadı

            listItem.setAttribute("style","display : none !important");// CSS özelliği ekleme
        }
        else{
            listItem.setAttribute("style","display : block !important");
            listItem.setAttribute("style","background-color : #ccc !important");
        }

    });
};

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        // console.log(`Silme İşlemi`);
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("danger"," Todo Başarıyla Silindi ");

    }

};

function loadALLTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){

        addTodoToUI(todo);

    });
    
}

function addTodo(e){

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger","Lütfen Bir Todo Giriniz..");

    }

    else{
        addTodoToUI(newTodo);// UI = kullanıcı arayüzü
        addTodoToStorage(newTodo);

        showAlert("success","Todo başarıyla eklendi..");

    }
    // console.log(newTodo);



    e.preventDefault();
}
function getTodosFromStorage(){

    let todos;

    if (localStorage.getItem("todos") === null) { //getItem("key") value return eder
        todos = [];
    }
    
    else{
        todos = JSON.parse(localStorage.getItem("todos"));// value değerine erişmek için
    }

    return todos;
}
function addTodoToStorage(newTodo){

   let todos = getTodosFromStorage();

   todos.push(newTodo);

   localStorage.setItem("todos",JSON.stringify(todos));
    //sessionStorage.key(i); parametre olarak sayı alır
    //sessionStorage.key(0);   output: "name"


}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){

    alert.remove();
    },1500);


}

function addTodoToUI(newTodo){ // String değerini list item olarak UI'ya ekleyecek

    // List Item Oluşturma
    const listItem = document.createElement("li");

    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"; // Silersen Eğer X(kapat) gider

    listItem.className = "list-group-item d-flex justify-content-between";

    // Text Node Ekleme
     
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo List'e List Item'ı ekleme -- ul'un altına li ekledik , yukarıda li-a(link)

    todoList.appendChild(listItem);

    todoInput.value = "";

    // console.log(todoList);
    // console.log(listItem);
}



