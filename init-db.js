const readline = require('readline');


const Product = require('./models/Product');

async function main() {

  const advance = await question('Are you sure to continue with the deletion of the database? (yes or no) ')
  if (!advance) {
    process.exit();
  }

  const connection = require('./lib/connectMongoose')

  await initProducts();

  connection.close();
}

async function initProducts() {
  const deleted = await Product.deleteMany();
  console.log(`Remove ${deleted.deletedCount} products.`);

  const inserted = await Product.insertMany([
    {name: 'table', sale: true, price: 150, photo: 'table.png', tags: ['work']},
    {name: 'iphone 13 pro', sale: false, price: 950, photo: 'iphone13pro.png', tags: ['mobile']},
    {name: 'car mini cooper', sale: true, price: 1000, photo: 'carminicooper.png', tags: ['motor']},
    {name: 'chair', sale: false, price: 300, photo: 'chair.png', tags: ['lifestyle']}
  ]);

  console.log(`Create ${inserted.length} products.`)
}

main().catch(err => console.log('Hubo un error', err))

async function question(text) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(text, answer => {
      interface.close();
      if (answer.toLowerCase() === 'yes') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  })
}