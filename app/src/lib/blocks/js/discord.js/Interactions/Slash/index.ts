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

                }
