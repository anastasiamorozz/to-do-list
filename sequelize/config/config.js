module.exports={
   development : {
    url: 'postgres://postgres:123456@localhost:5432/todolist',
    dialect :  'postgres',
    // dialectOptions:{
    //   ssl:{
    //     rejectUnauthorized: false,
    //   }
    // }
  },
   test : {
     url :  '127.0.0.1' ,
     dialect :  'postgres',
    //  dialectOptions:{
    //   ssl:{
    //     rejectUnauthorized: false,
    //   }
    // }
  },
   production : {
    url :  process.env.DATABASE_URL,
     dialect :  'postgres' ,
    //  dialectOptions:{
    //   ssl:{
    //     require:true,
    //     rejectUnauthorized: false,
    //   }
    // }
  }
}
