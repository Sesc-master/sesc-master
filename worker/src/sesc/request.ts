import {request, RequestOptions} from "node:https";
import {Buffer} from "node:buffer";
import {env} from "process";

const lockDelay = parseInt(env.SESC_REQUEST_LOCK_DELAY ?? "10000");
let lastLockTime = 0;

type HTTPSResponse = {
    status: number,
    body: string
}

const HTTPSRequest = (options: string | RequestOptions | URL) => new Promise<HTTPSResponse>((resolve, reject) => {
    let body = Buffer.alloc(0);

    let clientRequest = request(options, (res) => {
        res.on("data", (chunk: Buffer) => {
            body = Buffer.concat([body, chunk]);
        });

        res.on("end", () => {
            resolve({
                status: res.statusCode ?? 400,
                body: body.toString()
            });
        });

        res.on("error", reject);
    });

    clientRequest.on("timeout", () => reject("timeout"));
    clientRequest.on("error", reject);
    clientRequest.end();
});

export default async function SESCRequest(options: string | RequestOptions | URL): Promise<string> {
    while (true) {
        if (Date.now() - lastLockTime < lockDelay) continue;

        try {
            let response = await HTTPSRequest(options);

            if (response.status == 502) {
                lastLockTime = Date.now();
                continue;
            }

            if (!response.body.includes("Page is being generated.") && response.status == 200) return response.body;
        }
        catch (error) {
            lastLockTime = Date.now();
        }
    }
}