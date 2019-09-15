# mouserBoard #

mouserBoard is the communication platform for crypto-gamers.

Simply login with your wallet. Your in-game reputation is built-in and will let you access a new universe of features, thanks to interoperability. 

### mouserBot for Discord###

mouserBot has been developed during the [Cheeze Wizards + Coinlist hackathon](https://coinlist.co/build/cheezewizards).
This proof of concept implements 4 features that will engage Cheeze Wizards players in a more effective way during the summer 2019 tournament. More features will come!

#### !claim mouserboard_code ####

Cheeze Wizards is a worldwide game where two players must be online during the same time window to duel each other. 
Login with your wallet to [mouserBoard](https://mouserboard.com), copy the code you find in the header, and type it in any Discord channel where mouserBot is invited. Your Discord user will get verified and mouserBot will signal your address online as soon as you login to Discord. 

#### !chaseTheLeaders eth_address ####

Some players summoned way many wizards more than others, thus having very high cumulative power and potentially creating game inequality. This can be balanced by lower ranking players if they duel altogether wizards owned by the top players.
!chaseTheLeaders 0x123...9 finds your best wizard, identifies the cluster of top players to fight, and finally matches your wizard with 5 of theirs in the same power range. 

#### !ownerRank eth_address ####

!ownerRank 0x123...9 returns a player's current rank, current total power, recently progressed positions in the ranking, and recent growth of total power

#### !wizardRank wizard_id ####

!wizardRank 123 returns a wizard's current rank, current power, recently progressed positions in the ranking, and recent growth of total power.

### Demo ###

Following video showcases the features mentioned above.
[Demo video](https://youtu.be/zQKLtE-mhJs)

You can also test the features on our Discord testing server.
[Testing server](https://discord.gg/MQEhK2H)

### Pre-requirements for bot installation ###

You will need:
* Node.js > v8.x
* To register a bot on Discord. See [Discord documentation](https://discordapp.com/developers/docs/topics/oauth2#bots)
* To apply for an API key with mouserBoard. Send an email to [hello@mouserboard.com](hello@mouserboard.com)
Both Discord token and mouserBoard API token must be set in the auth.json file in the root.







### Data preparation ###
MouserBoard extracts and transforms raw data from Ethereum blockchain, without integrating with any dApp-specific API.
Data is retrieved from Google BigQuery Ethereum public dataset and current implementation analyses CryptoKitties contracts only.

Current implementation focuses on processing auctions and births of Cryptokitties, in order to build following KPIs:
* Top sellers - total sales per owner
* Rarity of items - ad hoc algo to weight the rarity of kitties genes/cattributes

For testing purposes, this repository includes a small subset of the data processed by MouserBoard.
Preprocessed data from Jan 15th to Feb 4th, 2019 is available in /data folder.
Furthermore, to force the webapp to work on this subset, today date has been overridden in our code (i.e. Feb 5th, 2019).

Following section describes how to import above mentioned subset to MongoDB.

### Database ###

The webapp expects data to be available on a local MongoDB instance with the following setup:
* localhost without authentication
* database name: mouserboard
* sales data in sales collection
    PERFORM
* releases data in releases collection
    PERFORM

If you want to customise your configuration, please see:
* config 
* tablename in XXXXFILE
* tablename in XXXXFILE2

Further information on database configuration is available on Sails.js framework website.
Further information on how to install MongoDB here


### Getting started ###

clone...

npm install...

sails lift

go to localhost:1337

to perform the transaction as of the demo, you need a wallet bridge (e.g. Metamask) and switch to Kovan testnet.

### 0x integration ###

0x integration is client-side for demo purposes.
Our implementation is inspired by the [forwarder_buy_erc721_tokens scenario](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/forwarder_buy_erc721_tokens.ts) available in 0x Starter Project
A random token is minted at runtime on Kovan. So, the kitty shown in the webapp is only demonstrative.
However, the transaction is actually confirmed by the current user through his/her wallet (e.g. [TX in the video](https://kovan.etherscan.io/tx/0x2d86762f3e0d27e6e1a23efda12cc5edf87fbab0cd8980f2a145305302e0c2cb)).

The code for 0x integration can be seen here.

Future work is the implementation of the actual relayer to trade real ERC721 tokens on mainnet