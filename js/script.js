const passwordBox = document.getElementById("pass");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

lengthSlider.addEventListener("input", updateValue);
document.querySelectorAll("input[type=checkbox]").forEach((element) => {
  element.addEventListener("change", updateValue);
});

function generatePassword(length, selectedCategories) {
  const categories = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+?><:{}[]",
  };

  const selectedChars = Object.entries(selectedCategories)
    .filter(([category, isSelected]) => isSelected)
    .map(([category]) => categories[category])
    .join("");

  let password = "";
  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * selectedChars.length);
    password += selectedChars[randomIndex];
  }

  return password;
}

// Function to update the value display
function updateValue() {
  const length = parseInt(lengthSlider.value);
  lengthValue.textContent = length;

  const selectedCategories = {
    lowercase: document.getElementById("abc").checked,
    uppercase: document.getElementById("ABC").checked,
    numbers: document.getElementById("123").checked,
    symbols: document.getElementById("#$%").checked,
  };
  const password = generatePassword(length, selectedCategories);
  passwordBox.value = password;
}

// Function to handle incrementing the slider value
function increment() {
  if (parseInt(lengthSlider.value) < parseInt(lengthSlider.max)) {
    lengthSlider.value = parseInt(lengthSlider.value) + 1;
    updateValue();
  }
}

// Function to handle decrementing the slider value
function decrement() {
  if (parseInt(lengthSlider.value) > parseInt(lengthSlider.min)) {
    lengthSlider.value = parseInt(lengthSlider.value) - 1;
    updateValue();
  }
}

// Function to copy password to clipboard
function copyPassword() {
  passwordBox.select();
  navigator.clipboard.writeText(passwordBox.value);
}

// copy.addEventListener("click", () => {
//   navigator.clipboard.writeText(passwordBox.value);
//   copy.classList.replace("uil-copy", "uil-file-check-alt");
// });

// function generatePassword(length, selectedCategories) {
//   let password = "";
//   password += alpha[Math.floor(Math.random() * alpha.length)];
//   password += numbers[Math.floor(Math.random() * numbers.length)];
//   password += symbols[Math.floor(Math.random() * symbols.length)];

//   while (length > password.length) {
//     password += allChar[Math.floor(Math.random() * allChar.length)];
//   }

//   return password;
// }

// Event listener for slider changes
// lengthSlider.addEventListener("input", updateValue);

// // Initial value update
// updateValue();

// category

window.onload = function () {
  updateValue7();
};
