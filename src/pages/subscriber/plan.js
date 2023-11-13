import axios from "axios";
import SubscriberLayout from "../../components/layout/SubscriberLayout";
import Swal from "sweetalert2";
import { useState } from "react";

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Plans() {
  let [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  function choosePercent() {
    axios
      .post("/addPlan", { user_id: auth.user._id, plan: "percent" })
      .then((data) => {
        console.log(data);
        if (data.data.status) {
          let temp = { ...auth };
          temp.user.boost_available = temp.user.boost_available + 1;
          setAuth(temp);
          localStorage.setItem("auth", JSON.stringify(temp));
          Swal.fire({
            title: "Plan Subscribed",
            text: "5% plan Subscribed to yor account",
            icon: "success",
            confirmButtonText: "Cool",
          });
        } else {
          Swal.fire({
            title: "Plan Subscription Failed",
            text: "Something Went wrong",
            icon: "error",
            confirmButtonText: "ok",
          });
        }
      });
  }

  var getFixPlan = async () => {
    try {
      const amount = 999;
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
        name: "999",
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
            const verifyUrl = "/addFixedPlan";
            const { data } = await axios.put(verifyUrl, {
              response,
              BookingData,
              planDetails,
              auth,
            });

            if (data.status) {
              let temp = { ...auth };
              temp.user.boost_available = temp.user.boost_available + 1;
              setAuth(temp);
              localStorage.setItem("auth", JSON.stringify(temp));

              Swal.fire({
                title: "Subscribed to 999 Plan ",
                text: "Enjoy the Plan Benefits with 1 extra boost",
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

  return (
    <>
      <SubscriberLayout>
        <div className="container plans">
          <h2 className="mb-3" style={{color:"#b30707",letterSpacing: "1px",
    fontWeight: "700"}}>Our Current Plans</h2>

<section>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <div class="plan-card card_red text-center">
            <div class="title">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
              <h2>Free Trial</h2>
            </div>
            <div class="price">
              <h5>Free Plan</h5>
            </div>
            <div class="plan-option">
              <ul>
                <li><i class="fa fa-check" aria-hidden="true"></i>In this You can Post Only 1 Ad for 7 days </li>
                <li><i class="fa fa-check" aria-hidden="true"></i> After that you
                      need to upgrade your plan</li>
                <li><i class="fa fa-check" aria-hidden="true"></i>No Boost Provided</li>
                <li><i class="fa fa-times" aria-hidden="true"></i>Validity-7 Days</li>
                </ul>
            </div>
            <a href="#" disabled >Expired</a>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="plan-card card_violet text-center">
            <div class="title">
              <i class="fa fa-plane" aria-hidden="true"></i>
              <h2>Premium</h2>
            </div>
            <div class="price">
              <h5>5% Plan</h5>
            </div>
            <div class="plan-option">
              <ul>
                <li><i class="fa fa-check" aria-hidden="true"></i>In this You can Post Ads on a costing of 5% of the listing
                      Price</li>
                <li><i class="fa fa-check" aria-hidden="true"></i>3Each Property will be listed for 14 days.</li>
                <li><i class="fa fa-check" aria-hidden="true"></i>One Boost Provided</li>
                <li><i class="fa fa-times" aria-hidden="true"></i>                      Validity-Unlimited</li>
                </ul>
            </div>
            <a href="#" onClick={() => {
                      choosePercent();
                    }}>Activate</a>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="plan-card card_three text-center">
            <div class="title">
              <i class="fa fa-rocket" aria-hidden="true"></i>
              <h2>Standart</h2>
            </div>
            <div class="price">
              <h5>999 Plan</h5>
            </div>
            <div class="plan-option">
              <ul>
                <li><i class="fa fa-check" aria-hidden="true"></i>In this You can Post 5 Ads on a total payment of 999.</li>
                <li><i class="fa fa-check" aria-hidden="true"></i>Each
                      Property will be listed for 14 days.</li>
                <li><i class="fa fa-check" aria-hidden="true"></i>One Boost Provided</li>
                <li><i class="fa fa-times" aria-hidden="true"></i>Validity- Till 5 Listings</li>
                </ul>
            </div>
            <a href="#"  onClick={() => {
                      getFixPlan();
                    }}>Activate</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


          {/* <div className="row">
            <div className="col-4">
              <div class="card plan-card" style={{ width: "18rem",border:"1px solid #b30707" ,padding:"5px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            }}>
                <img
                  src="/images/freePLan.jfif"
                  class="card-img-top"
                  alt="free"
                  height={250}
                />
                <div class="card-body">
                  <h5 class="card-title">Free Trial</h5>
                  <ul>
                    <li class="card-text">
                      In this You can Post Only 1 Ad for 7 days , After that you
                      need to upgrade your plan
                    </li>
                    <li class="card-text">No Boost Provided</li>
                    <li class="card-text">
                      <h6>Validity-7 Days</h6>
                    </li>
                  </ul>

                  <button class="btn expr-btn btn-primary w-100 mt-4" disabled>
                    Expired
                  </button>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div class="card" style={{ width: "18rem",border:"1px solid #b30707" ,padding:"5px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            }}>
                <img
                  src="/images/5Plan.jpg"
                  class="card-img-top"
                  alt="5%"
                  height={250}
                />
                <div class="card-body">
                  <h5 class="card-title">5% Plan</h5>
                  <ul>
                    <li class="card-text">
                      In this You can Post Ads on a costing of 5% of the listing
                      Price .Each Property will be listed for 14 days.
                    </li>
                    <li class="card-text">One Boost Provided</li>
                    <li class="card-text">
                      <h6>Validity-Unlimited</h6>
                    </li>
                  </ul>
                  <a
                    href="#"
                    class="btn expr-btn btn-primary w-100"
                    onClick={() => {
                      choosePercent();
                    }}
                  >
                    Activate
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div class="card" style={{ width: "18rem",border:"1px solid #b30707" ,padding:"5px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
            }}>
                <img
                  src="/images/999plan.webp"
                  class="card-img-top"
                  alt="999"
                  height={250}
                />
                <div class="card-body">
                  <h5 class="card-title">999 Plan</h5>
                  <ul>
                    <li class="card-text">
                      In this You can Post 5 Ads on a total payment of 999. Each
                      Property will be listed for 14 days.{" "}
                    </li>
                    <li class="card-text">One Boost Provided</li>
                    <li class="card-text">
                      <h6>Validity- Till 5 Listings</h6>
                    </li>
                  </ul>
                  <a
                    href="#"
                    class="btn  expr-btn btn-primary w-100"
                    onClick={() => {
                      getFixPlan();
                    }}
                  >
                    Activate
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </SubscriberLayout>
    </>
  );
}

export default Plans;
