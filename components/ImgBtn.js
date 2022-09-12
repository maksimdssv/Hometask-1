export default function ImgBtn(imgPath, alt, onClick) {
    const buttonNode = document.createElement("button")
    buttonNode.addEventListener("click", onClick);
    buttonNode.className = "btn";

    const btnImgNode = document.createElement("img");
    btnImgNode.src = imgPath;
    btnImgNode.alt = alt;

    buttonNode.append(btnImgNode);

    return buttonNode;
}