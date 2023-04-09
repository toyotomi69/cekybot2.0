const fetch = require('node-fetch')
const tmi = require('tmi.js')
const axios = require('axios');
const { channel, username, password } = require('./settings.json')


const tmiOptions = {
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: { 
		username,
		password,
	}, 
	channels: [channel],
}
const dateFormatterOptions = {
	timeZone: 'Europe/Prague',
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
}

const messages = [  " agrWeeb agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agrLULE agr3 agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3",  " agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3",  " agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agrLULE agrLULE agrLULE agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3", " agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrLULE agr3 agr3 agr3 agr3 agr3 agr3"," agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3"," agrS agrS agrWeeb agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3","agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3"," agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agr3 agr3 agr3 agr3 agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agr3"," agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agr3 agr3 agr3 agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agr3 agr3 agrS agrS agrS agrS agr3 agr3","agrS agrS agrS agrS agrWeeb agrDespair agrDespair agrKomrade agrDespair agrKomrade agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agr3 agr3 agr3 agrS agrS agrWeeb agrWeeb agrWeeb agrDespair agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3"," agrS agrS agrS agrWeeb agrWeeb agrKomrade agrDespair agrDespair agrKomrade agrKomrade agrS agrS agrWeeb agrWeeb agrWeeb agrS agr3 agr3 agr3 agrS agrS agrWeeb agrWeeb agrDespair agrDespair agrDespair agrWeeb agrWeeb agrS agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agr3 agr3 agr3"," agrS agrS agrS agrWeeb agrWeeb agrKomrade agrDespair agrDespair agrDespair agrDespair agrS agrS agrS agrWeeb agrS agr3 agr3 agrLULE agr3 agr3 agrS agrS agrWeeb agrWeeb agrKomrade agrDespair agrDespair agrDespair agrWeeb agrS agrWeeb agrWeeb agrS agrS agrS agrS agrS agr3 agr3 agr3"," agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrKomrade agrDespair agrDespair agrS agrS agrS agrWeeb agrS agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrWeeb agrDespair agrDespair agrDespair agrKomrade agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agr3 agr3","agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrS agrS agrS agrS agrS agrS agr3 agrLULE agrLULE agr3 agr3 agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrS agr3 agrS agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agr3 agr3 agr3"," agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrS agrS agr3 agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrS agrS agr3 agr3 agr3 agr3"," agrS agrS agrS agr3 agr3 agrS agrS agrS agrS agrWeeb agrWeeb agrS agrS agrS agr3 agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3"," agrS agrS agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agrS agrS agrS agr3 agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3"," agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agr3 agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3","agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agr3"," agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agr3 agr3 agr3 agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3"," agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agr3 agr3 agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agr3 agr3 agr3 agr3 agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3","agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agr3 agrLULE agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agr3 agr3 agr3 agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3"," agrS agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agrS agr3 agrLULE agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agr3 agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3"," agrS agrS agr3 agr3 agr3 agrS agrS agrS agrWeeb agrS agrS agrS agrS agr3 agr3 agrS agrS agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agrLULE agrLULE agrLULE agrLULE agrLULE agr3 agr3 agr3 agr3"," agrS agrS agrS agrS agrS agrS agrS agrWeeb agrS agrS agrWeeb agrWeeb agrWeeb agrS agrS agrS agrWeeb agrKomrade agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3","agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrS agrS agrS agrWeeb agrDespair agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3"," agrS agrS agrS agrS agrWeeb agrWeeb agrDespair agrWeeb agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrS agrS agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3"," agrWeeb agrWeeb agrS agrWeeb agrWeeb agrDespair agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agr3"," agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agr3"," agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agr3"," agrWeeb agrWeeb agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS"," agrWeeb agrS agrS agrS agrS agrWeeb agrDespair agrWeeb agrWeeb agrWeeb agrWeeb agrDespair agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS"," agrS agrS agrS agrS agrS agrS agrWeeb agrDespair agrDespair agrDespair agrDespair agrDespair agrWeeb agrS agr3 agrLULE agr3 agr3 agr3 agr3 agr3 agrS agrS agrWeeb agrWeeb agrWeeb agrDespair agrDespair agrDespair agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS","agrS agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrWeeb agrWeeb agrDespair agrKomrade agrWeeb agrDespair agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS"," agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS"," agrS agrS agrS agrS agrS agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agrS agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS","agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS"," agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agr3 agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS"," agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agr3 agr3 agr3 agrS agrS agrS agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrWeeb"," agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb agrWeeb agrS agrS agrS agrS agrWeeb agrWeeb agrWeeb agrWeeb",];

