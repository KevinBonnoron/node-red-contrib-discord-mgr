import { Channel, Guild, User } from 'discord.js';
import { NodeInitializer } from 'node-red';
import { DiscordConfigNode } from '../discord-config/modules/types';
import { fetchChannel, getBot } from '../shared/types';
import { DiscordMsgOutNode, DiscordMsgOutNodeDef } from './modules/types';

interface ChannelMessagePayload {
  guild: Guild | string;
  channel: Channel | string;
}

interface UserMessagePayload {
  user: User | string;
}

interface Payload {
  message: string;
}

//type MessagePayload = Payload & (ChannelMessagePayload | UserMessagePayload);
type MessagePayload = Payload & ChannelMessagePayload;

const nodeInit: NodeInitializer = (RED): void => {
  function DiscordMsgOutNodeConstructor(
    this: DiscordMsgOutNode,
    config: DiscordMsgOutNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    const discordConfig: DiscordConfigNode = RED.nodes.getNode(config.config) as DiscordConfigNode;
    getBot(discordConfig.credentials.token).then((bot) => {
      this.on('input', (msg, send, done) => {
        const payload: MessagePayload = msg.payload as MessagePayload;
        const { message } = payload;
        if (!message) {
          this.status({ fill: 'red', shape: 'dot', text: 'Invalid inputs' });
          return done();
        }

        const channel = fetchChannel(bot, payload);
        if (channel) {
          if (channel.isText()) {
            channel.send({ content: message });
          }
        }
      });
    });
  }

  RED.nodes.registerType('discord-msg-out', DiscordMsgOutNodeConstructor);
};

export = nodeInit;
