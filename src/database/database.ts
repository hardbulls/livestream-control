import { getDatabase, onValue, ref, set, DatabaseReference } from "firebase/database"
import { ScoreboardState } from "../baseball/model/ScoreboardState.ts"
import { DEFAULT_STATE } from "../default-state"

const DATABASE_NAME = "scoreboards"

let scoreboardRef: DatabaseReference | undefined = undefined

export const updateScoreboard = async (userId: string, value: ScoreboardState) => {
    const db = getDatabase()

    await set(ref(db, `${DATABASE_NAME}/${userId}`), value)
}

export const listenToScoreboard = (userId: string, handleUpdate: (value: ScoreboardState) => void) => {
    if (!scoreboardRef) {
        const db = getDatabase()

        scoreboardRef = ref(db, `${DATABASE_NAME}/${userId}`)

        onValue(scoreboardRef, (snapshot) => {
            const data = snapshot.val()

            handleUpdate({
                ...DEFAULT_STATE.scoreboard,
                ...data,
            })
        })
    }
}