const api_dev_key = '10kE9f8xOaGAoonKf-HQs7lUGjenqYjp';
const cenaBenzinu = 46

donatori = []
tockadonatori = []
seznam = ""
smazano = false
prvni = true
ripy = 0
petiklistata = 0
pocet_lidi = 0
listek = ""

vstup = 200

// Last message
const lastMessage = {}
const watchedPeople = ['toyotomi_cz']

const gptapi = "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"

//node index.js
const client = new tmi.Client(tmiOptions)
client.connect().catch(console.error)

Date.prototype.timeNow = function (includeSeconds = true) {
	const hours = prependZeroToTime(this.getHours())
	const minutes = prependZeroToTime(this.getMinutes())
	const seconds = prependZeroToTime(this.getSeconds())

	return `${hours}:${minutes}${includeSeconds ? `:${seconds}` : ''}`
}

const dateFormatter = new Intl.DateTimeFormat([], dateFormatterOptions)

//client.on('connected', () => {
//   client.say(channel, `${username} nojo zmrde už jsem tady!`);
//});

//client.on('subscription', function (channel, username, methods) {
//	client.say(channel, username + ' kristova noho, dík za sub <3')
//})
//client.on('resub', function (channel, username, methods) {
//	client.say(channel, username + ' ty kráso, tolik měsíců zaludW')
//})

