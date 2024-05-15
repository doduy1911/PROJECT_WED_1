module.exports=(query)=>{
    let filterstatus =[
        {name : "Tất Cả",
         status:"",
        class:""   },

        {name: "Hoạt Động",
         status:"active",
         class:""   },
         
        
        
        {name: "Dừng Hoạt Động",
         status:"inactive" ,
         class:""   }

    ]

    

    if(query.status){
        const index = filterstatus.findIndex((item)=>{
            return item.status == query.status
        })

        filterstatus[index].class = "active"
    }else{
        const index = filterstatus.findIndex((item)=>{
            return item.status == ""
            
        })
        filterstatus[index].class = "active"


    }
    // console.log(filterstatus)

    return filterstatus;
    
}