const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.seat--occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

function setMovieDataHandler(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Price Calculation
function updateSelectedHandler() {
    const selectedSeat = document.querySelectorAll(".row .seat.seat--selected");

    const seatsIndex = [...selectedSeat].map(seat => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

//Populating  UI with Saved Data
(function(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

    if(selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index )=>{
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add("seat--selected");
            }
        })
    }

    if(selectedMovieIndex != null) {
        movieSelect.selectedIndex = +selectedMovieIndex;
    }

    if(selectedMoviePrice != null) {
        ticketPrice = +selectedMoviePrice;
    }
    updateSelectedHandler();
})();

//Movie Selection
movieSelect.addEventListener("change", e =>{
    ticketPrice = +e.target.value;
    setMovieDataHandler(e.target.selectedIndex, e.target.value);
    updateSelectedHandler();
})

//Seat Selection
container.addEventListener("click", e=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('seat--occupied')){
        e.target.classList.toggle("seat--selected");
        updateSelectedHandler();
    }
})