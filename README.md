# mouserBot, by mouserBoard #

mouserBot is a bot developed during the [Cheeze Wizards + Coinlist hackathon](https://coinlist.co/build/cheezewizards).
This proof of concept implements 4 features that will engage [Cheeze Wizards](https://www.cheezewizards.com/) players on Discord in a more effective way during summer 2019 tournament. It can also be used by individual groups of players coordinating on their own Discord servers.

### mouserBoard ###

mouserBot is part of [mouserBoard](https://mouserboard.com), the communication platform for crypto-gamers.

Simply login with your wallet. Your in-game reputation is built-in and will let you access a new universe of features, thanks to interoperability. 

### Bot features ###

#### !claim mouserboard_code ####

[Cheeze Wizards](https://www.cheezewizards.com/) is a worldwide game where two players must be online during the same time window to duel each other. 
Login with your wallet to [mouserBoard](https://mouserboard.com), copy the code you find in the header, and type it in any Discord channel where mouserBot is invited. Your Discord user will get verified and mouserBot will signal your address online as soon as you login to Discord. 

#### !chaseTheLeaders eth_address ####

Some players summoned way many wizards more than others, thus having very high cumulative power and potentially creating game inequality. This can be balanced by lower ranking players if they duel altogether wizards owned by the top players.

!chaseTheLeaders 0x123...9 finds your best wizard, identifies the cluster of top players to fight, and finally matches your wizard with 5 of theirs in the same power range. 

#### !ownerRank eth_address ####

!ownerRank 0x123...9 returns a player's current rank, current total power, recently progressed positions in the ranking, and recent growth of total power

#### !wizardRank wizard_id ####

!wizardRank 123 returns a wizard's current rank, current power, recently progressed positions in the ranking, and recent growth of total power.

### Demo ###

Following video showcases the features mentioned above: [demo video](https://youtu.be/zQKLtE-mhJs)

You can also test them on our Discord server: [test server](https://discord.gg/MQEhK2H)

### Pre-requirements for bot installation ###

You will need:
* Node.js > v8.x
* To register a bot on Discord. See [Discord documentation](https://discordapp.com/developers/docs/topics/oauth2#bots)
* To apply for an API key with mouserBoard. Send an email to [hello@mouserboard.com](hello@mouserboard.com)

Both Discord token and mouserBoard API token must be set in the auth.json file in the root.




