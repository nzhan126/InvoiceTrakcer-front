import axios from "axios";

const NEW_INVOICE_URL = 'http://localhost:8080/new-invoice';
const GET_ALL_INVOICE_URL = 'http://localhost:8080/get-all-invoices'

export async function saveInvoice(form) {
    console.log(form)
    return await axios.put(NEW_INVOICE_URL, form);
}

export async function getAllInvoice() {
    return await axios.get(GET_ALL_INVOICE_URL);
}