client.on('message', (channel, user, message, self) => {
	if (self) return
	
	try {
		const { username } = user
		
		if (watchedPeople.includes(username)) {
			lastMessage[username] = message
		}
		
		// Handling messages, that tag bot
		if (tagsBot(message)) {
			const messageCategory = Object.entries(messageCategoriesMatcher).find(
				([key, regex]) => regex.test(message)
			)[0]

			if (!responseDictionary[messageCategory]) return
			client.say(channel, responseDictionary[messageCategory](username))
		}

		// Command handling
		if (isCommand(message)) {
			executeCommand(message, user, client, channel)
		}

		// // StreamElements reaction
		// if (username.toLocaleLowerCase() === 'streamelements') {
		// 	if (message.includes(' dono ')) {
		// 		const regex = /([0-9])*\.([0-9])* Kč/
		// 		const amountMatch = regex.exec(message)

		// 		if (!amountMatch || !amountMatch[0]) return

		// 		const amount = parseInt(amountMatch[0])

		// 		if (!amount || isNaN(amount)) return

		// 		const amountInGas = amount / cenaBenzinu

		// 		let litr = ''

		// 		if (amountInGas === 1) litr = 'litr'
		// 		else if (amountInGas % 1 !== 0) litr = 'litru'
		// 		else if (amountInGas > 1 && amountInGas <= 4) litr = 'litry'
		// 		else litr = 'litrů'
				
		// 		const km = amountInGas/8*100

		// 		//client.say(
		// 		//	channel,
		// 		//	`Vojta právě dostal ${amountInGas.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${litr.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} benzínu :) dojel by tedy ${km.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}km`
		// 		//)
				
		// 		//client.say(
		// 		//	channel,
		// 		//	`Ráďa právě dostal ${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}Kč na novou multiplu agrChamp`
		// 		//)
				
		// 	}
		// }
		function seznam() {
			if (message == '!seznam' || smazano == true) {
				seznam = ""
				if(smazano == true && message == '!seznam'){
					donatori = []
					client.say(channel, `Seznam byl smazán`)
					smazano = false
				}
				else if (prvni == true){
					
					client.say(channel, `ještě nikdo nic neposlal`)
				}
				else if(message == '!seznam' && prvni == false){
				pocet_lidi = 0
				for (let k in donatori){
		
					if (donatori[k].kolik >= vstup){
						seznam = seznam.concat(donatori[k].jmeno/* + ': ' + donatori[k].kolik*/ + "; " )
						pocet_lidi++
					}
				}
				client.say(channel, `Seznam[${pocet_lidi}]- ${seznam}`)
				}
			}
		}

		function smazat() {
			if (message == '!smazat') {
				smazano = true
				return true
			}
			else return false

		}
		

		if (username.toLocaleLowerCase() === 'toyotomicz') {
			seznam()
			smazat()
		}
		if (username.toLocaleLowerCase() === 'lobotomi_sk') {
			seznam()
			smazat()
		}
		if (username.toLocaleLowerCase() === 'agraelus') {
			seznam()
			smazat()
		}
		if (username.toLocaleLowerCase() === 'zasr_nycartman') {
			seznam()
			smazat()
		}
		if (username.toLocaleLowerCase() === 'cekybot2') {
			seznam()
			smazat()
		}
		if (username.toLocaleLowerCase() === 'hodneholoube_') {
			seznam()
			smazat()
		}

		if (username.toLocaleLowerCase() === 'streamelements') { //streamelements toyotomicz
			if (message.includes('Jsi v točce')) { //Kapalina 1265.00 Kč Jsi v točce agrSellout PagMan (Pouze pokud je)  agrSellout
				smazano = false
				prvni = false
				let zprava = message

				const myArray = zprava.split(".");

				let zajimave = myArray[0];
				const myArray2 = zajimave.split(" ");
				const myArray3 = zajimave.split(" ");
				let jmenoTady = myArray3[0];
				let kolikFinal = parseInt(myArray2[myArray2.length-1]);

				let dvakrat = false
				var keyToFind = jmenoTady;
					for(var i in donatori){
						if(donatori[i].jmeno == keyToFind){
							dvakrat = true
							donatori[i].kolik = parseInt(donatori[i].kolik) + parseInt(kolikFinal)
							break;
						}
						
					}
				if(dvakrat == false){
						donatori.push({
							jmeno:   jmenoTady,
							kolik: kolikFinal
						});	
				}

				petiklistata = petiklistata + parseInt(kolikFinal)
			} 
			if (message.includes('hodil ')) { //DEEvilGirl poslal 29.00 dalalů! agrNaM
				smazano = false
				prvni = false
				let zprava = message

				const myArray = zprava.split(".");

				let zajimave = myArray[0];
				const myArray2 = zajimave.split(" ");
				const myArray3 = zajimave.split(" ");
				let jmenoTady = myArray3[0];
				let kolikFinal = parseInt(myArray2[myArray2.length-1]);

				let dvakrat = false
				var keyToFind = jmenoTady;
					for(var i in donatori){
						if(donatori[i].jmeno == keyToFind){
							dvakrat = true
							donatori[i].kolik = parseInt(donatori[i].kolik) + parseInt(kolikFinal)
							break;
						}
						
					}
				if(dvakrat == false){
						donatori.push({
							jmeno:   jmenoTady,
							kolik: kolikFinal
						});	
				}
				petiklistata = petiklistata + parseInt(kolikFinal)
			}
			if (message.includes('TOČKA *')) { //* jokie1321 ; TOČKA *
				smazano = false
				prvni = false
				let zprava = message

				let words = zprava.split(" ");
				let jmenoTady = words[1];
				let kolikFinal = 200

				let dvakrat = false
				var keyToFind = jmenoTady;
					for(var i in donatori){
						if(donatori[i].jmeno == keyToFind){
							dvakrat = true
							donatori[i].kolik = parseInt(donatori[i].kolik) + parseInt(kolikFinal)
							break;
						}
						
					}
				if(dvakrat == false){
						donatori.push({
							jmeno:   jmenoTady,
							kolik: kolikFinal
						});	
				}
				petiklistata = petiklistata + parseInt(kolikFinal)
			}			
		}
		if (username.toLocaleLowerCase() === 'hodneholoube_') {
			if (message.includes('!vstup')) {
				var castkastring = message.split(' ')[1]
				var castka = Number(castkastring)
				vstup = castka
				client.say(channel, `Vstup do točky je za ${vstup}Kč`)
			}
		}	
		if (username.toLocaleLowerCase() === 'streamelements') {
			if (message.includes(' 500.00 Kč')) {  //bravoosjakub 500.00 Kč Jsi v točce agrSellout PagMan (Pouze pokud je) agrSellout
				var jmeno = message.split(' ')[0]

				const array = ['pětibábu', 'pětihadr', 'pětiklíště', 'pětisvinče', 'pětipupek', 'pětisvini', 'pětihovno', 'pětiklíšťatovou encefalitidu']
				var randomItem = array[Math.floor(Math.random() * array.length)]

				client.say(channel, `Díky za ${randomItem} ${jmeno}`) 
			} 
			if (message.includes(' 500.00 Kč')) {
				
				client.say(channel, `▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬ STREAMER VÁM DĚKUJE ZA agrPetibaba ▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬`) 
			} 
		}
		
		 if (username.toLocaleLowerCase() === 'toyotomicz') {
			if (message.includes('!gpt')) { //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
				var dotaz = message.split(' ')[1]
				var odpoved = gpt(dotaz)
				client.say(channel, odpoved)
		 	}
		 	if (message == '!zidobrani') { 
				let petibaba = (petiklistata/500).toFixed(2)
		 		client.say(channel, `Dneska přišlo ${petiklistata}Kč, neboli ${petibaba} pětiklíšťat agrPetibaba`)
		 	}
		 	if (message == '!rip') { 
		 		ripy += 1
		 		client.say(channel, `${ripy} LULE`)
		 	}
		 	if (message == '!vynulovat') { 
		 		ripy = 0
		 		client.say(channel, `vynulováno`)
		 	}
		 	if (message == '!pocetripu') { 
		 		client.say(channel, `Počet ripů: ${ripy} LULE`)
		 	}
			 if (message == '!list') {
				list = ""
				for (let k in donatori) {
				  if (donatori[k].kolik >= vstup) {
					list += donatori[k].jmeno + "\n";
				  }
				}
				listek = list.replace(/;/g, "");
				listovani()
			  }
			  //const query = "how to use fork";
//const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

//console.log(googleSearchUrl);

			 if (message.includes('!yen')) {
				var castka = message.split(' ')[1]
				var poInflaci = Number(castka) * 0.17
				var poInflaci2 = Number(castka) * 7.41 * 22.84
				var vysledek = poInflaci.toFixed(2)
				var vysledekCZK = Math.round(poInflaci2)
				client.say(channel, `${vysledek}Kč`)
			}
			if (message.includes('!vstup')) {
				var castkastring = message.split(' ')[1]
				var castka = Number(castkastring)
				vstup = castka
				client.say(channel, `Vstup do točky je za ${vstup}Kč`)
			}
			if (message == '!cojenovyho') {

				let channel1Uploads, channel2Uploads, channel3Uploads;
	
				async function getUploads() {
					const youtube = require("youtube-api");
					youtube.authenticate({
						type: "key",
						key: "AIzaSyAw3At13DP69z-9PbAiIq2snTRFFi1X21U"
					});
					const channelIds = ["UCnJSOADExesS_6CboP3dtVw", "UCM9uBpe61EkuKMIp_vtdpWQ", "UCmqeLBzm8qgETYV5jVbTrlw"]; //tvtwixx,adam,show us
				
					for(let i = 0; i < channelIds.length; i++) {
						const moment = require('moment-timezone');
						moment.tz.setDefault("Europe/Prague");
						const todayStart = moment().startOf('day').toISOString();
						const todayEnd = moment().endOf('day').toISOString();

				
						let res = await youtube.search.list({
							part: "id",
							channelId: channelIds[i],
							publishedAfter: todayStart,
							publishedBefore: todayEnd,
							type: "video"
						});
				
						if(i === 0) {
							channel1Uploads = res.data.items.length;
						}
						else if(i === 1) {
							channel2Uploads = res.data.items.length;
						}
						else if(i === 2) {
							channel3Uploads = res.data.items.length;
						}
					}
					client.say(channel, `TvTwixx: ${channel1Uploads}, Nerd Adam: ${channel2Uploads}, Show Us: ${channel3Uploads} :)`)
	
				}
				getUploads();
				
			   }
			    if (message == '!velkyagrE') {
				messages.forEach((message) => { client.say(channel, message); });
				}
				if (message.includes('!emoty')) {
					var zprava = message.split(' ')[1]
					myString = zprava.replace("a", " agrA ").replace("b", " agrB ").replace("c", " agrC ").replace("e", " agrE ").replace("o", " agrO ").replace("s", " agrS ").replace("t", " agrT ")
					client.say(channel, myString)
				}
		}
		if (message == '!vanish') {
			 	client.say(channel, `/timeout ${username} 1`)
		}
		if (message == '!vanish 10') {
			client.say(channel, `/timeout ${username} 600`)
   		}
		if (message.includes('https://www.youtube.com/watch?v=NtrAx-rVgco')) {
			client.say(channel, `Ratge ☝️ 4 hodinová recenze Zaklínače`)
		}
		if (message.includes('https://youtu.be/NtrAx-rVgco')) {
			client.say(channel, `Ratge ☝️ 4 hodinová recenze Zaklínače`)
		}

		// if (username.toLocaleLowerCase() === 'agraelus') {
		// 	if (message == '[KUKORO] <<< YOU CAN MOVE! >>>') {
		// 		client.say(channel, `!go`)
		// 	}
		// 	if (message == '[KUKORO] <<< STOP! >>>') {
		// 		client.say(channel, `!stop`)
		// 	}
		// }

		// // Special interactions
		// if (message == 'zaludE') {
		// 	client.say(channel, `@${username} zaludE`)
		// }
		// if (message == `agr1 agr2`) {
		// 	client.say(channel, `agr3 agr4`)
		// }
		// if (message.includes(' žalud ')) {
		// 	client.say(channel, `@${username} zaludWeird`)
		// }
		// //if (message.includes('žalud')) {
		// //	client.say(channel, `@${username} zaludWeird`)
		// //}
		// if (message.includes('!holkypiste')) {
		// 	client.say(channel, `@${username} ne :tf:`)
		// }
		// if (message.includes('!pivo')) {
		// 	client.say(channel, `@${username} 🍺`)
		// }
		// if (message.includes(' !ááá')) {
		// 	var jmeno = message.split(' ')[0]
		// 	client.say(
		// 		channel,
		// 		`agrKUK ááá ty debílku ${jmeno} , nojo zmrde já tě vidim`
		// 	)
		// }

		// if (message.includes(' !mlady')) {
		// 	var jmeno = message.split(' ')[0]
		// 	client.say(channel, `MLADY 🌹 ${jmeno}`)
		// }
		// if (message.includes('!mlady ')) {
		// 	var jmeno = message.split(' ')[1]
		// 	client.say(channel, `MLADY 🌹 ${jmeno}`)
		// }
		// if (message == '!cojezaden') {
		// 	;(function () {
		// 		var days = [
		// 			'Neděle',
		// 			'Pondělí',
		// 			'Úterý',
		// 			'Středa',
		// 			'Čtvrtek',
		// 			'Pátek',
		// 			'Sobota',
		// 		]

		// 		Date.prototype.getDayName = function () {
		// 			return days[this.getDay()]
		// 		}
		// 	})()

		// 	var now = new Date()

		// 	var day = now.getDayName()
		// 	client.say(channel, `Dneska je ${day} :)`)
		// }
		// if (message.includes(' !gn')) {
		// 	var jmeno = message.split(' ')[0]
		// 	client.say(channel, `zaludBedge ${jmeno} Dobrou noc 🌃`)
		// }
	} catch (err) {
		console.warn(err)
	}
})

