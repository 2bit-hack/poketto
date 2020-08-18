const capitalize = (name) =>
  [...name.split('')[0].toUpperCase(), ...name.split('').slice(1)].join('');

const concatenate = (name) =>
  name
    .split('-')
    .map((n) => capitalize(n))
    .join(' ');

const getProgress = (stat) => {
  // 15 is the minimum on my phone before it collapses into nothingness
  if (stat < 15) {
    stat = 15;
  }
  return Number.parseFloat((stat / 255).toFixed(1));
};

export {capitalize, concatenate, getProgress};
