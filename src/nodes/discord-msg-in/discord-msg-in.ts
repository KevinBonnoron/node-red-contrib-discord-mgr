import { Message } from 'discord.js';
import { NodeInitializer } from 'node-red';
import { DiscordConfigNode } from '../discord-config/modules/types';
import { getBot, prettyDate } from '../shared/types';
import { DiscordMsgInNode, DiscordMsgInNodeDef } from './modules/types';

const nodeInit: NodeInitializer = (RED): void => {
  function DiscordMsgInNodeConstructor(
    this: DiscordMsgInNode,
    config: DiscordMsgInNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    const discordConfig: DiscordConfigNode = RED.nodes.getNode(config.config) as DiscordConfigNode;
    getBot(discordConfig.credentials.token).then((bot) => {
      this.status({ fill: 'green', shape: 'ring', text: 'ready' });

      const handleMessage = (message: Message) => {
        const channel: any = message.channel.toJSON();
        if (config.channel !== '' && config.channel !== channel.name) {
          return;
        }

        this.status({ fill: 'green', shape: 'dot', text: `Message received at ${prettyDate()}` });
        this.send({
          _msgid: RED.util.generateId(),
          payload: {
            message: message.toJSON(),
            channel: message.channel.toJSON(),
            author: message.author.toJSON(),
            guild: message.guild?.toJSON()
          }
        });
      }

      bot.on('message', handleMessage);
      this.on('close', () => bot.off('message', handleMessage));
    });
  }

  RED.nodes.registerType('discord-msg-in', DiscordMsgInNodeConstructor);
};

export = nodeInit;
