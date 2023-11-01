function buildFileTree(data) {
    const tree = {};

    data.forEach(item => {
        const parts = item.path.split('/');
        let currentLevel = tree;

        parts.forEach((part, index) => {
            if (!currentLevel[part]) {
                currentLevel[part] = {};
            }
            if (index === parts.length - 1) {
                currentLevel[part] = item;
            } else {
                currentLevel = currentLevel[part];
            }
        });
    });

    return tree;
}

function renderFileTree(node, parentElement) {
    const ul = document.createElement('ul');

    for (const key in node) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        checkbox.addEventListener('change', function() {
            const childCheckboxes = li.querySelectorAll('input[type="checkbox"]');
            childCheckboxes.forEach(childCheckbox => {
                childCheckbox.checked = checkbox.checked;
            });
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(key));

        if (typeof node[key] === 'object' && !node[key].filename) {
            renderFileTree(node[key], li);
        }

        ul.appendChild(li);
    }

    parentElement.appendChild(ul);
}

const fileTree = buildFileTree(fileData);
const rootElement = document.getElementById('fileTree');
renderFileTree(fileTree, rootElement);
