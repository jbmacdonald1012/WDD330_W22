//Selectors for HTML elements
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');       


let todos = [];

todoForm.addEventListener('submit', function (event) {
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

    todos.push(todo);
    addToLocalStorage(todos); 

    todoInput.value = '';
  }
}


function renderTodos(todos) {
 
  todoItemsList.innerHTML = '';

  todos.forEach(function(item) {

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
      <button type="button" class="delete-button">&times;</button>
    `;
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
  });
}


function addToLocalStorage(todos) {
  
  localStorage.setItem('todos', JSON.stringify(todos));
  
  renderTodos(todos);
}

function getFromLocalStorage() {
  
  const reference = localStorage.getItem('todos');
  
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}


function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  
  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });
  
  addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function (event) {
  
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

function totalTasksUpdate(todos){
  const totalTasks = document.getElementById('filters');
    if (todos != null) {
      totalTasks.innerHTML = `${todos.length} task(s) to complete.`;
    }
    else {
      totalTasks.innerHTML = `No current tasks to complete`;
    }
}

function currentActiveTasks(todos) {
  const totalTasks = document.getElementById('filters');
  let count = 0;

    todos.forEach( (item) => {
      if(item.completed != true) {
        count++;
        totalTasks.innerHTML = `${count} active tasks to complete`;
      }
      
      if (count == 0) {
        totalTasks.innerHTML = `${count} active tasks to complete`;
      }
    });
}

function finishedTasks (todos) {
  const totalTasks = document.getElementById('filters');
  let completeCounter = 0;

  todos.forEach( (item) => {
      if (item.completed == true) {
        completeCounter++;
        totalTasks.innerHTML = `${completeCounter} tasks completed`
      }

      if (completeCounter == 0) {
        totalTasks.innerHTML = `You have completed ${completeCounter} tasks`
      }
  });

}

