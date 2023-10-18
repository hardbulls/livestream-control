import { useEffect, useState } from "react";
import { Control } from "./Control";
import { State } from "./baseball/model/State";
import { saveState } from "./state";
import { ScoreboardState } from "./baseball/model/ScoreboardState.ts";
import { listenToScoreboard, updateScoreboard } from "./database/database";
import { HomeAwayEnum } from "./baseball/model/HomeAwayEnum";
import Divider from "@mui/material/Divider";
import Grid2 from "@mui/material/Unstable_Grid2";
import { InningHalfEnum } from "./baseball/model/InningHalfEnum";
import Box from "@mui/material/Box";


interface Props {
  state: State;
  setState: (state: State) => void
}

function ScoreboardDisplay({ state }: Props) {
  const [scoreboard, setScoreboard] = useState<ScoreboardState>(state.scoreboard)

  useEffect(() => {
    saveState({
      ...state,
      scoreboard
    });
  }, [state, scoreboard]);

  useEffect(() => {
    if (state.userId) {
      listenToScoreboard(state.userId, (scoreboard: ScoreboardState) => {
        setScoreboard(scoreboard)
      })
    }
  }, [state])

  const updateScoreValue = async <T extends keyof ScoreboardState>(key: T, value: ScoreboardState[T]) => {
    const updatedScoreboard = {
      ...scoreboard,
      [key]: value
    }
    setScoreboard(updatedScoreboard)

    if (state.userId && state.login === true) {
      await updateScoreboard(state.userId, updatedScoreboard)
    }
  }

  const resetCounts = async () => {
    const updatedScoreboard = {
      ...scoreboard,
      balls: 0,
      strikes: 0
    }
    console.log(updatedScoreboard)
    setScoreboard(updatedScoreboard)

    if (state.userId && state.login === true) {
      await updateScoreboard(state.userId, updatedScoreboard)
    }
  }

  return (
    <Box>
      <div style={{fontSize: '24px'}}>
        <Grid2 container spacing={2}>
          <Grid2 xs={6}>
            Home: {scoreboard.score[0]}
          </Grid2>
          <Grid2 xs={6}>
            Away: {scoreboard.score[1]}
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            Inning: {scoreboard.inning.half === InningHalfEnum.TOP ? 'Top' : 'Bottom'} {scoreboard.inning.value}
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2}>

          <Grid2 xs={4}>
            Strikes: {scoreboard.strikes}
          </Grid2>
          <Grid2 xs={4}>
            Balls: {scoreboard.balls}
          </Grid2>
          <Grid2 xs={4}>
            Outs: {scoreboard.outs}
          </Grid2>
        </Grid2>
      </div>
      <Divider/>
        <Control
          scoreboard={scoreboard}
          handleBallClick={() => {
              if (scoreboard.balls === 3) {
                updateScoreValue('balls', 0)

                return;
              }

              updateScoreValue('balls', scoreboard.balls + 1)
            }
          }
          handleOutClick={() => {
            if (scoreboard.outs === 2) {
              updateScoreValue('outs', 0)

              return;
            }

            updateScoreValue('outs', scoreboard.outs + 1)
          }
          }
          handleStrikeClick={() => {
            if (scoreboard.strikes === 2) {
              updateScoreValue('strikes', 0)

              return;
            }

            updateScoreValue('strikes', scoreboard.strikes + 1)
          }
          }
          handleClearBases={() => {
            updateScoreValue('bases', [])
          }
          }
          handleResetCountClick={() => {
            resetCounts()
          }
          }
          handleInningChange={(half, value) => {
            updateScoreValue('inning', {
              half, value
            })
          }}
          handleScoreChange={(team, value) => {
            if (team === HomeAwayEnum.HOME) {
              updateScoreValue('score', [value, scoreboard.score[1]])

              return;
            }

            updateScoreValue('score', [scoreboard.score[0], value])
          }}
          handleBaseChange={(base, value) => {
            if (value) {
              updateScoreValue('bases', [...scoreboard.bases, base])

              return;
            }

            updateScoreValue('bases', scoreboard.bases.filter((v) => v !== base))
          }}
        />
    </Box>
  );
}

export default ScoreboardDisplay;
