export default [
	{
		kind: "block",
		type: "math_number"
	},
	{
		kind: "block",
		type: "math_arithmetic",
		inputs: {
			A: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 1
					}
				}
			},
			B: {
				shadow: {
					kind: "block",
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
		type: "math_single",
		inputs: {
			NUM: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 9
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "math_trig",
		inputs: {
			NUM: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 45
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "math_constant"
	},
	{
		kind: "block",
		type: "math_number_property",
		inputs: {
			NUMBER_TO_CHECK: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 0
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "math_round",
		inputs: {
			NUM: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 3.1
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "math_on_list"
	},
	{
		kind: "block",
		type: "math_modulo",
		inputs: {
			DIVIDEND: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 64
					}
				}
			},
			DIVISOR: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 10
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "math_constrain",
		inputs: {
			VALUE: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 50
					}
				}
			},
			LOW: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 1
					}
				}
			},
			HIGH: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 100
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "math_random_int",
		inputs: {
			FROM: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 1
					}
				}
			},
			TO: {
				shadow: {
					kind: "block",
					type: "math_number",
					fields: {
						NUM: 100
					}
				}
			}
		}
	},
	{
		kind: "block",
		type: "math_random_float"
	},
	{
		kind: "block",
		type: "math_convert_to_number",
		inputs: {
			A: {
				shadow: {
					kind: "block",
					type: "text",
					fields: {
						TEXT: "1"
					}
				}
			}
		}
	}
];
