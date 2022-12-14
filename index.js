import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

import { Client } from "@notionhq/client"

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.static('public'))

app.get('/indexitems', async (req, res) =>{
    const indexitems = await getData()
    res.json(indexitems)
})
app.listen(PORT, console.log(`server started on port ${PORT}`))





const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const database_id = process.env.NOTION_DATABASE_ID

export async function getData(){
    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST'
    }

    const {results} = await notion.request(payload)
    const myData = results.map((page) => {
        // console.log(page.properties.Tags.multi_select[0].name)
        
        return{
            id: page.id,
            title: page.properties.Name.title[0].text.content,
             tags: page.properties.Tags.multi_select[0].name,
            description: page.properties.Description.rich_text[0].text.content,
        
        }
    })

    return myData
}




// ;(async () =>{
//     const nData = await getData()
//     console.log(nData)
// })()





