import { Node, NodeDef } from 'node-red';
import { DiscordConfigOptions } from '../shared/types';

export interface DiscordConfigNodeDef extends NodeDef, DiscordConfigOptions { }

// export interface DiscordConfigNode extends Node {}
export type DiscordConfigNode = Node<{ token: string }>;
