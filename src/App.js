import './App.css';
import { useState, useEffect } from 'react';
import video from './food.mp4'
import MyRecipesComponent from './MyRecipesComponent';

function App() {

  // ID и ключ из API
  const MY_ID = "ea60a461";
  const MY_KYE = "ea891d0c3208354096ec57720c58284d"

  // прописываем состояние для поиска по буквам
  const [mySearch, setMySearch] = useState('');
  // прописываем состояние для отображения рецептов
  const [myRecipes, setMyRecipes] = useState([]); // тк из API мы получаем данные в виде массива объектов, начальное состояние прописываем как пустой массив [], в который потом будут записываться объекты при смене состояния
  // прописываем состояние для кнопки энтер
  const [wordSubmit, setWordSubmit] = useState('avocado'); // начальное состояние запроса 'avocado', при первой загрузке страницы будут выведены рецепты авокадо

  // useEffect( async () => {
  //   //const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=ea60a461&app_key=ea891d0c3208354096ec57720c58284d`) // ссылку взяла из документации, заполнив нужные графы 
  //   const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${MY_ID}&app_key=${MY_KYE}`);
  //   const data = await response.json();
  //   console.log(data)
  // }, [])

    useEffect (() => {
    fetchData() 
  }, [wordSubmit]); // связываем useEffect с состоянием wordSubmit - когда нажимаем энтер, вызывается useEffect

  const fetchData = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmit}&app_id=${MY_ID}&app_key=${MY_KYE}`); // подставляем ${wordSubmit} - именно по этому запросу от пользователя (ингридиента) будут выводиться рецепты
    const data = await response.json();
    setMyRecipes(data.hits); // смена состояния связана с результатом fetch запроса, будет отображать полученные рецепты
    console.log(response, data.hits)
  }

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
    console.log(e.target.value)
  }

  const finalSearch = (e) => { //при нажатии на энтер (е) - событие ивент
    e.preventDefault(); // отмена перезагрузки страницы
    setWordSubmit(mySearch); // меняем состояние отвечающее за нажатие кнопки, на то, что ввел пользователь (измененное состояние mySearch)
  }

  return (
    <div className="App">
      <div className="container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <h1>Find a Recipe</h1>
      </div>

      <div className="container">
        <form onSubmit={finalSearch}> {/**прописываем onSubmit, при нажатии на энтер запустится функция finalSearch, которая предотвратит перезагрузку страницы про отправке формы через нажатие энтер */}
          <input className='search' placeholder='search...' onChange={myRecipeSearch} value={mySearch}></input>
        </form>
        <button onClick={finalSearch}>
          <img src="https://img.icons8.com/color/256/fry.png" alt="icon" className='icons'/>
        </button>
        </div>
        
        <div className="container">

      </div>
     
<div className="cont">
  
        {myRecipes.map((element, el) => ( // методом Map получаем каждый рецепт (element) из API, el - используем как индекс, порядковый номер, чтобы убрать ошибку Each child in a list should have a unique "key" prop.
          <MyRecipesComponent key={el} 
          label={element.recipe.label} 
          image={element.recipe.image} 
          calories={Math.round(element.recipe.calories)} 
          ingredients={element.recipe.ingredientLines}/> //**label, image, calories - выступают пропсами для переноса данных в компонент MyRecipesComponent*/
        ))}
</div>

      
  </div>
  );
}

export default App;
