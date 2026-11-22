// CARRUSELES INDIVIDUALES DE PROYECTOS

const projectSliders = document.querySelectorAll(".project-slider");

projectSliders.forEach((slider) => {

    const image = slider.querySelector(".slider-image");
    const prevButton = slider.querySelector(".slider-btn.prev");
    const nextButton = slider.querySelector(".slider-btn.next");
    const counter = slider.querySelector(".slider-counter");

    // Obtener el nombre de la primera imagen
    const firstImage = image.getAttribute("src");

    // Extraer el nombre del proyecto
    const projectName = firstImage.split("/").pop().split("-")[0];

    // Posición actual de la fotografía
    let currentImage = 1;

    // Total de fotografías
    const totalImages = 4;

    // Cambiar fotografía
    function updateImage() {
        const newImage = `assets/img/${projectName}-${currentImage}.jpeg`;

        const preloadImage = new Image();

        preloadImage.onload = () => {
            image.classList.add("changing");

            setTimeout(() => {
                image.src = newImage;
                counter.textContent = `${currentImage} / ${totalImages}`;

                image.style.transition = "none";
                image.style.transform = "rotateY(-180deg)";

                requestAnimationFrame(() => {
                    image.style.transition = "transform 0.5s ease-in-out";
                    image.style.transform = "rotateY(0deg)";
                    image.classList.remove("changing");
                });
            }, 500);
        };

        preloadImage.onerror = () => {
            console.error("No se pudo cargar:", newImage);
        };

        preloadImage.src = newImage;
    }


    // Fotografía anterior
    prevButton.addEventListener("click", () => {

        currentImage--;

        if (currentImage < 1) {
            currentImage = totalImages;
        }

        updateImage();

    });

    // Fotografía siguiente
    nextButton.addEventListener("click", () => {

        currentImage++;

        if (currentImage > totalImages) {
            currentImage = 1;
        }

        updateImage();

    });

});

