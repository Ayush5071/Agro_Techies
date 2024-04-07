import express from "express";
import dotenv from "dotenv";
import connectDB from "../db/index.js";
import fs from "fs";
import { NlpManager } from 'node-nlp';
import path from "path";

const router = express.Router();

dotenv.config({
  path: './.env'
});

connectDB();

const manager = new NlpManager({ languages: ['en'] });

const nlpModelDir = 'C:/Users/ayush/OneDrive/Desktop/Kisaan/src/routes/nlp-model';
const filePath = path.join(nlpModelDir, 'Upfarming.txt');

let lines = [];
try {
  const data = fs.readFileSync(filePath, 'utf8');
  lines = data.split('\n');

  lines.forEach((line, index) => {
    const [question, intent, answer] = line.split(',');
    // console.log('Question:', question);
    // console.log('Intent:', intent);
    // console.log('Answer:', answer);
    if (question && intent && answer) {
      manager.addDocument('en', question, intent.trim());
      manager.addAnswer('en', intent.trim(), answer.trim());
    } else {
      console.error(`Invalid format at line ${index + 1}: ${line}`);
    }
  });
} catch (error) {
  console.error('Error reading file or processing data:', error);
  console.log('Resolved file path:', filePath);
}

router.get('/api/chatbot', async (req, res) => {
  const { message } = req.query;
  const response = await manager.process('en', message);
  res.json(response);
});

router.get('/chatbot', async function(req, res, next) {
  try {
    const intents = []; 
    const answers = []; 

    // Iterate through all lines loaded from the file
    lines.forEach((line, index) => {
      const [question, intent, answer] = line.split(',');
      if (question && intent && answer) {
        intents.push(intent.trim());
        answers.push(answer.trim());
      } else {
        console.error(`Invalid format at line ${index + 1}: ${line}`);
      }
    });


    res.render("chatbot", { intents: intents, answers: answers });
  } catch (error) {
    console.error('Error fetching intents and answers:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get("/",(req,res)=>{
  res.render("index")
})

export default router;
