import { EditorRED } from 'node-red';
import { DiscordConfigEditorNodeProperties } from './modules/types';

declare const RED: EditorRED;

RED.nodes.registerType<DiscordConfigEditorNodeProperties>('discord-config', {
  category: 'config',
  defaults: {
    name: { value: 'Discord' },
    token: { value: '', required: true },
  },
  label: function () {
    return this.name || 'Discord';
  },
});
