class NoteAPI{
    static getAllNotes(){
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");//Transform string to object

        return notes.sort((a,b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });

    }
    static saveNotes(noteToSave){
        
        const notes = NoteAPI.getAllNotes();
        
        const existing = notes.find(notes => notes.id == noteToSave.id);
        
        //Edit/Update
        if(existing){
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        }
        else{
            noteToSave.id = Math.floor(Math.random()*100000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }
        
        

        
        localStorage.setItem("notesapp-notes",JSON.stringify(notes));//Trasform object to string
    }
    static deleteNote(id){
        const notes = NoteAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes",JSON.stringify(newNotes));
    }
}