import { Guild, GuildMember, Role } from 'discord.js';
import { NodeInitializer } from 'node-red';
import { DiscordConfigNode } from '../discord-config/modules/types';
import { fetchGuild, fetchGuildMember, fetchRole, getBot } from '../shared/types';
import { DiscordRolesNode, DiscordRolesNodeDef } from './modules/types';

interface MessagePayload {
  guild: string | Guild;
  member: string | GuildMember;
  role: string | Role;
  action: 'add' | 'remove' | 'toggle';
}

const nodeInit: NodeInitializer = (RED): void => {
  function DiscordRolesNodeConstructor(
    this: DiscordRolesNode,
    config: DiscordRolesNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    const addRole = (member: GuildMember, role: Role): Promise<any> => {
      return member?.roles.add(role)
        .then(() => {
          this.status({ fill: 'green', shape: 'dot', text: 'Role added' });
          this.send({
            payload: {
              action: 'add',
              role
            }
          });
        })
        .catch((e) => {
          RED.log.error(e);
          this.status({ fill: 'red', shape: 'dot', text: 'error' });
        });
    }

    const removeRole = (member: GuildMember, role: Role): Promise<any> => {
      return member?.roles.remove(role)
        .then(() => {
          this.status({ fill: 'green', shape: 'dot', text: 'Role removed' });
          this.send({
            payload: {
              action: 'remove',
              role
            }
          });
        })
        .catch((e) => {
          RED.log.error(e);
          this.status({ fill: 'red', shape: 'dot', text: 'error' });
        });
    }

    const discordConfig: DiscordConfigNode = RED.nodes.getNode(config.config) as DiscordConfigNode;
    getBot(discordConfig.credentials.token).then((bot) => {
      this.status({ fill: 'green', shape: 'ring', text: 'ready' });
      this.on('input', (msg, _, done) => {
        this.status({ fill: 'yellow', shape: 'dot', text: 'Running' });

        const payload: MessagePayload = msg.payload as MessagePayload;
        const guild = fetchGuild(bot, payload);
        const role = fetchRole(bot, payload);
        const member = fetchGuildMember(bot, payload);
        if (!guild) {
          return this.status({ fill: 'red', shape: 'dot', text: 'Guild not found' });
        }

        if (!role) {
          return this.status({ fill: 'red', shape: 'dot', text: 'Role not found' });
        }

        if (!member) {
          return this.status({ fill: 'red', shape: 'dot', text: 'Member not found' });
        }

        switch (payload.action) {
          case 'add':
            addRole(member, role);
            break;

          case 'remove':
            removeRole(member, role);
            break;

          case 'toggle':
            if (member?.roles.cache.some((r) => r.id === role.id)) {
              removeRole(member, role);
            } else {
              addRole(member, role);
            }
            break;
        }
      });
    });
  }

  RED.nodes.registerType('discord-roles', DiscordRolesNodeConstructor);
};

export = nodeInit;
