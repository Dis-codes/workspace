import javascriptGenerator from '$lib/javascript';
import { BlockShape, InputShape, OutputType } from "$lib/utils/blockRegistryTool";
import {MutatorType} from "$lib/interfaces/mutator";
import { Input } from 'postcss';
import { Block } from 'blockly';

class ContextMenus {
	getRegistry() {
		return {
			id: "cm",
			name: "Context Menus",
			color: "#60cc6c",
			weight: 7,
			blocks: [
                {
                    func: "createcontextmenu",
                    text: "Register Context Menu: \n",
                    branches: 1,
                    shape: BlockShape.EVENT,
                    inline: true,
                    mutator: "server",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
					  {
						text: "Server",
						type: OutputType.DISCORD.SERVER,
						defaultValue: false,
					  }
					]
				  }


                },
                {
                    func: "adjustcontext",
                    text: "name [NAME] \n type [TYPE]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        TYPE: {
                            type: InputShape.MENU,
                            options: [
                                ['message', 'message'],
							    ['user', 'user']
                            ]
                        }

                    }
                },
                {
                    func: "contextmenureceive",
                    text: "When a context menu is received \n",
                    shape: BlockShape.EVENT,
                    inline: false,
                    color: "#ffab19",
                    branches: 1
                },
                {
                    func: "getcontextprops",
                    text: "[RETURN]",
                    output: [OutputType.STRING, OutputType.DISCORD.CHANNEL, OutputType.DISCORD.MEMBER, OutputType.DISCORD.SERVER].flat(),
                    arguments: {
                        RETURN: {
                            type: InputShape.MENU,
                            options: [
                                [ 'context name', 'context name'],
                ['context member', 'context member'],
                ['context channel',  'context channel'],
                [ 'context server',  'context server'] 
            ]
                    }
                        }
                    },
                {
                    func: "getoptions",
                    text: "get [MENU] option",
                    output: [OutputType.STRING, OutputType.DISCORD.MEMBER, OutputType.DISCORD.MESSAGE].flat(),
                    color: "#4C97FF",
                    arguments: {
                        MENU: {
                            type: InputShape.MENU,
                            options: [
                                ['message', 'targetMessage'],
                                ['member', 'member'],
                                ['user', 'user']
                            ]
                        }
                    }
                },
                {
                    func: "reply",
                    text: "Reply to context menu [MESSAGE] ephemeral [EPHEMERAL]",
                    shape: BlockShape.STATEMENT,
                    inline: false,
                    color: "#4C97FF",
                    arguments: {
                        MESSAGE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        EPHEMERAL: {
                            type: InputShape.VALUE,
                            check: OutputType.BOOLEAN
                        }
                    },
                    mutator: "row",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "button/menu row",
							type: OutputType.ANY,
							defaultValue: false
						}
					]
				}
                },
                {
                    func: "replyedit",
                    text: "Edit context menu reply [MESSAGE]",
                    shape: BlockShape.STATEMENT,
                    inline: false,
                    color: "#4C97FF",
                    arguments: {
                        MESSAGE: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        }
                    },
                    mutator: "row",
				    mutatorData: {
					type: MutatorType.CheckBox,
					inputs: [
						{
							text: "button/menu row",
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
export default ContextMenus;
