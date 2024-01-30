export default [
	{
		kind: 'block',
		type: 'objects_create'
	},
	{
		kind: 'block',
		type: 'objects_add_to_object',
		inputs: {
			VALUE: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'value'
					}
				}
			}
		}
	},
	{
		kind: 'block',
		type: 'objects_create_empty'
	},
	{
		kind: 'block',
		type: 'objects_add',
		inputs: {
			NAME: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'item'
					}
				}
			},
			VALUE: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'value'
					}
				}
			},
			OBJECT: {
				shadow: {
					kind: 'block',
					type: 'variables_get_variable',
					fields: {
						NAME: 'object'
					}
				}
			}
		}
	},
	{
		kind: 'block',
		type: 'objects_set',
		inputs: {
			NAME: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'item'
					}
				}
			},
			VALUE: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'value'
					}
				}
			},
			OBJECT: {
				shadow: {
					kind: 'block',
					type: 'variables_get_variable',
					fields: {
						NAME: 'object'
					}
				}
			}
		}
	},
	{
		kind: 'block',
		type: 'objects_get',
		inputs: {
			NAME: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'value'
					}
				}
			},
			OBJECT: {
				shadow: {
					kind: 'block',
					type: 'variables_get_variable',
					fields: {
						NAME: 'object'
					}
				}
			}
		}
	},
	{
		kind: 'block',
		type: 'objects_has',
		inputs: {
			NAME: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'value'
					}
				}
			},
			OBJECT: {
				shadow: {
					kind: 'block',
					type: 'variables_get_variable',
					fields: {
						NAME: 'object'
					}
				}
			}
		}
	},
	{
		kind: 'block',
		type: 'objects_delete',
		inputs: {
			NAME: {
				shadow: {
					kind: 'block',
					type: 'text',
					fields: {
						TEXT: 'value'
					}
				}
			},
			OBJECT: {
				shadow: {
					kind: 'block',
					type: 'variables_get_variable',
					fields: {
						NAME: 'object'
					}
				}
			}
		}
	}
];
