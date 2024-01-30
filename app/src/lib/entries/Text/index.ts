export default [
	{
		kind: "block",
		type: "text"
	},
	{
		kind: "block",
		type: "text_join"
	},
	{
		kind: "block",
		type: "text_replace",
		inputs: {
			TEXT: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "Hello World!"
					}
				}
			},
			FROM: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "World"
					}
				}
			},
			TO: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "Goodbye"
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "text_isEmpty"
	},
	{
		kind: "block",
		type: "text_reverse"
	},
	{
		kind: "block",
		type: "text_newline"
	},
	{
		kind: "block",
		type: "text_append"
	},
	{
		kind: "block",
		type: "text_length",
		inputs: {
			VALUE: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "abc"
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "text_startsEndsWith"
	},
	{
		kind: "block",
		type: "text_indexOf",
		inputs: {
			VALUE: {
				block: {
					kind: "block",
					type: "variables_get_variable",
					fields: {
						NAME: "text"
					}
				}
			},
			FIND: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "World"
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "text_charAt",
		inputs: {
			VALUE: {
				block: {
					kind: "block",
					type: "variables_get_variable",
					fields: {
						NAME: "text"
					}
				}
			},
			AT: {
				shadow: {
					type: "math_number",
					fields: {
						NUM: 1
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "text_getSubstring",
		inputs: {
			STRING: {
				block: {
					kind: "block",
					type: "variables_get_variable",
					fields: {
						NAME: "text"
					}
				}
			},
			AT1: {
				shadow: {
					type: "math_number",
					fields: {
						NUM: 1
					}
				}
			},
			AT2: {
				shadow: {
					type: "math_number",
					fields: {
						NUM: 5
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "text_changeCase",
		inputs: {
			TEXT: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "Hello World!"
					}
				}
			}
		}
	},
	//trim spaces
	{
		kind: "block",
		type: "text_trim",
		inputs: {
			TEXT: {
				shadow: {
					type: "text",
					fields: {
						TEXT: " abc "
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "text_count",
		inputs: {
			TEXT: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "Hello World!"
					}
				}
			},
			SUB: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "o"
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "text_containsNumber"
	},
	//for each character in a string
	{
		kind: "block",
		type: "text_forEach",
		inputs: {
			TEXT: {
				shadow: {
					type: "text",
					fields: {
						TEXT: "Hello World!"
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "text_character"
	}
];
