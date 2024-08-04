"use client";
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import OpenAI from "openai";

interface PantryItem {
  id: string; // ID must be a string as Firestore IDs are strings
  name: string;
  qty: number;
  category: string;
  dateAdded: string;
  expiryDate: string;
  expiryStatus: string;
}

const RecipeCreatorBot: React.FC<{ pantryItems: PantryItem[] }> = ({ pantryItems }) => {
    const openaiApiKey = process.env.NEXT_PUBLIC_GPT_API_KEY;
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
     apiKey: openaiApiKey,
     dangerouslyAllowBrowser: true,
    defaultHeaders: {
      "HTTP-Referer": "",
      "X-Title": ""
    }
  });

  const fetchRecipe = async () => {
    try {
      const response = await openai.chat.completions.create({
        model: "openai/gpt-4o",
        messages: [
          { role: "user", content: `Generate a recipe using these ingredients: ${JSON.stringify(pantryItems)}` }
        ]
      });
  
      if (response.choices && response.choices.length > 0) {
        const recipe = response.choices[0].message.content;
        return recipe;
      } else {
        console.error('No choices returned in the response:', response);
        return 'Sorry, no recipe could be generated. Please try again later.';
      }
    } catch (error) {
      console.error('Error fetching recipe from API:', error);
      return 'Sorry, something went wrong. Please try again later.';
    }
  };
  

  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleOpen = async () => {
    setOpen(true);
    const response = await fetchRecipe();
    setMessages([`Bot: ${response}`]);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setMessages([]);
  }, []);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" disabled sx={{mt: 9}}>Generate Recipe(Coming Soon)</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant='h6' sx={{ mb: 2 }}>Recipe Generator</Typography>
          <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}>
            {messages.map((message, index) => (
              <Typography key={index}>{message}</Typography>
            ))}
          </Box>
          <Button onClick={handleClose} variant="contained">Close</Button>
        </Box>
      </Modal>
    </>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  fontFamily: 'Poppins'
};

export default RecipeCreatorBot;
