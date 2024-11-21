import mongoose from 'mongoose';

export const handleErrorResponse = (res, errorMsg, error, statusCode = 500) => {
    console.error('%s: %s', errorMsg, error);
    res.status(500).json({error: errorMsg});
};

export const checkValidityOfIdParameter = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' }); 
    }
};