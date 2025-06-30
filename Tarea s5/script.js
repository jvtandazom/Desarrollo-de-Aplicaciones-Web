document.addEventListener('DOMContentLoaded', function() {
    const imageUrlInput = document.getElementById('imageUrl');
    const addButton = document.getElementById('addButton');
    const removeButton = document.getElementById('removeButton');
    const galleryContainer = document.getElementById('galleryContainer');
    
    let selectedImage = null;
    
    function addImage() {
        const imageUrl = imageUrlInput.value.trim();
        
        if (!imageUrl) {
            alert('Por favor ingresa una URL válida');
            return;
        }
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagen agregada por el usuario';
        
        galleryItem.addEventListener('click', function() {
            if (selectedImage) {
                selectedImage.classList.remove('selected');
            }
            galleryItem.classList.add('selected');
            selectedImage = galleryItem;
            removeButton.disabled = false;
        });
        
        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
        
        imageUrlInput.value = '';
    }
    
    function removeSelectedImage() {
        if (selectedImage) {
            selectedImage.style.opacity = '0';
            setTimeout(() => {
                galleryContainer.removeChild(selectedImage);
                selectedImage = null;
                removeButton.disabled = true;
            }, 300);
        }
    }
    
    addButton.addEventListener('click', addImage);
    
    imageUrlInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addImage();
        }
    });
    
    removeButton.addEventListener('click', removeSelectedImage);
});