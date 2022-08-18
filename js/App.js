class App{
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root,this._handlers());

        this._refreshNotes();
    }
    _refreshNotes(){
        const notes =NoteAPI.getAllNotes();

        this._setNotes(notes);

        if(notes.length > 0){
            this._setActiveNote(notes[0]);
        }
    }


    _setNotes(notes){
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updatedNotePreviewVisibility(notes.length > 0);

    }
    _setActiveNote(note){
        this.activeNote=note;
        this.view.updatedActiveNote(note);
    }

    _handlers(){
        return {
            onNoteSelect:noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId );
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote ={
                    title: "New Note",
                    body: "Take note..."
                };
                NoteAPI.saveNotes(newNote);
                this._refreshNotes();
            },
            onNoteEdit:(title,body) => {
                NoteAPI.saveNotes({
                    id: this.activeNote.id,
                    title,
                    body

                });

                this._refreshNotes();


            },
            onNoteDelete:noteId => {
                NoteAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        }
    }
}