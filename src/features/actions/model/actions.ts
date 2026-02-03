export type ActionHandler<TPayload = void> = (payload: TPayload) => Promise<void>;

export const createAction = <TPayload>(
  handler: ActionHandler<TPayload>
): ActionHandler<TPayload> => handler;


