// Array to store key and its coordinates
let keyCoordinates = [];
let allKeyCoords = [];
let finalPassword = '';

// Function to generate keypad buttons
function generateKeypad() {
    const characters = shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    const keypadDiv = document.getElementById('keypad');

    // Define grid size
    const rows = 6;
    const cols = 6;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const button = document.createElement('button');
            const index = i * cols + j;
            if (index < characters.length) {
                const character = characters[index];
                button.textContent = character;
                button.className = 'key';
                // Pass coordinates to displayKey function when clicked
                allKeyCoords.push({ key: character, row: i, col: j });
                button.onclick = function() {
                    displayKey(character, i, j);
                };
                keypadDiv.appendChild(button);
            }
        }
    }
}

// Function to display the entered key and its coordinates
function displayKey(key, row, col) {
    // Push key and its coordinates to the array
    keyCoordinates.push({ key: key, row: row, col: col });

    // Display the key
    const display = document.getElementById('passwordDisplay');
    display.textContent += key;
}

function backspace() {
    const display = document.getElementById('passwordDisplay');
    const currentText = display.textContent;
    display.textContent = currentText.slice(0, -1);
    keyCoordinates.pop();
}

// Function to submit the password
function submitPassword() {
    // Log the key and its coordinates array
    console.log('Key and Coordinates:', keyCoordinates);

    if (keyCoordinates.length != 8) {
        // Display an alert if the password is too short
        alert('Password must be 8 characters long.');
        return; // Exit the function early
    }

    for (let i = 0; i < keyCoordinates.length - 1; i += 2) {
        // Get the row from the first dictionary
        const row = keyCoordinates[i].row;
        // Get the column from the second dictionary
        const col = keyCoordinates[i + 1].col;
        // Retrieve the character at the specified row and column
        const character = getCharacterAt(row, col);
        // Log the character
        finalPassword += character;
    }

    console.log('Your Password', finalPassword);
    // get password from session storage
    const sessionUser = sessionStorage.getItem('username');
    const storedPassword = localStorage.getItem(`${sessionUser}`);
    if (finalPassword === storedPassword) {
        window.location.href = 'granted.html';
        // const granted = document.createElement('div');
        // granted.textContent = 'Access Granted';
        // granted.className = 'py-3 px-8 rounded-lg border border-green-500 bg-green-100 font-medium text-base text-green-700 mb-10';
        // accessMessage.appendChild(granted);
    } else {
        window.location.href = 'denied.html';
        // const denied = document.createElement('div');
        // denied.textContent = 'Access Denied';
        // denied.className = 'py-3 px-8 rounded-lg border border-red-500 bg-red-100 font-medium text-base text-red-700 mb-10';
        // accessMessage.appendChild(denied);
    }


    // Reset the display and keyCoordinates array
    document.getElementById('passwordDisplay').textContent = '';
    keyCoordinates = [];
    finalPassword = '';
}

// Function to shuffle an array
function shuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}


// Function to retrieve the character at a given row and column
function getCharacterAt(row, col) {
    // Calculate the index based on the row and column
    const index = row * 6 + col;
    // Retrieve the character from the keyCoordinates array
    return allKeyCoords[index].key;
}

// Generate the keypad when the page loads
generateKeypad();

const username = document.getElementById('username');
const usernameParagraph = document.getElementById('usernameParagraph');
// get username from session storage and display it
const localUsername = sessionStorage.getItem('username');
if(localUsername) {
    usernameParagraph.style.display = "flex";
    username.textContent = localUsername;
}
