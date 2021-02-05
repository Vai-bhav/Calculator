const display=document.getElementById("input");
var buttonContainer=document.getElementById("button-container");
let operator=null;
let previousKey;
let decimalPresent=false;
let output=false;
function buttonPressed(event){
    let buttonValue=event.target.innerText;
    // console.log(buttonValue);
    // console.log(event.target.id);
    if(buttonValue==='+' || buttonValue==='*' || buttonValue==='-' || buttonValue==='/'){
        // console.log("operator key");
        handleOperatorEvent(buttonValue);
    }else if(buttonValue==='.'){
        // console.log("decimal key");
        handleDecimalEvent(buttonValue);
    }else if(buttonValue==='AC'){
        // console.log("clear key");
        display.value="";
        previousKey="clear";
    }else if(buttonValue==='='){
        // console.log("equal key");
        handleEqualKey();
    }else{
        // console.log("number key");
        handleNumberEvent(buttonValue);
    }
}
function handleEqualKey(){
    let expression=display.value;
    let evaluatedAnswer=eval(expression)+"";
    if(evaluatedAnswer.includes("/0")){
        display.value="Infinite";    
    }else{
        display.value=evaluatedAnswer;
    }
    output=true;
    previousKey="equal";
}
function handleOperatorEvent(operatorValue){
    if(output){
        display.value="";
    }
    output=false;
    let displayedExpression=display.value;
    console.log(displayedExpression);
    if(displayedExpression==="" && operatorValue==="-"){
        display.value="-";
    }else{
        let lastChar=displayedExpression.charAt(displayedExpression.length-1);
        let displayValue="";
        if(previousKey!=="lastChar"){
            if(lastChar==='+' || lastChar==='-' || lastChar==='/' || lastChar==='*'){
                for(let i=0;i<displayedExpression.length-1;i++){
                    displayValue+=displayedExpression.charAt(i);
                }
                displayValue+=operatorValue;
            }else{
                displayValue=displayedExpression+operatorValue;
            }
            operator=operatorValue;
            display.value=displayValue;
        }
    }
    decimalPresent=false;
    previousKey="operator";
}
function handleDecimalEvent(){
    if(output){
        display.value="";
    }
    if(previousKey!=="decimal" && !decimalPresent){
        display.value+=".";
        previousKey="decimal";
        decimalPresent=true;
    }
}
function handleNumberEvent(numberPressed){
    if(output){
        display.value="";
    }
    if(display.value===""){
        display.value=numberPressed;
        output=false;
    }else{
        display.value+=numberPressed;
    }
    previousKey="number";
}

buttonContainer.addEventListener("click",buttonPressed);