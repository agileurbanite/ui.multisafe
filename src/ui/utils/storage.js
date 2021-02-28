export const get = (k, d = {}) => {
  const v = localStorage.getItem(k);
  if (typeof d !== 'object') {
    return v;
  }
  try {
    return JSON.parse(v || JSON.stringify(d));
  } catch (e) {
    return v;
  }
};
export const set = (k, v) => localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
export const remove = (k) => localStorage.removeItem(k);
