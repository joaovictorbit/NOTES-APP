
const app = document.getElementById("app");

const view = new NotesView(app,{
     onNoteAdd(){
        console.log("Let's add a note");
    },
    onNoteSelect(id){
        console.log("Note Selected:" +id);
    },
    onNoteDelete(id){
        console.log("Note DELETED:" +id);
    },

    onNoteEdit(newTitle,newBody){
        console.log(newTitle);
        console.log(newBody);
    },

    }
);0

view.updateNoteList(NoteAPI.getAllNotes());