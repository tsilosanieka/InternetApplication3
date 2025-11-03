document.addEventListener('DOMContentLoaded', () => {
    // Get necessary DOM elements
    const addButton = document.getElementById('add-new-button');
    const tableBody = document.getElementById('collection-body');

    // Attach an event listener to the "Add new book" button
    addButton.addEventListener('click', () => addNewRow());

    function addNewRow() {
        // Create the new row element
        const newRow = document.createElement('tr');
        newRow.dataset.state = 'editing'; // Use a data attribute to track the state
        
        // Create cells and inputs
        const authorCell = document.createElement('td');
        const authorInput = document.createElement('input');
        authorInput.type = 'text';
        authorCell.appendChild(authorInput);

        const titleCell = document.createElement('td');
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleCell.appendChild(titleInput);
        
        // Create the Actions cell
        const actionsCell = document.createElement('td');
        actionsCell.className = 'actions-cell';

        // Assemble the row
        newRow.appendChild(authorCell);
        newRow.appendChild(titleCell);
        newRow.appendChild(actionsCell);

        // Prepend the new row to the table body
        tableBody.prepend(newRow);

        // 4.=Render initial 'editing' state buttons
        renderButtons(newRow, 'editing');
    }

    function handleAction(row, action) {
        if (action === 'remove') {
            // Remove the row from the DOM
            row.remove();
            return;
        }

        const authorCell = row.children[0];
        const titleCell = row.children[1];
        
        if (action === 'save') {
            const authorInput = authorCell.querySelector('input');
            const titleInput = titleCell.querySelector('input');
            
            // Get values from the input fields
            const authorValue = authorInput.value;
            const titleValue = titleInput.value;

            // DOM Manipulation: Replace the input fields with static text
            authorCell.innerHTML = authorValue;
            titleCell.innerHTML = titleValue;
            
            // Update state and re-render buttons
            row.dataset.state = 'saved';
            renderButtons(row, 'saved');
        
        } else if (action === 'edit') {
            // Get the current text values from the cells
            const authorValue = authorCell.textContent;
            const titleValue = titleCell.textContent;
            
            // DOM Manipulation: Clear cells and re-create input fields
            authorCell.innerHTML = '';
            titleCell.innerHTML = '';

            const newAuthorInput = document.createElement('input');
            newAuthorInput.type = 'text';
            newAuthorInput.value = authorValue;
            authorCell.appendChild(newAuthorInput);

            const newTitleInput = document.createElement('input');
            newTitleInput.type = 'text';
            newTitleInput.value = titleValue;
            titleCell.appendChild(newTitleInput);
            
            // Update state and re-render buttons
            row.dataset.state = 'editing';
            renderButtons(row, 'editing');
        }
    }

    function renderButtons(row, state) {
        const actionsCell = row.querySelector('.actions-cell');
        actionsCell.innerHTML = ''; // Clear existing buttons

        if (state === 'editing') {
            // Create Save button
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', () => handleAction(row, 'save'));
            
            // Create Remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => handleAction(row, 'remove'));

            actionsCell.appendChild(saveButton);
            actionsCell.appendChild(removeButton);

        } else if (state === 'saved') {
            // Create Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => handleAction(row, 'edit'));

            // Create Remove button (for saved items)
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => handleAction(row, 'remove'));

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(removeButton);
        }
    }
});