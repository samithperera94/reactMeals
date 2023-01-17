import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';
import { useEffect,useState } from 'react';



const AvailableMeals = () => {
  const {sendRequest,isLoading,error:fetchError} = useHttp();
  const [mealList,setMealList] = useState([]);

  const transformData = (data)=> {
    console.warn("data",data,typeof data);
    const data_array = [];
    for(const key in data){
      data_array.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    console.warn(typeof data_array, "data_array >>>",data_array);
    setMealList(data_array);
  }

  useEffect(()=>{
    console.warn("calling useEffect")
    sendRequest({
      url:'https://react-tasks-ee846-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json',
      applyData:(data)=>transformData(data)
    });
  },[sendRequest])

  if(isLoading){
    return <p>loading ...</p>
  }

  if(fetchError){
    return <p>{fetchError}</p>
  }
  console.warn("mealList",mealList)
    const mealsList = mealList.map(meal => {
       return   <MealItem 
                    id={meal.id}
                    key={meal.id} 
                    name={meal.name} 
                    description={meal.description}
                    price={meal.price}
                />
        });

    return  <section className={classes.meals}>
                <Card>
                        <ul>
                            {mealsList}
                        </ul>
                </Card>               
            </section>
};

export default AvailableMeals;