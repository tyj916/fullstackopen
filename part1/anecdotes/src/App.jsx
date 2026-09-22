import { useState } from 'react'

const Anecdote = ({text}) => <p>{text}</p>
const VoteCount = ({voteCount}) => <p>has {voteCount} votes</p>

const MostVotes = ({anecdotes, votes}) => {
  const findIndexOfMostVote = () => {
    let largestVote = 0;
    let indexOfMostVote = 0;

    votes.forEach((vote, index) => {
      if (vote > largestVote) {
        largestVote = vote;
        indexOfMostVote = index;
      }
    });

    return indexOfMostVote;
  }

  const indexOfMostVote = findIndexOfMostVote();

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[indexOfMostVote]} />
      <VoteCount voteCount={votes[indexOfMostVote]} />
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // to eliminate the possibility of random to the same anecdote
  const getRandomAnecdoteIndex = (selected) => {
    const index = Math.floor(Math.random() * anecdotes.length);

    // if randomed index is currently selected and is the last item of anecdotes
    // previous anecdote will be selected
    if (index === selected && selected === anecdotes.length - 1) {
      return index - 1;
    }

    // if random index is currently selected, next anecdote will be selected
    if (index === selected) {
      return index + 1;
    }

    return index;
  }

  const handleNextAnecdote = () => setSelected(getRandomAnecdoteIndex(selected));
  const handleVote = () => setVotes(votes.with(selected, votes[selected] + 1));

  return (
    <div>
      <Anecdote text={anecdotes[selected]} />
      <VoteCount voteCount={votes[selected]} />

      <Button onClick={handleVote} text={'Vote'} />
      <Button onClick={handleNextAnecdote} text={"Next Anecdote"} />

      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
