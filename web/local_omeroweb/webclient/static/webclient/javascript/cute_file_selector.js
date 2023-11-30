function buildFileTree(dataString) {
    console.log("Building file tree with data:", dataString);
    const tree = {};
    var dataString = dataString.replace(/'/g, "\"");
    console.log("Building file tree with data replaced:", dataString);
    // Format the data string into a valid JSON array string
    dataString = '{ "results": [' + dataString.replace(/\}\s*\{/g, '},{') + ']}';
    console.log("data:",dataString)
    // Parse the string into an array of objects
    var data = JSON.parse(dataString);
    data = data.results;

    data.forEach(item => {
        const parts = item.path.split('/');
        let currentLevel = tree;

        for (let index = 0; index < parts.length; index++) {
            const part = parts[index];

            // Skip the base directory and the core subdirectories
            if (index < 2) continue;

            if (!currentLevel[part]) {
                currentLevel[part] = {};
            }
            if (index === parts.length - 1) {
                currentLevel[part] = item;
            } else {
                currentLevel = currentLevel[part];
            }
        }
    });

    // Return the third part of the path as the root of the tree
    return tree[Object.keys(tree)[0]];
}

function renderFileTree(node, parentElement) {
    console.log("Rendering file tree with node:", node);
    const ul = document.createElement('ul');

    for (const key in node) {
        const li = document.createElement('li');

        // If the current node is a file, add a checkbox
        if (node[key].filename) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'checkbox-' + node[key].path; // Assign a unique ID to the checkbox

            const label = document.createElement('label');
            label.htmlFor = checkbox.id; // Associate the label with the checkbox
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(node[key].filename));

            li.appendChild(label);
        } else {
            // If it's a directory, make the name bold
            const boldText = document.createElement('strong');
            boldText.textContent = key;
            li.appendChild(boldText);
        }

        // If the current node is a directory, recursively render its contents
        if (typeof node[key] === 'object' && !node[key].filename) {
            renderFileTree(node[key], li);
        }

        ul.appendChild(li);
    }

    parentElement.appendChild(ul);
}

function selectGroupDirectory(id) {
    console.log("Selecting group directory with id:", id);
    // Get the file data for the selected directory
    var fileDataString = filesInGroupsDir[id];

    // Check if fileDataString is a non-empty string
    if (typeof fileDataString === 'string' && fileDataString.trim() !== '') {
        // Split the string into lines
        var lines = fileDataString.split('\n');
        console.log("lines:", lines);
        // Parse each line as JSON to get an array of file objects
        var fileData = lines.map(line => {
            try {
                var parsed = JSON.parse(line.replace(/'/g, "\""));
                // Ensure parsed is an array
                if (!Array.isArray(parsed)) {
                    parsed = [parsed];
                }
                return parsed;
            } catch (e) {
                console.error('Error parsing file data:', e);
                return null;
            }
        }).filter(item => item); // Remove null items

        // Flatten fileData into a single array
        fileData = [].concat.apply([], fileData);

        // Check if fileData is an array
        if (Array.isArray(fileData) && fileData.length > 0) {
            // Build and render the file tree for the file data
            var fileTree = buildFileTree(fileData);
            console.log("fileTree:", fileTree);
            var fileTreeDiv = document.getElementById('fileTree');
            fileTreeDiv.innerHTML = ""; // Clear the div
            renderFileTree(fileTree, fileTreeDiv);
        } else {
            var fileTreeDiv = document.getElementById('fileTree');
            console.error('Invalid file data:', fileData);
            fileTreeDiv.innerHTML = "No files found in this folder";
        }
    } else {
        var fileTreeDiv = document.getElementById('fileTree');
        console.error('Invalid file data:', fileDataString);
        fileTreeDiv.innerHTML = "No files found in this folder";
    }
}