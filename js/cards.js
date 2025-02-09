//cards.js

function generarCards() {
    const container = document.getElementById('cardsContainer');
    container.className = "row row-cols-1 row-cols-md-3 g-4";
    container.innerHTML = "";

    window.productos.forEach(producto => {
        //Se crea la columna para card
        const colDiv = document.createElement("div");
        colDiv.className = "col";

        //Se crea card
        const cardDiv = document.createElement("div");
        cardDiv.className = "card h-100";

        //Se coloca imagen del producto
        const img = document.createElement("img");
        img.src = producto.imagenes[0];
        img.alt = producto.nombre;
        img.className = "card-img-top";

        //Body del card
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.innerText = producto.nombre;

        const text = document.createElement("p");
        text.className = "card-text";
        text.innerHTML = `
    ${producto.descripcion}<br>
    <strong>Precio:</strong> $${producto.precio}<br>
    <strong>Categoría:</strong> ${producto.categoria}<br>
    <strong>Stock disponible:</strong> ${producto.cantidad}
    `;

        //Botón agregar al carrito
        const btnAgregar = document.createElement("button");
        btnAgregar.className = "btn btn-primary mt-2";
        btnAgregar.innerText = "Agregar al carrito";
        btnAgregar.onclick = function () {
            agregarAlCarrito(producto.id);
        };

        cardBody.appendChild(title);
        cardBody.appendChild(text);
        cardBody.appendChild(btnAgregar);

        //Footer del card
        const cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";
        const small = document.createElement("small");
        small.className = "text-body-secondary";
        small.innerText = "última actualización";
        cardFooter.appendChild(small);

        //Card
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        cardDiv.appendChild(cardFooter);

        colDiv.appendChild(cardDiv);
        container.appendChild(colDiv);

    })

}