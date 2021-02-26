export const PHONE_VALIDATE = /(09|03|08|07|05)+([0-9]{9}|[0-9]{8})\b/;

export const EMAIL_VALIDATE = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const URL_VALIDDATE = /^(ftp|http|https):\/\/[^ "]+$/

export const PASSWORD_VALIDATE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/