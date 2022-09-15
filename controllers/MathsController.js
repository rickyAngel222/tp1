const fs = require ("fs");
const path = require("path");
const { isUndefined } = require("util");
module.exports =
    class Mathscontroller extends require('./Controller') {
        constructor(HttpContext) {
          
          super (HttpContext);
          
        }
        get() {
            if(this.HttpContext.path.queryString == "?")//help request
             {
            let helpPage = path.join(process.cwd(), "wwwroot/helpPages/MathsServuceHelp.html");
           
           let pageContent = fs.readFileSync(helpPage)

           this.HttpContext.response.content("text/html",pageContent);
             }
             else{
              if(MathOperator(this.HttpContext.path.params)){
                let op = this.HttpContext.path.params.op;
                this.params =this.HttpContext.path.params;
                
                switch(op)
                {
                case '+': 
                case ' ':
                case '-':
                  {
                    
                    let y =parseFloat( this.params.y); 
                    if(op =='-'){ y = y*-1; }
                    else{this.params.op='+';}
                    this.params.value = 
                    parseFloat( this.params.x)+y;
                   break;
                  }
                case'p':
                {        
                  this.params.value=isPrime(this.params.n);
                  break;
                }
                
                case'np':
                  {
                    
                    this.params= findPrime(n);
                    break;
                  }
                case '*': case 'x': case 'X':{
                  
                    this.params.value = 
                    parseFloat( this.params.x)*parseFloat( this.params.y);
                    break;
                }
                case '/':{
                  if(Notinfinite(this.params.y, this.params)){
                    this.params.value = 
                    parseFloat( this.params.x)/parseFloat( this.params.y);
                    
                  }
                    break;
                }
                case '%':{

                  if(this.params.y ==0&& this.params.x==0){
                    
                    this.params.value = 1;
                       break;
                    }
                  if(this.params.y ==0|| this.params.x==0){
                    
                    this.params.error = "imposible matematical equation";
                       break;
                    }
                   
                    this.params.value = 
                    parseFloat( this.params.x)%parseFloat( this.params.y);
                    

                    
                    break;
                }
                case '!':{
                   this.params.value= factorial(n);
                   break;
              }
            }
              
          
          
          //const jsonResponse = pm.response.json();
          //pm.environment.set("oauth_token", jsonResponse.token);
          
          

    }
    this.HttpContext.response.JSON(this.HttpContext.path.params);

    

        
function factorial(n){
    if(n===0||n===1){
      return 1;
    }
    return n*factorial(n-1);
}
function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n){
    let primeNumer = 0;
    for ( let i=0; i < n; i++){
        primeNumer++;
        while (!isPrime(primeNumer)){
            primeNumer++;
        }
    }
    return primeNumer;
  }


function CheckExistNumber(val,name,params)
{
  if (val == undefined )
  {params.error = "+"+name+"' parameter is not define"; return false;}
  if(isNaN(val))
  {params.error = "+"+name+"' parameter is not a number"; return false;  }
  return true;
}

function Notinfinite(y, param)
{
 if(y ==0 ){
  if(param.x==0)
  {
    param.error = "imposible matematical equation";
    return false;
  }
  param.value='Infinity';
  return false;
 }
 return true
}

function MathOperator(params)
{


  if(params.op!= undefined)  
  {
    
    if((' +-*/%xX').includes(params.op)){
      
      
      if(Object.keys(params).length !=3){
        params.error = "invalide number of parameter";
        return false; 
       }
       
    
      return (CheckExistNumber(params.x,"x",params)&&CheckExistNumber(params.y,"y",params));
    }
    else if(('np!').includes(params.op))
    {
      if(Object.keys(params).length !=2){
        params.error = "invalide number of parameter";
        return false; 
       }
      return (CheckExistNumber(params.n,"n",params));
    }
  }
  params.error = "'p' doesn t have valide opperator"; return false;
  
  
}


             }
}}

