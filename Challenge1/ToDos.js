//Selectors for HTML elements
const todoItemsList = document.querySelector('.todo-item');       
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');


let toDoList = [];

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo(todoInput.value); 
});



function addTodo(item) {
  
  if (item !== '') {
    
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    toDoList.push(todo);
    addToLocalStorage(toDoList); 

    todoInput.value = '';
  }
}


function renderTodos(toDoList) {
 
  todoItemsList.innerHTML = '';

  toDoList.forEach(function(item) {

    const checked = item.completed ? 'checked': null;

    const li = document.createElement('li');
    
    li.setAttribute('class', 'item');
    
    li.setAttribute('data-key', item.id);
    
    if (item.completed === true) {
      li.classList.add('checked');
    }
li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button type="button" class="delete">&times;</i></button>
    `;
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
  });
}


function addToLocalStorage(toDoList) {
  
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  
  renderTodos(toDoList);
}

function getFromLocalStorage() {
  
  const reference = localStorage.getItem('toDoList');
  
  if (reference) {
    toDoList = JSON.parse(reference);
    renderTodos(toDoList);
  }
}

function toggle(id) {
  toDoList.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

addToLocalStorage(toDoList);
}

function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', (event) => {
  
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

function totalTasksUpdate(toDoList){
  const totalTasks = document.getElementById('filters');
    if (toDoList != null) {
      totalTasks.innerHTML = `${toDoList.length} task(s) to complete.`;
    }
    else {
      totalTasks.innerHTML = `No current tasks to complete`;
    }
}

function currentActiveTasks(toDoList) {
  const totalTasks = document.getElementById('filters');
  let count = 0;

    toDoList.forEach( (item) => {
      if(item.completed != true) {
        count++;
        totalTasks.innerHTML = `${count} active tasks to complete`;
      }
      
      if (count == 0) {
        totalTasks.innerHTML = `${count} active tasks to complete`;
      }
    });
}

function finishedTasks (toDoList) {
  const totalTasks = document.getElementById('filters');
  let completeCounter = 0;

  toDoList.forEach( (item) => {
      if (item.completed == true) {
        completeCounter++;
        totalTasks.innerHTML = `${completeCounter} tasks completed`
      }

      if (completeCounter == 0) {
        totalTasks.innerHTML = `You have completed ${completeCounter} tasks`
      }
  });

}

