import { AnyAction } from "redux";
import { RootState } from "redux/reducers";

interface ThunkDispatch<S, E, A> {
  <T extends A>(action: T): T;
  <R>(asyncAction: ThunkAction<R, S, E, A>): R;
}

type ThunkAction<R, S, E, A> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;

export type Dispatch = ThunkDispatch<RootState, undefined, AnyAction>;
export type AsyncAction<R = void> = (ThunkAction<R, RootState, undefined, AnyAction>);