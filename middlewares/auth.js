import { expressjwt } from "express-jwt";

export const isAuthentication =expressjwt({
    secret:process.env.JWT_PRIVATE_KEY,
    algorithms:['HS256']
})

