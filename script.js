// List of adjectives and nouns for generating names
const adjectives = ["F13rc3", "M1gh7y", "S4v4g3", "Br4v3", "F34rl3ss", "Sw1ft", "7hund3r0u5", "L3g3nd4ry", "3p1c", "N0bl3"];
const nouns = ["W4rr10r", "Kn1gh7", "H3r0", "Ch4mp10n", "Gl4d14t0r", "4554551n", "W1z4rd", "R0gu3", "P41ad1n", "B4rb4r14n"];

// Function to generate a random name
function generateName() {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const fullName = adjective + " " + noun;
    return fullName;
}

// Function to check if a name is sexual
function isSexual(name) {
    const sexualWords = ["sexual_word1", "sexual_word2", "sexual_word3"]; // Add your own sexual words here
    for (let i = 0; i < sexualWords.length; i++) {
        if (name.toLowerCase().includes(sexualWords[i])) {
            return true;
        }
    }
    return false;
}

// Function to generate a new name and display it
function generateAndDisplayName() {
    let newName;
    do {
        newName = generateName();
    } while (isSexual(newName));
    document.getElementById("generated-name").textContent = newName;
}

// Event listener for the button click
document.getElementById("generate-btn").addEventListener("click", generateAndDisplayName);

// Generating around 200 names
for (let i = 0; i < 200; i++) {
    const newName = generateName();
    const listItem = document.createElement("li");
    listItem.textContent = newName;
    document.getElementById("name-list").appendChild(listItem);
}
