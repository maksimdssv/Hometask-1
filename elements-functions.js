export function removeElementFromDom(id) {
    const element = document.querySelector(`#${id}`);
    element.remove();
    return element;
}

export function addElementToTable(tableId, element){
    const table = document.querySelector(`${tableId} tbody`);
    table.append(element);
}

export function scrollTo(id){
    const link = document.createElement("a");
    link.href = id;
    link.click();
}