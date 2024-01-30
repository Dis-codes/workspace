export default [
	{
		kind: 'block',
		type: 'colour_picker'
	},
	{
		kind: 'block',
		type: 'colour_random'
	},
	{
		kind: 'block',
		type: 'colour_hex',
		inputs: {
			HEX: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'ff0000'
					}
				}
			}
		}
	},
	{
		kind: 'block',
		type: 'colour_RGB',
		inputs: {
			R: {
				shadow: {
					kind: 'block',
					type: 'math_number',
					fields: {
						NUM: 100
					}
				}
			},
			G: {
				shadow: {
					kind: 'block',
					type: 'math_number',
					fields: {
						NUM: 50
					}
				}
			},
			B: {
				shadow: {
					kind: 'block',
					type: 'math_number',
					fields: {
						NUM: 0
					}
				}
			}
		}
	},
	{
		kind: 'block',
		type: 'colour_blend',
		inputs: {
			COLOUR1: {
				shadow: {
					kind: 'block',
					type: 'colour_picker'
				}
			},
			COLOUR2: {
				shadow: {
					kind: 'block',
					type: 'colour_picker',
					fields: {
						COLOUR: '#333333'
					}
				}
			},
			RATIO: {
				shadow: {
					kind: 'block',
					type: 'math_number',
					fields: {
						NUM: 0.5
					}
				}
			}
		}
	}
];
