/**
 * @type {(fn: function, onError?: function)=> Promise<[Error|null,any|null]>}
 */
const safe = async (fn, onError) => {
    try {
        const data = await fn();
        return [null, data];
    } catch (error) {
        await onError?.(error);
        return [error, null];
    }
};
