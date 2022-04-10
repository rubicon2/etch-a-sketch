const sketchpad = document.getElementById("sketchpad");
const rSlider = document.getElementById("r-slider");
const gSlider = document.getElementById("g-slider");
const bSlider = document.getElementById("b-slider");
const colorPreview = document.getElementById("color-preview");
const resetMessage = "Set resolution (8 - 100):";
const minResolution = 8;
const maxResolution = 100;
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

// function RGBToCss(rgb) {
//     return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
// }

function RGBToCss(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

function paintElement() {
    let elementColor = this.currentColor;
    let newColor = avgRGB(elementColor, currentRGB);
    this.currentColor = RGBToCss(newColor[0], newColor[1], newColor[2]);
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

function clearDivsGrid() {
    let divs = document.querySelectorAll("#sketchpad > div");
    for(let i = 0; i < divs.length; i++) {
        divs[i].remove();
    }
}

function createDivsGrid(rows) {
    if (rows < minResolution) 
        rows = minResolution;
    else if (rows > maxResolution) {
        rows = maxResolution;
    }
    let totalDivs = rows * rows;
    let sizeAsPercentageOfGrid = 100 / rows;
    for(let i = 0; i < totalDivs; i++) {
        sketchpad.appendChild(createDiv(sizeAsPercentageOfGrid));
    }
}

function resetGrid() {
    clearDivsGrid();
    createDivsGrid(prompt(resetMessage, 16));
}

function setRGB() {
    currentRGB = RGBToCss(rSlider.value, gSlider.value, bSlider.value);
    colorPreview.style.backgroundColor = currentRGB;
}

function randomiseColor() {
    let randomRGB = [
        Math.floor(Math.random() * 255), 
        Math.floor(Math.random() * 255), 
        Math.floor(Math.random() * 255), 
    ]
    currentRGB = RGBToCss(randomRGB[0], randomRGB[1], randomRGB[2]);
}

window.addEventListener("resize", initSketchpad);

rSlider.oninput = setRGB;
gSlider.oninput = setRGB;
bSlider.oninput = setRGB;

initSketchpad();
setRGB();
createDivsGrid(prompt(resetMessage, 16));