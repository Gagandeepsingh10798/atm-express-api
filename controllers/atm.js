
var money = {"10":1000,"20":1000,"50":1000,"100":1000,"200":1000,"500":1000,"1000":1000} // available cash

var notes = {} // store the cash : {"amount": "number_of_notes"}

var amounts = [1000,500,200,100,50,20,10] // types of cash available


/* Function to calculate notes */
var cashier = (amount,amounts,preference,res) =>{
    const money_copy = JSON.parse(JSON.stringify(money));
    notes = {}
    var conn = false;
    for(var i = amounts.indexOf(preference); i<amounts.length; i++){
        if(amount <= 0){
            break;
        }
        else{
            if(amount>=amounts[i]){

                if(money[amounts[i].toString()] >= (amount-(amount%amounts[i]))/amounts[i]){
                    notes[amounts[i].toString()] = (amount-(amount%amounts[i]))/amounts[i]; 
                    money[amounts[i].toString()] = money[amounts[i].toString()] - (amount-(amount%amounts[i]))/amounts[i];
                    amount = amount - (amounts[i]*notes[amounts[i].toString()])
                }
                else{
                    if(i == amounts.indexOf(preference) && money[amounts[i].toString()] == 0){
                            conn = true;
                            res.send({"success":false,"status":400,"message":`kindly select other denomination, Rs.${preference} notes not available`,"data":{}});
                            break;
                    }
                    else{
                        notes[amounts[i].toString()] = money[amounts[i].toString()]; 
                        money[amounts[i].toString()] = 0;
                        amount = amount - (amounts[i]*notes[amounts[i].toString()])
                    }
                }
                
            }
            else{
                continue;
            }
        }
    }

    if(amount>0 && conn==false){
        money = money_copy
        res.send({"success":false,"status":400,"message":`not enough cassh in ATM`,"data":{}});
    }
    else if(amount == 0){
        res.send({"success":true,"status":200,"message":"transaction successfull","data":notes});
    }
    else{
        return;
    }
}
/* Function to calculate notes */




exports.processing = (req,res) =>{

    let amount = req.body.amount;
    var denomination = req.body.denomination;

    if(denomination=="None"){
        for(var i =0;i<amounts.length;i++){
            if(amounts[i]<=amount){
                denomination = amounts[i]
                break;
            }
        }
    }

    if(denomination == 10 || denomination == 20 || denomination == 50 || denomination == 100 || denomination == 200 || denomination == 500 || denomination == 1000 && denomination <= amount){
        if(amount%10 == 0 && amount >=10){
       
       
            cashier(amount,amounts,denomination,res);
    
    
        }
        else{
            res.send({"success":false,"status":400,"message":"Please enter the right amount","data":{}});
        }
    
    }
    else{
        res.send({"success":false,"status":400,"message":'please select right denomination',"data":{}})
    }
    

}