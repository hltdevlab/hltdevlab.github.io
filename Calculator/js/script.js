class Calculator {
  previousOperant = null;
  currentOperant = '0';
  operator = null;
  /* displayBtmPrevHeight = null; */
  
  constructor() {
    const clearButton = document.getElementById('btn-clear');
    const delButton = document.getElementById('btn-del');
    const equalButton = document.getElementById('btn-equal');
    const numberButtons = document.getElementsByClassName('btn-number');
    const operatorButtons = document.getElementsByClassName('btn-operator');
  
    clearButton.addEventListener('click', (e) => {
      this.clear();
    });
    
    delButton.addEventListener('click', (e) => {
      if (this.currentOperant === null) return;
      
      this.currentOperant = this.currentOperant.slice(0, -1);
      if (this.currentOperant === '') {
        this.currentOperant = '0';
      }
      this.updateDisplay();
    });
    
    equalButton.addEventListener('click', (e) => {
      this.compute();
    });
  
    for (const numberButton of numberButtons) {
      numberButton.addEventListener('click', (e) => {
        const text = e.target.textContent;
        
        if (text === '.' && this.currentOperant === null) {
          this.currentOperant = '0.';
          this.updateDisplay();
          return;
          
        }else if (text === '.' && this.currentOperant.includes('.')) {
          return;
        }
        
        if (this.currentOperant === null) {
          this.currentOperant = text;
        }
        else {
          this.currentOperant += text;
        }
        
        this.updateDisplay();
      });
    }
    
    for (const operatorButton of operatorButtons) {
      operatorButton.addEventListener('click', (e) => {
        if (this.currentOperant === null) return;
        
        this.compute();
        
        this.operator = e.target.textContent;
        
        this.previousOperant = this.currentOperant;
        this.currentOperant = '0';
        
        this.updateDisplay();
      });
    }
    
    this.clear();
  }
  
  clear() {
    this.previousOperant = null;
    this.currentOperant = '0';
    this.operator = null;
    
    /*
    this.displayBtmPrevHeight = null;
    const displayBtm = document.getElementById('display-btm');
    if (displayBtm.hasAttribute('style')) {
      displayBtm.attributes.removeNamedItem('style');
    }
    */
    
    this.updateDisplay();
  }
  
  updateDisplay() {
    const displayTop = document.getElementById('display-top');
    const displayBtm = document.getElementById('display-btm');
    
    console.log(displayBtm.clientHeight);
    
    if (this.operator === null) {
      displayTop.innerText = this.toCommaNumberString(this.previousOperant);
    }
    else {
      displayTop.innerText = `${this.toCommaNumberString(this.previousOperant)} ${this.operator}`;
    }
    
    displayBtm.innerText = this.toCommaNumberString(this.currentOperant);
    
    /*
    if (this.displayBtmPrevHeight != null) {
      if (displayBtm.clientHeight > this.displayBtmPrevHeight) {
        // bigger
        console.log('bigger');
        var style = getComputedStyle(displayBtm, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style); 
        console.log(fontSize);
        displayBtm.style.fontSize = (fontSize / 2) + 'px';
        
      } else if (displayBtm.clientHeight < this.displayBtmPrevHeight) {
        // smaller
        console.log('smaller');
        var style = getComputedStyle(displayBtm, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style); 
        console.log(fontSize);
        displayBtm.style.fontSize = (fontSize * 2) + 'px';
      }
    }
    this.displayBtmPrevHeight = displayBtm.clientHeight;
    */
  }
  
  toCommaNumberString(str) {
    if (str === null) return '';
    
    const hasDot = str.includes('.');
    
    const arr = str.split('.');
    const wholeNumStr = arr[0];
    let decimalStr = ''
    if (arr.length === 2) {
      decimalStr = arr[1];
    }
    
    try {
      let resultantStr = parseFloat(wholeNumStr).toLocaleString();
      resultantStr += hasDot ? '.' : '';
      resultantStr += decimalStr;
      return resultantStr;
      
    } catch(e) {
      console.log('Error encountered in toCommaNumberString()');
      console.log(e);
      return '';
    }
  }
  
  compute() {
    if (this.previousOperant === null) return;
    
    const floatPreviousOperant = parseFloat(this.previousOperant);
    const floatCurrentOperant = parseFloat(this.currentOperant);
    
    if (this.operator === '+') {
      this.currentOperant = floatPreviousOperant + floatCurrentOperant;
      
    } else if (this.operator === '-') {
      this.currentOperant = floatPreviousOperant - floatCurrentOperant;
      
    } else if (this.operator === '*') {
      this.currentOperant = floatPreviousOperant * floatCurrentOperant;
      
    } else if (this.operator === '/') {
      this.currentOperant = floatPreviousOperant / floatCurrentOperant;
      
    }
    
    this.previousOperant = null;
    this.currentOperant = this.currentOperant.toString();
    this.operator = null;
    this.updateDisplay();
  }
};

const onload = () => {
  const calc = new Calculator();
};
