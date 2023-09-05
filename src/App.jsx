import './App.css'

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

import {wordsList} from './data/words';

import { useState } from 'react';

const stages = [
  { id: 1, name: "start"},
  { id: 2, name: "game"},
  { id: 3, name: "end"},
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] =  useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(100);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category }
  }

  const startGame = () => {
    //pick a word or category
    const  {word, category } = pickWordAndCategory();

    //create a array of letters
    let wordLetters = word.split("");

    console.log(word, category);
    console.log(wordLetters)

    wordLetters = wordLetters.map((i) => i.toLowerCase());

    //fill stages
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }

  const verifyLetter = (letter) => {
    console.log(letter);
    
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
    ])}
  }

  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <>
     <div className="App">
      {gameStage == "start" && <StartScreen startGame={startGame} />}
      {gameStage == "game" && <Game  
       verifyLetter={verifyLetter} 
       pickedWord={pickedWord} 
       pickedCategory={pickedCategory} 
       letters={letters}
       guessedLetters={guessedLetters}
       wrongLetters={wrongLetters}
       guesses={guesses}
       score={score}
      />}
      {gameStage == "end" && <GameOver retry={retry} />}
     </div>
    </>
  )
}

export default App
