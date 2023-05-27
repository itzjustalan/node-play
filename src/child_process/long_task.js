export const long_task = async (number, count = 10) => {
  if (isNaN(number) || isNaN(count)) throw new Error("aah not a number");
  for (let i = 0; i < count; i++) number++;
  return number;
};

long_task(1, 1e10).then((sum) => process.send(sum));
