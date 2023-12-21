import { useState } from 'react'
import './App.css'

const words = ['праздник', 'счастье', 'семья'];

function App() {
  const [word, setWord] = useState(words[0]);
  const [guess, setGuess] = useState('');
  const [gameFinished, setGameFinished] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const [guessClass, setGuessClass] = useState('');

  const nextWord = () => {
    setWord((curr) => {
      const newIndex = words.indexOf(curr) + 1;
      if (newIndex < words.length - 1) {
        return words[newIndex]
      } else {
        setGameFinished(() => true);
        return curr;
      }
    })
  }

  const handleInput = (e) => {
    const { value } = e.target;
    setGuess(() => value);
    if (word.includes(value.toLowerCase()) && !guessed.includes(value)) {
      setGuessed((curr) => [...curr, value.toLowerCase()]);
      setGuessClass(() => 'correct');
    } else if (value === '') {
      setGuessClass(() => '');
    } else {
      setGuessClass(() => 'wrong');
    }
  }

  const button = gameFinished
    ? <></>
    : <button
      onClick={nextWord}
      className={'nextWordBtn'}
    >Следующее слово</button>;

  const letters = word.split('').map((l, index) => (
    <div
      className={`letterBox ${ guessed?.includes(l) ? 'active' : '' }`}
      key={l + index}
    >
      <span>{l.toUpperCase()}</span>
    </div>)
  )

  return (
    <>
      <div className={'game'}>
        <h1 className={'gameName'}>Поле чудес</h1>
        <div className={`lettersContainer ${guessClass}`}>{letters}</div>
        <input
          className={'guessInput'}
          value={guess}
          maxLength={1}
          onInput={handleInput}
        />
        {button}
      </div>
    </>
  )
}

export default App
