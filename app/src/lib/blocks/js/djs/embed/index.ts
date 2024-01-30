import { BlockShape, InputShape, OutputType } from '$lib/utils/blockRegistryTool';

class MessageBlocks {
	getRegistry() {
		return {
			id: 'embed',
			color: '#40bc54',
			blocks: [
				{
					func: 'create',
					text: 'create an embed with name [NAME]\n',
					branches: 1,
					shape: BlockShape.STATEMENT,
					arguments: {
						NAME: {
							type: InputShape.TEXT,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'setTitle',
					text: 'set embed title to [TITLE] with url [URL]',
					shape: BlockShape.STATEMENT,
					arguments: {
						TITLE: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						URL: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'setColor',
					text: 'set embed color to [COLOR]',
					shape: BlockShape.STATEMENT,
					arguments: {
						COLOR: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'setAuthor',
					text: 'set embed author to [AUTHOR] with url [URL] and icon [ICON]',
					shape: BlockShape.STATEMENT,
					arguments: {
						AUTHOR: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						URL: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						ICON: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'setThumbnail',
					text: 'set embed thumbnail to [THUMBNAIL]',
					shape: BlockShape.STATEMENT,
					arguments: {
						THUMBNAIL: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'setImage',
					text: 'set embed image to [IMAGE]',
					shape: BlockShape.STATEMENT,
					arguments: {
						IMAGE: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'setDescription',
					text: 'set embed description to [DESCRIPTION]',
					shape: BlockShape.STATEMENT,
					arguments: {
						DESCRIPTION: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'addField',
					text: 'add embed field with name [NAME] and value [VALUE] and inline [INLINE]',
					shape: BlockShape.STATEMENT,
					arguments: {
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						VALUE: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						INLINE: {
							type: InputShape.VALUE,
							check: OutputType.BOOLEAN
						}
					}
				},
				{
					func: 'setFooter',
					text: 'set embed footer to [FOOTER] with icon [ICON]',
					shape: BlockShape.STATEMENT,
					arguments: {
						FOOTER: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						ICON: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: 'setTimestamp',
					text: 'set embed timestamp',
					shape: BlockShape.STATEMENT,
					arguments: {
						TIMESTAMP: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				}
			]
		};
	}
	create(args: any) {
		return `const ${args.NAME ?? 'embed'} = new EmbedBuilder()`;
	}

	setTitle(args: any) {
		return `.setTitle(${args.TITLE})${args.URL ? '\nurl: ' + args.URL + ')' : ''}`;
	}

	setColor(args: any) {
		return `.setColor(${args.COLOR})`;
	}

	setAuthor(args: any) {
		return `.setAuthor({name: ${args.AUTHOR}${args.URL ? ', url: ' + args.URL : ''}${
			args.ICON ? ', icon: ' + args.ICON : ''
		}})`;
	}

	setThumbnail(args: any) {
		return `.setThumbnail(${args.THUMBNAIL})`;
	}

	setImage(args: any) {
		return `.setImage(${args.IMAGE})`;
	}

	setDescription(args: any) {
		return `.setDescription(${args.DESCRIPTION})`;
	}

	addField(args: any) {
		return `.addFields({name: ${args.NAME}, value: ${args.VALUE}, inline: ${args.INLINE}})`;
	}

	setFooter(args: any) {
		return `.setFooter({text: ${args.FOOTER}${args.ICON ? ', icon: ' + args.ICON : ''}})`;
	}

	setTimestamp(args: any) {
		return `.setTimestamp()`;
	}
}

export default MessageBlocks;
