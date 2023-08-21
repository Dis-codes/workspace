export default function GetBadges(rolesArray: Array<string>) {
    const badges = ['1138771459938988052', '1139658510343344291', '1139721194225016862'];
    let matchingRoles: Array<string> = [];
    matchingRoles = rolesArray.filter(role => badges.includes(role))
    return matchingRoles
}