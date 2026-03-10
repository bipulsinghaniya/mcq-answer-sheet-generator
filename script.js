document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const generateBtn = document.getElementById('generateBtn');
    const numQsInput = document.getElementById('numQs');
    const sheetContainer = document.getElementById('sheetContainer');
    const qList = document.getElementById('qList');
    const clearBtn = document.getElementById('clearBtn');
    const sheetCountBadge = document.getElementById('sheetCountBadge');

    // MCQ Options config
    const options = ['A', 'B', 'C', 'D'];

    // Generate Sheet Logic
    function generateSheet() {
        const num = parseInt(numQsInput.value);
        
        // Input validation
        if (isNaN(num) || num <= 0) {
            alert('Please enter a valid positive number of questions.');
            numQsInput.focus();
            return;
        }
        
        if (num > 500) {
            const proceed = confirm('You are trying to generate more than 500 questions. This might slow down your browser. Do you wish to proceed?');
            if(!proceed) return;
        }

        // Clear existing list
        qList.innerHTML = '';
        
        // Use DocumentFragment for performant DOM updates
        const fragment = document.createDocumentFragment();

        // Loop to create rows
        for (let i = 1; i <= num; i++) {
            // Row wrapper
            const row = document.createElement('div');
            row.className = 'q-row flex flex-col sm:flex-row sm:items-center py-3 px-2 sm:gap-6 border-b border-gray-100 last:border-0';
            
            // Question Number Badge
            const qNum = document.createElement('div');
            qNum.className = 'w-12 text-left sm:text-right font-semibold text-gray-500 text-lg mb-3 sm:mb-0 tabular-nums';
            qNum.textContent = i + '.';
            
            // Options Container
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'flex gap-3 sm:gap-5 flex-wrap';

            // Generate options elements A, B, C, D
            options.forEach(opt => {
                const optWrapper = document.createElement('div');
                optWrapper.className = 'mcq-option';
                
                // Native hidden radio input
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `q${i}`; // Ensure grouping per question
                radio.id = `q${i}_${opt}`;
                radio.value = opt;

                // Styled label acting as the button
                const label = document.createElement('label');
                label.htmlFor = `q${i}_${opt}`;
                label.textContent = opt;

                optWrapper.appendChild(radio);
                optWrapper.appendChild(label);
                optionsContainer.appendChild(optWrapper);
            });

            // Assemble row
            row.appendChild(qNum);
            row.appendChild(optionsContainer);
            fragment.appendChild(row);
        }

        // Inject to DOM
        qList.appendChild(fragment);
        
        // Update badge count
        sheetCountBadge.textContent = num;

        // Display the sheet with animation
        sheetContainer.classList.remove('hidden');
        
        // Small hack to re-trigger animation if generating multiple times
        sheetContainer.classList.remove('animate-fade-in');
        void sheetContainer.offsetWidth; // Trigger reflow
        sheetContainer.classList.add('animate-fade-in');
    }

    // Event Listeners
    generateBtn.addEventListener('click', generateSheet);
    
    // Support hitting Enter in the input field
    numQsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateSheet();
        }
    });

    // Reset selection logic
    clearBtn.addEventListener('click', () => {
        const radios = document.querySelectorAll('input[type="radio"]');
        let hasSelection = false;
        
        radios.forEach(radio => {
            if (radio.checked) hasSelection = true;
        });

        if (hasSelection) {
            if (confirm('Are you sure you want to clear your current selections?')) {
                radios.forEach(radio => radio.checked = false);
            }
        }
    });
});
