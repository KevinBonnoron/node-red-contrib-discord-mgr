import { EditorRED } from 'node-red';
import { DiscordMsgInEditorNodeProperties } from './modules/types';

declare const RED: EditorRED;

RED.nodes.registerType<DiscordMsgInEditorNodeProperties>('discord-msg-in', {
  category: 'discord',
  color: '#7289da',
  defaults: {
    name: { value: '' },
    config: { value: '', type: 'discord-config', required: true },
    channel: { value: '' }
  },
  inputs: 0,
  outputs: 1,
  icon: 'discord.png',
  paletteLabel: 'msg in',
  label: function () {
    return this.name || 'Discord';
  }
});
