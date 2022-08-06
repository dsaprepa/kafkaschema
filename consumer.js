import kafkaClient from "./kafkaclient.js";
import config from 'config';
import {PartitionAssigners} from "kafkajs"

const {  client } = config.get("kafka")
console.log(`The config client value is: ${JSON.stringify(client, null, 4)}`)

const consumer = kafkaClient.consumer({ groupId: 'test-group' })

await consumer.connect()
await consumer.subscribe({
    topic: 'test-topic',
    fromBeginning: true,
    groupId: "my-kafka-consumer",
    sessionTimeout: 30000,
    rebalanceTimeout: 60000,
    heartbeatInterval: 3000,
    metadataMaxAge: 300000,
    allowAutoTopicCreation: false,
    maxBytesPerPartition: 1048576, //1MB
    minBytes: 1,
    maxBytes: 10485760, //(10MB)
    maxWaitTimeInMs: 5000,
    retry: { retries: 5 },
    partitionAssigners: [PartitionAssigners.roundRobin],
})

await consumer.run({
    autoCommitInterval: 5000,
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log({
            headers: message?.headers,
            key: message.hasOwnProperty("key") ? message.key.toString() : "None",
            partition: partition,
            value: message.value.toString(),
        })
    },
})



