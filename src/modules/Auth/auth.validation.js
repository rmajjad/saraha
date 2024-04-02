import joi from 'joi';

export const signUpSchema = {
    body: joi.object({
        userName: joi.string().alphanum().min(3).max(20).required().messages({
            "string.empty": "user name is required",
            "string.min": "user name must be more than 3 characters",
            "any.required": "user name is required",
        }),
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(8).max(30).required(),
        conPassword: joi.valid(joi.ref('password')).required(),
        age: joi.number().min(20).positive().integer(),
        gender: joi.string().valid('Male', 'Female').required(),
    }),
    // query: joi.object({
    //     test: joi.boolean().required(),
    // })
};

export const signInSchema = {
    body: joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "email is required",
    }),
    password: joi.string().alphanum().min(8).max(30),
}),
    params: joi.object({
        id: joi.number()
    })
};