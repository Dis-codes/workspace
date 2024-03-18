import type { WorkspaceConfig } from "$lib/interfaces/Config";

const configManager = {
	// Returns a new workspace used for storing the data in local storage
	newWorkspace: (name: string, description: string, updatedAt: Date, id?: string): WorkspaceConfig => {
		const config = {
			id: id ? id : "no_id",
			files: {
				"index.dsc": {}
			},
			settings: {
				name: name,
				description: description,
				updatedAt: updatedAt,
				secrets: {}
			}
		};

		localStorage.setItem(`workspace-${config.id}`, JSON.stringify(config));

		return config;
	},

	updateWorkspace: (workspaceConfig: WorkspaceConfig): void => {
		localStorage.setItem(`workspace-${workspaceConfig.id}`, JSON.stringify(workspaceConfig));
	},

	getWorkspace: (workspaceID: string): WorkspaceConfig => {
		const config = localStorage.getItem(`workspace-${workspaceID}`);
		return JSON.parse(config ? config : "");
	}
};

export default configManager;
