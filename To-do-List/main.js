let formDisplayed = false;
let array = [];
let id = 1;
let btnCreateClickHandler = (e)=>{
    createDivTask();
};
const btnCreate = document.getElementById('btnCreate');
const divTask = document.getElementById('task');
const divShowTasks = document.getElementById('show');

btnCreate.addEventListener('click', btnCreateClickHandler);

function showInScreen(){

    while(divShowTasks.firstChild){
        divShowTasks.removeChild(divShowTasks.firstChild);
    }
    array.forEach(objeto => {
        const newStructure = createShowEstructure(objeto.id);
        divShowTasks.appendChild(newStructure);
        injectData(objeto.title, objeto.description, objeto.dueDate, objeto.priority, objeto.completed, objeto.id);
        setTimeout(()=>{
            showAnimation(objeto.id);
        },1);
    });
}

function showAnimation(id){
    const bloqueContainer = document.getElementById(`Block-${id}`);
    bloqueContainer.classList.add('appear');
}

function injectData(title, description, dueDate, priority, estate, idObjeto) {
    const titleShow = document.getElementById(`titleShow-${idObjeto}`);
    titleShow.textContent = title;
    const priorityShow = document.getElementById(`priorityShow-${idObjeto}`);
    const priorityText = document.createTextNode(`${priority}`);
    priorityShow.classList.add(priority === 'High' ? 'High' : priority === 'Medium' ? 'Medium' : priority === 'Low' ? 'Low' : '');

    priorityShow.appendChild(priorityText);

    const descriptionShow = document.getElementById(`areaTask-${idObjeto}`);
    descriptionShow.value = description;
    changeHeightTextArea(descriptionShow);
    

    const dateShow = document.getElementById(`dateShow-${idObjeto}`);
    const dateSpan = document.createTextNode(`${dueDate}`);

    dateShow.appendChild(dateSpan);
    
    const estateShow = document.getElementById(`stateShow-${idObjeto}`);
    estateShow.textContent = evaluarEstado(estate);
}

function createShowEstructure(idObjeto) {
    const diVBlock = document.createElement('div');
    diVBlock.id = `Block-${idObjeto}`;
    diVBlock.classList.add('container');
    // Primera fila - First row
    const firstRow = document.createElement('div');
    firstRow.id = `firtsRow-${idObjeto}`;
    firstRow.classList.add('firstRowClass');

    const titleShow = document.createElement('div');
    titleShow.id = `titleShow-${idObjeto}`;
    titleShow.classList.add('titleTask');

    const priorityShow = document.createElement('div');
    priorityShow.id = `priorityShow-${idObjeto}`;
    priorityShow.classList.add('priorityTaskClass');
 
    const spanPriority = document.createElement('span');
    spanPriority.textContent = 'Priority: ';
    spanPriority.classList.add('spanPriority');

    priorityShow.appendChild(spanPriority);
    firstRow.appendChild(titleShow);
    firstRow.appendChild(priorityShow);
    
    // Segunda fila - Second Row
    const secondRow = document.createElement('div');
    secondRow.id = `secondRow-${idObjeto}`;
    secondRow.classList.add('secondRowClass');
    const textAreaDescriptionTask = document.createElement('textarea');
    textAreaDescriptionTask.id = `areaTask-${idObjeto}`;
    textAreaDescriptionTask.classList.add('taskAreaClass');
    textAreaDescriptionTask.rows = 3;
    textAreaDescriptionTask.style.resize = 'none';
    textAreaDescriptionTask.style.overflowY = 'auto';

    secondRow.appendChild(textAreaDescriptionTask);

    // Tercera fila - Third row
    const thirdRow = document.createElement('div');
    thirdRow.id = `thirdRow-${idObjeto}`;
    thirdRow.classList.add('thirdRowClass');

    const dateShow = document.createElement('div');
    dateShow.id = `dateShow-${idObjeto}`;
    dateShow.classList.add('dateTaskClass');
    const spanDate = document.createElement('span');
    spanDate.textContent = 'Assigned Date: ';

    dateShow.appendChild(spanDate);

    const stateShow = document.createElement('div');
    stateShow.id = `stateShow-${idObjeto}`;
    stateShow.classList.add('stateTaskClass');

    thirdRow.appendChild(dateShow);
    thirdRow.appendChild(stateShow);
    // Cuarta fila - Fourth row
    const fourthRow = document.createElement('div');
    fourthRow.id = `fourthRow-${idObjeto}`;
    fourthRow.classList.add('fourthRowClass');
    // Completado - Completed
    const completedLabel = document.createElement('label');
    completedLabel.setAttribute('for', `${idObjeto}`);
    completedLabel.textContent = 'Completed';
    completedLabel.classList.add('labelTaskClass');

    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.id = `${idObjeto}`;
    completedCheckbox.classList.add('completedTaskClass');

    completedCheckbox.addEventListener('change', (e)=>{
        evaluarCheckBox(e);
    });

    fourthRow.appendChild(completedLabel);
    fourthRow.appendChild(completedCheckbox);
    // Agregar todos los elementos al contenedor principal
    diVBlock.appendChild(firstRow);
    diVBlock.appendChild(secondRow);
    diVBlock.appendChild(thirdRow);
    diVBlock.appendChild(fourthRow);
    
    return diVBlock;
}

