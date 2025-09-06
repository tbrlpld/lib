// From Josh Comeau
// https://courses.joshwcomeau.com/joy-of-react/01-fundamentals/08-range-util
export function range (start: number, end?: number , step: number = 1): number[] {
  const output: number[] = [];

  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
}
