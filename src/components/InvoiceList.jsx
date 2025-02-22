import React, { useEffect, useState } from 'react';
import { getAllInvoice } from '../api/InvoiceService';



const getFileUrl = (filePath) => {
    // Replace the local file path prefix with the URL path to access it
    const basePath = '';  // This should match your static folder structure
    const fileName = filePath.replace('/Users/ni/projects/server/src/main/resources/static', basePath);
    return `http://localhost:8080${fileName}`;
};

//delete button

const handleDelete = async (invoiceNumber) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
        try {
            const response = await fetch(` http://localhost:8080/delete-invoice/${invoiceNumber}`, {
                method: "DELETE",
            });
  
            if (response.ok) {
                alert("Invoice deleted successfully.");
                //refresh the list or update the state to remove the deleted invoice
                window.location.reload(); 
            } else {
                alert("Failed to delete the invoice. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting invoice:", error);
            alert("An error occurred while deleting the invoice.");
        }
    }
  };

const InvoiceList = () => {
    const [invoiceList, setInvoiceList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getAllInvoice().then(result => {
            let list = result.data.map(
                invoice => {
                    const readableDate = new Date(invoice.invoiceDate).toLocaleDateString();

                return(<tr key={invoice.invoiceNumber}>
                        <td style={{ padding: "10px" }}> <strong>Invoice Number</strong> : {invoice.invoiceNumber}</td>
                        <td style={{ padding: "10px" }}> <strong>Vendor</strong>: {invoice.vendor}</td>
                        <td style={{ padding: "10px" }}> <strong>Amount</strong>: {invoice.invoiceNumber}</td>
                        <td style={{ padding: "10px" }}> <strong>Date</strong>: {readableDate}</td>
                        <td style={{ padding: "10px" }}> <strong>Project</strong>: {invoice.project}</td>
                        <td style={{ padding: "10px" }}> <a href={getFileUrl(invoice.filePath)} target="_blank" rel="noopener noreferrer">
        View File
    </a></td>
                        <td style={{ padding: "10px" }}>
            <button
                onClick={() => handleDelete(invoice.invoiceNumber)}
                style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                }}
            >
                Delete
            </button>
        </td>
                
                </tr>);
                
                }
            );
            setInvoiceList(list);
        });
        setLoading(false);
    }, []);

    if (loading) {
        return (<div>
            <span>Is loading</span>
        </div>);
    }
    
    return (
        <div>
            <h2>Invoices</h2>
            <ul>
                {invoiceList}
            </ul>
        </div>
    );
};

export default InvoiceList;