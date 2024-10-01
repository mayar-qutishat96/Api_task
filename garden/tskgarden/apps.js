document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formGarden');
    const nameInp = document.getElementById('nameInp');
    const sesonInp = document.getElementById('sesonInp');
    const selImg = document.getElementById('selImg');
    const tableBody = document.getElementById('bodCon');
    const clearListBtn = document.getElementById('clerLis');
    const tableHead = document.getElementById('headCon');

    const imagesData = {
        'alstroemerias': { price: 5, imgSrc: 'alstroemerias.png' },
        'gardenias': { price: 10, imgSrc: 'gardenias.jpeg' },
        'orchids': { price: 15, imgSrc: 'orchids.png' },
        'peonies': { price: 20, imgSrc: 'peonies.png' },
        'roses': { price: 25, imgSrc: 'roses.png' },
        'sunflowers': { price: 30, imgSrc: 'sunflowers.png' },
        'tulips': { price: 35, imgSrc: 'tulips.png' }
    };

    let gardenItems = JSON.parse(localStorage.getItem('gardenItems')) || [];

    form.style.border = '2px solid orange';
    tableBody.parentElement.style.border = '2px solid orange';

    displayTable();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = nameInp.value.trim();
        const season = sesonInp.value.trim();
        const selectedImage = selImg.value;

        if (name && season && selectedImage) {
            const newItem = {
                name: name,
                season: season,
                img: imagesData[selectedImage].imgSrc,
                price: imagesData[selectedImage].price
            };

            gardenItems.push(newItem);
            localStorage.setItem('gardenItems', JSON.stringify(gardenItems));
            form.reset();
            displayTable();
        }
    });

    function displayTable() {
        tableBody.innerHTML = '';
        if (gardenItems.length > 0) {
            tableHead.innerHTML = `
                <tr>
                    <th>Delete</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Season</th>
                    <th>Price</th>
                    <th>Edit</th>
                </tr>
            `;

            gardenItems.forEach((item, index) => {
                const row = document.createElement('tr');

                const deleteCell = document.createElement('td');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'X';
                deleteBtn.addEventListener('click', function () {
                    deleteItem(index);
                });
                deleteCell.appendChild(deleteBtn);
                row.appendChild(deleteCell);

                const imgCell = document.createElement('td');
                const imgElement = document.createElement('img');
                imgElement.alt = item.name;
                imgElement.style.width = '50px';
                imgElement.style.height = '50px';
                imgElement.src = item.img;
                imgCell.appendChild(imgElement);
                row.appendChild(imgCell);

                const nameCell = document.createElement('td');
                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.value = item.name;
                nameInput.disabled = true;
                nameCell.appendChild(nameInput);
                row.appendChild(nameCell);

                const seasonCell = document.createElement('td');
                const seasonInput = document.createElement('input');
                seasonInput.type = 'text';
                seasonInput.value = item.season;
                seasonInput.disabled = true;
                seasonCell.appendChild(seasonInput);
                row.appendChild(seasonCell);

                const priceCell = document.createElement('td');
                const priceInput = document.createElement('input');
                priceInput.type = 'number';
                priceInput.value = item.price;
                priceInput.disabled = true;
                priceCell.appendChild(priceInput);
                row.appendChild(priceCell);

                const editCell = document.createElement('td');
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', function () {
                    if (editBtn.textContent === 'Edit') {
                        nameInput.disabled = false;
                        seasonInput.disabled = false;
                        priceInput.disabled = false;
                        editBtn.textContent = 'Save';
                    } else {
                        const updatedName = nameInput.value.trim();
                        const updatedSeason = seasonInput.value.trim();
                        const updatedPrice = parseFloat(priceInput.value);

                        if (updatedName && updatedSeason && !isNaN(updatedPrice)) {
                            gardenItems[index].name = updatedName;
                            gardenItems[index].season = updatedSeason;
                            gardenItems[index].price = updatedPrice;
                            localStorage.setItem('gardenItems', JSON.stringify(gardenItems));
                            nameInput.disabled = true;
                            seasonInput.disabled = true;
                            priceInput.disabled = true;
                            editBtn.textContent = 'Edit';
                        }
                        displayTotalPrice();
                    }
                });
                editCell.appendChild(editBtn);
                row.appendChild(editCell);

                tableBody.appendChild(row);
            });
            displayTotalPrice();
        } else {
            tableHead.innerHTML = '';
        }
    }

    function displayTotalPrice() {
        const totalRow = document.getElementById('totalRow');
        if (totalRow) totalRow.remove();
        const total = gardenItems.reduce((sum, item) => sum + item.price, 0);
        const newRow = document.createElement('tr');
        newRow.id = 'totalRow';
        newRow.innerHTML = `
            <td colspan="4">Total Price:</td>
            <td>$${total}</td>
            <td></td>
        `;
        tableBody.appendChild(newRow);
    }

    function deleteItem(index) {
        gardenItems.splice(index, 1);
        localStorage.setItem('gardenItems', JSON.stringify(gardenItems));
        displayTable();
    }

    clearListBtn.addEventListener('click', function () {
        gardenItems = [];
        localStorage.setItem('gardenItems', JSON.stringify(gardenItems));
        displayTable();
    });
});
