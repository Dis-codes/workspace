const test = {
	blocks: {
		languageVersion: 0,
		blocks: [
			{
				type: 'controls_if',
				id: '%[#bb}MM=4[q$GSiuwC5',
				x: 237,
				y: 163,
				inputs: {
					IF0: {
						block: {
							type: 'logic_isOneOfType',
							id: '6P.B{~l@|2mo{HPs7dz~',
							fields: { TYPES: 'number' },
							inputs: {
								A: {
									block: {
										type: 'math_convert_to_number',
										id: '.x_HcEX`5Hp-S,TEmAVB',
										inputs: {
											A: {
												shadow: { type: 'text', id: '@/B7`tiXOx,}XhM/W}sh', fields: { TEXT: '1' } }
											}
										}
									}
								}
							}
						}
					}
				}
			}
		]
	}
};

export { test };
