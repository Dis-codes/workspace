export interface WorkspaceSettings {
    name: string
    description: string
    secrets: Record<string,string>
    updatedAt: Date
}

export interface WorkspaceConfig {
    id: string
    files: Record<string, Record<string,unknown>>
    settings: WorkspaceSettings
}
