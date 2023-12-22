import { useState } from 'react'
import './App.css'

const words = ['праздник', 'счастье', 'семья'];
const rowElementsAmount = 18;

function App() {
  const [word, setWord] = useState(words[0]);
  const [guess, setGuess] = useState('');
  const [gameFinished, setGameFinished] = useState(false);
  const [guessed, setGuessed] = useState([]);

  const nextWord = () => {
    setGuessed(() => []);
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

  const getEmptyRow = (amount) => [...new Array(amount)].map((_, n) => (<div className={'letterBox empty'} key={n}></div>));

  const defaultEmptyRow = getEmptyRow(rowElementsAmount);

  const getLettersRow = () => {
    const emptyLength = Math.ceil((18 -  word.split('').length) / 2);
    const needToShorten = (emptyLength * 2) + word.split('').length > 18;
    const emptyBoxes = [...new Array(emptyLength)].map((_, n) => (<div className={'letterBox empty'} key={n}></div>));
    return [...getEmptyRow(needToShorten ? emptyLength - 1 : emptyLength), ...letters, ...emptyBoxes]
  }

  const lettersRow = getLettersRow();

  return (
    <>
      <div className={'game'}>
        <div className={'emptyLettersContainer'}>{defaultEmptyRow}</div>
        <div className={'emptyLettersContainer'}>{defaultEmptyRow}</div>
        <div className={'emptyLettersContainer'}>{defaultEmptyRow}</div>
        <div className={'lettersContainer'}>{lettersRow}</div>
        <div className={'emptyLettersContainer'}>{defaultEmptyRow}</div>
        <div className={'emptyLettersContainer'}>{defaultEmptyRow}</div>
        <div className={'emptyLettersContainer'}>{defaultEmptyRow}</div>
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
