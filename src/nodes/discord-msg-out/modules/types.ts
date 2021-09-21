import { Node, NodeDef } from "node-red";
import { DiscordMsgOutOptions } from "../shared/types";

export interface DiscordMsgOutNodeDef extends NodeDef, DiscordMsgOutOptions {}

// export interface DiscordMsgOutNode extends Node {}
export type DiscordMsgOutNode = Node;
