import { State } from "./model/State";
import { generateGradient } from "../service/css";
import { ScoreboardState } from "./model/ScoreboardState.ts";

interface Props {
  state: State,
  scoreboard: ScoreboardState
}

export const Score = ({ state, scoreboard }: Props) => {
  const { homeLogo, awayLogo, home, away } = state;
  const [homeScore, awayScore] = scoreboard.score;

  return (
    <div className="score-container">
      <div style={{
        display: "flex",
        background: generateGradient(state.displaySettings.awayGradient)
      }} className="score-row">
        <div className="away-logo logo">
          {awayLogo?.data && <img src={awayLogo.data} alt="" height={"100%"} style={{
            filter: `drop-shadow(2px 2px 0px ${state.displaySettings.awayLogoShadow}88) drop-shadow(0px 0px 3px ${state.displaySettings.awayLogoShadow})`
          }} />}
        </div>
        <div className="name-away score-name" style={{ color: state.displaySettings.fontColorLight }}>
          {away}
        </div>
        <div className="score-away score-value" style={{
          color: state.displaySettings.fontColorDark,
          background: generateGradient(state.displaySettings.layoutGradient)
        }}>
          {awayScore}
        </div>
      </div>

      <div style={{
        display: "flex",
        background: generateGradient(state.displaySettings.homeGradient)
      }} className="score-row">
        <div className="home-logo logo">
          {homeLogo?.data && <img src={homeLogo.data} alt="" height={"100%"} style={{
            filter: `drop-shadow(2px 2px 0px ${state.displaySettings.homeLogoShadow}88) drop-shadow(0px 0px 3px ${state.displaySettings.homeLogoShadow})`
          }} />}
        </div>
        <div className="name-home score-name" style={{ color: state.displaySettings.fontColorLight }}>
          {home}
        </div>
        <div className="score-home score-value" style={{
          color: state.displaySettings.fontColorDark,
          background: generateGradient(state.displaySettings.layoutGradient)
        }}>
          {homeScore}
        </div>
      </div>
    </div>
  );
};
