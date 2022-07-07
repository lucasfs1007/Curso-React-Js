import React from 'react'

const Challenge = () => {
    const numero1 = 10;
    const numero2 = 7;
  return (
    <div>
        <p>numero 1: {numero1}</p>
        <p>numero 2: {numero2}</p>
        <button onClick={() => console.log(numero1 + numero2)}>Clique aqui</button>
    </div>
  );
};

export default Challenge;