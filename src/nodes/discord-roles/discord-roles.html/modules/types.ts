import { EditorNodeProperties } from 'node-red';
import { DiscordRolesOptions } from '../../shared/types';

export interface DiscordRolesEditorNodeProperties
  extends EditorNodeProperties,
  DiscordRolesOptions { }
