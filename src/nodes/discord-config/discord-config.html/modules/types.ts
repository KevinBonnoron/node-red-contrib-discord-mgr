import { EditorNodeProperties } from 'node-red';
import { DiscordConfigOptions } from '../../shared/types';

export interface DiscordConfigEditorNodeProperties
  extends EditorNodeProperties,
  DiscordConfigOptions { }
