import { EditorRED } from 'node-red';
import { DiscordMsgOutEditorNodeProperties } from './modules/types';

declare const RED: EditorRED;

RED.nodes.registerType<DiscordMsgOutEditorNodeProperties>('discord-msg-out', {
  category: 'discord',
  color: '#7289da',
  defaults: {
    name: { value: '' },
    config: { value: '', type: 'discord-config', required: true },
  },
  inputs: 1,
  outputs: 0,
  icon: 'discord.png',
  paletteLabel: 'msg out',
  label: function () {
    return this.name || 'Discord';
  },
});
