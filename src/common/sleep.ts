const sleep = (time: number) =>
  new Promise((res) => setTimeout(res, time, 'done sleeping'));

export default sleep;
