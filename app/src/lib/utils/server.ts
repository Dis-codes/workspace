export default async function GetUserRoles(discordID: string) {
    const response = await fetch(`/api/v1/discord/user/roles/?id=${discordID}`)
    return (await response.json()).roles
}