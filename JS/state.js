const state = {
   notes: [],
   editNoteId: null,
   selectedCategory: "all",
   searchQuery: "",
   sortBy: "newest",
   loading: false
}

function getState() {
   return state;
}

function setNotes(notes) {
   state.notes = notes;
}

// used for push note obj in notes array
function pushNote(note) {
   state.notes.push(note);
}

// used for delete note 
function removeNote(noteId){
   state.notes = state.notes.filter(note => String(note.id) !== String(noteId));
}

// used for  edit/update the note
function updateNote(noteId, updatedData){
   state.notes = state.notes.map(note =>
      String(note.id) === String(noteId) ? {...note, ...updatedData} : note
   ); 
}

// functions for editNoteId values
                   // set id for note that are being edited 
function setEditNoteId(id) {
   state.editNoteId = id;
}

                   // Initial state 
function clearEditNoteId() {
   state.editNoteId = null;  
}
                   // Instead of globally call using it... 
function getEditNoteId() {
   return state.editNoteId;
}

   // functions for categoryFilters... 
function setSelectedCategory(category){
   return state.selectedCategory = category;
}
function getSelectedCategory(){
   return state.selectedCategory;
}

// functions for sorting... 
function setSorting(sort){
   return state.sortBy = sort;
}
function getSorting(){
   return state.sortBy;
}

// functions for sorting... 
function setSearchQuery(query){
   return state.searchQuery = query;
}
function getSearchQuery(){
   return state.searchQuery;
}

export { getState, setNotes, pushNote, removeNote, updateNote, setEditNoteId, clearEditNoteId, getEditNoteId, getSelectedCategory, setSelectedCategory, setSorting, getSorting, setSearchQuery, getSearchQuery };