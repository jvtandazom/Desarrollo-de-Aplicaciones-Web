// Botón de alerta
document.getElementById('alertaBtn').addEventListener('click', function() {
    alert('¡Esta es una alerta personalizada usando JavaScript!');
});

// Validación del formulario
(function() {
    'use strict';
    
    // Obtener el formulario
    const form = document.getElementById('contactForm');
    
    // Escuchar el evento submit
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // Simular envío exitoso
            alert('Formulario enviado con éxito. ¡Gracias por contactarnos!');
            form.reset();
            // Remover clases de validación
            form.classList.remove('was-validated');
        }
        
        form.classList.add('was-validated');
    }, false);
    
    // Validación en tiempo real para el campo de email
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        if (emailInput.validity.typeMismatch) {
            emailInput.setCustomValidity('Por favor ingresa un correo electrónico válido.');
        } else {
            emailInput.setCustomValidity('');
        }
    });
})();