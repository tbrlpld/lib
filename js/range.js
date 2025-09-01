// From Josh Comeau
// https://courses.joshwcomeau.com/joy-of-react/01-fundamentals/08-range-util
const range = (start, end, step = 1) => {
  let output = [];

  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
};
