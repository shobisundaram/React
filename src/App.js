import {React,useState,useEffect} from 'react';
// import './App.css';
import Wrapper from './Components/Wrapper';
import Screen from './Components/Screen';
import ButtonBox from './Components/ButtonBox';
import Button from './Components/Button';
import Output from './Components/Output';
import Calculator from './Calculator';
//  import LocalStorage from './Components/LocalStorage';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
const toLocaleString = (num) => {
 if(num) return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
 else return "0"
}
const removeSpaces = (num) => {
  if(num)return num.toString().replace(/\s/g, "");
  else return "0"
}
 const App = () => {
   let [calc, setCalc]= useState(() => {
    return Calculator({
      sign:"",
      numA: 0,
      numB:0,
      res:0,
      });
  });
let [history,setHistory]=useState([]);
let [showval,setShowval]=useState(0);
useEffect(()=>{
  console.log("History",showval)
},[history])

useEffect(()=>{

  console.log(showval)
  setCalc({
    calc,
    sign:"",
    numA:showval,
    numB:0,
    res:0,
  });

},[showval]
)
  useEffect(() => {
    console.log(calc)
    if (typeof window !== "undefined" && calc.sign != "" && calc.res && calc.res != "") {
      var item = JSON.parse(window.localStorage.getItem("history"))||[];
  
      item.push(Calculator({
        numA: calc.calc.numA || 0,
        sign:calc.calc.sign || "+",
        numB:calc.calc.numB || 0,
        res:calc.res || 0,
        })
      );
      setHistory(item);
      console.log(calc);
      window.localStorage.setItem("history", JSON.stringify(item));
    }
}, [calc]);

  // LocalStorage("histroy","",{
  //   sign:"",
  //   num:0,
  //   res:0,
  // });
  const numClickHandler=(e) =>{
    e.preventDefault();
    const value=e.target.innerHTML;
    // console.log(calc);
    const num = calc.numA || value;
    if (removeSpaces(calc.numA).length<16){
      setCalc({
      ...calc,
        numA:
        num === 0 && value === "0"
        ? "0"
        : removeSpaces(num) % 1 === 0
        ? toLocaleString(Number(removeSpaces((calc.numA || '') + value)))
        : toLocaleString((calc.numA || '') + value),
        //  res: !calc.sign ? 0: calc.res,
      });
    }
  };
  const commaClickHandler=(e)=>{
    e.preventDefault();
    const value=e.target.innerHTML;
    setCalc({
      ...calc,
      numA: !calc.numA.toString().includes(".") ? calc.numA + value: calc.numA,
      numB: !calc.numB.toString().includes(".") ? calc.numB + value: calc.numB,
    });
  };
  const signClickHandler=(e)=>{
    e.preventDefault();
    const value=e.target.innerHTML;
    setCalc({
      calc,
      sign: value,
    //   res: !calc.res && calc.numA ? calc.numA : calc.res,
      numB: !calc.res && calc.numA ? calc.numA : calc.res,
      numA: 0,
    });
  };
  const equalsClickHandler=()=>{
    if(calc.sign && calc.numA){
      const math =(a,b,sign)=>
      sign==="+"
      ? a+b
      :sign==="-"
      ?a-b
      :sign === "X"
      ?a*b
      :a/b;
      var num=0
      if(calc.numA==="0" && calc.sign ==="/" && calc.numB==="0" && calc.sign ==="/")
      {
       num="Can't divide with 0"
      } else{
       num= toLocaleString(
          math(     
            Number(removeSpaces(calc.numB)),
            Number(removeSpaces(calc.numA)),
            calc.sign
          )
          )
      }
      setCalc({
        calc,
        res:num,
        sign:" ",
        numA:0,
        numB:0,
      });
    }
  };
  
  const invertClickHandler=()=>{
    setCalc({
      calc,
      numA: calc.numA? toLocaleString(removeSpaces(calc.numA)* -1):0,
      numB: calc.numB? toLocaleString(removeSpaces(calc.numB)* -1):0,
      res: calc.res? toLocaleString(removeSpaces(calc.res)* -1):0,
      sign:"",
    });
  };
  const percentClickHandler =()=>{
    let numA= calc.numA? parseFloat(removeSpaces(calc.numA)):0;
    let numB= calc.numB? parseFloat(removeSpaces(calc.numB)):0;
    let res=calc.res? parseFloat(removeSpaces(calc.res)):0;
    setCalc({
      calc,
      numA:(numA /= Math.pow(100,1)),
      numB:(numB /= Math.pow(100,1)),
      res:(res /= Math.pow(100,1)),
      sign:"",
    });
  };
  const resetClickHandler=()=>{
    setCalc({
      calc,
      sign:"",
      numA:0,
      numB:0,
      res:0,
    });
  };
  return (
    
    <Wrapper>
      <Output value= { history } functions={{showval,setShowval}}> </Output>
      {/* <ul> */}
      {/* {history.map(item1=><li>{item1}</li>)} */}
      {/* </ul> */}

      <Screen value={calc.res?calc.res:calc.numA} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onclick={ 
                  btn ==="C"
                  ? resetClickHandler
                  :btn === "+-"
                  ? invertClickHandler
                  :btn ==="%"
                  ? percentClickHandler
                  :btn ==="="
                  ? equalsClickHandler
                  :btn === "/"|| btn === "X" || btn ==="-"||btn === "+"
                  ? signClickHandler
                  :btn ==="."
                  ? commaClickHandler
                  : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};
export default App;





