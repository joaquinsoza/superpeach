import { passkeyServer } from "./common-server";

export async function send(xdr: string) {
    return fetch("/api/send", {
        method: "POST",
        body: xdr,
    }).then(async (res) => {
        if (res.ok) return res.json()
        throw await res.json();
    });
}

export async function getContractId(signer: string) {
    const contractId = await passkeyServer.getContractId({ keyId: signer })
    return contractId;
}