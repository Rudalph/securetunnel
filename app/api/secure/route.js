import fs from 'fs';
import path from 'path';
import forge from 'node-forge';

export async function POST(req) {
  try {
    const body = await req.json();
    const { encryptedKey, iv, encryptedData } = body;

    // Load RSA keys
    // const keysPath = path.resolve('./public/keys');
    // const serverPrivateKey = forge.pki.privateKeyFromPem(fs.readFileSync(`${keysPath}/server-private.pem`, 'utf8'));
    // const clientPublicKey = forge.pki.publicKeyFromPem(fs.readFileSync(`${keysPath}/client-public.pem`, 'utf8'));

    // ********************************************************************************************
    const serverPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAz5kT9YjlIipv
6dPuTrsTJFzjU0ZiO1+1KUy8iiSnjIUHpSI0R0MZSD9VsZM6NAN7u0DX1yxWMV3s
AGnuTVAv3gNuGUsqA3KSIg58kTEDyekopEl5RQKUTARteEc/M7VZBHmXQxRsk+bG
DBLzOwM8LysSIpmge5xJyEirwI9ByQDohUeCitx1npT/QvRB/iCWqFGHaOHv108N
vKuco/mcxqQM2TYAaGmvN5Q4PqZ0vINWCukdz6qAQxCJNDtJzNpWXc1HICtTEMDR
+IuIVO8evpGFgtmJPGd094Cu1XlEQYskk9hiB2mKqDvX85I/Qn3axkdc4eoIZzu4
2W2O7IH/AgMBAAECggEAAa6641gAE7iagTNO3grO11BsBRafC+ozubUWDj3wXiWI
rA2BwM4JMY/JVoCZspptZPRR3da3wTrMdIV4AMd1vMbMGRDC1w3q2O6cjMBUzd31
stAxzSUDUqYrkoVhrchp1TbuSE0idDFOnfAEb4RWapbvLvw66SuBX710ZBdM++7d
HpOmEq3koQvm6N6Zam0KddKzeBKpQF5WTKM8I8sbwsZZjnAKUaZ2L2SJdXpvEpG4
YHMOWZ6X6rGxg1M/eJ8gdgguaBlRQvAXCQWjQkYzP+MCqlVppRwRxrFAK7QOQqfv
hNbmQfmvuI/9u30eyn3aQnw/oB46lkQxf2g/+udIfQKBgQDtmiP7OjsqgrymqFiS
oWme9TL/T31cGIbKvammkBwE+I7+Mrd7X3jLtVBH2HoMNk6muyztbUTjnUzbl7F8
hNfWM2n9H8jrL71H9r6svh8H9M8L5WlsXIbosuKYvF9nrWd/vjIRDClBuSjJmkSV
1pyg2FBEf3B+T10dcO99UfK9YwKBgQDPvZX2PD2P9LQz6gDE/XAqOX2yBef5w5+3
k+t1khUdNE4PaLQfqcNUoUNDaif/oX45dQcTbMvNKLKzb33SqGYvWfJ/aPPk7k21
rxoNYgU8IUT/AMwhVgTSWQ41RgWj3qdLYKThOEJ4o3naaeLJMcssOShjHtzCp6Kv
2aQdHJVptQKBgEXtj5lo0fD4+TyzXx4Ik2VNFO0/H83zCfixSTTUROrRnIQDuSx+
NLb/bdk3RPRDJ3K6s8ZM2nGC4hPe2UWkc0F/cDonGKLfMf30CLoeWlOlISqHIjfa
I3po63e4OPvydPuLpoCN67aEIBT1aioPN5m/ECCYwSrrgKQhkNp5O8+xAoGBAK8B
fdXkRdCCS1T4qxFImDdaG2Pfyd8FSAX1HQT8vcDOkXw1rpiGAUHIYMvoIC4gNB/f
UMiyfLYmtPSo1gyjRQJa+gkPt3eCsgB+tKnVi6duN5vDZjQnLQSvdWK3zISSS8ka
b4w0QvsybLLtRNpNkmV8+WMXWs65Pjp6VOEZdV2JAoGAOZHfKYrh8O57KjRGtTMQ
7be+pP9/ZiqLwDv5JI2dKE9VUsNZf4qdN/2qJlnoXHnnZTRnsIbO91cw50ONrgN0
l9zW5PaM4YEg5eA5BSFKqL/Ig+JN5XC1qxgY7x3d3R9gtT9DMPJDKTAFO38mRjRX
4m7Fnlt7lWkirB/2Y8FkfXE=
-----END PRIVATE KEY-----`;

    const clientPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkcExjIMPRZjYBb14NKD8
Fv3t7LsiKpkFy2hcQr2nqTrTo55BtwOCaszUfj7RsSqgZxIhidYXt85mpuFMJtFy
ucIZFY6+iRcdZKrtPzxZ0PcCGXBQhKqDjh0rqagYMYxXut4GzKPiEfcNYTxeExPs
rECnb+kbmRGAEwwmBLN9NZeWxjmsYBRbryyUEiUUk7j6VjFI595yPq7T1q4sldpq
ZKYPvLUrzUkMH9bomyJcs7oAnoPzOtTN7cpcsROKOFfnEUckVxw0zHKIGfpVNLMy
k3wB/kliqeXVOt1qNXkXX1nCmrt1ZRTCBfjnDQYHJFqaw4odMWH5U7llgXsq4FN6
xQIDAQAB
-----END PUBLIC KEY-----`;

    const serverPrivateKey = forge.pki.privateKeyFromPem(serverPrivateKeyPem);
    const clientPublicKey = forge.pki.publicKeyFromPem(clientPublicKeyPem);
    // ********************************************************************************************

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
    const responseMessage = `I am server. Your message was: ${message}`;
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
