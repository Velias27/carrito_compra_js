//cards.js

function generarCards() {
    const container = document.getElementById('cardsContainer');
    container.className = "row row-cols-1 row-cols-md-3 g-4";
    container.innerHTML = "";

    window.productos.forEach((producto, index) => {
        //Se crea la columna para card
        const colDiv = document.createElement("div");
        colDiv.className = "col";

        //Se crea card
        const cardDiv = document.createElement("div");
        cardDiv.className = "card h-100 p-3 rounded-4";

        //Se crea carrusel
        const carouselDiv = document.createElement("div");
        carouselDiv.id = `carousel-${index}`;
        carouselDiv.className = "carousel slide p-4";
        carouselDiv.setAttribute("data-bs-interval", "false");

        //Paginacion
        const carouselIndicators = document.createElement("div");
        carouselIndicators.className = "carousel-indicators";

        //Contenido del carrusel
        const carouselInner = document.createElement("div");
        carouselInner.className = "carousel-inner";

        producto.imagenes.forEach((imagen, imgIndex) => {
            const indicator = document.createElement("button");
            indicator.setAttribute("type", "button");
            indicator.setAttribute("data-bs-target", `#carousel-${index}`);
            indicator.setAttribute("data-bs-slide-to", imgIndex);
            if (imgIndex === 0) indicator.classList.add("active");
            carouselIndicators.appendChild(indicator);

            const carouselItem = document.createElement("div");
            carouselItem.className = `carousel-item ${imgIndex === 0 ? "active" : ""}`;

            const img = document.createElement("img");
            img.src = imagen;
            img.alt = producto.nombre;
            img.className = "d-block w-100";
            img.style.height = "200px";
            img.style.objectFit = "contain";

            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        });

        //Botones del carrusel
        const prevButton = document.createElement("button");
        prevButton.className = "carousel-control-prev";
        prevButton.setAttribute("type", "button");
        prevButton.setAttribute("data-bs-target", `#carousel-${index}`);
        prevButton.setAttribute("data-bs-slide", "prev");
        prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';

        const nextButton = document.createElement("button");
        nextButton.className = "carousel-control-next";
        nextButton.setAttribute("type", "button");
        nextButton.setAttribute("data-bs-target", `#carousel-${index}`);
        nextButton.setAttribute("data-bs-slide", "next");
        nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span>';

        //Armar el carrusel
        carouselDiv.appendChild(carouselIndicators);
        carouselDiv.appendChild(carouselInner);
        carouselDiv.appendChild(prevButton);
        carouselDiv.appendChild(nextButton);

        //Body del card
        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.innerText = producto.nombre;

        const description = document.createElement("p");
        description.className = "card-description";
        description.innerText = producto.descripcion;

        //Detalles
        const details = document.createElement("div");
        details.className = "card-details";
        details.innerHTML = `
       <strong>Precio:</strong> $${producto.precio}<br>
       <strong>Categoría:</strong> ${producto.categoria}<br>
       <strong>Stock disponible:</strong> ${producto.cantidad}
       `;

        //Botón agregar al carrito
        const btnAgregar = document.createElement("button");
        btnAgregar.className = "btn rounded-3 btnAgregar p-2 d-flex align-items-center";
        btnAgregar.style.height = "42px"; // Misma altura que el input
        btnAgregar.innerHTML = '<i class="fas fa-cart-plus me-2"></i> <span>Agregar</span>';
        btnAgregar.onclick = function () {
            agregarAlCarrito(producto.id, parseInt(cantidadInput.value));
        }

        //Control numérico
        const cantidadInput = document.createElement("input");
        cantidadInput.type = "number";
        cantidadInput.min = "1";
        cantidadInput.max = producto.cantidad.toString();
        cantidadInput.value = "1";
        cantidadInput.className = "form-control rounded-3 text-center";
        cantidadInput.style.width = "70px";
        cantidadInput.style.height = "42px";

        //Validacion al salir del campo numerico
        cantidadInput.addEventListener("blur", function () {
            const valor = parseInt(cantidadInput.value);
            if (isNaN(valor) || valor < 1) {
                alert("La cantidad debe ser positiva.");
                cantidadInput.value = "1";
            } else if (valor > producto.cantidad) {
                alert(`La cantidad no puede superar el stock disponible (${producto.cantidad}).`);
                cantidadInput.value = producto.cantidad.toString();
            }
        });

        //Contenedor para el control numérico y el botón
        const cantidadContainer = document.createElement("div");
        cantidadContainer.className = "d-flex align-items-center gap-2 mt-3";

        // Agregar los elementos al contenedor
        cantidadContainer.appendChild(cantidadInput);
        cantidadContainer.appendChild(btnAgregar);

        //Se agregan los elementos al card-body
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(details);
        cardBody.appendChild(cantidadContainer);

        //Se arma el card
        cardDiv.appendChild(carouselDiv);
        cardDiv.appendChild(cardBody);

        //Se agrega card a columna
        colDiv.appendChild(cardDiv);
        container.appendChild(colDiv);
    });

}