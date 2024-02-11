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
        },
        {
          func: "member_give_remove",
          text: "[ACTION] role(s) [ROLE] to [MEMBER] member",
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
}
  
export default RoleBlocks;
