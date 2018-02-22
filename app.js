class UI {

  constructor(){
    this.workoutNameInput = document.querySelector('#workoutNameInput')
    this.workoutName = document.querySelector('.workoutName')
    this.saveWorkoutBtn = document.querySelector('#saveWorkoutBtn')
    this.exerciseOptions = document.querySelector('#exerciseOptions')
    this.addExerciseBtn = document.querySelector('#addExerciseBtn')
    this.exercisesContainer = document.querySelector('.exercisesContainer')
    this.workoutContainer = document.querySelector('.container')
  }

  // Set workoutName
  displayWorkoutName(workoutName){
    this.workoutName.textContent = workoutName
  }



  createNewExercise(exerciseName){
    let divRow = document.createElement('div')
    divRow.classList.add('row')
    let content = `
      <div class="col s12 exerciseContainer">
        <div class="row valign-wrapper">
          <div class="col s11 ">
            <h5 class="exerciseName">${exerciseName}</h5>
          </div>
          <div class="col s1"><i id="removeExerciseBtn"class="material-icons">delete</i></div>
        </div>
        <!-- Sets and Reps Heading -->
        <table>
            <thead>
              <th>Reps</th>
              <th>Weight (kg)</th>
              <th>Completed</th>
              <th>Delete Set</th>
            </thead>
            <!-- Set Container -->
            <tbody class="setContainer">
            </tbody>
        </table>
      </div>
      <div class="col s12 setContainer">
        <div class="col s6 offset-s3 center-align">
          <a id="addSetBtn" class="blue-text text-darken-2 waves-effect waves-blue btn-flat "><i class="material-icons left">add</i>Add Set</a>
        </div>
      </div>`

    divRow.innerHTML = content
    this.exercisesContainer.appendChild(divRow)
    this.exerciseOptions.parentNode.parentNode.classList.remove('visible')
    this.exerciseOptions.parentNode.parentNode.classList.add('hidden')
    workoutController.addExerciseToData(exerciseName, divRow)

  }


  addSet(e){
    if(e.target.id === 'addSetBtn'){
      let specificExercise = e.target.parentNode.parentNode.parentNode.querySelector('.exerciseContainer')
      let setContainer = specificExercise.querySelector('.setContainer')
      let setContent = `
        <tr class="set">
          <td>
            <div class="input-field rep">
              <input placeholder="Reps" id="first_name" type="number" class="validate">
            </div>
          </td>
          <td>
            <div class="input-field rep">
              <input placeholder="Weight" id="first_name" type="number" class="validate">
            </div>
          </td>
          <td>
            <input type="checkbox" class="filled-in" id="filled-in-box"  />
            <label for="filled-in-box">Completed</label>
          </td>
          <td>

              <i id="deleteBtn" class="material-icons right">delete</i>

          </td>
        </tr>`

        setContainer.insertAdjacentHTML('beforeend', setContent)
        // Add to data
        let workoutObject = workoutController.showWorkoutData()[0]
        let set = new Set
        let setsLength = e.target.parentNode.parentNode.parentNode.querySelectorAll('.set').length
        // debugger
        // FIXME (CANNOT UNDERSTAND WHY setsLength cannot be accessed within the map function)
        console.log(setsLength);
        workoutObject.exercises.map((exercise) => {
            if(e.target.parentNode.parentNode.parentNode.dataset.id === exercise.exerciseId){
                set.setPosition = e.target.parentNode.parentNode.parentNode.querySelectorAll('.set').length - 1
                exercise.sets.push(set)
            }
        })




    }
  }

  removeSet(e){
    if(e.target.id === 'deleteBtn'){

      let numberOfSets = e.target.parentNode.parentNode.parentNode.querySelectorAll('.set').length
      // console.log()
      if( numberOfSets === 1){

        let addSetBtn = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('#addSetBtn')
        console.log(addSetBtn);
        addSetBtn.style.marginTop = '30px'
      }
      e.target.parentNode.parentNode.remove()
      e.preventDefault()
    }

  }

  removeExercise(e){
// see if it's the removeExerciseBtn
    if(e.target.id === 'removeExerciseBtn'){
      // loop through data exercises array to find if the dom element matches the exercise in data
      workoutController.showWorkoutData()[0].exercises.map((exercise, index)=>{
        if(exercise.exerciseId === e.target.parentNode.parentNode.parentNode.parentNode.dataset.id){
          // remove exercise from the data object
          workoutController.showWorkoutData()[0].exercises.splice(index,1)
          // remove exercise from the dom
          let removeExerciseIcon = e.target
          let exerciseContainer = removeExerciseIcon.parentNode.parentNode.parentNode.parentNode.remove()
        }
      })
    }
    console.log(workoutController.showWorkoutData());
  }


}
ui = new UI()

