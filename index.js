import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import readXlsxFile from 'read-excel-file/node'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const rows = await readXlsxFile('./financial-statements.XLSX')

const openai = new OpenAIApi(configuration);


const question = 'extract values from this csv file and translate all texts to English, present in json form'
const fileContent = rows.toString().substring(0, 1000)

console.log('question:', question)

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    { role: 'user', content: question },
    { role: 'user', content: fileContent },
  ],
});

for (const choice of response.data.choices) {
  console.log(choice.message.content)
}
