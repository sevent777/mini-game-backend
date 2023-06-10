// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const genRspJson = (data: any) => {
  return {
    success: true,
    data,
  };
};
