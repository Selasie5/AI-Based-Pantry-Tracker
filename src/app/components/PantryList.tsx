"use client";
import React, { useState } from 'react';
import {FaEdit, FaTrash } from 'react-icons/fa';
import { Modal,Box, Typography,TextField, InputLabel, Select, MenuItem, Button} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface PantryItem {
  id: number;
  name: string;
  qty: number;
  category: string;
  dateAdded: string;
  expiryDate: string;
}

const PantryList: React.FC = () => {

  // Modal Style: 
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    fontFamily:'Poppins'
  };
  
  const inputStyle = {
    marginBottom: 2,
    width: '100%',
  };
  
  const selectStyle = {
    marginBottom: 2,
    width: '100%',
  };
  
  const datePickerStyle = {
    marginBottom: 2,
    width: '100%',
  };
const buttonStyle={
  backgroundColor: '#000000',
  color: '#ffffff',
  paddingBlock: '12px',
  paddingInline:'20px',
  width:'100%',
  marginBlock:2,
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
}

  const[category, setCategory]=useState("")
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { id: 1, name: 'Example Item 1', qty: 5, category: 'Grains', dateAdded: '2024-07-28', expiryDate: '2024-08-10' },
    // Add more items here
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [open, setOpen]= useState(false);

  const handleOpen = ():void=>
  {
    setOpen(true)
  }

  const handleClose=():void=>
  {
    setOpen(false)
  }

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <button className="font-Poppins text-[0.75rem] bg-green-500 text-white rounded-lg px-6 py-3  hover:cursor-pointer" onClick={handleOpen}>Add Item To Pantry</button>
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
                <td className=" flex justify-center items-center gap-3 py-3 px-6 text-left">
                        <button
                          className=" bg-blue-200 text-blue-700 opacity-50 hover:opacity-100 w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleEdit(item.id)}
                        >
                          <FaEdit className="inline mr-2" /> Edit
                        </button>
                        <button
                          className="  bg-red-200 text-red-700 opacity-50 hover:opacity-100 w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash className="inline mr-2" /> Delete
                        </button>
                </td>
              </tr>
            ))}
          </tbody> 
        </table>
        <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ color: 'black',fontSize:'1.5rem', fontWeight:700, mb: 2, textAlign:'center' }}>
            Add Item To The Pantry
          </Typography>
          <TextField
            id="item-name"
            label="Item Name"
            variant="outlined"
            sx={inputStyle}
          />
          <TextField
            id="item-quantity"
            label="Quantity"
            variant="outlined"
            sx={inputStyle}
          />
          <Box>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as string)}
              sx={selectStyle}
            >
              <MenuItem value="Staples">Staples</MenuItem>
              <MenuItem value="Canned Goods">Canned Goods</MenuItem>
              <MenuItem value="Baking Supplies">Baking Supplies</MenuItem>
              <MenuItem value="Dairy">Dairy</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
              <MenuItem value="Meat & Seafood">Meat & Seafood</MenuItem>
              <MenuItem value="Frozen Foods">Frozen Foods</MenuItem>
              <MenuItem value="Grain & Cereals">Grain & Cereals</MenuItem>
              <MenuItem value="Fruits & Vegetables">Fruits & Vegetables</MenuItem>
            </Select>
          </Box>
          <DatePicker label="Expiry Date" sx={datePickerStyle} />
          <Button variant='contained' sx={buttonStyle}>Add Item</Button>
        </Box>
      </Modal>
      </div>
    </section>
    </LocalizationProvider>
  );
}

export default PantryList;
