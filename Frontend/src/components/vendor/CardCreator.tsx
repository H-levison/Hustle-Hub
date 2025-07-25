import React, { useState } from 'react';

interface CardCreatorProps {
  onCreate: (card: { type: string; value: number }) => void;
}

const CardCreator: React.FC<CardCreatorProps> = ({ onCreate }) => {
  const [type, setType] = useState('loyalty');
  const [value, setValue] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === '') return;
    onCreate({ type, value: Number(value) });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-md">
      <select
        className="w-full border p-2 rounded"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="loyalty">Loyalty Card</option>
        <option value="gift">Gift Card</option>
      </select>
      <input
        type="number"
        placeholder="Initial Points/Balance"
        className="w-full border p-2 rounded"
        value={value}
        onChange={e => setValue(e.target.value === '' ? '' : Number(e.target.value))}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Card</button>
    </form>
  );
};

export default CardCreator; 