export default async function GetUserRoles(discordID: string) {
    const response = await fetch(`https://www.discodes.xyz/api/v1/discord/user/roles/?id=${discordID}`)
    return (await response.json()).roles
}