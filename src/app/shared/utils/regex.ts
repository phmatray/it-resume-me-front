export const regex = {
  email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*([0-9]|[^\w\s]))/g,
  latin: /^[A-Za-z-\s]+$/,
  numbers: /^\d+$/,
  latinAndNumbers: /^[A-Za-z0-9]+$/,
  latinAndSpaces: /^[A-Za-z\s]*$/,
  phone: /^[0-9-]+$/,
  safe: /^([\sA-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])*$/
};

export const regexErrors = {
  email: 'Email is incorrect',
  password: 'Password must contain an upper case letter, a lower case letter and a number',
  latin: 'Latin letters only',
  numbers: 'Digits only',
  latinAndNumbers: 'Latin letters and digits only',
  latinAndSpaces: 'Latin letters and spaces only',
  phone: 'Phone number is incorrect',
  safe: 'Latin letters, numbers and special characters only'
};
