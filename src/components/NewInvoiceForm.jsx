import React, { useState } from 'react';
import { saveInvoice } from '../api/InvoiceService';

const NewInvoiceForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceFormData, setInvoiceFormData] = useState(null);









  const handleSubmit = (e) => {
    e.preventDefault();
    if (!invoiceFormData.has('invoiceNumber')) {
      alert('Empty invoice number!');
    } else if (!invoiceFormData.has('vendor')) {
      alert('Empty vendor!');
    } else if (!invoiceFormData.has('file')) {
      alert('Empty file!');
    } else if (!invoiceFormData.has('invoiceDate')) {
      alert('Empty invoiceDate!');
    } else if(!invoiceFormData.has('project')){
      alert('Empty project!');
    }

    saveInvoice(invoiceFormData);
    setIsModalOpen(false);
    setInvoiceFormData(null);
    window.location.reload();
  };

  const handleCancle = () => {
    setIsModalOpen(false);
    setInvoiceFormData(null);
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    let formData = invoiceFormData;
    if (formData === null) {
      formData = new FormData();
      setInvoiceFormData(formData);
    }

    if (files) {
      const file = files[0];
      formData.set('file', file, file.name);
    }
    else {
      formData.set(name, value);
    }
  };

  if (!isModalOpen) {
    return <button onClick={() => setIsModalOpen(true)}>New Invoice</button>;
  }

  return (
    <div>
      <div>
        <h2>Create New Invoice</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="invoiceNumber">Invoice Number</label>
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="vendor">Vendor</label>
            <input
              type="text"
              id="vendor"
              name="vendor"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="invoiceDate"
              name="invoiceDate"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="project">Project</label>
            <input
              type="text"
              id="project"
              name="project"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Submit</button>
          <button type="button" onClick={() => handleCancle()}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewInvoiceForm;