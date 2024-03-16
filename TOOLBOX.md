# Creating a block

All blocks are located inside a `/lib/blocks/js`

To make a category, you add a folder by it´s name and a index.ts file containing the block definition

## Category
```ts
import { OutputType, BlockShape, InputShape } from "$lib/utils/constants";

class ClassName {
	getRegistry() {
		return {
			id: "XXXName",
			name: "XXX Name,
			color: "#40bc54",
			weight: 3,
			blocks: []
		};
	}
}
export default ClassName
```
- id - if of the folder, Name if name is not defined 
- name - Name that is shown in the toolbox (optional)
- color - HEX color of the folder
- weight - a number that determines the position in the toolbox (works for folders and blocks, default is 100) (optional)
- blocks - array of the blocks

## Blocks

You simply define the block and it will be automatically generated
```ts
{
                    func: "funcName",
                    text: "text [NAME] \n type [TYPE]",
                    shape: BlockShape.STATEMENT,
                    inline: true,
                    arguments: {
                        NAME: {
                            type: InputShape.VALUE,
                            check: OutputType.STRING
                        },
                        TYPE: {
                            type: InputShape.MENU,
                            options: [
                                ['message', 'message'],
				                        ['user', 'user']
                            ]
                        }

                    }
                },
```
- func - block id
- text - shown text on the block, [] brackets are for inputs `/n` for new line/different branch
- shape - determine block shape that don´t return anything (don´t use with output)
  - STATEMENT - Not actually required, but keeps code consistent.
  - EVENT - floating block with an input inside.Can be replaced with FLOATING, but keeps code consistent.
  - TERMINAL - block with no blocks allowed to attach after.
  - FLOATING - block that cannot have any parent blocks
  - TOPPER - cannot have any blocks attached before it
  - CUSTOM -  can be used if “manual” is used for the block.
- output - determines what gets outputed for `check`, can be used multiple values in array
  - STRING - returns text
  - NUMBER - returns number
  - BOOLEAN - returns true/false
  - ARRY - returns a list / array
  - OBJECT - returns a JSON object.
  - ANY - can be put inside any block.
  - DISCORD - contains multiple values of discord objects
    - SERVER
    - CHANNEL
    - MESSAGE
    - MEMBER
- branches - allows you create multiple branches (optional)
- inline - (optional)
- label - add label before block (optional)
- arguments - if you have any arguments you define them there
  - type - defines which block can be put here
    - VALUE - allows other blocks
    - DUMMY - Can be used for seperating content on a block by a new line.
    - SPACE - Similar to DUMMY.Can be used for seperating content on a block.
    - IMAGE
    - ANGLE - Angle field for directional inputs.
    - CHECKBOX - Checkbox field usually for toggles.
    - COLOR - Color field.
    - MENU - Dropdown menu field with options.
    - SERIALIZABLE_LABEL - Label that serializes to the project.
    - NUMBER - Number field. Used for restricting to certain numbers.
    - TEXT - Text field. Used if blocks shouldnt be used here,but text can still be input here.
    - MULTILINE_TEXT - Multi-line text field.Similar to TEXT, but new line characters are allowed.
    - VARIABLE - Variable field. Similar to MENU, but the options are all variables.
    - DISCORD
      - SERVER
      - CHANNEL
      - MESSAGE
      - MEMBER
  - check - check is used to check if the block that user puts has the same values eg. string = can be only put text output block. Same as shape
  - options - used for menu. as array of inputs where first value is shown and second is returned in the code
  - inputs - manually add inputs
```ts
options: [
	['shown', 'codeshown'],
	['shown2', 'codeshown2']
]
```
Adding a function for code export
```ts
funcName (args:any) {
	return args.NAME;
}
```
- to get the inputs you use args.
- for branches you use `args.BRANCH1` etc.

## Warnings
- warnings - list of warnings
  - type: WarningType
    - RequiredParent - adds warning when blocks aren´t placed correctly
    - EmptyInput - when field is empty
  - message: string
  - inputName: string | string[] - a string or a list of strings that are checked whether they are empty
  - parentType: string | string[] - a string or a list of strings that check whether root block is the right type
```ts
{
                    func: "test_warning",
                    text: "Warning parent\n input: [INPUT]",
                    shape: BlockShape.STATEMENT,
                    warnings: [
                        {
                            type: WarningType.RequiredParent,
                            parentType: "coretest_testevent",
                            message: "this block belongs under test event block!"
                        },
                        {
                            type: WarningType.EmptyInput,
                            inputName: "INPUT",
                            message: "Input field is empty"
                        },
                    ],
                    arguments: {
                        INPUT: {
                            type: InputShape.VALUE
                        }
                    }
},
```
## Mutators
Mutators are used for adding more functions to the block.

- mutator - string field for defining mutator id.
- mutatorData
  - type:
    - checkbox
  - inputs: MutatorInput[]
    - text: string of the field name(use single word for it, this will be removed when inputName field will be added!!!)
    - type: OutputType or string[] of types
    - defaultValue: Determines if input on start is shown, boolean(this field will be modified for multiple types or kept for only the checkbox mutator!!!)
    - inputName: is used to get input value when generating js, if left empty will use *text field for input name and then its used to get the value.(used when *text field is with multiple words.)
  - blockType: id of a block as base for block when opening the mutator menu
  - color: color of the block that is inside the mutator menu

Example of mutator block
```ts
{
	func: "test_mainblock",
	text: "statement blockwdwdwdw",
	mutator: "test_mainblock_mutator",
	mutatorData: {
		type: MutatorType.CheckBox,
		inputs: [
            		{
				text: "Title", // text for input text
				type: OutputType.STRING, // type for input added to the main block
				defaultValue: true, // whether the checkbox is checked also will affect if input is showed on start
			},
			{
				text: "Description",
				type: OutputType.STRING,
				defaultValue: false,
			}
		]
	},
	shape: BlockShape.EVENT
}
```
Getting input data
```ts
    test_mainblock(args: any) {
        return `console.log(${args.Title}, ${args.Description})`
    }
```
# Extended
If you want to add default blockly blocks, change categoris that contains subcategories or add labels.
```ts
"discord.js": {
      name: "Discord.JS",
      colour: "#5b80a5",
      expanded: false,
      weight: 2
},
logic: {
    kind: "label",
    text: "Custom text inside a toolbox!"
},
```

# Category
How categories.ts works?
It generates the toolbox from the definitions.
It gets all the folders and runs for each of them 
skips all categories that are hidden - you can use this to show them only locally

if there are extended files they will be merged.

if block has a label param it will be added before it.

if block has inputs it will be used, otherwise it will be generated.

If category has name it will be used, otherwise ID
