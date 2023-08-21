import { DISCORD_TOKEN } from "$env/static/private";
import { error } from "@sveltejs/kit";

const GUILD_ID = "1029802748293689384";


export const GET = async ({ request, url }: { request: Request; url: URL }): Promise<Response> => {
    const discordId = url.searchParams.get("id");
    let userRoles: string[];
    const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}`, {
        headers: {
            'Authorization': `Bot ${DISCORD_TOKEN}`
        }
    });

    if (!response.ok) throw error(500,'Response is NOT ok')
    const data = await response.json();
    userRoles = data.roles;
    
    return new Response(JSON.stringify({ roles: userRoles }), { status: 200 });
};
