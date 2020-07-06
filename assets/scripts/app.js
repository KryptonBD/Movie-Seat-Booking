const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.seat--occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

//Price Calculation
function calculatePrice() {
    const selectedSeat = document.querySelectorAll(".row .seat.seat--selected");

    const selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

//Movie Selection
movieSelect.addEventListener("change", e =>{
    ticketPrice = +e.target.value;
    calculatePrice();
})

//Seat Selection
container.addEventListener("click", e=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('seat--occupied')){
        e.target.classList.toggle("seat--selected");
        calculatePrice();
    }
})