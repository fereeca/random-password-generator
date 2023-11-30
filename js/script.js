const passwordBox = document.getElementById("pass");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const passwordInput = document.getElementById("passwordInput");
const passwordStrength = document.getElementById("passwordStrength");

lengthSlider.addEventListener("input", updateValue);
document.querySelectorAll("input[type=checkbox]").forEach((element) => {
  element.addEventListener("change", updateValue);
});
passwordInput.addEventListener("input", updatePasswordStrength);

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

  // Update password strength whenever a new password is generated
  const strength = calculatePasswordStrength(password);
  displayStrength(strength);

  return password;
}

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

function updatePasswordStrength() {
  const password = passwordInput.value;
  const strength = calculatePasswordStrength(password);
  displayStrength(strength);
}

function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 9) {
    strength += 1;
  }

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    strength += 1;
  }

  if (/\d/.test(password)) {
    strength += 1;
  }

  if (/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)) {
    strength += 1;
  }

  return strength;
}

function displayStrength(strength) {
  let imagePath = "";
  switch (strength) {
    case 0:
    case 1:
      imagePath = "assets/weak1.gif";
      break;
    case 2:
      imagePath = "assets/medium.gif";
      break;
    case 3:
    case 4:
      imagePath = "assets/strong.gif";
      break;
    default:
      imagePath = "assets/weak1.gif";
      break;
  }
  document.getElementById("passwordStrengthImg").src = imagePath;
}

function copyPassword() {
  passwordBox.select();
  navigator.clipboard.writeText(passwordBox.value);
}

function resetGenerator() {
  updateValue();
}

window.onload = function () {
  updateValue();
};
