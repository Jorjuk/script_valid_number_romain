function validateForm() {
    let form = event.target;
    let phoneInput = form.querySelector('.phone');

    let phoneValue = phoneInput.value.trim();
    let digitsOnly = phoneValue.replace(/\D/g, ''); // лише цифри

    // Румыния: +40 (XX) XXX-XXXX → 11 цифр (3 + 8 цифр)
    if (digitsOnly.length !== 11) {
        alert('Vă rugăm să introduceți numărul complet de telefon, inclusiv prefixul.');
        return false;
    }

    // Список дійсних канадських area codes (основні)
    const validAreaCodes = [
        "70", "71", "72", "73", "74", "75", "76", "77", "78", "79"
    ];

    // Витягуємо area code з номера у форматі +40 (XX) XXX-XXXX
    let areaCodeMatch = digitsOnly.match(/^40([7]\d)\d{7}$/);

    if (areaCodeMatch && areaCodeMatch[1]) {
        let areaCode = areaCodeMatch[1];
        if (!validAreaCodes.includes(areaCode)) {
            alert('Prefix mobil invalid pentru România!: ' + validAreaCodes.join(', '));
            return false;
        }
    } else {
        alert('Vă rugăm să introduceți numărul în formatul corect: +40 (XX) XXX XXXX');
        return false;
    }

    // Пошук ідентифікаторів полів
    let num = form.querySelector('input[name^="tel"]').name.replace('tel', '') || 1;
    let name = form.querySelector('input[name^="name"]').name.replace('name', '') || '';

    sendorder(num);
    return false;
}
