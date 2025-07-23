let count = 0

function increment() {
    count += 1
    document.getElementById("count-el").innerText = count
}

function save() {
    let countStr = count + " - "
    document.getElementById("save-el").textContent += countStr
    count = 0
    document.getElementById("count-el").innerText = count
}
