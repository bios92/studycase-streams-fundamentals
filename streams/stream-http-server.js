import { createServer } from 'node:http'
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        callback(null, Buffer.from(String(transformed)))
    }
}

const server = createServer((request, response) => {
    return request
        .pipe(new InverseNumberStream())
        .pipe(response)
})

server.listen(3334)

// req -> ReadableStream
// res -> WritebleStream