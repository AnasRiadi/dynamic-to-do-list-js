document.addEventListener('DOMContentLoaded', function() {
   
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

   
    function addTask(taskText, save = true) {
        
        if (taskText !== "") {
            
            const li = document.createElement('li');
            li.textContent = taskText;

           
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn'); 

            
            removeButton.addEventListener('click', function() {
                taskList.removeChild(li); 
                removeTaskFromLocalStorage(taskText); 
            });

           
            li.appendChild(removeButton);

            
            taskList.appendChild(li);

            
            if (save) {
                saveTaskToLocalStorage(taskText);
            }

            
            taskInput.value = "";
        } else {
            alert("Please enter a task."); 
        }
    }

    
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

   
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); 
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); 
    }

    
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    loadTasks();
});
