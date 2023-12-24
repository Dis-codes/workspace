import javascriptGenerator from '$lib/javascript';
import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class MemberBlocks {
    getRegistry () {
        return {
            id: "member",
            color: "#187494",
            blocks: [
              {
                func: "get_member_by_id",
                text: "Get member by id [ID]",
                blockShape: BlockShape.TOPPER,
                arguments: {
                    ID: {
                        type: OutputType.STRING,
                        shape: InputShape.TEXT,
                    },
                },
              },
              {
                func: "get_member_by_name",
                text: "Get member by name [NAME]",
                BlockShape: BlockShape.TOPPER,
                arguments: {
                  NAME: {
                      type: OutputType.STRING,
                      shape: InputShape.TEXT,
                  },
                }
              },
              // * No longer used in discord
              /*{
                func: "get_member_by_tag",
                text: "Get member by tag [TAG]",
                BlockShape: BlockShape.TOPPER,
                arguments: {
                  TAG: {
                      type: OutputType.STRING,
                      shape: InputShape.TEXT,
                  },
                }
              }*/
              {
                func: "get_members_by_role",
                text: "Get members by role [ROLE]",
                BlockShape: BlockShape.TOPPER,
                arguments: {
                  ROLE: {
                      type: OutputType.STRING,
                      shape: InputShape.TEXT,
                  },
                }
              },
              {
                func: "id_of_member",
                text: "ID of member [MEMBER]",
                blockShape: BlockShape.TOPPER,
                arguments: {
                  MEMBER: {
                      type: OutputType.DISCORD.MEMBER,
                      shape: InputShape.TEXT,
                  },
                },
              },
              {
                func: "username_of_member",
                text: "Username of member [MEMBER]",
                blockShape: BlockShape.TOPPER,
                arguments: {
                  MEMBER: {
                      type: OutputType.DISCORD.MEMBER,
                      shape: InputShape.TEXT,
                  },
                },
              },
              {
                func: "presence_of_member",
                text: "Presence of member [MEMBER]",
                blockShape: BlockShape.TOPPER,
                arguments: {
                  MEMBER: {
                      type: OutputType.DISCORD.MEMBER,
                      shape: InputShape.TEXT,
                  },
                },
              }
            ]
        };
    }
    get_member_by_id (args: any) {
      return `client.members.cache.get(${args.ID})`
    }
    get_member_by_name (args: any) {
      return `client.members.cache.find(member => member.name === ${args.NAME})`
    }
    // * No longer used in discord
    /*get_member_by_tag (args: any) {
      return `client.members.cache.find(member => member.tag === ${args.TAG})`
    }*/
    get_members_by_role (args: any) {
      return `client.members.cache.filter(member => member.roles.cache.has(${args.ROLE}))`
    }
    id_of_member (args: any) {
      return `${args.MEMBER}.id`
    }
    username_of_member (args: any) {
      return `${args.MEMBER}.username`
    }
    presence_of_member (args: any) {
      return `${args.MEMBER}.presence`
    }
}

export default MemberBlocks;