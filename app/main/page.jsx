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
            const [clientPrivateKeyPem, serverPublicKeyPem] = await Promise.all([
                fetch('/keys/client-private.pem').then(res => res.text()),
                fetch('/keys/server-public.pem').then(res => res.text())
            ]);

            const clientPrivateKey = forge.pki.privateKeyFromPem(clientPrivateKeyPem);
            const serverPublicKey = forge.pki.publicKeyFromPem(serverPublicKeyPem);

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
                            <pre className="text-sm text-gray-800 overflow-auto whitespace-pre-wrap">{JSON.stringify(serverEncryptedResponse, null, 2)}</pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                            🔓 <span>Decrypted Message</span>
                        </h2>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <pre className="text-sm text-green-800 font-medium">{decryptedServerResponse}</pre>
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
