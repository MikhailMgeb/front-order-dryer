const cardsList = document.querySelector('.cards-list');

function getMenuList() {
    cardsList.innerHTML = '';
    fetch('http://localhost:3000/menu-list')
        .then(response => response.json())
        .then((data) => {
            for (const item of data) {
                const tr = document.createElement('tr');

                const rowName = document.createElement('th');
                rowName.textContent = item.name;

                const rowIngredients = document.createElement('th');
                rowIngredients.textContent = item.ingredients;

                const rowPrice = document.createElement('th');
                rowPrice.textContent = item.price;

                const rowSrc = document.createElement('th');
                rowSrc.textContent = item.src;

                const rowButton = document.createElement('th');
                rowButton.classList.add('cards-list__button-delete');
                rowButton.dataset.id = item._id;
                rowButton.textContent = 'Удалить';

                tr.appendChild(rowName);
                tr.appendChild(rowIngredients);
                tr.appendChild(rowPrice);
                tr.appendChild(rowSrc);
                tr.appendChild(rowButton);

                cardsList.appendChild(tr);
            }
        })
}
setInterval(() => {
    getMenuList()
}, 5000)

cardsList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('cards-list__button-delete')) {
        fetch(`http://localhost:3000/admin-menu/_delete-dish/${target.dataset.id}`, {
            method: 'DELETE'
        })
        getMenuList();
    }
})

const formCard = document.querySelector('.card__body');

formCard.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = formCard.elements['title'].value;
    const ingredients = formCard.elements['ingredients'].value.replaceAll(' ', '').split(',');
    const price = formCard.elements['price'].value;
    const src = formCard.elements['link'].value;

    fetch('http://localhost:3000/admin-menu/_create-dish', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name, ingredients, price, src })
    })
})
