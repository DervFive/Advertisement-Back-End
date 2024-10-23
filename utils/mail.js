import { createTransport } from "nodemailer";

export const mailTransporter =createTransport({
    service:"Gmail",
    host:"smtp.gmail.com",
    port:"465",
    secure:true,
    auth:{
        user:"quaicoephilip14@gmail.com",
        pass:process.env.EMAIL_PASSWORD_KEY
    },
    from:"quaicoephilip14@gmail.com"
});