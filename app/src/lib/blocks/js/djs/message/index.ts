import { BlockShape, InputShape, OutputType } from '$lib/utils/blockRegistryTool';

class MessageBlocks {
	getRegistry() {
		return {
			id: 'message',
			color: '#4b9afb',
			blocks: [
				{
					func: 'react',
					text: 'react to message [MESSAGE] with [REACTION]',
					shape: BlockShape.STATEMENT,
					arguments: {
						MESSAGE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MESSAGE
						},
						REACTION: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'remove_reaction',
					text: 'remove reaction [REACTION] from message [MESSAGE]',
					tooltip: 'Leave reaction blank to remove all reactions',
					shape: BlockShape.STATEMENT,
					arguments: {
						REACTION: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						MESSAGE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MESSAGE
						}
					}
				},
				{
					func: 'received',
					text: 'Message is received\n',
					color: '#f8ac34',
					shape: BlockShape.EVENT,
					branches: 1
				},
				{
					func: 'message',
					text: 'Message',
					color: '#a85c7c',
					output: OutputType.DISCORD.MESSAGE
				},
				{
					func: 'info',
					text: 'Message info [INFO]',
					output: OutputType.ANY,
					arguments: {
						INFO: {
							type: InputShape.MENU,
							options: [
								['content', 'content'],
								['channel', 'channel'],
								['channel category', 'channel_category'],
								['server', 'guild'],
								['message id', 'id'],
								['message timestamp', 'timestamp'],
								['author', 'author'],
								['mentioned users', 'mentions_users'],
								['mentioned roles', 'mentions_roles'],
								['mentioned channels', 'mentions_channels'],
								['replied user', 'replied_user'],
								['attachments', 'attachments']
							]
						}
					}
				},
				{
					func: 'delete',
					text: 'Delete message [MESSAGE]',
					shape: BlockShape.STATEMENT,
					arguments: {
						MESSAGE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MESSAGE
						}
					}
				},
				{
					func: 'get',
					text: 'Get message with ID [MESSAGE] from channel [CHANNEL]',
					output: OutputType.DISCORD.MESSAGE,
					arguments: {
						MESSAGE: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						CHANNEL: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.CHANNEL
						}
					}
				},
				{
					func: 'crosspost',
					text: 'Crosspost message [MESSAGE]',
					shape: BlockShape.STATEMENT,
					arguments: {
						MESSAGE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MESSAGE
						}
					}
				},
				{
					func: 'pin',
					text: '[OPTION] message [MESSAGE]',
					shape: BlockShape.STATEMENT,
					arguments: {
						OPTION: {
							type: InputShape.MENU,
							options: [
								['pin', 'pin'],
								['unpin', 'unpin']
							]
						},
						MESSAGE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MESSAGE
						}
					}
				},
				{
					func: 'details',
					text: 'Message details [DETAIL]',
					output: OutputType.ANY,
					arguments: {
						DETAIL: {
							type: InputShape.MENU,
							options: [
								['mentions everyone', 'mentions_everyone'],
								['mentions user', 'mentions_user'],
								['mentions role', 'mentions_role'],
								['mentions channel', 'mentions_channel'],
								['system message', 'system'],
								['pinned', 'pinned'],
								['tts', 'tts'],
								['edited', 'edited'],
								['is webhook', 'webhook'],
								['is reply', 'is_reply'],
								['has embeds', 'has_embeds'],
								['has attachments', 'has_attachments'],
								['has buttons', 'has_buttons'],
								['has sticker', 'has_sticker'],
								['has thread', 'has_thread'],
								['can be deleted by bot', 'deletable_by_bot'],
								['can be crossposted', 'crosspostable'],
								['can be edited by bot', 'editable_by_bot'],
								['can be pinned', 'pinnable']
							]
						}
					}
				},
				{
					func: 'embed_on_message',
					text: 'Embed on message [MESSAGE] info [INFO]',
					output: OutputType.ANY,
					arguments: {
						MESSAGE: {
							type: InputShape.VALUE,
							check: OutputType.DISCORD.MESSAGE
						},
						INFO: {
							type: InputShape.MENU,
							options: [
								['title', 'title'],
								['description', 'description'],
								['color', 'color'],
								['author', 'author'],
								['thumbnail', 'thumbnail'],
								['footer', 'footer'],
								['image', 'image'],
								['timestamp', 'timestamp'],
								['url', 'url']
							]
						}
					}
				}
			]
		};
	}

	message(args: any) {
		return `await ${args.MESSAGE ?? 'message'}.react(${args.REACTION})`;
	}

	remove_reaction(args: any) {
		if (!args.REACTION) {
			return `await ${args.MESSAGE ?? 'message'}.reactions.removeAll()`;
		}
		return `await ${args.MESSAGE ?? 'message'}.reactions.cache.get(${args.REACTION}).remove()`;
	}

	received(args: any) {
		return `client.on("message", async (message) => {
            ${args.BRANCH1}
        });`;
	}

	info(args: any) {
		return `${args.MESSAGE ?? 'message'}.${args.INFO}`;
	}

	delete(args: any) {
		return `${args.MESSAGE ?? 'message'}.delete()`;
	}

	get(args: any) {
		return `await ${args.CHANNEL ?? 'channel'}.messages.fetch(${args.MESSAGE ?? 'message'})`;
	}

	crosspost(args: any) {
		return `${args.MESSAGE ?? 'message'}.crosspost()`;
	}

	pin(args: any) {
		return `${args.MESSAGE ?? 'message'}.${args.OPTION}()`;
	}

	details(args: any) {
		return `${args.MESSAGE ?? 'message'}.${args.DETAIL}`;
	}

	embed_on_message(args: any) {
		return `${args.MESSAGE ?? 'message'}.embeds[0].${args.INFO}`;
	}

	react(args: any) {
		return `await ${args.MESSAGE ?? 'message'}.react(${args.REACTION})`;
	}
}

export default MessageBlocks;
