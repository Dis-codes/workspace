import {
    OutputType,
    BlockShape,
    InputShape,
} from "$lib/utils/blockRegistryTool";

class ServerBlocks {
    getRegistry() {
        return {
            id: "server",
            color: "#e05c4c",
            blocks: [
                /*{
                            func: "event", // function name (also used as the block's ID)
                            text: "text [INPUT]", // block text (brackets denote an input)
                            output: OutputType.STRING,
                            //shape: BlockShape.STATEMENT,
                            //branches: 1,
                            
                            // overwrites the base registry color for this block (not required)
                            //color: "#ff0000",
                            
                            inline: false,
                            tooltip: 'bla bla',
                            url: '',
                            arguments: {
                                INPUT: {
                                    type: InputShape.TEXT,
                                    text: "field",
                                    spellcheck: true
                                }
                            }
                        },*/
                {
                    func: "event",
                    text: "When server [EVENT] \n",
                    branches: 1,
                    color: "#ffab19",
                    //output: OutputType.OBJECT,
                    inline: true,
                    arguments: {
                        EVENT: {
                            type: InputShape.MENU,
                            options: [
                                ["is edited", "guildUpdate"],
                                ["has outage", "guildUnavailable"],
                                ["outage ended", "guildAvailable"],
                                ["bot is added to server", "guildCreate"],
                                ["bot is removed", "guildDelete"],
                            ],
                        },
                    },
                },
                {
                    func: "event_data",
                    text: "[SERVER]",
                    output: OutputType.DISCORD.SERVER,
                    inline: true,
                    arguments: {
                        SERVER: {
                            type: InputShape.MENU,
                            options: [
                                ["Edited server - old", "oldGuild"],
                                ["Edited server - new", "newGuild"],
                                ["Outage server", "guild"],
                                ["Ended outage server", "guild"],
                                ["Bot added server", "guild"],
                                ["Bot removed server", "guild"],
                            ],
                        },
                    },
                },
                {
                    func: "data",
                    text: "On server [SERVER] get [DATA]",
                    //color: "#ffab19",
                    output: OutputType.OBJECT,
                    inline: true,
                    arguments: {
                        SERVER: {
                            type: InputShape.VALUE,
                            check: OutputType.DISCORD.SERVER,
                        },
                        DATA: {
                            type: InputShape.MENU,
                            options: [
                                ["AFK channel", "afkChannel"],
                                ["AFK channel ID", "afkChannelId"],
                                ["AFK timeout", "afkTimeout"],
                                ["Available", "available"],
                                ["Banner URL", "bannerURL({ dynamic: true })"],
                                ["Creation date", "createdAt"],
                                ["Created timestamp", "createdTimestamp"],
                                ["Default message notification", "defaultMessageNotifications"],
                                ["Description", "description"],
                                ["Discovery splash URL","discoverySplashURL({ dynamic: true })"],
                                ["Explicit content filter", "explicitContentFilter"],
                                ["Icon URL", "iconURL({ dynamic: true })"],
                                ["ID", "id"],
                                ["Maximum bitrate", "maximumBitrate"],
                                ["Maximum members", "maximumMembers"],
                                ["Maximum presences", "maximumPresences"],
                                ["Number of members", "memberCount"],
                                ["Number of bots","members.cache.filter(m => m.user.bot).size"],
                                ["Number of humans","members.cache.filter(m => !m.user.bot).size"],
                                ["Number of channels", "channels.cache.size"],
                                ["Number of roles", "roles.cache.size"],
                                ["Number of voice channels","channels.cache.filter(m => m.type === Discord.ChannelType.GuildVoice).size"],
                                ["Number of text channels","channels.cache.filter(m => m.type === Discord.ChannelType.GuildText).size"],
                                ["MFA level", "mfaLevel"],
                                ["Name", "name"],
                                ["Name acronym", "nameAcronym"],
                                ["NSFW level", "nsfwLevel"],
                                ["Owner ID", "ownerId"],
                                ["Partnered", "partnered"],
                                ["Preferred locale", "preferredLocale"],
                                ["Boost progress bar enabled", "premiumProgressBarEnabled"],
                                ["Boost count", "premiumSubscriptionCount"],
                                ["Boost level", "premiumTier"],
                                ["Rules channel", "rulesChannel"],
                                ["Rules channel ID", "rulesChannelId"],
                                ["Automod channel", "safetyAlertsChannel"],
                                ["Automod channel ID", "safetyAlertsChannelID"],
                                ["Splash URL", "splashURL({ dynamic: true })"],
                                ["System channel", "systemChannel"],
                                ["System channel ID", "systemChannelID"],
                                ["Vanity invite code", "vanityURLCode"],
                                ["Verification Level", "verificationLevel"],
                                ["Verified status", "verified"],
                            ],
                        },
                    },
                },
                {
                    func: "get",
                    text: "Get server with ID [INPUT]",
                    output: OutputType.DISCORD.SERVER,
                    inline: true,
                    arguments: {
                        INPUT: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING,
                        },
                    },
                },
                {
                    func: "leave",
                    text: "Leave server [INPUT]",
                    color: "#4c97ff",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        INPUT: {
                            type: InputShape.VALUE,
                            check: OutputType.DISCORD.SERVER,
                        },
                    },
                },
                {
                    func: "edit",
                    text: "Edit server [INPUT]",
                    color: "#e07e6c",
                    branches: 1,
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        INPUT: {
                            type: InputShape.VALUE,
                            check: OutputType.DISCORD.SERVER,
                        },
                    },
                },
                {
                    func: "edit_options",
                    text: "Set [OPTION] to [SETTING]",
                    color: "#e07e6c",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        OPTION: {
                            type: InputShape.MENU,
                            options: [
                                ["Name", "name"],
                                ["Verification level", "verificationLevel"],
                                ["Default notification", "defaultMessageNotifications"],
                                ["Filter content of members", "explicitContentFilter"],
                                ["Afk channel", "afkChannel"],
                                ["Afk timeout", "afkTimeout"],
                                ["Icon", "icon"],
                                ["Invite splash image", "splash"],
                                ["Discovery splash image", "discoverySplash"],
                                ["Banner image", "banner"],
                                ["System channel", "systemChannel"],
                                ["Rules channel", "rulesChannel"],
                                ["Server description", "description"],
                                ["Boost progress bar enabled", "premiumProgressBarEnabled"],
                                ["Edit reason", "reason"],
                            ],
                        },
                        SETTING: {
                            type: InputShape.VALUE,
                            check: [
                                ...OutputType.STRING,
                                ...OutputType.DISCORD.CHANNEL,
                                ...OutputType.NUMBER,
                                ...OutputType.BOOLEAN,
                                "ServerEdit",
                            ],
                        },
                    },
                },
                {
                    func: "edit_options_util",
                    text: "[OPTION]",
                    color: "#e09082",
                    output: ["ServerEdit"],
                    inline: true,
                    arguments: {
                        OPTION: {
                            type: InputShape.MENU,
                            options: [
                                ["Verification - None", "Discord.GuildVerificationLevel.None"],
                                ["Verification - Low", "Discord.GuildVerificationLevel.Low"],
                                ["Verification - Medium","Discord.GuildVerificationLevel.Medium"],
                                ["Verification - High", "Discord.GuildVerificationLevel.High"],
                                ["Verification - Very high","Discord.GuildVerificationLevel.VeryHigh"],
                                ["Notification - All messages","Discord.GuildDefaultMessageNotifications.AllMessages"],
                                ["Notification - Only mentions","Discord.GuildDefaultMessageNotifications.OnlyMentions"],
                                ["Filter content - None","Discord.GuildExplicitContentFilter.Disabled"],
                                ["Filter content - No roles","Discord.GuildExplicitContentFilter.MembersWithoutRoles"],
                                ["Filter contnet - All","Discord.GuildExplicitContentFilter.AllMembers"],
                            ],
                        },
                    },
                },
            ],
        };
    }
    event(args: any) {
        return `client.on('${args.EVENT}', async(${args.EVENT == "guildUpdate" ? "oldGuild, newGuild" : "guild"
            })=>{
    ${args.BRANCH1}
});\n`;
    }
    data(args: any) {
        return `${args.SERVER}.${args.DATA}`;
    }
    get(args: any) {
        return `client.guilds.cache.get(${args.INPUT})`;
    }
    event_data(args: any) {
        return args.SERVER;
    }
    leave(args: any) {
        return `${args.INPUT}.leave();`;
    }
    edit(args: any) {
        return `(async()=>{
    let temp_discodes_server_edit = {};
    ${args.BRANCH1}
    ${args.INPUT}.edit(temp_discodes_server_edit)
})();`;
    }
    edit_options(args: any) {
        return `temp_discodes_server_edit['${args.OPTION}'] = ${args.SETTING};`;
    }
    edit_options_util(args: any) {
        return args.OPTION;
    }
}

export default ServerBlocks;
