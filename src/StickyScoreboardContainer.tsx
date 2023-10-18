import { State } from "./baseball/model/State.ts";
import { ScoreboardState } from "./baseball/model/ScoreboardState.ts";
import { Scoreboard } from "./Scoreboard.tsx";

interface Props {
  state: State;
  scoreboard: ScoreboardState;
}

export const StickyScoreboardContainer = ({ state, scoreboard }: Props) => {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 99,
        backgroundColor: state.displaySettings.filterColor,
        padding: '40px'
      }}
    >
      <Scoreboard state={state} scoreboard={scoreboard} />
    </div>
  );
};
