class UI {

  constructor(){
    this.workoutNameInput = document.querySelector('#workoutNameInput')
    this.workoutName = document.querySelector('.workoutName')
    this.saveWorkoutBtn = document.querySelector('#saveWorkoutBtn')
    this.exerciseOptions = document.querySelector('#exerciseOptions')
    this.addExerciseBtn = document.querySelector('#addExerciseBtn')
  }

  // Set workoutName
  displayWorkoutName(name){
    this.workoutName.textContent = name
  }

}
ui = new UI()

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



function changeEventHandler(e) {
    // You can use “this” to refer to the selected element.
    console.log(e.target.value);
}


// LISTENERS

// listen for keyup on workout name input
ui.workoutNameInput.addEventListener('keyup', setWorkoutName)

ui.addExerciseBtn.addEventListener('click', exerciseOptions)


document.addEventListener('DOMContentLoaded',function() {
    ui.exerciseOptions.onchange=changeEventHandler;
},false);

ui.exerciseOptions.addEventListener('change', function(e){
  console.log('Change');
})





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

  let exerciseOptions = ['Bicep Curl', 'Shoulder Press', 'Chest Press','Dumbell Fly','Squat', 'Deadlift']



  // Public Methods

  return {

  saveWorkoutName: (name) => {
    data.workouts[0].workoutName = name
  },

  logWorkoutData: () => {
    console.log(data.workouts[0]);
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
  }

  }

})()


// Init
const init = (()=>{
    workoutController.createWorkoutId()
    workoutController.addExerciseOptions(workoutController.showExercises())


})()
