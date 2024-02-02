export default [
	{
		kind: "label",
		text: "Role info"
	},
	{
		kind: "block",
		type: "role_get",
		inputs: {
			ID: {
				shadow: {
					kind: "block",
					type: "text",
					fields: {
						TEXT: "0"
					}
				}
			}
		}
	},
  {
		kind: "block",
		type: "role_get_all"
	}
	/*
	{
		kind: "block",
		type: "server_edit",
		inputs: {
			BRANCH1: {
				block: {
					kind: "block",
					type: "server_edit_options",
					inputs: {
						SETTING: {
							shadow: {
								kind: "block",
								type: "text",
								fields: {
									TEXT: "Awesome server"
								}
							}
						}
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "server_edit_options_util"
	},
	{
		kind: "block",
		type: "server_leave"
	}*/
];
