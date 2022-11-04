import { saveTask, getTasks, getTask, onGetTasks, deleteTask, updateTask } from './firebase.js';

const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
    //creamos una funcion asincrona porque tenemos que esperar a que busque los datos y nos los dé
    //const querySnapshot = await getTasks();

    onGetTasks((querySnapshot) => {
        //querySnapshot contiene multiples datos de la coleccion asi que con el foreach seleccionamos cada uno
        //Con el metodo data() obtenemos los datos contenidos en cada elemento
        tasksContainer.innerHTML = ''; //Para que no duplique al guardar datos. Borra lo anterior y lo vuelve a crear
        querySnapshot.forEach(doc => {
            const task = doc.data();

            let h3 = document.createElement('h3');
            let p = document.createElement('p');
            let divCard = document.createElement('div');
            let divButtons = document.createElement('div');
            let buttonDelete = document.createElement('button');
            let buttonEdit = document.createElement('button');

            h3.setAttribute('class', 'h5');
            h3.append(task.title);

            p.append(task.description);

            buttonDelete.setAttribute('class', 'btn btn-primary btn-delete');
            buttonDelete.setAttribute('data-id', doc.id);
            buttonDelete.append('Delete');

            buttonEdit.setAttribute('class', 'btn btn-secondary btn-edit');
            buttonEdit.setAttribute('data-id', doc.id);
            buttonEdit.append('Edit');

            divButtons.append(buttonDelete, buttonEdit);

            divCard.setAttribute('class', 'card card-body mt-2 border-primary');
            divCard.append(h3, p, divButtons);

            tasksContainer.append(divCard);

            //     tasksContainer.innerHTML += `
            //     <div class='card card-body mt-2 border-primary'>
            //         <h3 class='h5'>${task.title}</h3>
            //         <p>${task.description}</p>
            //         <div>
            //             <button class='btn btn-primary btn-delete' data-id="${doc.id}">Delete</button>
            //             <button class='btn btn-secondary btn-edit' data-id="${doc.id}">Edit</button>
            //         </div>
            //     </div>
            // `
            //Es mas seguro hacer lo anterior con document create element y los append. El inner html puede estar sujeto a ataques de cross side scripting
            //el data nos permite añadirle datos a una etiqueta html, en este caso nuestro dato se llama id
        });

        const btnDelete = tasksContainer.querySelectorAll('.btn-delete');
        btnDelete.forEach(btn => {
            //al evento click le podemos pasar un evento para extraer datos del html. como event es un objeto podemos seleccionar dentro del mismo
            // btn.addEventListener('click', (event) => {
            //     console.log(event.target.dataset.id);
            // });
            // btn.addEventListener('click', ({target}) => {
            //     console.log(target.dataset.id);
            // });
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteTask(dataset.id);
            });
        });

        const btnEdit = tasksContainer.querySelectorAll('.btn-edit');
        btnEdit.forEach(btn => {
            btn.addEventListener('click', async ({ target: { dataset } }) => {
                const doc = await getTask(dataset.id);
                const task = doc.data();

                //seleccionamos los inputs dentro de taskForm y les añadimos el valor de task
                taskForm['task-title'].value = task.title;
                taskForm['task-description'].value = task.description;

                //cambiamos el valor de editStatus para que nos ayude a seleccionar si queremos guardar o actualizar un dato
                editStatus = true;
                id = dataset.id;

                taskForm['btn-task-save'].innerHTML = 'Update';
            });
        });

    });//Fin OngetTasks
});//Fin Load

function validateEmail(title, description){    
	var emailField = document.getElementById('task-title');
	
	var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	if( validEmail.test(emailField.value) ){
		alert('Email is valid, continue with form submission');
        saveTask(title, description);
		return true;
	}else{
		alert('Email is invalid, skip form submission');
		return false;
	}
} 

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskForm['task-title'].value;
    const description = taskForm['task-description'].value;

    if (!editStatus) {
        validateEmail(title, description);
    } else {
        updateTask(id, { title, description });
        editStatus = false;
    }

    //reseteamos el formulario a cero
    taskForm.reset();
});