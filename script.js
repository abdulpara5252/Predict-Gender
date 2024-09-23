let url = "https://api.genderize.io?name=";
let wrapper = document.getElementById("wrapper");
let submitButton = document.getElementById("submit");
let nameInput = document.getElementById("name");

let updateButtonState = () => {
  // Trim whitespace and check conditions
  const trimmedName = nameInput.value.trim();
  const hasValidLength = trimmedName.length >= 3;
  const hasNoSpaces = !/\s/.test(trimmedName);
  
  // Enable the button only if both conditions are true
  submitButton.disabled = !(hasValidLength && hasNoSpaces);
};

let predictGender = () => {
  let name = nameInput.value.trim(); // Trim whitespace
  let error = document.querySelector(".errors");

  let finalUrl = url + name;
  console.log(name);
  console.log(finalUrl);
  wrapper.innerHTML = "";

  // Clear previous error message
  error.innerHTML = ""; 

  // Input check
  if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
    fetch(finalUrl)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let div = document.createElement("div");
        div.setAttribute("id", "info");
        div.innerHTML = `<h2 id="result-name">${data.name}</h2>
        
        <img src="" id="gender-icon"/>
        <h1 id="gender">${data.gender}</h1>
        <h4 id="prob">Probability: ${data.probability} %</h4>
        `;
        wrapper.append(div);
        if (data.gender === "female") {
          div.classList.add("Female");
          document.getElementById("gender-icon").setAttribute("src", "female.png");
        } else {
          div.classList.add("Male");
          document.getElementById("gender-icon").setAttribute("src", "male.png");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        error.innerHTML = "Error fetching gender prediction. Please try again.";
      });
  } else {
    error.innerHTML = "Enter a valid name with no spaces";
    error.style.color = "red"; // Set error text color
  }
};

// Add event listeners
nameInput.addEventListener("input", updateButtonState);
submitButton.addEventListener("click", predictGender);

// Initialize button state on page load
window.addEventListener("load", updateButtonState);
