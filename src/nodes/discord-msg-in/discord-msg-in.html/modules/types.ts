import { EditorNodeProperties } from 'node-red';
import { DiscordMsgInOptions } from '../../shared/types';

export interface DiscordMsgInEditorNodeProperties
  extends EditorNodeProperties,
  DiscordMsgInOptions { }
