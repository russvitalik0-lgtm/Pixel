const w = 50
const h = 30
let PENDOWN = false
let EQUIPPED = false
let GRIDOFF = true
let cur_tool = 0

// Импорты
let grid = document.querySelector('.grid')
let draw = document.querySelector('#Draw')
let eraser = document.querySelector('#Eraser')
let fill = document.querySelector('#Fill')
let gridOn = document.querySelector('#GridOn')
let undo = document.querySelector('#Undo')
let trashcan = document.querySelector('#Delete')
let download = document.querySelector('#Download')
let save = document.querySelector('#Save')
let colorpicker = document.querySelector('#colorpicker')

let color = '#7c3aed'
let basecolor = '#ede9fe'
let basebordercolor = '#b9afcc'
let equippedcolor = '#7c3aed'
let equippedbordercolor = 'black'

// Массив
let tools = [draw, eraser, fill]
for (let tool of tools) {
    tool.addEventListener('click', function() {
        cur_tool = tool.id
        for (let tol of tools) {
            tol.style.backgroundColor = basecolor
            tol.style.border = `0.5px solid ${basebordercolor}`
        }
        tool.style.backgroundColor = equippedcolor
        tool.style.border = `1px solid ${equippedbordercolor}`
    })
}

colorpicker.addEventListener('input', (e) => { color = e.target.value}, false);
eraser.addEventListener('click', function() { color = grid.style.backgroundColor })
draw.addEventListener('click', function() { color = colorpicker.value })

function makeGrid(w, h) {
    grid.style.gridTemplateRows = `repeat(${h}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${w}, 0.6fr)`
    for (let i = 0; i<h; i+=1) {
        for (let j = 0; j<w; j+=1) {
            let pixel = document.createElement('div')
            pixel.classList.add('pixel')
            pixel.id = i+'-'+j
            pixel.addEventListener('click', function() {
                pixel.style.backgroundColor = color
            })
            pixel.addEventListener('mouseover', function() {
                if (PENDOWN) {
                    pixel.style.backgroundColor = color
                }
            })
            grid.appendChild(pixel)
        }
    }
}
makeGrid(w, h)

trashcan.addEventListener('click', function() {
    let pixels = document.querySelectorAll('.pixel')
    for (let pixel of pixels) {
        pixel.style.backgroundColor = grid.style.backgroundColor
    }
})
grid.addEventListener('click', function() {
    if (cur_tool == 'Fill') {
        let pixels = document.querySelectorAll('.pixel')
        for (let pixel of pixels) {
            pixel.style.backgroundColor = color
        }
    }
})

grid.addEventListener('mousedown', function() { PENDOWN = true })
grid.addEventListener('mouseup', function() { PENDOWN = false })

gridOn.addEventListener('click', function() {
    if (GRIDOFF) {
        gridOn.src = 'src/GridOff.svg'
        gridOn.style.backgroundColor = basecolor
        gridOn.style.border = `0.5px solid ${basebordercolor}`
    }
    else {
        gridOn.src = 'src/GridOn.svg'
        gridOn.style.backgroundColor = equippedcolor
        gridOn.style.border = `1px solid ${equippedbordercolor}`
    }
    let pixels = document.querySelectorAll('.pixel')
    for (let pixel of pixels) {
        if (GRIDOFF) {
            pixel.style.border = 'none'
        }
        else {
            pixel.style.border = '0.5px solid var(--sidebar-border)'
        }
    }
    GRIDOFF = !GRIDOFF
})

download.addEventListener('click', function() {
    domtoimage.toJpeg(grid, {quality: 2})
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        let link = document.createElement('a');
        link.download = 'pixel.jpg';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
})

function savecolors () {
    let pixels = document.querySelectorAll('.pixel')
    let colors = []
    for (let pixel of pixels) {
        colors.push(pixel.style.backgroundColor)
    }
    localStorage.setItem('colors', JSON.stringify(colors))
    save.style.backgroundColor = equippedcolor
}
save.addEventListener('click', savecolors)

setInterval(savecolors, 30000);

function loadcolors () {
    let pixels = document.querySelectorAll('.pixel')
    let colors = localStorage.getItem('colors')
    if (colors) {
        colors = JSON.parse(colors)
        for (let i = 0; i<colors.length; i++) {
            if (colors[i]) {
                pixels[i].style.backgroundColor = colors[i]
            }
            else {
                pixels[i].style.backgroundColor = grid.style.backgroundColor
            }
        }
    }
}

window.addEventListener('load', function() {
    loadcolors()
})