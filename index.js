const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal") 
const moment = require("moment-timezone") 
const fs = require("fs") 
const speed = require('performance-now')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./lib/help')
const {hentairecom} = require('./lib/hentairecom')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const exclusive = JSON.parse(fs.readFileSync('./src/exclusive.json'))
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Argote Admin\n' 
            + 'ORG: Pengembang XBot;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=51916659000:+51 916 659 000\n' 
            + 'END:VCARD' 
prefix = '#'
blocked = []          

/********** LOAD FILE **************/

/********** END FILE ***************/
  
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const bulan = arrayBulan[moment().format('MM') - 1]
const config = {
    XBOT: '🇳🇮⃟᤻۞꙰⃪░ҒƁƖ ⃪࿗᭄⃟᤻ ⃟꙰࿃', 
    instagram: 'tal vez', 
    nomer: 'wa.me/+51916659000',
    youtube: 'algun dia', 
    whatsapp: 'Comming soon', 
    tanggal: `TANGGAL: ${moment().format('DD')} ${bulan} ${moment().format('YYYY')}`,
    waktu: time
}

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} HORAS ${pad(minutes)} MINUTOS ${pad(seconds)} SEGUNDOS`
}


const { tanggal, waktu, instagram, whatsapp, youtube, nomer, ontime } = config



const { exec } = require("child_process")
const { getFips } = require("crypto")
const { title } = require("process")

const client = new WAConnection()

client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] QR code is ready, subrek dulu yak ambipi team`)
})

