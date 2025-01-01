import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'; // Import PrimeReact Button
import { GiftDetails } from '../../../core/services/gift.service';
import { useNavigate } from 'react-router-dom';
const GiftTable = ({data,search}) => {
    const [products,setproducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [paymentDetail,setPaymentDetail] = useState(null)
    const navigate = useNavigate();

    const fetchData = async (id) => {
      try {
        const response = await GiftDetails(id);
        setPaymentDetail(response.data);
        localStorage.setItem('paymentDetail', JSON.stringify(response.data));
        navigate(`/payment/${id}/event-details`)
    
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (!search) {
          // If search is empty, show all products
          setFilteredProducts(products);
      } else {
          // Filter products based on the search term (case-insensitive)
          const filtered = products.filter((product) => {
              return (
                  product.pid.toString().toLowerCase().includes(search.toLowerCase()) ||
                  (product.sender?.toLowerCase().includes(search.toLowerCase()) || '') ||
                  product.gift_amount.toString().toLowerCase().includes(search.toLowerCase()) ||
                  new Date(product.created_at).toLocaleDateString('en-GB').includes(search)
              );
          });
          setFilteredProducts(filtered);
      }
  }, [search, products]);
    useEffect(() => {
     console.log("events data loading array",data)
     setproducts(data)
    }, [data])
  //   const senderTemplate = (rowData) => {
  //     return rowData.sender?.username || ''; // Safely access sender and username
  // };
  const detailsButtonTemplate = (rowData) => {
    const handleButtonClick = () => {
        console.log("Product ID:", rowData.pid); 
        fetchData(rowData.pid)
        
        // Here you can get the pid
        // Add your custom action here
    };

    return (
        <Button label="Details" onClick={handleButtonClick} className="p-button-sm p-button-primary" />
    );
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // 'en-GB' format is DD-MM-YYYY
};

const orderDateTemplate = (rowData) => {
  return formatDate(rowData.created_at);
};







    const [globalFilter, setGlobalFilter] = useState(null);
  return (
    <div className='border rounded-lg m-4 border-[#EBF0ED]'>
         <DataTable     value={filteredProducts}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                dataKey="pid"
                         >
                         
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="pid" header="Order ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column  field='sender' header="Sender" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="gift_amount" header="Amount" sortable style={{ minWidth: '16rem' }}></Column>
                    {/* <Column field="gift_message" header="Gift Message" sortable style={{ minWidth: '16rem' }}></Column> */}
                    <Column body={orderDateTemplate} header="Order Date" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column header="Details" body={detailsButtonTemplate} style={{ minWidth: '16rem' }}></Column> 
                   
                  
                </DataTable>
    


    </div>
  )
}

export default GiftTable