// Constants
const jokes = [
	'Servis hudebních nástrojů, odpovědný vedoucí: Ing. Prokop Buben',
	'Víte jak se jmenuje had, který vypráví vtipy? Hahad',
	'Víš, jak se kouzelník utírá na záchodě? Normálně – trikem.',
	'Pepíček dostal k narozeninám granát a je z toho celý pryč.',
	'Víš, proč nechodí jogurt na procházku? Protože se bojí, že byl byl prošlý.',
	'Jak se nazývá koronavirusová liška? Liška Byst-rouška',
	'Víte, proč voda nežije? Protože skapala!',
	'Víte, jaký je rozdíl mezi tavičem a babičkou? Tavič taví železo, zatímco babička, ta ví všechno.',
	'Příjde kůn do banky a říká: „Dobrý den, chtěl bych si založit koňto.“',
	'Ta ironie, když se z veganství stane masová záležitost.',
	'„Proč je ti tak nevolno?“ „Bo loňské špagety.“',
	'Vletí moucha do hospody a táže se: „Promiňte, je tahle stolice volná?“',
	'Dva zloději ukradli kalendář. Každý dostal šest měsíců.',
	'„Pane průvodčí, jede ten vlak na Písek?“ „Ne, na naftu!“',
	'Přijde Hertz do baru a říká: „Jedno pivo, ať to kmitá!“',
	'„Jaký je váš nejoblíbenější typ fotoaparátu, pane Slepičko?“ „Ko-ko-Kodak!“',
	'Víte, jak se smějou dřevorubci? Řežou se smíchy.',
	'„Máš dneska čas?“ „Ne, jdu si koupit brýle.“ „A potom?“ „Potom uvidím.“',
	'„Chcete slyšet vtip o České poště?“ „Jojo, klidně.“ „Tak dobře, ale nevím, jestli vám to dojde...“',
	'Víte, kdy je muž naivní? Při sexu – jedná se totiž o situaci, při které je na i v ní.',
	'Nanosekunda = dámské přirození na čichovém orgánu?',
	'Když se natáčel Kameňák, bylo na place zakázáno kouřit… A když už, tak JENOM TROŠKU.',
	'Kdy je muž NAIVNÍ? Při souloži - když je NA I V NÍ.',
	'Proč ženy během milostné předehry ani nemrknou? Protože to nestihnou.',
	'Příjde cápek do baru',
	'„Mamí, upadl nám žebřík,“ říká Pepíček. „Tak to řekni tátovi!“ „On už to ví, visí na okapu.“',
	'„Pepíčku, proč jsi včera nebyl ve škole?“ „Vy jste říkala že kdo nebude mít domácí úkol tak ať se tady ani neukazuje.“',
	'Ptá se máma Pepíčka: „Proč krmíš slepice čokoládou?“ On na to odpoví: „Aby mi snesly kindervajíčko!“',
	'Mami, já nechci brášku. Neodmlouvej a žer co je!',
	'Jde chlap po ulici a v náručí nese urnu. Okolo něho jde lidožrout a povidá: „No teeda, kdes sehnal instant?“',
	'Chuck Norris chytil koronavirus. Bylo mu ho líto, tak ho zase pustil.',
	'Baví se dva grafici: „Já jsem sbalil novou holku, je krásná, 90-60-90…“ „Cože? Tmavě fialová?“',
	'CSS humor: #titanic { float: none; }',
	'Co slyší webmaster, když jede vlakem? <td></td><td></td><td></td><td></td><td></td>',
	'Jsou dvě blechy na zastávce, běží kolem pes a jedna blecha říká: „Tak ahoj, jede mi autobus.“',
	'Letí dva balonky po poušti a jeden říká: „Pozor kaktussss!“ „Kde ho vidíšššš?“',
	'Čech a Američan hrají šachy. Američan táhne a říká: „Jezdec na D1!“ Čech to komentuje: „To bych nedělal…“',
]

