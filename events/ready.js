module.exports = {
    name: 'ready',
    async execute(client, dbl) {
        const remoteMusixGuildsData = await client.funcs.dbget('guilds', null, client);
        remoteMusixGuildsData.forEach(guildData => {
            client.global.db.guilds[guildData.id] = guildData.d;
        });
        console.log('- DB Set -');
        client.user.setActivity(`@musix help | 🎶`, { type: 'LISTENING' });
        console.log('- Activated -');
        setInterval(async () => {
            client.guilds.forEach(guild => {
                client.db.collection('guilds').doc(guild.id).set({
                    prefix: client.global.db.guilds[guild.id].prefix,
                    defaultVolume: client.global.db.guilds[guild.id].defaultVolume,
                    permissions: client.global.db.guilds[guild.id].permissions,
                });
            });
            dbl.postStats(client.guilds.size);
        }, 1200000);
    }
}