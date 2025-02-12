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
        cardDiv.className = "card h-100";
       
        //Crear carrusel
        const carouselDiv = document.createElement("div");
        carouselDiv.id = `carousel-${index}`;
        carouselDiv.className = "carousel slide";
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
            img.style.objectFit = "cover";
            
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
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.innerText = producto.nombre;

        const text = document.createElement("p");
        text.className = "card-text";
        text.innerHTML = `${producto.descripcion}<br><br>
        <strong>Precio:</strong> $${producto.precio}<br>
        <strong>Categoría:</strong> ${producto.categoria}<br>
        <strong>Stock disponible:</strong> ${producto.cantidad}`;

        //Botón agregar al carrito
        const btnAgregar = document.createElement("button");
        btnAgregar.className = "btn btn-primary mt-2";
        btnAgregar.innerHTML = '<i class="fas fa-cart-plus"></i>';
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
        cardDiv.appendChild(carouselDiv);
        cardDiv.appendChild(cardBody);
        cardDiv.appendChild(cardFooter);

        colDiv.appendChild(cardDiv);
        container.appendChild(colDiv);

    })

}