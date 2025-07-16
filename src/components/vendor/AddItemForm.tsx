import React, { useState } from 'react';

interface AddItemFormProps {
  onAdd: (item: { name: string; price: number }) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === '') return;
    onAdd({ name, price: Number(price) });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Item Name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="w-full border p-2 rounded"
        value={price}
        onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Item</button>
    </form>
  );
};

export default AddItemForm; 