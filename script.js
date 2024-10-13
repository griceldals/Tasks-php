// Vinculamos el evento submit al formulario
document.getElementById('formTask').addEventListener('submit', saveTask);

// Función para guardar la tarea
function saveTask(e) {
    e.preventDefault();

    // Obtener datos del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Validación básica (puedes agregar más según sea necesario)
    if (!title || !description) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crear el objeto tarea
    const task = { title, description };

    // Obtener tareas almacenadas, o inicializar si no existen
    const tasks = getStoredTasks();

    // Agregar la nueva tarea
    tasks.push(task);

    // Guardar en localStorage
    setStoredTasks(tasks);

    // Refrescar la vista de tareas
    renderTasks();

    // Limpiar el formulario
    document.getElementById('formTask').reset();
}

// Función para obtener tareas del localStorage
function getStoredTasks() {
    // Verificamos si 'tasks' existe en localStorage y retornamos un array vacío si no es así
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Función para guardar las tareas en el localStorage
function setStoredTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para renderizar las tareas en la vista
function renderTasks() {
    const tasks = getStoredTasks();
    const taskView = document.getElementById('tasks');

    // Limpiar el contenido actual
    taskView.innerHTML = '';

    // Si no hay tareas, no mostramos nada y salimos
    if (tasks.length === 0) {
        taskView.innerHTML = '<p>No hay tareas pendientes.</p>';
        return;
    }

    // Generar HTML para cada tarea
    tasks.forEach((task, index) => {
        taskView.innerHTML += `
            <div class="card mb-4">
                <div class="card-body">
                    <p>${task.title} - ${task.description}</p>
                    <a class="btn btn-danger" onclick="deleteTask(${index})">Eliminar</a>
                </div>
            </div>
        `;
    });
}

// Función para eliminar una tarea
function deleteTask(index) {
    const tasks = getStoredTasks();

    // Eliminar la tarea por índice
    tasks.splice(index, 1);

    // Actualizar localStorage y la vista
    setStoredTasks(tasks);
    renderTasks();
}

// Llamada inicial para mostrar las tareas guardadas
renderTasks();
