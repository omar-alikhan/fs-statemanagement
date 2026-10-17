import { useStatsControls } from "../store";

const Buttons = () => {
  const { incrementGood, incrementNeutral, incrementBad } = useStatsControls(
    state => state.actions,
  );

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  );
};

export default Buttons;
