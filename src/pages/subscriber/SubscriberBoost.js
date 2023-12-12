import { useState,useRef } from "react";
import SubscriberLayout from "../../components/layout/SubscriberLayout";
import axios from "axios";
import Swal from "sweetalert2";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
function SubscriberBoost() {
  let form=useRef()
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("auth")).user
  );
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [url,setUrl]=useState("")
  const [accessCode,setAccessCode]=useState("")
  const [encRequest,setEnc]=useState("")

  var buyBoost = async () => {
    try {
      const amount = 100;
      const {
        data: { key },
      } = await axios.get("/getkey");
      const {
        data: { order },
      } = await axios.post("/checkout", {
        amount,
      });

      const BookingData = {
        razorpay_order_id: order.id,
        razorpay_payment_id: order.id,
        amount: order.amount,
      };
      const planDetails = {
        name: "Boost",
        amount,
        planValidity: 30,
      };

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Razorpay",
        description: "RazorPay",
        image: "",
        order_id: order.id,

        handler: async (response) => {
          try {
            const verifyUrl = "/boostAdd";
            const { data } = await axios.put(verifyUrl, {
              response,
              BookingData,
              planDetails,
              auth,
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
            // setisModeoOpen(false);

            Swal.fire({
              title: "Error!",
              text: "Do you want to Try again !!",
              icon: "error",
              confirmButtonText: "Cool",
            });
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error saving listing:", error);
    }
  };

  function ccavenue(){
    axios.post('/try',{}).then((data)=>{
      setUrl(data.data.paymentUrl)
      setEnc(data.data.key)
      setAccessCode(data.data.key)
      pay();
    })
  }

  function pay(){
    
   setTimeout(() => {
    console.log(encRequest)
    console.log(url)
    console.log(accessCode)
     form.current && form.current.submit();
   }, 5000);
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
        <form ref={form} id="nonseamless" method="post" name="redirect" action={'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction'}>
    <input  id="encRequest" name="encRequest" value={encRequest} />
    <input  name="access_code" id="access_code" value={'AVPP37KL58AJ50PPJA'} />
  </form>
      </SubscriberLayout>
    </>
  );
}

export default SubscriberBoost;
