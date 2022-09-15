import { useEffect, useState } from 'react';
import classes from  './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(()=> {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-d9220-default-rtdb.firebaseio.com/meals.json');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const transFormedData = [];
      for (const key in data)
      {
        transFormedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(transFormedData);
      setIsLoading(false);
    }

    fetchMeals().catch(err => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if (isLoading)
  {
    return (
      <section className={classes.mealsLoading}>
      <h1>Loading...!</h1>
    </section>
    )
  }
  
  if (httpError)
  {
    return (
      <section className={classes.mealsHttpError}>
      <h1>{httpError}</h1>
    </section>
    )
  }


  const mealsList = meals.map(meal => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ) 
  });

  return (
    <section className={classes.meals}>
      <Card>
      <ul>
        {mealsList}
      </ul>
      </Card>
    </section>
  )
}
export default AvailableMeals; 
