import kafkaClient from "./kafkaclient.js";
import {CompressionTypes} from "kafkajs"
const producer = kafkaClient.producer()

await producer.connect()

setInterval(() =>  producer.send({
    CompressionTypes:  CompressionTypes.None,
    topic: 'test-topic',
    messages: [
        { key: "12345", value: 'Hello KafkaJS user 1!' },
        { key: 'key1', value: 'hello world' },
        { key: 'key2', value: 'hey hey!' }
    ],
}), 2000)

// await producer.disconnect()


