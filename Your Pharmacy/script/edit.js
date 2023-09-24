import navbar from "../components/navbar.js"
import footer from "../components/footer.js"

let Over_V_nav=document.getElementById("Edit_v_Navbar");
Over_V_nav.innerHTML=navbar()

let Over_V_Foot=document.getElementById("Edit_v_Footer");
Over_V_Foot.innerHTML=footer()


let user_addressID = localStorage.getItem("addressID");

const userData = async function(){
    try{
       let res = await fetch(`https://ill-jade-chiton.cyclic.cloud/Address/${user_addressID}`);
       let data = await res.json();

       let {firstName,lastName,number,pincode,address,city,state,locality} = data;
       document.getElementById("pincode").value = pincode;
       document.getElementById("city").value = city;
       document.getElementById("state").value = state;
       document.getElementById("fName").value = firstName;
       document.getElementById("lName").value = lastName;
       document.getElementById("address").value = address;
       document.getElementById("number").value = number;
       document.getElementById("locality").value = locality;
    }
    catch(error){
        console.log(error);
    }
}

userData();

let changeBtn= document.getElementById("change_btn");

changeBtn.addEventListener("click",async function(){
    try{
        event.preventDefault();
       let pincode = document.getElementById("pincode").value;
       let city = document.getElementById("city").value;
       let state = document.getElementById("state").value;
       let firstName = document.getElementById("fName").value;
       let lastName = document.getElementById("lName").value;
       let address = document.getElementById("address").value;
       let number = document.getElementById("number").value;
       let locality = document.getElementById("locality").value;
   
       if(pincode == "" ||
          city == ""  ||
          state == ""  ||
          firstName == ""  ||
          lastName == ""  ||
          address == ""  ||
          number == ""  ||
          locality == ""
          ){
           alert("Please Fill All The Required Fields");
           return;
          }
   
       let new_obj= {
           firstName : firstName,
           lastName : lastName,
           number : number,
           pincode : pincode,
           address :address,
           city : city,
           state : state,
           locality : locality    
       }
   
      await fetch(`https://ill-jade-chiton.cyclic.cloud/Address/${user_addressID}`,{
       method:"PATCH",
       body: JSON.stringify(new_obj),
       headers:{
           "Content-Type" : "application/json",
       }
      });

      window.location.href = "address.html"

       }
       catch(err){
           console.log(err);
       }
})


// let change_btn = document.getElementById("change_btn");

// change_btn.addEventListener("click",function(){
//     location.href = "./address.html";
// })



let user=JSON.parse(localStorage.getItem("username"));
if(user){
    document.getElementById('login').textContent=user;
  }else{
    document.getElementById('login').textContent="Login";
  }

  let Add_cart=JSON.parse(localStorage.getItem("Cart"))||[];

document.getElementById("count").innerText=Add_cart.length;