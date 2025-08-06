import fs from 'fs';
import path from 'path';
import forge from 'node-forge';

export async function POST(req) {
  try {
    const body = await req.json();
    const { encryptedKey, iv, encryptedData } = body;

    // Load RSA keys
    const keysPath = path.resolve('./public/keys');
    const serverPrivateKey = forge.pki.privateKeyFromPem(fs.readFileSync(`${keysPath}/server-private.pem`, 'utf8'));
    const clientPublicKey = forge.pki.publicKeyFromPem(fs.readFileSync(`${keysPath}/client-public.pem`, 'utf8'));

    // Step 1: Decrypt AES key using server's private key
    const aesKey = serverPrivateKey.decrypt(forge.util.decode64(encryptedKey), 'RSA-OAEP');

    // Step 2: Decrypt the message using AES
    const decipher = forge.cipher.createDecipher('AES-CBC', aesKey);
    decipher.start({ iv: forge.util.decode64(iv) });
    decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedData)));
    const pass = decipher.finish();
    if (!pass) {
      return new Response(JSON.stringify({ error: 'Decryption failed' }), { status: 400 });
    }

    const decrypted = decipher.output.toString();
    const parsed = JSON.parse(decrypted);
    const { message, signature } = parsed;

    // Step 3: Verify the client's signature
    const md = forge.md.sha256.create();
    md.update(message, 'utf8');
    const isValid = clientPublicKey.verify(md.digest().bytes(), forge.util.decode64(signature));

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid client signature' }), { status: 400 });
    }

    console.log('✅ Server received and verified:', message);

    // Step 4: Prepare server response
    const responseMessage = 'Hello from Server!';
    const responseMd = forge.md.sha256.create();
    responseMd.update(responseMessage, 'utf8');

    const responseSignature = forge.util.encode64(serverPrivateKey.sign(responseMd));
    const responsePayload = JSON.stringify({
      message: responseMessage,
      signature: responseSignature
    });

    // Step 5: Encrypt response with AES
    const aesKeyRes = forge.random.getBytesSync(32); // AES-256
    const ivRes = forge.random.getBytesSync(16);     // 128-bit IV
    const cipher = forge.cipher.createCipher('AES-CBC', aesKeyRes);
    cipher.start({ iv: ivRes });
    cipher.update(forge.util.createBuffer(responsePayload, 'utf8'));
    cipher.finish();
    const encryptedResponseData = cipher.output.getBytes();

    // Step 6: Encrypt AES key with client’s public key
    const encryptedAesKeyRes = clientPublicKey.encrypt(aesKeyRes, 'RSA-OAEP');

    // Step 7: Send encrypted response
    return new Response(JSON.stringify({
      encryptedKey: forge.util.encode64(encryptedAesKeyRes),
      iv: forge.util.encode64(ivRes),
      encryptedData: forge.util.encode64(encryptedResponseData)
    }), { status: 200 });
  } catch (err) {
    console.error('❌ Error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
