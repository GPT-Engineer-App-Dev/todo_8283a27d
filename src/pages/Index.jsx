import React, { useState } from "react";
import { ChakraProvider, Box, Heading, VStack, Input, IconButton, HStack, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addTodo = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No content",
        description: "Can't add an empty todo.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={4}>
          <Heading mb={6}>Todo App</Heading>
          <HStack>
            <Input placeholder="Add your new todo" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <IconButton colorScheme="blue" aria-label="Add todo" icon={<FaPlus />} onClick={addTodo} />
          </HStack>
          <VStack spacing={2} align="stretch">
            {todos.map((todo, index) => (
              <HStack key={index} justify="space-between">
                <Text>{todo}</Text>
                <IconButton size="sm" colorScheme="red" aria-label="Delete todo" icon={<FaTrash />} onClick={() => deleteTodo(index)} />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
