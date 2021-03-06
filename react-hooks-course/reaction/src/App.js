import React, {useReducer} from 'react';
import reducer, {initialState} from "./state/reducer";
import PublishMessage from "./components/PublishMessage";
import MessageBoard from "./components/MessageBoard";
import Context from './context';

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    console.log('state', state);
    return (
    <Context.Provider value={{state, dispatch}}>
        <h2>Reaction</h2>
        <hr />
        <PublishMessage />
        <hr />
        <MessageBoard />
    </Context.Provider>
  );
}

export default App;
