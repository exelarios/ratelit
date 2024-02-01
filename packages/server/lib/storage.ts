import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3_BUCKET = "ratelit";

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_ACCESS_SECRET = process.env.AWS_ACCESS_SECRET;

if (!AWS_ACCESS_KEY || !AWS_ACCESS_SECRET) {
  throw new Error("AWS Access keys aren't provided.");
}

const client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_ACCESS_SECRET,
  }
});

async function fetch(key: string) {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  try {
    const url = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });

    if (!url) {
      throw new Error("Failed to generate signed URL for fetching image");
    }

    return url;
  } catch(error) {
    console.error("Failed to retrieve image from AWS-S3:", error);
  }
}

async function upload(file: Blob, path: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const key = path;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: file.type
  });

  try {
    await client.send(command);
    return key;
  } catch(error) {
    console.log(error);
  }
}

export default {
  fetch,
  upload
}