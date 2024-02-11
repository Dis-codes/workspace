import { OutputType, BlockShape, InputShape } from '$lib/utils/blockRegistryTool';

class Webhook {
    getRegistry () {
        return {
            id: "webhook",
            color: "#0456af",
            blocks: [
                {
                    func: "create",
                    text: "[FUNCTION] Webhook for Channel [CHANNEL]\n With Name: [NAME]\nAvatar Url: [AVATAR]\nReason: [REASON]\n",
                    branches: 1,
                    color: "#046ad7",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        CHANNEL: {
                            type: InputShape.DISCORD.CHANNEL
                        },
                        NAME: {
                            type: InputShape.TEXT
                        },
                        AVATAR: {
                            type: InputShape.TEXT
                        },
                        REASON: {
                            type: InputShape.TEXT
                        },
                        FUNCTION: {
                            type: InputShape.MENU,
                            options: [
                                ["create", "create"],
                                ["edit", "edit"]
                            ]
                        }
                    }
                },
                {
                    func: "delete",
                    text: "Delete Webhook with ID: [WEBHOOK_NID]\n",
                    color: "#034d9b",
                    shape: BlockShape.STATEMENT,
                    inline: true
                },
                // {
                //     func: "send_msg",
                //     text: "Send Message with Webhook with ID Name: [WEBHOOK_NID4]\nMessage Content: [CONTENT] and/or Embed: [EMBED]\nName: [NAME]\nAvatar: [AVATAR]\n",
                //     tooltip: 'Avatar has to be URL of an image',
                //     color: "#034d9b",
                //     shape: BlockShape.STATEMENT,
                //     inline: true,
                //     arguments: {
                //         WEBHOOK_NID4: {
                //             type: InputShape.TEXT
                //         },
                //         CONTENT: {
                //             type: InputShape.TEXT
                //         },
                //         EMBED: {
                //             type: InputShape.VALUE
                //         },
                //         NAME: {
                //             type: InputShape.TEXT
                //         },
                //         AVATAR: {
                //             type: InputShape.TEXT
                //         }
                //     }
                // },
                {
                    func: "get_token",
                    text: "Get Webhook with ID: [ID] and Token: [TOKEN]\n",
                    tooltip: 'You can find the id and token in the url, https://discord.com/api/webhook/WEBHOOK-ID/WEBHOOK-TOKEN',
                    branches: 1,
                    color: "#034d9b",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        ID: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        TOKEN: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                    }
                },
                {
                    func: "get_url",
                    text: "Get Webhook by URL: [URL]\n",
                    tooltip: 'Channel Settings -> Integrations -> Your webhook -> Copy Webhook URL',
                    branches: 1,
                    color: "#046ad7",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        URL: {
                            type: InputShape.TEXT
                        },
                    }
                },
                {
                    func: "get_guildchannel",
                    text: "Get Webhooks from Guild: [GUILD] and Channel: [CHANNEL] then:\n",
                    branches: 1,
                    color: "#5c8aeb",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        CHANNEL: {
                            type: InputShape.VALUE,
                            check: OutputType.DISCORD.CHANNEL
                        },
                        GUILD: {
                            type: InputShape.VALUE,
                            check: OutputType.DISCORD.SERVER
                        }
                    }
                },

            ]
        };
    }

    create(args: any) {
        switch (args.FUNCTION){
            case "create":
                return `await ${args.CHANNEL}.createWebhook({
            name: '${args.NAME}',
            avatar: '${args.AVATAR}',
            reason: '${args.REASON}'
        }).catch(err => { return: 'There was an error while creating the webhook: ' + err});`;
            case "edit":
                return `${args.WEBHOOK_NID}.edit({
                    name: "${args.NAME}",
                    avatar: "${args.AVATAR}",
                    channel: "${args.CHANNEL}"
                }).catch(err => { return: 'There was an error editing the webhook: ' + err});`
        }
    }
    delete(args: any) {
        return `${args.WEBHOOK_NID}.delete().catch(err => { return: 'There was an error deleting the webhook: ' + err})`;
    }

//     send_msg(args: any) {
//         return `${args.WEBHOOK_NID4}.send({
//     content: '${args.CONTENT}',
//     username: '${args.NAME}',
//     avatarURL: '${args.AVATAR}',
//     embeds: [${args.EMBED}]
// }).catch(err => { return: 'There was an error sending a message: ' + err});`;
//     }

    get_token(args: any) {
        return `new WebhookClient({ id: '${args.ID}', token: '${args.TOKEN}' });`;
    }

    get_url(args: any) {
        return `new WebhookClient({ url: '${args.URL}' });`;
    }

};

export default Webhook;
