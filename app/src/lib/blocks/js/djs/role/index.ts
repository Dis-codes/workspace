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
					inline: true,
					arguments: {
						VAL: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.SERVER.concat(OutputType.DISCORD.MEMBER)
						}
					}
        },
        {
          func: "get_all_value",
          text: "Role",
          output: OutputType.DISCORD.ROLE,
					inline: true,
        }
			]
		};
	},
	get(args: any) {
		return `${args.SERVER}.roles.cache.get(${args.ID})`;
	},
  get_all(args: any) {
		return `${args.VAL}.roles.cache.forEach(__DIS__Role => {
  ${args.BRANCH1}
})`;
	},
  get_all_value(args: any) {
		return `__DIS__Role`;
	}
}
  
export default RoleBlocks;
