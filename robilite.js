function component(param, options) {
    if (typeof param === 'string') {
        return param;
    }
    
    if (typeof param === 'object') {
        const { data, render } = param;

        return data
            .map(render)
            .join('');
    }
}

export {
    component
}