export const debounce = (inner, ms = 0) => {
    let timeout = null;
    let resolves = [];

    return (...args) => {
    // Run the function after a certain amount of time
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            // Get the result of the inner function, then apply it to the resolve function of
            // each promise that has been created since the last time the inner function was run
            const result = inner(...args);
            resolves.forEach((r) => r(result));
            resolves = [];
        }, ms);

        return new Promise((r) => resolves.push(r));
    };
};
