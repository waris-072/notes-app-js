function clearForm(){
    document.getElementById("titleInput").value = "";
    document.getElementById("contentInput").value = "";
    document.getElementById("categoryInput").value = "work";

}

function renderNotes(notes){
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("noteCard");
        noteElement.classList.add(note.category);

        const emptyState = document.getElementById("emptyState");
        if(emptyState) emptyState.remove();

       noteElement.innerHTML = `
            <h3 ${note.category}>${note.title.toUpperCase()}</h3>
            <div class="noteCategory ${note.category}">${note.category}</div>
            <p class="noteContent">${note.content}</p>
            <div class="noteDate">${note.createdAt}</div> `; 
           

        notesContainer.appendChild(noteElement);
    });
}

export { clearForm, renderNotes };