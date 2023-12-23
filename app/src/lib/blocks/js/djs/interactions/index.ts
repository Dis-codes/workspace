import {
    OutputType,
    BlockShape,
    InputShape,
} from "$lib/utils/blockRegistryTool";

class InteractionBlocks{
    getRegistry() {
        return {
            id: "interaction",
            color: "#3844fc",
            blocks: [
                {
                    func: "event",
                    text: "When interaction is recieved\n",
                    color: "#ffab19",
                    branches: 1,
                    BlockShape: BlockShape.EVENT,
                },
                {
                    func: "base_conditionals",
                    text: "[CONDITIONALS]",
                    color: "#cc33ff",
                    BlockShape: BlockShape.FLOATING,
                    output: OutputType.BOOLEAN,
                    arguments: {
                        CONDITIONALS: {
                            type: InputShape.MENU,
                            options: [
                                ["Is in cached guild?", "inCachedGuild"],
                                ["Is in guild?", "inGuild"],
                                ["Is in raw guild?", "inRawGuild"],
                                ["Is any select menu?", "isAnySelectMenu"],
                                ["Is autocomplete?", "isAutocomplete"],
                                ["Is button?", "isButton"],
                                ["Is channel select menu?", "isChannelSelectMenu"],
                                ["Is chat input command?", "isChatInputCommand"],
                                ["Is command?", "isCommand"],
                                ["Is context menu command?", "isContextMenuCommand"],
                                ["Is mentionable select menu?", "isMentionableSelectMenu"],
                                ["Is message component?", "isMessageComponent"],
                                ["Is message context menu command?", "isMessageContextMenuCommand"],
                                ["Is modal submit?", "isModalSubmit"],
                                ["Is repliable?", "isRepliable"],
                                ["Is role select menu?", "isRoleSelectMenu"],
                                ["Is select menu?", "isSelectMenu"],
                                ["Is string select menu?", "isStringSelectMenu"],
                                ["Is user context menu command?", "isUserContextMenuCommand"],
                                ["Is user select menu?", "isUserSelectMenu"]
                            ]
                        },

                    },
                },
                {
                    func: "base_properties",
                    text: "[PROPERTIES]",
                    output: OutputType.ANY,
                    color: "#187494",
                    arguments: {
                        PROPERTIES: {
                            type: InputShape.MENU,
                            options: [
                                ["applicationId", "applicationId"],
                                ["appPermissions", "appPermissions"],
                                ["channel", "channel"],
                                ["channelId", "channelId"],
                                ["client", "client"],
                                ["createdAt", "createdAt"],
                                ["createdTimestamp", "createdTimestamp"],
                                ["guild", "guild"],
                                ["guildId", "guildId"],
                                ["guildLocale", "guildLocale"],
                                ["id", "id"],
                                ["locale", "locale"],
                                ["member", "member"],
                                ["memberPermissions", "memberPermissions"],
                                ["token", "token"],
                                ["type", "type"],
                                ["user", "user"],
                                ["version", "version"]
                            ]

                        },
                    },
                },
            ]
        };
    }

    // login to discord and if token invalid let them know



    event(args: any) {
        return `s4d.client.on(Discord.Events.InteractionCreate, async (interaction) => {${args.BRANCH1}})`
    }

    base_properties(args: any) {
        return `interaction.${args.PROPERTIES}`;
    }

    base_conditionals(args: any) {
        return `interaction.${args.CONDITIONALS}`
    }
}

export default InteractionBlocks;
