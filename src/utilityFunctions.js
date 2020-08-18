const capitalize = (name) =>
  [...name.split('')[0].toUpperCase(), ...name.split('').slice(1)].join('');

const concatenate = (name) =>
  name
    .split('-')
    .map((n) => capitalize(n))
    .join(' ');

export {capitalize, concatenate};
