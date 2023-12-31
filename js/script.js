import myWords from "../words.json" assert { type: "json" };

const passwordBox = document.getElementById("pass");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const passwordInput = document.getElementById("passwordInput");
const passwordStrength = document.getElementById("passwordStrength");
const regenerate = document.querySelector(".regenerate");
const copy = document.querySelector(".copy");

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
    const wordList = myWords.words;
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

        updateValue();
      }
    });
  });

  if (passphraseCheckbox.checked) {
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

  if (passphraseCheckbox.checked) {
    passwordBox.style.fontSize = "24px";
  } else {
    passwordBox.style.fontSize = "24px";
  }
}

function updatePasswordStrength() {
  const password = passwordInput.value;
  // let strength;
  // if (usePassphrase) {
  //   strength = calculatePassphraseStrength(password);
  // } else {
  //   strength = calculatePasswordStrength(password);
  // }
  // displayStrength(strength);
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

regenerate.addEventListener("click", () => {
  updateValue();
});

copy.addEventListener("click", () => {
  passwordBox.select();
  navigator.clipboard.writeText(passwordBox.value);
});

window.onload = function () {
  updateValue();
};

// function calculatePassphraseStrength(passphrase) {
//   console.log(passphrase);
//   // Split passphrase into individual words
//   const words = passphrase.split("-");

//   // Define criteria for strength
//   const minLengthPerWord = 4;
//   const minWords = 4;

//   // Check passphrase against criteria
//   const hasMinWords = words.length >= minWords;
//   const allWordsHaveMinLength = words.every(
//     (word) => word.length >= minLengthPerWord
//   );
//   const hasNoRepeatedWords = new Set(words).size === words.length; // Check for repeated words

//   // Determine strength category
//   if (hasMinWords && allWordsHaveMinLength && hasNoRepeatedWords) {
//     return 4; // Strong
//   } else if (
//     (hasMinWords && allWordsHaveMinLength) ||
//     (hasMinWords && hasNoRepeatedWords) ||
//     (allWordsHaveMinLength && hasNoRepeatedWords)
//   ) {
//     return 3; // Medium
//   } else if (hasMinWords || allWordsHaveMinLength || hasNoRepeatedWords) {
//     return 2; // Relatively Weak
//   } else {
//     return 0; // Weak
//   }
// }
