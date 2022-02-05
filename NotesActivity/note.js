function saveNote(){
    var currentDateAndTime = new Date()
    var aNoteDescription = document.getElementById("note-title").value
    var aNoteText = document.getElementById("note-inputs").value
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
  document.getElementById("note-title").value = null
  document.getElementById("note-inputs").value = null
  showAllNotes()
}
function showAllNotes(){
  var storedNotesString = localStorage.getItem("all_notes")
  allNotes = JSON.parse(storedNotesString)
  if (allNotes != null){
        var noteDisplayer = document.getElementById("display-notes")
        noteDisplayer.innerHTML = null
        var numberOfNotes = allNotes.length
        for (var i = 0; i < allNotes.length; i++) {
            var aNote = allNotes[i]
            noteDisplayer.innerHTML += "<hr><p>"+ aNote +"</p>"
        }
    }
}