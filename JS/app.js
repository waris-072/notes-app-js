import { addNoteApi, dltNoteApi, updateNoteApi } from "./fakeApi.js";
import {
    getState,
    setNotes,
    pushNote,
    removeNote,
    updateNote,
    setEditNoteId,
    clearEditNoteId,
    getEditNoteId
} from "./state.js";

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


// ========================
// ADD / EDIT HANDLER
// ========================
async function handleFormSubmit(e){
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const category = categoryInput.value.trim();

    if(title === "" || content === "") return;

    const noteData = { title, content, category };

    setLoadingUI(true);

    try {

        // ================= EDIT MODE =================
        if(getEditNoteId()){
            const id = getEditNoteId();
            const response = await updateNoteApi(id, noteData);
            updateNote(id, response.data);
            clearEditNoteId();       // null
            saveBtn.innerText = "Add Note";

        } 

        // ================= ADD MODE =================
        else {
            const noteObj = {
                id: Date.now().toString(),
                ...noteData,
                createdAt: new Date().toLocaleString()
            };
            const response = await addNoteApi(noteObj);

            pushNote(response.data);
        }

        syncUI();
        clearForm();

    } catch(error){
        alert(error.message);
    }

    setLoadingUI(false);
}


// ========================
// EVENT: SUBMIT
// ========================
saveBtn.addEventListener("click", handleFormSubmit);


// ========================
// DELETE HANDLER
// ========================
document.addEventListener("click", async function (e) {

    const dltBtn = e.target.closest(".deleteBtn");
    if(!dltBtn) return;

    const noteId = dltBtn.dataset.id;

    dltBtn.disabled = true;

    try {
        const response = await dltNoteApi(noteId);

        removeNote(response.data);

        syncUI();

    } catch(error){
        alert(error.message);
    } finally {
        dltBtn.disabled = false;
    }
});


// ========================
// EDIT CLICK HANDLER
// ========================
document.addEventListener("click", function(e){

    const editBtn = e.target.closest(".editBtn");
    if(!editBtn) return;

    const noteId = editBtn.dataset.id;
    const { notes } = getState();
    
    const note = notes.find(n => n.id === noteId);
    if(!note) return;

    titleInput.value = note.title;
    contentInput.value = note.content;
    categoryInput.value = note.category;

    saveBtn.innerText = "Update Note";

    setEditNoteId(noteId);
});


// ========================
// SYNC FUNCTION (IMPORTANT)
// ========================
function syncUI() {
    const notes = getState().notes;
    saveNotes(notes);
    renderNotes(notes);
}


// ========================
// LOADING UI
// ========================
function setLoadingUI(isLoading) {
    saveBtn.disabled = isLoading;
    saveBtn.innerText = isLoading ? "Loading..." : "Add Note";
}