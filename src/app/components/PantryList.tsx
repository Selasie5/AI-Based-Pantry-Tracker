"use client";
import React, { useState } from 'react';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import { Tooltip } from '@reach/tooltip';
import '@reach/tooltip/styles.css';

interface PantryItem {
  id: number;
  name: string;
  qty: number;
  category: string;
  dateAdded: string;
  expiryDate: string;
}

const PantryList: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { id: 1, name: 'Example Item 1', qty: 5, category: 'Grains', dateAdded: '2024-07-28', expiryDate: '2024-08-10' },
    // Add more items here
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newSelectedItems = checked ? pantryItems.map(item => item.id) : [];
    setSelectedItems(newSelectedItems);
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prevSelected => 
      prevSelected.includes(itemId) ? 
      prevSelected.filter(id => id !== itemId) : 
      [...prevSelected, itemId]
    );
  };

  const handleEdit = (itemId: number) => {
    console.log('Edit item with id:', itemId);
    // Implement edit functionality here
  };

  const handleDelete = (itemId: number) => {
    setPantryItems(prevItems => prevItems.filter(item => item.id !== itemId));
    setSelectedItems(prevSelected => prevSelected.filter(id => id !== itemId));
    console.log('Delete item with id:', itemId);
  };

  return (
    <section className="p-4">
      <div className="overflow-x-auto">
        <div className="flex justify-end items-center gap-5 mb-4">
          <div>
            <button 
              className=" text-[0.75rem] bg-red-200 text-red-500 rounded-lg px-5 py-3 opacity-50 hover:opacity-100 hover:cursor-pointer"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete selected items?")) {
                  setPantryItems(prevItems => prevItems.filter(item => !selectedItems.includes(item.id)));
                  setSelectedItems([]);
                }
              }}
              disabled={selectedItems.length === 0}
            >
              Delete Selected Items
            </button>
          </div>
          <button className="font-Poppins text-[0.75rem] bg-green-500 text-white rounded-lg px-6 py-3  hover:cursor-pointer">Add Item To Pantry</button>
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === pantryItems.length}
                  aria-label="Select all items"
                />
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => /* Sort function */ null}>Name</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => /* Sort function */ null}>Qty</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => /* Sort function */ null}>Category</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => /* Sort function */ null}>Date Added</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => /* Sort function */ null}>Expiry Date</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {pantryItems.map(item => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100 relative">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    aria-label={`Select item ${item.name}`}
                  />
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{item.name}</td>
                <td className="py-3 px-6 text-left">{item.qty}</td>
                <td className="py-3 px-6 text-left">{item.category}</td>
                <td className="py-3 px-6 text-left">{item.dateAdded}</td>
                <td className="py-3 px-6 text-left">{item.expiryDate}</td>
                <td className="py-3 px-6 text-left">
                  <div className="relative">
                    <Tooltip label="More options" aria-label="More options">
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)}
                      >
                        <FaEllipsisV />
                      </button>
                    </Tooltip>
                    {activeItemId === item.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-lg">
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleEdit(item.id)}
                        >
                          <FaEdit className="inline mr-2" /> Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash className="inline mr-2" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PantryList;
