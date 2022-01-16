function saveNote(){
    var currentDateAndTime = new Date()
    var aNoteDescription = document.getElementById("note-title").value
    var aNoteText = document.getElementById("note_input").value
    var aCompleteNote = currentDateAndTime.toLocaleString() + "--" + aNoteDescription 
    aCompleteNote += "<p>" + aNoteText + "</p>"

  var storedNotesString = localStorage.getItem("all_notes")
  var allNotes = JSON.parse(storedNotesString)
  if(allNotes == null){
      allNotes = []
  }
  allNotes.push(aCompleteNote)
  var allNotesString = JSON.stringify(allNotes)
  localStorage.setItem("all_notes",allNotesString)
  showAllNotes()
  document.getElementById("description_input").value = null
  document.getElementById("note_editor").value = null
}
function showAllNotes(){
  var storedNotesString = localStorage.getItem("all_notes")
  allNotes = JSON.parse(storedNotesString)
  if (allNotes != null){
        var noteDisplayer = document.getElementById("all_notes_display")
        noteDisplayer.innerHTML = null
        var numberOfNotes = allNotes.length
        for (var i = 0; i < allNotes.length; i++) {
            var aNote = allNotes[i]
            noteDisplayer.innerHTML += "<hr><p>"+ aNote +"</p>"
        }
    }
}