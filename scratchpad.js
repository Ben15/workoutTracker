



// Add name to workout

document.querySelector('#workoutName').addEventListener('keyup', addWorkoutName)

function addWorkoutName(e) {
  console.log(e.target.value)
  let workoutName = document.querySelector('.workoutName')
  workoutName.textContent = e.target.value

}


// create list of exercises

let exerciseList = [
  'Bicep Curl',
  'Shoulder Press',
  'Chest Press',
  'Dead Lift',
  'Squat'
]

// append list to exercse options

addExerciseListToOptions()

function addExerciseListToOptions(){

let exerciseOptions = document.querySelector('#exerciseOptions')

exerciseOptions.innerHTML = `
<option value="" disabled selected>Choose an exercise</option>
${exerciseList.map((exercise, index) => `<option value="${exercise}">${exercise}</option>`)}
`

}


// Select eventListener ( JQUERY )

$('select').not('.disabled').material_select();
 $('#exerciseOptions').on('change', function(e) {
   var optionSelected = $("option:selected", this);
   var valueSelected = this.value;
   console.log(valueSelected)
 });

















// ------------------------------------------------------------------------------------------
// REDO CODE TO MAKE BETTER/FASTER etc

// Reusable function to get correct exercises

function exerciseIndex(){
  callback = callback
  for(var i = 0; i < workout.exercises.length; i++){
    callback()
  }

}
