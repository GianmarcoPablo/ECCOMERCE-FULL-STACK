
const isAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: "You want to verify the role without validating the token first"
        })
    }

    const { role, name } = req.user

    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} is not an administrator`
        })
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.userAuth) {
            return res.status(500).json({
                msg: "You want to verify the role without validating the token first"
            })
        }

        if (!roles.includes(req.userAuth.role)) {
            return res.status(401).json({
                msg: `The service requires one of these roles ${roles}`
            })
        }

        next();
    }
}

export {
    hasRole,
    isAdminRole
}