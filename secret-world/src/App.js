
import './App.css';
import StartScreen from './Components/StartScreen';
import {useCalback,useEffect,useState} from "react";
import {wordsList} from"./data/words";
import Game from './Components/Game';
import GameOver from './Components/GameOver';

//Os três estagios do jogo
const stages  = [
{id: 1,name:"start"},
{id:2,name:"game"},
{id:3,name:"end"},
];

function App() {

  const [gameStage,setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const[pickedWord,setPickedWord] = useState("");
  const[pickedCategory,setPickedCategory] = useState("");
  const[letters,setLetters] = useState([]);

  const[guessedLetters, setGuessedLetters] = useState([]);
  const[wrongLetters,setWrongLetters] = useState([]);
  const[guesses,setGuesses] = useState(3);
  const[score,setScore] = useState(0);

  const pickWordAndCategory = useCalback(() => {

    //Sorteando categoria
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];

    //Sorteando uma palavra aleatoria da categoria
    const word = words[category][Math.floor(Math.random()*words(category).length)];
    return {word,category};
  },[words]);
  
  const startGame = useCalback(() => {

  clearLetterStates();
   const {word,category} = pickWordAndCategory();

   //Dividindo a palavra em letras
   let wordLetters = word.split("");
   
   //Normalizando as letras para poder pegar todas minusculas
   wordLetters = wordLetters.map((l) => l.toLowerCase());

   //Setando
   setPickedWord(word);
   setPickedCategory(category);
   setLetters(wordLetters);
    setGameStage(stages[1].name);
  },[pickWordAndCategory]);

  const verifyLetter = (letter) => {

    //Deixando tudo em letra minuscula
    const normalizedLetter = letter.toLowerCase()

    //Validando se a letra já foi usada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    };

    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) =>[
        ...actualGuessedLetters,normalizedLetter
      ]);
    }else {
      setWrongLetters((actualWrongLetters) =>[
        ...actualWrongLetters,normalizedLetter
      ]);
      //Diminuindo o número de tentativas a cada erro
      setGuesses((actualGuesses) => actualGuesses - 1);
    };

    const clearLetterStates = () => {
      setGuessedLetters([]);
      setWrongLetters([]);
    };

    //Mudando o estado caso zere as tentativas
    useEffect (() => {
      if (guesses <= 0 ) {

        ClearLetterStage();
        setGameStage(stages[2].name);
      };
    },[guesses])
    
  };

  useEffect (() => {

    const uniqueLetters = [...new set(letters)];

    if (guessedLetters.length ===uniqueLetters.length){
      //Acertei a palavra
      setScore((actualScore) => actualScore += 100);
      startGame();
    }

  },[guessedLetters,letters,startGame])
  const retry = () => {
    setScore(0);
    setGuesses(3);
     setGameStage(stages[0].name);

  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
       {gameStage === "game" && 
       <Game
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters} 
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
        {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
