import { useState,useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubscriberLayout from "../../components/layout/SubscriberLayout";
import axios from "axios";
import Swal from "sweetalert2";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
function SubscriberBoost() {
  let form=useRef()
  let params=useParams()
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("auth")).user
  );
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [url,setUrl]=useState("")
  const [accessCode,setAccessCode]=useState("")
  const [encRequest,setEnc]=useState("")

  useEffect(()=>{
    if(params.order){
      buyBoost()
    }
  },[])
  var buyBoost = async () => {
    try {
      const amount = 100;
      const planDetails = {
        name: "Boost",
        amount:100,
        planValidity: 30,
      };

      

        
            const verifyUrl = "/boostAdd";
            const { data } = await axios.put(verifyUrl, {
              planDetails,
              auth,
              order_id:params.order
            });

            if (data.status) {
              //   setisModeoOpen(false);

              let temp = { ...auth };
              temp.user.boost_available = temp.user.boost_available + 2;
              setAuth(temp);
              localStorage.setItem("auth", JSON.stringify(temp));
              Swal.fire({
                title: "Boost Added",
                text: "2 Boost added to your account",
                icon: "success",
                confirmButtonText: "Cool",
              });
            } else {
              //   setisModeoOpen(false);

              Swal.fire({
                title: "Error!",
                text: "Do you want to Try again !!",
                icon: "error",
                confirmButtonText: "Cool",
              });
            }
          
        
      

    } catch (error) {
      console.error("Error saving listing:", error);
    }
  };

  function ccavenue(){
    axios.post('/try',{email:userData.email,name:userData.name,amount:100}).then((data)=>{
      setUrl(data.data.paymentUrl)
      setEnc(data.data.paymentEnc)
      setAccessCode(data.data.payment_key)
      pay();
    })
  }

  function pay(){
    
   setTimeout(() => {
    
     form.current && form.current.submit();
   }, 500);
  }

  return (
    <>
      <SubscriberLayout>
        <div className="container boots">
          <div className="row mb-3 boot-row">
            <div className="col-12">
              <span className="fw-bold" style={{ fontSize: "20px" }}>
                You have {auth.user.boost_available} Boost Available !{" "}
              </span>
            </div>
            <div className="col-12 m-3">
              <h2 style={{ color: "#b30707" }}>
                <u>Boost Your Property</u>
              </h2>
              <p className="boost-p">
                You Can Boost your property to be sold at the priority. With the
                Boost on Your Listing , your Listing will be displayed at the
                top of other listings for one day at minimal Cost .
              </p>
            </div>
              <h4 className=" mt-3 mb-3">Buy Boost</h4>
            <div className="col-12">
              <div class="card bost-card" style={{ width: "18rem",border:"1px solid #b30707" ,padding:"5px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            }}>
                <img
                  src="/images/booster.jpg"
                  class="card-img-top"
                  alt="booster"
                  height={200}
                />
                <div class="card-body" >
                  <h5 class="card-title">2 BOOSTS</h5>
                  <p class="card-text">
                    With These Boost your Properties will be shown to the users
                    on the priority .{" "}
                  </p>
                  <h6>
                  <span className="boost-p">Price: </span>
                  <span class="card-text ">100<span><CurrencyRupeeIcon fontSize="small"/></span> </span>
                  </h6>

                  <button
                    class="btn boost-btn w-100 m-auto"
                    onClick={() => ccavenue()}
                  >
                    Buy Boost
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form ref={form} id="nonseamless" method="post" name="redirect" action={url}>
    <input type="hidden" id="encRequest" name="encRequest" value={encRequest} />
    <input type="hidden" name="access_code" id="access_code" value={accessCode} />
  </form>
      </SubscriberLayout>
    </>
  );
}

export default SubscriberBoost;
