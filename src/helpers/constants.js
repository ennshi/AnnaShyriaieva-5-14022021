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
        type: 'text',
        validate: {
            required: true,
            min: 2,
            max: 20,
            pattern: /w+/
        }
    },
    {
        fieldName: 'lastName',
        label: 'Nom',
        type: 'text',
        validate: {
            required: true,
            min: 2,
            max: 20,
            pattern: /w+/
        }
    },
    {
        fieldName: 'address',
        label: 'Adresse',
        type: 'text',
        validate: {
            required: true,
            min: 5,
            max: 20,
        }
    },
    {
        fieldName: 'city',
        label: 'Ville',
        type: 'text',
        validate: {
            required: true,
            min: 2,
            max: 20,
        }
    },
    {
        fieldName: 'email',
        label: 'E-mail',
        type: 'email',
        validate: {
            required: true,
            pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        }
    },
];
