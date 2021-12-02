import { ACTIONS } from "./actions";
const initialState = {
  playerXisNext: true,
  history: [{ squares: Array(9).fill(null) }],
  winner: "",
  draw: false
};

export function gameReducer(state = initialState, action) {
  const { JUMP, MOVE, RESET, WINNER, DRAW } = ACTIONS;

  switch (action.type) {
    
    case MOVE:
      const { history, playerXisNext } = state;
      return {
        ...state,
        history: history.concat({
          squares: action.payload.squares,
        }),
        playerXisNext: !playerXisNext,
      };
    case JUMP:
    
      return {
        ...state,
        playerXisNext: action.payload.step % 2 === 0,
        history: state.history.slice(0, action.payload.step + 1),
        draw: false
      };
    case WINNER:
      return {
        ...state,
        winner: action.payload,
      };
      case DRAW:
      return{
        ...state,
        draw: action.payload
      }
    case RESET:
      
      return{
       ...state,
       history: initialState.history,
       playerXisNext: initialState.playerXisNext,
       winner: initialState.winner,
       draw: initialState.draw
      }
    default:
      return state;
  }
}
