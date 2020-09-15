const sum = (a, b)=>{
    
    if(a && b){
       return a+b
    }
    throw new Error("invalid")
}

try{
    console.log(sum(1))
}
catch(err){
    console.log("Error Occured");
    // console.log(err);
}
