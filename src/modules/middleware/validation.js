
const dataMethods = ['body', 'query', 'params', 'headers'];

const validation = (schema) => {

    return (req, res, next) => {
        const valedationArray = [];
        dataMethods.forEach(key => {
            if (schema[key]) {
                const valedationResult = schema[key].validate(req[key], { abortEarly: false });
                if (valedationResult.error) {
                    valedationArray.push(valedationResult.error);
                }
            }
        }
        );
        if (valedationArray.length > 0) {
            return res.status(400).json({message:"valedation error",valedationArray})
        }
        next();
    }
}

export default validation; 