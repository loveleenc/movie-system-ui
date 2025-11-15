import dotenv from 'dotenv'

dotenv.config({path: './.env'})

let BASE_URL:string = "";
if(process.env.NODE_ENV === 'production'){
    BASE_URL = process.env.BASE_URL_PROD ? process.env.BASE_URL_PROD : ""
}
else if(process.env.NODE_ENV === 'development'){
    BASE_URL = process.env.BASE_URL_DEV ? process.env.BASE_URL_DEV : ""
}

export default {
    BASE_URL
}