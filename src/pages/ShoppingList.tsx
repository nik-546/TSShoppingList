import {Item} from "../models/ItemModel";
import './ShoppingList.scss';
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ChangeEventHandler, Dispatch, MouseEventHandler,SetStateAction} from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom';

interface ShoppingListProps{
    items: Item[],
    setItems: Dispatch<SetStateAction<Item[]>>,
}

export default function ShoppingList(props: ShoppingListProps) {
    let navigate = useNavigate();
    const {items, setItems} = props; //destruction, unnecessary to use "props." below

    const handleRemoveButtonFunc = (item: Item) => {
        const newItems: Item[] = [...items];
        const reducedItems: Item[] = newItems.filter(items => items.name !== item.name)
        setItems(reducedItems);
    }

    const handleRemoveAllButtonFunc = () => {
        const newItems: Item[] = [];
        setItems(newItems);
    }

    const handleAddButtonFunc = (item: Item) => {
        const newItems: Item[] = [...items];
        // @ts-ignore
        newItems.filter(items => items.name === item.name)[0].quantity++;
        setItems(newItems);
    }
    const handleSubstractButtonFunc = (item: Item) => {

        if(items.filter(items => items.name === item.name)[0].quantity === 1){
            handleRemoveButtonFunc(item);
            return;
        }

        const newItems: Item[] = [...items];
        // @ts-ignore
        newItems.filter(items => items.name === item.name)[0].quantity--;
        setItems(newItems);
    }


    const handleEditButtonFunc = (item: Item) => {
        let foo = prompt('Type new name here:');
        const newItems: Item[] = [...items];
        // @ts-ignore
        newItems.filter(items => items.name === item.name)[0].name = foo;
        setItems(newItems);
    }

    const handleNavigateButton: () => void = () => {
        navigate(-1);
    }

    //großer Unterschied ob nur die Funktion aufgerufen wird siehe in items.map onClick Button, hier wird nur die Funktion aufgerufen
    //in dem AddItem tsx. wird nicht nur die Funktion aufgerufen ... checke den Unterschied noch nicht

    return (
        <div>
            <h2>ShoppingList</h2>
            <div className="item-list">
                {items.map((item: Item, index) => (
                    <div className='item-container' key={index}>
                        <AddIcon onClick={() => {handleAddButtonFunc(item)}}/>
                        {/*<ArrowUpwardIcon></ArrowUpwardIcon>*/}
                        {/*<ArrowDownwardIcon></ArrowDownwardIcon>*/}
                        <div className='quantity'>
                            <span className="number-size"> {item.quantity}x </span>
                        </div>
                        <RemoveIcon onClick={() => {handleSubstractButtonFunc(item)}}/>
                        <div className="item">{item.name}</div>
                        {/*bei onClick wird nur die Funktion aufgerufen nichts ausgegebn*/}
                        <EditIcon onClick={() => {handleEditButtonFunc(item)}}/>
                        <Button variant="outlined" onClick={() => {handleRemoveButtonFunc(item)}} startIcon={<DeleteIcon />}>
                            remove
                        </Button>

                    </div>
                ))}
                <Button variant="outlined" onClick={handleRemoveAllButtonFunc} startIcon={<DeleteIcon />}>
                    remove all
                </Button>
                <Button className="button-back" onClick={handleNavigateButton}>
                    back
                </Button>
            </div>
        </div>
    );
}