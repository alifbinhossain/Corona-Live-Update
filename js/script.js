/* --------------------------- REUSABLE VARIABLES --------------------------- */
const diffMessage = document.getElementById("diff-message");
const poster = document.getElementById("poster");
const spinner = `<div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                 </div>`;
let inputValue;

/* -------------------------------- LOAD DATA ------------------------------- */
const loadData = () => {
  const inputField = document.getElementById("input-field");
  const countryName = inputField.value;
  inputField.value = "";
  const url = `https://api.covid19api.com/total/country/${countryName}`;

  if (countryName == "") {
    diffMessage.textContent = `Please enter country name`;
  } else {
    diffMessage.innerHTML = spinner;
    inputValue = countryName;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data));
  }
};

/* ------------------------------ DISPLAY DATA ------------------------------ */
const displayData = (data) => {
  const container = document.getElementById("container");

  if (Array.isArray(data) == false) {
    diffMessage.innerText = `Sorry ${inputValue} is not found.`;
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
    container.appendChild(resultDiv);
  }
};
