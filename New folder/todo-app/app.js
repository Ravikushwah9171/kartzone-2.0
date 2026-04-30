document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filters = document.querySelectorAll('.filter-btn');
    const itemsLeft = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const emptyState = document.getElementById('empty-state');
    const themeCheckbox = document.getElementById('theme-checkbox');
    const toastContainer = document.getElementById('toast-container');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    // Theme Initialization
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        themeCheckbox.checked = true;
    }

    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Initialize App
    renderTodos();

    // Event Listeners
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo(todoInput.value);
    });

    todoList.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;

        const id = Number(item.dataset.id);

        if (e.target.closest('.delete-btn')) {
            deleteTodo(id, item);
        } else if (e.target.closest('.edit-btn')) {
            enableEditMode(item, id);
        } else if (e.target.closest('.todo-content')) {
            // Don't toggle if we are editing
            if (!item.classList.contains('editing')) {
                toggleTodo(id);
            }
        }
    });

    // Save edit on Enter or blur
    todoList.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.classList.contains('edit-input')) {
            saveEdit(e.target);
        }
    });

    todoList.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('edit-input')) {
            saveEdit(e.target);
        }
    });

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    clearCompletedBtn.addEventListener('click', () => {
        const hasCompleted = todos.some(t => t.completed);
        if (hasCompleted) {
            todos = todos.filter(todo => !todo.completed);
            saveAndRender();
            showToast('Cleared completed tasks', 'info');
        }
    });

    // Core Functions
    function addTodo(text) {
        if (text.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false
        };

        todos.unshift(newTodo);
        todoInput.value = '';
        saveAndRender();
        showToast('Task added successfully', 'success');
    }

    function deleteTodo(id, itemElement) {
        // Add removing animation class
        itemElement.classList.add('removing');
        
        // Wait for animation to finish before actual deletion
        setTimeout(() => {
            todos = todos.filter(todo => todo.id !== id);
            saveAndRender();
            showToast('Task deleted', 'error');
        }, 300);
    }

    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveAndRender();
    }

    function enableEditMode(item, id) {
        item.classList.add('editing');
        const input = item.querySelector('.edit-input');
        input.focus();
        // Move cursor to end
        input.selectionStart = input.selectionEnd = input.value.length;
    }

    function saveEdit(inputElement) {
        const item = inputElement.closest('.todo-item');
        if (!item.classList.contains('editing')) return;

        const id = Number(item.dataset.id);
        const newText = inputElement.value.trim();

        if (newText === '') {
            // Delete if empty
            deleteTodo(id, item);
            return;
        }

        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });

        item.classList.remove('editing');
        saveAndRender();
        showToast('Task updated', 'info');
    }

    function saveAndRender() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        // Filter todos
        let filteredTodos = todos;
        if (currentFilter === 'active') {
            filteredTodos = todos.filter(todo => !todo.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(todo => todo.completed);
        }

        // Handle empty state
        if (filteredTodos.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }

        // Render list
        todoList.innerHTML = '';
        
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;

            const safeText = escapeHTML(todo.text);

            li.innerHTML = `
                <div class="todo-content">
                    <div class="checkbox">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <span class="todo-text">${safeText}</span>
                    <input type="text" class="edit-input" value="${safeText}">
                </div>
                <div class="actions">
                    <button class="action-btn edit-btn" aria-label="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="action-btn delete-btn" aria-label="Delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
            
            todoList.appendChild(li);
        });

        // Update items left count
        const activeCount = todos.filter(todo => !todo.completed).length;
        itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
        
        // Show/hide clear completed button
        const hasCompleted = todos.some(todo => todo.completed);
        clearCompletedBtn.style.visibility = hasCompleted ? 'visible' : 'hidden';
    }

    // Toast Notification System
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';

        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('removing');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }

    // Utility to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
