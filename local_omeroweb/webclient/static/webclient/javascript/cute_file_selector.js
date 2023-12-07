function buildFileTree(filesInSubdirectory) {
    console.log("Data passed to buildFileTree:", filesInSubdirectory);
    const tree = {};

    filesInSubdirectory.forEach(fileObj => {
        if(fileObj.file_path && typeof fileObj.file_path.path === 'string') {
            // Split the path and remove the base 'data' directory and the already selected group
            // Assuming the first part is always 'data' and the second part is the group
            const parts = fileObj.file_path.path.split('/').slice(3); // Adjust the index as needed
            
            let currentLevel = tree;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];

                if (!currentLevel[part]) {
                    currentLevel[part] = {};
                }

                if (i === parts.length - 1) {
                    currentLevel[part] = fileObj; // Store the file object here
                } else {
                    currentLevel = currentLevel[part];
                }
            }
        } else {
            console.error('Invalid file path structure:', fileObj);
        }
    });
    console.log("Constructed file tree:", tree);
    return tree;
}


function renderFileTree(node, parentElement) {
    console.log("Node to be rendered:", node);
    const ul = document.createElement('ul');

    for (const key in node) {
        const li = document.createElement('li');
        const currentNode = node[key];

        // If the node is a file, add a checkbox and label with the file name
        if (currentNode.file_name && currentNode.file_path) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            // The ID should use the path for uniqueness, assuming the path is a string
            checkbox.id = 'checkbox-' + currentNode.file_path.path;

            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.appendChild(checkbox);
            // Make sure you are accessing the filename correctly
            label.appendChild(document.createTextNode(currentNode.file_name.filename));

            li.appendChild(label);
        } else {
            // If it's not a file, it must be a folder, so display its name in bold
            const boldText = document.createElement('strong');
            boldText.textContent = key;
            li.appendChild(boldText);

            // Recursively render any nested subdirectories or files
            if (typeof currentNode === 'object' && currentNode !== null && !currentNode.file_name) {
                renderFileTree(currentNode, li);
            }
        }

        ul.appendChild(li);
    }

    parentElement.appendChild(ul);
}

function selectGroupDirectory(index) {
    console.log("Selecting group directory with index:", index);
    var selectedSubdirectory = filesBySubdirectory[index];

    if (selectedSubdirectory) {
        var fileTree = buildFileTree(selectedSubdirectory.files_in_subdirectory);
        console.log("fileTree:", fileTree);
        var fileTreeDiv = document.getElementById('fileTree');
        fileTreeDiv.innerHTML = ""; // Clear the div
        renderFileTree(fileTree, fileTreeDiv);
    } else {
        var fileTreeDiv = document.getElementById('fileTree');
        console.error('Subdirectory data not found for index:', index);
        fileTreeDiv.innerHTML = "No files found in this folder";
    }
}