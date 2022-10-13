"use strict"
let todoList = []; 

//initialize to do list from choosen JSON bin
let initList = function() {
    $.ajax({
        url: 'https://api.jsonbin.io/v3/b/63480b432b3499323bdd3b06',
        type: 'GET',
        headers: { 
          'X-Master-Key': '$2b$10$0t5LHPGAMAjkhpD1iqTWauGoxYtp.Rlbe/UzLJqi5R6CvKlfY3e5e'
        },
        success: (data) => {
         todoList = data.record;
         updateTodoList();
         console.log(data.record);
        },
        error: (err) => {
          console.log(err.responseJSON);
        }
       });
}

initList();

let updateJSONbin = function() {
    $.ajax({
    url: 'https://api.jsonbin.io/v3/b/63480b432b3499323bdd3b06',
    type: 'PUT',
    headers: { 
        'X-Master-Key': '$2b$10$0t5LHPGAMAjkhpD1iqTWauGoxYtp.Rlbe/UzLJqi5R6CvKlfY3e5e'
    },
    contentType: 'application/json',
    data: JSON.stringify(todoList),
    success: (data) => {
        console.log(data);
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
    });
}

let updateTodoList = function() {
    let todoListDiv =
    document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    //add all elements
    let filterInput = document.getElementById("inputSearch");   
    for (let todo in todoList) 
    if (
        (filterInput.value == "") ||
        (todoList[todo].title.includes(filterInput.value)) ||
        (todoList[todo].description.includes(filterInput.value))
       )
    {
        let newElement = document.createElement("div");
        let newContent = document.createTextNode
            (
            todoList[todo].title + " " + todoList[todo].description
            );
        newElement.appendChild(newContent);
        todoListDiv.appendChild(newElement);

        //deelete button 
        let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "X";
        newDeleteButton.addEventListener("click",
            function() {
            deleteTodo(todo);
            });
            newElement.appendChild(newDeleteButton);
    }
}

//sarch tasks based on the search input 
let Search = function() {
    updateTodoList();
}

//clear tasks shown after using Search() function
let Clear = function () {
    let filterInput = document.getElementById("inputSearch");   
    filterInput.value = "";
    updateTodoList();
}

//delete task
let deleteTodo = function(index) {
    todoList.splice(index,1);
    //update tasks on viewport and JSON bin
    updateJSONbin();
    updateTodoList();
}

let addTodo = function() {
    //get the elements in the form
      let inputTitle = document.getElementById("inputTitle");
      let inputDescription = document.getElementById("inputDescription");
      let inputPlace = document.getElementById("inputPlace");
      let inputDate = document.getElementById("inputDate");
    //get the values from the form
      let newTitle = inputTitle.value;
      let newDescription = inputDescription.value;
      let newPlace = inputPlace.value;
      let newDate = new Date(inputDate.value);
    //create new item
      let newTodo = {
          title: newTitle,
          description: newDescription,
          place: newPlace,
          dueDate: newDate
      };
    //add item to the list
      todoList.push(newTodo);
      window.localStorage.setItem("todos", JSON.stringify(todoList));
      //update tasks on viewport and JSON bin
      updateJSONbin();
      updateTodoList();
  }