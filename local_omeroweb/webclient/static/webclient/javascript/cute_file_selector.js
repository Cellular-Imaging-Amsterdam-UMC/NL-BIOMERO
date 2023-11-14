function buildFileTree(data) {
    const tree = {};

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

function selectGroupDirectory(directory) {
    const fileTreeDiv = document.getElementById('fileTree');
    fileTreeDiv.innerHTML = ""; // Clear the div

    let fileData = files_in_data_dir[directory];
    if (fileData) {
        const fileTree = buildFileTree(fileData);
        renderFileTree(fileTree, fileTreeDiv);
    }

    // Set the directory input field's value
    $j('#directory').val(directory);
}