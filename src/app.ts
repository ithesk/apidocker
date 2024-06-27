import { addKeyword, createBot, createFlow, createProvider, MemoryDB } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'


const flowBienvenida = addKeyword('hola').addAnswer('Hola, ¿en qué puedo ayudarte?')

const main = async () => {  
     const provider = createProvider(BaileysProvider)

     provider.initHttpServer(3002)
     provider.http?.server.post('/send-message', handleCtx(async (bot, req, res)  => {
      const body = req.body 
      const message = body.message
      const mediaUrl = body.mediaUrl
      const phone = body.phone
      console.log(body) 
      await bot.sendMessage(phone, message,{

         media: mediaUrl
      })
         
     }))
     await createBot({
            flow: createFlow([]),
            database: new MemoryDB(),
            provider 
            })
    }

    main()

