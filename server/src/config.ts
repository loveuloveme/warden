import SMTPTransport from "nodemailer/lib/smtp-transport"

export const workPath = 'C:\\Users\\';

export const mail: SMTPTransport.Options = {
    host: "xx.xx.xx",
    port: 465,
    secure: true,
    auth: {
        user: "xxx@xxxx.x",
        pass: "xxxx"
    }
}