// base cooldown is 30 seconds, if specific needed add 'cooldown: <!SECONDS!>' to the command object
const commands = {
	// zaludcommands: {
	// 	fnc: ({ client, channel }) => {
	// 		client.say(
	// 			channel,
	// 			`!zalud <tvrzení>, !hodnoceni, !madmonq, !velkyagrLULE, !gn <jmeno>, !mlady <jmeno>, !vtip, !cas, !cojezaden, !kdoudelalcekybota, !btc, !eth, !miken, !vyplata :)`
	// 		)
	// 	},
	// },
	// zalud: {
	// 	fnc: ({ client, channel, rest }) => {
	// 		const num = rollDice()
	// 		client.say(channel, `Tvrzení, že ${rest}, je na ${num}% správné zaludE`)
	// 	},
	// 	cooldown: 600,
	// },
	// hodnoceni: {
	// 	fnc: ({ client, channel }) => {
	// 		const num = hraxd()
	// 		client.say(channel, `Tato hra je ${num}/10 zalud5Head`)
	// 	},
	// },
	 madmonq: {
	 	fnc: ({ client, channel }) => {
	 		client.say(
	 			channel,
	 			`zaludE Čau frajeři, tady Žalud 🌰, dneska jsem v lese 🌳🌳, a jsem teda zase zpátky, tentokrát s Madmonqama FeelsAmazingMan 💊 madmonq.gg/agraelus`
	 		)
	 	},
	 },
	 madmong: {
	 	fnc: ({ client, channel }) => {
	 		client.say(
	 			channel,
	 			`zaludE Čau frajeři, tady Žalud 🌰, dneska jsem v lese 🌳🌳, a jsem teda zase zpátky, tentokrát s Madmonqama FeelsAmazingMan 💊 madmonq.gg/agraelus`
	 		)
	 	},
	 },
	// velkyagrLULE: {
	// 	fnc: ({ client, channel }) => {
	// 		client.say(channel, `agr1 agr2`)
	// 		setTimeout(() => {
	// 			client.say(channel, `agr3 agr4`)
	// 		}, 2000)
	// 	},
	// }, 
	 vyplata: {
	 	fnc: async ({ client, channel }) => {
	 		const price = await getCrypto('ETH')
	 		if (price < 3500) {
	 			var kolik= 3500-price
	 			client.say(channel, `Do výplaty chybí $${kolik.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ETH`)
	 		  } else {
	 			client.say(channel, `dělej dělej, dej modům vejplatu, cena ETH je $${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ModLove @Agraelus`)
	 		  }
	 	},
	 },
	eth: {
	 	fnc: async ({ client, channel }) => {
	 		const price = await getCrypto('ETH')
	 		client.say(channel, `Cena etherea je $${price.toLocaleString()}`)
	 	},
	 },
	btc: {
	 	fnc: async ({ client, channel }) => {
	 		const price = await getCrypto('BTC')
	 		client.say(channel, `Cena bitcoinu je $${price.toLocaleString()}`)
	 	},
	 },
	
	// vkorunach: {
	// 	fnc: async ({ client, channel, rest }) => {
	// 		const amount = parseFloat(rest)

	// 		if (isNaN(amount)) {
	// 			client.say(channel, `${rest} neni validní číslo zaludWeird`)
	// 			return
	// 		}

	// 		const amountInCzk = await getEurToCzk(amount)

	// 		if (amountInCzk) {
	// 			client.say(channel, `${amount} eur je ${amountInCzk} korun`)
	// 		}
	// 	},
	// },
	// sub: {
	// 	fnc: async ({ client, channel }) => {

	// 		const subInCzk = await getEurToCzk(3.99)
	// 		const VAT = subInCzk * 0.21
	// 		const noVAT = subInCzk * 0.79

	// 		if (subInCzk) {
	// 			client.say(channel, `Sub dneska stojí ${subInCzk} Kč. Z toho je VAT ${VAT} Kč. Sub bez VAT stojí ${noVAT} Kč`)
	// 		}
	// 	},
	// },
	// benzin: {
	// 	fnc: async ({ client, channel, rest }) => {
	// 		const amount = parseFloat(rest)

	// 		if (isNaN(amount)) {
	// 			client.say(channel, `${rest} neni validní číslo zaludWeird`)
	// 			return
	// 		}

	// 		const amountInCzk = amount / cenaBenzinu

	// 		if (amountInCzk) {
	// 			client.say(
	// 				channel,
	// 				`${amount}Kč je ${amountInCzk.toLocaleString()} litrů benzínu`
	// 			)
	// 		}
	// 	},
	// },
	// veurech: {
	// 	fnc: async ({ client, channel, rest }) => {
	// 		const amount = parseFloat(rest)

	// 		if (isNaN(amount)) {
	// 			client.say(channel, `${rest} neni validní číslo zaludWeird`)
	// 			return
	// 		}

	// 		const amountInEur = await getCzkToEur(amount)

	// 		if (amountInEur) {
	// 			client.say(channel, `${amount} korun je ${amountInEur} euro`)
	// 		}
	// 	},
	// },
	// vtip: {
	// 	fnc: ({ client, channel }) => {
	// 		client.say(channel, getRandomItemFromArray(jokes) + " :D")
	// 	},
	// 	cooldown: 300,
	// },
	// cas: {
	// 	fnc: ({ client, channel }) => {
	// 		Date.prototype.timeNow = function () {
	// 			return (
	// 				(this.getHours() < 10 ? '0' : '') +
	// 				this.getHours() +
	// 				':' +
	// 				(this.getMinutes() < 10 ? '0' : '') +
	// 				this.getMinutes() +
	// 				':' +
	// 				(this.getSeconds() < 10 ? '0' : '') +
	// 				this.getSeconds()
	// 			)
	// 		}
	// 		var datetimet = new Date().timeNow()
	// 		var res = datetimet.substring(0, 5)
	// 		client.say(channel, `Kristova noho, ono už je ${res}`)
	// 	},
	// },
	// čas: {
	// 	fnc: ({ client, channel }) => {
	// 		Date.prototype.timeNow = function () {
	// 			return (
	// 				(this.getHours() < 10 ? '0' : '') +
	// 				this.getHours() +
	// 				':' +
	// 				(this.getMinutes() < 10 ? '0' : '') +
	// 				this.getMinutes() +
	// 				':' +
	// 				(this.getSeconds() < 10 ? '0' : '') +
	// 				this.getSeconds()
	// 			)
	// 		}
	// 		var datetimet = new Date().timeNow()
	// 		var res = datetimet.substring(0, 5)
	// 		client.say(channel, `Kristova noho, ono už je ${res} `)
	// 	},
	// },
	// google: {
	// 	fnc: ({ client, channel, user }) => {
	// 		var co = message.split(' ')[1]
	// 		let hledani = co.slice(7);
	// 		hledani = hledani.replace(/\s+/g, '+').toLowerCase()
	// 		let google = "google.com/serch?"
	// 		let google2 = google.concat(hledani)
	// 		client.say(channel, `${google2}`)
	// 	},
	// 	cooldown: 300,
	// },
	 miken: {
	 	fnc: ({ client, channel, user }) => {
	 		client.say(channel, `celejzivotfree.eu`)
	 	},
	 	cooldown: 600,
	 },
	// deez: {
	// 	fnc: ({ client, channel, user }) => {
	// 		client.say(channel, `deez nuts`)
	// 	},
	// 	cooldown: 600,
	// },
	 samsung: {
	 	fnc: ({ client, channel }) => {
	 		client.say(channel, `žádný takový command není kkt`)
	 	},
	 	cooldown: 200,
	 },
	// dono: {
	// 	fnc: ({ client, channel }) => {
	// 		client.say(channel, `https://streamelements.com/agraelus/tip`)
	// 	},
	// 	cooldown: 200,
	// },
	 bryle: {
	 	fnc: ({ client, channel }) => {
	 		client.say(channel, `B)`)
	 	},
	 	cooldown: 200,
	 },
	// smrti: {
	// 	fnc: ({ client, channel }) => {
	// 		client.say(channel, `vojta umřel ${ripy} krát`)
	// 	},
	// 	cooldown: 200,
	// },
	// electroworld: {
	// 	fnc: ({ client, channel }) => {
	// 		client.say(channel, `https://www.electroworld.cz/leqismart-by-huawei-hilink-d12-blk`)
	// 	},
	// 	cooldown: 100,
	// },
	 podnikatel: {
		fnc: ({ client, channel }) => {
	 		client.say(channel, `https://www.podnikatel.cz/rejstrik/vojtech-fisar-03908356/`)
	 	},
	 	cooldown: 100,
	},
	// gramofon: {
	// 	fnc: ({ client, channel }) => {
	// 		client.say(channel, `https://www.alza.cz/technics-sl-1210gr-cerny-d5508276.html`)
	// 	},
	// 	cooldown: 100,
	// },
}


