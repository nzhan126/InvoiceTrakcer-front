import axios from "axios";

const NEW_INVOICE_URL = 'http://localhost:8080/new-invoice';
const GET_ALL_INVOICE_URL = 'http://localhost:8080/get-all-invoices'

export async function saveInvoice(form) {
    try {
        const response = await axios.put(NEW_INVOICE_URL, form);
        console.log("Response Data:", response.data);
        return response.data; // Return the response data, which may include a success message or error
    } catch (error) {
        console.error("Error saving invoice:", error);
        throw new Error("Error saving invoice"); // Handle the error appropriately
    }
}


export async function getAllInvoice() {
    return await axios.get(GET_ALL_INVOICE_URL);
}