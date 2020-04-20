# Topiary Welding API

[LIVE](https://at-product-guide.now.sh)

[REPO](https://github.com/capnnemo2/at-product-guide-api)

[CLIENT](https://github.com/capnnemo2/at-product-guide)

## Summary

Topiary Welding seems like a random web application, why does it exist? Excellent question!

I worked for a company that welds trellises, arbors, and topiary and distributes them to garden nurseries around the country. For anyone who isn't familiar, trellises, arbors, and topiary are metal structures for plants to grow on, around, and near. They can be both practical and decorative.

The company has a catalogue of over one hundred products. As a newer employee I was comstantly learning and forgetting new products. Unfortunately, there were several incomplete written resources, but nothing comprehensive available for me to study. I decided to create an app so everything could be collected in one place and available to everyone. I wanted to make sure that any of the employees could reference the specifcations for each product, but also share any personal tips they had garnered through personal experience.

And so Topiary Welding was created. Users can browse all products, filter the list for a certain product type, or search for a specific product.

## Endpoints

- GET /api/products
- POST /api/products
- GET /api/products/:product_id
- DELETE /api/products/:product_id
- PATCH /api/products/:products_id
- GET /api/products/:product_id/comments
- GET /api/comments
- POST /api/comments
- GET /api/comments/:comment_id
- DELETE /api/comments/:comment_id
- PATCH /api/comments/:comment_id

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Postgrator for SQL migration
- Knex.js for SQL query builder
- Supertest
- Mocha
- Chai
