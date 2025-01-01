import React, { useEffect, useState } from 'react';
import { getAllInvoice } from '../api/InvoiceService';

const InvoiceList = () => {
    const [invoiceList, setInvoiceList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getAllInvoice().then(result => {
            let list = result.data.map(
                invoice => <li key={invoice.invoiceNumber}>
                    Invoice Number : {invoice.invoiceNumber}
                    <ul>
                        <li>Vendor: {invoice.vendor}</li>
                        <li>Amount: {invoice.invoiceNumber}</li>
                        <li>Date: {invoice.invoiceDate}</li>
                        <li><a href={invoice.filePath}>file</a></li>
                    </ul>
                </li>
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