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

function generatePassword(length, selectedCategories, usePassphrase) {
  const categories = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+?><:{}[]",
  };

  selectedCategories = selectedCategories || {
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  };
  if (usePassphrase) {
    const wordList = [
      "apple",
      "banana",
      "orange",
      "grape",
      "strawberry",
      "elephant",
      "tiger",
      "lion",
      "zebra",
      "giraffe",
    ];
    let passphrase = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      passphrase += wordList[randomIndex];
      if (i < length - 1) {
        passphrase += "-";
      }
    }
    return passphrase;
  } else {
    const selectedChars = Object.entries(selectedCategories)
      .filter(([category, isSelected]) => isSelected)
      .map(([category]) => categories[category])
      .join("");

    const noCategoriesSelected = !Object.values(selectedCategories).some(
      (isSelected) => isSelected
    );

    if (noCategoriesSelected) {
      return "Generate Password";
    }

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
}

function updateValue() {
  const length = parseInt(lengthSlider.value);
  lengthValue.textContent = length;

  const passphraseCheckbox = document.getElementById("passphrase");
  const passwordText = passwordBox.value;
  const lowercaseCheckbox = document.getElementById("abc");
  const uppercaseCheckbox = document.getElementById("ABC");
  const numbersCheckbox = document.getElementById("123");
  const symbolsCheckbox = document.getElementById("#$%");

  [
    lowercaseCheckbox,
    uppercaseCheckbox,
    numbersCheckbox,
    symbolsCheckbox,
  ].forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      if (passphraseCheckbox.checked) {
        passphraseCheckbox.checked = false;
        // Uncheck passphrase if other checkbox is clicked
        updateValue(); // Update password when passphrase is unchecked
      }
    });
  });

  if (passphraseCheckbox.checked) {
    // If passphrase checkbox is checked, uncheck other checkboxes
    lowercaseCheckbox.checked = false;
    uppercaseCheckbox.checked = false;
    numbersCheckbox.checked = false;
    symbolsCheckbox.checked = false;
  }

  const selectedCategories = {
    lowercase: lowercaseCheckbox.checked,
    uppercase: uppercaseCheckbox.checked,
    numbers: numbersCheckbox.checked,
    symbols: symbolsCheckbox.checked,
  };

  const usePassphrase = passphraseCheckbox.checked;

  const password = generatePassword(length, selectedCategories, usePassphrase);
  passwordBox.value = password;

  if (password === "Generate Password") {
    passwordBox.value = password;
    passwordBox.style.color = "gray";
  } else {
    passwordBox.value = password;
    passwordBox.style.color = "black";
  }

  // const passphraseCheckbox = document.getElementById("passphrase");
  // const passwordText = passwordBox.value;

  if (passphraseCheckbox.checked) {
    // Decrease font size if passphrase checkbox is checked
    passwordBox.style.fontSize = "20px";
    // Set the desired font size here
  } else {
    // Reset font size if passphrase checkbox is unchecked
    passwordBox.style.fontSize = "20px"; // Set the default font size here
  }
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

  if (password.includes(" ")) {
    return calculatePassphraseStrength(password);
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
