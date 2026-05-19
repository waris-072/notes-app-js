
let notesCountEl = document.getElementById("notesCount");
let saveStatusEl = document.getElementById("saveStatus");

export function updateNotesCount(notes) {
    notesCountEl.innerText = `${notes.length} Notes`;
}

export function setSaveStatus(status) {
    saveStatusEl.innerText = status;
}

export function initHeaderUI(notes) {
    updateNotesCount(notes);
    setSaveStatus("All changes saved");
}

// clear form...
function clearForm(){
    document.getElementById("titleInput").value = "";
    document.getElementById("contentInput").value = "";
    document.getElementById("categoryInput").value = "work";

}

// Rendering ui...
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
            <p class="noteContent">${note.content.slice(0,300)}</p>
            <div class="noteDate">
                ${note.formattedDate}
                <div class="noteActions">
                    <button class="viewBtn" data-id="${note.id}"><i class="fa-solid fa-book-open"></i></button>
                    <button class="editBtn" data-id="${note.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="deleteBtn" data-id="${note.id}"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div> `; 
           

        notesContainer.appendChild(noteElement);
    });
}

// Modal ui...
const noteModal = document.getElementById("noteModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalContent = document.getElementById("modalContent");
const modalDate = document.getElementById("modalDate");

function openNoteModal(note){
    modalTitle.innerText = note.title.toUpperCase();
    modalCategory.innerText = note.category;
    modalContent.innerText = note.content;
    modalDate.innerText = note.formattedDate;
    noteModal.classList.add("show");
}

function closeNoteModal(){
    noteModal.classList.remove("show");
}

export { clearForm, renderNotes, closeNoteModal, openNoteModal };