import { IContext } from "overmind";
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
} from "overmind-react";

import { namespaced } from "overmind/config";
import * as contentLibrary from "./contentLibrary";

export type Context = IContext<typeof config>;

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
export const useReaction = createReactionHook<Context>();

export const config = namespaced({
  contentLibrary,
});
