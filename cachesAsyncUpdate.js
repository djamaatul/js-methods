const store = {

};

const save = (key,value) => {
    console.log('saving ...')
    store[key] = value
}

const get = async (key, get) => {
    const getValue = async (value = {}) => {
        if(typeof get === "function"){
        	const newValue = await get()
            if(JSON.stringify(value) !== JSON.stringify(newValue)){
                 save(key, newValue);   
            }
            return newValue
        }else{
            return false
        }
    }
	if (store[key]) {
        getValue(store[key])
		return store[key];
	} else {
        return await getValue()
    }
};
