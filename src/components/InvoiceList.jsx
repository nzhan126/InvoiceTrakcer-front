import React, { useEffect, useState } from 'react';
import { getAllInvoice } from '../api/InvoiceService';

const getFileUrl = (filePath) => {
    // Define the URL path to access files in the public static directory
    const basePath = '';  // This should match the path where the file is publicly accessible
    const fileName = filePath.replace('/Users/ni/projects/invoice-tracker-server/src/main/resources/static', basePath);
    return `http://localhost:8080${fileName}`;
};



const handleDelete = async (invoiceNumber) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
        try {
            const response = await fetch(`http://localhost:8080/delete-invoice/${invoiceNumber}`, {
                method: "DELETE",
            });
  
            if (response.ok) {
                alert("Invoice deleted successfully.");
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
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        getAllInvoice().then(result => {
            setInvoiceList(result.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const filteredInvoices = invoiceList.filter(invoice =>
        invoice.vendor.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        invoice.project.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div><span>Loading...</span></div>;
    }
    
    return (
        <div>
            <h2>Invoices</h2>
            <input 
                type="text" 
                placeholder="Search by vendor or project..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
            />
            <table>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Vendor</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Project</th>
                        <th>File</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvoices.map(invoice => (
                        <tr key={invoice.invoiceNumber}>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.vendor}</td>
                            <td>{invoice.amount}</td>
                            <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                            <td>{invoice.project}</td>
                            <td>
                                <a href={getFileUrl(invoice.filePath)} target="_blank" rel="noopener noreferrer">
                                    View File
                                </a>
                            </td>
                            <td>
                                <button 
                                    onClick={() => handleDelete(invoice.invoiceNumber)}
                                    style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", fontSize: "12px", cursor: "pointer" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
