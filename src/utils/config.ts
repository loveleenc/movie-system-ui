
let BASE_URL:string = "";
if(import.meta.env.DEV){
    BASE_URL = import.meta.env['VITE_BASE_URL_DEV']
}
else if(import.meta.env.PROD){
    BASE_URL = import.meta.env['VITE_BASE_URL_PROD']
}

export default {
    BASE_URL
}