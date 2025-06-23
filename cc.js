const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");

function change(select) {
  console.log(select.value);
  let currCode = select.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = select.parentElement.querySelector("img");
  img.src = newSrc;
}

async function convertion() {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  let tocountry = to.value;
  if (amtval == "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  const BASE_URL = `https://api.frankfurter.app/latest?from=${from.value}&to=${to.value}`;
  let responce = await fetch(BASE_URL);
  const data = await responce.json();
  const result = amtval * data.rates[tocountry];
  msg.innerText = `${amtval} ${from.value} = ${result} ${to.value}`;
}

for (let dropdown of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.textContent = currCode;
    dropdown.append(option);
    if (dropdown.name == "from" && currCode == "INR") {
      option.selected = "selected";
    } else if (dropdown.name == "to" && currCode == "AUD") {
      option.selected = "selected";
    }
  }
  dropdown.addEventListener("change", (evt) => {
    change(evt.target);
  });
}
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  convertion();
});
window.addEventListener("load", () => {
  convertion();
});
