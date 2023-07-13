// Validator functions to see whether user inputted their details correctly.

// University of Adelaide ID
export function adelaideId(id: string): boolean {
    const re = new RegExp(/^a\d{7}$/u, 'u');
    return re.exec(id) !== null;
}

// University of South Australia ID
export function unisaID(id: string): boolean {
    const re = new RegExp(/^\d{9}$/u, 'u');
    return re.exec(id) !== null;
}

// Square receipt code
export function receiptCode(code: string): boolean {
    const re = new RegExp(/^[a-zA-Z0-9]{4}$/u, 'u');
    return re.exec(code) !== null;
}
