import { Node, NodeDef } from "node-red";
import { DiscordRolesOptions } from "../shared/types";

export interface DiscordRolesNodeDef extends NodeDef, DiscordRolesOptions {}

// export interface DiscordRolesNode extends Node {}
export type DiscordRolesNode = Node;
