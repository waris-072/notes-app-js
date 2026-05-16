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
   state.notes.push(note);
}

export { getState, setNotes, pushNote };