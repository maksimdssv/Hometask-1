import {checkDates} from "../helpers.js";

export default function NoteDetails(item) {
    const {name, creationDate, category, content} = item;
    const container = document.createElement("div");
    container.className = "placeholder";
    container.id = "placeholder";

    const dates = checkDates(content);

    container.insertAdjacentHTML("beforeend", `<h2>Name</h2><p>${name}</p><h2>Date of Creation</h2>
    <p>${creationDate}</p><h2>Category</h2><p>${category}</p><h2>Content</h2><p>${content}</p><h2>Dates</h2>
    <p>${dates !== null ? dates : ""}</p>`);

    return container;
}