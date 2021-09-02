/* --------------------------- REUSABLE VARIABLES --------------------------- */
const toggleBanner = (displayPro, imgSrc) => {
  document.getElementById("banner").style.display = displayPro;
  document.getElementById("banner").innerHTML = ` <img
  id="poster"
  class="poster mx-auto my-5 "
  src="images/${imgSrc}.png"
  alt=""
  />`;
};
const container = document.getElementById("container");
const diffMessage = document.getElementById("diff-message");
const spinner = `<div class="spinner-border text-light mt-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                 </div>`;
let inputValue;
toggleBanner("block", "yellow-poster");

/* -------------------------------- LOAD DATA ------------------------------- */
const loadData = () => {
  container.innerHTML = "";
  const inputField = document.getElementById("input-field");
  const countryName = inputField.value;
  inputField.value = "";
  const url = `https://api.covid19api.com/total/country/${countryName}`;

  if (countryName == "") {
    diffMessage.textContent = `Please enter country name`;
  } else {
    diffMessage.innerHTML = `Please wait for a moment.. <br>
                             ${spinner}`;
    inputValue = countryName;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data));
  }
};

/* ------------------------------ DISPLAY DATA ------------------------------ */
const displayData = (data) => {
  if (Array.isArray(data) == false) {
    diffMessage.innerHTML = `<h2>Sorry <span class="text-warning fw-bold">${inputValue}</span> is not found.</h2>`;
    toggleBanner("block", "not-found-2");
  } else if (Array.isArray(data)) {
    diffMessage.innerText = `Result: ${inputValue}`;
    container.innerHTML = "";
    const country = data.reverse()[0];
    const countryName = country.Country;
    const totalCase = country.Confirmed;
    const totalDeath = country.Deaths;
    const totalRecoverd = country.Active;

    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result");
    resultDiv.innerHTML = `
   <h3>Country:<span>${countryName}</span></h3>
   <h3>Total Cases:<span>${totalCase}</span></h3>
   <h3>Total Deaths:<span class="text-danger">${totalDeath}</span></h3>
   <h3>Recovered:<span>${totalRecoverd}</span></h3>
   `;
    toggleBanner("none");
    container.appendChild(resultDiv);
  }
};
