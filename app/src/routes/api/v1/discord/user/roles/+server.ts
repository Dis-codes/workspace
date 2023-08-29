import { DISCORD_TOKEN } from "$env/static/private";
import { error } from "@sveltejs/kit";

const GUILD_ID = "932651844344373278";


export const GET = async ({ request, url }: { request: Request; url: URL }): Promise<Response> => {
    const discordId = url.searchParams.get("id");
    let userRoles: string[];
    const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}`, {
        headers: {
            'Authorization': `Bot ${DISCORD_TOKEN}`
        }
    });
    const data = await response.json();
    if (data?.message === "Unknown User") throw error(404, "Unknown User");
    if (data?.message === "Unknown Member") data.roles = [];
    userRoles = data.roles;
    return new Response(JSON.stringify({ roles: userRoles }), { status: 200 });
};
