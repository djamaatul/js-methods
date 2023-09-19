const retryUntil = (fn, max = Infinity) => {
    return new Promise((res,rej)=>{
        const retry = async (max, count = 0) => {
            try {
                const result = await fn(count);
                res(result)
            } catch (error) {
                if (count > max) {
                    return rej(error)
                }
                setTimeout(() => {
                    console.log('retry', count, max);
                    retry(max,  count + 1);
                }, count * 1000);
            }
        };
        retry(max)
    })
}
