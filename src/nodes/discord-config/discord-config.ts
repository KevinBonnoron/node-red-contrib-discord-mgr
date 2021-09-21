import { NodeInitializer } from 'node-red';
import { getBot } from '../shared/types';
import { DiscordConfigNode, DiscordConfigNodeDef } from './modules/types';

const nodeInit: NodeInitializer = (RED): void => {
  function DiscordConfigNodeConstructor(
    this: DiscordConfigNode,
    config: DiscordConfigNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    getBot(config.token).then(() => {
      RED.nodes.addCredentials(config.id, { token: config.token });
    }).catch((e) => {
      this.status({ fill: 'red', shape: 'dot', text: 'error' });
      this.error(e);
    });
  }

  RED.nodes.registerType('discord-config', DiscordConfigNodeConstructor, { credentials: { token: { type: 'password' }, } });
};

export = nodeInit;
