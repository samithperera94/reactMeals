import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;


const Checkout = (props) => {

  const [formStateValidity,setFormStateValidity] = useState({
    name:true,
    street:true,
    postal:true,
    city:true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();


  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const entereCity = cityInputRef.current.value;

    const enteredNameISValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = !isEmpty(enteredPostal) && isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(entereCity);

    setFormStateValidity({
      name:enteredNameISValid,
      street:enteredStreetIsValid,
      postal:enteredPostalIsValid,
      city:enteredCityIsValid
    });

    const isFormValid = enteredNameISValid && 
                        enteredStreetIsValid && 
                        enteredPostalIsValid &&
                        enteredCityIsValid;

    if(!isFormValid){
      return
    }       
    //submit     
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: entereCity
    })  


  
  };

  const nameControlClasses = formStateValidity.name ? '' : classes.invalid;
  const streetControlClasses = formStateValidity.street ? '' : classes.invalid;
  const postalControlClasses = formStateValidity.postal ? '' : classes.invalid;
  const cityControlClasses = formStateValidity.city ? '' : classes.invalid;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameControlClasses}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formStateValidity.name && <p>Please Enter Valid Name! </p>}
      </div>
      <div className={`${classes.control} ${streetControlClasses}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'  ref={streetInputRef}/>
        {!formStateValidity.street && <p>Please Enter Valid Street! </p>}
      </div>
      <div className={`${classes.control} ${postalControlClasses}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formStateValidity.postal && <p>Please Enter Valid Postal Code! (5 characters) </p>}
      </div>
      <div className={`${classes.control} ${cityControlClasses}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formStateValidity.city && <p>Please Enter Valid Postal Code! </p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;