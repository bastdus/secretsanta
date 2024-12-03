import fs from "fs";

// ==========================
// DATA
// ==========================
const participants = [
  "Thomas.T",
  "Georgina",
  "Fanny",
  "Gael",
  "Natacha",
  "Thomas.D",
  "Bastien",
];

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

const createPairs = (participantsList) => {
  const shuffled = shuffleArray(participantsList);

  // Ensure no one is assigned to themselves
  for (let i = 0; i < shuffled.length; i++) {
    if (shuffled[i] === participantsList[i]) {
      // Swap with the next person, or the first person if it's the last element
      const swapIndex = i === shuffled.length - 1 ? 0 : i + 1;
      [shuffled[i], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[i]];
    }
  }

  // Create the Secret Santa pairs
  const pairs = participantsList.map((person, index) => ({
    giver: person,
    receiver: shuffled[index],
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