const messageCategoriesMatcher = {
	greeting: /(ahoj)|(čau)|(čus)|(zdar)|(nazdar)/,
	offensive: /(zabij se)|(mrdko)|(chc[í|i]pni)/,
	hug: /(dankHug)|(, dankHug)/,
}

const youtube = require("youtube-api")

const responseDictionary = {
	greeting: (username) => `@${username}, čau! zaludKamo`,
	offensive: (username) => 'PoroSad',
	hug: (username) => `@${username} dankHug`,
}

// Helper functions
function rollDice() {
	const sides = 100
	return Math.floor(Math.random() * sides) + 1
}

function hraxd() {
	const sides = 10
	return Math.floor(Math.random() * sides) + 1
}

function nos() {
	const sides = 20
	return Math.floor(Math.random() * sides) + 5
}

function isCommand(message) {
	return message.startsWith('!')
}

function tagsBot(message) {
	return message.includes('@cekybot')
}

function getRandomItemFromArray(array) {
	const randomIndex = Math.floor(Math.random() * array.length)
	return array[randomIndex]
}
function prependZeroToTime(number) {
	return number >= 10 ? number.toString() : `0${number.toString()}`
}

function executeCommand(command, user, client, channel) {
	const tokens = command.split(' ')
	const commandName = tokens[0].substr(1)
	const rest = tokens.slice(1).join(' ')

	// check if command and it's exec fnc is defined
	if (!commands[commandName] || !commands[commandName].fnc) return

	// check if command is off cooldown
	if (!!cooldownMap[commandName]) return

	// define cooldown (default 30 seconds)
	const cd = (commands[commandName].cooldown || 30) * 1000

	// execute command function
	commands[commandName].fnc({ user, client, channel, rest })

	// set command on cooldown
	cooldownMap[commandName] = true

	// setup timeout to put command off cooldown after specified time
	setTimeout(() => {
		cooldownMap[commandName] = false
	}, cd)
}

