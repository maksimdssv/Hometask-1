import {checkDates} from "../helpers.js";
import ImgBtn from "./ImgBtn.js";
import NoteDetails from "./NoteDetails.js";
import {scrollTo} from "../elements-functions.js";

export default function Note(item, onBtnClick) {

    const {name, creationDate, category, content, id} = item;

    const newRow = document.createElement("tr");
    newRow.className = "note";
    newRow.id = id;

    const nameNode = document.createElement('td');
    const imgNode = document.createElement("img");
    imgNode.className = "image";
    imgNode.alt = category;
    switch (category) {
        case "Task":
            imgNode.src = 'images/cart.png';
            break;
        case "Idea":
            imgNode.src = 'images/bulb.png';
            break;
        case "Quote":
            imgNode.src = 'images/quote.png'
            break;
        case "Random Thought":
            imgNode.src = 'images/settings.png';
            break;
    }
    nameNode.append(imgNode);
    nameNode.append(name);

    const dateNode = document.createElement("td");
    dateNode.innerText = creationDate;

    const categoryNode = document.createElement("td");
    categoryNode.innerText = category;

    const contentNode = document.createElement("td");
    contentNode.innerText = content;

    const datesNode = document.createElement("td");
    const dates = checkDates(content);
    if (dates !== null) {
        datesNode.append(dates.join(", "));
    }

    const buttonsNode = document.createElement("td");

    const infoButtonNode = ImgBtn('images/info.png', "info", () => {
        document.querySelector("#placeholder").replaceWith(NoteDetails(item));
        scrollTo("#placeholder");
    });

    const editButtonNode = ImgBtn('images/pencil.png', "edit", () => {
        onBtnClick("EDIT", item);
    });
    const archiveButtonNode = ImgBtn("images/archive.png", "archive", () => {
        onBtnClick("ARCHIVE", item);
    });
    const deleteButtonNode = ImgBtn("images/delete.png", 'delete', () => {
        onBtnClick("DELETE", item);
    });

    buttonsNode.append(infoButtonNode);
    buttonsNode.append(editButtonNode);
    buttonsNode.append(archiveButtonNode);
    buttonsNode.append(deleteButtonNode);

    newRow.append(nameNode);
    newRow.append(dateNode);
    newRow.append(categoryNode);
    newRow.append(contentNode);
    newRow.append(datesNode);
    newRow.append(buttonsNode);

    return newRow;
}