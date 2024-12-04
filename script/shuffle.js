import fs from "fs";

// ==========================
// DATA
// ==========================
/**
 * List of participants.
 * @type {string[]}
 */
const participants = ["Tom", "Georgina", "Fanny", "Gael", "Natacha", "Bastien"];

// ==========================
// PASSWORD LIST
// ==========================
/**
 * List of passwords. Needs to have at least as many or more passwords as participants.
 * @type {string[]}
 */
const passwordList = [
  "noel",
  "cadeaux",
  "sapin",
  "guirlande",
  "hiver",
  "neige",
  "traineau",
  "snow",
  "christmas",
  "gift",
  "winter",
  "snowman",
  "santa",
];

// ==========================
// SHUFFLE FUNCTION
// ==========================
/**
 * Shuffles an array in place.
 * @param {any[]} array - The array to shuffle.
 * @returns {any[]} The shuffled array.
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Shifts the elements of an array by moving the last element to the first position.
 * @param {any[]} array - The array to shift.
 * @returns {any[]} The shifted array.
 */
const shiftArray = (array) => {
  const copyArray = [...array];
  const lastElement = copyArray.pop();
  copyArray.unshift(lastElement);
  return copyArray;
};

/**
 * Creates pairs of givers and receivers from a list of participants.
 * @param {string[]} participantsList - The list of participants.
 * @returns {{giver: string, receiver: string}[]} The list of pairs with givers and receivers.
 */
const createPairs = (participantsList) => {
  // create a copy shuffled from the participants array
  const shuffledArray = shuffleArray(participantsList);
  // create a copy of the shuffled array and put the last element at the beginning
  const shiftedArray = shiftArray(shuffledArray);

  // Create pairs of giver and receiver by mapping the shuffled array with the shifted array participantsList
  const pairs = shuffledArray.map((person, index) => ({
    giver: person,
    receiver: shiftedArray[index],
  }));

  return pairs;
};

// ==========================
// OBFUSCATE FUNCTION
// ==========================
/**
 * Obfuscates a string by encoding it with a simple Caesar cipher
 * @param {string} str
 * @returns {string}
 * eg: obfuscateString("hello") => "107-104-109-109-114"
 */
const obfuscateString = (str) => {
  let encoded = "";
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    encoded += charCode + 5 + "-";
  }
  return encoded.slice(0, -1); // Supprime le dernier tiret
};

/**
 * Deobfuscates a string by decoding it with a simple Caesar cipher
 * @param {string} encodedStr
 * @returns {string}
 * eg: deobfuscateString("107-104-109-109-114") => "hello"
 */
const deobfuscateString = (encodedStr) => {
  let decoded = "";
  const parts = encodedStr.split("-");
  for (const part of parts) {
    const charCode = parseInt(part) - 5;
    decoded += String.fromCharCode(charCode);
  }
  return decoded;
};

// ==========================
// INIT FUNCTION
// ==========================
const init = () => {
  if (!passwordList.length >= participants.length) {
    throw new Error(
      `Not enough passwords in the list to assign to each person.`
    );
  }

  const pairs = createPairs(participants);
  const shuffledPasswords = shuffleArray(passwordList);

  const result = pairs.map(({ giver, receiver }, index) => {
    const password = shuffledPasswords[index] + new Date().getFullYear();

    return {
      name: obfuscateString(giver),
      password: obfuscateString(password),
      secretFriend: obfuscateString(receiver),
    };
  });

  fs.writeFileSync(
    "./src/data/secretSanta.json",
    JSON.stringify(result, null, 2)
  );

  console.log(
    "Secret Santa pairs have been shuffled and written to ./src/data/secretSanta.json"
  );

  result.map(({ name, password }) => {
    console.log(
      `🫥 ${deobfuscateString(name)} \n🔐 ${deobfuscateString(password)} \n`
    );
  });
};

init();
