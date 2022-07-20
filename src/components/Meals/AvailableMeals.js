import React, { useState, useEffect } from "react";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card/Card";

import useFetch from "../Hooks/use-fetch";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useFetch();

  useEffect(() => {
    const takeMealsHandler = (taskObj) => {
      const loadedMeals = [];

      for (const taskKey in taskObj) {
        loadedMeals.push({
          id: taskKey,
          description: taskObj[taskKey].description,
          price: taskObj[taskKey].price,
          name: taskObj[taskKey].name,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://hoisting-test-8cd02-default-rtdb.firebaseio.com/meals.json",
      },
      takeMealsHandler
    );
  }, [fetchMeals]);

  let content = <MealItem meals={meals} />;

  if (isLoading)
    content = <p className={classes.meals__loading}>Loading meals...</p>;

  if (error) content = <p>Something went wrong, refresh page!</p>;

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
