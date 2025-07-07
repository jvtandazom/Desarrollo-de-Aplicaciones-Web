document.addEventListener('DOMContentLoaded', function() {
    // Elementos del formulario
    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const ageInput = document.getElementById('age');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Expresiones regulares para validación
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Estado de validación
    const validationState = {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
        age: false
    };

    // Validación en tiempo real
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    ageInput.addEventListener('input', validateAge);

    // Validar nombre
    function validateName() {
        const value = nameInput.value.trim();
        const isValid = value.length >= 3;
        
        if (!value) {
            clearValidation(nameInput, 'name-error');
            validationState.name = false;
        } else if (!isValid) {
            showError(nameInput, 'name-error', 'El nombre debe tener al menos 3 caracteres');
            validationState.name = false;
        } else {
            showSuccess(nameInput, 'name-error');
            validationState.name = true;
        }
        
        updateSubmitButton();
    }

    // Validar email
    function validateEmail() {
        const value = emailInput.value.trim();
        const isValid = emailRegex.test(value);
        
        if (!value) {
            clearValidation(emailInput, 'email-error');
            validationState.email = false;
        } else if (!isValid) {
            showError(emailInput, 'email-error', 'Ingrese un email válido');
            validationState.email = false;
        } else {
            showSuccess(emailInput, 'email-error');
            validationState.email = true;
        }
        
        updateSubmitButton();
    }

    // Validar contraseña
    function validatePassword() {
        const value = passwordInput.value;
        const isValid = passwordRegex.test(value);
        
        if (!value) {
            clearValidation(passwordInput, 'password-error');
            validationState.password = false;
        } else if (!isValid) {
            showError(passwordInput, 'password-error', 
                'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales');
            validationState.password = false;
        } else {
            showSuccess(passwordInput, 'password-error');
            validationState.password = true;
        }
        
        // Si hay valor en confirmación, validar de nuevo
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
        
        updateSubmitButton();
    }

    // Validar confirmación de contraseña
    function validateConfirmPassword() {
        const value = confirmPasswordInput.value;
        const passwordValue = passwordInput.value;
        const isValid = value === passwordValue;
        
        if (!value) {
            clearValidation(confirmPasswordInput, 'confirm-password-error');
            validationState.confirmPassword = false;
        } else if (!isValid) {
            showError(confirmPasswordInput, 'confirm-password-error', 'Las contraseñas no coinciden');
            validationState.confirmPassword = false;
        } else {
            showSuccess(confirmPasswordInput, 'confirm-password-error');
            validationState.confirmPassword = true;
        }
        
        updateSubmitButton();
    }

    // Validar edad
    function validateAge() {
        const value = parseInt(ageInput.value);
        const isValid = !isNaN(value) && value >= 18;
        
        if (!ageInput.value) {
            clearValidation(ageInput, 'age-error');
            validationState.age = false;
        } else if (!isValid) {
            showError(ageInput, 'age-error', 'Debes ser mayor de 18 años');
            validationState.age = false;
        } else {
            showSuccess(ageInput, 'age-error');
            validationState.age = true;
        }
        
        updateSubmitButton();
    }

    // Mostrar error
    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Mostrar éxito
    function showSuccess(input, errorId) {
        const errorElement = document.getElementById(errorId);
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorElement.style.display = 'none';
    }

    // Limpiar validación
    function clearValidation(input, errorId) {
        const errorElement = document.getElementById(errorId);
        input.classList.remove('valid', 'invalid');
        errorElement.style.display = 'none';
    }

    // Actualizar botón de envío
    function updateSubmitButton() {
        const allValid = Object.values(validationState).every(Boolean);
        submitBtn.disabled = !allValid;
    }

    // Reiniciar formulario
    resetBtn.addEventListener('click', function() {
        // Limpiar clases de validación
        const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput, ageInput];
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // Ocultar mensajes de error
        const errorMessages = document.querySelectorAll('.error-msg');
        errorMessages.forEach(msg => {
            msg.style.display = 'none';
        });
        
        // Resetear estado de validación
        Object.keys(validationState).forEach(key => {
            validationState[key] = false;
        });
        
        // Deshabilitar botón de envío
        submitBtn.disabled = true;
    });

    // Enviar formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        validateName();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        validateAge();
        
        if (Object.values(validationState).every(Boolean)) {
            // Simular envío
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
                alert('¡Registro exitoso! Bienvenido/a.');
                form.reset();
                submitBtn.disabled = true;
            }, 500);
        } else {
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    });
});