/* eslint-disable @typescript-eslint/no-explicit-any */

export const genRspJson = (data: any) => {
  return {
    success: true,
    data: convertDateToNumber(data),
  };
};

const convertDateToNumber = (data: any): any => {
  if (data instanceof Date) {
    return data.getTime();
  }

  if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = convertDateToNumber(data[key]);
      }
    }
  }

  return data;
};
