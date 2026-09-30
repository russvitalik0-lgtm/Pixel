const w = 50
const h = 30
let PENDOWN = false

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
fill.addEventListener('click', function() {
    let pixels = document.querySelectorAll('.pixel')
    for (let pixel of pixels) {
        pixel.style.backgroundColor = color
    }
})

grid.addEventListener('mousedown', function() { PENDOWN = true })
grid.addEventListener('mouseup', function() { PENDOWN = false })