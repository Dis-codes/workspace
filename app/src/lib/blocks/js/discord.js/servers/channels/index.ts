import javascriptGenerator from '$lib/javascript';
import { BlockShape, InputShape, OutputType } from "$lib/utils/blockRegistryTool";
import {MutatorType} from "$lib/interfaces/mutator";
import { Input } from 'postcss';
import { Block } from 'blockly';

class ChannelBlocks {
	getRegistry() {
		return {
			id: "channels",
			color: "#a85c7c",
			weight: 2,
			blocks: [
			  {
				func: "getchannel_category_byid",
				text: "get the channel/category with [ID] equal to [NAME]",
				output: OutputType.DISCORD.CHANNEL,
				mutator: "getserverbyid",
				mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
					  {
						text: "Server",
						type: OutputType.DISCORD.SERVER,
						defaultValue: true,
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
				func: "getchannel#onserver",
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
				func: "get_first_last_random_channel",
				text: "[TYPE] channel in server [SERVER]",
				output: OutputType.DISCORD.CHANNEL,
				arguments: {
					TYPE: {
					    type: InputShape.MENU,
						options: [
							['first', 'first'],
							['last', 'last'],
							['random', 'random'],
							['channel #', 'channel #']
						],
				},
				    SERVER: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.SERVER
					}     
				}
			  },
			  {
				func: "getchannelstuff",
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
				func: "allchannelsinserver",
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
				text: "does channel [CHANNEL] \n have permission [PERMS] \n allowed for member/role [ROLE] \n in server [SERVER]?",
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
						options: [
							['CREATE_INSTANT_INVITE', 'CREATE_INSTANT_INVITE'],
							['MANAGE_CHANNELS', 'MANAGE_CHANNELS'],
							['ADD_REACTIONS', 'ADD_REACTIONS'],
							['PRIORITY_SPEAKER', 'PRIORITY_SPEAKER'],
							['STREAM', 'STREAM'],
							['VIEW_CHANNEL', 'VIEW_CHANNEL'],
							['SEND_MESSAGES', 'SEND_MESSAGES'],
							['SEND_TTS_MESSAGES','SEND_TTS_MESSAGES'],
							['MANAGE_MESSAGES', 'PMANAGE_MESSAGES'],
							['EMBED_LINKS', 'EMBED_LINKS'],
							['ATTACH_FILES', 'ATTACH_FILES'],
							['READ_MESSAGE_HISTORY', 'READ_MESSAGE_HISTORY'],
							['MENTION_EVERYONE', 'MENTION_EVERYONE'],
							['USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_EMOJIS'],
							['CONNECT', 'CONNECT'],
							['SPEAK', 'SPEAK'],
							['MUTE_MEMBERS', 'MUTE_MEMBERS'],
							['DEAFEN_MEMBERS', 'DEAFEN_MEMBERS'],
							['MOVE_MEMBERS', 'MOVE_MEMBERS'],
							['USE_VAD', 'USE_VAD'],
							['MANAGE_ROLES', 'MANAGE_ROLES'],
							['MANAGE_WEBHOOKS', 'MANAGE_WEBHOOKS'],
							['USE_APPLICATION_COMMANDS', 'USE_APPLICATION_COMMANDS'],
							['REQUEST_TO_SPEAK', 'REQUEST_TO_SPEAK'],
							['MANAGE_EVENTS', 'MANAGE_EVENTS'],
							['MANAGE_THREADS', 'MANAGE_THREADS'],
							['CREATE_PUBLIC_THREADS', 'CREATE_PUBLIC_THREADS'],
							['CREATE_PRIVATE_THREADS', 'CREATE_PRIVATE_THREADS'],
							['USE_EXTERNAL_STICKERS', 'USE_EXTERNAL_STICKERS'],
							['SEND_MESSAGES_IN_THREADS', 'SEND_MESSAGES_IN_THREADS'],
							['USE_EMBEDDED_ACTIVITIES', 'USE_EMBEDDED_ACTIVITIES'],
							['USE_SOUNDBOARD', 'USE_SOUNDBOARD'],
							['CREATE_EVENTS', 'CREATE_EVENTS'],
							['USE_EXTERNAL_SOUNDS', 'USE_EXTERNAL_SOUNDS'],
							['SEND_VOICE_MESSAGES', 'SEND_VOICE_MESSAGES']  //Complete list is available at: https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags

						]
					}
				}
			},
			  {
				func: "createchannel_category",
				text: "Create Channel/Category with name [NAME] of type [TYPE] on server [SERVER]",
				shape: BlockShape.STATEMENT,
				inline: false,
				color: "#4C97FF",
				mutator: "channel_create_mutator",
				mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "Category (Only for channel creation)",
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
				func: "createdchannel",
				text: "Created category/channel",
				output: OutputType.DISCORD.CHANNEL
			  },
			  {
                func: "deletechannel",
				text: "delete channel/category [CHANNEL]",
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
				func: "follow_channel",
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
						options: [
							['CREATE_INSTANT_INVITE', 'CREATE_INSTANT_INVITE'],
							['MANAGE_CHANNELS', 'MANAGE_CHANNELS'],
							['ADD_REACTIONS', 'ADD_REACTIONS'],
							['PRIORITY_SPEAKER', 'PRIORITY_SPEAKER'],
							['STREAM', 'STREAM'],
							['VIEW_CHANNEL', 'VIEW_CHANNEL'],
							['SEND_MESSAGES', 'SEND_MESSAGES'],
							['SEND_TTS_MESSAGES','SEND_TTS_MESSAGES'],
							['MANAGE_MESSAGES', 'PMANAGE_MESSAGES'],
							['EMBED_LINKS', 'EMBED_LINKS'],
							['ATTACH_FILES', 'ATTACH_FILES'],
							['READ_MESSAGE_HISTORY', 'READ_MESSAGE_HISTORY'],
							['MENTION_EVERYONE', 'MENTION_EVERYONE'],
							['USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_EMOJIS'],
							['CONNECT', 'CONNECT'],
							['SPEAK', 'SPEAK'],
							['MUTE_MEMBERS', 'MUTE_MEMBERS'],
							['DEAFEN_MEMBERS', 'DEAFEN_MEMBERS'],
							['MOVE_MEMBERS', 'MOVE_MEMBERS'],
							['USE_VAD', 'USE_VAD'],
							['MANAGE_ROLES', 'MANAGE_ROLES'],
							['MANAGE_WEBHOOKS', 'MANAGE_WEBHOOKS'],
							['USE_APPLICATION_COMMANDS', 'USE_APPLICATION_COMMANDS'],
							['REQUEST_TO_SPEAK', 'REQUEST_TO_SPEAK'],
							['MANAGE_EVENTS', 'MANAGE_EVENTS'],
							['MANAGE_THREADS', 'MANAGE_THREADS'],
							['CREATE_PUBLIC_THREADS', 'CREATE_PUBLIC_THREADS'],
							['CREATE_PRIVATE_THREADS', 'CREATE_PRIVATE_THREADS'],
							['USE_EXTERNAL_STICKERS', 'USE_EXTERNAL_STICKERS'],
							['SEND_MESSAGES_IN_THREADS', 'SEND_MESSAGES_IN_THREADS'],
							['USE_EMBEDDED_ACTIVITIES', 'USE_EMBEDDED_ACTIVITIES'],
							['USE_SOUNDBOARD', 'USE_SOUNDBOARD'],
							['CREATE_EVENTS', 'CREATE_EVENTS'],
							['USE_EXTERNAL_SOUNDS', 'USE_EXTERNAL_SOUNDS'],
							['SEND_VOICE_MESSAGES', 'SEND_VOICE_MESSAGES']  //Complete list is available at: https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags

						]
					}
				}
			  },
			  {
				func: "enable_slowmode",
				text: "Enable slowmode on channel [CHANNEL] for (seconds) [TIME]",
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
			  {
				func: "disable_slowmode",
				text: "Disable slowmode on channel [CHANNEL]",
				shape: BlockShape.STATEMENT,
				color: "#4C97FF",
				arguments: {
					CHANNEL: {
						type: InputShape.VALUE,
						check: OutputType.DISCORD.CHANNEL
					}
				}
			  }
			]
		}


	}

}	
export default ChannelBlocks;
