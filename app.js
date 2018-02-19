class UI {

  constructor(){
    this.workoutNameInput = document.querySelector('#workoutNameInput')
    this.workoutName = document.querySelector('.workoutName')
    this.saveWorkoutBtn = document.querySelector('#saveWorkoutBtn')
    this.exerciseOptions = document.querySelector('#exerciseOptions')
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


// listen for keyup on workout name input
ui.workoutNameInput.addEventListener('keyup', setWorkoutName)





// Util
let util = (()=>{

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



  // Public Methods

  return {

  saveWorkoutName: (name) => {
    data.workouts[0].workoutName = name
  },

  logWorkoutData: () => {
    console.log(data.workouts[0]);
  },

  createWorkoutId: () => {
    data.workouts[0].workoutId = util.uuid()
  }





  }

})()


// Init
let init = (()=>{
    workoutController.createWorkoutId()
})()
