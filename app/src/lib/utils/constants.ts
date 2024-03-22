//? All members of this file have to be exported!

export const OutputType = {
	STRING: ["String", "Text"],
	NUMBER: ["Number"],
	BOOLEAN: ["Boolean", "Bool"],
	ARRAY: ["List", "Array"],
	OBJECT: ["Object", "JSON"],
	ANY: null, //any block
	DISCORD: {
		SERVER: ["Server"],
		CHANNEL: ["Channel"],
		MESSAGE: ["Message"],
		MEMBER: ["Member", "User"],
		ROLE: ["Role"],
		AUDIT_LOG: ["Audit"]
	}
};

/**
 * List of constants for different block shapes.
 */
export const BlockShape = {
	STATEMENT: "statement", //Block shape for a statement block. Not actually required, but keeps code consistent.
	EVENT: "event", //Block shape for a floating block with an input inside.Can be replaced with FLOATING, but keeps code consistent.
	TERMINAL: "terminal", //Block shape for a block with no blocks allowed to attach after.
	FLOATING: "floating", //Block shape for a block that cannot have any parent blocks.
	TOPPER: "topper", //Block shape for a block that cannot have any blocks attached before it.
	CUSTOM: "custom" //Custom block shape, can be used if "manual" is used for the block.
};

/**
 * List of constants for different input shapes / fields.
 */
export const InputShape = {
	VALUE: "input_value", //Input shape for inputs that allow output blocks.
	DUMMY: "input_dummy", //Can be used for seperating content on a block by a new line.
	SPACE: "input_space", //Similar to DUMMY.Can be used for seperating content on a block.
	IMAGE: "field_image", //Not actually an input, but an image.
	ANGLE: "field_angle", //Angle field for directional inputs.
	CHECKBOX: "field_checkbox", //Checkbox field usually for toggles.
	COLOR: "field_colour", //Color field.
	MENU: "field_dropdown", //Dropdown menu field with options.
	SERIALIZABLE_LABEL: "field_label_serializable", //Label that serializes to the project.
	NUMBER: "field_number", //Number field. Used for restricting to certain numbers.
	TEXT: "field_input", //Text field. Used if blocks shouldnt be used here,but text can still be input here.
	MULTILINE_TEXT: "field_multilinetext", //Multi-line text field.Similar to TEXT, but new line characters are allowed.
	VARIABLE: "field_variable", //Variable field. Similar to MENU, but the options are all variables.
	DISCORD: {
		SERVER: "field_server",
		CHANNEL: "field_channel",
		MESSAGE: "field_message"
	}
};

/**
 * Used to make a blockly menu input with all discord's permission flags.
 */
export const Permissions = [
	["Create Invites", "1n"],
	["Kick Members", "2n"],
	["Ban Members", "4n"],
	["Administrator", "8n"],
	["Manage Channels", "16n"],
	["Manage Guild", "32n"],
	["Add Reactions", "64n"],
	["View Audit Log", "128n"],
	["Priority Speaker", "256n"],
	["Stream", "512n"],
	["View Channel", "1024n"],
	["Send Messages", "2048n"],
	["Send TTS Messages", "4096n"],
	["Manage Messages", "8192n"],
	["Embed Links", "16384n"],
	["Attach Files", "32768n"],
	["Read Message History", "65536n"],
	["Mention Everyone", "131072n"],
	["Use External Emojis", "262144n"],
	["View Guild Insights", "524288n"],
	["Connect", "1048576n"],
	["Speak", "2097152n"],
	["Mute Members", "4194304n"],
	["Deafen Members", "8388608n"],
	["Move Members", "16777216n"],
	["Use VAD", "33554432n"],
	["Change Nickname", "67108864n"],
	["Manage Nicknames", "134217728n"],
	["Manage Roles", "268435456n"],
	["Manage Webhooks", "536870912n"],
	["Manage Emojis And Stickers", "1073741824n"],
	["Manage Guild Expressions", "1073741824n"],
	["Use Application Commands", "2147483648n"],
	["Request To Speak", "4294967296n"],
	["Manage Events", "8589934592n"],
	["Manage Threads", "17179869184n"],
	["Create Public Threads", "34359738368n"],
	["Create Private Threads", "68719476736n"],
	["Use External Stickers", "137438953472n"],
	["Send Messages In Threads", "274877906944n"],
	["Use Embedded Activities", "549755813888n"],
	["Timeout Members", "1099511627776n"],
	["View Creator Monetization Analytics", "2199023255552n"],
	["Use Soundboard", "4398046511104n"],
	["Use External Sounds", "35184372088832n"],
	["Send Voice Messages", "70368744177664n"]
];

export const MutatorType = {
	CheckBox: "checkbox",
	BlockList: "blocklist" // later adding after its done
};
