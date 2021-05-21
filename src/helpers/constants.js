export const PAGES = {
    INDEX: '#',
    CART: '#panier',
    BEAR_DETAILS: '#ours'
};

export const BEAR_COLORS = {
    "Tan": 'tan',
    "Chocolate": 'chocolate',
    "Black": 'black',
    "White": 'white',
    "Pale brown": '#987654',
    "Dark brown": '#654321',
    "Brown": 'brown',
    "Blue": 'blue',
    "Pink": 'pink',
    "Beige": '#f5f5dc'
};

export const formFields = [
    {
        fieldName: 'firstName',
        label: 'Prénom',
        type: 'text'
    },
    {
        fieldName: 'lastName',
        label: 'Nom',
        type: 'text'
    },
    {
        fieldName: 'address',
        label: 'Adresse',
        type: 'text'
    },
    {
        fieldName: 'city',
        label: 'Ville',
        type: 'text'
    },
    {
        fieldName: 'email',
        label: 'E-mail',
        type: 'email'
    },
];

export const validators = {
    'firstName': ['required'],
    'lastName': ['required'],
    'address': ['required'],
    'city': ['required'],
    'email': ['required'],
}