import { BlockShape, InputShape, MutatorType, OutputType } from "$lib/utils/constants";

class SlashCommands {
	getRegistry() {
		return {
			id: "SlashCommands",
            name: "Slash Commands",
			color: "#be4fff",
			weight: 6,
			blocks: [
                {
                    func: "ReceiveSlashCommand",
                    text: "When a slash command is received \n",
                    inline: false,
                    color: "#ffab19",
                    shape: BlockShape.EVENT,
                    branches: 1
                },
                {
                    func: "SlashCommandProps",
                    text: "[PROPERTIES]",
                    output: [OutputType.STRING, OutputType.DISCORD.MEMBER, OutputType.DISCORD.CHANNEL, OutputType.DISCORD.SERVER].flat(),
                    arguments: {
                        PROPERTIES: {
                            type: InputShape.MENU,
                            options: [
                                ['Interaction Name', 'interaction.CommandName'],
                                ['Interaction Member', 'interaction.member'],
                                ['Interaction User', 'interaction.user'],
                                ['Interaction Channel', 'interaction.channel'],
                                ['Interaction Server', 'interaction.guild'],
                                ['Interaction Member Voice Channel', 'interaction.member.voice.channel'],
                                ['Bot Voice Channel ID', 'interaction.guild.me.voice.ChannelID']
                            ]
                        }
                    }
                },
                {
                    func: "GetSlashStuff",
                    text: "Get option [OPTION] with name [NAME]",
                    output: OutputType.ANY,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        OPTION: {
                            type: InputShape.MENU,
                            options: [
                                ['string', 'string'],
                                ['integer', 'integer'],
                                ['boolean', 'boolean'],
                                ['user', 'user'],
                                ['member', 'member'],
                                ['channel', 'channel'],
                                ['role', 'role'],
                                ['subcommand', 'subcommand'],
                                ['subcommand group', 'subcommand group'],
                                ['attachement', 'attachement']
                            ]
                        }
                    }
                },
                {
                    func: "AdvancedAttachement",
                    text: "[TYPE] of attachement option with name [NAME]",
                    output: OutputType.ANY,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING,
                        },
                        TYPE: {
                            type: InputShape.MENU,
                            options: [
                                ['URL', 'url'],
                                ['File Name', 'File Name'],
                                ['File ID', 'File ID'],
                                ['Proxy URL', 'Proxy URL'],
                                ['Content Type', 'Content Type']
                            ]
                        }
                    }
                },
                {
                    func: "AttachementSize",
                    text: "[TYPE] of attachement option with name [NAME]",
                    output: OutputType.ANY,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        TYPE: {
                            type: InputShape.MENU,
                            options: [
                                ['Height', 'height'],
                                ['Width', 'width']
                            ]
                        }
                    }
                },
                {
                    func: "InteractionReply",
                    text: "Interaction Reply: Ephemeral [EPH]",
                    color: "#4C97FF",
                    shape: BlockShape.STATEMENT,
                    arguments: {
                        EPH: {
                          type: InputShape.VALUE,
                          check: OutputType.BOOLEAN
                        }
                    },
                    mutator: "ReplyOptions",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
					  {
						text: "Content",
						type: OutputType.STRING,
						defaultValue: true,
					  },
                      {
                        text: "Embed",
                        type: OutputType.ANY,
                        defaultValue: false
                      },
                      {
                        text: "Attachement",
                        type: OutputType.ANY,
                        defaultValue: false
                      },
                      {
                        text: "Button/Menu Row",
                        type: OutputType.ANY,
                        defaultValue: false
                      }
					]
				  }

                },
                {
                    func: "InteractionReplyEdit",
                    text: "Edit Reply:",
                    color: "#4C97FF",
                    shape: BlockShape.STATEMENT,
                    mutator: "ReplyOptions",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
					  {
						text: "Content",
						type: OutputType.STRING,
						defaultValue: true,
					  },
                      {
                        text: "Embed",
                        type: OutputType.ANY,
                        defaultValue: false
                      },
                      {
                        text: "Attachement",
                        type: OutputType.ANY,
                        defaultValue: false
                      },
                      {
                        text: "Button/Menu Row",
                        type: OutputType.ANY,
                        defaultValue: false
                      }
					]
				  }

                }
            ]
		};
	}
}
export default SlashCommands;
