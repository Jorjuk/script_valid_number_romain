function validateForm(){
    // Отримуємо значення телефону
    let form = event.target; // Форма, яку користувач відправляє
    let phoneInput = form.querySelector('.phone'); // Беремо телефон саме з цієї форми

    let phoneValue = phoneInput.value;
    let digitsOnly = phoneValue.replace(/\D/g, ''); // Видаляємо всі нецифрові символи

    // Перевірка на кількість цифр
    if (digitsOnly.length !== 11) { // Перевіряємо, чи 11 цифр (формат +40 (XX) XXX-XXXX → 11 цифр (3 + 8 цифр)
        alert('Vă rugăm să introduceți numărul complet de telefon, inclusiv prefixul.');
        return false; // Зупиняємо відправку форми
    }

    // Основні коди  мобільних операторів
    const validOperators = ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"];
    let operatorCode = phoneValue.match(/\+40 \((7\d)\)/); // // Витягуємо area code з номера у форматі +40 (XX) XXX-XXXX

    if (operatorCode && operatorCode[1]) {
        if (!validOperators.includes(operatorCode[1])) {
            alert(''Prefix mobil invalid pentru România!: ' + validOperators.join(', '));
            return false; // Зупиняємо відправку форми
        }
    } else {
        alert('Vă rugăm să introduceți numărul în formatul corect: +40 (7X) XXX XXXX');
        return false; // Зупиняємо відправку форми
    }

    let num = form.querySelector('input[name^="tel"]').name.replace('tel', '') || 1;
    let name = form.querySelector('input[name^="name"]').name.replace('name', '') || '';
    
    // Якщо перевірки пройшли успішно, викликаємо sendorder
    sendorder(num); // Відправка форми через sendorder
    return false; // Повертаємо false, щоб форма не відправлялася стандартним способом
};
