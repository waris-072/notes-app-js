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

function pushNote(note) {
   state.notes.unshift(note);
}

function removeNote(noteId){
   state.notes = state.notes.filter(note => String(note.id) !== String(noteId));
}

function updateNote(noteId, updatedData){
   state.notes = state.notes.map(note =>
      String(note.id) === String(noteId) ? {...note, ...updatedData} : note
   ); 
}

function setEditNoteId(id) {
   state.editNoteId = id;
}

function clearEditNoteId() {
   state.editNoteId = null;
}
function getEditNoteId() {
   return state.editNoteId;
}

export { getState, setNotes, pushNote, removeNote, updateNote, setEditNoteId, clearEditNoteId, getEditNoteId};