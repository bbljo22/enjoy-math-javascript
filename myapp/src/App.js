import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", age: 0 });

    useEffect(() => {
        // Fetch items from the server
        const fetchItems = async () => {
            try {
                const response = await axios.get("/api/items");
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items", error);
            }
        };

        fetchItems();
    }, []);

    const addItem = async () => {
        try {
            const response = await axios.post("/api/items", newItem);
            setItems([...items, response.data]); // Update state with new item
            setNewItem({ name: "", age: 0 }); // Clear input fields after adding
        } catch (error) {
            console.error("Error adding item", error);
        }
    };

    return (
        <div className="App">
            <h1>Items</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        Name: {item.name} | Age: {item.age}
                    </li>
                ))}
            </ul>
            <div>
                <h2>Add New Item</h2>
                <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Name"
                />
                <input
                    type="number"
                    value={newItem.age}
                    onChange={(e) => setNewItem({ ...newItem, age: parseInt(e.target.value) })}
                    placeholder="Age"
                />
                <button onClick={addItem}>Add Item</button>
            </div>
        </div>
    );
}


export default App;
