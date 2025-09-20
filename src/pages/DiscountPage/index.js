import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Voucher_Item from "~/components/Voucher_Item";
import * as PromotionsServices from "~/apiServices/promotionServices";
import * as PromotionsCartServices from "~/apiServices/promotionCartServices";
import ModalLoading from "~/components/ModalLoading";
import { ToastContext } from "~/components/ToastContext";
function DiscountPage() {
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);

  const [loading, setLoading] = useState(false);
  const [sale, setSale] = useState([]);
  const [pay, setPay] = useState([]);
  const [ship, setShip] = useState([]);
  const [updatePage, setUpdatePage] = useState(new Date());

  const [user, setUser] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      if (window.localStorage.getItem("role") !== "user") {
        toastContext.notify("info", "Bạn chưa đăng nhập");
        navigate("/login");
      } else {
        setLoading(true);
        setUser(JSON.parse(window.localStorage.getItem("user")));
        const result = await PromotionsServices.getPromotionUser(
          JSON.parse(window.localStorage.getItem("user"))._id
        ).catch((err) => {
          console.log(err);
          setLoading(false);
        });

        if (result) {
          console.log(result);
          setSale(result.sale);
          setShip(result.ship);
          setPay(result.pay);
          setLoading(false);
        }
      }
    };

    fetchApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePage]);

  const addPromotionCart = async (item) => {
    const promotionCart = {
      user: user,
      discount: item,
    };
    const fetchApi = async () => {
      const result = await PromotionsCartServices.CreatePromotionCart(
        promotionCart
      ).catch((err) => {
        console.log(err);
      });

      if (result) {
        console.log(result);
      }
    };

    fetchApi();
  };
  return (
    <div className="m-5 mb-10 p-3 rounded-lg min-h-[600px]">
      <div className="mb-4 font-bold text-[18px]">
        Ưu đãi giảm giá
        {sale === null || undefined ? (
          <div>Không có khuyến mãi</div>
        ) : (
          <div className="flex flex-wrap gap-[5%] mt-4 justify-center md:justify-start">
            {sale.map((item, index) => (
              <Voucher_Item
                discount={item}
                key={index}
                addToCart={addPromotionCart}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mb-4 font-bold text-[18px]">
        Ưu đãi vận chuyển
        {ship === null || undefined ? (
          <div>Không có khuyến mãi</div>
        ) : (
          <div className="flex flex-wrap gap-[5%] mt-4 justify-center md:justify-start">
            {ship.map((item, index) => (
              <Voucher_Item
                discount={item}
                key={index}
                addToCart={addPromotionCart}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mb-4 font-bold text-[18px]">
        Ưu đãi thanh toán
        {pay === null || undefined ? (
          <div>Không có khuyến mãi</div>
        ) : (
          <div className="flex flex-wrap gap-[5%] mt-4 justify-center md:justify-start">
            {pay.map((item, index) => (
              <Voucher_Item
                discount={item}
                key={index}
                addToCart={addPromotionCart}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <ModalLoading open={loading} title={"Đang tải"} />
      </div>
    </div>
  );
}

export default DiscountPage;
