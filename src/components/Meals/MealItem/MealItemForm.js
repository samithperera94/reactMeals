import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef,useState} from 'react';

const MealItemForm = (props) => {
    const inputAmountRef = useRef();
    const [isAmountValid,setIsAmountValid] = useState(true);
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmout = inputAmountRef.current.value;
        const enteredAmoutNumber = +enteredAmout;

        if(
            enteredAmout.trim().length === 0 ||
            enteredAmoutNumber < 1 ||
            enteredAmoutNumber > 5
           ){
               setIsAmountValid(false)
            return
        }

        props.onAddToCart(enteredAmoutNumber);

    };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;