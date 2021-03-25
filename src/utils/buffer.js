export const decode = (payload) => {
  if (Object.prototype.toString.call(payload) === '[object Uint8Array]') {
    const data = new Uint8Array(payload);
    const decoder = new TextDecoder();

    return JSON.parse(decoder.decode(data));
  }
  return payload;
};
