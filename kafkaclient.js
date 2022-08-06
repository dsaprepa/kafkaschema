import {Kafka} from "kafkajs";

const kafkaClient = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092', 'localhost:9092'],
    authenticationTimeout: 10000,
    reauthenticationThreshold: 10000,
    ssl: true,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: 'my-username',
        password: 'my-password'
    },
    connectionTimeout: 3000,
    requestTimeout: 25000,
    enforceRequestTimeout: false,
    retry: {
        initialRetryTime: 100,
        retries: 8
    },
    logLevel: logLevel.ERROR,

})

export default kafkaClient;