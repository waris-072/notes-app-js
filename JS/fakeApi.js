export function addNoteApi(note) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const isSuccess = Math.random() > 0.3; // 70% success rate
            if (isSuccess) {
                resolve({  
                    status: "success",
                    data: note
                });
            } else {
                reject({ 
                    status: "error",
                    message: "Failed to add note. Please try again." 
                });
            }
        }, 2500);
    });
}

export function dltNoteApi(noteId){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            const isSuccess = Math.random() > 0.3; // 70% success rate
            if(isSuccess){
                resolve({
                    status: "success",
                    data: noteId
                });
            }else{
                reject({
                    status: "error",
                    message:"Delete failed try again..!"
                });            
            }
        }, 1000);
    });
}

export function updateNoteApi(noteId, updatedData){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{ 
            const isSuccess = Math.random() > 0.3; // 70% success rate
            if(isSuccess){
                resolve({
                    status: "success",
                    data: {id: noteId, ...updatedData}
                });
            }else{
                reject({
                    status: "error",
                    message:"Edit failed try again..!"
                });
            }
        }, 1000);
    });
}