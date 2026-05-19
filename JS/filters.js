export function filterNotesByCategory(notes, category){
    if (category === "all") return notes;
    return notes.filter(note => note.category === category);
}

export function sortNotes(notes, sortBy){
    if(sortBy === "az"){
        return [...notes].sort((a,b) => a.title.localeCompare(b.title));
    }
    else if(sortBy === "za"){
        return [...notes].sort((a,b) => b.title.localeCompare(a.title));
    }
    else if(sortBy === "oldest"){
        return [...notes].sort((a,b) => a.createdAt - b.createdAt);
    }else if(sortBy === "newest"){
        return [...notes].sort((a,b) => b.createdAt - a.createdAt);
    }
}

export function searchNotesByTitle(notes, query){
    if(!query) return notes;
    return notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()));
}