import { EditorNodeProperties } from 'node-red';
import { DiscordMsgOutOptions } from '../../shared/types';

export interface DiscordMsgOutEditorNodeProperties
  extends EditorNodeProperties,
  DiscordMsgOutOptions { }
