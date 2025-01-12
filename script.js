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

// Function to generate random unique id
const generateRandomId = () => {
  const idString = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890"

  let id = ""

  for(let i=0; i<=6; i++){
    const randomPosition = Math.floor(Math.random() * idString.length)

    id+= idString[randomPosition]
  }

  return id
}