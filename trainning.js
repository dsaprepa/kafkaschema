import kafkaClient from "./kafkaclient.js";

const producer = kafkaClient.producer()

await producer.connect()
await producer.send({
    topic: 'test-topic',
    messages: [
        { key: "12345", value: 'Hello KafkaJS user 1!' },
        { value: 'Hello KafkaJS user 2!' },
        { value: 'Hello KafkaJS user 3!' },
        { value: 'Hello KafkaJS user 4n!' },
    ],
})

await producer.disconnect()


