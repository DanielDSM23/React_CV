import React, {useState} from 'react';


function Counter() {
    const [count, setCount] = useState(0)

    return (
        <>
            <p> Counter : {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment counter</button>
            <button onClick={() => setCount(count - 1)}>Decrement counter</button>
        </>
    );
}

export default Counter;