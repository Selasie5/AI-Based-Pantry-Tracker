"use client";
import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal, Box, Typography, TextField, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { auth } from '../../../config/firebase';
import { db } from '../../../config/firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import dayjs, { Dayjs } from 'dayjs'; 
import Webcam from 'react-webcam';
import RecipeCreatorBot from './RecipeCreatorBot';

interface PantryItem {
  id: string; // ID must be a string as Firestore IDs are strings
  name: string;
  qty: number;
  category: string;
  dateAdded: string;
  expiryDate: string;
  expiryStatus: string
}


interface PantryListProps {
  searchQuery: string; // Add searchQuery prop
}

const PantryList: React.FC<PantryListProps> = ({ searchQuery }) => {
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
    fontFamily: 'Poppins',
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

  const buttonStyle = {
    backgroundColor: '#000000',
    color: '#ffffff',
    paddingBlock: '12px',
    paddingInline: '20px',
    width: '100%',
    marginBlock: 2,
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  };

  const [category, setCategory] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);
  const [expiryStatus, setExpiryStatus]= useState<string>("")
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PantryItem | null>(null);
  const [useCamera, setUseCamera] = useState(false); // State to toggle between camera and form
  const user = auth.currentUser;

  const handleOpen = () => {
    setIsEditing(false);
    setSelectedItem(null);
    setItemName('');
    setQuantity(0);
    setCategory('');
    setExpiryDate(null);
    setOpen(true);
    setUseCamera(false); // Default to form when opening modal
  };
  
  const handleEditOpen = (item: PantryItem) => {
    setIsEditing(true);
    setSelectedItem(item);
    setItemName(item.name);
    setQuantity(item.qty);
    setCategory(item.category);
    setExpiryDate(item.expiryDate ? dayjs(item.expiryDate) : null);
    setOpen(true)
    setUseCamera(false);
  };
  
  const handleClose = () => setOpen(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newSelectedItems = checked ? pantryItems.map(item => item.id) : [];
    setSelectedItems(newSelectedItems);
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(itemId) ? prevSelected.filter(id => id !== itemId) : [...prevSelected, itemId]
    );
  };

  const addItems = async () => {
    if (!itemName || !quantity || !category || !expiryDate) {
      alert('Please fill all the fields');
      return;
    }
  
    try {
      if (user) {
        let currentDate = new Date().toISOString().split('T')[0];
        let status = currentDate === expiryDate.format('YYYY-MM-DD') ? "Expired" : "Fresh";
  
        if (isEditing && selectedItem) {
          // Update existing item
          const updatedData = {
            name: itemName,
            qty: quantity,
            category: category,
            expiryDate: expiryDate.format('YYYY-MM-DD'),
            expiryStatus: status
          };
  
          await handleEdit(selectedItem.id, updatedData);
          setIsEditing(false);
          setSelectedItem(null);
        } else {
          // Add new item
          const newItem = {
            name: itemName,
            qty: quantity,
            category: category,
            dateAdded: currentDate,
            expiryDate: expiryDate.format('YYYY-MM-DD'),
            expiryStatus: status
          };
  
          const pantryItemsRef = collection(db, `userData/${user.uid}/pantryitems`);
          const docRef = await addDoc(pantryItemsRef, newItem);
  
          // Assign the generated ID from Firestore
          const newItemWithId = { ...newItem, id: docRef.id };
          setPantryItems([...pantryItems, newItemWithId]);
        }
  
        // Reset form and close modal
        setItemName('');
        setQuantity(0);
        setCategory('');
        setExpiryDate(null);
        setOpen(false);
      }
    } catch (error) {
      console.error('Error adding/updating document:', error);
      alert('There was an error. Please try again.');
    }
  };
  
  const handleDelete = async (itemId: string) => {
    try {
      if (user) {
        const docRef = doc(db, `userData/${user.uid}/pantryitems`, itemId);
        await deleteDoc(docRef);
        setPantryItems(prevItems => prevItems.filter(item => item.id !== itemId));
        setSelectedItems(prevSelected => prevSelected.filter(id => id !== itemId));
      } else {
        console.error('User not authenticated');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('There was an error deleting the item. Please try again.');
    }
  };



  

  const fetchPantryItems = async (user: any, searchQuery: string, selectedCategory: string, setPantryItems: (items: PantryItem[])=> void) => {
    if (user) {
      const pantryItemsRef = collection(db, `userData/${user.uid}/pantryitems`);
      const snapshot = await getDocs(pantryItemsRef);
      let pantryItemsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PantryItem[];

      // Apply search filter
      if (searchQuery) {
        pantryItemsData = pantryItemsData.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory && selectedCategory !== 'All') {
        pantryItemsData = pantryItemsData.filter(item => item.category === selectedCategory);
      }

      setPantryItems(pantryItemsData);
    }
  };

  useEffect(() => {
    fetchPantryItems(user, searchQuery, selectedCategory, setPantryItems);
  }, [searchQuery, selectedCategory, user]);

  const handleEdit = async (itemId: string, updatedData: Partial<PantryItem>) => {
    try {
      if (user) {
        const docRef = doc(db, `userData/${user.uid}/pantryItems`, itemId);
        await updateDoc(docRef, updatedData);
        setPantryItems(prevItems =>
          prevItems.map(item => item.id === itemId ? { ...item, ...updatedData } : item)
        );
      }
    } catch (error) {
      console.error('Error updating document:', error);
      alert('There was an error updating the item. Please try again.');
    }
  };
  
  const handleTakePicture = (imageSrc: string) => {
    // Handle the image taken from the camera
    console.log("Image captured:", imageSrc);
    // You can store this image or perform other actions
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className=" relative p-4">
        <div className=" overflow-x-scroll md:overflow-x-auto">
          <div className='flex justify-between'>
          <div className="flex justify-center items-center gap-4 ">
            {/* Category Filter */}
            <InputLabel id="filter-category-label" className='hidden md:block'>Category</InputLabel>
            <Select
              labelId="filter-category-label"
              id="filter-category-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value as string)}
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="All">All</MenuItem>
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
          </div>
          <div className="flex justify-end items-center gap-5 mb-4">
            <button
              className="text-[0.75rem] bg-gray-200 hover:bg-red-300 hover:text-red-500 rounded-[0.5rem] px-5 py-3 opacity-50 hover:opacity-100 hover:cursor-pointer"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete selected items?')) {
                  setPantryItems(prevItems => prevItems.filter(item => !selectedItems.includes(item.id)));
                  setSelectedItems([]);
                }
              }}
              disabled={selectedItems.length === 0}
            >
              Delete Selected Items
            </button>
            <button
              className="font-Poppins text-[0.75rem] bg-blue-700 text-white rounded-[0.5rem] px-6 py-3 hover:cursor-pointer"
              onClick={handleOpen}
            >
              Add Item To Pantry
            </button>
          </div>
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
                <th className="py-3 px-6 text-left cursor-pointer font-Poppins font-medium capitalize">Name</th>
                <th className="py-3 px-6 text-left cursor-pointer font-Poppins font-medium  capitalize">Qty</th>
                <th className="py-3 px-6 text-left cursor-pointer font-Poppins font-medium  capitalize">Category</th>
                <th className="py-3  px-8 md:px-6 w-36text-left cursor-pointer font-Poppins font-medium  font-Poppins  capitalize">Date Added</th>
                <th className="py-3 px-8 md:px-6 text-left cursor-pointer font-Poppins font-medium  capitalize">Expiry Date</th>
                {/* <th className="py-3 px-6 text-left cursor-pointer font-Poppins  font-medium capitalize">Expiry Status</th> */}
                <th className="py-3 px-6 text-left font-Poppins font-medium  capitalize">Actions</th>
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
                  <td className="py-3 md:px-6 text-left">{item.dateAdded}</td>
                  <td className="py-3 md:px-6 text-left">{item.expiryDate}</td>
                  {/* <td className="py-3 px-6 text-left">
                    <span>
                    {item.expiryStatus}
                    </span>
                    </td> */}
                  <td className="flex justify-center items-center gap-3 py-3 px-6 text-left">
                    <button
                      className="bg-blue-200 text-blue-700 rounded-[0.4rem] opacity-50 hover:opacity-100 text-xs md:text-sm w-full flex justify-center items-center px-2 py-2 hover:bg-gray-100"
                      onClick={() => handleEditOpen(item)}
                    >
                      <FaEdit className="inline mr-2" /> <span className='text-blue-700 sm:hidden md:block'>Edit</span>
                    </button>
                    <button
                      className="bg-red-200 text-red-700 opacity-50 rounded-[0.4rem] hover:opacity-100 w-full text-xs md:text-sm flex justify-center items-center px-2 py-2 hover:bg-gray-100"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash className="inline mr-2" /> <span className='text-red-700 sm:hidden md:block'>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         <Modal open={open} onClose={handleClose}>
  <Box sx={style}>
    <Typography
      variant="h6"
      component="h2"
      sx={{ color: 'black', fontSize: '1.5rem', fontWeight: 700, mb: 2, textAlign: 'center' }}
    >
      {isEditing ? 'Edit Item' : 'Add Item To The Pantry'}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Button
        variant="contained"
        onClick={() => setUseCamera(false)}
        sx={{
          ...buttonStyle,
          marginRight: 1,
          backgroundColor: !useCamera ? '#007bff' : '#6c757d',
        }}
      >
        Use Form
      </Button>
      <Button
        variant="contained"
        onClick={() => setUseCamera(true)}
        sx={{
          ...buttonStyle,
          marginLeft: 1,
          backgroundColor: useCamera ? '#007bff' : '#6c757d',
        }}
      >
        Use Camera(Coming Soon in v2.0.0)
      </Button>
    </Box>
    {useCamera ? (
      <>
 <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        width="100%"
        height="auto"
        videoConstraints={{ facingMode: "environment" }}
        onUserMediaError={() => alert("Camera not accessible")}
        onUserMedia={() => console.log("Camera enabled")}
        screenshotQuality={1}
      />
        <DatePicker
          label="Expiry Date"
          value={expiryDate}
          sx={datePickerStyle}
          onChange={newDate => setExpiryDate(newDate)}
        />
      </>
     
      
    ) : (
      <>
        <TextField
          id="item-name"
          value={itemName}
          label="Item Name"
          variant="outlined"
          sx={inputStyle}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          id="item-quantity"
          label="Quantity"
          value={quantity}
          type="number"
          variant="outlined"
          sx={inputStyle}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
        <DatePicker
          label="Expiry Date"
          value={expiryDate}
          sx={datePickerStyle}
          onChange={newDate => setExpiryDate(newDate)}
        />
      </>
    )}
    <Button variant="contained" sx={buttonStyle} onClick={addItems}>
      {isEditing ? 'Save Changes' : 'Add Item'}
    </Button>
  </Box>
</Modal>
<RecipeCreatorBot pantryItems={pantryItems}/>
        </div>
      </section>
    </LocalizationProvider>
  );
};

export default PantryList;
