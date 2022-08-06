import kafkaClient from "./kafkaclient.js";



const consumer = kafkaClient.consumer({ groupId: 'test-group' })

await consumer.connect()
await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            headers: message?.headers,
            key: message.hasOwnProperty("key") ? message.key : "None",
            partition: partition,
            value: message.value.toString(),
        })
    },
})