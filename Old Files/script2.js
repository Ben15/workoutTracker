
let addExerciseBtn = document.getElementById('addExercise'),
    saveExerciseBtn = document.getElementById('saveExercise'),
    exerciseNameInputWrapper = document.getElementById('exerciseNameInputWrapper'),
    exerciseNameInput = document.getElementById('exerciseNameInput'),
    exerciseNameDoneBtn = document.getElementById('exerciseNameDoneBtn'),
    newExerciseInputWrapper = document.getElementById('newExerciseInputWrapper'),
    exercisContainer = document.getElementById('exerciseContainer'),
    weightInput = document.getElementsByClassName('weight'),
    repInput = document.getElementsByClassName('rep')


// Workout Class

class Workout {
  constructor(workoutName, workoutId, workoutDate, workoutLength, exercises) {
    this.workoutName = workoutName;
    this.workoutId = workoutId;
    this.workoutLength = workoutLength;
    this.exercises = exercises;
  }
}

// Exercise Class

class Exercise {
  constructor(exerciseName, exerciseId, sets) {
    this.exerciseName = exerciseName;
    this.exerciseId = exerciseId;
    this.sets = sets;
  }
}

// Set Class

class Set {
  constructor(setId, setNumber, reps, weight, completed) {
    this.setId = setId
    this.setNumber = setNumber
    this.reps = reps
    this.weight = weight
    this.completed = completed
  }
}


// Init

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  });

// Utility

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Local Storage Class

class Store {
  static addWorkout(){

  }

  static getWorkout(){

  }

  static removeWokrout(){

  }
}


// Event Listeners

addListenersToDom()

function addListenersToDom(){

  // 'Add Exercise' button
  addExerciseBtn.addEventListener("click", function(){
    if(newExerciseInputWrapper.className === "hidden"){
      exerciseNameInput.value = ''
      newExerciseInputWrapper.className = "visible"
    }
  })

  // Add Exercise Done Button
  exerciseNameDoneBtn.addEventListener("click", function(){
    Controller.addExercise(exerciseNameInput.value)
    })

// CLICK EVENTS ON CONTAINER
  exerciseContainer.addEventListener('click',function(event){
    // ADD SET BUTTON CLICK
    if(event.target.id === "addSetBtn"){
      Controller.addSet(event.target.parentNode.id)
      console.log("you clicked the addSetBtn")
    }
    // DELETE SET BUTTON CLICK
    if(event.target.id === "deleteSetBtn"){
      Controller.deleteSet(event.target.parentNode.parentNode.parentNode.id, event.target.parentNode.id)
    }
    // DELETE EXERCISE BUTTON CLICK
    if(event.target.id === "deleteExerciseBtn"){
      for(var i = 0; i < workout.exercises.length; i++){
        if(workout.exercises[i].exerciseId === event.target.parentNode.id ){
          workout.exercises.splice(i,1)
        }
        Controller.displayExercises()
      }
    }
  })

  // SAVE EXERCISE
  saveExerciseBtn.addEventListener('click',function(event){
    Controller.saveWorkout()
  })


  // CHECKBOX EVENT
  exerciseContainer.addEventListener('change',function(event){
    const checkbox = event.target
    const exercises = workout.exercises
    // find containing exercise
    for(var i = 0; i < exercises.length; i++){
      if(checkbox.parentNode.parentNode.parentNode.id === exercises[i].exerciseId){
        const containingExercise = exercises[i]
        // find containing set
        for(var s = 0; s < containingExercise.sets.length; s++){
          if(checkbox.parentNode.id === containingExercise.sets[s].setId){
            const containingSet = containingExercise.sets[s]
            if(checkbox.checked === true){
              containingSet.completed = true;
            }else{
              containingSet.completed = false;
            }
          }
        }
      }
    }
  });

}



// UI






// CONTROLLER

