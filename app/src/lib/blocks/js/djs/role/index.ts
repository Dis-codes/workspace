import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';
class RoleBlocks {
  getRegistry () {
    return {
      id: "role",
      color: '#30B474',
      blocks: [
        {
          func: "get",
          text: "Get role with ID [ID] on server [SERVER]",
          output: OutputType.DISCORD.ROLE,
          inline: true,
          arguments: {
            ID: {
              type: InputShape.VALUE,
              check: OutputType.STRING
            },
            SERVER: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.SERVER
            }
          }
        },
        {
          func: "get_all",
          text: "Get all roles from [VAL] then \n",
          branches: 1,
          shape: BlockShape.STATEMENT,
          inline: true,
          arguments: {
            VAL: {
              type: InputShape.VALUE,
              check: [OutputType.DISCORD.SERVER, OutputType.DISCORD.MEMBER].flat()
            }
          }
        },
        {
          func: "get_all_value",
          text: "Role",
          output: OutputType.DISCORD.ROLE,
          inline: true
        },
        {
          func: "member_has",
          text: "Member[MEMBER] has role [ROLE]",
          output: OutputType.BOOLEAN,
          inline: true,
          arguments: {
            MEMBER: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.MEMBER
            },
            ROLE: {
              type: InputShape.VALUE,
              check: [OutputType.STRING, OutputType.DISCORD.ROLE].flat()
            }
          }
        },
        {
          func: "property",
          text: "Role [ROLE] [THING]",
          output: [OutputType.STRING, OutputType.NUMBER, OutputType.DISCORD.SERVER].flat(),
          inline: true,
          arguments: {
            ROLE: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.ROLE
            },
            THING: {
              type: InputShape.MENU,
              options: [
                ["name", "name"],
                ["id", "id"],
                ["color", "color"],
                ["icon", "icon"],
                ["unicode icon", "unicodeEmoji"],
                ["position", "rawPosition"],
                ["server", "guild"]
              ]
            }
          }
        },
        {
          func: "is",
          text: "Is role [ROLE] [THING]",
          output: OutputType.BOOLEAN,
          inline: true,
          arguments: {
            ROLE: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.ROLE
            },
            THING: {
              type: InputShape.MENU,
              options: [
                ["mentionable", "mentionable"],
                ["hoisted", "hoist"],
                ["managed", "managed"],
                ["existent", "exist"]
              ]
            }
          }
        },
        {
          func: "member_give_remove",
          text: "[ACTION] role(s) [ROLE] to member [MEMBER]",
          shape: BlockShape.STATEMENT,
          inline: true,
          arguments: {
            ACTION: {
              type: InputShape.MENU,
              options: [
                ["Give", "add"],
                ["Remove", "remove"]
              ]
            },
            ROLE: {
              type: InputShape.VALUE,
              check: [OutputType.DISCORD.ROLE, OutputType.ARRAY].flat()
            },
            MEMBER: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.MEMBER
            }
          }
        },
        {
          func: "create",
          text: "Create role in server [SERVER] Name [NAME] Color [COLOR] Reason [REASON] Then",
          shape: BlockShape.STATEMENT,
          branches: 1,
          inline: false,
          arguments: {
            SERVER: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.SERVER
            },
            NAME: {
              type: InputShape.VALUE,
              check: OutputType.STRING
            },
            COLOR: {
              type: InputShape.VALUE,
              check: [OutputType.STRING, OutputType.NUMBER, "Colour"].flat()
            },
            REASON: {
              type: InputShape.VALUE,
              check: OutputType.STRING
            }
          }
        },
        {
          func: "created",
          text: "Created role",
          output: OutputType.DISCORD.ROLE,
          inline: true
        },
        {
          func: "delete",
          text: "Delete role [ROLE]",
          shape: BlockShape.STATEMENT,
          inline: true,
          arguments: {
            ROLE: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.ROLE
            }
          }
        },
        {
          func: "edit",
          text: "In role [ROLE] set [THING] to [VALUE]",
          shape: BlockShape.STATEMENT,
          inline: true,
          arguments: {
            ROLE: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.ROLE
            },
            THING: {
              type: InputShape.MENU,
              options: [
                ["name", "name"],
                ["color", "color"],
                ["icon", "icon"],
                ["unicode icon", "unicodeEmoji"],
                ["position", "position"],
                ["mentionable", "mentionable"],
                ["hoisted", "hoist"]
              ]
            },
            VALUE: {
              type: InputShape.VALUE,
              check: [OutputType.STRING, OutputType.NUMBER, OutputType.COLOR, OutputType.BOOLEAN, "Colour"].flat()
            }
          }
        },
        {
          func: "has_perm",
          text: "Role [ROLE] has permission [PERM]",
          output: OutputType.BOOLEAN,
          inline: true,
          arguments: {
            ROLE: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.ROLE
            },
            PERM: {
              type: InputShape.MENU,
              options: [
                ["Create Invites", "1n"],
                ["Kick Members", "2n"],
                ["Ban Members", "4n"],
                ["Administrator", "8n"],
                ["Manage Channels", "16n"],
                ["Manage Guild", "32n"],
                ["Add Reactions", "64n"],
                ["View Audit Log", "128n"],
                ["Priority Speaker", "256n"],
                ["Stream", "512n"],
                ["View Channel", "1024n"],
                ["Send Messages", "2048n"],
                ["Send TTS Messages", "4096n"],
                ["Manage Messages", "8192n"],
                ["Embed Links", "16384n"],
                ["Attach Files", "32768n"],
                ["Read Message History", "65536n"],
                ["Mention Everyone", "131072n"],
                ["Use External Emojis", "262144n"],
                ["View Guild Insights", "524288n"],
                ["Connect", "1048576n"],
                ["Speak", "2097152n"],
                ["Mute Members", "4194304n"],
                ["Deafen Members", "8388608n"],
                ["Move Members", "16777216n"],
                ["Use VAD", "33554432n"],
                ["Change Nickname", "67108864n"],
                ["Manage Nicknames", "134217728n"],
                ["Manage Roles", "268435456n"],
                ["Manage Webhooks", "536870912n"],
                ["Manage Emojis And Stickers", "1073741824n"],
                ["Manage Guild Expressions", "1073741824n"],
                ["Use Application Commands", "2147483648n"],
                ["Request To Speak", "4294967296n"],
                ["Manage Events", "8589934592n"],
                ["Manage Threads", "17179869184n"],
                ["Create Public Threads", "34359738368n"],
                ["Create Private Threads", "68719476736n"],
                ["Use External Stickers", "137438953472n"],
                ["Send Messages In Threads", "274877906944n"],
                ["Use Embedded Activities", "549755813888n"],
                ["Timeout Members", "1099511627776n"],
                ["View Creator Monetization Analytics", "2199023255552n"],
                ["Use Soundboard", "4398046511104n"],
                ["Use External Sounds", "35184372088832n"],
                ["Send Voice Messages", "70368744177664n"]
              ]
            }
          }
        },
        {
          func: "set_perm",
          text: "Role [ROLE] set permission [PERM] to [OP]",
          shape: BlockShape.STATEMENT,
          inline: true,
          arguments: {
            ROLE: {
              type: InputShape.VALUE,
              check: OutputType.DISCORD.ROLE
            },
            PERM: {
              type: InputShape.MENU,
              options: [
                ["Create Invites", "1n"],
                ["Kick Members", "2n"],
                ["Ban Members", "4n"],
                ["Administrator", "8n"],
                ["Manage Channels", "16n"],
                ["Manage Guild", "32n"],
                ["Add Reactions", "64n"],
                ["View Audit Log", "128n"],
                ["Priority Speaker", "256n"],
                ["Stream", "512n"],
                ["View Channel", "1024n"],
                ["Send Messages", "2048n"],
                ["Send TTS Messages", "4096n"],
                ["Manage Messages", "8192n"],
                ["Embed Links", "16384n"],
                ["Attach Files", "32768n"],
                ["Read Message History", "65536n"],
                ["Mention Everyone", "131072n"],
                ["Use External Emojis", "262144n"],
                ["View Guild Insights", "524288n"],
                ["Connect", "1048576n"],
                ["Speak", "2097152n"],
                ["Mute Members", "4194304n"],
                ["Deafen Members", "8388608n"],
                ["Move Members", "16777216n"],
                ["Use VAD", "33554432n"],
                ["Change Nickname", "67108864n"],
                ["Manage Nicknames", "134217728n"],
                ["Manage Roles", "268435456n"],
                ["Manage Webhooks", "536870912n"],
                ["Manage Emojis And Stickers", "1073741824n"],
                ["Manage Guild Expressions", "1073741824n"],
                ["Use Application Commands", "2147483648n"],
                ["Request To Speak", "4294967296n"],
                ["Manage Events", "8589934592n"],
                ["Manage Threads", "17179869184n"],
                ["Create Public Threads", "34359738368n"],
                ["Create Private Threads", "68719476736n"],
                ["Use External Stickers", "137438953472n"],
                ["Send Messages In Threads", "274877906944n"],
                ["Use Embedded Activities", "549755813888n"],
                ["Timeout Members", "1099511627776n"],
                ["View Creator Monetization Analytics", "2199023255552n"],
                ["Use Soundboard", "4398046511104n"],
                ["Use External Sounds", "35184372088832n"],
                ["Send Voice Messages", "70368744177664n"]
              ]
            },
            OP: {
              type: InputShape.menu,
              options: [
                ["Allow", "add"],
                ["Disallow", "remove"]
              ]
            }
          }
        }
      ]
    };
  }
  get(args: any) {
    return `${args.SERVER}.roles.cache.get(${args.ID})`;
  }
  get_all(args: any) {
    return `${args.VAL}.roles.cache.forEach(__DIS__Role => {
  ${args.BRANCH1}
})`;
  }
  get_all_value(args: any) {
    return `__DIS__Role`;
  }
  member_has(args: any) {
    return `${args.MEMBER}.roles.cache.has(${args.ROLE})`
  }
  property(args: any) {
    return `${args.ROLE}.${args.THING}`
  }
  is(args: any) {
    if (args.THING == "exist") return `(!!${args.ROLE})`
    return `${args.ROLE}.${args.THING}`
  }
  member_give_remove(args: any) {
    return `${args.MEMBER}.roles.${args.ACTION}(${args.ROLE})`
  }
  create(args: any) {
    return `${args.SERVER}.roles.create({
  name: ${args.NAME},
  color: ${args.COLOR},
  reason: ${args.REASON},
}).then(__DIS__CreatedRole => {
  ${args.BRANCH1}
})`
  }
  created(args: any) {
    return `__DIS__CreatedRole`
  }
  delete(args: any) {
    return `${args.ROLE}.delete()`
  }
  edit(args: any) {
    switch (args.THING) {
      case 'name':
        return `${args.ROLE}.setName(${args.VALUE})`
      case 'color':
        return `${args.ROLE}.setColor(${args.VALUE})`
      case 'icon':
        return `${args.ROLE}.setIcon(${args.VALUE})`
      case 'unicodeEmoji':
        return `${args.ROLE}.setUnicodeEmoji(${args.VALUE})`
      case 'position':
        return `${args.ROLE}.setPosition(${args.VALUE})`
      case 'mentionable':
        return `${args.ROLE}.setMentionable(${args.VALUE})`
      case 'hoist':
        return `${args.ROLE}.setHoist(${args.VALUE})`
    }
  }
  has_perm(args: any) {
    return `${args.ROLE}.permissions.has(${args.PERM})`
  }
  set_perm(args: any) {
    return `${args.ROLE}.setPermissions(${args.ROLE}.permissions.${args.OP}(${args.PERM}))`
  }
}
  
export default RoleBlocks;
