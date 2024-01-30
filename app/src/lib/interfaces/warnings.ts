export enum WarningType {
	EmptyInput = "empty_input",
	RequiredParent = "required_parent" // under which parent the block requires it to be
}
export interface WarningData {
	type: WarningType;
	inputName?: string | string[];
	parentType?: string | string[];
	message: string;
}
