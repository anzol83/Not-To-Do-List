// Define a variable to store list of tasks
const storedTaskList = JSON.parse(localStorage.getItem("taskList"))
let taskList = storedTaskList || []
console.log("Task List", taskList);

// Function to handle the form submission
const handleOnSubmit = (form) => {
  // STEP 1: Read/Get the form data
  const formData = new FormData(form)
  console.log("formData", formData);

  const taskName = formData.get("taskName")
  const taskTime = formData.get("taskTime")

  console.log("Form Field Values", taskName, taskTime);

  // STEP 2: Build the task object
  const taskObject = {
    taskName: taskName,
    taskTime: taskTime,
    type: "entry",
    id: generateRandomId(),
  }

  // STEP 3: Add this taskObject to taskList
  taskList.push(taskObject)
  console.log("taskList", taskList);
  // Call the display entry task list function
  displayTaskList()

  // Save taskList to the local storage for persistent data
  localStorage.setItem("taskList", JSON.stringify(taskList))

  // STEP 4: Clear the form
  form.reset()
}

// Function to genrate random unique id
const generateRandomId = () => {
  const idString = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890"

  let id = ""

  for(let i=0; i<=6; i++){
    const randomPosition = Math.floor(Math.random() * idString.length)

    id+= idString[randomPosition]
  }

  return id
}

// STEPS TO DISPLAY THE TASK LIST
// STEP 1: Select the DOM element [tbody] in which you want to add task list
const taskListElement = document.getElementById("taskListElement")

// Function to display all task list
const displayTaskList = () => {

  let taskListItemRows = ''
  // STEP 2: Map through the task list of type entry
  // So, first filter the taskList ot get only entry type task list
  const entryTypetask = taskList.filter(task => task.type === "entry")

  entryTypetask.map((task, index) => {
    taskListItemRows += `<tr>
      <th>${index+1}</th>
      <td>${task.taskName}</td>
      <td>${task.taskTime}hrs</td>
      <td class="text-end">
        <button class="btn btn-danger btn-sm" onclick="handleOnDelete('${task.id}')">
          <i class="fa-trash fa-solid"></i>
        </button>

        <button class="btn btn-success btn-sm" onclick="moveTaskToUnwantedTaskList('${task.id}')">
          <i class="fa-arrow-right-long fa-solid fa-sharp"></i>
        </button>
      </td>
    </tr>` 
  })

  taskListElement.innerHTML = taskListItemRows
}

// DOM to display unwanted task list
const unwantedTaskListElement = document.getElementById("unwantedTaskListElement")

// Function to display all task list
const displayUnwantedTaskList = () => {

  let taskListItemRows = ''
  // STEP 2: Map through the task list of type entry
  // So, first filter the taskList ot get only unwated type task list
  const unwatedTypeTask = taskList.filter(task => task.type === "Unwanted")

  unwatedTypeTask.map((task, index) => {
    taskListItemRows += `<tr>
      <th>${index+1}</th>
      <td>${task.taskName}</td>
      <td>${task.taskTime}hrs</td>
      <td class="text-end">
        <button class="btn btn-danger btn-sm" onclick="handleOnDelete('${task.id}')">
          <i class="fa-trash fa-solid"></i>
        </button>

        <button class="btn btn-warning btn-sm" onclick="moveTaskToEntryTaskList('${task.id}')">
          <i class="fa-arrow-left-long fa-solid fa-sharp"></i>
        </button>
      </td>
    </tr>` 
  })

  unwantedTaskListElement.innerHTML = taskListItemRows

  // call the function to calculate and display time
  calculateTotalTaskTime()
  calculateWastedTaskTime()
}

// Function to move entry task to unwanted task list
const moveTaskToUnwantedTaskList = (unwantedTaskId) => {
  const updatedTaskList = taskList.map((task) => {
    if(task.id === unwantedTaskId){
      task.type = "Unwanted"
    }

    return task
  })

  taskList = updatedTaskList
  // update local storage as well to be in sync
  updateLocalStorage()
  //call function to display entry task
  displayTaskList()
  //call the function to display unwanted task
  displayUnwantedTaskList()
}

// Function to move unwanted task list to entry task
const moveTaskToEntryTaskList = (entryTaskId) => {
  const updatedTaskList = taskList.map((task) => {
    if(task.id === entryTaskId){
      task.type = "entry"
    }

    return task
  })

  taskList = updatedTaskList
  // update local storage as well to be in sync
  updateLocalStorage()
  //call function to display entry task
  displayTaskList()
  //call the function to display unwanted task
  displayUnwantedTaskList()
}

// Function to delete the task
const handleOnDelete = (taskId) => {
  if(window.confirm("Are you sure you want to delete the task?")){
    const updatedTaskList = taskList.filter(task => task.id !== taskId)

    taskList = updatedTaskList

    //update local storage
    updateLocalStorage()
    //call function to display entry task
    displayTaskList()
    //call the function to display unwanted task
    displayUnwantedTaskList()
  }
}

// Update local storage
const updateLocalStorage = () => {
  localStorage.setItem("taskList", JSON.stringify(taskList))
}
// CALL THE displayTaskList to display task list on load for the first time
displayTaskList()
// CALL THE displayTaskList to display unwanted task list on load for the first time
displayUnwantedTaskList()