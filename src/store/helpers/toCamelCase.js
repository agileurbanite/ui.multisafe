import camelCase from 'camelcase';

export const toCamelCase = (value) => {
    if (Array.isArray(value)) return value.map((x) => toCamelCase(x));

    if (typeof value === 'object' && value !== null) {
        return Object.entries(value).reduce((acc, [key, val]) => {
            acc[camelCase(key)] = toCamelCase(val);
            return acc;
        }, {});
    }

    return value;
};
