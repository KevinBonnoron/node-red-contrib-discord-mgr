import { Channel, Client, Guild, GuildMember, Role } from 'discord.js';

const BOTS: { [token: string]: Client } = {};
export const getBot = (token: string): Promise<Client> => {
  return new Promise(async (resolve, reject) => {
    let bot = BOTS[token];
    if (bot === undefined) {
      bot = new Client();
      try {
        BOTS[token] = bot;
        await bot.login(token);
      } catch (e) {
        reject(e);
      }
    }

    resolve(bot);
  })
};

export interface MsgPayloadRole {
  role: Role | string;
}

export interface MsgPayloadGuild {
  guild: Guild | string;
}

export interface MsgPayloadGuildMember {
  member: GuildMember | string;
}

export interface MsgPayloadChannel {
  channel: Channel | string;
}

export const hasProperties = (object: any, keys: string[]) => keys.every((key) => object[key] !== undefined);
export const isGuild = (value: unknown): value is Guild => hasProperties(value, ['afkChannelID', 'id']);
export const fetchGuild = (client: Client, payload: MsgPayloadGuild): Guild | undefined => {
  let { guild } = payload;
  if (isGuild(guild)) {
    guild = guild.id;
  }

  return client.guilds.cache.find((g) => g.id === guild || g.name === guild);
}

export const isRole = (value: unknown): value is Role => hasProperties(value, ['color', 'deleted', 'hoist']);
export const fetchRole = (client: Client, payload: MsgPayloadGuild & MsgPayloadRole): Role | undefined => {
  let { role } = payload;
  if (isRole(role)) {
    role = role.id;
  }

  const guild = fetchGuild(client, payload);
  return guild?.roles.cache.find((r) => r.id === role || r.name === role)
}

export const isGuildMember = (value: unknown): value is GuildMember => hasProperties(value, ['bannable', 'guild', 'premiumSinceTimestamp']);
export const fetchGuildMember = (client: Client, payload: MsgPayloadGuild & MsgPayloadGuildMember): GuildMember | undefined => {
  let { member } = payload;
  if (isGuildMember(member)) {
    member = member.id;
  }

  const guild = fetchGuild(client, payload);
  return guild?.members.cache.find((m) => m.id === member || m.displayName === member || m.nickname === member);
}

export const isChannel = (value: unknown): value is Channel => hasProperties(value, ['deleted', 'type', 'id']);
export const fetchChannel = (client: Client, payload: MsgPayloadGuild & MsgPayloadChannel): Channel | undefined => {
  let { channel } = payload;
  if (isChannel(channel)) {
    channel = channel.id;
  }

  const guild = fetchGuild(client, payload);
  return guild?.channels.cache.find((c) => c.id === channel || c.name === channel);
}

export const findChannelByName = (bot: Client, channelName: string): Channel | undefined => bot.channels.cache.find((channel) => (channel.toJSON() as any).name === channelName);

export const prettyDate = (): string => {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  });
};
