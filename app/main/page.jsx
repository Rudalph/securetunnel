'use client';
import React, { useState } from 'react';
import forge from 'node-forge';

export default function Page() {
    const [message, setMessage] = useState('Hello from Client!');
    const [signature, setSignature] = useState('');
    const [encryptedAesKey, setEncryptedAesKey] = useState('');
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [sentPayload, setSentPayload] = useState({});
    const [serverEncryptedResponse, setServerEncryptedResponse] = useState({});
    const [decryptedServerResponse, setDecryptedServerResponse] = useState('');
    const [verificationResult, setVerificationResult] = useState('');
    const [error, setError] = useState('');

    const handleSend = async () => {
        try {
            // const [clientPrivateKeyPem, serverPublicKeyPem] = await Promise.all([
            //     fetch('/keys/client-private.pem').then(res => res.text()),
            //     fetch('/keys/server-public.pem').then(res => res.text())
            // ]);

            // const clientPrivateKey = forge.pki.privateKeyFromPem(clientPrivateKeyPem);
            // const serverPublicKey = forge.pki.publicKeyFromPem(serverPublicKeyPem);


            
            // ************************************************************************
            const clientPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRwTGMgw9FmNgF
vXg0oPwW/e3suyIqmQXLaFxCvaepOtOjnkG3A4JqzNR+PtGxKqBnEiGJ1he3zmam
4Uwm0XK5whkVjr6JFx1kqu0/PFnQ9wIZcFCEqoOOHSupqBgxjFe63gbMo+IR9w1h
PF4TE+ysQKdv6RuZEYATDCYEs301l5bGOaxgFFuvLJQSJRSTuPpWMUjn3nI+rtPW
riyV2mpkpg+8tSvNSQwf1uibIlyzugCeg/M61M3tylyxE4o4V+cRRyRXHDTMcogZ
+lU0szKTfAH+SWKp5dU63Wo1eRdfWcKau3VlFMIF+OcNBgckWprDih0xYflTuWWB
eyrgU3rFAgMBAAECggEAAMaDBE5bhxvtukoXGPXqTBevFl1V1zLX4bcnwSslIzSu
6jtDT5Kd36zrTH36ZkjlxZFGdbyahQh8v1KKMdgCFj7pces/1EGNOdCMUT55noT8
kTS/GOrspurnepBBtgcbHba6A94Iq952nG0nyvjbf3xwkkXZNxKYGIHYtJmyhtXK
PGQNkTQfhq+OsEn+WkklrtnRgM413UJWeWSbfhYl3FMk0zcpFMQKrJTY88gBMGt4
/cvYRLXXAnbrOI+7r8Vkyqqfghtb+VA7AONKgvg+hfRMfu1DlgQ8d95Hbx4H3bFm
rzcZJBKxNIsdp0z/3F3A+A/eafXNpb8Bk1bPGWn/2QKBgQDIGZKdH0a5XopkGFW4
bK2sMu4U5vckDEXS+k5TZ9Y3CG1MdGg/sWiPQ6o3yi8YA0bftWgfhSGUQrikTKQR
34av/ko0yhJbr1Zg5zfFCYBIhBMNB8Sc+ePLfN2lIbAyGYaCSZtjIR++HdJpkx3c
E0LZWNf7Rxv0QtL7BDrotIyDzwKBgQC6eQtvP4/prNcFgOVnse9td1SQjCCSn+f5
t1vFlJUgaa3iWHbM1gkJX7UcCn8Jo7oL6Pv2i4Zl/N2Tkrmwgxk+3Jh2mhtpBHxZ
SJIOQ5uL7v1t8czW27ParM7YHvJE7Mmsh54Yv231S0ehZGEyYqFMkL/6ZHwmroX/
CfCj52v5KwKBgQC9UNyTBYVPWnAK1a88Zq5GDoWMhxzqISZqvuEeLk7REIsAW95J
7JqlePpyADtgN7F1dFeIAthLQnkZEV3lfxsaJbeljE2kKxbJZdkw9ZVGhpbTrDbL
4e0wl/nIA0CFlfraB7QZLLywjdyGgGcu0ZZctp7ZoWSETDj6vvzRMAkFpwKBgFiF
M7do/iFYym4zZTOXlWhquHsx+hiAzneN4oPl5/EOGdyUUDkm9f08MNaR6QKjdaNH
w6yjSXbK1kjC42F2qppb0AilWZO97GXZ/HPHBmUkW6xAmBP7EeMiG8Me1bWAjrBX
ZOasoT9LsEJeS4HGrnmRUYFFCGa4fKW4i0LTjj8nAoGASoTdd7UG46aX8wmbG1ap
Wpp1dQtMBDXZL8NY08xiAgpe6DYY3zlBP9tY0MrMO7FGhPLbOzt0Uu47wGpoNk6S
Sx6mLvdA2otutx7CdGhnceks8JhLxLiXUodzhg8RYu9FsWpeB3vKz6fXFx6m68wF
G4PWnw4um1hK8G3POZMQ57U=
            -----END PRIVATE KEY-----`;

            const serverPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwM+ZE/WI5SIqb+nT7k67
EyRc41NGYjtftSlMvIokp4yFB6UiNEdDGUg/VbGTOjQDe7tA19csVjFd7ABp7k1Q
L94DbhlLKgNykiIOfJExA8npKKRJeUUClEwEbXhHPzO1WQR5l0MUbJPmxgwS8zsD
PC8rEiKZoHucSchIq8CPQckA6IVHgorcdZ6U/0L0Qf4glqhRh2jh79dPDbyrnKP5
nMakDNk2AGhprzeUOD6mdLyDVgrpHc+qgEMQiTQ7SczaVl3NRyArUxDA0fiLiFTv
Hr6RhYLZiTxndPeArtV5REGLJJPYYgdpiqg71/OSP0J92sZHXOHqCGc7uNltjuyB
/wIDAQAB
-----END PUBLIC KEY-----`;

            const clientPrivateKey = forge.pki.privateKeyFromPem(clientPrivateKeyPem);
            const serverPublicKey = forge.pki.publicKeyFromPem(serverPublicKeyPem);
            // ************************************************************************


            const md = forge.md.sha256.create();
            md.update(message, 'utf8');
            const signed = forge.util.encode64(clientPrivateKey.sign(md));
            setSignature(signed);

            const jsonPayload = JSON.stringify({ message, signature: signed });

            const aesKey = forge.random.getBytesSync(32);
            const iv = forge.random.getBytesSync(16);
            const cipher = forge.cipher.createCipher('AES-CBC', aesKey);
            cipher.start({ iv });
            cipher.update(forge.util.createBuffer(jsonPayload, 'utf8'));
            cipher.finish();
            const encrypted = cipher.output.getBytes();
            const encryptedMessage64 = forge.util.encode64(encrypted);
            setEncryptedMessage(encryptedMessage64);

            const encryptedKey = serverPublicKey.encrypt(aesKey, 'RSA-OAEP');
            const encryptedKey64 = forge.util.encode64(encryptedKey);
            setEncryptedAesKey(encryptedKey64);

            const payload = {
                encryptedKey: encryptedKey64,
                iv: forge.util.encode64(iv),
                encryptedData: encryptedMessage64
            };

            setSentPayload(payload);

            const res = await fetch('/api/secure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            setServerEncryptedResponse(data);

            const decryptedAesKey = clientPrivateKey.decrypt(
                forge.util.decode64(data.encryptedKey),
                'RSA-OAEP'
            );

            const decipher = forge.cipher.createDecipher('AES-CBC', decryptedAesKey);
            decipher.start({ iv: forge.util.decode64(data.iv) });
            decipher.update(forge.util.createBuffer(forge.util.decode64(data.encryptedData)));
            decipher.finish();

            const decrypted = decipher.output.toString();
            const parsed = JSON.parse(decrypted);
            setDecryptedServerResponse(parsed.message);

            const verifyMd = forge.md.sha256.create();
            verifyMd.update(parsed.message, 'utf8');
            const isValid = serverPublicKey.verify(
                verifyMd.digest().bytes(),
                forge.util.decode64(parsed.signature)
            );

            setVerificationResult(isValid ? '✅ Signature Verified' : '❌ Signature Invalid');
            setError('');
        } catch (err) {
            setError('❌ Error: ' + err.message);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto bg-white mt-3">
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">🔐 Secure Communication Demo</h1>
                <p className="text-gray-600">End-to-end encrypted messaging demonstration</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
                <label className="block font-semibold text-black mb-3">1. Client Message</label>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your secure message..."
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                    Send Secure Message
                </button>
            </div>

            {signature && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            ✍️ <span>Digital Signature</span>
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <pre className="text-sm text-gray-800 overflow-auto whitespace-pre-wrap break-all">{signature}</pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            🔐 <span>AES Encrypted Message</span>
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <pre className="text-sm text-gray-800 overflow-auto whitespace-pre-wrap break-all">{encryptedMessage}</pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            🔑 <span>RSA Encrypted AES Key</span>
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <pre className="text-sm text-gray-800 overflow-auto whitespace-pre-wrap break-all">{encryptedAesKey}</pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            📦 <span>Server Payload</span>
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <pre className="text-sm text-gray-800 overflow-auto whitespace-pre-wrap">{JSON.stringify(sentPayload, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            )}

            {serverEncryptedResponse?.encryptedData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            📬 <span>Server Response</span>
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-800 overflow-auto whitespace-pre-wrap">{JSON.stringify(serverEncryptedResponse, null, 2)}</div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            🔓 <span>Decrypted Message</span>
                        </h2>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <div className="text-sm text-green-800 font-medium">{decryptedServerResponse}</div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            ✅ <span>Verification</span>
                        </h2>
                        <div className={`p-4 rounded-lg border ${verificationResult.includes('❌')
                                ? 'bg-red-50 border-red-200 text-red-700'
                                : 'bg-green-50 border-green-200 text-green-700'
                            }`}>
                            <div className="font-medium">{verificationResult}</div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    <div className="font-medium">{error}</div>
                </div>
            )}
        </div>
    );
}