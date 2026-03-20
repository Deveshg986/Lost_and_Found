const isStaff = (req, res, next)=>{
    if(!req.user || req.user.role !== "STAFF"){
        return res.status(403).json({
            message: "Only Staff Can delete Item"
        });
    }
    next();
}

module.exports = isStaff