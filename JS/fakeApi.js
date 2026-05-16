export function addNoteApi(note) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; // 50% success rate
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

