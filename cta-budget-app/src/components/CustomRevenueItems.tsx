import React from 'react';
import type { CustomRevenueItem } from '../types';

interface CustomRevenueItemsProps {
  items: CustomRevenueItem[];
  onChange: (items: CustomRevenueItem[]) => void;
}

const CustomRevenueItems: React.FC<CustomRevenueItemsProps> = ({ items, onChange }) => {
  const addItem = () => {
    const newItem: CustomRevenueItem = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      type: 'flat',
    };
    onChange([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof CustomRevenueItem, value: string | number) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, [field]: field === 'amount' ? (parseFloat(value as string) || 0) : value }
        : item
    );
    onChange(updatedItems);
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Custom Revenue Items</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-gray-700">Item Name</th>
              <th className="text-left py-2 px-4 font-medium text-gray-700">Amount ($)</th>
              <th className="text-left py-2 px-4 font-medium text-gray-700">Type</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., SAE Reimbursement"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={item.amount || ''}
                    onChange={(e) => updateItem(item.id, 'amount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="py-2 px-4">
                  <select
                    value={item.type}
                    onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="flat">Flat</option>
                    <option value="perPatient">Per Patient</option>
                    <option value="perVisit">Per Visit</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addItem}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Revenue Item
      </button>
    </div>
  );
};

export default CustomRevenueItems;