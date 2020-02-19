import React, {useState, useEffect, useReducer, useRef, useMemo} from 'react';
import axios from 'axios';
import List from "./List";
import {useFormInput} from '../hooks/forms';

const Todo = (props) => {
    const [inputIsValid, setInputIsValid] = useState(false);
    // const [todoName, setTodoName] = useState('');
    // const [submittedTodo, setSubmittedTodo] = useState(null);
    // const [todoList, setTodoList] = useState([]);
    // const todoInputRef = useRef();
    const todoInput = useFormInput();

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            case 'SET':
                return action.payload;
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    // const [todoState, setTodoState] = useState({
    //    userInput: '',
    //    todoList: []
    // });

    // useEffect hooks into React's internals to make sure that this code executes at the right time and doesn't end up in the render cycle
    // equivalent of componentDidMount (with empty array) or componentDidUpdate (array with value names to watch)
    useEffect(() => {
        axios.get('https://hooks-todolist.firebaseio.com/todos.json')
            .then(result => {
                const todoData = result.data;
                const todos = [];
                for (const key in todoData) {
                    todos.push({id: key, name: todoData[key].name})
                }
                dispatch({type: 'SET', payload: todos})
            });
        return () => {
            console.log('Cleanup');
        };
    }, []);

    // useEffect(() => {
    //     if (submittedTodo) {
    //         dispatch({type: 'ADD', payload: submittedTodo});
    //     }
    // }, [submittedTodo]);

    // useEffect (() => {
    //     document.addEventListener('mousemove', mouseMoveHandler);
    //     // executes when the component unmounts
    //     return () => {
    //         document.removeEventListener('mousemove', mouseMoveHandler);
    //     }
    // }, []);

    const mouseMoveHandler = (event) => {
        console.log(event.clientX, event.clientY);
    };

    // const inputChangedHandler = (event) => {
    //     setTodoName(event.target.value);
    //     // setTodoState({
    //     //     userInput: event.target.value,
    //     //     todoList: todoState.todoList
    //     // });
    // };

    const todoRemoveHandler = (todoId) => {
        axios.delete(`https://hooks-todolist.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({type: 'REMOVE', payload: todoId})
            })
            .catch(err => console.log(err));
    };

    const todoAddHandler = () => {
        const todoName = todoInput.value;

        axios.post('https://hooks-todolist.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                const todoItem = {id: res.data.name, name: todoName};
                dispatch({type: 'ADD', payload: todoItem});
            }).catch(err => {
                console.log(err);
        });
        // setTodoState({
        //     userInput: todoState.userInput,
        //     todoList: todoState.todoList.concat(todoState.userInput)
        // });
    };

    const inputValidationHandler = event => {
        if (event.target.value.trim() === '') {
            setInputIsValid(false);
        } else {
            setInputIsValid(true);
        }
    };

    return (
    <React.Fragment>
        <input
            type="text"
            placeholder="Todo"
            onChange={todoInput.onChange}
            value={todoInput.value}
            style={{backgroundColor: todoInput.validity ? 'transparent' : 'red'}}
            />
        <button type="button" onClick={todoAddHandler}>Add</button>
        { useMemo(
            () => <List items={todoList} onClick={todoRemoveHandler}/>,
            [todoList]
            )
        }
    </React.Fragment>
    );
};

export default Todo;