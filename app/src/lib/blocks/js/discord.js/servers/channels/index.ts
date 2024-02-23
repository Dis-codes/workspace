import { BlockShape, InputShape, OutputType,Permissions } from "$lib/utils/blockRegistryTool";
import {MutatorType} from "$lib/interfaces/mutator";

class ChannelBlocks {
	getRegistry() {
		return {
			id: "channel",
			color: "#a85c7c",
			weight: 2,
			blocks: [
			  {
				func: "get",
				text: "get the channel with [ID] equal to [NAME]",
				output: OutputType.DISCORD.CHANNEL,
				mutator: "getserverbyid",
				mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
					  {
						text: "Server - (with name)",
						type: OutputType.DISCORD.SERVER,
						defaultValue: false,
					  }
					]
				  },
				arguments: {
					NAME: {
						type: InputShape.VALUE,
						check: OutputType.STRING
					},
					ID: {
						type: InputShape.MENU,
						options: [
							['id', 'id'],
							['name', 'name']
						],
					},
				},
			  },
			  {
				func: "getbynum",
				text: "get channel # [NUMBER] on server [SERVER]",
				output: OutputType.DISCORD.CHANNEL,
				arguments: {
				  NUMBER: {
					     type: InputShape.VALUE,
						 check: OutputType.NUMBER

				  },
				  SERVER: {
					     type: InputShape.VALUE,
						 check: OutputType.DISCORD.SERVER
				  }
				}
			  },
			  {
				func: "get_number",
				text: "[TYPE] channel in server [SERVER]",
				output: OutputType.DISCORD.CHANNEL,
				arguments: {
					TYPE: {
					    type: InputShape.MENU,
						options: [
							['first', 'first'],
							['last', 'last'],
							['random', 'random'],
							// ['channel #', 'channel #']
						],
				},
				    SERVER: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.SERVER
					}     
				}
			  },
			  {
				func: "info",
				text: "get [TYPE] of channel [CHANNEL]",
				output: OutputType.STRING,
				arguments: {
					TYPE: {
						type: InputShape.MENU,
						options: [
							['name', 'name'],
							['id', 'id'],
							['postion', 'postion'],
							['server', 'server'],
							['category', 'category'],
							['last message', 'last message'],
							['topic', 'topic'],
							['slowmode', 'slowmode'],
							['type', 'type']

						]
					},
					CHANNEL: {
                           type: InputShape.VALUE,
						   check: OutputType.DISCORD.CHANNEL
					}
				}
			  },
			  {
				func: "get_all",
				text: "get all channels in server [SERVER] then for each do \n",
				shape: BlockShape.STATEMENT,
				branches: 1,
				inline: true,
				arguments: {
					SERVER: {
                        type: InputShape.VALUE,
						check: OutputType.DISCORD.SERVER 
					}
				}
			  },
			  {
				func: "get_channel",
				text: "channel",
				output: OutputType.DISCORD.CHANNEL,
				inline: true
			  },
			  {
				func: "check_channel_props",
				text: "channel [CHANNEL] [TYPE]?",
				output: OutputType.BOOLEAN,
				arguments: {
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					},
					TYPE: {
						type: InputShape.MENU,
						options: [
							['exists', 'exists'],
							['is nsfw', 'is nsfw'],
							['is private', 'is private'],
							['is public', 'is public'],
							['has threads', 'has threads']
						]
						}
				}

			  },
			  {
				func: "check_channel_type",
				text: "is channel [CHANNEL] of type [TYPE]?",
				output: OutputType.BOOLEAN,
				arguments: {
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					},
					TYPE: {
						type: InputShape.MENU,
						options: [
							['text', 'text'],
							['voice', 'voice'],
							['announcement', 'announcement'],
						    ['forum', 'forum'],
							['stage', 'stage']
						]
					}
				}
			  },
			  {
				func: "check_perms",
				text: "does channel [CHANNEL] have permission [PERMS] allowed for member/role [ROLE] in server [SERVER]",
				output: OutputType.BOOLEAN,
				inline: false,
				arguments: {
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					},
					ROLE: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.ROLE
					},
					SERVER: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.SERVER
					},
					PERMS: {
						type: InputShape.MENU,
						options: Permissions
					}
				}
			},
			  {
				func: "create",
				text: "Create Channel with name [NAME] of type [TYPE] on server [SERVER]",
				shape: BlockShape.STATEMENT,
				inline: false,
				color: "#4C97FF",
				mutator: "channel_create_mutator",
				mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "Category (channel creation)",
							inputname: "Category (Only for channel creation)",
							type: OutputType.DISCORD.CHANNEL,
							defaultValue: false
						},
						{
							text: "Then",
							inputName: "Then",
							type: OutputType.STRING,
							defaultValue: false,
							branch: true
						}
					]
				},
				arguments: {
					NAME: {
						type: InputShape.VALUE,
						check: OutputType.STRING
					},
					SERVER: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.SERVER
					},
					TYPE: {
						type: InputShape.MENU,
						options: [
							['text', 'text'],
							['voice', 'voice'],
							['announcement', 'announcement'],
							['stage', 'stage'],
							['forum', 'forum'],
							['category', 'category']
						]
					}
				}
			  },
			  {
				func: "created",
				text: "Created channel",
				output: OutputType.DISCORD.CHANNEL
			  },
			  {
                func: "deletechannel",
				text: "delete channel [CHANNEL]",
				shape: BlockShape.STATEMENT,
				color: "#4C97FF",
				inline: true,
				mutator: "delete_reason",
				mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "reason",
							inputname: "reason",
							type: OutputType.STRING,
							defaultValue: false
						}
					]
				},
				arguments: {
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					}
				}
			  },
			  {
                func: "setnsfwtag",
				text: "[ACTION] NSFW tag on channel [CHANNEL]",
				shape: BlockShape.STATEMENT,
				inline: false,
				color: "#4C97FF",
				mutator: "action_nsfw",
				mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "reason",
							inputname: "reason",
							type: OutputType.STRING,
							defaultValue: false
						}
					]
				},
				arguments: {
					ACTION: {
						type: InputShape.MENU,
						options: [
							['set', 'set'],
							['remove', 'remove']
						]
					},
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					}
				}
                
			  },
			  {
				func: "follow",
				text: "follow channel [FC] to channel [TC]",
				shape: BlockShape.STATEMENT,
				color: "#4C97FF",
				inline: true,
				mutator: "action_nsfw",
				mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "reason",
							inputname: "reason",
							type: OutputType.STRING,
							defaultValue: false
						}
					]
				},
				arguments: {
					FC: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					},
					TC: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					}
				}
			  },
			  {
				func: "changename_topic",
				text: "Change [TYPE] of channel [CHANNEL] to [NEW_NAME]",
				shape: BlockShape.STATEMENT,
                color: "#4C97FF",
				inline: true,
				arguments: {
					TYPE: {
						type: InputShape.MENU,
						options: [
							['name', 'name'],
							['topic', 'topic']
						]
					},
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					},
					NEW_NAME: {
                         type: InputShape.VALUE,
						 check: OutputType.STRING
					}
				}
			  },
			  {
				func: "permoverwrites",
				text: "in channel [CHANNEL] [CHOICE] permissions to member/role [ROLE] \n",
				inline: true,
				branches: 1,
				color: "#4C97FF",
				shape: BlockShape.STATEMENT,
				arguments: {
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					},
					CHOICE: {
						type: InputShape.MENU,
						options: [
							['allow', 'allow'],
							['deny', 'deny']
						]
					},
					ROLE: {
						type: InputShape.VALUE,
						check: [OutputType.DISCORD.ROLE, OutputType.DISCORD.MEMBER].flat()
					}
				} 
			  },
			  {
				func: "perms",
				text: "Permission [PERM]",
				color: "#4C97FF",
				url: 'https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags',
				tooltip: 'Use block only inside of the permission setting block. For understanding the permissions, right click and click "Help"',
				shape: BlockShape.STATEMENT,
				arguments: {
					PERM: {
						type: InputShape.MENU,
						options: Permissions
					}
				}
			  },
			  {
				func: "set_slowmode",
				text: "Set slowmode on channel [CHANNEL] for [TIME] seconds",
				inline: true,
                color: "#4C97FF",
				shape: BlockShape.STATEMENT,
				mutator: "reason_slowmode",
				mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "reason",
							inputname: "reason",
							type: OutputType.STRING,
							defaultValue: false
						}
					]
				},
				arguments: {
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					},
					TIME: {
						type: InputShape.VALUE,
						check: OutputType.NUMBER
					}
				}

			  },
			]
		}


	}

}	
export default ChannelBlocks;