function evaluarCheckBox(checkbox){
    if(checkbox.target.checked){
        const position = parseInt(checkbox.target.id);
        const index = array.findIndex(obj => obj.id === position); 
        if(index !== -1){
             array.splice(index,1);
             const statusShow = document.getElementById(`stateShow-${checkbox.target.id}`);
             statusShow.textContent = 'Completed. Deleting task ...';
             statusShow.classList.add('textColor');
             setTimeout(showInScreen,1500);
        }
    }
}

function evaluarEstado(Estado) {
    if (Estado === false) {
        return 'Incompleto';
    } else {
        return 'Completado';
    }
}
//Primero se ejectuta esta funcion despues de pulsar el button 'Create Task'
function createDivTask() {
    divTask.classList.remove('dissapear');
    //Primero verifico si se esta mostrando el 'form', sin esto el form se repite las veces que el button es pulsado
    if (formDisplayed) {
        return;
    }
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.id = 'Title';
    inputTitle.placeholder = 'Title';
    inputTitle.classList.add('inputData');

    const inputDescrip = document.createElement('textArea');
    inputDescrip.id = 'Description';
    inputDescrip.placeholder = 'Description';
    inputDescrip.rows = 3;
    inputDescrip.classList.add('inputData');
    inputDescrip.style.resize = 'none';
    inputDescrip.style.overflowY = 'auto';

    inputDescrip.addEventListener('input', (e)=>{ changeHeightTextArea(e.target)});

    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.id = 'Date';
    inputDate.classList.add('inputData');

    const btnCreateTask = document.createElement('button');
    btnCreateTask.textContent = 'Create';
    btnCreateTask.id = 'btnCreate';
    btnCreateTask.classList.add('btnCreate');

    const radioContainer = document.createElement('div');
    radioContainer.classList.add('divRadio');
    radioContainer.classList.add('inputData');

    const span = document.createElement('span');
    span.textContent ='Priority: ';

    const altaRadio = document.createElement('input');
    altaRadio.type = 'radio';
    altaRadio.name = 'priority';
    altaRadio.value = 'High';
    const labelAlta = document.createElement('label');
    labelAlta.textContent = 'High';

    const mediaRadio = document.createElement('input');
    mediaRadio.type = 'radio';
    mediaRadio.name = 'priority';
    mediaRadio.value = 'Medium';
    const labelMediana = document.createElement('label');
    labelMediana.textContent = 'Medium';

    const bajaRadio = document.createElement('input');
    bajaRadio.type = 'radio';
    bajaRadio.name = 'priority';
    bajaRadio.value = 'Low';
    const labelBaja = document.createElement('label');
    labelBaja.textContent = 'Low';

    radioContainer.appendChild(span);
    radioContainer.appendChild(altaRadio);
    radioContainer.appendChild(labelAlta);
    radioContainer.appendChild(mediaRadio);
    radioContainer.appendChild(labelMediana);
    radioContainer.appendChild(bajaRadio);
    radioContainer.appendChild(labelBaja);

    const formContainer = document.createElement('form');
    formContainer.id = 'FormTask';
    formContainer.classList.add('formElement');

    formContainer.appendChild(inputTitle);
    formContainer.appendChild(inputDescrip);
    formContainer.appendChild(inputDate);
    formContainer.appendChild(radioContainer);
    formContainer.appendChild(btnCreateTask);

    //Envio los datos introducidos en el form para que sean guardados en el array que se definio al principio
    formContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedPriority = document.querySelector('input[name="priority"]:checked');
        //Verifico si en el input-radio se esta marcando alguna de las tres opciones 'Alta', 'Mediana' o 'Baja'
        if (!selectedPriority) {
            alert('Elija una prioridad.');
            return;
        }
        //Evaluar fecha valida
        const checkSelectedDate = inputDate.value;
        const selectedDateObject = new Date(checkSelectedDate);
        selectedDateObject.setHours(0, 0, 0, 0);
        if(isNaN(selectedDateObject.getTime())){
            alert('Introduzca una fecha');
            return;
        }else{
            const validarDate = checkDate(inputDate.value);
            if(validarDate === false){
                alert('Fecha Incorrecta, por favor introduzca una fecha valida');
                return;
            }
        }
        
        //Llamo a la funcion createTask() y le envio los datos que estan dentro del form, luego este me devuelve un objeto que contiene estos datos 
        const objTask = createTask(inputTitle.value, inputDescrip.value, inputDate.value, selectedPriority.value, id);
        //Agrego el objeto dentro del array
        array.push(objTask);
        //Este contador es para generar un id para cada objeto, el contador empieza desde uno
        id++;
        showInScreen();
    });

    divTask.appendChild(formContainer);
    formDisplayed = true;
}

function changeHeightTextArea(textAreaReference){
    textAreaReference.style.height = 'auto';
    textAreaReference.style.height = textAreaReference.scrollHeight + 'px';
}

//funcion que crea un ojeto el cual almacenara los datos introducidos en el 'form'
function createTask(title, description, dueDate, priority, id) {
    return {
        id: id,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        completed: false,
    };
}

//Funcion que evalua o valida fecha
function checkDate(date){
    //Obtengo fecha actual sin considerar la hora
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const [year, month, day] = date.split('-');
    const dateSelectedCorrect = new Date(year, month -1, day);

    if (dateSelectedCorrect >= currentDate) {
        return true;
    }else{
        return false;
    }
}
