"use strict"
let todoList = [];

//initialize to do list from choosen JSON bin
let initList = function () {
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

let updateJSONbin = function () {
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


let updateTodoList = function () {
    let searchItemList = [];
    let table = $("#todoTable").find("tbody");
    let filterInput = $("#inputSearch").val();

    const inputStartDate = $("#inputStartDate");
    const inputEndDate = $("#inputEndDate");
    let startDate = new Date(inputStartDate.val()).getTime();
    let endDate = new Date(inputEndDate.val()).getTime();

    //remove all elements
    table.empty();

    for (let todo in todoList) {
        if (SearchFilter(filterInput, todoList[todo]) &&
            SearchDate(todoList[todo], startDate, endDate)) {
            searchItemList.push(todoList[todo]);
        }
    }

    //add all elements
    for (let todo in searchItemList) {
        table.append(
            "<tr>" +
            "<td>" + searchItemList[todo].title + "</td>" +
            "<td>" + searchItemList[todo].description + "</td>" +
            "<td>" + searchItemList[todo].place + "</td>" +
            "<td>" + searchItemList[todo].dueDate + "</td>" +
            "<td>" + "<input class='btn btn-outline-danger' type='button' value='X' onclick='deleteTodo(" + todo + ")'/>" + "</td>" +
            "</tr>"
        );
    }
}

let SearchFilter = function (filterInput, todoObject) {
    let filterInputValue = $("#inputSearch").val();
    return !!((filterInputValue == "") ||
        todoObject.title.includes(filterInput) ||
        todoObject.description.includes(filterInput) ||
        todoObject.place.includes(filterInput));
};

let SearchDate = function (todoObject, startDate, endDate) {
    let filterStartDateValue = $("#inputStartDate").val();
    let filterEndDateValue = $("#inputEndDate").val();

    return !!(((filterStartDateValue == "") ||
        (startDate <= new Date(todoObject.dueDate).getTime())) &&
        ((filterEndDateValue == "") ||
            (endDate >= new Date(todoObject.dueDate).getTime())));
};



//sarch tasks based on the search input 
let Search = function () {
    updateTodoList();
}

//clear tasks shown after using Search() function
let Clear = function () {
    let filterInput = $("#inputSearch");
    let filterStartDateValue = $("#inputStartDate");
    let filterEndDateValue = $("#inputEndDate");
    filterInput.val("");
    filterEndDateValue.val("");
    filterStartDateValue.val("");
    updateTodoList();
}

//delete task
let deleteTodo = function (index) {
    todoList.splice(index, 1);
    //update tasks on viewport and JSON bin
    updateJSONbin();
    updateTodoList();
}

let addTodo = function () {
    //get the elements in the form
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputPlace = $("#inputPlace");
    let inputDate = $("#inputDate");
    //get the values from the form
    let newTitle = inputTitle.val();
    let newDescription = inputDescription.val();
    let newPlace = inputPlace.val();
    let newDate = new Date(inputDate.val());
    //newDate = newDate.getUTCDate() + "." + (newDate.getMonth()+1) + "." + (newDate.getFullYear());
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