document.getElementById("enter-button").addEventListener("click", function() {
    document.getElementById("content-section").style.display = "flex";
    document.getElementById("welcome-section").style.display = "none";
});

// Función para actualizar el contador
function updateCounter() {
    const startDate = new Date("October 3, 2023 00:00:00"); // Fecha de inicio de la relación
    const currentDate = new Date();

    const timeDiff = currentDate - startDate; // Diferencia en milisegundos

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("counter").innerHTML =
        `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;

    setTimeout(updateCounter, 1000); // Actualizar cada segundo
}

// Iniciar contador
updateCounter();

// Función para manejar la carga de imágenes
document.getElementById("upload-button").addEventListener("click", function() {
    const fileInput = document.getElementById("image-upload");
    const gallery = document.getElementById("gallery");
    const files = fileInput.files;

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(event) {
                const imgElement = document.createElement("img");
                imgElement.src = event.target.result;
                
                // Crear un botón de eliminar para cada foto
                const deleteButton = document.createElement("button");
                deleteButton.innerText = "X";
                deleteButton.classList.add("delete-button");
                deleteButton.onclick = function() {
                    gallery.removeChild(imgElement);
                    gallery.removeChild(deleteButton);
                    saveImagesToLocalStorage(); // Guardar nuevamente después de eliminar una foto
                };

                // Agregar la imagen y el botón a la galería
                gallery.appendChild(imgElement);
                gallery.appendChild(deleteButton);
                saveImagesToLocalStorage(); // Guardar en localStorage
            };

            reader.readAsDataURL(file); // Cargar la imagen como base64
        }
    }
});

// Función para guardar las imágenes en localStorage
function saveImagesToLocalStorage() {
    const gallery = document.getElementById("gallery");
    const images = [];
    const imageElements = gallery.getElementsByTagName("img");
    
    for (let i = 0; i < imageElements.length; i++) {
        images.push(imageElements[i].src);
    }

    localStorage.setItem("uploadedImages", JSON.stringify(images)); // Guardar imágenes como JSON
}

// Función para cargar las imágenes desde localStorage
function loadImagesFromLocalStorage() {
    const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    const gallery = document.getElementById("gallery");

    savedImages.forEach(function(imgSrc) {
        const imgElement = document.createElement("img");
        imgElement.src = imgSrc;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function() {
            gallery.removeChild(imgElement);
            gallery.removeChild(deleteButton);
            saveImagesToLocalStorage(); // Guardar nuevamente después de eliminar una foto
        };

        gallery.appendChild(imgElement);
        gallery.appendChild(deleteButton);
    });
}

// Cargar las imágenes cuando la página se cargue
window.onload = loadImagesFromLocalStorage;

// Función para mostrar el botón cuando se hace scroll
window.onscroll = function() {
    showBackToTopButton();
};

// Mostrar el botón cuando se hace scroll hacia abajo
function showBackToTopButton() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
}

// Función para desplazar la página hacia arriba de manera suave
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
