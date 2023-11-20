document.addEventListener("DOMContentLoaded", function() {
    console.log('DOMContentLoaded event fired');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const scriptsContainer = document.getElementById('scriptsContainer');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const scriptsUrl = document.body.dataset.scriptsUrl;
    let selectedDictionaries = {};

    // Fetch the script data from the server
    fetch(scriptsUrl)
        .then(response => response.text())  // get the response text
        .then(text => {
            console.log('Received response from server:', text);
            return JSON.parse(text);  // try to parse the response text as JSON
        })
        .then(scriptData => {
            console.log('Parsed script data:', scriptData);
            // Function to create buttons for each dictionary that contains a 'ul' property
            scriptData.forEach(dict => {
                if (dict.ul) { // Check if the dictionary has a 'ul' property
                    const button = document.createElement('button');
                    button.className = 'button';
                    button.textContent = dict.name;
                    button.style.background = getRandomColor(); // Set random gradient color
                    button.dataset.color = button.style.background; // Store color in dataset
                    button.dataset.name = dict.name; // Store dictionary name in dataset
                    button.onclick = () => toggleDictionary(dict);
                    buttonsContainer.appendChild(button);
                }
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

            // Recursive function to iterate over all levels of 'ul' arrays
            function processScripts(scripts, category) {
                if (category) {  // Only create a category div if the category is not null, undefined, or an empty string
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'category';
                    categoryDiv.textContent = category;
                    dictDiv.appendChild(categoryDiv);
                }
            
                scripts.forEach(script => {
                    if (script.ul) {
                        // If the script has a 'ul' property, recursively process its scripts
                        processScripts(script.ul, script.name);
                    } else {
                        // If the script doesn't have a 'ul' property, it's a leaf script
                        script.script_category = category;  // Add the script_category property
                        const scriptDiv = document.createElement('div');
                        scriptDiv.className = 'script';
                        scriptDiv.textContent = script.name;
                        scriptDiv.dataset.id = script.id;  // Store the script's ID in a data attribute
                        scriptDiv.onclick = () => {
                            const scriptUrl = `/webclient/script_ui/${scriptDiv.dataset.id}/`;  // Use the script's ID from the data attribute
                            console.log('Script URL:', scriptUrl);
                            // Create a synthetic event object
                            const event = {
                                target: {
                                    getAttribute: () => scriptUrl
                                }
                            };
                            // Open the script window
                            console.log('Opening script window with event:', event);
                            console.log(OME)
                            OME.openScriptWindow(event);
                                                
                            // Close the popup
                            window.close();
                        };

                        dictDiv.appendChild(scriptDiv);
                    }
                });
            }

            // Start the recursive processing with the top-level scripts
            processScripts(dict.ul, null);

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
                scriptDiv.dataset.id = script.id;  // Store the script's ID in a data attribute
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