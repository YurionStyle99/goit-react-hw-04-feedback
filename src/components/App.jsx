import React, { useState } from "react";
import styles from "./styles.module.css";
import Statistics from "./Statistics/Statistics";
import Section from "./Section/Section";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Notification from "./Notification/Notofocation";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = ({ target: { name } }) => {
    if (name === "good") {
      setGood((prevGood) => prevGood + 1);
    } else if (name === "neutral") {
      setNeutral((prevNeutral) => prevNeutral + 1);
    } else if (name === "bad") {
      setBad((prevBad) => prevBad + 1);
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositivePercentage = () => {
    const total = countTotalFeedback();
    return total > 0 ? (good / total) * 100 : 0;
  };

  const totalFeedback = countTotalFeedback();
  const positivePercent = countPositivePercentage();
  const options = ["good", "neutral", "bad"];

  return (
    <div className={styles.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
        {totalFeedback <= 0 && <Notification message="There is no feedback" />}
      </Section>
      {totalFeedback > 0 && (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercent={positivePercent}
          />
        </Section>
      )}
    </div>
  );
};

export default App;
