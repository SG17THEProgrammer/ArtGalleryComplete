module.exports.validator = (schema) => async(req,res,next)=>{
    try {
        const parse = await schema.parseAsync(req.body);
        req.body = parse;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message : error.errors.map(obj=>obj.message)
        })
    }
    }