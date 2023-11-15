document.addEventListener("DOMContentLoaded", function() {
    const scriptData = [
        {
            "name": "omero",
            "ul": [
                {"name": "script1", "id": 1},
                {"name": "script2", "id": 2},
                {"name": "script3", "id": 3},
                {"name": "script4", "id": 4},
                {"name": "script5", "id": 5},
            ],
        },
        {
            "name": "SLURM",
            "ul": [
                {"name": "script6", "id": 6},
                {"name": "script7", "id": 7},
                {"name": "script8", "id": 8},
                {"name": "script9", "id": 9},
                {"name": "script10", "id": 10},
            ],
        },
        {
            "name": "User",
            "ul": [
                {"name": "script6", "id": 11},
                {"name": "script7", "id": 12},
                {"name": "script8", "id": 13},
                {"name": "script9", "id": 14},
            ],
        },
    ];

    const buttonsContainer = document.getElementById('buttonsContainer');
    const scriptsContainer = document.getElementById('scriptsContainer');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    let selectedDictionaries = {};

    // Function to create buttons for each dictionary
    scriptData.forEach(dict => {
        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = dict.name;
        button.style.background = getRandomColor(); // Set random gradient color
        button.dataset.color = button.style.background; // Store color in dataset
        button.dataset.name = dict.name; // Store dictionary name in dataset
        button.onclick = () => toggleDictionary(dict);
        buttonsContainer.appendChild(button);
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            const matchingScripts = scriptData.flatMap(dict => dict.ul.filter(script => script.name.toLowerCase().includes(searchTerm)));
            displayScripts(matchingScripts.slice(0, 5), searchContainer); // Limit the results to a maximum of 5
        } else {
            searchContainer.innerHTML = ''; // Clear the search results if the search field is empty
        }
    });

    // Function to toggle dictionaries
    function toggleDictionary(dict) {
        if (selectedDictionaries[dict.name]) {
            delete selectedDictionaries[dict.name];
            const oldDictDiv = document.getElementById(dict.name);
            scriptsContainer.removeChild(oldDictDiv);
        } else {
            selectedDictionaries[dict.name] = dict.ul;
            const dictDiv = document.createElement('div');
            dictDiv.id = dict.name;
            dictDiv.className = 'dict';
            dictDiv.style.background = document.querySelector(`button[data-name="${dict.name}"]`).dataset.color;
    
            dict.ul.forEach(script => {
                const scriptDiv = document.createElement('div');
                scriptDiv.className = 'script';
                scriptDiv.textContent = script.name;
                scriptDiv.onclick = () => {
                    console.log(`Script ${script.id} clicked: Would call {% url 'script_ui' ${script.id} %}`);
                    // Here you can simulate a server call or any other action
                };
                dictDiv.appendChild(scriptDiv);
            });
    
            scriptsContainer.prepend(dictDiv); // Add the dictionary div at the top
        }
    }

    // Function to display scripts based on search
    function displayScripts(scripts, container) {
        container.innerHTML = ''; // Clear previous scripts
        if (scripts.length > 0) { // Only create a div if there are scripts to display
            const dictDiv = document.createElement('div');
            dictDiv.className = 'dict';
            dictDiv.style.background = 'white'; // Set background color to white
            scripts.forEach(script => {
                const scriptDiv = document.createElement('div');
                scriptDiv.className = 'script';
                scriptDiv.textContent = script.name;
                dictDiv.appendChild(scriptDiv);
            });
            container.appendChild(dictDiv); // Add the dictionary div
        }
    }

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color1 = '#';
        let color2 = '#';
        for (let i = 0; i < 6; i++) {
            color1 += letters[Math.floor(Math.random() * 16)];
            color2 += letters[Math.floor(Math.random() * 16)];
        }
        return `linear-gradient(to right, ${color1}, ${color2})`;
    }
});