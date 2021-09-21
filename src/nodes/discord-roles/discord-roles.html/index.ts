import { EditorRED } from 'node-red';
import { DiscordRolesEditorNodeProperties } from './modules/types';

declare const RED: EditorRED;

RED.nodes.registerType<DiscordRolesEditorNodeProperties>('discord-roles', {
  category: 'discord',
  color: '#7289da',
  defaults: {
    name: { value: '' },
    config: { value: '', type: 'discord-config', required: true },
  },
  inputs: 1,
  outputs: 1,
  icon: 'discord.png',
  paletteLabel: 'discord roles',
  label: function () {
    return this.name || 'discord roles';
  },
});
