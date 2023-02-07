
class Calculator {
    constructor(previousOperation, currentOperation){
        this.previousOperation = previousOperation;
        this.currentOperation = currentOperation;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = '';

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);

    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';


    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);                  
        if(isNaN(prev) || isNaN(current)) return                           
        switch (this.operation) {                                       
            case '+' :
                computation = prev + current
                break
            case '-' :
                computation = prev - current
                break
            case '*' :
                    computation = prev * current
                break
            case '÷' :
                    computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';


    }

    getDisplayNumber(number) {
        return number;
    }

   

    updateDisplay() {
        this.currentOperation.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperation.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else {
            this.previousOperation.innerHTML = ''
        }
        
    }
};

const numbers = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsBtn = document.querySelector('.equals');
const deleteBtn = document.querySelector('.delete');
const allClearBtn = document.querySelector('.allClear');
const previousOperation = document.querySelector('.previous-operation');
const currentOperation = document.querySelector('.current-operation');



const calculator = new Calculator(previousOperation, currentOperation)    

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        
    })
});

operationButtons.forEach(button => {                                 
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        
    })
});

equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBtn.addEventListener('click', button => {    
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})




//kiedy używać klas?