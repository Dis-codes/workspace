import { BlockShape, InputShape, OutputType } from "$lib/utils/blockRegistryTool";
import {MutatorType} from "$lib/interfaces/mutator";

class Buttons {
	getRegistry() {
		return {
			id: "buttons",
			color: "#FF7F50",
			weight: 6,
			blocks: [
                {
                        func: "ButtonReceived",
                        text: "when a button is clicked \n",
                        shape: BlockShape.EVENT,
                        inline: false,
                        color: "#ffab19",
                        branches: 1
                },
                {
                    func: "ButtonProperties",
                    text: "[PROPERTIES]",
                    output: [OutputType.STRING, OutputType.DISCORD.CHANNEL, OutputType.DISCORD.MEMBER, OutputType.DISCORD.MESSAGE, OutputType.DISCORD.SERVER].flat(),
                    arguments: {
                       PROPERTIES: {
                             type: InputShape.MENU,
                             options: [
                                ['button id', 'interaction.id'],
                                ['button member', 'interaction.member'],
                                ['button user', 'interaction.user'],
                                ['button message', 'interaction.message'],
                                ['button channel', 'interaction.channel'],
                                ['button server', 'interaction.guild']
                             ]
                       }
                    }
                },
                {
                    func: "ReplyToButtonClick",
                    text: "button reply: \n Ephemeral [EPHEMERAL]",
                    color: "#4C97FF",
                    shape: BlockShape.STATEMENT,
                    arguments: {
                        EPHEMERAL: {
                            type: InputShape.VALUE,
                            check: OutputType.BOOLEAN
                        }
                    },
                    mutator: "ReplyCreation",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "button/menu row",
							type: OutputType.ANY,
							defaultValue: false
						},
                        {
                            text: "Content",
                            type: OutputType.STRING,
                            defaultValue: true
                        },
                        {
                            text: "Embed",
                            type: OutputType.ANY,
                            defaultValue: false
                        }
					]
				}

                },
                {
                    func: "EditButton",
                    text: "edit button message with:",
                    color: "#4C97FF",
                    shape: BlockShape.STATEMENT,
                    mutator: "ReplyCreation",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "button/menu row",
							type: OutputType.ANY,
							defaultValue: false
						},
                        {
                            text: "Content",
                            type: OutputType.STRING,
                            defaultValue: true
                        },
                        {
                            text: "Embed",
                            type: OutputType.ANY,
                            defaultValue: false
                        }
					]
				}

                },
                {
                    func: "DeleteButtonResponse",
                    text: "delete response",
                    color: "#4C97FF",
                    shape: BlockShape.STATEMENT
                },
                {
                    func: "SendButtonInChannel",
                    text: "send button row [ROW] in channel [CHANNEL]",
                    color: "#4C97FF",
                    shape: BlockShape.STATEMENT,
                    arguments: {
                        ROW: {
                            type: InputShape.VALUE,
                            check: OutputType.ANY
                        },
                        CHANNEL: {
                            type: InputShape.VALUE,
                            check: OutputType.DISCORD.CHANNEL
                        }
                    },
                    mutator: "ContentType",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
                        {
                            text: "Content",
                            type: OutputType.STRING,
                            defaultValue: false
                        },
                        {
                            text: "Embed",
                            type: OutputType.ANY,
                            defaultValue: false
                        }
					]
				}
                },
                {
                    func: "SetButtonStyle",
                    text: "button style [TYPE]",
                    output: OutputType.STRING,
                    arguments: {
                        TYPE: {
                            type: InputShape.MENU,
                            options: [
                                ['blurple', 'PRIMARY'],
                                ['red', 'DANGER'],
                                ['green', 'SUCCESS'],
                                ['grey', 'SECONDARY'],
                                ['link', 'LINK']

                            ]
                        }
                    }
                },
                {
                    func: "CreateButtonRow",
                    text: "create button row \n",
                    output: OutputType.ANY,
                    branches: 1,
                    inline: false
                },
                {
                    func: "CreateButton",
                    text: "create button: \n style: [STYLE]",
                    shape: BlockShape.STATEMENT,
                    color: "#40BF4A",
                    inline: false,
                    arguments: {
                        STYLE: {
                            type: InputShape.VALUE,
                            check: OutputType.ANY
                        }
                    },
                    mutator: "ButtonSetup",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
                        {
                            text: "label",
                            type: OutputType.STRING,
                            defaultValue: true
                        },
                        {
                            text: "emoji",
                            type: OutputType.STRING,
                            defaultValue: false
                        },
                        {
                            text: "disabled?",
                            type: OutputType.BOOLEAN,
                            defaultValue: true
                        },
                        {
                            text: "id",
                            type: OutputType.STRING,
                            defaultValue: true
                        },
                        {
                            text: "url",
                            type: OutputType.STRING,
                            defaultValue: false
                        }
					]
				}
                }
            ]
		};
	}
}
export default Buttons;
