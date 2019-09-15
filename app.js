const express = require('express');
const app = express();
var fs = require('fs');
const request = require('request');
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`App listening on port ${port}`);
});

const Discord = require('discord.js');
const client = new Discord.Client();

// tokens for Discord and mouserBoard API
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// bot prefix to check
const prefix = "!";

client.on('message', msg => {
  // avoid any activity if the command does not start with the prefix
  if (!msg.content.startsWith(prefix)) return;

  // Stats of an address
  if (msg.content.startsWith(prefix +"ownerRank")){
    var splits= msg.content.split(/\s+/);
    var selectedSplit
    splits.forEach(function(split,i){
      
      var searchPattern = new RegExp('0x','i');
      
      if (searchPattern.test(split) && split.length == 42 ) {
        selectedSplit=split.toLowerCase()
        request('https://mouserboard.com/api/v1/get-wizard-owner-rank/'+auth.api_token+'/'+selectedSplit, { json: true }, (err, res, body) => {
          if (err) { 
            msg.reply(' something went wrong with your query :(')
            return console.log(err); 
          }
          if (res.statusCode==200){
            var wizardStats= res.body

            var text= ' current stats about '+ selectedSplit+'\n - rank: '+wizardStats.rank+'\n - total wizards: '+wizardStats.totalWizards+'\n - total power: '+wizardStats.totalPower
            growthPerc=wizardStats.growthPerc
            growthRank=wizardStats.growthRank
            if (wizardStats.growthPerc !=0 || wizardStats.growthRank!=0){
              
              if (wizardStats.growthPerc >0) {
                text=text+'\n - recently gained '+growthPerc+'% power'
              }
              if (wizardStats.growthPerc <0) {
                text=text+'\n - recently lost '+(-growthPerc)+'% power'
              }
              
              if (wizardStats.growthRank >0) {
                text=text+'\n - recently progressed '+growthRank+' positions'
              }
              if (wizardStats.growthRank <0) {
                text=text+'\n - recently lost '+(-growthRank)+' positions'
              }
              
            }
            text= text+'\nLive leaderboard updates on: https://mouserboard.com/leaderboard/cheezewizards/owners'
            console.log(text)
            msg.reply(text);
            
          } else {

            msg.reply(selectedSplit+' does not own any active wizard')
          }
        });
      }
    })
  
  }

  // Stats of a wizard
  if (msg.content.startsWith(prefix +"wizardRank")){
    var splits= msg.content.split(/\s+/);
    var selectedSplit
    splits.forEach(function(split,i){
      
      var searchPattern = /^\d+$/;
      if (searchPattern.test(split) ) {
        selectedSplit=split
        request('https://mouserboard.com/api/v1/get-wizard-rank/'+auth.api_token+'/'+selectedSplit, { json: true }, (err, res, body) => {
            if (err) { 
              msg.reply(' something went wrong with your query :(')
              return console.log(err); 
            }
            if (res.statusCode==200){

              var wizardStats= res.body
              if (wizardStats.eliminatedBlockNumber.length>0){
                var text= ', wizard '+selectedSplit+' was eliminated :('
                msg.reply(text);
              } else{

                var text= ' current stats about wizard '+ selectedSplit+'\n - rank: '+wizardStats.rank+'\n - power: '+wizardStats.power
                growthPerc=wizardStats.growthPerc
                growthRank=wizardStats.growthRank
                if (wizardStats.growthPerc !=0 || wizardStats.growthRank!=0){
                  
                  if (wizardStats.growthPerc >0) {
                    text=text+'\n - recently gained '+growthPerc+'% power'
                  }
                  if (wizardStats.growthPerc <0) {
                    text=text+'\n - recently lost '+(-growthPerc)+'% power'
                  }
                  
                  if (wizardStats.growthRank >0) {
                    text=text+'\n - recently progressed '+growthRank+' positions'
                  }
                  if (wizardStats.growthRank <0) {
                    text=text+'\n - recently lost '+(-growthRank)+' positions'
                  }
                  
                }
                text= text+'\nLive leaderboard updates on: https://mouserboard.com/leaderboard/cheezewizards/owners'
                msg.reply(text); 
              }
            } else {
              msg.reply(selectedSplit+' this wizard does not exist')
            }
          });
        
      }
    })
  
  }

  // Find 5 wizards from the top players cluster
  if (msg.content.startsWith(prefix +"chaseTheLeaders")){
    var splits= msg.content.split(/\s+/);
    var selectedSplit
    splits.forEach(function(split,i){
      
      var searchPattern = new RegExp('0x','i');
      if (searchPattern.test(split) && split.length == 42 ) {
        selectedSplit=split.toLowerCase()
        request('https://mouserboard.com/api/v1/chase-cheeze-leaders/'+auth.api_token+'/'+selectedSplit, { json: true }, (err, res, body) => {
          if (err) { 
            msg.reply(' something went wrong with your query :(')
            return console.log(err); 
          }
          if (res.statusCode==200){
            var wizards= res.body
                          
            msg.reply('5 wizards to fight against with wizard '+wizards.postContent.parameters.selectedWizard.token_id+': https://mouserboard.com/post/'+wizards.id );
            
          } else {

            msg.reply(selectedSplit+' does not own any active wizard or there are no wizards in the power range of the top players.')
          }
        });
      }
    })
  
  }

  // connect ethereum address to discord user
  if (msg.content.startsWith(prefix +"claim")){
    var splits= msg.content.split(/\s+/);
    var selectedSplit
    var discordUser=msg.author
    delete discordUser.lastMessageID
    delete discordUser.lastMessage
    if (discordUser.bot==false){
      selectedSplit=splits[1]
      if (selectedSplit.length == 5) {
        
        request.post('https://mouserboard.com/api/v1/verify-discord/'+auth.api_token,
          { 
            json:    
              { 
                verificationCode: selectedSplit,
                discordUser:  discordUser
              }
        }, function(err, res, body){
          if (err) { 
            msg.reply(' something went wrong with your query :(')
            return console.log(err); 
          }
          if (res.statusCode==200){
            msg.reply(' you are set!' );
            
          } else {

            msg.reply(' the verification code expired or something went wrong :(')
          }
        });
        
      }
      
    }
  
  }
 
});

// check if any ethereum address just went online or offline
client.on("presenceUpdate", (oldMember, newMember) => {
  if(oldMember.presence.status !== newMember.presence.status){

    request('https://mouserboard.com/api/v1/get-user-by-discord-id/'+auth.api_token+'/'+newMember.user.id, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      if (res.statusCode==200){
        client.guilds.forEach((guild) => { //for each guild the bot is in
          let defaultChannel = "";
          guild.channels.forEach((channel) => {
                if(channel.type == "text" && defaultChannel == "") {
                if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                    defaultChannel = channel; 
                }
                }
          })
           //send it to whatever channel the bot has permissions to send on
          defaultChannel.send(`${res.body.address} is now ${newMember.presence.status}`)
      
        })
      } 
    });
  }
});

client.login(auth.token);

// discord.js v11 does not try to reconnect on error
client.on('error', (err) => {
  console.log(err.message)
  console.log("Attempting to reconnect!")
  return client.reconnect()
});

function onError(error) {
  throw error
}

app.get('/', (req, res) => {
  res.status(200).send('Hello, mouserBot!');
});

module.exports = app;