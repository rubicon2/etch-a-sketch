const sketchpad = document.getElementById("sketchpad");
const colorInfo = document.getElementById("currentColor");
let currentRGB = "rgb(255, 255, 255)";

function initSketchpad() {
    setHeightToWidth(sketchpad);
}

function setWidthToHeight(element) {
    element.style.width = window.getComputedStyle(element, null).getPropertyValue("height");
}

function setHeightToWidth(element) {
    element.style.height = window.getComputedStyle(element, null).getPropertyValue("width");
}

function cssToRGB(string) {
    // Remove start and end rgba( and closing ).
    string = string.substring(4, string.length - 1);
    let rgb = string.split(",");
    // Remove spaces and commas
    for(let i = 0; i < rgb.length; i++) {
        // Preface with + to cast from string to number.
        rgb[i] = +rgb[i].trim();
    }
    return rgb;
}

function avgRGB(color1, color2) {
    // Set this up to calculate mean of the 2 rgb values, not the sum! 
    let rgb1 = cssToRGB(color1);
    let rgb2 = cssToRGB(color2); 
    let avgRgb = [
        (rgb1[0] + rgb2[0]) / 2,
        (rgb1[1] + rgb2[1]) / 2,
        (rgb1[2] + rgb2[2]) / 2
    ]
    return avgRgb;
}

function RGBToCss(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function paintElement() {
    let elementColor = this.currentColor;
    this.currentColor = RGBToCss(avgRGB(elementColor, currentRGB))
    this.style.backgroundColor = this.currentColor; 
}

function createDiv(sizeAsPercentageOfGrid) {
    let newDiv = document.createElement("div");
    newDiv.currentColor = "rgb(127, 255, 212)";
    newDiv.classList.add("quadrant");
    newDiv.style.width = `${sizeAsPercentageOfGrid}%`;
    newDiv.style.height = `${sizeAsPercentageOfGrid}%`;
    newDiv.addEventListener("mouseenter", paintElement);
    return newDiv;
}

function createDivsGrid(rows) {
    let totalDivs = rows * rows;
    let sizeAsPercentageOfGrid = 100 / rows;
    for(let i = 0; i < totalDivs; i++) {
        sketchpad.appendChild(createDiv(sizeAsPercentageOfGrid));
    }
}

function randomiseColor() {
    let randomRGB = [
        Math.floor(Math.random() * 255), 
        Math.floor(Math.random() * 255), 
        Math.floor(Math.random() * 255), 
    ]
    currentRGB = RGBToCss(randomRGB);
    colorInfo.style.color = currentRGB;
    colorInfo.textContent = currentRGB;

}

window.addEventListener("resize", initSketchpad);
window.addEventListener("click", randomiseColor);
initSketchpad();
createDivsGrid(16);