client.on('credentials-updated', () => {
   const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)

   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')

client.connect();

// client.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log(`${time}: Bot by ig:@affis_saputro123`)

client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `*❐❯─᤻─⃟᤻─᤻─᤻─᤻─᤻「⃞🌎⃞」─᤻─᤻─᤻─⃟᤻─᤻─᤻❮❐*\n\nBienvenido @${num.split('@')[0]}\n\n*┏━┅┅┅┅┅┅┄⟞⟦⟝┉┉┅┅┅┅━┓*\n${mdata.subject}\n*┗━┅┅┅┅┅┅┅┄⟞⟦⟝┅┅┅┉┉━┛* \n\n_*Espero que se sienta como en casa aquí*_\n\n*S᤻i᤻ n᤻e᤻c᤻e᤻s᤻it᤻a᤻ a᤻y᤻᤻u᤻d᤻a᤻*\n*❐⃟✓* Comuniquese de con un administrador\n*❐⃟✓* Este es un bot de bienvenida, stickers y cosas varias`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Fue bueno mientras duro\n@${num.split('@')[0]} esperamos su regreso,bye`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '❬❗❭ 𝗘𝗦𝗣𝗘𝗥𝗘, 𝗣𝗥𝗢𝗖𝗘𝗦𝗢 𝗟𝗔𝗥𝗚𝗢',
				success: '️❬ ✔ ❭ 𝗘𝗫𝗜𝗧𝗢 🖤',
				error: {
					stick: 'Bueno, falló ;( , intenta repetir :v ',
					Iv: '𝗟𝗼 𝘀𝗶𝗲𝗻𝘁𝗼 𝗲𝗻𝗹𝗮𝗰𝗲 𝗶𝗻𝘃𝗮́𝗹𝗶𝗱𝗼'
				},
				only: {
					group: '❬❗❭ 𝐒𝐎𝐋𝐎 𝐆𝐑𝐔𝐏𝐎 ',
					ownerG: '❬❗❭ 𝐒𝐎𝐋𝐎 𝐏𝐑𝐎𝐏𝐈𝐄𝐓𝐀𝐑𝐈𝐎 ',
					ownerB: '❬❗❭  𝐒𝐎𝐋𝐎 𝐏𝐑𝐎𝐏𝐈𝐄𝐓𝐀𝐑𝐈𝐎 ',
					admin: '❬❗❭ 𝐒𝐎𝐋𝐎 𝐀𝐃𝐌𝐈𝐍 ',
					Badmin: '❬❗❭ 𝐄𝐋 𝐁𝐎𝐓 𝐃𝐄𝐁𝐄 𝐒𝐄𝐑 𝐀𝐃𝐌𝐈𝐍 '
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["51916659000@s.whatsapp.net"] 
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isExclusive = isGroup ? exclusive.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				
	/*
	]=========> MENUS DEL BOT <=========[
	*/
				case 'help': 
				case 'menu':
					const mening = ['https://img.wattpad.com/0805004faeb31d76afc0ef28f976f62f22fef08d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f706c575554366e6f4546565851513d3d2d31382e313561653966653763633834313432373132333233323231323936312e6a7067?s=fit&w=720&h=720','https://pbs.twimg.com/profile_images/1029915339914665984/UlYWmyXz_400x400.jpg','https://i.pinimg.com/originals/6e/37/b3/6e37b3099ec7b44ce637a2587dca321d.jpg']
					const menudi = mening[Math.floor(Math.random() * mening.length)]
					menu = `*┏⃟━᤻┅᤻┅᤻┄᤻┄᤻⟞᤻⟦Ꮇ᤻Ꭼ᤻Ν᤻Ⴎ᤻⟧⟝᤻┄᤻┄᤻┉᤻┉᤻━⃟᤻┓*\n┃Escribe los comandos como\n┃se ven\n┃Sino no jala y se quejan :/\n*┣━⃫᤻━᤻━᤻━᤻━᤻━᤻━᤻━᤻࿃⃟❐⃟᤻࿃━᤻━᤻━᤻━᤻━᤻━⃫᤻━᤻┫*\n┃\n┣⊱ *#nsfwmenu*\n┣⊱ *#admin*\n┣⊱ *#animemenu*\n┣⊱ *#soundmenu*\n┣⊱ *#down*\n┣⊱ *#termux*\n┣⊱ *#funmenu*\n┣⊱ *#Makermenu*\n┃\n┣━━━━━━━━━━━━━━\n┃ ▒⃟⃔➥Argote\n┃ ▒⃟⃔➥Senpi\n┃ ▒⃟⃔➥Mau Mau\n┗━━━━━━━━━━━━━━`
					tuimg = await getBuffer(`${menudi}`)
					client.sendMessage(from, tuimg, image, { caption: `${menu}`, quoted: mek })
					break
				case 'nsfwmenu':
						if (!isNsfw) return reply('NSFW no está activo')
						const nsfimg = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgaAO5NHwKXzxhiDc6y24DMxVZ_jyLUG32Dg&usqp=CAU','https://i.pinimg.com/originals/d0/47/4b/d0474b8f6b8413dd68ba222a3cd06ded.jpg']
						mnsfw = `*┏━━━▒⃟🔰⃫❮ΝՏҒᏔ❯ ⃫🔰⃟▒━━━━┓*\n┃Este menu son para comando\n┃nsfw(+18)\n┃Si algo no funciona es por tu\n┃bien\n┣━━━━━━━━━━━━━━━━━━━━\n┃\n┣⊱ *#ihentai*\n┃➥ _hentai aleatorio_\n┣⊱ *#blowjob*\n┃➥ _mmds_\n┣⊱ *#boobs*\n┃➥ _opais_\n┣⊱ *#nsfwyuri*\n┃➥ _yuri_\n┣⊱ *#futanari*\n┃➥_futas_\n┣⊱ *#nsfwneko*\n┃➥ _nekos_\n┣⊱ *#blowjod1*\n┃➥ _stickers nsfw_\n┃\n┷━━━━━━━━▧▣▧━━━━━━━━┷`
						const nsfing = nsfimg[Math.floor(Math.random() * nsfimg.length)]
						imgnsfw = await getBuffer(`${nsfing}`)
						client.sendMessage(from, imgnsfw, image, { caption: `${mnsfw}`, quoted: mek })
						break

				case 'down':
						mendo = `*┏━━━▒⃟🔰⃫❮ᎠϴᏔΝ❯ ⃫🔰⃟▒━━━┓*\n┃Requiere tiempo\n┣━━━━━━━━━━━━━━━━━━━\n┃\n┣⊱ *#ytmp4 +enlace*\n┃➥ _videos de YouTube_\n┃\n┣⊱ *#ytmp3 +enlace*\n┃➥ _descarga música_\n┃\n┣⊱ *#imagen +text*\n┃➥ _qué imagen quieres_\n┃\n┷━━━━━━━━▧▣▧━━━━━━━━┷`
						const donig = ['https://i.pinimg.com/originals/c8/cd/39/c8cd396e30f743912d147ba741556832.png','https://www.dondeir.com/wp-content/uploads/2020/05/anime-streaming-claro-naruto.jpg']
						const imgdonw = donig[Math.floor(Math.random() * donig.length)]
						imagendown = await getBuffer(`${imgdonw}`)
						client.sendMessage(from, imagendown, image, { caption: `${mendo}`, quoted: mek })
						break

				case 'soundmenu':

						menuso = `*┏━━━▒⃟🔰⃫❮ՏϴႮΝᎠ❯ ⃫🔰⃟▒━━━┓*\n┃Música que tiene el bot\n┣━━━━━━━━━━━━━━━━━━━━\n┃\n┣⊱ *#sound1*\n┃\n┣⊱ *#sound2*\n┃\n┣⊱ *#sound3*\n┃\n┣⊱ *#clover*\n┃\n┣⊱ *#drstone*\n┃\n┣⊱ *#sonido4*\n┃\n┣⊱ *#bakemo1*\n┃\n┣⊱ *#bakemo2*\n┃\n┷━━━━━━━━▧▣▧━━━━━━━━┷\n`
						imagensound = await getBuffer(`https://i.pinimg.com/474x/78/0e/ac/780eacae8c3948351904028215dff255.jpg`)
						client.sendMessage(from, imagensound, image, { caption: `${menuso}`, quoted: mek })
						break
				case 'makermenu':
						menuark = `*┏━━▒⃟🔰⃫❮ᎷᎪᎡᏦᎬᎡ❯ ⃫🔰⃟▒━━┓*\n┃cosas que puede fabricar\n┃el Bot\n┣━━━━━━━━━━━━━━━━━━━━\n┃\n┣⊱ *#sticker +imagen*\n┃➥ _imagen a sticker_\n┣⊱ *#sticker +gif*\n┃➥ _gif a sticker gif_\n┣⊱ *#toimg*\n┃➥ _sticker a imagen_\n┣⊱ *#stickersad*\n┃➥ _stickergif llorando_\n┣⊱ *#stickerkiss*\n┃➥ _stickergif de besos_\n┣⊱ *#stickerhug*\n┃➥ _stickergif de abrazo_\n┃\n┷━━━━━━━━▧▣▧━━━━━━━━┷`
						imagenmaker = await getBuffer(`https://pm1.narvii.com/6474/77e08fd772b6add1e6959bb8b43326bce05c814d_hq.jpg`)
						client.sendMessage(from, imagenmaker, image, { caption: `${menuark}`, quoted: mek })
						break

				case 'admin':
						if (!isGroupAdmins) return reply(mess.only.admin)
						menuad = `*┏━━━▒⃟🔰⃫❮ᎪᎠᎷᏆΝ❯ ⃫🔰⃟▒━━┓*\n┃solo lo pueden usar admins\n┣━━━━━━━━━━━━━━━━━━━━\n┃\n┣⊱ *#kick +@miembro*\n┃➥ _eliminar un miembro_\n┣⊱ *#promete +@miembro*\n┃➥ _dar admin a un miembro_\n┣⊱ *#demote +@admin*\n┃➥ _quitar amin a un miembro_\n┣⊱ *#link*\n┃➥ _enlace del grupo_\n┣⊱ *#tagall +tetx*\n┃➥ _llamar a todos los integrantes_\n┣⊱ *#group [abrir/cerrar]*\n┃➥ _abrir o cerrar el grupo_\n┣⊱ *#nsfw 1*\n┃➥ _activar los comandos nsfw_\n┣⊱ *#welcome 1*\n┃➥ _Activar el mensaje_\n┃ _de bienvenida del grupo_\n┃\n┷━━━━━━━━▧▣▧━━━━━━━━┷`
						imagenamin = await getBuffer(`https://d3b4rd8qvu76va.cloudfront.net/915/129/703/-329996980-1ssbeq8-4671f5d8m05pacf/original/avatar.jpg`)
						client.sendMessage(from, imagenamin, image, { caption: `${menuad}`, quoted: mek })
						break

				case 'termux':
						menuter = `*┏━━▒⃟🔰⃫❮Ꭲᗴᖇᗰᑌ᙭❯ ⃫🔰⃟▒━━┓*\n┃comandos de termux\n┣━━━━━━━━━━━━━━━━━━━\n┃\n┣⊱ *#tr-troyano*\n┃➥ _hacer troyanos_\n┣⊱ *#tr-fotoploit*\n┣⊱ *#tr-spam-mj*\n┃➥ _spam de mesajes_\n┣⊱ *#tr-hack-facek*\n┃➥ _hacker Facebook_\n┃\n┷━━━━━━━━▧▣▧━━━━━━━━┷\n`
						imagenter = await getBuffer(`https://pbs.twimg.com/profile_images/560079833107951617/k1VDVKJT.png`)
						client.sendMessage(from, imagenter, image, { caption: `${menuter}`, quoted: mek })
						break

	/*
	]=========> MUSICA <=========[
	*/
				case 'sound1':
		        case 'iri?':
                case 'iri':
					iri = fs.readFileSync('./sound/iri.mp3');
					client.sendMessage(from, iri, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                  break
               
            case 'sound2':
            case 'abangjago':
                iri2 = fs.readFileSync('./sound/abangjago.mp3');
					client.sendMessage(from, iri2, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                break
            case 'tarekses':
            case 'tariksisnode index js':
            case 'sound3':
            case 'tareeksis':
            case 'tareekses':
                	iri3 = fs.readFileSync('./sound/tarekses.mp3');
					client.sendMessage(from, iri3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                break

				case 'clover':
					iri7 = fs.readFileSync('./sound/clover.mp3');
					client.sendMessage(from, iri7, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
					break
			case 'drstone':
                	iri5 = fs.readFileSync('./sound/drstone.mp3');
					client.sendMessage(from, iri5, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                break
            case 'welotka':
            case 'welutka':
            case 'kangcopet':
				iri4 = fs.readFileSync('./sound/welot.mp3');
				client.sendMessage(from, iri4, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                break
			
				case 'sonido4':
                	iri6 = fs.readFileSync('./sound/tuvirg.mp3');
					client.sendMessage(from, iri6, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                break
				case 'bakemo1':
                	iri8 = fs.readFileSync('./sound/bakemo1.mp3');
					client.sendMessage(from, iri8, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                break
				case 'bakemo2':
                	iri9 = fs.readFileSync('./sound/bakemo2.mp3');
					client.sendMessage(from, iri9, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
                break
	/*
	]=========> COSAS DEL BOT <=========[
	*/	
		
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nombre del bot* : ${me.name}\n*PROPIETARIO* : *꧁⟦⸙ꪶ•Λ̸Я̸G̸Ө̸Ŧ̸Σ̸₂₀₁₉•ꫂ⸙⟧^Iᴠᴄ꧂*\n*AUTOR* : AMPIBI\n*Nombre del bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total de contactos bloqueados* : ${blocked.length}\n*EL ESTA ACTIVO DESDE HACE* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				
				case 'speed':
				case 'ping':
						const timestamp = speed();
						const latensi = speed() - timestamp 
						client.sendMessage(from, `Speed: ${latensi.toFixed(4)} _ms_`, text, { quoted: mek})
							break

				case 'blocklist': 
					teks = '𝗕𝗟𝗢𝗖𝗞 𝗟𝗜𝗦𝗧 :\n'
					for (let block of blocked) {
						teks += `┣➢ @${block.split('@')[0]}\n`
					}
					teks += `𝗧𝗼𝘁𝗮𝗹 : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
					
                case 'hidetag':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply('kamu siapa?')
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
					
                               case 'quotemaker':
					var gh = body.slice(12)
					var quote = gh.split("|")[0];
					var wm = gh.split("|")[1];
					var bg = gh.split("|")[2];
					const pref = `Usage: \n${prefix}quotemaker teks|watermark|theme\n\nEx :\n${prefix}quotemaker ini contoh|bicit|random`
					if (args.length < 1) return reply(pref)
					reply(mess.wait)
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=${bg}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {caption: 'Nih anjim', quoted: mek})
					break
					
                               case 'phlogo':
					var gh = body.slice(9)
					var gbl1 = gh.split("|")[0];
					var gbl2 = gh.split("|")[1];
					if (args.length < 1) return reply('Teksnya mana um')
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/textpro?theme=pornhub&text1=${gbl1}&text2=${gbl2}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break

					case 'admin':
            		case 'owner':
            		case 'creator':
                  		client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
       					client.sendMessage(from, 'Este es mi número de propietario >_<, no enviar spam ni bloquearlo',MessageType.text, { quoted: mek} )
           				break

					

					case 'bug':
						const pesan = body.slice(5)
						if (pesan.length > 300) return client.sendMessage(from, '𝗟𝗼 𝘀𝗶𝗲𝗻𝘁𝗼, 𝘁𝗲𝘅𝘁𝗼 𝗱𝗲𝗺𝗮𝘀𝗶𝗮𝗱𝗼 𝗹𝗮𝗿𝗴𝗼, 𝗺𝗮́𝘅𝗶𝗺𝗼 𝟯𝟬𝟬 𝘁𝗲𝘅𝘁𝗼', msgType.text, {quoted: mek})
						var nomor = mek.participant
						const teks1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`
						var options = {
						text: teks1,
						contextInfo: {mentionedJid: [nomor]},
						}
						client.sendMessage('51916659000@s.whatsapp.net', options, text, {quoted: mek})
						reply('Se han informado problemas al propietario del BOT, no se responderá a los informes falsos.')
						break
/*						   
	]=========> MAKER DEL BOT <=========[
*/
					case 'ocr': 
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('𝐄𝐍𝐕𝐈𝐀𝐑 𝐅𝐎𝐓𝐎𝐒 𝐂𝐎𝐍 𝐓𝐈́𝐓𝐔𝐋𝐎 ${prefix}𝗼𝗰𝗿')
					}
					break
				case 'stiker': 
				case 'sticker':
				case 's':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Yah gagal ;(, coba ulangi ^_^`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else {
						reply(`Enviar fotos con subtítulos ${prefix}sticker o respuesta / etiqueta de imagen`)
					}
					break
				case 'getses':
            				if (!isOwner) return reply(mess.only.ownerB)
           			 	const sesPic = await client.getSnapshot()
            				client.sendFile(from, sesPic, 'session.png', '>~<...', id)
            				break
					
				case 'gtts':	
				case 'tts':
					if (args.length < 1) return client.sendMessage(from, 'Código de idioma requerido !!', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, '¿Qué texto estás haciendo voz? es mi voz :v?', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 300
					? reply('El texto significa....')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Bueno, falló ;( , intenta repetir :v')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
	
	/*
	]=========> JUEGOS DEL BOT <=========[
	*/
                case 'truth':
					const trut =['¿Alguna vez te ha gustado alguien? ¿Cuánto tiempo? ',' Si puedes o si quieres, en GC / fuera de GC ¿con quién harás amistad? (¿Puedes ser diferente / del mismo sexo) ',' ¿Cuál es tu mayor miedo? ',' ¿Alguna vez te ha gustado alguien y has sentido a esa persona como tú también? ',' ¿Cómo se llama tu exnovio amigo que una vez te gustó en secreto? ',' ¿Alguna vez le has robado el dinero o el padre de tu madre? ¿La razón? ',' ¿Qué te hace feliz cuando estás triste? ',' ¿Alguna vez has tenido amor no correspondido? si alguna vez con quien? ¿cómo te sientes brou? ',' ¿te ha engañado la gente? ',' lo más temido ',' quién es la persona más influyente en tu vida ',' qué cosas de orgullo te has puesto este año ',' quién es la persona que puede ponerte cachondo ',' ¿Quién es la persona que alguna vez te puso cachondo ',' (bgi, que es musulmán) nunca rezó en todo el día? ',' ¿Quién es el más cercano a tu tipo ideal de pareja aquí? ',' ¿Con quién le gusta jugar? ',' ¿Con quién? rechazar a la gente? ¿La razón por qué? ',' Menciona el incidente que te hizo daño y que todavía recuerdas ',' ¿Qué has logrado este año? ',' ¿Cuál fue tu peor hábito en la escuela?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/K9JQXT2/d0604dc9ecbfdad5e320d3a8a0506da6.jpg`)
					client.sendMessage(from, truteh, image, { caption: '*VERDAD*\n\n'+ ttrth, quoted: mek })
					break
					
				case 'dare':
					const dare =['Envía un mensaje a tu ex y dile "Aún me gustas','enamoramiento telefónico / novia ahora y ss al jugador','pap a un miembro del grupo','Dile a la chica: "ERES TAN HERMOSA" y quedra estar contigo','ss llamada reciente de whatsapp','soltar emoticon "🦄💨" cada vez que escribe en gc / pc durante 1 día','envía una nota de voz y di ¿puedo llamarte bebé?','suelte la cita de la canción / cita, luego etiquete al miembro apropiado para la cita','usar fotos de perfil anime hasta por 3 días','escribir en el idioma local las 24 horas','Cambia el nombre a "Soy una niña linda, Luna" durante 5 horas ',' chatea para contactar con el pedido de acuerdo con tu% de batería, sigue diciéndole "tengo suerte de verte ',' chatea con tu ex y dile" te amo, pgn back ',' registro de voz leído surah al-kautsar ',' dijo "Estoy enamorado de ti, ¿quieres ser mi novia?" al sexo opuesto con el que charlaste por última vez (entrégalo en wa / tele), espera a que responda, si ya ss, pasa aquí','indica tu tipo de novia!','fotos de snap / post novia / crush','grita "ME GUSTA EL CAMOTE" luego envíe usando vn aquí','fotografia tu cara y luego envíasela a uno de tus amigos','envía tu foto con una leyenda, soy un niño adoptado','me gusta el pan nwn','grita "Nehro, te quiero nene" frente a tu casa','Cambie el nombre a "BOWO" durante 24 horas.','Finge estar poseído, por ejemplo: posesión de maung, posesión de langostas, posesión de refrigerador, etc.']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/K9JQXT2/d0604dc9ecbfdad5e320d3a8a0506da6.jpg`)
					client.sendMessage(from, tod, image, { quoted: mek, caption: '*RETO*\n\n'+ der })
					break	
					
				case 'rolette':
					const rolet =['Boom, mala suerte amigo, haz perdido\nIntente denuevo','Vaya suerte tienes amigo, sobreviviste a esta ronda','Boom, mala suerte amigo, haz perdido\nIntente denuevo ','Vaya suerte tienes amigo, sobreviviste a esta ronda','Boom, mala suerte amigo, haz perdido\nIntente denuevo','Vaya suerte tienes amigo, sobreviviste a esta ronda']
					const rol = rolet[Math.floor(Math.random() * rolet.length)]
					role = await getBuffer(`https://i.ibb.co/M2DZqcb/Ea-PROZJXs-AE4-QQz.jpg`)
					client.sendMessage(from, role, image, { caption: '*Juega con Bocchi*\n\n'+ rol, quoted: mek })
					break

				case 'confirmas?':
					const conf =['https://i.ibb.co/Z85HKDv/en-un-rato-te-confirmo.jpg','https://i.ibb.co/qncWWRw/Desconfirmo.jpg','https://i.ibb.co/2qykqmx/confirmamos.jpg','https://i.ibb.co/C7v9qvq/confirmo.jpg']
					const conif = conf[Math.floor(Math.random() * conf.length)]
					confirma = await getBuffer(`${conif}`)
					client.sendMessage(from, confirma, image, { caption: '*EL BOT....*', quoted: mek })
					break
				
				case 'chance':
					if (args.length < 1) return reply('¿Que desea probar?')
					const texty = body.slice(8)
					const lvpc = Math.floor(Math.random() * 101) + 1
					client.sendMessage(from, `_Segun mis claculos super robot la probabilidad de:_\n\n_*${texty}*_\n\nser en realidad de ${lvpc}% posibles`,MessageType.text, { quoted: mek} )
					break

				case 'arg':
					if (args.length < 1) return reply('¿No diras nada?')
					const textar = body.slice(5)
					anu = await fetchJson(`http://simsumi.herokuapp.com/api?text=${textar}&lang=pt`, {method: 'get'})
					resp = (anu.success)
					client.sendMessage(from, `${resp}`,MessageType.text, { quoted: mek} )
					break
				
	/*
	]=========> NFSW DEL BOT <=========[
	*/
				case 'hentai':
					   if (!isNsfw) return reply('NSFW no está activo')
						const hen =['https://cdn.nekos.life/erok/ero_kitsune_093.jpg','','https://cdn.nekos.life/classic/classic254.gif','https://cdn.nekos.life/classic/classic_049.gif','https://cdn.nekos.life/classic/classic_044.gif','https://cdn.nekos.life/classic/classic_003.gif','https://cdn.nekos.life/classic/classic_479.gif','https://cdn.nekos.life/Random_hentai_gif/Random_hentai_gifNB_1438.gif','https://cdn.nekos.life/Random_hentai_gif/Random_hentai_gifNB1023.gif','https://cdn.nekos.life/Random_hentai_gif/Random_hentai_gifNB0524.gif','https://cdn.nekos.life/Random_hentai_gif/Random_hentai_gifNB0852.gif','https://cdn.nekos.life/erok/ero_kitsune_033.png','https://cdn.nekos.life/erok/ero_kitsune_104.jpg','https://cdn.nekos.life/erok/ero_kitsune_004.png','https://cdn.nekos.life/erok/ero_kitsune_071.jpg','https://cdn.nekos.life/erok/ero_kitsune_002.png','https://cdn.nekos.life/erok/ero_kitsune_022.jpg','https://cdn.nekos.life/erok/ero_kitsune_022.jpg','https://cdn.nekos.life/erok/ero_kitsune_055.jpg','https://cdn.nekos.life/erok/ero_kitsune_025.jpg','https://cdn.nekos.life/erok/ero_kitsune_103.jpg','https://cdn.nekos.life/erok/ero_kitsune_028.png','https://cdn.nekos.life/erok/ero_kitsune_014.jpg','https://cdn.nekos.life/erok/ero_kitsune_005.jpg','https://cdn.nekos.life/erok/ero_kitsune_079.jpg','https://cdn.nekos.life/erok/ero_kitsune_046.jpg','https://cdn.nekos.life/erok/ero_kitsune_077.jpg',]
						const henta = hen[Math.floor(Math.random() * hen.length)]
						het = await getBuffer(`${henta}`)
						client.sendMessage(from, het, image, { caption: 'riko xd ', quoted: mek })
						break

				case 'blowjob':
						if (!isNsfw) return reply('NSFW no está activo')
					  	anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=BotWeA`, {method: 'get'})
						imgt = (anu.result)
						pok = await getBuffer(imgt)
						client.sendMessage(from, pok, image, { quoted: mek })
						break

				case 'ihentai':
						if (!isNsfw) return reply('NSFW no está activo')
						anu = await fetchJson(`https://nekos.life/api/v2/img/erok`, {method: 'get'})
						imgt = (anu.url)
						pok = await getBuffer(imgt)
						client.sendMessage(from, pok, image, { quoted: mek })
						break	  

				case 'boobs':
						if (!isNsfw) return reply('NSFW no está activo')
						anu = await fetchJson(`https://nekos.life/api/v2/img/boobs`, {method: 'get'})
						imgt = (anu.url)
						pok = await getBuffer(imgt)
						client.sendMessage(from, pok, image, { quoted: mek })
						break

				case 'nsfwyuri':
						if (!isNsfw) return reply('NSFW no está activo')
						anu = await fetchJson(`https://nekos.life/api/v2/img/yuri`, {method: 'get'})
						imgt = (anu.url)
						pok = await getBuffer(imgt)
						client.sendMessage(from, pok, image, { quoted: mek })
						break

				case 'futanari':
						if (!isNsfw) return reply('NSFW no está activo')
						anu = await fetchJson(`https://nekos.life/api/v2/img/futanari`, {method: 'get'})
						imgt = (anu.url)
						pok = await getBuffer(imgt)
						client.sendMessage(from, pok, image, { quoted: mek })
						break	

				case 'nsfwneko':
						if (!isNsfw) return reply('NSFW no está activo')
						anu = await fetchJson(`https://nekos.life/api/v2/img/lewdkemo`, {method: 'get'})
						imgt = (anu.url)
						pok = await getBuffer(imgt)
						client.sendMessage(from, pok, image, { quoted: mek })
						break

				case 'hentai-recom' :
						if (!isNsfw) return reply('NSFW no está activo')
						anu = fs.readFileSync('./lib/hentairecom.json');
						n = JSON.parse(anu);
						result = n[Math.floor(Math.random() * n.length)]
						var title = `${result.name}`
						var texto = `${result.text}`
						var capitul = `${result.caps}`
						var star = `${result.stars}`
						textosh = `Titulo:${title}\n\nSinopsis: ${texto}\n\nEstresllas: ${star}\n\nCapitulos ${capitul}\n\nLink:`
						buffer = await getBuffer(result.img)
						client.sendMessage(from, buffer, image, {caption: `${textosh}`, quoted: mek})
						break
					
/*
	]=========> ANIME DEL BOT <=========[
	*/			    	
				case 'waifu':
				   anu = await fetchJson(`https://arugaz.herokuapp.com/api/waifu`)
				   buf = await getBuffer(anu.image)
				   texs = ` *anime name* : ${anu.name} \n*deskripsi* : ${anu.desc} \n*source* : ${anu.source}`
				   client.sendMessage(from, buf, image, { quoted: mek, caption: `${texs}`})
				        break
					
                case 'name':
                    teks = body.slice(6)
                    anu = await fetchJson(`https://arugaz.herokuapp.com/api/dewabatch?q=${teks}` , {method: 'get'})
                    thum = await getBuffer(anu.thumb)
					anitext = (anu.result)
                    client.sendMessage(from, thum, image, {quoted: mek, caption: `${anitext}`})
                 	break

				case 'pokemon':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
					
				case 'animegirl':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime%20girl`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
			
				case 'animeimg':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
			
				case 'loli':
						anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=loli`, {method: 'get'})
						reply(mess.wait)
						var n = JSON.parse(JSON.stringify(anu));
						var nimek =  n[Math.floor(Math.random() * n.length)];
						pok = await getBuffer(nimek)
						client.sendMessage(from, pok, image, { quoted: mek })
						break

				case 'bocchi':
						anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=bocchi`, {method: 'get'})
						reply(mess.wait)
						var n = JSON.parse(JSON.stringify(anu));
						var nimek =  n[Math.floor(Math.random() * n.length)];
						pok = await getBuffer(nimek)
						client.sendMessage(from, pok, image, { quoted: mek })
						break

				case 'neko':
						anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=neko`, {method: 'get'})
						reply(mess.wait)
						var n = JSON.parse(JSON.stringify(anu));
						var nimek =  n[Math.floor(Math.random() * n.length)];
						pok = await getBuffer(nimek)
						client.sendMessage(from, pok, image, { quoted: mek })
						break
		
				case 'icon':
						anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=icon%20anime`, {method: 'get'})
						reply(mess.wait)
						var n = JSON.parse(JSON.stringify(anu));
						var nimek =  n[Math.floor(Math.random() * n.length)];
						pok = await getBuffer(nimek)
						client.sendMessage(from, pok, image, { quoted: mek })
						break
               
				
				case 'imagen':
						const imk = body.slice(8)
						anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=${imk}`, {method: 'get'})
						reply(mess.wait)
						var n = JSON.parse(JSON.stringify(anu));
						var nimek =  n[Math.floor(Math.random() * n.length)];
						pok = await getBuffer(nimek)
						client.sendMessage(from, pok, image, {caption: 'Espero que le guste, fue lo mejor que encontre >_< ', quoted: mek })
						break        

/*
	]=========> OTROS DEL BOT <=========[
*/
				
				case 'meme':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=meme`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })				

                case 'dogs':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
			   case 'gato':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=gato`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
					
                		case 'spamcall':
                   			if (args.length < 1) return ('ingrese el número de destino')
                   			weha = body.slice(10)
                   			anu = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${weha}` , {method: 'get'})
                   			client.sendMessage(from, anu.logs, text, {quoted: mek})
                 			break
/*
	]=========> DOWN DEL BOT <=========[
*/			
			
					
				case 'ytmp4':
					if (args.length < 1) return reply('¿Dónde está la URL?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
					
				case 'ytmp3':
					if (args.length < 1) return reply('¿Dónde está la URL?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
				
					case 'play':
	
					  anu = await fetchJson(`http://arugaytdl.herokuapp.com/search?q=${body.slice(6)}`, {method: 'get'})
					 if (anu.error) return reply(anu.error)
					 
					 textdes = `*࿃⃟࿃⃟⚊⚊⚊░⁔⃞🔊⃞⁔░⚊⚊⚊⃟࿃⃟࿃*\n\n*▒⃟⃚⁐⃪ Titulo:*${anu.result.title}\n\n*▒⃟⃚⁐⃪ Duración:*${anu.result.duration}\n\n*▒⃟⃚⁐⃪ Visualizaciones:*${anu.result.viewCount}\n\n*「 Espero que este bien 」*\n\n*『 Solo tiene que esperar a que termine de enviar el archivo⎙ para volver a usarlo』* `
					pok = await getBuffer(anu.result.thumbnail)
					client.sendMessage(from, pok, image, {caption: `${textdes}` , quoted: mek})
					  
					  break			
                		case 'text3d':
              	    			if (args.length < 1) return reply('¿Dónde está el texto sis?')
                    			teks = `${body.slice(8)}`
                    			if (teks.length > 10) return client.sendMessage(from, 'El texto es largo, un máximo de 10 frases', text, {quoted: mek})
                    			buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    			client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     		break
					
			    	case 'fototiktok':
                    			gatauda = body.slice(12)
                    			anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${gatauda}`)
			        	buff = await getBuffer(anu.result)
                    			reply(anu.result)
			        	break
					
			    	case 'map':
                			anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
                			buffer = await getBuffer(anu.gambar)
                			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
					break
               	 		case 'kbbi':
					if (args.length < 1) return reply('¿Qué quieres buscar?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
					reply('Menurut Kbbi:\n\n'+anu.result)
					break
					
                		case 'artinama':
					if (args.length < 1) return reply('¿Qué quieres buscar?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(10)}`, {method: 'get'})
					reply('Menurut nama:\n\n'+anu.result)
					break
					
				
					
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`𝗣𝗿𝗲𝗳𝗶𝘅 𝗯𝗲𝗿𝗵𝗮𝘀𝗶𝗹 𝗱𝗶 𝘂𝗯𝗮𝗵 𝗺𝗲𝗻𝗷𝗮𝗱𝗶 : ${prefix}`)
					break 
					
				case 'hilih': 
					if (args.length < 1) return reply('dame el texto!! >:v')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
					
				case 'tiktokstalk':
					try {
						if (args.length < 1) return client.sendMessage(from, '𝗤𝗨𝗘 𝗡𝗢𝗠𝗕𝗥𝗘 𝗗𝗘 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 ?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('[𝗘𝗥𝗥𝗢𝗥] 𝗣𝗢𝗦𝗜𝗕𝗟𝗘𝗠𝗘𝗡𝗧𝗘 𝗡𝗢𝗠𝗕𝗥𝗘 𝗗𝗘 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 𝗡𝗢 𝗩𝗔́𝗟𝗜𝗗𝗢')
					}
					break
					
				case 'fitnah':	
				case 'fake':          
               				if (!isGroup) return reply(mess.only.group)
                			arg = body.substring(body.indexOf(' ') + 1)
					isi = arg.split(' |')[0] 
					pesan = arg.split('|')[1] 
					pesan2 = arg.split('|')[2] 
                			reply(pesan, isi, pesan2)
                			break
	
                 		case 'linkgc':
				    	if (!isGroup) return reply(mess.only.group)
				    	if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    	linkgc = await client.groupInviteCode (from)
				    	yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    	client.sendMessage(from, yeh, text, {quoted: mek})
			        	break

/*
	]=========> TERMUX DEL BOT <=========[
*/

						case 'tr-troyano':	    
							client.sendMessage(from, '≪━─━─━━─━─◈─━─━━─━─━≫\n\n$ pkg upgrade\n\n$ pkg install bash\n\n$ apt install pv\n\n$ pkg install git\n\n$ git clone https://github.com/Hacking-pch/papaviruz\n\n$ cd papaviruz\n\n$ chmod +x papaviruz.sh\n\n$ bash papaviruz.sh',MessageType.text, { quoted: mek} )
							break

						case 'tr-fotosploit':
							client.sendMessage(from, '≪━─━─━━─━─◈─━─━━─━─━≫\n\n$ pkg update && pkg upgrade -y\n\n$ pkg install -y php\n\n$ pkg install -y python2\n\n$ pkg install -y git\n\n$ cd $HOME\n\n$ git clone https://github.com/Cesar-Hack-Gray/FotoSploit\n\n$ cd FotoSploit\n\n$ ls\n\n$ bash install.sh\n\n$ ./FotoSploit',MessageType.text, { quoted: mek} )
							break

						case 'tr-spam-mj':	
							client.sendMessage(from, '≪━─━─━━─━─◈─━─━━─━─━≫\n\n$ pkg update && pkg upgrade -y\n\n$ pkg install -y python\n\n$ pkg install -y git\n\n$ git clone https://github.com/TheSpeedX/TBomb\n\n$ ls\n\n$ cd TBomb\n\n$ ./TBomb.sh',MessageType.text, { quoted: mek} )
							break

						case 'tr-hack-facek':
							client.sendMessage(from, '≪━─━─━━─━─◈─━─━━─━─━≫\n\n$ apt update && pkg upgrade -y\n\n$ pkg install git -y\n\n$ git clone https://github.com/Cesar-Hack-Gray/scam\n\n$ cd scam\n\n$ ls\n\n$ bash install.sh\n\n$ ls\n\n$ ./phishing.sh',MessageType.text, { quoted: mek} )
							break

/*
	]=========> GROUP DEL BOT <=========[
*/
				case 'tagall':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `┣➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
					
				case 'clearall':
					if (!isOwner) return reply(' *YO SOY QUIEN* ?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('𝗕𝗢𝗥𝗥𝗔𝗥 𝗧𝗢𝗗𝗢 𝗘𝗟 𝗘́𝗫𝗜𝗧𝗢 𝗗𝗘 𝗬𝗔𝗛  :)')
					break
					
			       case 'block':
				 	client.updatePresence(from, Presence.composing) 
				 	client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
					
                case 'unblock':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    	client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵 𝗗𝗶𝘁𝗲𝗿𝗶𝗺𝗮, 𝗺𝗲𝗺𝗯𝘂𝗸𝗮 ${body.slice(9)}@c.us`, text)
					break
					
				case 'leave': 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					await client.leaveGroup(from, '𝗕𝘆𝗲𝗲', groupId)
                    			break
					
				case 'bc': 
					if (!isOwner) return reply(' *YO SOY QUIEN* ?') 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `❮ 𝙋𝙀𝙎𝘼𝙉 𝘽𝙍𝙊𝘼𝘿𝘾𝘼𝙎𝙏 ❯\n\n${body.slice(4)}`})
						}
						reply('𝘿𝙄𝙁𝙐𝙎𝙄𝙊́𝙉 𝘿𝙀 𝙀́𝙓𝙄𝙏𝙊𝙎 ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `❮ 𝙋𝙀𝙎𝘼𝙉 𝘽𝙍𝙊𝘼𝘿𝘾𝘼𝙎𝙏 ❯\n\n${body.slice(4)}`)
						}
						reply('𝘿𝙄𝙁𝙐𝙎𝙄𝙊́𝙉 𝘿𝙀 𝙀́𝙓𝙄𝙏𝙊𝙎 ')
					}
					break
					
			   	case 'setpp': 
                        		if (!isGroup) return reply(mess.only.group)
                       			if (!isGroupAdmins) return reply(mess.only.admin)
                        		if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                       			media = await client.downloadAndSaveMediaMessage(mek)
                         		await client.updateProfilePicture (from, media)
                        		reply('𝗖𝗔𝗠𝗕𝗜𝗢 𝗘𝗫𝗜𝗧𝗢𝗦𝗢 𝗗𝗘 𝗜𝗖𝗢𝗡𝗢 𝗗𝗘 𝗚𝗥𝗨𝗣𝗢')
                			break
					
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('¿Quieres agregar a alguien?')
					if (args[0].startsWith('08')) return reply('Utilice el código de país, mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('No se pudo agregar el destino, tal vez porque es privado, F')
					}
					break
					
				case 'grup':
				case 'group':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'abrir') {
					    reply(`se logro abrir el grupo`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'cerrar') {
						reply(`se logro cerrar el grupo`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
		

            			
					
           			case 'setname':
                			if (!isGroup) return reply(mess.only.group)
			    		if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                			client.groupUpdateSubject(from, `${body.slice(9)}`)
                			client.sendMessage(from, 'Éxito, cambiar el nombre del grupo', text, {quoted: mek})
                			break
					
                		case 'setdesc':
                			if (!isGroup) return reply(mess.only.group)
			    		if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                			client.groupUpdateDescription(from, `${body.slice(9)}`)
                			client.sendMessage(from, 'Éxito, cambio de descripción del grupo', text, {quoted: mek})
               	 			break
					
           			case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝗘𝗧𝗜𝗤𝗨𝗘𝗧𝗔 𝗔𝗟 𝗢𝗕𝗝𝗘𝗧𝗜𝗩𝗢 𝗤𝗨𝗘 𝗤𝗨𝗜𝗘𝗥𝗘𝗦 𝗩𝗢𝗟𝗩𝗘𝗥 𝗠𝗜𝗘𝗠𝗕𝗥𝗢!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗙𝗨𝗜𝗦𝗧𝗘 𝗔𝗗𝗠𝗜𝗡 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`𝗕𝗨𝗘𝗡𝗢 @${mentioned[0].split('@')[0]} 𝗙𝗨𝗜𝗦𝗧𝗘 𝗔𝗗𝗠𝗜𝗡`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
					
				case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝗘𝗧𝗜𝗤𝗨𝗘𝗧𝗔 𝗔𝗟 𝗢𝗕𝗝𝗘𝗧𝗜𝗩𝗢 𝗤𝗨𝗘 𝗤𝗨𝗜𝗘𝗥𝗘𝗦 𝗩𝗢𝗟𝗩𝗘𝗥 𝗔𝗗𝗠𝗜𝗡!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗙𝗘𝗟𝗜𝗖𝗜𝗧𝗔𝗖𝗜𝗢𝗡𝗘𝗦 𝗣𝗢𝗥 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗜𝗥𝗦𝗘 𝗘𝗡 𝗔𝗗𝗠𝗜𝗡 𝗚𝗥𝗢𝗨𝗣:\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`𝗙𝗘𝗟𝗜𝗖𝗜𝗧𝗔𝗖𝗜𝗢𝗡𝗘𝗦🥳 @${mentioned[0].split('@')[0]} 𝗣𝗢𝗥 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗜𝗥𝗦𝗘 𝗘𝗡 𝗔𝗗𝗠𝗜𝗡 𝗗𝗘𝗟 𝗚𝗥𝗢𝗨𝗣 (+_+)`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
					
			     	case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝗘𝗧𝗜𝗤𝗨𝗘𝗧𝗔 𝗔𝗟 𝗢𝗕𝗝𝗘𝗧𝗜𝗩𝗢 𝗤𝗨𝗘 𝗤𝗨𝗜𝗘𝗥𝗘𝗦 MATAR')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗔𝘀𝗲𝗸 𝗱𝗮𝗽𝗮𝘁 𝗺𝗮𝗸𝗮𝗻𝗮𝗻,𝗼𝘁𝘄 𝗸𝗶𝗰𝗸 🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`CHAU CTMR @${mentioned[0].split('@')[0]} 🏃`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				
				case 'happymod':
				  data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=BotWeA`, {method: 'get'})
				  hupo = data.result[0] 
				  teks = `*➸ Nombre*: ${data.result[0].title}\n\n*➸ Version*: ${hupo.version}\n\n*➸ Peso:* ${hupo.size}\n\n*➸ root*: ${hupo.root}\n\n*➸ Precio*: ${hupo.price}\n\n*➸ Link*: ${hupo.link}\n\n*➸ Descarga*: ${hupo.download}`
				  buffer = await getBuffer(hupo.image)
				  client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
				  break
					
				case 'listadmin':
					if (!isGroup) return reply(mess.only.group)
					teks = `LISTA DE ADMINS DEL GRUPO *${groupMetadata.subject}*\n𝗧𝗼𝘁𝗮𝗹 : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
					
				case 'toimg':
					if (!isQuotedSticker) return reply('𝗘𝗧𝗜𝗤𝗨𝗘𝗧𝗘 𝗘𝗟 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 !')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Bueno, falló ;( , intenta repetir :v')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '𝗟𝗜𝗦𝗧𝗢, 𝗔𝗛𝗢𝗥𝗔 𝗣𝗔𝗚𝗔𝗠𝗘 '})
						fs.unlinkSync(ran)
					})
					break
					
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('𝗬𝗮 𝗮𝗰𝘁𝗶𝘃𝗮𝗱𝗼 !!!')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('❬ 𝗘́𝗫𝗜𝗧𝗢 ❭ 𝗔𝗖𝗧𝗜𝗩𝗔𝗥 𝗟𝗔𝗦 𝗙𝗨𝗡𝗖𝗜𝗢𝗡𝗘𝗦 𝗦𝗜𝗠𝗜 𝗘𝗡 𝗘𝗦𝗧𝗘 𝗚𝗥𝗨𝗣𝗢')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('❬ 𝗘́𝗫𝗜𝗧𝗢 ❭ 𝗗𝗘𝗦𝗔𝗖𝗧𝗜𝗩𝗔𝗥 𝗟𝗔𝗦 𝗙𝗨𝗡𝗖𝗜𝗢𝗡𝗘𝗦 𝗦𝗜𝗠𝗜 𝗘𝗡 𝗘𝗦𝗧𝗘 𝗚𝗥𝗨𝗣𝗢')
					} else {
						reply(' *Escriba el comando 1 para activar, 0 para desactivar* \nEJEMLPO: 𝘀𝗶𝗺𝗶𝗵 𝟭')
					}
					break
					
				case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('𝗬𝗔 𝗔𝗖𝗧𝗜𝗩𝗢??𝗳 !!')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ 𝗘́𝗫𝗜𝗧𝗢 ❭ 𝗙𝗨𝗡𝗖𝗜𝗢𝗡 𝗗𝗘 𝗡𝗦𝗙𝗪 𝗔𝗖𝗧𝗜𝗩𝗔𝗗𝗔')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ 𝗘́𝗫𝗜𝗧𝗢 ❭ 𝗙𝗨𝗡𝗖𝗜𝗢𝗡 𝗗𝗘 𝗡𝗦𝗙𝗪 𝗔𝗖𝗧𝗜𝗩𝗔𝗗𝗔')
					} else {
						reply(' *1 PARA ACTIVAR, 0 PARA APAGAR* \nEJEMPLO: 𝗻𝘀𝗳𝘄 𝟭')
					}
					break
			
				case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('ACTIVADO !!!')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝗘́𝗫𝗜𝗧𝗢 ❭ 𝗙𝗨𝗡𝗖𝗜𝗢𝗡 𝗗𝗘 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 𝗔𝗖𝗧𝗜𝗩𝗔𝗗𝗔 ')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝗘́𝗫𝗜𝗧𝗢 ❭ 𝗙𝗨𝗡𝗖𝗜𝗢𝗡 𝗗𝗘 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 𝗗𝗘𝗦𝗔𝗖𝗧𝗜𝗩𝗔𝗗𝗔 ')
					} else {
						reply(' *1 PARA ACTIVAR, 0 PARA APAGAR* \n *EJEMPLO: ${prefix}welcome 1*')
					}
					break
					
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(' *YO SOY* ?') 
					if (args.length < 1) return reply(' *QUIERO ETIQUETAS EN EL CLON >:v !!!* ')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`La foto de perfil se actualizó correctamente con la foto de perfil @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply(' *Bueno, falló ;( , intenta repetir :v* ')
					}
					break
					case 'blowjob1':
						if (isBanned) return reply(ind.baned())
					  if (!isRegistered) return reply(ind.noregis())
					  if (!isPrem) return reply(ind.premium())
						  ranp = getRandom('.gif')
						  rano = getRandom('.webp')
						  anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=BotWeA`, {method: 'get'})
						  if (anu.error) return reply(anu.error)
						  exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
							  fs.unlinkSync(ranp)
							  if (err) return reply(ind.stikga())
							  buffer = fs.readFileSync(rano)
							  client.sendMessage(from, buffer, sticker, {quoted: mek})
							  fs.unlinkSync(rano)
						  })
						  break
					  case 'stickersad':
						if (isBanned) return reply(ind.baned())
					  if (!isRegistered) return reply(ind.noregis())
					  if (!isPrem) return reply(ind.premium())
						  ranp = getRandom('.gif')
						  rano = getRandom('.webp')
						  anu = await fetchJson(`https://tobz-api.herokuapp.com/api/cry?apikey=BotWeA`, {method: 'get'})
						  reply('「❗」 AMOR Pausa 1 MINUTO FUERA ESTE SÍ HERMANO')
						  if (anu.error) return reply(anu.error)
						  exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
							  fs.unlinkSync(ranp)
							  if (err) return reply(ind.stikga())
							  buffer = fs.readFileSync(rano)
							  client.sendMessage(from, buffer, sticker, {quoted: mek})
							  fs.unlinkSync(rano)
						  })
						  break
						  case 'stickerkiss':
						if (isBanned) return reply(ind.baned())
					  if (!isRegistered) return reply(ind.noregis())
					  if (!isPrem) return reply(ind.premium())
						  ranp = getRandom('.gif')
						  rano = getRandom('.webp')
						  anu = await fetchJson(`https://tobz-api.herokuapp.com/api/kiss?apikey=BotWeA`, {method: 'get'})
						  reply('「❗」 AMOR Pausa 1 MINUTO FUERA ESTE SÍ HERMANO')
						  if (anu.error) return reply(anu.error)
						  exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
							  fs.unlinkSync(ranp)
							  if (err) return reply(ind.stikga())
							  buffer = fs.readFileSync(rano)
							  client.sendMessage(from, buffer, sticker, {quoted: mek})
							  fs.unlinkSync(rano)
						  })
						  break
						  case 'stickerhug':
						if (isBanned) return reply(ind.baned())
					  if (!isRegistered) return reply(ind.noregis())
					  if (!isPrem) return reply(ind.premium())
						  ranp = getRandom('.gif')
						  rano = getRandom('.webp')
						  anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hug?apikey=BotWeA`, {method: 'get'})
						  reply('「❗」 AMOR Pausa 1 MINUTO FUERA ESTE SÍ HERMANO')
						  if (anu.error) return reply(anu.error)
						  exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
							  fs.unlinkSync(ranp)
							  if (err) return reply(ind.stikga())
							  buffer = fs.readFileSync(rano)
							  client.sendMessage(from, buffer, sticker, {quoted: mek})
							  fs.unlinkSync(rano)
						  })
						  break
					
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply(' *𝗘𝗡𝗩𝗜𝗔𝗥 𝗙𝗢𝗧𝗢𝗦 𝗖𝗢𝗡 𝗦𝗨𝗕𝗧𝗜́𝗧𝗨𝗟𝗢 𝗢𝗖𝗥* ')
					}
					break
					default:
						if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), '......', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

