export default class ToDo {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
    }

    obtainToDoItem(){
        const content = document.getElementById('toDoInput').value;
    }
}
