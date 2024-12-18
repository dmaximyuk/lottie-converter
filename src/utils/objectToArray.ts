type ObjectToArray<T> = {
  [key: string]: T;
};

export const objectToArray = <T>(
  obj: ObjectToArray<T>,
): Array<{ id: string } & T> => {
  return Object.entries(obj).map(([id, data]) => ({ id, ...data }));
};