var Controller = {

  addExercise: function(){
    var exerciseId = uuid()
    var newExercise = {
      exerciseName:nameOfExercise,
      sets:[],
      exerciseId: exerciseId
    }
    workout.exercises.push(newExercise)
    console.log(workout.exercises)
    exerciseNameInput.value = ''
    this.displayExercises()
  },

  displayExercises: function(){

    var exerciseContainer = document.querySelector('#exerciseContainer')

    exerciseContainer.innerHTML = ''

    for(var i = 0; i < workout.exercises.length; i++){

    // creates a wrapper to put the exercise elements in
      var newExerciseWrapper = document.createElement('div')
      newExerciseWrapper.id = workout.exercises[i].exerciseId

    // creates an 'Add Set' button
      var newSetButton = document.createElement('button')
      newSetButton.textContent = 'Add Set'
      newSetButton.id = 'addSetBtn'

    // creates an 'delete exercise' button
      var deleteExerciseBtn = document.createElement('button')
      deleteExerciseBtn.textContent = 'Delete Exercise'
      deleteExerciseBtn.id = 'deleteExerciseBtn'

    // creates an 'Add Set' Wrapper
      var setContainer = document.createElement('div')
      setContainer.id = 'setContainer'

    // creates a 'H3' of the exercise name
      var exerciseHeading = document.createElement('h3')
      exerciseHeading.textContent = workout.exercises[i].exerciseName

    // appends the 'H3' to the exercise Wrapper
      newExerciseWrapper.appendChild(exerciseHeading)
    // appends the 'AddSetWrapper' to the exercise Wrapper
      newExerciseWrapper.appendChild(setContainer)
    // appends the 'Add Set' button to the exercise Wrapper
      newExerciseWrapper.appendChild(newSetButton)
    // appends the 'Add Set' button to the exercise Wrapper
      newExerciseWrapper.appendChild(deleteExerciseBtn)
    // appends the 'newExerciseWrapper' to the allExercises div
      exerciseContainer.appendChild(newExerciseWrapper)

      // SETS Loop
      for(var j = 0; j < workout.exercises[i].sets.length ; j++){
        // create new set dom input elements
          var setNumber = document.createElement('p')
          var newSetWeight = document.createElement('input')
          newSetWeight.className = 'weight'
          var newSetReps = document.createElement('input')
          newSetReps.className = 'rep'
          var newSetCheckbox = document.createElement('input')
          var newSetDeleteButton = document.createElement('button')
        // create set container div
          var newSetDiv = document.createElement('div')
        // add 'setDiv' id
          newSetDiv.id = workout.exercises[i].sets[j].setId
        // set Number <p>

          // if(j === 0){
          //   var setCount = 1
          // }else{
          //   setCount = j + 1
          // }

          setNumber.textContent = 'set # ' + j
        //  assign Id to Checkbox
          newSetCheckbox.id = 'setCheckbox'


        // assign input types and placeolder to input elements
          newSetWeight.setAttribute("type", "text");
          newSetWeight.setAttribute("name", "Weight")
          newSetWeight.placeholder = 'Weight'
          newSetReps.setAttribute("type", "text");
          newSetReps.placeholder = 'Reps'
          newSetCheckbox.setAttribute("type", "checkbox");
          if(workout.exercises[i].sets[j].completed === true){
            newSetCheckbox.checked = true
          }
          newSetDeleteButton.textContent = "Delete Set"
          newSetDeleteButton.id = "deleteSetBtn"

        // append set elements to set div
          newSetDiv.appendChild(setNumber)
          newSetDiv.appendChild(newSetWeight)
          newSetDiv.appendChild(newSetReps)
          newSetDiv.appendChild(newSetCheckbox)
          newSetDiv.appendChild(newSetDeleteButton)

          setContainer.appendChild(newSetDiv)
      }
    }


// add eventListeners to weightinputs
    for(var i = 0; i < weightInput.length; i++){

      weightInput[i].addEventListener('blur', function(event){

      var inputValue = Number.parseInt(this.value)

      const weightInput = event.target

        if(weightInput.className === 'weight'){
          const exerciseParent = weightInput.parentNode.parentNode.parentNode
          const setParent = weightInput.parentNode
          workout.exercises.forEach(function(el,i){
            console.log('exerciseIde = ' + el.exerciseId + 'exercise index = ' + i )
            if(el.exerciseId === exerciseParent.id){
              workout.exercises[i].sets.forEach(function(set,seti){
                if(set.setId === setParent.id){
                  if(isNaN(inputValue)){
                    weightInput.value = 0
                  }else{
                    set.weight = inputValue
                    weightInput.value = inputValue
                    console.log(workout.exercises[i].sets[seti])
                  }

                }
              })
            }
          })
        }
      })
    }
// add eventListeners to reps

for(var i = 0; i < repInput.length; i++){

  repInput[i].addEventListener('blur', function(event){

  var inputValue = Number.parseInt(this.value)

  const repInput = event.target

    if(repInput.className === 'rep'){
      const exerciseParent = repInput.parentNode.parentNode.parentNode
      const setParent = repInput.parentNode
      workout.exercises.forEach(function(el,i){
        console.log('exerciseId = ' + el.exerciseId + 'exercise index = ' + i )
        if(el.exerciseId === exerciseParent.id){
          workout.exercises[i].sets.forEach(function(set,seti){
            if(set.setId === setParent.id){
              if(isNaN(inputValue)){
                set.reps = 0
              }else{
                set.reps = inputValue
                repInput.value = inputValue
                console.log(workout.exercises[i].sets[seti])}


            }
          })
        }
      })
    }
  })
}



    // make the placeholder of all sets the current value
    // we need to get all allExercises
    // then we need all SETS
    // then we need to loop through all sets and make the place holder of the corresponding input = to the input Value

    function getSetsValue(){
      const weightArray = []
      const repsArray = []
    // Puts all rep and weight values into the above arrays
      let exercises = workout.exercises
      for(var i = 0; i < exercises.length; i ++){

        let sets = exercises[i].sets

        for(var s = 0; s < sets.length; s++){
          weightArray.push(sets[s].weight)
          repsArray.push(sets[s].reps)
        }
      }
      // Assigns the placeholder value of weightInput and repsInput to the corresponding values of weightArray and repsArray
      for(var i = 0; i < weightInput.length; i++){
        weightInput[i].placeholder = weightArray[i].toString() + ' Kg'
        repInput[i].placeholder = repsArray[i].toString() + ' Reps'
      }
    }

    getSetsValue()

  },
  addSet:function(exerciseId){
    // I named both the element id and the exercise objects 'exerciseId' the same so we can find the positon
  	var exercises = workout.exercises
  	var setObject = {
        setId:uuid(),
        reps:0,
        weight:0,
        completed: false
      }

      for (var i = 0; i < exercises.length; i++){
        if(exercises[i].exerciseId === exerciseId)
        exercises[i].sets.push(setObject)
      }


  	console.log('a set was born to the exercise with an id of ' + exerciseId)
    Controller.displayExercises()
  },

  deleteSet: function(exerciseId, setId){
// Loops through object exercises array
  for( var i = 0; i < workout.exercises.length; i++){
// if the exercise id === the elements id then we have found the [i] ( index )
    if(exerciseId === workout.exercises[i].exerciseId)
// We'll nest another loop if once we've found the correct exercise and loop through the array of sets for that exercise
    for(var j = 0; j < workout.exercises[i].sets.length; j ++){
// If the object setID is === the element set id then we've found the set index taht we need from the array.
    if(setId === workout.exercises[i].sets[j].setId)
      workout.exercises[i].sets.splice( j , 1 )
    }
  }
  Controller.displayExercises()
},
  deleteExercise:function(exerciseArrayPosition){
    workout.exercises.splice(exerciseArrayPosition,1)
    Controller.displayExercises()
},

saveCheckedSets: function(){},
    // we want to save the sets that have the checkbox checked.
    // Once the check box is checked, we want to update that exercise object with the current values of the weight and reps inputs
    // if a user clicks out of the input

saveWorkout: function(){
    // get exercises objects and save them to local storage
    // var workout = window.workout.exercises
    workout.workoutId = uuid()
    workout.workoutDate = Date.now()

    for(var i = 0; i < workout.exercises.length; i++){

      workout.exercises[i].sets
      const filteredSet = workout.exercises[i].sets.filter( function(set){
      	return set.completed === true
      })
      workout.exercises[i].sets = []
      workout.exercises[i].sets.push(filteredSet)
    }

    localStorage.setItem("workout" + localStorage.length, JSON.stringify(workout))
    // set the exercise container to zero
    exerciseContainer.innerHTML = ''
    workout.exercises = []

}
}
