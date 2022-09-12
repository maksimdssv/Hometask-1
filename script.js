import DUMMY_NOTES from "./dummy-notes.js";
import {NoteInput} from "./components/NoteInput.js";
import Note from "./components/Note.js";
import {addElementToTable, removeElementFromDom, scrollTo} from "./elements-functions.js";
import {getCurrDate} from "./helpers.js";

function handleNoteCreation(data) {
    const currDate = getCurrDate();
    const newNote = {...data, creationDate: currDate, id: "q" + ++currId, archived: false};
    notesArr.push(newNote);
    updateSummary("ADD", data.category);
    addElementToTable("#notes", Note(newNote, handleBtnClick));
    document.querySelector("#placeholder").replaceChildren("Saved !");
}

function handleEditNote(data){
    const noteNode = document.querySelector(`#${data.id}`);
    noteNode.replaceWith(Note(data, handleBtnClick));
    document.querySelector("#placeholder").replaceChildren("Saved !");
}

function handleBtnClick(type, item) {
    switch (type) {
        case "ARCHIVE":
            removeElementFromDom(item.id)
            item.archived = !item.archived;
            console.log(item.archived);
            if (!item.archived) {
                addElementToTable("#notes", Note(item, handleBtnClick));
                updateSummary("UNARCHIVE", item.category)
            } else {
                addElementToTable("#archivedNotes", Note(item, handleBtnClick));
                updateSummary("ARCHIVE", item.category, item.archived);
            }
            break;
        case "DELETE":
            handleDelete(item.id, item.category, item.archived);
            break;
        case "EDIT":
            insertForm(item, handleEditNote);
            break;
    }
}

function handleDelete(id, category, archived) {
    if (confirm("Are you sure ?")) {
        notesArr.filter((item) => item.id !== id);
        removeElementFromDom(id);
        updateSummary("REMOVE", category, archived)
    }
}

function updateSummary(type, category, archived = false) {
    let id;
    switch (category) {
        case "Random Thought":
            id = "thought";
            break;
        default:
            id = category.toLowerCase();
    }
    const activeNode = document.querySelector(`#${id}Active`);
    const archivedNode = document.querySelector(`#${id}Archived`);
    switch (type) {
        case "ADD":
            activeNode.innerText = ++activeNode.innerText;
            break;
        case "REMOVE":
            if (archived) {
                archivedNode.innerText--;
            } else {
                activeNode.innerText--;
            }
            break
        case "ARCHIVE":
            archivedNode.innerText++;
            activeNode.innerText--;
            break;
        case "UNARCHIVE":
            archivedNode.innerText--;
            activeNode.innerText++;
    }
}

function insertForm(item = null, onSave) {
    document.querySelector("#placeholder").replaceWith(NoteInput(item, onSave));
    scrollTo("#placeholder");
}

let notesArr = [...DUMMY_NOTES];
let currId = notesArr.length;

document.querySelector("#addNote").addEventListener("click", () => {
    insertForm(null, handleNoteCreation)
});

document.querySelector("#showArchive").addEventListener("click", () => {
    const archivedNotes = document.querySelector("#archivedNotes");
    archivedNotes.className = archivedNotes.className ? "" : "hidden";
    const btn = document.querySelector("#showArchive");
    btn.innerText = btn.innerText === "Show archived notes" ? "Hide archived notes" : "Show archived notes";
    scrollTo("#archivedNotes");
});

notesArr.forEach((item) => {
    const newRow = Note(item, handleBtnClick);
    updateSummary("ADD", item.category);
    addElementToTable("#notes", newRow);
})

