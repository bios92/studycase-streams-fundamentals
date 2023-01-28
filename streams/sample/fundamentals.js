// Netflix & Spotify

// Importação de clientes via CSV
// 1gb - 1.000.000
// POST /upload import.csv

// 10mb/s - 100s para subir 1gb

// 100s -> Inserção no banco de dados

// 10bmb/s -> 10.000 linhas (Podemos processar enquanto o arquivo ta sendo lendo)

// Readable Streams / Writeble Steams

//Tudo que o usuário escreve no terminal

// Stream -> 
// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    //Enviar dados, fornecer informações
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

//Sream de escrita recebem dados de uma stream de leitura
class MultiplyByTenStream extends Writable {
    // Chunk - é o pedaços que lemos na stream de leitura
    // Enconding - Como essa enformação ta codificada
    // Callback - Executa quando termia o processamento
    _write(chunk, enconding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

//Uma stream utilizada no intermediario
class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenStream())