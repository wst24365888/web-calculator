class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText

        this.clear()
        this.updateDisplay()
    }

    clear() {
        this.allClear = true
        this.previousOperand = ""
        this.currentOperand = "0"
        this.operator = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    
        if(this.currentOperand === "" && this.previousOperand === "") {
            this.allClear = true
            this.currentOperand = "0"
        }
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) {
            return
        }

        console.log(this.allClear)
        
        if(this.currentOperand === "0" && this.allClear === true) {
            this.allClear = false

            this.currentOperand = number.toString()
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    chooserOperator(operator) {
        if(this.currentOperand === "") {
            return
        }
        
        if(this.previousOperand !== "") {
            this.compute()
        }

        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computationResult

        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) {
            return
        }

        switch(this.operator) {
            case '+':
                computationResult = prev + current
                break
            case '-':
                computationResult = prev - current
                break
            case '×':
                computationResult = prev * current
                break
            case '÷':
                computationResult = prev / current
                break
            default:
                return
        }

        this.currentOperand = computationResult
        this.previousOperand = ""
        this.operator = undefined
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerPart = parseInt(stringNumber.split('.')[0])
        const decimalPart = stringNumber.split('.')[1]

        let intergerDisplay

        if(isNaN(integerPart)) {
            intergerDisplay = ""
        } else {
            intergerDisplay = integerPart.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalPart != null) {
            return `${intergerDisplay}.${decimalPart}`
        } else {
            return intergerDisplay
        }
    }

    updateDisplay() {
        this.currentText.text(this.getDisplayNumber(this.currentOperand))

        if(this.operator != null) {            
            this.previousText.text(`${this.getDisplayNumber(this.previousOperand)} ${this.operator}`)
        } else {
            this.previousText.text("")
        }
    }
}

const previousText = $(".previous-operand")
const currentText = $(".current-operand")

const allClearButtons = $("button[data-type=all-clear]")
const deleteButtons = $("button[data-type=delete]")
const numberButtons = $("button[data-type=number]")
const operatorButtons = $("button[data-type=operator]")
const equalsButtons = $("button[data-type=equals]")

const calculator = new Calculator(previousText, currentText)

allClearButtons.click(function() {
    calculator.clear()
    calculator.updateDisplay()
})

numberButtons.click(function() {
    calculator.appendNumber($(this).text())
    calculator.updateDisplay()
})

deleteButtons.click(function() {
    calculator.delete()
    calculator.updateDisplay()
})

operatorButtons.click(function() {
    calculator.chooserOperator($(this).text())
    calculator.updateDisplay()
})

equalsButtons.click(function() {
    calculator.compute()
    calculator.updateDisplay()
})