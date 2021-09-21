import { Node, NodeDef } from 'node-red';
import { DiscordMsgInOptions } from '../shared/types';

export interface DiscordMsgInNodeDef extends NodeDef, DiscordMsgInOptions {}

// export interface DiscordMsgInNode extends Node {}
export type DiscordMsgInNode = Node;
