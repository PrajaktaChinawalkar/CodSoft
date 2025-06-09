  let currentInput = '0';
        let previousInput = '';
        let operator = '';
        let shouldResetDisplay = false;
        let calculationHistory = '';

        const displayInput = document.getElementById('displayInput');
        const displayResult = document.getElementById('displayResult');
        const displayCalculation = document.getElementById('displayCalculation');

        function updateDisplay() {
            displayInput.textContent = currentInput;
            
            // Show the complete calculation being built
            if (previousInput && operator) {
                const operatorSymbol = {
                    '+': '+',
                    '-': '−',
                    '*': '×',
                    '/': '÷'
                }[operator] || operator;
                
                calculationHistory = `${formatDisplayNumber(previousInput)} ${operatorSymbol} ${shouldResetDisplay ? '' : formatDisplayNumber(currentInput)}`;
                displayCalculation.textContent = calculationHistory;
                
                // Show live result preview if we have both operands
                if (!shouldResetDisplay) {
                    try {
                        const result = evaluateExpression();
                        displayResult.textContent = formatDisplayNumber(result);
                    } catch (error) {
                        displayResult.textContent = '';
                    }
                } else {
                    displayResult.textContent = '';
                }
            } else {
                displayCalculation.textContent = '';
                displayResult.textContent = '';
            }
        }

        function formatDisplayNumber(num) {
            const numStr = num.toString();
            if (numStr.length > 12) {
                const number = parseFloat(num);
                if (Math.abs(number) >= 1e12 || (Math.abs(number) < 1e-6 && number !== 0)) {
                    return number.toExponential(6);
                }
                return number.toPrecision(12).replace(/\.?0+$/, '');
            }
            return numStr;
        }

        function appendNumber(num) {
            if (shouldResetDisplay) {
                currentInput = num;
                shouldResetDisplay = false;
            } else {
                if (currentInput === '0' && num !== '0') {
                    currentInput = num;
                } else if (currentInput !== '0') {
                    // Limit input length
                    if (currentInput.length < 15) {
                        currentInput += num;
                    }
                }
            }
            updateDisplay();
        }

        function appendDecimal() {
            if (shouldResetDisplay) {
                currentInput = '0.';
                shouldResetDisplay = false;
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            updateDisplay();
        }

        function appendOperator(op) {
            // If there's a pending calculation, complete it first
            if (previousInput && operator && !shouldResetDisplay) {
                calculate();
            }
            
            // Highlight the active operator button
            document.querySelectorAll('.btn-operator').forEach(btn => {
                btn.classList.remove('btn-active');
            });
            
            previousInput = currentInput;
            operator = op;
            shouldResetDisplay = true;
            updateDisplay();
        }

        function calculate() {
            if (!previousInput || !operator) return;
            
            try {
                const result = evaluateExpression();
                
                // Show final calculation
                const operatorSymbol = {
                    '+': '+',
                    '-': '−',
                    '*': '×',
                    '/': '÷'
                }[operator] || operator;
                
                displayCalculation.textContent = `${formatDisplayNumber(previousInput)} ${operatorSymbol} ${formatDisplayNumber(currentInput)} =`;
                
                currentInput = result.toString();
                displayResult.textContent = formatDisplayNumber(result);
                
                previousInput = '';
                operator = '';
                shouldResetDisplay = true;
                updateDisplay();
            } catch (error) {
                displayCalculation.textContent = 'Error';
                displayResult.textContent = error.message;
                currentInput = '0';
                previousInput = '';
                operator = '';
                shouldResetDisplay = true;
                
                setTimeout(() => {
                    displayCalculation.textContent = '';
                    displayResult.textContent = '';
                    updateDisplay();
                }, 2000);
            }
        }

        function evaluateExpression() {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            
            if (isNaN(prev) || isNaN(current)) {
                throw new Error('Invalid input');
            }
            
            let result;
            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        throw new Error('Cannot divide by zero');
                    }
                    result = prev / current;
                    break;
                default:
                    throw new Error('Invalid operator');
            }
            
            // Handle precision issues
            if (Math.abs(result) < 1e-10) {
                result = 0;
            }
            
            return result;
        }

        function clearAll() {
            currentInput = '0';
            previousInput = '';
            operator = '';
            shouldResetDisplay = false;
            calculationHistory = '';
            updateDisplay();
        }

        function clearEntry() {
            currentInput = '0';
            updateDisplay();
        }

        function backspace() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }

        // Enhanced ripple effect
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Enhanced keyboard support
        document.addEventListener('keydown', function(e) {
            e.preventDefault(); // Prevent default browser behavior
            
            const key = e.key;
            
            if ('0123456789'.includes(key)) {
                appendNumber(key);
            } else if (key === '.') {
                appendDecimal();
            } else if (key === '+') {
                appendOperator('+');
            } else if (key === '-') {
                appendOperator('-');
            } else if (key === '*') {
                appendOperator('*');
            } else if (key === '/') {
                appendOperator('/');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape') {
                clearAll();
            } else if (key === 'Backspace') {
                backspace();
            } else if (key === 'Delete') {
                clearEntry();
            }
        });

        // Initialize display
        updateDisplay();