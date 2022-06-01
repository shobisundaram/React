
import PropTypes from 'prop-types';


//functional stateless component
const Calculator = (props) => {
    return {
        calc:props.calc||{},
        sign:props.sign,
        numA:props.numA,
        numB:props.numB,
        res:props.res,
    };
}

// setup typechecking 
Calculator.propTypes = {
    calc:PropTypes.object,
    sign:PropTypes.string,
    numA: PropTypes.number,
    numB:PropTypes.number,
    res:PropTypes.number,
};

export default Calculator;
