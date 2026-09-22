import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = ((good - bad) / total) || 0;
  const percentage = ((good / total) * 100) || 0;

  if (!total) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={'Good'} value={good} />
          <StatisticLine text={'Neutral'} value={neutral} />
          <StatisticLine text={'Bad'} value={bad} />
          <StatisticLine text={"Total Number of Feedbacks"} value={total} />
          <StatisticLine text={"Average Score"} value={average} />
          <StatisticLine text={"Positive Feedback Percentage"} value={percentage + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>Unicafe Feedback</h1>

      <Button onClick={handleGoodClick} text={'Good'} />
      <Button onClick={handleNeutralClick} text={'Neutral'} />
      <Button onClick={handleBadClick} text={'Bad'} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
