function MyRecipesComponent({label, image, calories, ingredients}) {
    return(
        <div className="item">
            <h2>{label}</h2>
            <img src={image} alt="dish"/>

            <ul>
            {ingredients.map((ingredient, i) => ( // в методе map прописываем каждый ингридиент ingredient и порядковый номер ингридиента i - в качестве индекса, чтобы убрать ошибку Each child in a list should have a unique "key" prop.
                <li key={i}> {/** ключ равен i   */}
                    <img src="https://img.icons8.com/material-two-tone/256/checkmark--v2.png" className="icons" alt="check"/>
                    {ingredient}
                </li>
            ))}
            </ul>


            <p>Contains {calories} calories</p>
            
        </div>
    )
}

export default MyRecipesComponent;