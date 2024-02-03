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
                //["permissions", "permissions"], - no permisions category or type yet
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
}
  
export default RoleBlocks;
