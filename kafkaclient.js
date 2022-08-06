import {Kafka, logLevel} from "kafkajs";
import fs from 'fs'
import ip from 'ip'
import config from 'config';

const {  client } = config.get("kafka")
console.log(`The config client value is: ${JSON.stringify(client, null, 4)}`)

const host = process.env.HOST_IP || ip.address()


const kafkaClient = new Kafka({

    logLevel: logLevel.INFO,
    brokers: [`${host}:9094`, `${host}:9097`, `${host}:9100`],
    clientId: 'example-consumer',
    ssl: {
        servername: 'localhost',
        rejectUnauthorized: false,
        ca: [fs.readFileSync('./testHelpers/certs/cert-signed', 'utf-8')],
    },
    sasl: {
        mechanism: 'plain',
        username: 'test',
        password: 'testtest',
    },
    authenticationTimeout: 10000,
    reauthenticationThreshold: 10000,
    connectionTimeout: 3000,
    requestTimeout: 25000,
    enforceRequestTimeout: false,
    retry: {
        initialRetryTime: 100,
        retries: 8
    },
})

export default kafkaClient;