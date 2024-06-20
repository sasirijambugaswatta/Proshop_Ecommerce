

import connectDB from "../config/db.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import products from "../data/products.js";
import saveUsers from "../data/users.js";


connectDB();

const importData = async ()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Delete many completed");


        const resolvedUsers = await saveUsers();
        let createdUsers = await User.insertMany(resolvedUsers);

        const adminUser = createdUsers[0]._id;

        console.log("admin User",adminUser);

        const sampleProducts = products.map((product) => {
            return {...product,user: adminUser}
        });

        await Product.insertMany(sampleProducts);
        console.log("Date imported!");
        process.exit();
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}


const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed!');
        process.exit();
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else {
    importData();
}
