const w = 50
const h = 30
let grid = document.querySelector('.grid')
function makeGrid(w, h) {
    grid.style.gridTemplateRows = `repeat(${h}, 1fr)`
    grid.style.gridTemplateColumns = `repeat(${w}, 0.6fr)`
    for (let i = 0; i<h; i+=1) {
        for (let j = 0; j<w; j+=1) {
            let pixel = document.createElement('div')
            pixel.classList.add('pixel')
            pixel.id = i+'-'+j
            grid.appendChild(pixel)
        }
    }
}
makeGrid(w, h)