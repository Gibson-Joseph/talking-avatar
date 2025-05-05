import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';

const AUDIO_FILE_PATH = process.env.AUDIO_FILE_PATH; // Ensure this is set

export async function POST() {
  const audioFile = path.join(AUDIO_FILE_PATH!, 'zcare.ogg'); // Location where the file will be saved
  const message_uuid = new Date().getTime();

  if (!fs.existsSync(audioFile)) {
    return new Response('Audio file not found in assets', {
      status: 404,
    });
  }

  const outputFile = path.join(AUDIO_FILE_PATH!, `${message_uuid}.json`);

  try {
    // Ensure directory exists
    fs.mkdirSync(AUDIO_FILE_PATH!, { recursive: true });

    // Read the audio file from the assets folder
    const buffer = fs.readFileSync(audioFile); // Read file as buffer

    // Save audio file to the desired location
    fs.writeFileSync(audioFile, buffer);

    // Run rhubarb binary
    await new Promise<void>((resolve, reject) => {
      execFile(
        './Rhubarb-Lip-Sync-1.14.0-Linux/rhubarb',
        ['-f', 'json', '-o', outputFile, audioFile, '-r', 'phonetic'],
        (error, stdout, stderr) => {
          if (error) {
            console.error(stderr);
            return reject(error);
          }
          resolve();
        }
      );
    });

    // Read transcript
    const lipSync = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
    console.log(lipSync);

    // Clean up files
    fs.unlinkSync(outputFile); // Optionally delete the output JSON file after processing

    // return Response.json({ lipSync }, { status: 200 });
    return Response.json(
      {
        lipSync: {
          ...lipSync,
          metadata: { ...lipSync.metadata, soundFile: '/static/zcare.ogg' },
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response('Failed to process audio with Rhubarb', {
      status: 500,
    });
  }
}
