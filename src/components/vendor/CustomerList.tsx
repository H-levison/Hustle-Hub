import React from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
}

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <ul className="space-y-2">
      {customers.map(customer => (
        <li key={customer.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <span>{customer.name}</span>
          <span className="text-gray-500">{customer.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default CustomerList; 