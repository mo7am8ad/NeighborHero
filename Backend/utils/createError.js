//file for creating the errors so we can call them easily 

const createError = (status,message)=>{
    const err = new Error();
    err.status = status;
    err.message = message;

    return err;
};

export default createError;