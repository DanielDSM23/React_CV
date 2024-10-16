import React, {useState} from 'react';

function MultipleFive() {
    const [numbers, setNumbers] = useState(
        Array.from({ length: 100 }, () => null).map((item, index) => index + 1),
    );

    return (
        <div>
            <ul>
                {numbers.map((number, index) =>
                    index % 5 === 0 ? <li key={index}>{index}</li> : <li> Pas multiple</li>
                )}
            </ul>
        </div>
    );
}

export default MultipleFive;