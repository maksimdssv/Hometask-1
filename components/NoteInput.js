export function NoteInput(item, onSave) {
    function sendData(){
        const name = document.querySelector("#nameInput").value;
        const category = document.querySelector("#categoryInput").value;
        const content = document.querySelector("#contentInput").value;
        onSave({...item, name, category, content});
    }

    const {name, category, content} = item ?? {name: "", category: "", content: "", id: ""};
    const container = document.createElement("div");
    container.className = "placeholder";
    container.id = "placeholder";

    const children = `
    <label for="nameInput">Name</label>
    <input id="nameInput" value="${name}">
    <label for="categoryInput">Category</label>
    <select id="categoryInput">
        <option value="Task" ${"Task" === category ? "selected" : ""}>Task</option>
        <option value="Quote" ${"Quote" === category ? "selected" : ""}>Quote</option>
        <option value="Random Thought" ${"Random Thought" === category ? "selected" : ""}>Random Thought</option>
        <option value="Idea" ${"Idea" === category ? "selected" : ""}>Idea</option>
    </select>
    <label for="contentInput">Content</label>
    <textarea id="contentInput">${content}</textarea>`;

    container.insertAdjacentHTML("beforeend", children);

    const buttonNode = document.createElement("button");
    buttonNode.type ="button";
    buttonNode.onclick= sendData;
    buttonNode.innerText = "Save";

    container.append(buttonNode);

    return container;
}