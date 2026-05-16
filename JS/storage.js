function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    try {
        let data = localStorage.getItem("notes");
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

export { saveNotes, loadNotes };