// Workout Classes

class Exercise {

  constructor(exerciseName){
    this.exerciseName = exerciseName
    this.exerciseId = util.uuid()
    this.sets = []
  }

}

class Set {

  constructor(position){
    this.setPosition= position
    this.reps=0
    this.weight=0
    this.completed=false
  }

}

// Functions

let setWorkoutName = (e)=>{

  let typed = ui.displayWorkoutName(e.target.value)
  if(e.keyCode === 13){
    e.target.blur()
    workoutController.saveWorkoutName(e.target.value)
    console.log('ENTER')
  } else if (e.keyCodr === 27) {
    console.log('ESCAPE')
    // FIXME: ;
  }
  e.preventDefault()
}

let exerciseOptions = (e) => {

this.exerciseOptions.parentNode.parentNode.classList.remove('hidden')
this.exerciseOptions.parentNode.parentNode.classList.add('visible')

console.log('Click');
e.preventDefault()
}

function addExercise(e) {
    ui.createNewExercise(e.target.value)
}






// LISTENERS

// listen for keyup on workout name input
ui.workoutNameInput.addEventListener('keyup', setWorkoutName)
// Add exercise Button
ui.addExerciseBtn.addEventListener('click', exerciseOptions)
//  Exercise Options
document.addEventListener('DOMContentLoaded',function() {
  ui.exerciseOptions.onchange=addExercise;
},false);
// addSet
document.addEventListener('click', ui.addSet)
// removeSet
document.addEventListener('click', ui.removeSet)
// remove exercise
document.addEventListener('click', ui.removeExercise)



// Util
const util = (()=>{
return {
  uuid: function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
})()






// data

const workoutController = (()=>{

  let data = {
    workouts:[{
      workoutName:'',
      workoutId:'',
      startTime:'',
      endTime:'',
      endDate:'',
      exercises:[
        {
          exerciseName:'',
          exerciseId:'',
          sets:[
            { setNumber:'',reps:0, weight:0, completed: false }
          ]
        }
      ]
    }

    ]

  }

  let exerciseOptions = ['Bicep Curl', 'Shoulder Press', 'Chest Press','Dumbell Fly','Squat', 'Deadlift', 'Row']



  // Public Methods

  return {

  saveWorkoutName: (name) => {
    data.workouts[0].workoutName = name
  },

  showWorkoutData: () => {
    console.log(data.workouts[0]);
    return data.workouts
  },
  showExercises: () => {
    return exerciseOptions
  },

  createWorkoutId: () => {
    data.workouts[0].workoutId = util.uuid()
  },
  addExerciseOptions: (array) => {
    let content = ''
    array.map((exerciseName) => {
      content += `
              <option value="${exerciseName}">${exerciseName}</option>
      `
    } )
    ui.exerciseOptions.insertAdjacentHTML('beforeend',content)
  },
  addExerciseToData: (exerciseName, exerciseElement) => {
    // create object
    let exercise = new Exercise
    exercise.exerciseName = exerciseName
    data.workouts[0].exercises.push(exercise)

    exerciseElement.dataset.id = exercise.exerciseId
  },

  }

})()


// Init
const init = (()=>{
    // Create workout Id
    workoutController.createWorkoutId()
    // Add exercise list to exercise options
    workoutController.addExerciseOptions(workoutController.showExercises())
    // Workout name initial



})()
