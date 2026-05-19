import { addNoteApi, dltNoteApi, updateNoteApi } from "./fakeApi.js";
import {
    getState,
    setNotes,
    pushNote,
    removeNote,
    updateNote,
    setEditNoteId,
    clearEditNoteId,
    getEditNoteId,
    setSelectedCategory,
    getSelectedCategory,
    setSorting,
    getSorting,
    setSearchQuery,
    getSearchQuery
} from "./state.js";
import { filterNotesByCategory, sortNotes, searchNotesByTitle} from "./filters.js";
import { saveNotes, loadNotes } from "./storage.js";
import { renderNotes, clearForm, updateNotesCount, setSaveStatus, initHeaderUI, openNoteModal, closeNoteModal } from "./ui.js";

//form element references ...
let titleInput = document.getElementById("titleInput");
let contentInput = document.getElementById("contentInput");
let categoryInput = document.getElementById("categoryInput");
let saveBtn = document.getElementById("saveBtn");
// filter element references...
let categoryFilter = document.getElementById("categoryFilter");
let sortFilter = document.getElementById("sortFilter");
let searchInput = document.getElementById("searchInput");
let clearFiltersBtn = document.getElementById("clearFiltersBtn");

// Initial loading helper...
function init() {
    const notes = loadNotes();
    setNotes(notes);
    renderProcessedNotes();
    
    initHeaderUI(notes);
    clearForm();
}

init();

// Event handler for add and edit note...
async function handleFormSubmit(e){
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const category = categoryInput.value.trim();

    if(title === "" || content === "") return;

    const noteData = { title, content, category };
    setSaveStatus("Saving...");
    setLoadingUI(true);

    try {
        // edit note...
        if(getEditNoteId()){
            const id = getEditNoteId();
            const response = await updateNoteApi(id, noteData);
            updateNote(id, response.data);
            clearEditNoteId();      
            saveBtn.innerText = "Add Note";

        } 

        // add note...
        else {
            const noteObj = {
                id: Date.now().toString(),
                ...noteData,          
                createdAt: Date.now(),
                formattedDate: new Date().toLocaleString()
            };
            const response = await addNoteApi(noteObj);

            pushNote(response.data);
        }

        const notes = getState().notes;
        saveNotes(notes);
        renderProcessedNotes();
        updateNotesCount(notes);
        setSaveStatus("All changes saved"); 
        clearForm();

    }catch(error){
        setSaveStatus("Error saving changes");
        alert(error.message);
    }

    setLoadingUI(false);
}
// form listener for add and update note...
saveBtn.addEventListener("click", handleFormSubmit);

// Event listener for delete note...
document.addEventListener("click", async function (e) {

    const dltBtn = e.target.closest(".deleteBtn");
    if(!dltBtn) return;
    const noteId = dltBtn.dataset.id;

    dltBtn.disabled = true;

    try {
        const response = await dltNoteApi(noteId);

        removeNote(response.data);

        const notes = getState().notes;
        saveNotes(notes);
        renderProcessedNotes();
        updateNotesCount(notes);
        setSaveStatus("All changes saved");

    } catch(error){
        alert(error.message);
    } finally {
        dltBtn.disabled = false;
    }
});

// Event listener for edit note...
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

// handler for categories...
function handleCategoryFilter(e){
    setSelectedCategory(e.target.value);
    renderProcessedNotes();
}
// listener
categoryFilter.addEventListener("change", handleCategoryFilter);

// handler for sorting...
function handleSorting(e){
    setSorting(e.target.value);
    renderProcessedNotes();
}
// listener
sortFilter.addEventListener("change", handleSorting);

// handler for search query...
function handleSearch(e){
    setSearchQuery(e.target.value);
    renderProcessedNotes();
}
// listener
searchInput.addEventListener("input", handleSearch);

// handler for clear filters...
function handleClearFilters(){
    setSelectedCategory("all");
    setSearchQuery("");
    setSorting("newest");

    categoryFilter.value = "all";
    searchInput.value = "";
    sortFilter.value = "newest";

    renderProcessedNotes();
}
//listener
clearFiltersBtn.addEventListener("click", handleClearFilters);


// Renederer function for filters, sorting, and searching...
function renderProcessedNotes(){
    const {notes} = getState();

    const currentCategory = getSelectedCategory();
    const currentSorted = getSorting();
    const currentSearchQuery = getSearchQuery();


    const filteredNotes = filterNotesByCategory(notes, currentCategory);
    const sortedNotes = sortNotes(filteredNotes, currentSorted);
    const searchFilteredNotes = searchNotesByTitle(sortedNotes, currentSearchQuery);

    renderNotes(searchFilteredNotes);
}

// ui loading...
function setLoadingUI(isLoading) {
    saveBtn.disabled = isLoading;
    saveBtn.innerText = isLoading ? "Loading..." : "Add Note";
}

// Event listener for open modal note...
document.addEventListener("click", function(e){
    const viewBtn = e.target.closest(".viewBtn");
    if(!viewBtn) return;

    const noteId = viewBtn.dataset.id;
    const { notes } = getState();
    const note = notes.find(n => n.id === noteId);
    if(!note) return;

    openNoteModal(note);
});

// Event listener for close modal note...
document.addEventListener("click", function(e){

    if(e.target.closest("#closeModalBtn") || e.target.id === "noteModal"){
        closeNoteModal();
    }

});