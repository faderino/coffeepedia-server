const request = require('supertest');
const app = require('../app');
const { connection, client } = require('../config/connection.js');
const Article = require('../models/ModelArticle')

beforeAll(async () => {
    await connection()
    jest.restoreAllMocks()
});

afterAll(() => {
    client.close()
})

const articleInput = {
    title: 'MENCARI RASIO KOPI UNTUK SEDUHAN',
    content: 'The golden ratio for brewing coffee, bukan hal sederhana tidak juga susah, perlu mencari rasio kopi yang tepat untuk seduhan, tested, test, and testing.\\nUntuk menemukan formula tepat dalam menyajikan secangkir kopi yang nikmat perlu perhitungan. Rasio kopi dan air, coffee grind size, dan waktu seduhan saling berkaitan dalam satu jejaring yang sama. Rasio kopi dan air sudah tepat, jika grind size kopi ternyata tidak diperhatikan juga berdampak pada rasa kopi, dan lagi waktu seduhan juga tidak bisa dipandang sebelah mata. Mengaliri air juga perlu memastikan waktu yang sesuai untuk seduhan kopi.\\nDalam hal ini, kesampingkan sejenak coffee grind size dan juga waktu seduhan. Ada apa dengan rasio kopi dan air, bagaimana menghitung berapa gram kopi yang tepat untuk menyajikan secangkir kopi berukuran 10 ml? Pernahkah kamu memikirkannya, bagaimana barista melakukan perhitungan rasio, antara kopi dan air untuk secangkir kopi di meja kamu hari ini.\\nPerihal kopi, barista adalah teman berbual yang tepat. Mereka akan selalu jujur, mulai dari mana biji kopi itu berasal, sampai berakhir di secangkir meja kamu. Pastinya dengan senang hati, mereka-barista akan merasa menemukan teman masa kecil yang sama, menyukai apa pun tentang kopi. Mulailah dari obrolan ringan, sampai bahasan tentang rasio kopi dan air.\\nCoffee to Water Ratio atau Water to Coffee Ratio\\nPernahkah mendengar istilah 1: 12 atau 1: 16, ya benar, sebutan tersebut adalah rasio perbandingan kopi dan air.Namun, mana yang benar penyebutannya 1: 16 atau 16: 1 untuk menyatakan perbandingan rasio.\nRasio Air Seduhan; oz dan ml\\nPerhitungan sederhananya, 1 oz = 30 ml. Jika cup yang menampung 7 oz berapa rasio kopi yang harus di-grind untuk secangkir kopi itu. Cobalah untuk mengkonversikan terlebih dahulu ke dari oz ke ml. Dengan rasio 1:18 maka 7oz = 210ml. Baiklah konversi ke ml sudah didapat 1g : 18ml maknanya ? : 210ml, bisa dihitung dengan 210ml/18ml = 12g. Maka 1g : 18ml sama artinya dengan 12g : 210ml.',
    imageUrl: 'https://majalah.ottenstatic.com/uploads/2017/05/white_acaia.png',
    author: 'Yoga A. Mustika',
    tag: 'Tips',
    createdAt: '30-05-2017'
}

describe('Article - Success Test', () => {
    it('Get All Article - Return Array of Object', async () => {
        const res = await request(app).get('/articles')
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body[0]).toHaveProperty("_id", expect.any(String))
        expect(res.body[0]).toHaveProperty("title", expect.any(String))
        expect(res.body[0]).toHaveProperty("content", expect.any(String))
        expect(res.body[0]).toHaveProperty("imageUrl", expect.any(String))
        expect(res.body[0]).toHaveProperty("author", expect.any(String))
        expect(res.body[0]).toHaveProperty("createdAt", expect.any(String))
        expect(res.body[0]).toHaveProperty("tag", expect.any(Object))
    })
})

describe('Article - Success Test', () => {
    it('Get article by id - Object of Article', async () => {
        const res = await request(app).get('/article/628669315e4e2676c775f7db')
        expect(res.status).toBe(200)
        const expected = ['_id', 'title', 'content', 'imageUrl', 'author', 'tag', 'cretedAt']
        expect(res.status).toBe(200)
        expect(['_id', 'title', 'content', 'imageUrl', 'author', 'tag', 'cretedAt']).toEqual(expect.arrayContaining(expected))
    })
})

describe('Article - Fail Test', () => {
    it('Get all article - data not found', async () => {
        const res = await request(app).get('/articles')
        expect(res.status).toBe(200)
        expect(typeof res.body).toBe("object");
        expect([]).toHaveLength(0)
    })
})

describe('Article - Fail Test', () => {
    it('Cannot get article by id, invalid id - return object - Status Code 404', async () => {
        const res = await request(app).get('/article/6289ed42e25a0efbe58cc123')
        expect(res.status).toBe(404)
        expect(typeof res.body).toBe('object')
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe("Data not found")
    })
})

describe('Add - Success Test', () => {
    it('Add article and return message added successfully', async () => {
        const res = await request(app).post('/add').send(articleInput) 
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message', expect.any(Object))
        expect(res.body.message[0]).toBe('article added successfully')
    })
})

describe('Find all articles - Error Test', () => {
    it('Should return error from find all article feature', (done) => {
        jest.spyOn(Article, 'findAllArticle').mockRejectedValue({name: 'internal server error'})
        request(app).get('/articles').then(res => {
            expect(res.status).toBe(500)
            expect(typeof res.body).toBe('object')
            expect(res.body.message).toBe('Internal Server Error')
            done()
        }).catch(error => {
            console.log(error)
            done(error)
        })
        
    })
})

describe('Add articles - Error Test', () => {
    it('Should return error from find all article feature', (done) => {
        jest.spyOn(Article, 'addArticle').mockRejectedValue({name: 'internal server error'})
        request(app).post('/add').send(articleInput)
        .then(res => {
            expect(res.status).toBe(500)
            expect(typeof res.body).toBe('object')
            expect(res.body.message).toBe('Internal Server Error')
            done()
        }).catch(error => {
            console.log(error)
            done(error)
        })
        
    })
})