// map for command cooldowns, leave empty!
const cooldownMap = {}

async function getCrypto(cryptoTag) {
	try {
		const crypto = await fetch(
			`https://api.blockchain.com/v3/exchange/tickers/${cryptoTag}-USD`
		)

		const response = await crypto.json()

		const price = response.last_trade_price

		return price
	} catch (err) {
		console.warn(err)
	}
}

async function getEurToCzk(value = 1) {
	try {
		const response = await fetch('https://api.exchangerate.host/latest')
		const rates = await response.json()

		const czk = rates?.rates?.CZK | 0

		const price = czk * value

		return price.toFixed(2)
	} catch (err) {
		console.warn(error)
	}
}

async function getCzkToEur(value = 1) {
	try {
		const response = await fetch('https://api.exchangerate.host/latest')
		const rates = await response.json()

		const czk = rates?.rates?.CZK | 0

		const price = value / czk

		return price.toFixed(2)
	} catch (err) {
		console.warn(error)
	}
}

async function gpt(dotaz) { //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
	const { Configuration, OpenAIApi } = require("openai");

	const configuration = new Configuration({
	apiKey: process.env.gptapi,
	});
	const openai = new OpenAIApi(configuration);

	const completion = await openai.createCompletion({
	model: "text-davinci-003",
	prompt: dotaz,
	});
	return completion.data.choices[0].text;
}

async function listovani(){
	const PasteClient = require("pastebin-api").default;

	const client = new PasteClient("Y4t2duRL7ovUCuu1hilLro-KFgyfYGFz"); //ONmumL9M4AvdhQvvv6ZlEXANlISdGBr3 10kE9f8xOaGAoonKf-HQs7lUGjenqYjp Y4t2duRL7ovUCuu1hilLro-KFgyfYGFz
	var url = await client.createPaste({
		code: "listek",
		name: "Točenice",
	  });
	  
	console.log(url);
}
//let str = ""
//let words = str.split("; ")

//words.forEach(function(word){    console.log(word);})
