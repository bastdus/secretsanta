import fs from "fs";

// ==========================
// DATA
// ==========================
const participants = ["Tom", "Georgina", "Fanny", "Gael", "Natacha", "Bastien"];

// ==========================
// PASSWORD LIST
// ==========================
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
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const shiftArray = (array) => {
  const copyArray = [...array];
  const lastElement = copyArray.pop();
  copyArray.unshift(lastElement);
  return copyArray;
};

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
const obfuscateString = (str) => {
  let encoded = "";
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    encoded += charCode + 5 + "-";
  }
  return encoded.slice(0, -1); // Supprime le dernier tiret
};

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

  const friends = pairs.map(({ giver, receiver }, index) => {
    const password = shuffledPasswords[index] + new Date().getFullYear();

    return {
      name: obfuscateString(giver),
      password: obfuscateString(password),
      secretFriend: obfuscateString(receiver),
    };
  });

  fs.writeFileSync(
    "./src/data/secretSanta.json",
    JSON.stringify(friends, null, 2)
  );

  console.log(
    "Secret Santa pairs have been shuffled and written to ./src/data/secretSanta.json"
  );

  friends.map(({ name, password }) => {
    console.log(
      `🫥 ${deobfuscateString(name)} \n🔐 ${deobfuscateString(password)} \n`
    );
  });
};

init();
