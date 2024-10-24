import createError from "../utils/createError.js";
import Service from "../SchemaModules/service.model.js";


export const createService = async (req,res,next)=>{//we can only cretae service if we are seller 
    if(!req.isSeller) return next(createError(403,"only sellers can create services!"));

    const newService = new Service({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        next(err);
    };
};
export const deleteService = async (req,res,next)=>{
    try {
        const service = await Service.findById(req.params.id);

        if(service.userId !== req.userId)
            return next(createError(403,"you can only delete your Service"));
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).send("Service has been deleted!");
    } catch (err) {
        next(err)
    }
};

export const getService = async (req,res,next)=>{
    try {
        const service = await Service.findById(req.params.id);
        if(!service) next(createError(404,"service not found"))
        res.status(200).send(service);
    } catch (err) {
        next(err);
    }
};

export const getServices = async (req, res, next) => {
    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.catigory && { catigory: q.catigory }),  // Ensure the field name matches the database
        ...((q.min || q.max) && {
            price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) }
        }),
        ...(q.districts && { districts: { $in: q.districts.split(",") } }),//filter for district
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),  // Case insensitive search
    };

    try {
        const services = await Service.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(services);
    } catch (err) {
        next(err);
    }
};



