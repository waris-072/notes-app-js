import { addNoteApi } from "./fakeApi.js";
import { getState, pushNote, setNotes } from "./state.js";
import { saveNotes, loadNotes } from "./storage.js";
import { renderNotes, clearForm } from "./ui.js";


let titleInput = document.getElementById("titleInput");
let contentInput = document.getElementById("contentInput");
let categoryInput = document.getElementById("categoryInput");
let saveBtn = document.getElementById("saveBtn");

function init() {
    const notes = loadNotes();
    setNotes(notes);
    renderNotes(notes);
    clearForm();
}

init();


async function handleFormSubmit(e){
    e.preventDefault();
    let title = titleInput.value.trim();
    let content = contentInput.value.trim();
    let category  = categoryInput.value.trim();

    if(title === "" || content === "") return;

    let noteObj = {id:Date.now().toString() , title, content, category, createdAt: new Date().toLocaleString()}

    try {
        const response = await addNoteApi(noteObj);
        pushNote(response.data);
        
        const notes = getState().notes;
        saveNotes(notes);
        renderNotes(notes);
        
        clearForm();
    } catch (error) {
        alert(error.message);
    }
}

saveBtn.addEventListener("click", handleFormSubmit);