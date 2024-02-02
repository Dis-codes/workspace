export default [
	{
		kind: "label",
		text: "Terminal"
	},
	{
		kind: "block",
		type: "terminal_log"
	},
	{
		kind: "block",
		type: "terminal_clear_console"
	},
	{
		kind: "label",
		text: "Other"
	},
	{
		kind: "block",
		type: "terminal_error"
	},
	{
		kind: "block",
		type: "terminal_try_catch",
		inputs: {
			BRANCH2: {
				block: {
					kind: "block",
					type: "terminal_log",
					inputs: {
						TEXT: {
							block: {
								kind: "block",
								type: "terminal_error"
							}
						}
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "terminal_throw"
	},
	{
		kind: "block",
		type: "terminal_force"
	}
];
